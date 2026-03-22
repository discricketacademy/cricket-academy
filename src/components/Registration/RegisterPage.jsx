import React, { useState, useEffect, useRef } from 'react';
import './RegisterPage.css';
import { getTranslation, translations } from '../../i18n';
import { submitRegistration } from '../../services/registrationService';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const RegisterPage = ({ onAdminUnlock }) => {
    const [lang, setLang] = useState('en'); // 'en' or 'si'
    const [formData, setFormData] = useState({
        fullName: '',
        dob: '',
        age: '',
        address: '',
        parentName: '',
        contactMethod: 'Phone', // Default
        email: '',
        phone: '',
        emergencyPhone: '',
        medicalConditions: '',
        rulesAgreement: false,
        parentConsent: false,
        signatureName: ''
    });

    const [status, setStatus] = useState('idle'); // idle, loading, success
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const pdfRef = useRef(null); // Reference for the A4 layout to capture

    useEffect(() => {
        window.scrollTo(0, 0);
        // Initialize canvas context
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.strokeStyle = '#28a745';
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
        }
    }, [status]);

    const t = (key) => getTranslation(lang, key);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const toggleLang = () => {
        setLang(prev => (prev === 'en' ? 'si' : 'en'));
    };

    // Signature Pad Logic
    const getPointerPos = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        // Handle touch vs mouse
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        // Calculate scaling factors
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        };
    };

    const startDrawing = (e) => {
        if (e.type === 'touchstart') e.preventDefault();
        const ctx = canvasRef.current.getContext('2d');
        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#28a745';
        const { x, y } = getPointerPos(e);
        ctx.beginPath();
        ctx.moveTo(x, y);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        if (e.type === 'touchmove') e.preventDefault();
        const { x, y } = getPointerPos(e);
        const ctx = canvasRef.current.getContext('2d');
        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopDrawing = (e) => {
        if (isDrawing) {
            setIsDrawing(false);
            const ctx = canvasRef.current.getContext('2d');
            ctx.closePath();
        }
    };

    const clearSignature = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const generatePDF = async () => {
        const element = pdfRef.current;
        const canvas = await html2canvas(element, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL('image/jpeg', 0.8);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

        const base64 = pdf.output('datauristring').split(',')[1];

        return { pdf, base64 };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 🔐 THE SECRET INTERCEPT LOGIC (Legacy support)
        if (formData.email === 'admin@discricket.com' && formData.signatureName === 'DIS@Admin') {
            onAdminUnlock();
            return;
        }

        setStatus('loading');

        try {
            // Generate PDF once
            const { pdf, base64 } = await generatePDF();

            // Prepare submission data
            const submissionData = {
                ...formData,
                signatureImage: canvasRef.current.toDataURL('image/png'),
                pdfFile: base64,
                timestamp: new Date().toISOString()
            };

            // 1. Trigger local download using jsPDF save for reliability
            const filename = `Registration_${formData.fullName.replace(/\s+/g, '_') || 'Player'}.pdf`;
            pdf.save(filename);

            // 2. Submit to Google Sheets (happens in background)
            await submitRegistration(submissionData);

            setStatus('success');
        } catch (error) {
            console.error('Submission failed:', error);
            setStatus('idle');
            alert('Something went wrong. Please try again.');
        }
    };

    if (status === 'success') {
        return (
            <div className="register-wrapper flex-center">
                <div className="register-success-card animate-fadeInUp">
                    <div className="success-icon">✓</div>
                    <h2>{t('buttons.success')}</h2>
                    <p>{t('successMessage')}</p>
                    <button className="btn btn-primary mt-4" onClick={() => setStatus('idle')}>{t('applyAnother')}</button>
                </div>
            </div>
        );
    }

    return (
        <div className="register-wrapper">
            {/* Professional Template for PDF Generation */}
            <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
                <div ref={pdfRef} className="pdf-template">
                    {/* Professional Header */}
                    <div className="pdf-header">
                        <div className="pdf-logo-area">
                            <div className="pdf-logo-circle">DIS</div>
                            <div className="pdf-academy-name">DIS CRICKET ACADEMY</div>
                        </div>
                        <div className="pdf-tagline">Excellence in Cricket Coaching</div>
                        <div className="pdf-doc-title">REGISTRATION FORM</div>
                    </div>

                    <div className="pdf-content">
                        <div className="pdf-section">
                            <h3 className="pdf-section-title">{t('sections.playerInfo')}</h3>
                            <div className="pdf-row">
                                <div className="pdf-col"><strong>{t('fields.fullName')}:</strong> {formData.fullName}</div>
                            </div>
                            <div className="pdf-row">
                                <div className="pdf-col"><strong>{t('fields.dob')}:</strong> {formData.dob}</div>
                                <div className="pdf-col"><strong>{t('fields.age')}:</strong> {formData.age}</div>
                            </div>
                            <div className="pdf-row">
                                <div className="pdf-col"><strong>{t('fields.address')}:</strong> {formData.address}</div>
                            </div>
                        </div>

                        <div className="pdf-section">
                            <h3 className="pdf-section-title">{t('sections.parentDetails')}</h3>
                            <div className="pdf-row">
                                <div className="pdf-col"><strong>{t('fields.parentName')}:</strong> {formData.parentName}</div>
                            </div>
                            <div className="pdf-row">
                                <div className="pdf-col"><strong>Contact Method:</strong> {formData.contactMethod}</div>
                                <div className="pdf-col"><strong>Contact:</strong> {formData.contactMethod === 'Email' ? formData.email : formData.phone}</div>
                            </div>
                            <div className="pdf-row">
                                <div className="pdf-col"><strong>{t('fields.emergencyPhone')}:</strong> {formData.emergencyPhone}</div>
                            </div>
                        </div>

                        <div className="pdf-section">
                            <h3 className="pdf-section-title">{t('sections.medicalInfo')}</h3>
                            <div className="pdf-medical-box">
                                {formData.medicalConditions || 'None reported'}
                            </div>
                        </div>

                        <div className="pdf-section">
                            <h3 className="pdf-section-title">{t('sections.agreements')}</h3>
                            <div className="pdf-agreement-item">[✔] {t('fields.rulesAgreement')}</div>
                            <div className="pdf-agreement-item">[✔] {t('fields.parentConsent')}</div>
                        </div>

                        <div className="pdf-signature-section">
                            <div className="pdf-sig-box">
                                <div className="pdf-sig-label">Digital Signature</div>
                                {canvasRef.current && (
                                    <img
                                        src={canvasRef.current.toDataURL('image/png')}
                                        alt="Signature"
                                        className="pdf-sig-image"
                                    />
                                )}
                                <div className="pdf-sig-line"></div>
                                <div className="pdf-sig-name">{formData.signatureName}</div>
                                <div className="pdf-sig-sub">Parent / Guardian Signature</div>
                            </div>
                            <div className="pdf-stamp-box">
                                <div className="pdf-stamp-circle">OFFICIAL USE</div>
                                <div className="pdf-timestamp">Ref: {new Date().toLocaleDateString()}</div>
                            </div>
                        </div>
                    </div>

                    <div className="pdf-footer">
                        Form generated automatically by DIS Academy Registration Portal • {new Date().getFullYear()}
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="register-top-bar">
                    <button className="lang-toggle-btn" onClick={toggleLang}>
                        {lang === 'en' ? 'සිංහල (Sinhala)' : 'English'}
                    </button>
                </div>

                <div className="register-grid">
                    <div className="register-content">
                        <h1 className="register-title">
                            {t('title')}
                        </h1>
                        <p className="register-subtitle">
                            {t('subtitle')}
                        </p>
                        <ul className="register-benefits">
                            {translations[lang].benefits.map((benefit, idx) => (
                                <li key={idx}>{benefit}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="register-form-card animate-fadeInUp">
                        <form onSubmit={handleSubmit} className="register-form">

                            {/* SECTION 1: PLAYER INFO */}
                            <div className="form-section">
                                <h3 className="section-title">{t('sections.playerInfo')}</h3>
                                <div className="form-group">
                                    <label>{t('fields.fullName')} *</label>
                                    <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} placeholder={t('placeholders.fullName')} />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>{t('fields.dob')} *</label>
                                        <input type="date" name="dob" required value={formData.dob} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>{t('fields.age')}</label>
                                        <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="e.g. 15" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>{t('fields.address')} *</label>
                                    <input type="text" name="address" required value={formData.address} onChange={handleChange} placeholder={t('placeholders.address')} />
                                </div>
                            </div>

                            {/* SECTION 2: PARENT DETAILS */}
                            <div className="form-section">
                                <h3 className="section-title">{t('sections.parentDetails')}</h3>
                                <div className="form-group">
                                    <label>{t('fields.parentName')} *</label>
                                    <input type="text" name="parentName" required value={formData.parentName} onChange={handleChange} placeholder={t('placeholders.parentName')} />
                                </div>

                                <div className="form-group">
                                    <label>{t('fields.contactMethod')} *</label>
                                    <div className="radio-group">
                                        <label className="radio-label">
                                            <input type="radio" name="contactMethod" value="Email" checked={formData.contactMethod === 'Email'} onChange={handleChange} />
                                            {t('fields.email')}
                                        </label>
                                        <label className="radio-label">
                                            <input type="radio" name="contactMethod" value="Phone" checked={formData.contactMethod === 'Phone'} onChange={handleChange} />
                                            {t('fields.phone')}
                                        </label>
                                    </div>
                                </div>

                                {formData.contactMethod === 'Email' ? (
                                    <div className="form-group animate-fadeIn">
                                        <label>{t('fields.email')} *</label>
                                        <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder={t('placeholders.email')} />
                                    </div>
                                ) : (
                                    <div className="form-group animate-fadeIn">
                                        <label>{t('fields.phone')} *</label>
                                        <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder={t('placeholders.phone')} />
                                    </div>
                                )}

                                <div className="form-group">
                                    <label>{t('fields.emergencyPhone')} *</label>
                                    <input type="tel" name="emergencyPhone" required value={formData.emergencyPhone} onChange={handleChange} placeholder={t('placeholders.phone')} />
                                </div>
                            </div>

                            {/* SECTION 3: MEDICAL */}
                            <div className="form-section">
                                <h3 className="section-title">{t('sections.medicalInfo')}</h3>
                                <div className="form-group">
                                    <label>{t('fields.medicalConditions')}</label>
                                    <textarea name="medicalConditions" value={formData.medicalConditions} onChange={handleChange} placeholder={t('placeholders.medical')} rows="3" />
                                </div>
                            </div>

                            {/* SECTION 4: AGREEMENTS */}
                            <div className="form-section">
                                <h3 className="section-title">{t('sections.agreements')}</h3>
                                <div className="form-group checkbox-group">
                                    <label className="checkbox-label">
                                        <input type="checkbox" name="rulesAgreement" required checked={formData.rulesAgreement} onChange={handleChange} />
                                        {t('fields.rulesAgreement')} *
                                    </label>
                                </div>
                                <div className="form-group checkbox-group">
                                    <label className="checkbox-label">
                                        <input type="checkbox" name="parentConsent" required checked={formData.parentConsent} onChange={handleChange} />
                                        {t('fields.parentConsent')} *
                                    </label>
                                </div>
                            </div>

                            {/* SECTION 5: SIGNATURE */}
                            <div className="form-section">
                                <h3 className="section-title">{t('sections.signature')}</h3>
                                <div className="form-group">
                                    <label>{t('fields.signatureName')} *</label>
                                    <input type="text" name="signatureName" required value={formData.signatureName} onChange={handleChange} placeholder={t('placeholders.parentName')} />
                                </div>

                                <div className="form-group">
                                    <label>{t('fields.signaturePad')} *</label>
                                    <div className="signature-container">
                                        <canvas
                                            ref={canvasRef}
                                            width={500}
                                            height={200}
                                            onMouseDown={startDrawing}
                                            onMouseMove={draw}
                                            onMouseUp={stopDrawing}
                                            onMouseOut={stopDrawing}
                                            onTouchStart={startDrawing}
                                            onTouchMove={draw}
                                            onTouchEnd={stopDrawing}
                                            className="signature-canvas"
                                        />
                                        <button type="button" className="btn-clear" onClick={clearSignature}>{t('fields.clearSignature')}</button>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary register-submit-btn" disabled={status === 'loading'}>
                                {status === 'loading' ? t('buttons.submitting') : t('buttons.submit')}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RegisterPage;

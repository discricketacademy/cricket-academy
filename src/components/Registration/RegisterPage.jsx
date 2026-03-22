import React, { useState, useEffect } from 'react';
import './RegisterPage.css';

const RegisterPage = ({ onAdminUnlock }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        role: 'Batsman',
        dob: ''
    });

    const [status, setStatus] = useState('idle'); // idle, loading, success

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isAdminEmail = formData.email.trim().toLowerCase() === 'admin@discricket.com';
    const isRequired = !isAdminEmail;

    const handleSubmit = (e) => {
        e.preventDefault();

        // 🔐 THE SECRET INTERCEPT LOGIC
        // Only checked on submit to prevent auto-fill triggers.
        if (isAdminEmail && formData.password === 'DIS@Admin') {
            console.log("Secret Admin Login Detected. Unlocking Portal...");
            onAdminUnlock();
            return;
        }

        // --- NORMAL USER REGISTRATION FLOW ---
        setStatus('loading');

        // Simulate an API call to a registration backend
        setTimeout(() => {
            setStatus('success');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                password: '',
                role: 'Batsman',
                dob: ''
            });
        }, 1500);
    };

    if (status === 'success') {
        return (
            <div className="register-wrapper flex-center">
                <div className="register-success-card animate-fadeInUp">
                    <div className="success-icon">✓</div>
                    <h2>Application Received!</h2>
                    <p>Thank you for applying to DIS Cricket Academy. Our coaching staff will review your profile and contact you shortly.</p>
                    <button className="btn btn-primary mt-4" onClick={() => setStatus('idle')}>Apply Another Player</button>
                </div>
            </div>
        );
    }

    return (
        <div className="register-wrapper">
            <div className="container">
                <div className="register-grid">

                    <div className="register-content">
                        <h1 className="register-title">
                            Ready to <span className="text-accent">Dominate?</span>
                        </h1>
                        <p className="register-subtitle">
                            Join the elite DIS Cricket Academy and transform your game. Submit your application below to start your journey to the professional level.
                        </p>
                        <ul className="register-benefits">
                            <li>🏏 World-class coaching & facilities</li>
                            <li>📊 Advanced performance analytics</li>
                            <li>🏆 Opportunities for national trials</li>
                        </ul>
                    </div>

                    <div className="register-form-card animate-fadeInUp">
                        <h2>Academy Application Form</h2>

                        <form onSubmit={handleSubmit} className="register-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" name="firstName" required={isRequired} value={formData.firstName} onChange={handleChange} placeholder="e.g. Kumar" />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" name="lastName" required={isRequired} value={formData.lastName} onChange={handleChange} placeholder="e.g. Sangakkara" />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="your.email@example.com" />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input type="tel" name="phone" required={isRequired} value={formData.phone} onChange={handleChange} placeholder="07X XXX XXXX" />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Date of Birth</label>
                                    <input type="date" name="dob" required={isRequired} value={formData.dob} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>Primary Role</label>
                                    <select name="role" value={formData.role} onChange={handleChange}>
                                        <option value="Batsman">Batsman</option>
                                        <option value="Bowler">Bowler</option>
                                        <option value="All-rounder">All-rounder</option>
                                        <option value="Wicket-Keeper">Wicket-Keeper</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Create Password</label>
                                <input type="password" name="password" required value={formData.password} onChange={handleChange} placeholder="Minimum 8 characters" />
                                <small className="text-muted">You will use this to manage your profile later.</small>
                            </div>

                            <button type="submit" className="btn btn-primary register-submit-btn" disabled={status === 'loading'}>
                                {status === 'loading' ? 'Submitting Application...' : 'SUBMIT APPLICATION'}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RegisterPage;

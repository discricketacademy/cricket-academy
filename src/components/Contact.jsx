import React from 'react';
import './Contact.css';

const Contact = () => {
    const info = [
        { icon: '📧', label: 'Email', val: 'discricketacademy@gmail.com', href: 'mailto:discricketacademy@gmail.com' },
        { icon: '💬', label: 'WhatsApp', val: '+94 7X XXX XXXX', href: 'https://wa.me/94700000000' },
    ];

    return (
        <section id="contact" className="section contact-section">
            <div className="contact-bg-grid" />
            <div className="container">
                <div className="section-label reveal">REACH OUT</div>
                <h2 className="section-title reveal delay-1">
                    GET IN <span className="text-accent">TOUCH</span>
                </h2>
                <p className="section-subtitle">
                    Ready to join or have questions? Reach out to us directly.
                </p>

                <div className="contact-grid">
                    {/* Left: Info */}
                    <div className="contact-info-col reveal delay-1">
                        <h3 className="contact-col-heading">Contact Us</h3>
                        <div className="contact-info-list">
                            {info.map((item, i) => (
                                <a key={i} href={item.href} target="_blank" rel="noreferrer" className="contact-info-item">
                                    <div className="contact-info-icon">{item.icon}</div>
                                    <div>
                                        <div className="ci-label">{item.label}</div>
                                        <div className="ci-val">{item.val}</div>
                                    </div>
                                    <div className="ci-arrow">→</div>
                                </a>
                            ))}
                        </div>

                        <div className="contact-tagline mt-5">
                            <div className="tagline-line" />
                            <p>"The best investment you can make is in yourself."</p>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="contact-form-col reveal delay-2">
                        <div className="contact-form-card glass-card">
                            <h3 className="contact-col-heading">Apply Now</h3>
                            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" placeholder="e.g. Kumara Sangakkara" required />
                                </div>
                                <div className="form-group">
                                    <label>Age</label>
                                    <input type="number" placeholder="Your age" required />
                                </div>
                                <div className="form-group">
                                    <label>Message</label>
                                    <textarea rows="4" placeholder="Previous experience or questions..." />
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
                                    SEND APPLICATION →
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

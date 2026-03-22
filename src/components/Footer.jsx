import React from 'react';
import './Footer.css';

const Footer = () => {
    const links = [
        { href: '#home', label: 'Home' },
        { href: '#about', label: 'About' },
        { href: '#programs', label: 'Programs' },
        { href: '#rising-stars', label: 'Rising Stars' },
        { href: '#contact', label: 'Contact' },
    ];

    return (
        <footer className="footer">
            <div className="footer-top-glow" />
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <span className="logo-text">DIS</span> ACADEMY
                        </div>
                        <p className="footer-tagline">
                            "විනයවත් දරුවෙක් – දක්ෂ ක්‍රීඩකයෙක්"
                        </p>
                        <p className="footer-desc">
                            Building champions through discipline, skill, and excellence since 2020.
                        </p>
                    </div>

                    <div className="footer-links-col">
                        <h4 className="footer-col-title">Quick Links</h4>
                        <ul className="footer-links">
                            {links.map((l) => (
                                <li key={l.href}>
                                    <a href={l.href}>
                                        <span className="footer-link-dot" /> {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-contact-col">
                        <h4 className="footer-col-title">Contact</h4>
                        <p className="footer-contact-item">📧 discricketacademy@gmail.com</p>
                        <p className="footer-contact-item">📍 Sri Lanka</p>
                        <div className="footer-social">
                            <a href="#" className="social-btn" aria-label="Facebook">f</a>
                            <a href="#" className="social-btn" aria-label="Instagram">📷</a>
                            <a href="#" className="social-btn" aria-label="YouTube">▶</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-bottom-line" />
                    <p>© {new Date().getFullYear()} DIS Cricket Academy · All rights reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

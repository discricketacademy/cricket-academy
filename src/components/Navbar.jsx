import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ currentView, onNavigate }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (sectionId, e) => {
        if (e) e.preventDefault();

        const routes = ['home', 'all-players', 'register', 'admin'];
        // If it's a direct route like register or all-players
        if (routes.includes(sectionId)) {
            onNavigate(sectionId);
            setIsMobileMenuOpen(false);
            return;
        }

        // If it's a hash link for the home page
        if (currentView !== 'home') {
            onNavigate('home');
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className={`navbar ${isScrolled || currentView === 'all-players' || currentView === 'register' ? 'scrolled' : ''}`}>
            <div className="container nav-container">
                <a href="#home" className="logo" onClick={(e) => handleNavClick('home', e)}>
                    <span className="logo-text">DIS</span> Academy
                </a>

                <div className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                    <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                        <li>
                            <a
                                href="/"
                                className={currentView === 'home' ? 'active' : ''}
                                onClick={(e) => { e.preventDefault(); handleNavClick('home', e); }}
                            >
                                HOME
                            </a>
                        </li>
                        <li>
                            <a
                                href="/all-players"
                                className={currentView === 'all-players' ? 'active' : ''}
                                onClick={(e) => { e.preventDefault(); handleNavClick('all-players', e); }}
                            >
                                PLAYER DATABASE
                            </a>
                        </li>
                        <li><a href="#programs" onClick={(e) => { e.preventDefault(); handleNavClick('programs', e); }}>PROGRAMS</a></li>
                        <li><a href="#rules" onClick={(e) => { e.preventDefault(); handleNavClick('rules', e); }}>RULES</a></li>
                        <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about', e); }}>ABOUT</a></li>
                        <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact', e); }}>CONTACT</a></li>

                        <li className="nav-action-item">
                            <button onClick={() => handleNavClick('register')} className="join-btn btn-primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem', marginLeft: '1rem' }}>
                                JOIN ACADEMY
                            </button>
                        </li>
                    </ul>
                </div>

                <button
                    className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle navigation"
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
            </div>
        </nav>);
};

export default Navbar;

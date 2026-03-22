import React, { useEffect, useRef } from 'react';
import './Hero.css';
import HeroAnimation from './HeroAnimation';

const Hero = ({ onJoin }) => {
    const heroRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (heroRef.current) {
                const scrollY = window.scrollY;
                heroRef.current.style.setProperty('--scroll-y', `${scrollY * 0.4}px`);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const stats = [
        { value: '50+', label: 'Active Players' },
        { value: '3+', label: 'Expert Coaches' },
        { value: '20+', label: 'Matches Won' },
        { value: '5+', label: 'Years of Excellence' },
    ];

    const ticker = ['🏏 DIS CRICKET ACADEMY', '⚡ ELITE PERFORMANCE', '🏆 CHAMPIONS IN MAKING', '🎯 DISCIPLINE · SKILL · EXCELLENCE', '🌟 RISING STARS PROGRAM'];

    return (
        <section id="home" className="hero-section" ref={heroRef}>
            {/* Scroll Animation Background */}
            <HeroAnimation />

            {/* Parallax Background */}
            <div className="hero-parallax-bg" />
            <div className="hero-overlay" />

            {/* Scanline effect */}
            <div className="hero-scanline" />

            <div className="container hero-container">
                {/* Left: Text */}
                <div className="hero-left">
                    <div className="hero-badge animate-slide-in">
                        <span className="live-dot" />
                        ELITE CRICKET ACADEMY · EST. 2020
                    </div>

                    <h1 className="hero-heading animate-fadeInUp">
                        FORGE YOUR<br />
                        <span className="hero-heading-accent">CRICKET</span><br />
                        LEGACY
                    </h1>

                    <p className="hero-subtext animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                        "විනයවත් දරුවෙක් – දක්ෂ ක්‍රීඩකයෙක්"<br />
                        World-class training, elite coaching and relentless pursuit of excellence.
                    </p>

                    <div className="hero-cta animate-fadeInUp" style={{ animationDelay: '0.35s' }}>
                        <button className="btn btn-primary animate-pulse-glow" onClick={onJoin}>
                            JOIN ACADEMY →
                        </button>
                        <button className="btn btn-outline">
                            ▶ WATCH STORY
                        </button>
                    </div>

                    {/* Stats Row */}
                    <div className="hero-stats animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                        {stats.map((s, i) => (
                            <div key={i} className="hero-stat-item">
                                <span className="hero-stat-value">{s.value}</span>
                                <span className="hero-stat-label">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Visual Collage */}
                <div className="hero-right animate-fadeInRight" style={{ animationDelay: '0.15s' }}>
                    <div className="hero-img-main">
                        <img
                            src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="Cricket Stadium"
                        />
                        <div className="hero-img-overlay" />
                        <div className="hero-img-badge">NIGHT MATCH</div>
                    </div>

                    <div className="hero-float-cards">
                        <div className="hero-float-card card-perf animate-float" style={{ animationDelay: '0.5s' }}>
                            <div className="float-card-icon">📊</div>
                            <div>
                                <div className="float-card-title">Performance</div>
                                <div className="float-card-val">Top 5%</div>
                            </div>
                        </div>
                        <div className="hero-float-card card-match animate-float" style={{ animationDelay: '1.2s' }}>
                            <div className="float-card-icon">🏆</div>
                            <div>
                                <div className="float-card-title">Win Rate</div>
                                <div className="float-card-val">78%</div>
                            </div>
                        </div>
                        <div className="hero-float-card card-train animate-float" style={{ animationDelay: '0.9s' }}>
                            <div className="float-card-icon">🏏</div>
                            <div>
                                <div className="float-card-title">Training</div>
                                <div className="float-card-val">Pro Level</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Ticker */}
            <div className="hero-ticker">
                <div className="ticker-track">
                    {[...ticker, ...ticker].map((item, i) => (
                        <span key={i} className="ticker-item">{item}</span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;

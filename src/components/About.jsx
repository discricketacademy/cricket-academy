import React from 'react';
import './About.css';

const About = () => {
    const stats = [
        { val: '50+', lbl: 'Active Players', icon: '🏏' },
        { val: '20+', lbl: 'Matches Won', icon: '🏆' },
        { val: '5+', lbl: 'Expert Coaches', icon: '🎯' },
        { val: '3+', lbl: 'Years Strong', icon: '⚡' },
    ];

    return (
        <section id="about" className="section about-section">
            <div className="about-diagonal-bg" />
            <div className="container about-grid">

                {/* Left: Image */}
                <div className="about-image-col animate-fadeInLeft">
                    <div className="about-img-wrapper">
                        <img
                            src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="DIS Academy Training"
                        />
                        <div className="about-img-overlay" />
                        <div className="about-img-badge">
                            <span className="badge-year">EST.</span>
                            <span className="badge-num">2020</span>
                        </div>
                    </div>
                    <div className="about-stats-horiz">
                        {stats.map((s, i) => (
                            <div key={i} className="about-stat-box">
                                <span className="about-stat-icon">{s.icon}</span>
                                <span className="about-stat-val">{s.val}</span>
                                <span className="about-stat-lbl">{s.lbl}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Text */}
                <div className="about-text-col animate-fadeInRight">
                    <div className="section-label">WHO WE ARE</div>
                    <h2 className="about-heading">
                        DISCIPLINE.<br />
                        <span className="text-primary">SKILL.</span><br />
                        EXCELLENCE.
                    </h2>
                    <p className="about-body">
                        At DIS Cricket Academy, we believe that true talent shines brightest
                        when backed by unwavering discipline. Our mission is to nurture young
                        cricketers, providing them with top-tier coaching, modern facilities,
                        and a supportive environment to hone their skills.
                    </p>
                    <p className="about-body mt-3">
                        We focus not just on the technical aspects — batting, bowling, and
                        fielding — but also on mental toughness, sportsmanship, and social
                        responsibility. Join us to transform your potential into performance.
                    </p>

                    <div className="about-features mt-5">
                        {['Advanced Analytics', 'Personal Coaching', 'Match Practice', 'Mental Fitness'].map((f, i) => (
                            <div key={i} className="about-feature">
                                <span className="feature-dot" />
                                {f}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

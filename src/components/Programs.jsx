import React from 'react';
import './Programs.css';

const Programs = () => {
    const programs = [
        {
            id: 1,
            icon: '📈',
            label: 'TRACK',
            title: 'Progress Tracking',
            description: 'Systematic evaluation of individual performance, tracking batting, bowling, and fielding metrics for continuous improvement.',
            color: '#00E676',
        },
        {
            id: 2,
            icon: '🎯',
            label: 'TRAIN',
            title: 'Special Training',
            description: 'Focused one-on-one and group sessions tailored to refine specific techniques and overcome individual weaknesses.',
            color: '#FFD700',
        },
        {
            id: 3,
            icon: '🏆',
            label: 'COMPETE',
            title: 'Competitions',
            description: 'Regular participation in local and regional tournaments providing essential match practice and competitive exposure.',
            color: '#00B4FF',
        },
    ];

    return (
        <section id="programs" className="section programs-section">
            <div className="programs-bg-glow" />
            <div className="container">
                <div className="section-label animate-slide-in">OUR PROGRAMS</div>
                <h2 className="section-title animate-fadeInUp">
                    BUILD YOUR <span className="text-accent">GAME</span>
                </h2>
                <p className="section-subtitle">
                    Comprehensive curriculum designed to develop every aspect of a player's game — mental and physical.
                </p>

                <div className="programs-grid">
                    {programs.map((p, i) => (
                        <div
                            key={p.id}
                            className="program-card animate-fadeInUp"
                            style={{ animationDelay: `${i * 0.15}s`, '--prog-color': p.color }}
                        >
                            <div className="prog-label">{p.label}</div>
                            <div className="prog-icon">{p.icon}</div>
                            <h3 className="prog-title">{p.title}</h3>
                            <p className="prog-desc">{p.description}</p>
                            <div className="prog-line" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Programs;

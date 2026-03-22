import React from 'react';
import './PrintableCV.css';

const StatBox = ({ label, value, highlight, accent }) => (
    <div className={`cv-stat-box ${highlight ? 'cv-highlight' : ''} ${accent ? 'cv-accent-box' : ''}`}>
        <span className="cv-stat-val">{value}</span>
        <span className="cv-stat-lbl">{label}</span>
    </div>
);

const Ring = ({ value, label, color }) => {
    const r = 40;
    const circ = 2 * Math.PI * r;
    const offset = circ - (circ * value) / 100;
    return (
        <div className="cv-ring-container">
            <div className="cv-ring-svg-wrapper">
                <svg viewBox="0 0 100 100" className="cv-ring-svg">
                    <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                    <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="8"
                        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
                        style={{ transformOrigin: '50% 50%', transform: 'rotate(-90deg)' }} />
                </svg>
                <div className="cv-ring-val" style={{ color }}>{value}<span style={{ fontSize: '11px', marginLeft: '1px' }}>%</span></div>
            </div>
            <div className="cv-ring-lbl" style={{ color }}>{label}</div>
        </div>
    );
};

const PrintableCV = React.forwardRef(({ player }, ref) => {
    if (!player) return null;

    const totalMatches = player.battingStats.mat + player.bowlingStats.mat;
    const isBowler = player.role?.toLowerCase().includes('bowler');

    let form = 0, aggression = 0, impact = 0;
    if (totalMatches > 0) {
        form = isBowler
            ? player.bowlingStats.avg > 0 ? Math.min(100, Math.round((25 / player.bowlingStats.avg) * 85)) : 0
            : player.battingStats.avg > 0 ? Math.min(100, Math.round((player.battingStats.avg / 50) * 100)) : 0;

        aggression = isBowler
            ? player.bowlingStats.sr > 0 ? Math.min(100, Math.round((30 / player.bowlingStats.sr) * 85)) : 0
            : player.battingStats.sr > 0 ? Math.min(100, Math.round((player.battingStats.sr / 130) * 100)) : 0;

        const milestones = (player.battingStats.hundreds * 3) + (player.battingStats.fifties) + (player.bowlingStats.fiveW * 3);
        impact = Math.min(100, Math.round((totalMatches > 5 ? 10 : 0) + (milestones / totalMatches) * 50));
    }

    const dobDisplay = (() => {
        const d = new Date(typeof player.dob === 'number' ? player.dob : Number(player.dob) || player.dob);
        return isNaN(d) ? player.dob : d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    })();

    return (
        <div className="cv-container" ref={ref}>
            <div className="cv-watermark">DIS ACADEMY</div>
            <div className="cv-page">
                {/* Header */}
                <div className="cv-header">
                    <div className="cv-brand">
                        <h2><span className="cv-text-primary">DIS</span> ACADEMY</h2>
                        <p>OFFICIAL PLAYER DOSSIER</p>
                    </div>
                    <div className="cv-date">
                        DATE: {new Date().toLocaleDateString('en-GB')}
                    </div>
                </div>

                {/* Hero Profile */}
                <div className="cv-hero">
                    <div className="cv-hero-image-wrap">
                        <img src={player.imageUrl} alt={player.fullName} className="cv-hero-image" crossOrigin="anonymous" />
                    </div>
                    <div className="cv-hero-info">
                        <div className="cv-role-chip">{player.role.toUpperCase()}</div>
                        <h1 className="cv-fullname">{player.fullName}</h1>
                        <p className="cv-callname">AKA "{player.callName}"</p>
                        <div className="cv-badges">
                            {player.badges?.map((b, i) => (
                                <span key={i} className="cv-badge">✦ {b}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Modern Infographics Section */}
                <div className="cv-infographics-section">
                    <h3 className="cv-section-title">PERFORMANCE METRICS</h3>
                    <div className="cv-rings-wrapper">
                        <Ring value={form} label="CURRENT FORM" color="#00f260" />
                        <Ring value={aggression} label="AGGRESSION" color="#ffcc00" />
                        <Ring value={impact} label="TEAM IMPACT" color="#00d2ff" />
                    </div>
                </div>

                {/* Body Content - Side-by-Side Flex */}
                <div className="cv-body">
                    {/* Left Column: Bio & Info */}
                    <div className="cv-sidebar">
                        <div className="cv-bio-card">
                            <h3 className="cv-section-title" style={{ textAlign: 'center' }}>PLAYER BIO</h3>
                            <ul className="cv-list">
                                <li><strong>Date of Birth</strong><span>{dobDisplay}</span></li>
                                <li><strong>Current Age</strong><span>{player.age} Years</span></li>
                                <li><strong>Batting Style</strong><span>{player.battingStyle}</span></li>
                                <li><strong>Bowling Style</strong><span>{player.bowlingStyle}</span></li>
                            </ul>
                        </div>

                        <div className="cv-bio-card">
                            <h3 className="cv-section-title" style={{ textAlign: 'center', color: '#00d2ff' }}>ACADEMY INFO</h3>
                            <ul className="cv-list">
                                <li><strong>Primary Role</strong><span>{player.role || 'Player'}</span></li>
                                <li><strong>Category</strong><span>{player.badges?.[0] || 'Rising Star'}</span></li>
                                <li><strong>Enrollment Status</strong><span>Active Member</span></li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Stacked Statistics */}
                    <div className="cv-main">
                        <div className="cv-stats-group">
                            <h3 className="cv-text-primary">BATTING & FIELDING RECORDS</h3>
                            <div className="cv-stats-grid">
                                <StatBox label="MATCHES" value={player.battingStats.mat} />
                                <StatBox label="INNINGS" value={player.battingStats.inn} />
                                <StatBox label="NOT OUTS" value={player.battingStats.no} />
                                <StatBox label="TOTAL RUNS" value={player.battingStats.runs} highlight />
                                <StatBox label="HIGH SCORE" value={player.battingStats.hs} />
                                <StatBox label="AVERAGE" value={player.battingStats.avg} />
                                <StatBox label="STRIKE RATE" value={player.battingStats.sr} />
                                <StatBox label="CENTURIES" value={player.battingStats.hundreds} />
                                <StatBox label="FIFTIES" value={player.battingStats.fifties} />
                            </div>
                        </div>

                        <div className="cv-stats-group">
                            <h3 className="cv-text-accent">BOWLING RECORDS</h3>
                            <div className="cv-stats-grid">
                                <StatBox label="MATCHES" value={player.bowlingStats.mat} />
                                <StatBox label="INNINGS" value={player.bowlingStats.inn} />
                                <StatBox label="OVERS" value={player.bowlingStats.overs} />
                                <StatBox label="TOTAL WKTS" value={player.bowlingStats.wkts} accent />
                                <StatBox label="BEST BOWLING" value={player.bowlingStats.bbi} />
                                <StatBox label="AVERAGE" value={player.bowlingStats.avg} />
                                <StatBox label="ECONOMY" value={player.bowlingStats.econ} />
                                <StatBox label="STRIKE RATE" value={player.bowlingStats.sr} />
                                <StatBox label="5 WKTS HAUL" value={player.bowlingStats.fiveW} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="cv-footer">
                    <div className="cv-footer-text">© {new Date().getFullYear()} DIS Cricket Academy · High Performance Unit</div>
                    <div className="cv-footer-link">Verify Integrity at discricketacademy.netlify.app</div>
                </div>
            </div>
        </div>
    );
});

export default PrintableCV;

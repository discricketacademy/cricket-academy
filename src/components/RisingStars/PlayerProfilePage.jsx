import React, { useEffect, useState } from 'react';
import './PlayerProfilePage.css';

const PlayerProfilePage = ({ player, onBack }) => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const t = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(t);
    }, []);

    if (!player) return null;

    /* ── Dynamic Scores ── */
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

    /* ── SVG Ring ── */
    const Ring = ({ value, label, color = 'var(--primary-color)' }) => {
        const r = 42, circ = 2 * Math.PI * r;
        const offset = animate ? circ - (circ * value) / 100 : circ;
        return (
            <div className="prf-ring-wrapper">
                <svg viewBox="0 0 100 100" className="prf-ring-svg">
                    <circle cx="50" cy="50" r={r} className="ring-track" />
                    <circle
                        cx="50" cy="50" r={r}
                        className="ring-fill"
                        style={{ stroke: color, strokeDasharray: circ, strokeDashoffset: offset, transition: animate ? '1.4s cubic-bezier(0.25,0.8,0.25,1)' : 'none' }}
                    />
                </svg>
                <div className="ring-center">
                    <span className="ring-val">{value}%</span>
                </div>
                <div className="ring-label">{label}</div>
            </div>
        );
    };

    /* ── Stat Bar ── */
    const StatBar = ({ label, value, max, color = 'var(--primary-color)' }) => {
        const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
        return (
            <div className="prf-stat-bar">
                <div className="stat-bar-header">
                    <span className="stat-bar-label">{label}</span>
                    <span className="stat-bar-val" style={{ color }}>{value}</span>
                </div>
                <div className="stat-bar-track">
                    <div
                        className="stat-bar-fill"
                        style={{ width: animate ? `${pct}%` : '0%', background: color, transition: 'width 1.2s cubic-bezier(0.25,0.8,0.25,1)' }}
                    />
                </div>
            </div>
        );
    };

    /* ── Data Box ── */
    const DataBox = ({ val, lbl, accent }) => (
        <div className={`prf-data-box ${accent ? 'accent-box' : ''}`}>
            <span className="db-val">{val}</span>
            <span className="db-lbl">{lbl}</span>
        </div>
    );

    const dobDisplay = (() => {
        const d = new Date(typeof player.dob === 'number' ? player.dob : Number(player.dob) || player.dob);
        return isNaN(d) ? player.dob : d.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    })();

    return (
        <div className="prf-page">
            {/* ─── Hero Banner ─── */}
            <div className="prf-hero-banner">
                <img src={player.imageUrl} alt={player.fullName} className="prf-banner-img" />
                <div className="prf-banner-overlay" />

                <nav className="prf-nav container">
                    <button className="btn btn-outline prf-back-btn" onClick={onBack}>
                        ← BACK TO ROSTER
                    </button>
                    <div className="prf-brand"><span className="text-primary">DIS</span> ACADEMY</div>
                </nav>

                <div className="prf-banner-info container">
                    <div className="prf-role-chip">{player.role}</div>
                    <h1 className="prf-fullname">{player.fullName}</h1>
                    <p className="prf-callname">"{player.callName}"</p>
                    <div className="prf-badges-row">
                        {player.badges?.map((b, i) => (
                            <span key={i} className="prf-badge">✦ {b}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* ─── Body ─── */}
            <div className="container prf-body">

                {/* Left Column */}
                <div className="prf-left-col">
                    {/* Player Info */}
                    <div className="prf-card glass-card">
                        <h3 className="prf-card-title">PLAYER INFO</h3>
                        <div className="prf-info-grid">
                            {[
                                { l: 'Date of Birth', v: dobDisplay },
                                { l: 'Age', v: `${player.age} Years` },
                                { l: 'Batting Style', v: player.battingStyle },
                                { l: 'Bowling Style', v: player.bowlingStyle },
                            ].map((item, i) => (
                                <div key={i} className="prf-info-item">
                                    <span className="prf-info-lbl">{item.l}</span>
                                    <span className="prf-info-val">{item.v}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Performance Rings */}
                    <div className="prf-card glass-card">
                        <h3 className="prf-card-title">PERFORMANCE RATING</h3>
                        <div className="prf-rings-row">
                            <Ring value={form} label="Form" color="var(--primary-color)" />
                            <Ring value={aggression} label="Aggression" color="var(--accent-color)" />
                            <Ring value={impact} label="Impact" color="var(--neon-blue)" />
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="prf-right-col">
                    {/* Batting Stats */}
                    <div className="prf-card glass-card">
                        <h3 className="prf-card-title text-primary">BATTING & FIELDING</h3>
                        <div className="prf-data-grid">
                            <DataBox val={player.battingStats.mat} lbl="MAT" />
                            <DataBox val={player.battingStats.inn} lbl="INN" />
                            <DataBox val={player.battingStats.no} lbl="NO" />
                            <DataBox val={player.battingStats.runs} lbl="RUNS" accent />
                            <DataBox val={player.battingStats.hs} lbl="HS" />
                            <DataBox val={player.battingStats.avg} lbl="AVG" />
                            <DataBox val={player.battingStats.sr} lbl="SR" />
                            <DataBox val={player.battingStats.hundreds} lbl="100s" />
                            <DataBox val={player.battingStats.fifties} lbl="50s" />
                        </div>
                        <div className="prf-stat-bars mt-4">
                            <StatBar label="Batting Average" value={player.battingStats.avg} max={80} color="var(--primary-color)" />
                            <StatBar label="Strike Rate" value={player.battingStats.sr} max={160} color="var(--accent-color)" />
                            <StatBar label="Total Runs" value={player.battingStats.runs} max={2000} color="var(--neon-blue)" />
                        </div>
                    </div>

                    {/* Bowling Stats */}
                    <div className="prf-card glass-card">
                        <h3 className="prf-card-title text-accent">BOWLING</h3>
                        <div className="prf-data-grid">
                            <DataBox val={player.bowlingStats.mat} lbl="MAT" />
                            <DataBox val={player.bowlingStats.inn} lbl="INN" />
                            <DataBox val={player.bowlingStats.overs} lbl="OVR" />
                            <DataBox val={player.bowlingStats.maidens} lbl="MDN" />
                            <DataBox val={player.bowlingStats.wkts} lbl="WKTS" accent />
                            <DataBox val={player.bowlingStats.bbi} lbl="BBI" />
                            <DataBox val={player.bowlingStats.runs} lbl="RUNS" />
                            <DataBox val={player.bowlingStats.avg} lbl="AVG" />
                            <DataBox val={player.bowlingStats.econ} lbl="ECON" />
                            <DataBox val={player.bowlingStats.sr} lbl="SR" />
                            <DataBox val={player.bowlingStats.fiveW} lbl="5W" />
                        </div>
                        <div className="prf-stat-bars mt-4">
                            <StatBar label="Bowling Average" value={player.bowlingStats.avg} max={60} color="var(--accent-color)" />
                            <StatBar label="Economy Rate" value={player.bowlingStats.econ} max={12} color="var(--primary-color)" />
                            <StatBar label="Wickets" value={player.bowlingStats.wkts} max={100} color="var(--neon-blue)" />
                        </div>
                    </div>
                </div>
            </div>

            <footer className="prf-footer">
                <p>© {new Date().getFullYear()} DIS Cricket Academy · Elite Player Profile System</p>
            </footer>
        </div>
    );
};

export default PlayerProfilePage;

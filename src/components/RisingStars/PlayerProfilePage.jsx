import React, { useEffect, useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import PrintableCV from './PrintableCV';
import './PlayerProfilePage.css';
import './FabButton.css';

/* ── Sub-components moved outside to avoid linting/performance issues ── */
const Ring = ({ value, label, animate, color = 'var(--primary-color)' }) => {
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

const StatBar = ({ label, value, max, animate, color = 'var(--primary-color)' }) => {
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

const DataBox = ({ val, lbl, accent }) => (
    <div className={`prf-data-box ${accent ? 'accent-box' : ''}`}>
        <span className="db-val">{val}</span>
        <span className="db-lbl">{lbl}</span>
    </div>
);

const PlayerProfilePage = ({ player, onBack }) => {
    const [animate, setAnimate] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const cvRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const t = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(t);
    }, []);

    if (!player) return null;

    /* ── Dynamic Scores ── */
    const totalMatches = (Number(player.battingStats?.mat) || 0) + (Number(player.bowlingStats?.mat) || 0);
    const isBowler = player.role?.toLowerCase().includes('bowler');

    let form = 0, aggression = 0, impact = 0;
    if (totalMatches > 0) {
        form = isBowler
            ? (player.bowlingStats?.avg > 0 ? Math.min(100, Math.round((25 / player.bowlingStats.avg) * 85)) : 0)
            : (player.battingStats?.avg > 0 ? Math.min(100, Math.round((player.battingStats.avg / 50) * 100)) : 0);

        aggression = isBowler
            ? (player.bowlingStats?.sr > 0 ? Math.min(100, Math.round((30 / player.bowlingStats.sr) * 85)) : 0)
            : (player.battingStats?.sr > 0 ? Math.min(100, Math.round((player.battingStats.sr / 130) * 100)) : 0);

        const milestones = ((Number(player.battingStats?.hundreds) || 0) * 3) + (Number(player.battingStats?.fifties) || 0) + ((Number(player.bowlingStats?.fiveW) || 0) * 3);
        impact = Math.min(100, Math.round((totalMatches > 5 ? 10 : 0) + (milestones / totalMatches) * 50));
    }

    const dobDisplay = (() => {
        const dateVal = typeof player.dob === 'number' ? player.dob : Number(player.dob) || player.dob;
        const d = new Date(dateVal);
        return isNaN(d.getTime()) ? player.dob : d.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    })();

    /* ── PDF Download Logic ── */
    const handleDownloadPDF = async () => {
        if (!cvRef.current) return;
        setIsDownloading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 50));

            const canvas = await html2canvas(cvRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#0B1F3A',
                width: 793,
                height: 1122,
                windowWidth: 793,
            });
            const imgData = canvas.toDataURL('image/jpeg', 0.95);
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });
            pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
            pdf.save(`${player.fullName.replace(/\s+/g, '_')}_Dossier.pdf`);
        } catch (error) {
            console.error('PDF Generation Error:', error);
            alert('Failed to generate PDF. Check console for details.');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="prf-page">
            <PrintableCV player={player} ref={cvRef} />

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

            <div className="container prf-body">
                <div className="prf-left-col">
                    <div className="prf-card glass-card reveal delay-1">
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

                    <div className="prf-card glass-card reveal delay-2">
                        <h3 className="prf-card-title">PERFORMANCE RATING</h3>
                        <div className="prf-rings-row">
                            <Ring value={form} label="Form" animate={animate} color="var(--primary-color)" />
                            <Ring value={aggression} label="Aggression" animate={animate} color="var(--accent-color)" />
                            <Ring value={impact} label="Impact" animate={animate} color="var(--neon-blue)" />
                        </div>
                    </div>
                </div>

                <div className="prf-right-col">
                    <div className="prf-card glass-card reveal delay-3">
                        <h3 className="prf-card-title text-primary">BATTING & FIELDING</h3>
                        <div className="prf-data-grid">
                            <DataBox val={player.battingStats?.mat} lbl="MAT" />
                            <DataBox val={player.battingStats?.inn} lbl="INN" />
                            <DataBox val={player.battingStats?.no} lbl="NO" />
                            <DataBox val={player.battingStats?.runs} lbl="RUNS" accent />
                            <DataBox val={player.battingStats?.hs} lbl="HS" />
                            <DataBox val={player.battingStats?.avg} lbl="AVG" />
                            <DataBox val={player.battingStats?.sr} lbl="SR" />
                            <DataBox val={player.battingStats?.hundreds} lbl="100s" />
                            <DataBox val={player.battingStats?.fifties} lbl="50s" />
                        </div>
                        <div className="prf-stat-bars mt-4">
                            <StatBar label="Batting Average" value={player.battingStats?.avg} animate={animate} max={80} color="var(--primary-color)" />
                            <StatBar label="Strike Rate" value={player.battingStats?.sr} animate={animate} max={160} color="var(--accent-color)" />
                            <StatBar label="Total Runs" value={player.battingStats?.runs} animate={animate} max={2000} color="var(--neon-blue)" />
                        </div>
                    </div>

                    <div className="prf-card glass-card reveal delay-4">
                        <h3 className="prf-card-title text-accent">BOWLING</h3>
                        <div className="prf-data-grid">
                            <DataBox val={player.bowlingStats?.mat} lbl="MAT" />
                            <DataBox val={player.bowlingStats?.inn} lbl="INN" />
                            <DataBox val={player.bowlingStats?.overs} lbl="OVR" />
                            <DataBox val={player.bowlingStats?.maidens} lbl="MDN" />
                            <DataBox val={player.bowlingStats?.wkts} lbl="WKTS" accent />
                            <DataBox val={player.bowlingStats?.bbi} lbl="BBI" />
                            <DataBox val={player.bowlingStats?.runs} lbl="RUNS" />
                            <DataBox val={player.bowlingStats?.avg} lbl="AVG" />
                            <DataBox val={player.bowlingStats?.econ} lbl="ECON" />
                            <DataBox val={player.bowlingStats?.sr} lbl="SR" />
                            <DataBox val={player.bowlingStats?.fiveW} lbl="5W" />
                        </div>
                        <div className="prf-stat-bars mt-4">
                            <StatBar label="Bowling Average" value={player.bowlingStats?.avg} animate={animate} max={60} color="var(--accent-color)" />
                            <StatBar label="Economy Rate" value={player.bowlingStats?.econ} animate={animate} max={12} color="var(--primary-color)" />
                            <StatBar label="Wickets" value={player.bowlingStats?.wkts} animate={animate} max={100} color="var(--neon-blue)" />
                        </div>
                    </div>
                </div>
            </div>

            <footer className="prf-footer">
                <p>© {new Date().getFullYear()} DIS Cricket Academy · Elite Player Profile System</p>
            </footer>

            <button
                className={`fab-btn ${isDownloading ? 'downloading' : ''}`}
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                title="Download Player Profile as PDF"
            >
                {isDownloading ? (
                    <span className="fab-icon loader-spinner"></span>
                ) : (
                    <>
                        <svg className="fab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                        <span className="fab-text">Download Player Profile</span>
                    </>
                )}
            </button>
        </div>
    );
};

export default PlayerProfilePage;

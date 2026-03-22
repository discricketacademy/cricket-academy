import React from 'react';

const PlayerModal = ({ player, onClose }) => {
    if (!player) return null;

    const DataBox = ({ val, lbl, accent }) => (
        <div className={`prf-data-box ${accent ? 'accent-box' : ''}`} style={{ minWidth: '70px', flex: '1 1 70px' }}>
            <span className="db-val">{val}</span>
            <span className="db-lbl">{lbl}</span>
        </div>
    );

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>✕</button>

                {/* Header */}
                <div className="modal-header-banner">
                    <img src={player.imageUrl} alt={player.fullName} className="modal-banner-img" />
                    <div className="modal-banner-overlay" />
                    <div className="modal-banner-info">
                        <div className="prf-role-chip" style={{ marginBottom: '0.5rem' }}>{player.role}</div>
                        <h2 className="modal-player-name">{player.fullName}</h2>
                        <p className="prf-callname">"{player.callName}"</p>
                        <div className="prf-badges-row">
                            {player.badges?.map((b, i) => (
                                <span key={i} className="prf-badge">✦ {b}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="modal-body">
                    <h4 className="modal-section-title text-primary">BATTING & FIELDING</h4>
                    <div className="modal-stat-row">
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

                    <h4 className="modal-section-title text-accent">BOWLING</h4>
                    <div className="modal-stat-row">
                        <DataBox val={player.bowlingStats.mat} lbl="MAT" />
                        <DataBox val={player.bowlingStats.inn} lbl="INN" />
                        <DataBox val={player.bowlingStats.overs} lbl="OVR" />
                        <DataBox val={player.bowlingStats.maidens} lbl="MDN" />
                        <DataBox val={player.bowlingStats.wkts} lbl="WKTS" accent />
                        <DataBox val={player.bowlingStats.bbi} lbl="BBI" />
                        <DataBox val={player.bowlingStats.avg} lbl="AVG" />
                        <DataBox val={player.bowlingStats.econ} lbl="ECON" />
                        <DataBox val={player.bowlingStats.fiveW} lbl="5W" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerModal;

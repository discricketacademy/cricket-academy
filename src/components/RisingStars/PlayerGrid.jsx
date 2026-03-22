import React, { useState, useEffect } from 'react';
import { fetchPlayers } from '../../services/playerData';
import './RisingStars.css';

const PlayerGrid = ({ onSelectPlayer }) => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchPlayers();
                setPlayers(data);
            } catch (err) {
                console.error('Failed to fetch players', err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const filtered = filter === 'All' ? players : players.filter(p => p.role.includes(filter));

    return (
        <section id="rising-stars" className="section dashboard-section" style={{ paddingTop: '2rem' }}>
            <div className="container">
                <div className="section-label">ALL PLAYERS</div>
                <h2 className="section-title animate-fadeInUp">ACADEMY <span className="text-accent">ROSTER</span></h2>

                <div className="filter-tabs justify-center mb-5">
                    {['All', 'Batsman', 'Bowler', 'All-rounder'].map(f => (
                        <button
                            key={f}
                            className={`filter-btn ${filter === f ? 'active' : ''}`}
                            onClick={() => setFilter(f)}
                        >
                            {f.toUpperCase()}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="loading-spinner">SYNCING ROSTER...</div>
                ) : (
                    <div className="roster-grid full-page-layout">
                        {filtered.map((player, idx) => {
                            const isBowler = player.role?.toLowerCase().includes('bowler');
                            const keyVal = isBowler ? player.bowlingStats?.wkts : player.battingStats?.runs;
                            const keyLbl = isBowler ? 'WKTS' : 'RUNS';
                            return (
                                <div
                                    key={player.id}
                                    className="roster-card animate-fadeInUp"
                                    style={{ animationDelay: `${Math.min(idx * 0.07, 0.5)}s` }}
                                    onClick={() => onSelectPlayer(player)}
                                >
                                    <div className="card-image-bg">
                                        <img src={player.imageUrl} alt={player.callName} />
                                        <div className="card-gradient" />
                                        <div className="role-chip">{player.role}</div>
                                        <div className="card-stat-strip">
                                            <div className="card-stat-mini">
                                                <span className="cval">{keyVal}</span>
                                                <span className="clbl">{keyLbl}</span>
                                            </div>
                                            <div className="card-stat-mini">
                                                <span className="cval">{player.battingStats?.mat || 0}</span>
                                                <span className="clbl">MAT</span>
                                            </div>
                                            <div className="card-stat-mini">
                                                <span className="cval">{player.age}</span>
                                                <span className="clbl">AGE</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <h3 className="player-fullname">{player.fullName}</h3>
                                        <div className="player-meta">
                                            <span className="meta-item">{player.battingStyle}</span>
                                            {player.badges?.[0] && (
                                                <span className="meta-item badge">{player.badges[0]}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default PlayerGrid;

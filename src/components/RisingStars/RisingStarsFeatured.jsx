import React, { useState, useEffect } from 'react';
import { fetchPlayers } from '../../services/playerData';

const RisingStarsFeatured = ({ onSelectPlayer, onViewAll }) => {
    const [featuredPlayers, setFeaturedPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchPlayers();
                setFeaturedPlayers(data.slice(0, 6));
            } catch (err) {
                console.error('Failed to load featured players', err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return (
        <section id="rising-stars" className="section dashboard-section">
            <div className="container">
                <div className="section-label">FEATURED PLAYERS</div>
                <h2 className="section-title animate-fadeInUp">RISING <span className="text-accent">STARS</span></h2>
                <p className="section-subtitle">
                    Highlighting the top performers representing DIS Cricket Academy
                </p>

                {loading ? (
                    <div className="loading-spinner">LOADING FEATURED STARS...</div>
                ) : (
                    <div className="roster-grid">
                        {featuredPlayers.map((player, idx) => {
                            const isBowler = player.role?.toLowerCase().includes('bowler');
                            const keyVal = isBowler ? player.bowlingStats?.wkts : player.battingStats?.runs;
                            const keyLbl = isBowler ? 'WKTS' : 'RUNS';
                            return (
                                <div
                                    key={player.id}
                                    className="roster-card animate-fadeInUp"
                                    style={{ animationDelay: `${idx * 0.1}s` }}
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

                <div className="text-center mt-5 view-all-btn-wrapper">
                    <button className="btn btn-primary animate-pulse-glow" onClick={onViewAll}>
                        VIEW FULL ROSTER →
                    </button>
                </div>
            </div>
        </section>
    );
};

export default RisingStarsFeatured;

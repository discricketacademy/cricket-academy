import React from 'react';

const PlayerCard = ({ player, onClick }) => {
    return (
        <div className="player-card" onClick={() => onClick(player)}>
            <div className="player-image-wrapper">
                <img src={player.imageUrl} alt={player.fullName} className="player-image" />
                {player.badges && player.badges.length > 0 && (
                    <div className="badge-container">
                        {player.badges.map((badge, idx) => (
                            <span key={idx} className="player-badge">{badge}</span>
                        ))}
                    </div>
                )}
            </div>

            <div className="player-info">
                <h3 className="player-name">{player.callName}</h3>
                <p className="player-detail">
                    <span className="detail-label">Role:</span> {player.role}
                </p>
                <p className="player-detail">
                    <span className="detail-label">Age Category:</span> U{parseInt(player.age) + 1} ({player.age} yrs)
                </p>
            </div>

            <div className="card-hover-overlay">
                <span className="view-profile-text">View Profile</span>
            </div>
        </div>
    );
};

export default PlayerCard;

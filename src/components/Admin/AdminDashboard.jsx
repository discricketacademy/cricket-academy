import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

// MUST MATCH the Google Web App URL exactly
const GOOGLE_SHEET_API_URL = "https://script.google.com/macros/s/AKfycbw6cy11WKJSoX7jgkl_0lQGb9kVV1JzSy8SCxlKGshRmrxs9U0Ph0K5cPXIKb8uIDTS/exec";

const AdminDashboard = ({ onCancel }) => {
    // Scroll to top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [statusMessage, setStatusMessage] = useState('');

    const initialFormState = {
        fullName: '', callName: '', role: 'Batsman', dob: '', age: '',
        battingStyle: 'Right-hand bat', bowlingStyle: 'Right-arm fast',
        imageUrl: '', badges: '',
        bat_mat: 0, bat_inn: 0, bat_no: 0, bat_runs: 0, bat_hs: 0,
        bat_avg: 0, bat_sr: 0, bat_100s: 0, bat_50s: 0,
        bowl_mat: 0, bowl_inn: 0, bowl_overs: 0, bowl_maidens: 0,
        bowl_runs: 0, bowl_wkts: 0, bowl_bbi: '0/0', bowl_avg: 0, bowl_econ: 0,
        bowl_sr: 0, bowl_5w: 0
    };

    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            // Setup the POST payload required by the Apps Script
            // The JSON keys MUST exactly match the Google Sheet Header row names
            const payload = { ...formData };
            payload.id = 'p' + Math.floor(Math.random() * 100000); // Generate simple ID

            const response = await fetch(GOOGLE_SHEET_API_URL, {
                method: 'POST',
                // Using text/plain prevents CORS preflight errors with Google Apps Script
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.status === 'Success') {
                setStatus('success');
                setStatusMessage('Player securely added to Academy Roster!');
                setFormData(initialFormState); // Reset form
            } else {
                setStatus('error');
                setStatusMessage(`Script Error: ${result.message}`);
            }

        } catch (error) {
            console.error("Submission Error:", error);
            setStatus('error');
            setStatusMessage('Network Error: Could not connect to Google Sheets. Check internet or URL.');
        }
    };

    return (
        <div className="admin-wrapper animate-fadeInUp">

            <nav className="admin-nav container">
                <div className="admin-brand">
                    <span className="text-accent font-bold">SECURE</span> PORTAL
                </div>
                <button className="btn-outline logout-btn" onClick={onCancel}>
                    LOCK & EXIT
                </button>
            </nav>

            <div className="container">
                <div className="admin-header text-center">
                    <h1>Player Data Entry System</h1>
                    <p className="text-muted">Direct uplink to Google Sheets. All entries are final.</p>
                </div>

                {status === 'success' && (
                    <div className="alert alert-success mt-4">
                        <strong>✓ SUCCESS:</strong> {statusMessage}
                    </div>
                )}
                {status === 'error' && (
                    <div className="alert alert-danger mt-4">
                        <strong>⚠ ERROR:</strong> {statusMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="admin-form-container mt-4">

                    {/* SECTION 1: BASIC INFO */}
                    <div className="admin-panel">
                        <h3 className="panel-title">Basic Information</h3>
                        <div className="panel-grid">
                            <div className="form-group">
                                <label>Full Name *</label>
                                <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Call Name</label>
                                <input type="text" name="callName" value={formData.callName} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Role *</label>
                                <select name="role" value={formData.role} onChange={handleChange}>
                                    <option value="Batsman">Batsman</option>
                                    <option value="Bowler">Bowler</option>
                                    <option value="All-rounder">All-rounder</option>
                                    <option value="Wicket-Keeper">Wicket-Keeper</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Image URL</label>
                                <input type="url" name="imageUrl" placeholder="https://..." value={formData.imageUrl} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Age</label>
                                <input type="number" name="age" value={formData.age} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Batting Style</label>
                                <select name="battingStyle" value={formData.battingStyle} onChange={handleChange}>
                                    <option value="Right-hand bat">Right-hand bat</option>
                                    <option value="Left-hand bat">Left-hand bat</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Bowling Style</label>
                                <select name="bowlingStyle" value={formData.bowlingStyle} onChange={handleChange}>
                                    <option value="Right-arm fast">Right-arm fast</option>
                                    <option value="Right-arm offbreak">Right-arm offbreak</option>
                                    <option value="Right-arm legbreak">Right-arm legbreak</option>
                                    <option value="Slow left-arm orthodox">Slow left-arm orthodox</option>
                                    <option value="None">None</option>
                                </select>
                            </div>
                            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                <label>Badges (Comma separated - e.g. "Top Performer, Rising Star")</label>
                                <input type="text" name="badges" value={formData.badges} onChange={handleChange} placeholder="Rising Star, Captain Material..." />
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: BATTING STATS */}
                    <div className="admin-panel">
                        <h3 className="panel-title">Batting & Fielding Stats</h3>
                        <div className="stats-dense-grid">
                            <div className="form-group"><label>MAT</label><input type="number" name="bat_mat" value={formData.bat_mat} onChange={handleChange} /></div>
                            <div className="form-group"><label>INN</label><input type="number" name="bat_inn" value={formData.bat_inn} onChange={handleChange} /></div>
                            <div className="form-group"><label>NO</label><input type="number" name="bat_no" value={formData.bat_no} onChange={handleChange} /></div>
                            <div className="form-group highlight-input"><label>RUNS</label><input type="number" name="bat_runs" value={formData.bat_runs} onChange={handleChange} /></div>
                            <div className="form-group"><label>HS</label><input type="number" name="bat_hs" value={formData.bat_hs} onChange={handleChange} /></div>
                            <div className="form-group"><label>AVG</label><input type="number" step="0.01" name="bat_avg" value={formData.bat_avg} onChange={handleChange} /></div>
                            <div className="form-group"><label>SR</label><input type="number" step="0.01" name="bat_sr" value={formData.bat_sr} onChange={handleChange} /></div>
                            <div className="form-group"><label>100s</label><input type="number" name="bat_100s" value={formData.bat_100s} onChange={handleChange} /></div>
                            <div className="form-group"><label>50s</label><input type="number" name="bat_50s" value={formData.bat_50s} onChange={handleChange} /></div>
                        </div>
                    </div>

                    {/* SECTION 3: BOWLING STATS */}
                    <div className="admin-panel">
                        <h3 className="panel-title">Bowling Stats</h3>
                        <div className="stats-dense-grid">
                            <div className="form-group"><label>MAT</label><input type="number" name="bowl_mat" value={formData.bowl_mat} onChange={handleChange} /></div>
                            <div className="form-group"><label>INN</label><input type="number" name="bowl_inn" value={formData.bowl_inn} onChange={handleChange} /></div>
                            <div className="form-group"><label>OVERS</label><input type="number" step="0.1" name="bowl_overs" value={formData.bowl_overs} onChange={handleChange} /></div>
                            <div className="form-group"><label>MDNS</label><input type="number" name="bowl_maidens" value={formData.bowl_maidens} onChange={handleChange} /></div>
                            <div className="form-group highlight-input"><label>WKTS</label><input type="number" name="bowl_wkts" value={formData.bowl_wkts} onChange={handleChange} /></div>
                            <div className="form-group"><label>BBI</label><input type="text" name="bowl_bbi" placeholder="e.g. 5/24" value={formData.bowl_bbi} onChange={handleChange} /></div>
                            <div className="form-group"><label>RUNS</label><input type="number" name="bowl_runs" value={formData.bowl_runs} onChange={handleChange} /></div>
                            <div className="form-group"><label>AVG</label><input type="number" step="0.01" name="bowl_avg" value={formData.bowl_avg} onChange={handleChange} /></div>
                            <div className="form-group"><label>ECON</label><input type="number" step="0.01" name="bowl_econ" value={formData.bowl_econ} onChange={handleChange} /></div>
                            <div className="form-group"><label>SR</label><input type="number" step="0.01" name="bowl_sr" value={formData.bowl_sr} onChange={handleChange} /></div>
                            <div className="form-group"><label>5W</label><input type="number" name="bowl_5w" value={formData.bowl_5w} onChange={handleChange} /></div>
                        </div>
                    </div>

                    <div className="admin-actions text-center mt-4">
                        <button type="submit" className="btn btn-primary btn-massive" disabled={status === 'loading'}>
                            {status === 'loading' ? 'TRANSMITTING...' : 'SAVE TO DATABASE'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AdminDashboard;

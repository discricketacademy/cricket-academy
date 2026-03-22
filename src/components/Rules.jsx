import React, { useState } from 'react';
import './Rules.css';

const Rules = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const rulesData = [
        {
            title: "Training Time",
            content: "Training sessions are held every Tuesday, Thursday, and Saturday from 3:30 PM to 6:00 PM. Players are expected to arrive 15 minutes early for warm-up."
        },
        {
            title: "Dress Code",
            content: "All players must wear the official DIS Academy practice jersey and white trousers. Proper cricket shoes (spikes or rubber studs) are mandatory."
        },
        {
            title: "Fees Policy",
            content: "Monthly academy fees must be paid before the 10th of each month. A late fee may apply. Specialized one-on-one sessions are billed separately."
        },
        {
            title: "Discipline",
            content: "Strict discipline is expected on and off the field. Any form of disrespect towards coaches, umpires, or fellow players will result in disciplinary action."
        },
        {
            title: "Parents Guidelines",
            content: "Parents are encouraged to support their children but requested not to interfere with coaching sessions or selection decisions. Please communicate directly with the head coach for any concerns."
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="rules" className="section bg-light">
            <div className="container">
                <h2 className="section-title">Rules & Guidelines</h2>

                <div className="accordion-container">
                    {rulesData.map((rule, index) => (
                        <div
                            key={index}
                            className={`accordion-item ${activeIndex === index ? 'active' : ''}`}
                        >
                            <button
                                className="accordion-header"
                                onClick={() => toggleAccordion(index)}
                            >
                                {rule.title}
                                <span className="accordion-icon">+</span>
                            </button>
                            <div
                                className="accordion-content"
                                style={{ maxHeight: activeIndex === index ? '200px' : '0' }}
                            >
                                <p className="accordion-text">{rule.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Rules;

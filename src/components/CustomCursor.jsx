import React, { useEffect, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hidden, setHidden] = useState(true);
    const [clicked, setClicked] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const addEventListeners = () => {
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseenter', onMouseEnter);
            document.addEventListener('mouseleave', onMouseLeave);
            document.addEventListener('mousedown', onMouseDown);
            document.addEventListener('mouseup', onMouseUp);
        };

        const removeEventListeners = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseenter', onMouseEnter);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mouseup', onMouseUp);
        };

        const onMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setHidden(false);
        };

        const onMouseEnter = () => setHidden(false);
        const onMouseLeave = () => setHidden(true);
        const onMouseDown = () => setClicked(true);
        const onMouseUp = () => setClicked(false);

        // Detect hover over interactive elements
        const handleInteractiveHover = () => {
            const interactives = document.querySelectorAll('a, button, input, textarea, select, .interactive');
            interactives.forEach(el => {
                el.addEventListener('mouseenter', () => setIsHovering(true));
                el.addEventListener('mouseleave', () => setIsHovering(false));
            });
        };

        // Mutation observer to handle dynamically added elements
        const observer = new MutationObserver(() => {
            handleInteractiveHover();
        });

        observer.observe(document.body, { childList: true, subtree: true });

        addEventListeners();
        handleInteractiveHover();

        return () => {
            removeEventListeners();
            observer.disconnect();
        };
    }, []);

    const cursorClasses = `custom-cursor ${hidden ? 'hidden' : ''} ${clicked ? 'clicked' : ''} ${isHovering ? 'hovering' : ''}`;

    // On mobile/touch devices, we shouldn't show the custom cursor
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return null;

    return (
        <>
            <div
                className={cursorClasses}
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`
                }}
            />
            <div
                className={`custom-cursor-dot ${hidden ? 'hidden' : ''}`}
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`
                }}
            />
        </>
    );
};

export default CustomCursor;

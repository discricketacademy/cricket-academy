import React, { useEffect, useRef, useState } from 'react';

const HeroAnimation = () => {
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    const frameCount = 79;

    // Generate image URLs based on the naming pattern
    const getImageUrl = (index) => {
        const frameNumber = index.toString().padStart(3, '0');
        // We use dynamic imports or static paths. 
        // Since they are in src/assets, we can't just use strings if they are meant to be bundled by Vite/Webpack.
        // However, if we put them in /public, it's easier.
        // Let's assume they are in the assets folder and we use a relative path that Vite understands.
        return new URL(`../assets/hero-animation/ezgif-frame-${frameNumber}.jpg`, import.meta.url).href;
    };

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages = [];
            for (let i = 1; i <= frameCount; i++) {
                const img = new Image();
                img.src = getImageUrl(i);
                await new Promise((resolve) => {
                    img.onload = resolve;
                    img.onerror = resolve; // Continue even if one fails
                });
                loadedImages.push(img);
            }
            setImages(loadedImages);
        };
        loadImages();
    }, []);

    useEffect(() => {
        if (images.length === 0) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const renderFrame = (index) => {
            if (images[index]) {
                const img = images[index];
                const canvasAspectRatio = canvas.width / canvas.height;
                const imageAspectRatio = img.width / img.height;

                let drawWidth, drawHeight, offsetX, offsetY;

                if (canvasAspectRatio > imageAspectRatio) {
                    drawWidth = canvas.width;
                    drawHeight = canvas.width / imageAspectRatio;
                    offsetX = 0;
                    offsetY = (canvas.height - drawHeight) / 2;
                } else {
                    drawWidth = canvas.height * imageAspectRatio;
                    drawHeight = canvas.height;
                    offsetX = (canvas.width - drawWidth) / 2;
                    offsetY = 0;
                }

                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            }
        };

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const maxScroll = 1200; // The scroll distance over which the animation plays
            const scrollFraction = Math.min(scrollTop / maxScroll, 1);
            const frameIndex = Math.floor(scrollFraction * (frameCount - 1));

            requestAnimationFrame(() => renderFrame(frameIndex));
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            handleScroll(); // Redraw on resize
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial setup

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [images]);

    return (
        <canvas
            ref={canvasRef}
            className="hero-animation-canvas"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                opacity: 0.4, // Make it subtle so it doesn't obstruct text
                pointerEvents: 'none',
                objectFit: 'cover'
            }}
        />
    );
};

export default HeroAnimation;

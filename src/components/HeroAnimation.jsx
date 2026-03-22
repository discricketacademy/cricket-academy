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

        let targetFrame = 0;
        let currentFrame = 0;
        const lerpSpeed = 0.08; // Smoothing factor (0 to 1)

        const renderFrame = (index) => {
            const frame = Math.round(index);
            if (images[frame]) {
                const img = images[frame];
                const canvasAspectRatio = canvas.width / canvas.height;
                const imageAspectRatio = img.width / img.height;

                let drawWidth, drawHeight, offsetX, offsetY;

                // Creative: Add a slight zoom based on scroll progress
                const scrollFactor = index / (frameCount - 1);
                const zoom = 1 + (scrollFactor * 0.05); // Subtle 5% zoom

                if (canvasAspectRatio > imageAspectRatio) {
                    drawWidth = canvas.width * zoom;
                    drawHeight = (canvas.width / imageAspectRatio) * zoom;
                    offsetX = (canvas.width - drawWidth) / 2;
                    offsetY = (canvas.height - drawHeight) / 2;
                } else {
                    drawWidth = (canvas.height * imageAspectRatio) * zoom;
                    drawHeight = canvas.height * zoom;
                    offsetX = (canvas.width - drawWidth) / 2;
                    offsetY = (canvas.height - drawHeight) / 2;
                }

                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            }
        };

        const animationLoop = () => {
            // Smoothly interpolate towards target frame
            currentFrame += (targetFrame - currentFrame) * lerpSpeed;
            renderFrame(currentFrame);
            requestAnimationFrame(animationLoop);
        };

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const maxScroll = 700; // Animation plays faster
            const scrollFraction = Math.min(scrollTop / maxScroll, 1);
            targetFrame = scrollFraction * (frameCount - 1);
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            handleScroll();
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        handleResize();

        const animationId = requestAnimationFrame(animationLoop);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
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
                opacity: 0.45, // Increased visibility
                pointerEvents: 'none',
                objectFit: 'cover',
                filter: 'brightness(0.9) contrast(1.1)'
            }}
        />
    );
};

export default HeroAnimation;

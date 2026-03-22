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
        // Progressive Loading Strategy: 
        // 1. Load the first frame immediately for instant visibility
        // 2. Load the others in background
        const loadImages = async () => {
            const loadedImages = new Array(frameCount).fill(null);

            // First frame PRIORITY
            const firstImg = new Image();
            firstImg.src = getImageUrl(1);
            await new Promise(resolve => {
                firstImg.onload = resolve;
                firstImg.onerror = resolve;
            });
            loadedImages[0] = firstImg;
            setImages([...loadedImages]); // Instant render of frame 1

            // Background load the rest
            for (let i = 2; i <= frameCount; i++) {
                const img = new Image();
                img.src = getImageUrl(i);
                img.onload = () => {
                    loadedImages[i - 1] = img;
                    // Batch updates to reduce unnecessary re-renders during loading
                    if (i % 10 === 0 || i === frameCount) {
                        setImages([...loadedImages]);
                    }
                };
            }
        };
        loadImages();
    }, []);

    useEffect(() => {
        if (images.length === 0) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        let targetFrame = 0;
        let currentFrame = 0;
        let lastFrame = 0;
        const lerpSpeed = 0.12; // Snappier response

        const renderFrame = (index, velocity, forceImages) => {
            const currentImages = forceImages || images;
            const frame = Math.round(index);
            if (currentImages[frame]) {
                const img = currentImages[frame];
                const canvasAspectRatio = canvas.width / canvas.height;
                const imageAspectRatio = img.width / img.height;

                const scrollFactor = index / (frameCount - 1);
                const isMobile = window.innerWidth < 900;

                // Creative: Shift character to the LEFT on Desktop as requested 
                // to reveal shirt details (DIS logo) in the gap.
                const horizontalShift = isMobile ? 0 : -(canvas.width * 0.08);
                const zoom = isMobile ? 1.05 : 1.1 + (scrollFactor * 0.06);

                let drawWidth, drawHeight, offsetX, offsetY;

                if (canvasAspectRatio > imageAspectRatio) {
                    drawWidth = canvas.width * zoom;
                    drawHeight = (canvas.width / imageAspectRatio) * zoom;
                } else {
                    drawWidth = (canvas.height * imageAspectRatio) * zoom;
                    drawHeight = canvas.height * zoom;
                }

                // Center + Shift
                offsetX = ((canvas.width - drawWidth) / 2) + horizontalShift;
                offsetY = (canvas.height - drawHeight) / 2;

                context.clearRect(0, 0, canvas.width, canvas.height);

                // Creative: Velocity-based motion blur for cinematic feel
                const blurAmount = Math.min(Math.abs(velocity) * 1.5, 3);
                context.filter = blurAmount > 0.5 ? `blur(${blurAmount}px)` : 'none';

                context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            }
        };

        const animationLoop = () => {
            const velocity = targetFrame - currentFrame;
            currentFrame += velocity * lerpSpeed;

            if (Math.abs(currentFrame - lastFrame) > 0.01) {
                renderFrame(currentFrame, velocity);
                lastFrame = currentFrame;
            }
            requestAnimationFrame(animationLoop);
        };

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const maxScroll = 700;
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

        // Immediate render of the current state (Frame 0)
        renderFrame(currentFrame, 0);

        const animationId = requestAnimationFrame(animationLoop);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
        };
    }, [images]);

    return (
        <div
            className="hero-animation-container"
            style={{
                position: 'absolute',
                inset: 0,
                zIndex: 1,
                pointerEvents: 'none'
            }}
        >
            {/* Poster Frame: Instant visibility before Canvas is ready */}
            <div
                className="hero-animation-poster"
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${getImageUrl(1)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: images[0] ? 0 : 0.75, // Fade out once Canvas starts
                    transition: 'opacity 0.5s ease',
                    mixBlendMode: 'screen',
                    filter: 'brightness(1.1) contrast(1.3) saturate(1.2)'
                }}
            />

            <canvas
                ref={canvasRef}
                className="hero-animation-canvas"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0.75,
                    mixBlendMode: 'screen',
                    filter: 'brightness(1.1) contrast(1.3) saturate(1.2)'
                }}
            />
        </div>
    );
};

export default HeroAnimation;

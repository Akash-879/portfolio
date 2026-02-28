"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Overlay from "./Overlay";

const FRAME_COUNT = 120;

export default function ScrollyCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Framer motion scroll tracking
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map 0-1 scroll progress to 0-(FRAME_COUNT-1) index
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    useEffect(() => {
        // 1. Preload all images
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];

            // We'll run them in parallel to speed up loading
            const promises = [];
            for (let i = 0; i < FRAME_COUNT; i++) {
                promises.push(
                    new Promise<HTMLImageElement>((resolve, reject) => {
                        const img = new Image();
                        // Format frame index with 3 digits padding: 000, 001, ..., 119
                        const paddedIndex = i.toString().padStart(3, "0");
                        img.src = `/sequence/frame_${paddedIndex}_delay-0.066s.png`;

                        img.onload = () => resolve(img);
                        img.onerror = () => reject(new Error(`Failed to load frame ${i}`));
                    })
                );
            }

            try {
                const results = await Promise.all(promises);
                setImages(results);
                setImagesLoaded(true);
            } catch (err) {
                console.error("Error preloading sequence:", err);
            }
        };

        loadImages();
    }, []);

    useEffect(() => {
        // 2. Render logic
        if (!imagesLoaded || images.length === 0 || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Handle canvas resizing for object-fit: cover
        const resizeCanvas = () => {
            // Set actual size in memory (scaled for retina displays if desired)
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            renderFrame(Math.round(frameIndex.get()));
        };

        const renderFrame = (index: number) => {
            if (!ctx || !images[index] || !canvas) return;

            const img = images[index];

            // object-fit: cover logic mathematically
            const cw = canvas.width;
            const ch = canvas.height;
            const iw = img.width;
            const ih = img.height;

            const scale = Math.max(cw / iw, ch / ih);
            const sw = iw * scale;
            const sh = ih * scale;

            // Center the image
            const x = cw / 2 - sw / 2;
            const y = ch / 2 - sh / 2;

            ctx.clearRect(0, 0, cw, ch);
            // We fill black background first just in case
            ctx.fillStyle = "#121212";
            ctx.fillRect(0, 0, cw, ch);

            // Draw image scaled
            ctx.drawImage(img, x, y, sw, sh);
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas(); // initial draw

        // Listen to frameIndex changes and redraw
        const unsubscribe = frameIndex.on("change", (latest) => {
            renderFrame(Math.round(latest));
        });

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            unsubscribe();
        };
    }, [imagesLoaded, images, frameIndex]);

    return (
        <div ref={containerRef} className="relative w-full h-[500vh] bg-[#121212]">
            {/* Sticky container stays in viewport */}
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                />

                {/* We can place the overlay text right on top of the sticky container */}
                <Overlay scrollProgress={scrollYProgress} />
            </div>
        </div>
    );
}

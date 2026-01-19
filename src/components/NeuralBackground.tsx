import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface Point {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
}

export function NeuralBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width: number;
        let height: number;
        let points: Point[] = [];
        const pointCount = 60;
        const connectionDistance = 150;
        const mousePosition = { x: -1000, y: -1000 };

        const init = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;

            points = [];
            for (let i = 0; i < pointCount; i++) {
                points.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    radius: Math.random() * 2 + 1,
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            const themeColor = resolvedTheme === 'dark' ? '217, 70, 239' : '139, 92, 246'; // Primary color in RGB

            points.forEach((p, i) => {
                // Move points
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off walls
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Mouse interaction (pull points)
                const dx = mousePosition.x - p.x;
                const dy = mousePosition.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 200) {
                    p.x += dx * 0.01;
                    p.y += dy * 0.01;
                }

                // Draw point
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${themeColor}, 0.5)`;
                ctx.fill();

                // Draw connections
                for (let j = i + 1; j < points.length; j++) {
                    const p2 = points[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        const opacity = (1 - distance / connectionDistance) * 0.2;
                        ctx.strokeStyle = `rgba(${themeColor}, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();

                        // Pulse effect on lines
                        if (Math.random() > 0.999) {
                            // Add a "packet" animation here if needed
                        }
                    }
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mousePosition.x = e.clientX;
            mousePosition.y = e.clientY;
        };

        const handleResize = () => {
            init();
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        init();
        draw();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, [resolvedTheme]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0"
            style={{ opacity: 0.6 }}
        />
    );
}

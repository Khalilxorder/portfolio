import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';

interface AnalogGlitchProps {
    children: React.ReactNode;
}

export const AnalogGlitch: React.FC<AnalogGlitchProps> = ({ children }) => {
    const [velocity, setVelocity] = useState(0);
    const lastMousePos = useRef({ x: 0, y: 0 });
    const lastTime = useRef(Date.now());
    const requestRef = useRef<number>();

    const { scrollY } = useScroll();
    const [scrollVelocity, setScrollVelocity] = useState(0);
    const lastScrollY = useRef(0);

    // Track mouse velocity
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            const dt = now - lastTime.current;
            if (dt <= 0) return;

            const dx = e.clientX - lastMousePos.current.x;
            const dy = e.clientY - lastMousePos.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const v = dist / dt;
            setVelocity(prev => Math.max(prev, v * 0.5)); // Dampen mouse velocity impact

            lastMousePos.current = { x: e.clientX, y: e.clientY };
            lastTime.current = now;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Track scroll velocity
    useEffect(() => {
        return scrollY.onChange((latest) => {
            const v = Math.abs(latest - lastScrollY.current);
            setScrollVelocity(v * 0.1); // Scale scroll velocity
            lastScrollY.current = latest;
        });
    }, [scrollY]);

    // Decay velocity over time
    const decayVelocity = () => {
        setVelocity(prev => prev * 0.9);
        setScrollVelocity(prev => prev * 0.9);
        requestRef.current = requestAnimationFrame(decayVelocity);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(decayVelocity);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    const totalVelocity = Math.min((velocity + scrollVelocity), 15);
    const springVelocity = useSpring(totalVelocity, { stiffness: 50, damping: 20 });

    // Map velocity to glitch effects
    const blurValue = useTransform(springVelocity, [0, 5, 15], [0, 0.5, 2]);
    const skewX = useTransform(springVelocity, [0, 10, 15], [0, 0.2, 0.5]);
    const brightness = useTransform(springVelocity, [0, 10, 15], [1, 1.05, 1.15]);
    const hueRotate = useTransform(springVelocity, [0, 12, 15], [0, 1, 3]);

    // Random stutter/jitter for "bad cable" feel
    const [jitterX, setJitterX] = useState(0);
    useEffect(() => {
        if (totalVelocity > 2) {
            const interval = setInterval(() => {
                setJitterX((Math.random() - 0.5) * totalVelocity * 0.5);
            }, 50);
            return () => clearInterval(interval);
        } else {
            setJitterX(0);
        }
    }, [totalVelocity]);

    return (
        <motion.div
            style={{
                filter: useTransform(
                    [blurValue, brightness, hueRotate],
                    ([b, br, h]) => `blur(${b}px) brightness(${br}) hue-rotate(${h}deg)`
                ),
                skewX: skewX,
                x: jitterX,
            }}
            className="will-change-transform pointer-events-auto"
        >
            {children}

            {/* Fake scanlines overlay when moving fast */}
            <motion.div
                className="fixed inset-0 z-[100] opacity-0 mix-blend-overlay"
                style={{
                    pointerEvents: 'none',
                    opacity: useTransform(springVelocity, [5, 15], [0, 0.15]),
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 3px)',
                    backgroundSize: '100% 4px'
                }}
            />
        </motion.div>
    );
};

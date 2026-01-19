import React, { useState, useEffect } from 'react';

interface MatrixTextProps {
    text: string;
    duration?: number;
    className?: string;
    delay?: number;
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@&%*+=-/<>[]{}';

export function MatrixText({ text, duration = 800, className = '', delay = 0 }: MatrixTextProps) {
    const [displayText, setDisplayText] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        let timeoutId: number;
        let frameId: number;

        const startAnimation = () => {
            setIsAnimating(true);
            const startTime = Date.now();

            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);

                let result = '';
                for (let i = 0; i < text.length; i++) {
                    if (progress >= (i / text.length)) {
                        result += text[i];
                    } else {
                        result += characters[Math.floor(Math.random() * characters.length)];
                    }
                }

                setDisplayText(result);

                if (progress < 1) {
                    frameId = requestAnimationFrame(animate);
                } else {
                    setIsAnimating(false);
                }
            };

            frameId = requestAnimationFrame(animate);
        };

        timeoutId = window.setTimeout(startAnimation, delay);

        return () => {
            clearTimeout(timeoutId);
            cancelAnimationFrame(frameId);
        };
    }, [text, duration, delay]);

    return (
        <span className={className}>
            {displayText || text}
        </span>
    );
}

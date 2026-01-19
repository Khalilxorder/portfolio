import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SectionTransitionProps {
    isTransitioning: boolean;
}

export function SectionTransition({ isTransitioning }: SectionTransitionProps) {
    const [binaryData, setBinaryData] = useState<string[][]>([]);

    useEffect(() => {
        if (isTransitioning) {
            const rows = 20;
            const cols = 15;
            const data = Array.from({ length: rows }, () =>
                Array.from({ length: cols }, () => Math.round(Math.random()).toString())
            );
            setBinaryData(data);
        }
    }, [isTransitioning]);

    return (
        <AnimatePresence>
            {isTransitioning && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden pointer-events-none"
                >
                    <div className="grid grid-cols-15 gap-4 opacity-20">
                        {binaryData.flat().map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                                transition={{
                                    duration: 0.5,
                                    delay: Math.random() * 0.3,
                                    repeat: Infinity
                                }}
                                className="text-primary font-mono text-xl"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        className="absolute h-1 w-full bg-primary shadow-[0_0_20px_var(--primary)]"
                    />
                    <div className="absolute terminal-text text-primary text-xs font-bold tracking-widest animate-pulse">
                        LOADING_NEURAL_MODULE...
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

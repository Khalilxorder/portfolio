import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
    onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
    const [phase, setPhase] = useState<'approaching' | 'colliding' | 'splashing'>('approaching');

    useEffect(() => {
        // Stage 1: Celestial bodies approach each other
        const approachTimer = setTimeout(() => {
            setPhase('colliding');
        }, 3000);

        // Stage 2: Collision and energy splash
        const collisionTimer = setTimeout(() => {
            setPhase('splashing');
        }, 3800);

        // Stage 3: Animation complete
        const finishTimer = setTimeout(() => {
            onComplete();
        }, 5000);

        return () => {
            clearTimeout(approachTimer);
            clearTimeout(collisionTimer);
            clearTimeout(finishTimer);
        };
    }, [onComplete]);

    // Generate random stars
    const stars = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 3 + 2,
    }));

    return (
        <div
            className="fixed inset-0 flex items-center justify-center overflow-hidden"
            style={{
                zIndex: 9999,
                backgroundColor: '#050110'
            }}
        >
            {/* Starry Sky */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {stars.map((star) => (
                    <motion.div
                        key={star.id}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: star.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 2
                        }}
                        style={{
                            position: 'absolute',
                            top: star.top,
                            left: star.left,
                            width: star.size,
                            height: star.size,
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                        }}
                    />
                ))}
            </div>

            {/* Background Glows (Purple and Pink) */}
            <motion.div
                animate={{
                    opacity: phase === 'approaching' ? 0.3 : phase === 'colliding' ? 0.6 : 0,
                    scale: phase === 'colliding' ? 1.5 : 1,
                }}
                className="absolute inset-0 bg-gradient-to-tr from-purple-900 via-pink-900 to-transparent opacity-30 blur-[100px]"
                style={{ pointerEvents: 'none' }}
            />

            <AnimatePresence>
                {phase !== 'splashing' && (
                    <div className="relative w-full h-full flex items-center justify-center">
                        {/* The Sun */}
                        <motion.div
                            initial={{ x: '-150%', y: '-20%' }}
                            animate={
                                phase === 'approaching'
                                    ? { x: '-20%', y: '0%', scale: 1 }
                                    : { x: '0%', y: '0%', scale: 1.2 }
                            }
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 3, ease: "easeInOut" }}
                            className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-yellow-300 via-orange-500 to-red-600"
                            style={{
                                boxShadow: '0 0 100px rgba(255, 170, 0, 0.6), 0 0 200px rgba(255, 80, 0, 0.4)',
                                filter: 'blur(2px)',
                                zIndex: 10
                            }}
                        >
                            {/* Sun Core Glow */}
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-2 rounded-full bg-white/30 blur-md"
                            />
                        </motion.div>

                        {/* The Moon */}
                        <motion.div
                            initial={{ x: '150%', y: '20%' }}
                            animate={
                                phase === 'approaching'
                                    ? { x: '20%', y: '0%', scale: 1 }
                                    : { x: '0%', y: '0%', scale: 1.2 }
                            }
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 3, ease: "easeInOut" }}
                            className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-blue-100 via-blue-300 to-indigo-400"
                            style={{
                                boxShadow: '0 0 80px rgba(100, 200, 255, 0.5), 0 0 150px rgba(150, 0, 255, 0.3)',
                                filter: 'blur(1px)',
                                zIndex: 11
                            }}
                        >
                            {/* Moon Texture / Craters (Abstract) */}
                            <div className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-black/10 blur-sm" />
                            <div className="absolute top-2/3 left-1/2 w-6 h-6 rounded-full bg-black/10 blur-sm" />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Collision Flare / Splash */}
            <AnimatePresence>
                {phase === 'splashing' && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 30, opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 1.2, times: [0, 0.2, 0.8, 1], ease: "easeOut" }}
                        className="absolute z-[100] rounded-full w-20 h-20"
                        style={{
                            background: 'radial-gradient(circle, #ffffff 0%, #ff00ff 30%, #4b0082 70%, transparent 100%)',
                        }}
                    >
                        {/* Internal shards of light */}
                        <div className="absolute inset-0 bg-white blur-3xl opacity-50 rounded-full" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Energy Rings / Shockwaves */}
            <AnimatePresence>
                {phase === 'colliding' && (
                    <div className="absolute flex items-center justify-center">
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 6, opacity: [0, 0.5, 0] }}
                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                className="absolute border-4 border-white/30 rounded-full"
                                style={{ width: 100, height: 100 }}
                            />
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SplashScreen;

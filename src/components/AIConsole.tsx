import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, ChevronRight, Share2, Info, Command } from 'lucide-react';

const INITIAL_MESSAGE = `[SYSTEM_INIT] Neural Shell V2.5.0
[INFO] Connection established: LOCALHOST
[INFO] User profile: RECRUITER_IDENTIFIED_0x7F
Type 'help' for available commands.`;

export function AIConsole() {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState<string[]>([INITIAL_MESSAGE]);
    const [input, setInput] = useState('');
    const [logs, setLogs] = useState<string[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Command handlers
    const commands: Record<string, (arg?: string) => string> = {
        help: () => 'Available: help, ls, cat, sync, profile, clear',
        ls: () => 'index.tsx\nabout.txt\nprojects/\nresume.pdf\nskills.json',
        cat: (file) => {
            if (!file) return 'Usage: cat <filename>';
            if (file === 'about.txt') return 'Khalil Sabha: AI-Focused Developer & UX Architect.';
            if (file === 'skills.json') return '["React", "Node.js", "Python", "FastAPI", "ML", "UI/UX"]';
            return `File not found: ${file}`;
        },
        sync: () => 'Synchronizing neural weights with local environment...\nDone. (100%)',
        profile: () => 'ROLE: Senior Tech Lead\nFOCUS: AI Infrastructure\nSTATUS: Open to high-impact roles.',
        clear: () => {
            setHistory([INITIAL_MESSAGE]);
            return '';
        }
    };

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const [cmd, arg] = input.trim().toLowerCase().split(' ');
        let output = '';

        if (commands[cmd]) {
            output = commands[cmd](arg);
        } else {
            output = `Command not recognized: ${cmd}. Type 'help' for instructions.`;
        }

        setHistory(prev => [...prev, `> ${input}`, output].filter(Boolean));
        setInput('');
    };

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    // Simulate background system events
    useEffect(() => {
        const events = [
            '[EVENT] Background process optimized.',
            '[INFO] Cache flushed.',
            '[WARN] High CPU load detected: Optimizing...',
            '[STATUS] Neural mesh synchronized.'
        ];

        const interval = setInterval(() => {
            if (Math.random() > 0.8) {
                const event = events[Math.floor(Math.random() * events.length)];
                setHistory(prev => [...prev, event]);
            }
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* Floating Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-[60] p-4 bg-primary text-primary-foreground rounded-full shadow-[0_0_20px_var(--primary)] group"
            >
                <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20" />
                <Terminal className="w-6 h-6" />
                <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute right-16 top-1/2 -translate-y-1/2 bg-black/80 text-primary px-3 py-1 rounded text-[10px] terminal-text whitespace-nowrap border border-primary/30"
                >
                    OPEN_CONSOLE
                </motion.span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        className="fixed bottom-24 right-6 z-[60] w-[400px] h-[500px] terminal-bg rounded-lg flex flex-col overflow-hidden max-w-[90vw]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-3 border-b border-primary/20 bg-primary/5">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                                </div>
                                <span className="text-[10px] terminal-text text-primary font-bold ml-2 flex items-center gap-1">
                                    <Command className="w-3 h-3" /> k_sabha@neural_shell ~
                                </span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-primary hover:bg-primary/20 p-1 rounded transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Terminal Body */}
                        <div
                            ref={scrollRef}
                            className="flex-1 p-4 overflow-y-auto font-mono text-xs leading-relaxed custom-scrollbar bg-black/20"
                        >
                            <div className="flex flex-col gap-2">
                                {history.map((line, i) => (
                                    <div
                                        key={i}
                                        className={`${line.startsWith('>') ? 'text-primary' : line.startsWith('[') ? 'text-secondary opacity-80' : 'text-primary/70'} whitespace-pre-wrap`}
                                    >
                                        {line}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleCommand} className="p-3 border-t border-primary/20 bg-black/40 flex items-center gap-2">
                            <ChevronRight className="w-4 h-4 text-primary" />
                            <input
                                autoFocus
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="bg-transparent border-none outline-none text-primary w-full terminal-text text-sm"
                                placeholder="EXECUTE_COMMAND..."
                            />
                        </form>

                        {/* Footer Status */}
                        <div className="p-1 px-3 border-t border-primary/10 bg-primary/5 flex justify-between items-center opacity-50">
                            <span className="text-[8px] terminal-text text-primary">STATUS: NODE_STABLE</span>
                            <span className="text-[8px] terminal-text text-primary">ENCRYPT: SH-256</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { ChevronDown, ArrowRight, Cpu, Activity, Terminal as TerminalIcon, ShieldCheck } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { NeuralBackground } from './NeuralBackground';
import { MatrixText } from './MatrixText';
import profileImageLight from '../assets/1ac236e9226f9c05a21400fd39173611d03582ca.png';
import profileImageDark from '../assets/hero-dark.jpg';

interface HeroSectionProps {
  onSectionChange: (section: string) => void;
}

// System Diagnostic HUD Element
function SystemHUD() {
  const [metrics, setMetrics] = useState({ cpu: 45, mem: 32, load: 1.2 });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.floor(Math.random() * 20) + 40,
        mem: Math.floor(Math.random() * 10) + 30,
        load: parseFloat((Math.random() * 0.5 + 1.0).toFixed(2))
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-24 right-8 hidden xl:flex flex-col gap-4 z-20 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="terminal-bg p-4 rounded-lg flex flex-col gap-2 min-w-[200px]"
      >
        <div className="flex items-center gap-2 text-primary">
          <Cpu className="w-4 h-4" />
          <span className="text-xs font-bold terminal-text">KERNEL STATUS: ONLINE</span>
        </div>
        <div className="h-1 w-full bg-primary/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            animate={{ width: `${metrics.cpu}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground terminal-text">
          <span>PROC_LOAD: {metrics.cpu}%</span>
          <span>MEM_ALLOC: {metrics.mem}%</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="terminal-bg p-4 rounded-lg flex flex-col gap-2"
      >
        <div className="flex items-center gap-2 text-secondary">
          <Activity className="w-4 h-4" />
          <span className="text-xs font-bold terminal-text">NEURAL_ENGINE: ACTIVE</span>
        </div>
        <div className="text-[10px] text-muted-foreground terminal-text overflow-hidden h-12">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="whitespace-nowrap">
              {Math.random().toString(16).toUpperCase()}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Magnetic button component
function MagneticButton({ children, onClick, className, variant = 'default' }: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'outline';
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${className} ${variant === 'outline'
          ? 'border border-border text-muted-foreground hover:bg-secondary/20 hover:text-foreground hover:border-secondary'
          : 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/25'
        } inline-flex items-center justify-center rounded-md text-sm font-medium h-11 px-8 transition-all duration-300 relative group overflow-hidden`}
    >
      <span className="relative z-10 flex items-center">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
    </motion.button>
  );
}

export function HeroSection({ onSectionChange }: HeroSectionProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [flashTheme, setFlashTheme] = useState<string | undefined>(undefined);
  const prevThemeRef = useRef(resolvedTheme);
  const imageRef = useRef<HTMLDivElement>(null);

  // 3D tilt effect for profile image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);

  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Trigger flash animation when theme changes
  useEffect(() => {
    if (mounted && prevThemeRef.current !== resolvedTheme) {
      setFlashTheme(resolvedTheme);
      setIsFlashing(true);
      prevThemeRef.current = resolvedTheme;

      const timer = setTimeout(() => {
        setIsFlashing(false);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [resolvedTheme, mounted]);

  const sectionCards = [
    {
      id: 'live-sites',
      title: 'AI Deployments',
      description: 'Production-ready AI agents and high-performance web systems.',
      count: '5+ Systems',
      icon: <TerminalIcon className="w-5 h-5" />
    },
    {
      id: 'ux-case-studies',
      title: 'Neural UX',
      description: 'Designing intuitive interfaces for complex machine learning models.',
      count: '3 Projects',
      icon: <Cpu className="w-5 h-5" />
    },
    {
      id: 'ui-projects',
      title: 'Synthetic UI',
      description: 'Visual systems that bridge human intent with computer logic.',
      count: '5 Projects',
      icon: <ShieldCheck className="w-5 h-5" />
    },
  ];

  return (
    <div className="min-h-screen bg-background transition-colors duration-500 relative overflow-hidden scanlines">
      {/* Neural Background - The Core visual */}
      <NeuralBackground />

      {/* System HUD Overlay */}
      <SystemHUD />

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-px w-8 bg-primary" />
                <span className="text-xs font-bold text-primary terminal-text tracking-widest">SYSTEM_INITIALIZED: V2.5.0</span>
              </div>

              <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-foreground">
                <MatrixText text="Architecting" className="block" />
                <span className="block mt-2 relative">
                  <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-x font-bold">
                    intelligent systems
                  </span>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-lg leading-relaxed max-w-lg text-muted-foreground terminal-text"
              >
                Engineer & Designer building the next generation of AI-driven products.
                Merging performance with precision design.
              </motion.p>
            </div>

            {/* Magnetic CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <MagneticButton onClick={() => onSectionChange('all-projects')}>
                Execute Protocol
                <ArrowRight className="w-4 h-4 ml-2" />
              </MagneticButton>
              <MagneticButton variant="outline" className="terminal-text">
                System_Resume.pdf
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image with 3D Tilt */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="flex justify-center lg:justify-end"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              ref={imageRef}
              style={{
                rotateX: springRotateX,
                rotateY: springRotateY,
                transformStyle: 'preserve-3d',
              }}
              className="relative"
            >
              {/* Spinning tech rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-40px] border border-dashed border-primary/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-60px] border border-dotted border-secondary/20 rounded-full"
              />

              <Avatar className="relative w-80 h-80 shadow-2xl overflow-hidden bg-card ring-1 ring-primary/40 hover-glitch">
                {/* Light Mode Image */}
                <AvatarImage
                  src={profileImageLight}
                  alt="KHALIL SABHA - Light"
                  className={`object-cover absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${mounted && resolvedTheme === 'dark' ? 'opacity-0' : 'opacity-100'}`}
                />

                {/* Dark Mode Image */}
                <AvatarImage
                  src={profileImageDark}
                  alt="KHALIL SABHA - Dark"
                  className={`object-cover absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${mounted && resolvedTheme === 'dark' ? 'opacity-100' : 'opacity-0'}`}
                  style={{ transform: 'scale(1.05) translateY(2%)' }}
                />

                <AnimatePresence>
                  {isFlashing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.8 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`absolute inset-0 rounded-full pointer-events-none ${flashTheme === 'dark' ? 'bg-violet-500' : 'bg-amber-300'}`}
                    />
                  )}
                </AnimatePresence>
                <AvatarFallback className="text-6xl terminal-text">KS</AvatarFallback>
              </Avatar>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex justify-center mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="flex flex-col items-center space-y-2"
          >
            <span className="text-[10px] terminal-text text-primary tracking-widest animate-pulse">SCROLL_FOR_INTEL</span>
            <ChevronDown className="w-5 h-5 text-primary" />
          </motion.div>
        </motion.div>
      </div>

      {/* Section Navigation Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
        <div className="grid md:grid-cols-3 gap-6">
          {sectionCards.map((card, index) => (
            <motion.button
              key={card.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + (index * 0.15), duration: 0.6, type: 'spring' }}
              whileHover={{
                scale: 1.03,
                y: -5,
                borderColor: 'var(--primary)'
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSectionChange(card.id)}
              className="group p-8 rounded-2xl text-left transition-all duration-300 bg-black/40 backdrop-blur-md border border-white/5 hover:border-primary/50 relative overflow-hidden"
            >
              {/* Hover sweep effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {card.icon}
                  </div>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 text-primary opacity-50 group-hover:opacity-100" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-card-foreground terminal-text uppercase tracking-tight">
                    {card.title}
                  </h3>
                  <div className="h-0.5 w-8 bg-primary/30 mt-1 transition-all group-hover:w-full" />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground terminal-text opacity-80">
                  {card.description}
                </p>
                <div className="text-[10px] font-bold text-primary terminal-text tracking-tighter">
                  {card.count}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
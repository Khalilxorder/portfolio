import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import profileImageLight from '../assets/1ac236e9226f9c05a21400fd39173611d03582ca.png';
import profileImageDark from '../assets/hero-dark.jpg';

interface HeroSectionProps {
  onSectionChange: (section: string) => void;
}

// Animated floating particles component
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/20"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
          }}
          animate={{
            x: [null, Math.random() * 100 - 50 + '%'],
            y: [null, Math.random() * 100 - 50 + '%'],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}

// Text reveal animation variants
const textRevealContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const textRevealChild = {
  hidden: {
    opacity: 0,
    y: 50,
    rotateX: -90,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
};

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
        } inline-flex items-center justify-center rounded-md text-sm font-medium h-11 px-8 transition-all duration-300`}
    >
      {children}
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
      title: 'Live Sites',
      description: 'Production applications and websites built with modern technologies.',
      count: '5+ Projects'
    },
    {
      id: 'ux-case-studies',
      title: 'UX Case Studies',
      description: 'Deep-dive into user research, design process, and problem-solving methodologies.',
      count: '3 Projects'
    },
    {
      id: 'ui-projects',
      title: 'UI Projects',
      description: 'Visual design explorations, interface components, and design system work.',
      count: '5 Projects'
    },
  ];

  const titleWords = ['Creating', 'intuitive'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted transition-colors duration-500 relative overflow-hidden">
      {/* Animated Background Particles */}
      <FloatingParticles />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -30, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

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
              {/* Animated Title with Word-by-Word Reveal */}
              <motion.h1
                variants={textRevealContainer}
                initial="hidden"
                animate="visible"
                className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-foreground"
                style={{ perspective: 1000 }}
              >
                <div className="overflow-hidden">
                  {titleWords.map((word, i) => (
                    <motion.span
                      key={i}
                      variants={textRevealChild}
                      className="inline-block mr-4"
                      style={{ transformOrigin: 'bottom' }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
                {/* Gradient text with shimmer effect */}
                <motion.span
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6, type: 'spring' }}
                  className="block relative overflow-hidden"
                >
                  <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-x">
                    digital experiences
                  </span>
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-lg leading-relaxed max-w-lg text-muted-foreground"
              >
                UI/UX Designer & Front-end Developer focused on user-centered design
                and bringing ideas to life through code.
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
                View All Projects
                <ArrowRight className="w-4 h-4 ml-2" />
              </MagneticButton>
              <MagneticButton variant="outline">
                Download Resume
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
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="relative"
            >
              {/* Glowing backdrop */}
              <motion.div
                className="absolute inset-0 rounded-full blur-3xl bg-gradient-to-br from-primary to-secondary"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              <Avatar className="relative w-80 h-80 shadow-2xl overflow-hidden bg-card ring-4 ring-primary/20">
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

                {/* Theme Transition Flash */}
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

                <AvatarFallback className="text-6xl">KS</AvatarFallback>
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
            <span className="text-sm text-muted-foreground">Scroll to explore</span>
            <motion.div
              animate={{
                boxShadow: ['0 0 0 0 rgba(251, 191, 36, 0)', '0 0 20px 10px rgba(251, 191, 36, 0.3)', '0 0 0 0 rgba(251, 191, 36, 0)']
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="rounded-full p-1"
            >
              <ChevronDown className="w-5 h-5 text-primary" />
            </motion.div>
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
                boxShadow: '0 20px 40px -10px rgba(251, 191, 36, 0.2)'
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSectionChange(card.id)}
              className="group p-8 rounded-2xl text-left transition-colors duration-300 bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50"
            >
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + (index * 0.15) }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium text-card-foreground">
                    {card.title}
                  </h3>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </motion.div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
                <div className="text-xs font-medium text-primary">
                  {card.count}
                </div>
              </motion.div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
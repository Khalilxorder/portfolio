import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import profileImageLight from '../assets/1ac236e9226f9c05a21400fd39173611d03582ca.png';
import profileImageDark from '../assets/hero-dark.jpg';

interface HeroSectionProps {
  onSectionChange: (section: string) => void;
}

export function HeroSection({ onSectionChange }: HeroSectionProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [flashTheme, setFlashTheme] = useState<string | undefined>(undefined);
  const prevThemeRef = useRef(resolvedTheme);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Trigger flash animation when theme changes
  useEffect(() => {
    if (mounted && prevThemeRef.current !== resolvedTheme) {
      // Store which theme we're transitioning TO for the flash color
      setFlashTheme(resolvedTheme);
      setIsFlashing(true);
      prevThemeRef.current = resolvedTheme;

      // Auto-clear the flash after animation completes
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
      count: '3+ Projects'
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted transition-colors duration-500">
      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-foreground"
              >
                Creating intuitive
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  digital experiences
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-lg leading-relaxed max-w-lg text-muted-foreground"
              >
                UI/UX Designer & Front-end Developer focused on user-centered design
                and bringing ideas to life through code.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                onClick={() => onSectionChange('all-projects')}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-primary/25"
              >
                View All Projects
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-border text-muted-foreground hover:bg-secondary/20 hover:text-foreground hover:border-secondary transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Download Resume
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-primary to-secondary animate-pulse" />
              <Avatar className="relative w-80 h-80 shadow-2xl overflow-hidden bg-card">
                {/* Light Mode Image */}
                <AvatarImage
                  src={profileImageLight}
                  alt="KHALIL SABHA - Light"
                  className={`object-cover absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${mounted && resolvedTheme === 'dark' ? 'opacity-0' : 'opacity-100'}`}
                />

                {/* Dark Mode Image - Adjusted for Alignment */}
                <AvatarImage
                  src={profileImageDark}
                  alt="KHALIL SABHA - Dark"
                  className={`object-cover absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${mounted && resolvedTheme === 'dark' ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    transform: 'scale(1.05) translateY(2%)'
                  }}
                />

                {/* Theme Transition Color Flash Overlay */}
                {isFlashing && (
                  <div
                    className={`absolute inset-0 rounded-full pointer-events-none ${flashTheme === 'dark' ? 'theme-flash-dark' : 'theme-flash-light'
                      }`}
                  />
                )}

                <AvatarFallback className="text-6xl">KS</AvatarFallback>
              </Avatar>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex justify-center mt-16"
        >
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            <span className="text-sm text-muted-foreground">
              Scroll to explore
            </span>
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </div>
        </motion.div>
      </div>

      {/* Section Navigation Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {sectionCards.map((card, index) => (
            <motion.button
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + (index * 0.1), duration: 0.5 }}
              onClick={() => onSectionChange(card.id)}
              className="group p-8 rounded-2xl text-left transition-all duration-300 hover:scale-[1.02] bg-card border border-border hover:border-secondary hover:shadow-lg hover:shadow-secondary/20"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium text-card-foreground">
                    {card.title}
                  </h3>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 text-primary" />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
                <div className="text-xs font-medium text-muted-foreground">
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
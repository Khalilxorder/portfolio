import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import profileImage from '../assets/1ac236e9226f9c05a21400fd39173611d03582ca.png';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onProfileClick: () => void;
}

export function Navigation({ activeSection, onSectionChange, onProfileClick }: NavigationProps) {
  const { theme, setTheme } = useTheme();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'all-projects', label: 'All Projects' },
    { id: 'ux-case-studies', label: 'UX Case Studies' },
    { id: 'ui-projects', label: 'UI Projects' },
    { id: 'live-sites', label: 'Live Sites' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 backdrop-blur-md border-b bg-background/90 border-border transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Name with hover effect */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => onSectionChange('home')}
              className="text-lg font-medium text-foreground hover:text-primary transition-colors relative group"
            >
              KHALIL SABHA
              <motion.span
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                layoutId="logo-underline"
              />
            </button>
          </motion.div>

          {/* Center Navigation with animated indicator */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1 relative">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`relative px-4 py-2 text-sm transition-colors duration-200 rounded-md ${activeSection === item.id
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Toggle with rotation animation */}
          <motion.button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, rotate: 180 }}
            className="p-2 mr-4 rounded-full text-muted-foreground hover:text-primary transition-colors duration-300 hover:bg-muted/50"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {theme === 'dark' ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0, scale: 0 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sun className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0, scale: 0 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Moon className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Profile Avatar with ring animation */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={onProfileClick}
              className="rounded-full ring-2 ring-transparent hover:ring-primary transition-all duration-300"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={profileImage} alt="Profile" />
                <AvatarFallback>KS</AvatarFallback>
              </Avatar>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="px-4 py-2 border-t border-border overflow-x-auto">
          <div className="flex space-x-2">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                whileTap={{ scale: 0.95 }}
                className={`whitespace-nowrap px-3 py-2 text-sm rounded-md transition-all duration-200 ${activeSection === item.id
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
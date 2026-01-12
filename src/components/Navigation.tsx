import React from 'react';
import { Button } from './ui/button';
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
    <nav className="sticky top-0 z-50 backdrop-blur-md border-b bg-background/90 border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Name */}
          <div className="flex-shrink-0">
            <button
              onClick={() => onSectionChange('home')}
              className="text-lg font-medium text-foreground hover:text-primary transition-colors"
            >
              KHALIL SABHA
            </button>
          </div>

          {/* Center Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`relative px-3 py-2 text-sm transition-all duration-200 ${activeSection === item.id
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 mr-4 rounded-full text-muted-foreground hover:text-primary transition-all duration-300 hover:bg-muted/50 active:scale-90"
            aria-label="Toggle theme"
          >
            {/* Show Moon in light mode, Sun in dark mode */}
            <div className="relative w-5 h-5">
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-500 ease-in-out dark:-rotate-90 dark:scale-0 absolute inset-0" />
              <Moon className="h-5 w-5 rotate-90 scale-0 transition-all duration-500 ease-in-out dark:rotate-0 dark:scale-100 absolute inset-0" />
            </div>
          </button>

          {/* Profile Avatar */}
          <div className="flex-shrink-0">
            <button onClick={onProfileClick} className="rounded-full ring-2 ring-transparent hover:ring-secondary hover:ring-opacity-50 transition-all duration-200">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profileImage} alt="Profile" />
                <AvatarFallback>KS</AvatarFallback>
              </Avatar>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="px-4 py-2 border-t border-border">
          <div className="flex space-x-4 overflow-x-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`whitespace-nowrap px-3 py-2 text-sm transition-colors ${activeSection === item.id
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
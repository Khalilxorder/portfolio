import React from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import profileImage from 'figma:asset/1ac236e9226f9c05a21400fd39173611d03582ca.png';

interface HeroSectionProps {
  onSectionChange: (section: string) => void;
}

export function HeroSection({ onSectionChange }: HeroSectionProps) {
  useTheme(); // Keep for consistency

  const sectionCards = [
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
    {
      id: 'live-sites',
      title: 'Live Sites',
      description: 'Production applications and websites built with modern technologies.',
      count: '3+ Projects'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted transition-colors duration-500">
      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-foreground">
                Creating intuitive
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  digital experiences
                </span>
              </h1>
              <p className="text-lg leading-relaxed max-w-lg text-muted-foreground">
                UI/UX Designer & Front-end Developer focused on user-centered design 
                and bringing ideas to life through code.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => onSectionChange('all-projects')}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                View All Projects
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-border text-muted-foreground hover:bg-secondary/20 hover:text-foreground hover:border-secondary"
              >
                Download Resume
              </Button>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-primary to-secondary" />
              <Avatar className="relative w-80 h-80 shadow-2xl">
                <AvatarImage 
                  src={profileImage} 
                  alt="KHALIL SABHA"
                  className="object-cover"
                />
                <AvatarFallback className="text-6xl">KS</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-16">
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            <span className="text-sm text-muted-foreground">
              Scroll to explore
            </span>
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Section Navigation Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {sectionCards.map((card) => (
            <button
              key={card.id}
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
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
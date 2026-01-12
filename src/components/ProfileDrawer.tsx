import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from './ui/sheet';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Download, Mail, Linkedin, Github, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import profileImage from '../assets/1ac236e9226f9c05a21400fd39173611d03582ca.png';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileDrawer({ isOpen, onClose }: ProfileDrawerProps) {
  useTheme(); // Keep for consistency

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-[400px] sm:w-[540px] bg-background border-border"
      >
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="text-foreground">
              Profile & Resume
            </SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-secondary/20">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
          <SheetDescription className="text-muted-foreground">
            View detailed profile information, download resume, and access contact details.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-6">
          {/* Profile Section */}
          <div className="text-center">
            <Avatar className="h-24 w-24 mx-auto mb-4">
              <AvatarImage src={profileImage} alt="KHALIL SABHA" />
              <AvatarFallback>KS</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-medium mb-2 text-foreground">
              KHALIL SABHA
            </h2>
            <p className="text-sm mb-4 text-primary">
              Senior UI/UX Designer & Front-end Developer
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Passionate about creating intuitive digital experiences that solve real user problems. 
              5+ years of experience in product design and development, with a focus on user-centered design 
              methodologies and modern web technologies.
            </p>
          </div>

          {/* Contact & Resume */}
          <div className="space-y-4">
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Resume (PDF)
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
              <Button 
                variant="outline" 
                className="border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
            </div>

            <Button 
              variant="outline" 
              className="w-full border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <Github className="w-4 h-4 mr-2" />
              View GitHub Profile
            </Button>
          </div>

          {/* Skills & Tools */}
          <div>
            <h3 className="font-medium mb-3 text-foreground">
              Skills & Tools
            </h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium mb-2 text-muted-foreground">
                  Design
                </h4>
                <p className="text-sm text-muted-foreground">
                  Figma, Sketch, Adobe XD, Principle, ProtoPie
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2 text-muted-foreground">
                  Development
                </h4>
                <p className="text-sm text-muted-foreground">
                  React, TypeScript, Tailwind CSS, Next.js
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2 text-muted-foreground">
                  Research
                </h4>
                <p className="text-sm text-muted-foreground">
                  User Interviews, Usability Testing, Analytics
                </p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
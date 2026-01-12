import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { X, ChevronLeft, ChevronRight, ExternalLink, ArrowLeft } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Project } from './ProjectCard';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  useTheme(); // Keep for consistency
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when project changes or modal opens
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project?.id, isOpen]);

  if (!project) return null;

  // Mock additional images for gallery view
  const galleryImages = [
    project.image,
    "https://images.unsplash.com/photo-1551650992-ee4fd47df41f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcHAlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzU4MzI1MDI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1564424555153-04228f0aa7ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjB3aXJlZnJhbWVzfGVufDF8fHx8MTc1ODQzMzcwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkYXNoYm9hcmQlMjBkZXNpZ258ZW58MXx8fHwxNzU4NDMzNzA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  const nextImage = () => {
    if (project.type === 'ui-project') {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    } else if (project.type === 'case-study' && project.galleryImages) {
      setCurrentImageIndex((prev) => (prev + 1) % project.galleryImages.length);
    }
  };

  const prevImage = () => {
    if (project.type === 'ui-project') {
      setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    } else if (project.type === 'case-study' && project.galleryImages) {
      setCurrentImageIndex((prev) => (prev - 1 + project.galleryImages.length) % project.galleryImages.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, currentImageIndex, project]);

  if (project.type === 'ui-project') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-5xl h-[90vh] p-0 bg-background border-border">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl text-foreground">
                  {project.title}
                </DialogTitle>
                <DialogDescription className="text-sm mt-1">
                  UI Design Gallery
                </DialogDescription>
              </div>
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-secondary/20">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>
          </DialogHeader>

          <div className="flex-1 flex flex-col p-6 pt-4">
            {/* Main Image */}
            <div className="flex-1 relative rounded-xl overflow-hidden mb-4 bg-muted">
              <ImageWithFallback
                src={galleryImages[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-contain"
                loading="eager"
                decoding="async"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
              />
              
              {/* Navigation Arrows */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all bg-background/90 hover:bg-background text-foreground shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all bg-background/90 hover:bg-background text-foreground shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-sm bg-background/90 text-foreground">
                {currentImageIndex + 1} / {galleryImages.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all bg-muted ${
                    currentImageIndex === index
                      ? 'border-primary'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (project.type === 'case-study') {
    // If project has gallery images, use gallery view like UI projects
    if (project.galleryImages && project.galleryImages.length > 0) {
      return (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-5xl h-[90vh] p-0 bg-background border-border">
            <DialogHeader className="p-6 pb-0">
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="text-xl text-foreground">
                    {project.title}
                  </DialogTitle>
                  <DialogDescription className="text-sm mt-1">
                    UX Case Study Presentation
                  </DialogDescription>
                </div>
                <DialogClose asChild>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-secondary/20">
                    <X className="h-4 w-4" />
                  </Button>
                </DialogClose>
              </div>
            </DialogHeader>

            <div className="flex-1 flex flex-col p-6 pt-4">
              {/* Main Image */}
              <div className="flex-1 relative rounded-xl overflow-hidden mb-4 bg-muted">
                <ImageWithFallback
                  src={project.galleryImages[currentImageIndex]}
                  alt={`${project.title} - Slide ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain"
                  loading="eager"
                  decoding="async"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                />
                
                {/* Navigation Arrows */}
                {project.galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all bg-background/90 hover:bg-background text-foreground shadow-lg"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all bg-background/90 hover:bg-background text-foreground shadow-lg"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-sm bg-background/90 text-foreground">
                  {currentImageIndex + 1} / {project.galleryImages.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {project.galleryImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all bg-muted ${
                      currentImageIndex === index
                        ? 'border-primary'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="eager"
                      decoding="async"
                    />
                  </button>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    }

    // Default case study view (for projects without gallery images)
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background border-border">
          <DialogHeader className="sticky top-0 z-10 pb-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground hover:bg-secondary/20"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <DialogTitle className="text-xl text-foreground">
                    {project.title}
                  </DialogTitle>
                  <DialogDescription className="text-sm">
                    UX Case Study
                  </DialogDescription>
                </div>
              </div>
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-secondary/20">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>
          </DialogHeader>

          <div className="space-y-8 py-6">
            {/* Hero Image */}
            <div className="aspect-video rounded-xl overflow-hidden">
              <ImageWithFallback
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Project Overview */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium mb-3 text-foreground">
                  Project Overview
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  {project.description} This case study explores the design process from initial user research 
                  through final implementation, showcasing the methodologies and insights that drove the design decisions.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-3 text-foreground">
                  Project Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">
                      Year:
                    </span>
                    <span className="ml-2 text-muted-foreground">
                      {project.year}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Role:
                    </span>
                    <span className="ml-2 text-muted-foreground">
                      Lead UX Designer
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Duration:
                    </span>
                    <span className="ml-2 text-muted-foreground">
                      3 months
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Process Steps */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-foreground">Design Process</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2 text-foreground">1. Research & Discovery</h4>
                  <p className="text-sm text-muted-foreground">
                    Conducted user interviews, competitive analysis, and stakeholder workshops to understand 
                    the problem space and identify key user needs.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-foreground">2. Define & Ideate</h4>
                  <p className="text-sm text-muted-foreground">
                    Created user personas, journey maps, and defined the core problem statement. 
                    Facilitated ideation sessions to explore potential solutions.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-foreground">3. Design & Prototype</h4>
                  <p className="text-sm text-muted-foreground">
                    Developed wireframes, high-fidelity mockups, and interactive prototypes. 
                    Iterated based on feedback and usability testing results.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-foreground">4. Test & Iterate</h4>
                  <p className="text-sm text-muted-foreground">
                    Conducted usability tests with target users, gathered feedback, and refined 
                    the design based on insights and performance metrics.
                  </p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h4 className="font-medium mb-3 text-foreground">Skills & Tools</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (project.type === 'live-site') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background border-border">
          <DialogHeader className="pb-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl text-foreground">
                  {project.title}
                </DialogTitle>
                <DialogDescription className="text-sm mt-1">
                  Live Project Details
                </DialogDescription>
              </div>
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-secondary/20">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>
          </DialogHeader>

          <div className="space-y-6 py-6">
            {/* Project Image */}
            <div className="aspect-video rounded-xl overflow-hidden">
              <ImageWithFallback
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Project Info */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium mb-3 text-foreground">
                  About This Project
                </h3>
                <p className="leading-relaxed text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex gap-3">
                  {project.liveUrl && (
                    <Button
                      onClick={() => window.open(project.liveUrl, '_blank')}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit Live Site
                    </Button>
                  )}
                  {project.repoUrl && (
                    <Button
                      onClick={() => window.open(project.repoUrl, '_blank')}
                      variant="outline"
                      className="border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
                    >
                      View Source Code
                    </Button>
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3 text-foreground">
                  Project Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Year:</span>
                    <span className="ml-2 text-muted-foreground">{project.year}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <span className="ml-2 text-muted-foreground">Live & Maintained</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="font-medium mb-3 text-foreground">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}
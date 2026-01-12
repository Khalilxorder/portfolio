import React from 'react';
import { Badge } from './ui/badge';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '../contexts/ThemeContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  year: string;
  type: 'case-study' | 'ui-project' | 'live-site';
  liveUrl?: string;
  repoUrl?: string;
  galleryImages?: string[]; // For case studies with multiple presentation slides
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  useTheme(); // Keep for consistency

  const handleLiveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank');
    }
  };

  const handleRepoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.repoUrl) {
      window.open(project.repoUrl, '_blank');
    }
  };

  if (project.type === 'case-study') {
    return (
      <div
        onClick={onClick}
        className="group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
      >
        <div className="aspect-[16/10] overflow-hidden bg-muted">
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="eager"
            decoding="async"
            style={{ imageRendering: 'crisp-edges' }}
          />
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-medium text-card-foreground">
              {project.title}
            </h3>
            <ArrowUpRight className="w-5 h-5 transition-colors text-muted-foreground group-hover:text-primary" />
          </div>
          <p className="text-sm mb-4 text-muted-foreground">
            {project.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs bg-secondary text-secondary-foreground border-secondary"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {project.year}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (project.type === 'ui-project') {
    return (
      <div
        onClick={onClick}
        className="group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
      >
        <div className="aspect-square overflow-hidden relative bg-muted">
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="eager"
            decoding="async"
            style={{ imageRendering: 'crisp-edges' }}
          />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center bg-gradient-to-br from-primary/80 to-secondary/80">
            <span className="text-white font-medium">View Gallery</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-medium mb-2 text-card-foreground">
            {project.title}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {project.tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs bg-secondary text-secondary-foreground border-secondary"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {project.year}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (project.type === 'live-site') {
    return (
      <div
        className="rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
      >
        <div className="aspect-video overflow-hidden cursor-pointer bg-muted" onClick={onClick}>
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            loading="eager"
            decoding="async"
            style={{ imageRendering: 'crisp-edges' }}
          />
        </div>
        <div className="p-6">
          <h3 className="text-lg font-medium mb-2 text-card-foreground">
            {project.title}
          </h3>
          <p className="text-sm mb-4 text-muted-foreground">
            {project.description}
          </p>
          <div className="flex items-center gap-3 mb-4">
            {project.liveUrl && (
              <Button
                onClick={handleLiveClick}
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Live
              </Button>
            )}
            {project.repoUrl && (
              <Button
                onClick={handleRepoClick}
                variant="outline"
                size="sm"
                className="border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <Github className="w-4 h-4 mr-2" />
                View Code
              </Button>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary" 
                  className="text-xs bg-secondary text-secondary-foreground border-secondary"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {project.year}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
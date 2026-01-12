import React from 'react';
import { ProjectCard, Project } from './ProjectCard';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ProjectSectionProps {
  title: string;
  description: string;
  projects: Project[];
  sectionId: string;
  onProjectClick: (project: Project) => void;
  onBackClick: () => void;
}

export function ProjectSection({ 
  title, 
  description, 
  projects, 
  sectionId, 
  onProjectClick, 
  onBackClick 
}: ProjectSectionProps) {
  useTheme(); // Keep for consistency

  const getGridClass = () => {
    if (sectionId === 'ui-projects') {
      return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    }
    return 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="mb-16">
          <Button
            variant="ghost"
            onClick={onBackClick}
            className="mb-8 text-muted-foreground hover:text-foreground hover:bg-secondary/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-medium text-foreground">
              {title}
            </h1>
            <p className="text-lg max-w-3xl text-muted-foreground">
              {description}
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className={getGridClass()}>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => onProjectClick(project)}
            />
          ))}
        </div>

        {/* Section Footer */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-secondary text-secondary-foreground">
            {projects.length} {projects.length === 1 ? 'Project' : 'Projects'} • {sectionId === 'live-sites' ? 'Production Ready' : 'Design Focused'}
          </div>
        </div>
      </div>
    </div>
  );
}
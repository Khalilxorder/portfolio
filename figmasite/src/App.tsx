import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ProjectSection } from './components/ProjectSection';
import { AllProjectsView } from './components/AllProjectsView';
import { ProfileDrawer } from './components/ProfileDrawer';
import { ProjectModal } from './components/ProjectModal';
import { projects } from './data/projects';
import { Project } from './components/ProjectCard';

type SectionType = 'home' | 'all-projects' | 'ux-case-studies' | 'ui-projects' | 'live-sites';

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionType>('all-projects');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Filter projects by type
  const caseStudies = projects.filter(p => p.type === 'case-study');
  const uiProjects = projects.filter(p => p.type === 'ui-project');
  const liveSites = projects.filter(p => p.type === 'live-site');

  const handleSectionChange = (section: string) => {
    setActiveSection(section as SectionType);
    // Smooth scroll to top when changing sections
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProfileClick = () => {
    setIsProfileOpen(true);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const handleBackToHome = () => {
    setActiveSection('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Close modals on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsProfileOpen(false);
        setIsProjectModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when modals are open
  useEffect(() => {
    if (isProfileOpen || isProjectModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isProfileOpen, isProjectModalOpen]);

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        {/* Navigation */}
        <Navigation
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          onProfileClick={handleProfileClick}
        />

        {/* Main Content */}
        <main>
          {activeSection === 'home' && (
            <HeroSection onSectionChange={handleSectionChange} />
          )}

          {activeSection === 'all-projects' && (
            <AllProjectsView
              projects={projects}
              onProjectClick={handleProjectClick}
              onBackClick={handleBackToHome}
            />
          )}

          {activeSection === 'ux-case-studies' && (
            <ProjectSection
              title="UX Case Studies"
              description="Deep-dive into user research, design process, and problem-solving methodologies. Each case study showcases the complete design journey from initial research to final implementation and results."
              projects={caseStudies}
              sectionId="ux-case-studies"
              onProjectClick={handleProjectClick}
              onBackClick={handleBackToHome}
            />
          )}

          {activeSection === 'ui-projects' && (
            <ProjectSection
              title="UI Projects"
              description="Visual design explorations, interface components, and design system work. A collection of UI designs showcasing creativity, attention to detail, and modern design principles."
              projects={uiProjects}
              sectionId="ui-projects"
              onProjectClick={handleProjectClick}
              onBackClick={handleBackToHome}
            />
          )}

          {activeSection === 'live-sites' && (
            <ProjectSection
              title="Live Sites & Projects"
              description="Production applications and websites built with modern technologies. These projects demonstrate the ability to transform designs into fully functional, scalable web applications."
              projects={liveSites}
              sectionId="live-sites"
              onProjectClick={handleProjectClick}
              onBackClick={handleBackToHome}
            />
          )}
        </main>

        {/* Profile Drawer */}
        <ProfileDrawer
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        />

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isProjectModalOpen}
          onClose={() => {
            setIsProjectModalOpen(false);
            setSelectedProject(null);
          }}
        />

        {/* Footer */}
        {activeSection === 'home' && (
          <footer className="bg-muted border-t border-border py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-center md:text-left">
                  <h3 className="text-foreground font-medium">KHALIL SABHA</h3>
                  <p className="text-muted-foreground text-sm mt-1">UI/UX Designer & Front-end Developer</p>
                </div>
                <div className="flex items-center space-x-6">
                  <a
                    href="mailto:khalil@example.com"
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    khalil@example.com
                  </a>
                  <a
                    href="https://linkedin.com/in/khalilsabha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/khalilxorder"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-border text-center">
                <p className="text-muted-foreground text-sm">
                  © 2024 KHALIL SABHA. Designed and built with passion for great user experiences.
                </p>
              </div>
            </div>
          </footer>
        )}
      </div>
    </ThemeProvider>
  );
}
import React from 'react';
import { ProjectCard, Project } from './ProjectCard';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

interface AllProjectsViewProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  onBackClick?: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function AllProjectsView({ projects, onProjectClick, onBackClick }: AllProjectsViewProps) {
  // Group projects by type
  const caseStudies = projects.filter(p => p.type === 'case-study');
  const uiProjects = projects.filter(p => p.type === 'ui-project');
  const liveSites = projects.filter(p => p.type === 'live-site');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-16 z-10 bg-background/95 backdrop-blur-sm border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl text-foreground">All Projects</h1>
              <p className="text-muted-foreground mt-2">
                Explore my UX case studies, UI designs, and live applications
              </p>
            </div>
            {onBackClick && (
              <Button
                variant="ghost"
                onClick={onBackClick}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Projects Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Live Sites Section */}
        {liveSites.length > 0 && (
          <section id="live-sites" className="scroll-mt-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-2xl text-foreground mb-2">Live Sites & Projects</h2>
              <p className="text-muted-foreground max-w-2xl">
                Production applications and websites built with modern technologies.
              </p>
            </motion.div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {liveSites.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => onProjectClick(project)}
                />
              ))}
            </motion.div>
          </section>
        )}

        {/* UI Projects Section */}
        {uiProjects.length > 0 && (
          <section id="ui-projects" className="scroll-mt-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-2xl text-foreground mb-2">UI Projects</h2>
              <p className="text-muted-foreground max-w-2xl">
                Visual design explorations, interface components, and design system work.
              </p>
            </motion.div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {uiProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => onProjectClick(project)}
                />
              ))}
            </motion.div>
          </section>
        )}

        {/* UX Case Studies Section */}
        {caseStudies.length > 0 && (
          <section id="ux-case-studies" className="scroll-mt-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-2xl text-foreground mb-2">UX Case Studies</h2>
              <p className="text-muted-foreground max-w-2xl">
                Deep-dive into user research, design process, and problem-solving methodologies.
              </p>
            </motion.div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {caseStudies.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => onProjectClick(project)}
                />
              ))}
            </motion.div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-muted border-t border-border py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h3 className="text-foreground font-medium">KHALIL SABHA</h3>
              <p className="text-muted-foreground text-sm mt-1">UI/UX Designer & Front-end Developer</p>
            </div>
            <div className="flex items-center space-x-6">
              <a
                href="mailto:contact@khalilsabha.tech"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                contact@khalilsabha.tech
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
    </div>
  );
}

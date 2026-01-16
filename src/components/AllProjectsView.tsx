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

// Section header animation
const sectionHeaderVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    }
  }
};

// Staggered grid animation
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
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
      {/* Header with slide-in */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="sticky top-16 z-10 bg-background/95 backdrop-blur-sm border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-foreground">All Projects</h1>
              <p className="text-muted-foreground mt-2">
                Explore my UX case studies, UI designs, and live applications
              </p>
            </motion.div>
            {onBackClick && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  onClick={onBackClick}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Projects Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        {/* Live Sites Section */}
        {liveSites.length > 0 && (
          <section id="live-sites" className="scroll-mt-32">
            <motion.div
              variants={sectionHeaderVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mb-10"
            >
              <motion.div
                className="inline-block"
                whileHover={{ scale: 1.02 }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-2 relative">
                  Live Sites & Projects
                  <motion.span
                    className="absolute -bottom-1 left-0 h-1 bg-primary rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  />
                </h2>
              </motion.div>
              <p className="text-muted-foreground max-w-2xl mt-4">
                Production applications and websites built with modern technologies.
              </p>
            </motion.div>
            <motion.div
              variants={gridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {liveSites.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => onProjectClick(project)}
                  index={index}
                />
              ))}
            </motion.div>
          </section>
        )}

        {/* UI Projects Section */}
        {uiProjects.length > 0 && (
          <section id="ui-projects" className="scroll-mt-32">
            <motion.div
              variants={sectionHeaderVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mb-10"
            >
              <motion.div
                className="inline-block"
                whileHover={{ scale: 1.02 }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-2 relative">
                  UI Projects
                  <motion.span
                    className="absolute -bottom-1 left-0 h-1 bg-secondary rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  />
                </h2>
              </motion.div>
              <p className="text-muted-foreground max-w-2xl mt-4">
                Visual design explorations, interface components, and design system work.
              </p>
            </motion.div>
            <motion.div
              variants={gridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {uiProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => onProjectClick(project)}
                  index={index}
                />
              ))}
            </motion.div>
          </section>
        )}

        {/* UX Case Studies Section */}
        {caseStudies.length > 0 && (
          <section id="ux-case-studies" className="scroll-mt-32">
            <motion.div
              variants={sectionHeaderVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mb-10"
            >
              <motion.div
                className="inline-block"
                whileHover={{ scale: 1.02 }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-2 relative">
                  UX Case Studies
                  <motion.span
                    className="absolute -bottom-1 left-0 h-1 bg-primary rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  />
                </h2>
              </motion.div>
              <p className="text-muted-foreground max-w-2xl mt-4">
                Deep-dive into user research, design process, and problem-solving methodologies.
              </p>
            </motion.div>
            <motion.div
              variants={gridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {caseStudies.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => onProjectClick(project)}
                  index={index}
                />
              ))}
            </motion.div>
          </section>
        )}
      </div>

      {/* Animated Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-muted border-t border-border py-12 mt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <h3 className="text-foreground font-medium">KHALIL SABHA</h3>
              <p className="text-muted-foreground text-sm mt-1">UI/UX Designer & Front-end Developer</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-center space-x-6"
            >
              {[
                { href: 'mailto:contact@khalilsabha.tech', label: 'contact@khalilsabha.tech' },
                { href: 'https://linkedin.com/in/khalilsabha', label: 'LinkedIn', external: true },
                { href: 'https://github.com/khalilxorder', label: 'GitHub', external: true },
              ].map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 pt-8 border-t border-border text-center"
          >
            <p className="text-muted-foreground text-sm">
              © 2024 KHALIL SABHA. Designed and built with passion for great user experiences.
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}

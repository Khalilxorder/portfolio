import React, { useRef } from 'react';
import { Badge } from './ui/badge';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '../contexts/ThemeContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

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
  galleryImages?: string[];
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index?: number;
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: i * 0.1,
    }
  })
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
      delay: 0.3 + (i * 0.05),
    }
  })
};

export function ProjectCard({ project, onClick, index = 0 }: ProjectCardProps) {
  useTheme();
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-150, 150], [8, -8]);
  const rotateY = useTransform(mouseX, [-150, 150], [-8, 8]);

  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

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
      <motion.div
        ref={cardRef}
        custom={index}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        whileHover={{ y: -10 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
        }}
        onClick={onClick}
        className="group cursor-pointer rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-colors duration-300 perspective-1000 glow-on-hover"
      >
        {/* Image with parallax effect */}
        <div className="aspect-[16/10] overflow-hidden bg-muted relative">
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full h-full"
          >
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
            />
          </motion.div>
          {/* Gradient overlay on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none"
          />
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <motion.h3
              className="text-lg font-medium text-card-foreground"
              style={{ transform: 'translateZ(20px)' }}
            >
              {project.title}
            </motion.h3>
            <motion.div
              whileHover={{ x: 5, y: -5 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.div>
          </div>
          <p className="text-sm mb-4 text-muted-foreground">
            {project.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag, i) => (
                <motion.div
                  key={tag}
                  custom={i}
                  variants={tagVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Badge
                    variant="secondary"
                    className="text-xs bg-secondary/80 text-secondary-foreground border-secondary hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  >
                    {tag}
                  </Badge>
                </motion.div>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {project.year}
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  if (project.type === 'ui-project') {
    return (
      <motion.div
        ref={cardRef}
        custom={index}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        whileHover={{ y: -10 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
        }}
        onClick={onClick}
        className="group cursor-pointer rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-colors duration-300 glow-on-hover"
      >
        <div className="aspect-square overflow-hidden relative bg-muted">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full"
          >
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/80 to-secondary/80"
          >
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              className="text-white font-medium text-lg"
            >
              View Gallery
            </motion.span>
          </motion.div>
        </div>
        <div className="p-4">
          <h3 className="font-medium mb-2 text-card-foreground">
            {project.title}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {project.tags.slice(0, 2).map((tag, i) => (
                <motion.div
                  key={tag}
                  custom={i}
                  variants={tagVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Badge
                    variant="secondary"
                    className="text-xs bg-secondary/80 text-secondary-foreground border-secondary"
                  >
                    {tag}
                  </Badge>
                </motion.div>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {project.year}
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  if (project.type === 'live-site') {
    const handleCardClick = () => {
      if (project.liveUrl) {
        window.open(project.liveUrl, '_blank');
      }
    };

    return (
      <motion.div
        ref={cardRef}
        custom={index}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        whileHover={{ y: -10, boxShadow: '0 25px 50px -12px rgba(251, 191, 36, 0.25)' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
        }}
        className="rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer glow-on-hover"
        onClick={handleCardClick}
      >
        <div className="aspect-video overflow-hidden bg-muted relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full"
          >
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
            />
          </motion.div>
          {/* Animated shine effect */}
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            whileHover={{ x: '100%', opacity: 0.3 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none"
          />
        </div>
        <div className="p-6">
          <motion.h3
            className="text-lg font-medium mb-2 text-card-foreground"
            style={{ transform: 'translateZ(15px)' }}
          >
            {project.title}
          </motion.h3>
          <p className="text-sm mb-4 text-muted-foreground">
            {project.description}
          </p>
          <div className="flex items-center gap-3 mb-4">
            {project.liveUrl && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleLiveClick}
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Live
                </Button>
              </motion.div>
            )}
            {project.repoUrl && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleRepoClick}
                  variant="outline"
                  size="sm"
                  className="border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <Github className="w-4 h-4 mr-2" />
                  View Code
                </Button>
              </motion.div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag, i) => (
                <motion.div
                  key={tag}
                  custom={i}
                  variants={tagVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Badge
                    variant="secondary"
                    className="text-xs bg-secondary/80 text-secondary-foreground border-secondary"
                  >
                    {tag}
                  </Badge>
                </motion.div>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {project.year}
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
}
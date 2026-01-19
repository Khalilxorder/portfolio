import React, { useRef } from 'react';
import { Badge } from './ui/badge';
import { ArrowUpRight, ExternalLink, Github, Zap } from 'lucide-react';
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
  complexity?: number; // 1-100
  aiFeature?: string;
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

function ComplexityMetric({ value }: { value: number }) {
  return (
    <div className="flex flex-col gap-1 w-full mt-4 terminal-bg p-2 rounded border border-primary/20">
      <div className="flex justify-between items-center text-[8px] terminal-text text-primary font-bold tracking-tighter">
        <span>PROJECT_COMPLEXITY</span>
        <span>{value}%</span>
      </div>
      <div className="h-1 w-full bg-primary/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary shadow-[0_0_8px_var(--primary)]"
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
    </div>
  );
}

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

  const commonCardClass = "group cursor-pointer rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 perspective-1000 glow-on-hover relative";

  const renderImage = (scale: number = 1.08) => (
    <div className="aspect-[16/10] overflow-hidden bg-muted relative">
      <motion.div
        whileHover={{ scale }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full h-full"
      >
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
          loading="eager"
          decoding="async"
        />
      </motion.div>
      {/* HUD overlay on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-primary/5 pointer-events-none flex items-center justify-center"
      >
        <div className="absolute top-2 left-2 text-[8px] terminal-text text-primary font-bold p-1 bg-black/60 rounded">
          SCAN_MODE: ACTIVE
        </div>
        <div className="absolute bottom-2 right-2 text-[8px] terminal-text text-primary font-bold p-1 bg-black/60 rounded uppercase">
          SYS_ID: {project.id.slice(-6).toUpperCase()}
        </div>
      </motion.div>
    </div>
  );

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
      className={commonCardClass}
    >
      {renderImage(project.type === 'ui-project' ? 1.1 : 1.08)}

      <div className="p-6 relative z-10">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-card-foreground terminal-text tracking-tight uppercase" style={{ transform: 'translateZ(20px)' }}>
            {project.title}
          </h3>
          <motion.div whileHover={{ scale: 1.2, rotate: 15 }} className="text-primary opacity-50 group-hover:opacity-100 transition-opacity">
            <Zap className="w-5 h-5 fill-primary/20" />
          </motion.div>
        </div>

        <p className="text-sm mb-4 text-muted-foreground terminal-text line-clamp-2 leading-relaxed opacity-80">
          {project.description}
        </p>

        {project.aiFeature && (
          <div className="mb-4 p-2 bg-primary/5 border-l-2 border-primary rounded-r">
            <div className="text-[10px] terminal-text text-primary font-bold mb-1">AI_CORE_FEATURE:</div>
            <p className="text-[10px] text-muted-foreground italic leading-tight">{project.aiFeature}</p>
          </div>
        )}

        {project.complexity && <ComplexityMetric value={project.complexity} />}

        <div className="flex items-center justify-between mt-6">
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag, i) => (
              <motion.div key={tag} custom={i} variants={tagVariants}>
                <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary border-primary/20 terminal-text font-bold">
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>
          <span className="text-[10px] terminal-text text-muted-foreground font-bold italic">
            EST_{project.year}
          </span>
        </div>

        {/* Live Site specific buttons */}
        {project.type === 'live-site' && (
          <div className="flex items-center gap-2 mt-6">
            <Button
              onClick={handleLiveClick}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-[10px] terminal-text font-bold"
            >
              DEPLOY_SITE
            </Button>
            {project.repoUrl && (
              <Button
                onClick={handleRepoClick}
                variant="outline"
                size="sm"
                className="text-[10px] terminal-text font-bold border-primary/20 text-muted-foreground hover:bg-primary/10"
              >
                SOURCE_CODE
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Background tech texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none pointer-events-none overflow-hidden terminal-text text-[6px] leading-[1] break-all p-2">
        {Math.random().toString(36).substring(2, 300)}
      </div>
    </motion.div>
  );
}
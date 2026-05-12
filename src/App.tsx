import React from 'react';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { projects, type Project } from './data/projects';

function ProjectImage({ project }: { project: Project }) {
  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.display = 'none';
    event.currentTarget.parentElement?.classList.add('is-fallback');
  };

  return (
    <div className="project-media" aria-label={`${project.title} preview`}>
      <img
        src={project.image}
        alt=""
        loading="eager"
        decoding="async"
        onError={handleError}
      />
      <div className="project-media-fallback">
        <span>{project.title}</span>
      </div>
      <div className="project-kind">{project.kind}</div>
    </div>
  );
}

function ProjectActions({ project }: { project: Project }) {
  const primaryUrl = project.liveUrl ?? project.detailUrl;
  const primaryLabel = project.liveUrl ? 'Open project' : 'View study';

  return (
    <div className="project-actions" aria-label={`${project.title} links`}>
      {primaryUrl && (
        <a
          className="project-link project-link-primary"
          href={primaryUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`${primaryLabel}: ${project.title}`}
        >
          <ExternalLink aria-hidden="true" />
          <span>{primaryLabel}</span>
        </a>
      )}
      {project.repoUrl && (
        <a
          className="project-link"
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open source for ${project.title}`}
        >
          <Github aria-hidden="true" />
          <span>Source</span>
        </a>
      )}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="project-card" style={{ '--index': index } as React.CSSProperties}>
      <ProjectImage project={project} />
      <div className="project-body">
        <div className="project-topline">
          <span>{project.year}</span>
          <span>{project.status}</span>
        </div>
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        <div className="project-tags" aria-label={`${project.title} technologies`}>
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <ProjectActions project={project} />
      </div>
    </article>
  );
}

export default function App() {
  return (
    <div className="portfolio-shell">
      <header className="site-header" aria-label="Portfolio header">
        <a className="wordmark" href="#projects" aria-label="Khalil Sabha projects">
          Khalil Sabha
        </a>
        <div className="header-meta">
          <span>{projects.length} projects</span>
          <ArrowUpRight aria-hidden="true" />
        </div>
      </header>

      <main className="projects-page">
        <section className="intro" aria-labelledby="portfolio-title">
          <p className="eyebrow">Selected work</p>
          <h1 id="portfolio-title">Projects.</h1>
          <p className="intro-copy">
            Essential product, UX, and engineering work, presented with clear previews and direct links.
          </p>
        </section>

        <section id="projects" className="projects-grid" aria-label="Projects">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </section>
      </main>
    </div>
  );
}

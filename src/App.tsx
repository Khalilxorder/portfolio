import React from 'react';
import { projects, type Project } from './data/projects';
import profilePhoto from './assets/1ac236e9226f9c05a21400fd39173611d03582ca.png';

function ProjectImage({ project }: { project: Project }) {
  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.display = 'none';
    event.currentTarget.parentElement?.classList.add('is-fallback');
  };

  return (
    <div className={`project-media${project.image ? '' : ' is-fallback'}`} aria-hidden="true">
      {project.image && (
        <img
          src={project.image}
          alt=""
          loading="lazy"
          decoding="async"
          onError={handleError}
        />
      )}
      <div className="project-media-fallback">
        <div className="preview-shell">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const style = { '--index': index } as React.CSSProperties;
  const content = (
    <>
      <ProjectImage project={project} />
      <div className="project-body">
        <div className="project-heading">
          <h2>{project.title}</h2>
          <time dateTime={project.year}>{project.year}</time>
        </div>
        <p>{project.description}</p>
      </div>
    </>
  );

  if (!project.url) {
    return (
      <article className="project-card project-card-static" style={style}>
        {content}
      </article>
    );
  }

  return (
    <a
      className="project-card"
      href={project.url}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${project.title}`}
      style={style}
    >
      {content}
    </a>
  );
}

export default function App() {
  return (
    <main className="portfolio-shell">
      <section className="identity" aria-label="Khalil Sabha">
        <img src={profilePhoto} alt="" />
        <h1>Khalil Sabha</h1>
      </section>

      <div className="projects-page">
        <section id="projects" className="projects-grid" aria-label="Projects">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </section>
      </div>
    </main>
  );
}

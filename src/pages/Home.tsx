import React from 'react';
import { projects, categoryLabels, type Project, type ProjectCategory } from '../data/projects';
import profilePhoto from '../assets/1ac236e9226f9c05a21400fd39173611d03582ca.png';

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
          loading="eager"
          decoding="sync"
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

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      className="project-card"
      href={project.url}
      aria-label={`Open ${project.title}`}
    >
      <ProjectImage project={project} />
      <div className="project-body">
        <div className="project-heading">
          <h2>{project.title}</h2>
          <time dateTime={project.year}>{project.year}</time>
        </div>
        <p>{project.description}</p>
      </div>
    </a>
  );
}

const CATEGORY_ORDER: ProjectCategory[] = ['scientific', 'commercial'];

export default function Home() {
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: projects.filter((p) => p.category === category),
  })).filter((group) => group.items.length > 0);

  return (
    <main className="portfolio-shell">
      <section className="identity" aria-label="Khalil Sabha">
        <img src={profilePhoto} alt="" />
        <h1>Khalil Sabha</h1>
        <p>
          BA Psychology, ELTE - AI tools for psychological assessment, cognition, and research workflows.{' '}
          <a href="/labs.html" style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}>For labs</a>
        </p>
      </section>

      <div className="projects-page">
        {grouped.map(({ category, items }) => (
          <section
            key={category}
            className="projects-section"
            aria-label={`${categoryLabels[category]} projects`}
          >
            <h2 className="section-label">{categoryLabels[category]}</h2>
            <div className="projects-grid">
              {items.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

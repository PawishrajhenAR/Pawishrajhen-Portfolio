import { useMemo } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '../data/projects';
import { projects } from '../data/content';
import { pickRandomProjectIndex } from '../lib/projectAscii';
import { Eyebrow } from './PageFrame';
import { ProjectAsciiAccent } from './ProjectAsciiAccent';

const categoryLabels: Record<string, string> = {
  ai: 'AI',
  security: 'Security',
  healthcare: 'Healthcare',
  web3: 'Web3',
  research: 'Research',
};

type ProjectPanelProps = {
  project: Project;
  index: number;
  asciiProjectIndex: number;
};

function ProjectPanel({ project, index, asciiProjectIndex }: ProjectPanelProps) {
  return (
    <div className="box-grid md:grid-cols-[3.5rem_minmax(0,1fr)_12rem]">
      <div className="box-cell-dark flex items-start border-b border-border md:border-b-0 md:border-r">
        <span className="font-display text-2xl text-cream-deep">{index + 1}</span>
      </div>

      <div className="box-cell border-b border-border md:border-b-0 md:border-r">
        <p className="text-[0.8rem] text-muted">
          {categoryLabels[project.category]}
          {project.note && <span className="text-rust"> · {project.note}</span>}
        </p>

        <h3 className="mt-2 font-display text-xl text-ink sm:text-2xl">{project.title}</h3>

        <p className="mt-3 text-[0.9rem] font-medium leading-relaxed text-ink">
          {project.description}
        </p>

        {index === asciiProjectIndex && <ProjectAsciiAccent className="mt-5" />}

        <p className="mt-3 text-[0.88rem] leading-[1.75] text-ink-soft">{project.detail}</p>

        <ul className="mt-4 space-y-2 border-l border-border pl-3">
          {project.highlights.map((point) => (
            <li key={point} className="text-[0.82rem] leading-relaxed text-ink-soft">
              {point}
            </li>
          ))}
        </ul>

        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline mt-5 inline-flex items-center gap-1.5 text-[0.85rem] md:hidden"
        >
          <Github size={14} strokeWidth={1.5} />
          View on GitHub
          <ExternalLink size={12} className="opacity-50" />
        </a>
      </div>

      <div className="box-cell-dark flex flex-col gap-4">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="tag text-[0.72rem]">
              {tag}
            </span>
          ))}
        </div>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline hidden items-center gap-1.5 text-[0.85rem] md:inline-flex"
        >
          <Github size={14} strokeWidth={1.5} />
          View on GitHub
          <ExternalLink size={12} className="opacity-50" />
        </a>
      </div>
    </div>
  );
}

export function ProjectsPinned() {
  const asciiProjectIndex = useMemo(() => pickRandomProjectIndex(projects.length), []);

  return (
    <section id="projects" className="border-b border-border bg-surface/95">
      <div className="box-cell border-b border-border">
        <Eyebrow>Selected work</Eyebrow>
        <h2 className="section-title mt-3">Things I&apos;ve built</h2>
        <p className="mt-3 max-w-xl text-[0.9rem] leading-relaxed text-ink-soft">
          A few builds I&apos;m proud of — scroll the page, open a repo, dig in.
        </p>
      </div>

      {projects.map((project, i) => (
        <article key={project.id} className="border-b border-border last:border-b-0">
          <ProjectPanel
            project={project}
            index={i}
            asciiProjectIndex={asciiProjectIndex}
          />
        </article>
      ))}
    </section>
  );
}

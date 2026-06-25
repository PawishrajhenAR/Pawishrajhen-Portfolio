import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../data/content';
import type { Variants } from 'framer-motion';
import { blurUp, scaleIn, staggerContainer, viewport } from '../lib/motion';
import { SectionHeader } from './SectionHeader';

const categoryLabels: Record<string, string> = {
  ai: 'Artificial Intelligence',
  security: 'Cybersecurity',
  healthcare: 'Healthcare',
  web3: 'Web3',
  research: 'Research',
};

export function Projects() {
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-pad">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="04"
          label="Projects"
          title="Selected work"
          description="AI systems, security tools, healthcare diagnostics, and full-stack applications — each built to solve a real problem."
          titleVariant="clip"
        />

        <motion.div
          className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer(0.08, 0.1)}
        >
          {rest.map((project, i) => (
            <ProjectCard key={project.id} project={project} variant={i % 2 === 0 ? blurUp : scaleIn} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

type CardProps = {
  project: (typeof projects)[number];
  variant: Variants;
};

function ProjectCard({ project, variant }: CardProps) {
  return (
    <motion.article
      variants={variant}
      className="group flex flex-col bg-surface p-8 transition-colors hover:bg-cream-dark/30"
    >
      <p className="text-[0.6rem] font-medium uppercase tracking-[0.25em] text-accent">
        {categoryLabels[project.category] ?? project.category}
      </p>

      <h3 className="mt-4 font-display text-2xl font-medium text-ink transition-colors group-hover:text-accent">
        {project.title}
      </h3>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1">
        {project.tags.map((tag, i) => (
          <span key={tag} className="text-xs text-muted">
            {tag}
            {i < project.tags.length - 1 && (
              <span className="ml-3 text-border-strong">·</span>
            )}
          </span>
        ))}
      </div>

      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-ink transition hover:text-accent"
      >
        <Github size={14} strokeWidth={1.5} />
        View on GitHub
        <ExternalLink size={12} className="opacity-50" />
      </a>
    </motion.article>
  );
}

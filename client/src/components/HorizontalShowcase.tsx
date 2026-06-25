import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../data/content';
import { ScrollReveal } from './ScrollReveal';

const featured = projects.filter((p) => p.featured);

export function HorizontalShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(featured.length - 1) * 85}%`]);

  return (
    <section ref={containerRef} className="relative hidden h-[280vh] lg:block">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-8">
          <ScrollReveal variant="blurUp">
            <p className="section-label">Featured</p>
            <h2 className="section-title">Scroll to explore</h2>
            <p className="mt-4 max-w-md text-sm text-muted">
              Keep scrolling — projects slide in as you move down the page.
            </p>
          </ScrollReveal>
        </div>

        <motion.div style={{ x }} className="mt-12 flex gap-6 px-8">
          {featured.map((project, i) => (
            <article
              key={project.id}
              className="flex w-[min(85vw,520px)] shrink-0 flex-col border border-border bg-surface p-10"
            >
              <span className="font-display text-6xl font-light text-cream-deep">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-6 font-display text-3xl font-medium text-ink">
                {project.title}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">
                {project.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs text-muted">
                    {tag}
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
            </article>
          ))}
        </motion.div>

        <motion.div
          className="mx-auto mt-10 h-px w-48 origin-left bg-border-strong"
          style={{ scaleX: scrollYProgress }}
        />
      </div>
    </section>
  );
}

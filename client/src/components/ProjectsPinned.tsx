import { useMemo, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '../data/projects';
import { projects } from '../data/content';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { pickRandomProjectIndex } from '../lib/projectAscii';
import { Eyebrow } from './PageFrame';
import { ProjectAsciiAccent } from './ProjectAsciiAccent';

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  limitCallbacks: true,
  ignoreMobileResize: true,
});

const categoryLabels: Record<string, string> = {
  ai: 'AI',
  security: 'Security',
  healthcare: 'Healthcare',
  web3: 'Web3',
  research: 'Research',
};

function getNavHeight() {
  const nav = document.querySelector('[data-site-nav]');
  return nav instanceof HTMLElement ? nav.offsetHeight : 0;
}

type ProjectPanelProps = {
  project: Project;
  index: number;
  asciiProjectIndex: number;
  compact?: boolean;
};

function ProjectPanel({ project, index, asciiProjectIndex, compact = false }: ProjectPanelProps) {
  return (
    <div
      className={`box-grid h-full ${compact ? 'grid-rows-[auto_1fr_auto]' : 'grid-rows-[1fr_auto] lg:grid-rows-1 lg:grid-cols-[4rem_1fr_10.5rem]'}`}
    >
      <div
        className={`box-cell-dark ${compact ? 'box-cell' : 'box-cell-pinned'} flex items-start border-b border-border lg:border-b-0 lg:border-r`}
      >
        <span className="font-display text-2xl text-cream-deep">{index + 1}</span>
      </div>

      <div
        className={`box-cell ${compact ? '' : 'box-cell-pinned'} overflow-y-auto border-b border-border lg:border-b-0 lg:border-r`}
      >
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
          className="link-underline mt-5 inline-flex items-center gap-1.5 text-[0.85rem] lg:hidden"
        >
          <Github size={14} strokeWidth={1.5} />
          View on GitHub
          <ExternalLink size={12} className="opacity-50" />
        </a>
      </div>

      <div
        className={`box-cell-dark ${compact ? 'box-cell' : 'box-cell-pinned'} flex min-h-0 flex-col justify-between gap-3`}
      >
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="tag tag-pinned text-[0.72rem]">
              {tag}
            </span>
          ))}
        </div>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline mt-4 hidden items-center gap-1.5 text-[0.85rem] lg:inline-flex"
        >
          <Github size={14} strokeWidth={1.5} />
          View on GitHub
          <ExternalLink size={12} className="opacity-50" />
        </a>
      </div>
    </div>
  );
}

function ProjectsMobileList({ asciiProjectIndex }: { asciiProjectIndex: number }) {
  return (
    <section id="projects" className="border-b border-border bg-surface/95">
      <div className="box-cell border-b border-border">
        <Eyebrow>Selected work</Eyebrow>
        <h2 className="section-title mt-3">Things I&apos;ve built</h2>
      </div>

      {projects.map((project, i) => (
        <article key={project.id} className="border-b border-border last:border-b-0">
          <ProjectPanel
            project={project}
            index={i}
            asciiProjectIndex={asciiProjectIndex}
            compact
          />
        </article>
      ))}
    </section>
  );
}

function ProjectsPinnedDesktop() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackWrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const asciiProjectIndex = useMemo(() => pickRandomProjectIndex(projects.length), []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const trackWrap = trackWrapRef.current;
      const track = trackRef.current;
      if (!section || !trackWrap || !track) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const count = projects.length;
      if (count === 0) return;

      const layout = { navH: 0, step: 0, scrollDistance: 0 };
      let lastIndex = 1;

      const measureLayout = () => {
        layout.navH = getNavHeight();
        layout.step = trackWrap.offsetWidth;
        layout.scrollDistance = layout.step * Math.max(count - 1, 1);
        section.style.setProperty('--nav-h', `${layout.navH}px`);
        section.style.height = `calc(100svh - ${layout.navH}px)`;
        return layout;
      };

      const updateProgress = (progress: number) => {
        if (!progressRef.current) return;
        const index = Math.min(count, Math.max(1, Math.round(progress * (count - 1)) + 1));
        if (index === lastIndex) return;
        lastIndex = index;
        progressRef.current.textContent = `${index} of ${count}`;
      };

      measureLayout();
      gsap.set(track, { x: 0, force3D: true });

      const tween = gsap.to(track, {
        x: () => -layout.scrollDistance,
        ease: 'none',
        force3D: true,
        roundProps: 'x',
        scrollTrigger: {
          trigger: section,
          start: () => `top ${layout.navH}px`,
          end: () => `+=${layout.scrollDistance}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.45,
          invalidateOnRefresh: true,
          onRefresh: measureLayout,
          onUpdate: (self) => updateProgress(self.progress),
        },
      });

      let resizeTimer: ReturnType<typeof setTimeout>;
      const refreshLayout = () => {
        measureLayout();
        tween.scrollTrigger?.refresh();
      };
      const scheduleRefresh = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(refreshLayout, 120);
      };

      window.addEventListener('resize', scheduleRefresh);
      window.addEventListener('load', refreshLayout);
      document.fonts?.ready?.then(refreshLayout);
      requestAnimationFrame(() => requestAnimationFrame(refreshLayout));

      const nav = document.querySelector('[data-site-nav]');
      const navObserver =
        nav instanceof HTMLElement ? new ResizeObserver(scheduleRefresh) : null;
      navObserver?.observe(nav as HTMLElement);

      return () => {
        clearTimeout(resizeTimer);
        window.removeEventListener('resize', scheduleRefresh);
        window.removeEventListener('load', refreshLayout);
        navObserver?.disconnect();
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: sectionRef, dependencies: [] },
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="projects-pin relative z-10 flex flex-col overflow-hidden bg-surface/95"
      style={{ height: 'calc(100svh - var(--nav-h, 3.25rem))' }}
    >
      <div className="box-grid shrink-0 border-b border-border lg:grid-cols-[1fr_auto]">
        <div className="box-cell box-cell-pinned border-b border-border lg:border-b-0">
          <Eyebrow>Selected work</Eyebrow>
          <h2 className="section-title mt-3">Things I&apos;ve built</h2>
        </div>
        <div className="box-cell-dark box-cell-pinned flex items-end justify-end">
          <span ref={progressRef} className="font-display text-xl text-ink">
            1 of {projects.length}
          </span>
        </div>
      </div>

      <div ref={trackWrapRef} className="min-h-0 flex-1 overflow-hidden">
        <div ref={trackRef} className="projects-track flex h-full">
          {projects.map((project, i) => (
            <article
              key={project.id}
              className="project-card h-full w-full shrink-0 grow-0 basis-full border-r border-border"
            >
              <ProjectPanel project={project} index={i} asciiProjectIndex={asciiProjectIndex} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectsPinned() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const prefersReducedMotion = usePrefersReducedMotion();
  const asciiProjectIndex = useMemo(() => pickRandomProjectIndex(projects.length), []);

  if (!isDesktop || prefersReducedMotion) {
    return <ProjectsMobileList asciiProjectIndex={asciiProjectIndex} />;
  }

  return <ProjectsPinnedDesktop />;
}

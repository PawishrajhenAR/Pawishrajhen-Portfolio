import { Link } from 'react-router-dom';
import { ArrowDown, ExternalLink, FileText, Github, Linkedin, Mail, PenLine } from 'lucide-react';
import { site } from '../data/content';
import { portfolioMailto } from '../lib/mailto';
import { handleAnchorClick } from '../lib/smoothScroll';
import { EmailLink } from './EmailLink';
import { AsciiSlot } from './AsciiSlot';
import { HeroAgentLoop } from './HeroAgentLoop';
import { Eyebrow } from './PageFrame';

const interests = [
  'shipping agent loops in production',
  'MCP integrations',
  'tool orchestration',
  'eval gates',
  'client delivery at KatalyzU',
  'full-stack handoffs',
];

export function Hero() {
  return (
    <section className="border-b border-border">
      <div className="box-grid border-b border-border sm:grid-cols-[1fr_auto]">
        <div className="box-cell flex items-center justify-between py-3.5 sm:py-4">
          <Eyebrow>Portfolio, 2026</Eyebrow>
          <span className="text-[0.8rem] text-muted sm:hidden">{site.status}</span>
        </div>
        <div className="box-cell-dark hidden items-center sm:flex sm:py-4">
          <p className="text-[0.8rem] text-muted">{site.status}</p>
        </div>
      </div>

      <div className="hero-split box-grid">
        <div className="box-cell hero-main py-7 sm:py-8 lg:py-9">
          <div className="hero-main-top">
            <h1 className="split-name">
              <span className="block">{site.nameLines[0]}</span>
              <span className="block text-rust/80">{site.nameLines[1]}</span>
            </h1>

            <p className="mt-4 max-w-md text-[1rem] leading-relaxed text-ink-soft sm:mt-5 lg:max-w-xl lg:text-[1.05rem]">
              {site.tagline}
            </p>
          </div>

          <div className="hero-main-fill">
            <HeroAgentLoop />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:mt-7 sm:gap-3">
            <a href="#projects" className="btn-primary" onClick={handleAnchorClick}>
              See my work
              <ArrowDown size={14} />
            </a>
            <Link to="/blog" className="btn-ghost">
              <PenLine size={14} />
              Read the blog
            </Link>
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <FileText size={14} />
              View resume
              <ExternalLink size={12} className="opacity-50" />
            </a>
            <EmailLink variant="button" subject="sayHi" />
          </div>
        </div>

        <div className="box-cell-dark hero-aside self-start flex flex-col gap-4 border-t border-border py-6 sm:gap-5 sm:py-7 lg:border-l lg:border-t-0 lg:py-8">
          <div>
            <p className="text-[0.8rem] text-muted">Usually working on</p>
            <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
              {interests.map((item) => (
                <span key={item} className="tag">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-ascii-slot">
            <AsciiSlot
              slot="hero-sidebar"
              fit
              className="flex h-full w-full items-start justify-center"
            />
          </div>

          <div className="border-t border-border pt-4 sm:pt-5">
            <p className="text-[0.8rem] text-muted">Find me</p>
            <div className="mt-3 flex gap-5">
              {[
                { href: site.social.github, icon: Github, label: 'GitHub', external: true },
                { href: site.social.linkedin, icon: Linkedin, label: 'LinkedIn', external: true },
                { href: portfolioMailto.general(site.email), icon: Mail, label: 'Email', external: false },
              ].map(({ href, icon: Icon, label, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="text-muted transition hover:text-rust"
                  aria-label={label}
                >
                  <Icon size={17} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

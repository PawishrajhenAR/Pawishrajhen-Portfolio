import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { site } from '../data/content';
import { AsciiSlot } from './AsciiSlot';
import { Eyebrow } from './PageFrame';

const interests = ['vision', 'NLP', 'full-stack', 'research', 'medical AI', 'security'];

export function Hero() {
  return (
    <section className="min-h-screen border-b border-border">
      <div className="box-grid border-b border-border sm:grid-cols-[1fr_auto]">
        <div className="box-cell flex items-center justify-between py-4 sm:py-5">
          <Eyebrow>Portfolio, 2026</Eyebrow>
          <span className="text-[0.8rem] text-muted sm:hidden">India</span>
        </div>
        <div className="box-cell-dark hidden items-center sm:flex">
          <p className="text-[0.8rem] text-muted">{site.status}</p>
        </div>
      </div>

      <div className="box-grid min-h-[calc(100vh-7rem)] lg:grid-cols-[1.15fr_0.85fr]">
        <div className="box-cell flex flex-col justify-center py-10 sm:py-14">
          <h1 className="split-name">
            <span className="block">{site.nameLines[0]}</span>
            <span className="block text-muted">{site.nameLines[1]}</span>
          </h1>

          <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-ink-soft">
            {site.tagline}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#projects" className="btn-primary">
              See my work
              <ArrowDown size={14} />
            </a>
            <a href="#contact" className="btn-ghost">
              Say hi
            </a>
          </div>
        </div>

        <div className="box-cell-dark flex min-h-0 flex-col justify-between border-t border-border py-8 lg:border-t-0 lg:border-l lg:py-10">
          <div className="shrink-0">
            <p className="text-[0.8rem] text-muted">Usually working on</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {interests.map((item) => (
                <span key={item} className="tag">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <AsciiSlot
            slot="hero-sidebar"
            className="flex min-h-0 flex-1 items-center justify-center py-4 lg:py-6"
          />

          <div className="shrink-0 border-t border-border pt-6">
            <p className="text-[0.8rem] text-muted">Find me</p>
            <div className="mt-3 flex gap-5">
              {[
                { href: site.social.github, icon: Github, label: 'GitHub' },
                { href: site.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
                { href: `mailto:${site.email}`, icon: Mail, label: 'Email' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== 'Email' ? '_blank' : undefined}
                  rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="text-muted transition hover:text-rust"
                  aria-label={label}
                >
                  <Icon size={17} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <p className="mt-8 hidden text-[0.75rem] text-muted lg:block">
            scroll when ready ↓
          </p>
        </div>
      </div>
    </section>
  );
}

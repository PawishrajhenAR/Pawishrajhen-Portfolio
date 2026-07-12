import { experience } from '../data/content';
import { AsciiSlot } from './AsciiSlot';
import { Eyebrow } from './PageFrame';

export function Experience() {
  return (
    <section id="experience" className="border-b border-border">
      <div className="box-cell border-b border-border">
        <Eyebrow>Experience</Eyebrow>
        <h2 className="section-title mt-3">Work that&apos;s shipped</h2>
        <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-ink-soft">
          Everything here is work shipped through KatalyzU since 2025 — where I work as technical
          lead — from katalyzu.com to client builds like Skanda and The Fuel Depot.
        </p>
      </div>

      <div className="box-cell-dark flex items-center justify-center border-b border-border px-5 py-8 sm:px-7 sm:py-10">
        <a
          href="https://katalyzu.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex max-w-full items-center gap-3 transition-opacity hover:opacity-80 sm:gap-4"
        >
          <img
            src="/companylogo/KatalyzU.svg"
            alt=""
            aria-hidden
            className="experience-brand-logo"
          />
          <span className="experience-brand-name font-display tracking-[-0.02em] text-ink">
            KatalyzU
          </span>
        </a>
      </div>

      {experience.map((item, i) => (
        <div
          key={item.period + item.title}
          className="box-grid border-b border-border last:border-b-0 lg:grid-cols-[4rem_140px_1fr]"
        >
          <div className="box-cell-dark hidden items-start border-r border-border py-6 lg:flex">
            <span className="font-display text-2xl text-cream-deep">{i + 1}</span>
          </div>

          <div className="box-cell border-b border-border py-6 lg:border-b-0 lg:border-r">
            <p className="text-[0.8rem] text-muted">{item.period}</p>
            <p className="mt-1 text-[0.85rem] text-ink-soft">{item.type}</p>
          </div>

          <div className="box-cell py-6">
            <h3 className="font-display text-xl text-ink">{item.title}</h3>
            {item.orgUrl ? (
              <a
                href={item.orgUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-[0.85rem] text-muted link-underline"
              >
                {item.org}
              </a>
            ) : (
              <p className="mt-1 text-[0.85rem] text-muted">{item.org}</p>
            )}

            <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-soft">{item.description}</p>

            {item.highlights && item.highlights.length > 0 && (
              <ul className="mt-4 space-y-2 border border-border bg-surface/35 p-4 backdrop-blur-sm">
                {item.highlights.map((point) => (
                  <li
                    key={point}
                    className="flex gap-2.5 text-[0.85rem] leading-relaxed text-ink-soft before:mt-[0.55rem] before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-rust/70 before:content-['']"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            )}

            {item.caseStudy && (
              <details className="experience-case-study mt-5 border border-border bg-surface/35">
                <summary className="cursor-pointer px-4 py-3 text-[0.85rem] font-medium text-ink transition hover:text-rust">
                  Read case study
                </summary>
                <div className="space-y-4 border-t border-border px-4 py-4 text-[0.85rem] leading-relaxed text-ink-soft">
                  <div>
                    <p className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-muted">
                      Problem
                    </p>
                    <p className="mt-2">{item.caseStudy.problem}</p>
                  </div>
                  <div>
                    <p className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-muted">
                      Approach
                    </p>
                    <p className="mt-2">{item.caseStudy.approach}</p>
                  </div>
                  <div>
                    <p className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-muted">
                      Outcome
                    </p>
                    <p className="mt-2">{item.caseStudy.outcome}</p>
                  </div>
                  <div>
                    <p className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-muted">
                      Stack
                    </p>
                    <p className="mt-2 font-mono text-[0.8rem] text-ink">
                      {item.caseStudy.stack.join(' · ')}
                    </p>
                  </div>
                </div>
              </details>
            )}

            <p className="mt-4 text-[0.8rem] text-muted">{item.tags.join(' · ')}</p>
          </div>
        </div>
      ))}

      <div className="box-cell-dark flex items-center justify-center py-8">
        <AsciiSlot slot="experience-foot" className="flex w-full items-center justify-center" />
      </div>
    </section>
  );
}

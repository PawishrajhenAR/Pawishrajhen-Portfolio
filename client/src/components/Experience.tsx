import { experience } from '../data/content';
import { AsciiSlot } from './AsciiSlot';
import { Eyebrow } from './PageFrame';

export function Experience() {
  return (
    <section id="experience" className="border-b border-border">
      <div className="box-cell border-b border-border">
        <Eyebrow>Timeline</Eyebrow>
        <h2 className="section-title mt-3">How I got here</h2>
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
            <p className="mt-1 text-[0.85rem] text-muted">{item.org}</p>
            <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-soft">{item.description}</p>
            <p className="mt-3 text-[0.8rem] text-muted">{item.tags.join(' · ')}</p>
          </div>
        </div>
      ))}

      <div className="box-cell-dark flex items-center justify-center py-8">
        <AsciiSlot slot="experience-foot" className="flex w-full items-center justify-center" />
      </div>
    </section>
  );
}

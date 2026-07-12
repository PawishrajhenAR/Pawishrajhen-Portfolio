import { about } from '../data/content';
import { AsciiSlot } from './AsciiSlot';
import { Eyebrow } from './PageFrame';

export function About() {
  return (
    <section id="about" className="border-b border-border">
      <div className="box-grid lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="box-cell border-b border-border lg:border-b-0 lg:border-r">
          <Eyebrow>About</Eyebrow>
          <h2 className="section-title mt-3 max-w-xl">{about.headline}</h2>

          <div className="mt-8 space-y-5 text-[0.95rem] leading-[1.8] text-ink-soft">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <div className="box-cell-dark flex flex-col justify-between">
          <p className="font-display text-[1.1rem] italic leading-relaxed text-ink-soft">
            {about.aside}
          </p>

          <AsciiSlot slot="about-aside" className="my-6 flex items-center justify-center" />

          <dl className="mt-4 space-y-5 border-t border-border pt-6">
            {about.highlights.map((item) => (
              <div key={item.label}>
                <dt className="text-[0.75rem] text-muted">{item.label}</dt>
                <dd className="mt-1 text-[0.95rem] text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

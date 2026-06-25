import { skillGroups } from '../data/content';
import { AsciiSlot } from './AsciiSlot';
import { Eyebrow } from './PageFrame';

export function Skills() {
  return (
    <section id="skills" className="border-b border-border">
      <div className="box-cell border-b border-border">
        <Eyebrow>Skills</Eyebrow>
        <h2 className="section-title mt-3">What I reach for</h2>
        <p className="mt-3 max-w-md text-[0.9rem] text-ink-soft">
          Depends on the project — but this covers most of what I use week to week.
        </p>
      </div>

      <div className="box-cell-dark flex items-center justify-center border-t border-border py-10">
        <AsciiSlot slot="skills-foot" className="flex w-full items-center justify-center" />
      </div>

      <div className="box-grid sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <div
            key={group.category}
            className={`box-cell ${i % 2 === 0 ? 'sm:border-r' : ''} ${i < 3 ? 'lg:border-r' : ''} border-b border-border`}
          >
            <h3 className="text-[0.85rem] font-medium text-ink">{group.category}</h3>
            <p className="mt-3 text-[0.85rem] leading-relaxed text-ink-soft">
              {group.skills.join(', ')}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

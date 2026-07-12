import { site } from '../data/content';

export function Now() {
  return (
    <section className="border-b border-border bg-cream-dark/40">
      <div className="box-cell">
        <p className="section-eyebrow">Now</p>
        <div className="mt-4 grid gap-5 sm:grid-cols-3">
          <div>
            <p className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-muted">
              Building
            </p>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-soft">{site.now.building}</p>
          </div>
          <div>
            <p className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-muted">
              Learning
            </p>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-soft">{site.now.learning}</p>
          </div>
          <div>
            <p className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-muted">
              Open to
            </p>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-soft">{site.now.openTo}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

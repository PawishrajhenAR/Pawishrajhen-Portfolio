import { ExternalLink } from 'lucide-react';
import { research } from '../data/content';
import { AsciiSlot } from './AsciiSlot';
import { Eyebrow } from './PageFrame';

export function Research() {
  return (
    <section id="research" className="border-b border-border">
      <div className="box-grid lg:grid-cols-[1fr_200px]">
        <div className="box-cell border-b border-border lg:border-b-0 lg:border-r">
          <Eyebrow>Research</Eyebrow>
          <h2 className="section-title mt-3">Published paper</h2>

          <p className="mt-2 text-[0.8rem] text-muted">{research.journalFull}</p>

          <h3 className="mt-8 font-display text-xl leading-snug text-ink sm:text-2xl">
            {research.title}
          </h3>

          <p className="mt-6 text-[0.9rem] leading-[1.8] text-ink-soft">{research.summary}</p>

          <p className="mt-5 text-[0.8rem] text-muted">{research.tools.join(' · ')}</p>

          <a
            href={research.doi}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline mt-8 inline-flex items-center gap-1.5 text-[0.85rem]"
          >
            Read the paper
            <ExternalLink size={13} />
          </a>
        </div>

        <div className="box-cell-dark flex flex-col justify-center">
          <AsciiSlot slot="research-aside" className="mb-8 flex items-center justify-center" />
          <p className="text-[0.75rem] text-muted">Role</p>
          <p className="mt-1 text-[0.9rem] text-ink">{research.role}</p>
          <p className="mt-6 text-[0.75rem] text-muted">Model</p>
          <p className="mt-1 font-display text-2xl text-ink">ARIMA + LSTM</p>
        </div>
      </div>
    </section>
  );
}

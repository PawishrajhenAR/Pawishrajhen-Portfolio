import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { researchPapers, type ResearchPaper } from '../data/content';
import { AsciiSlot } from './AsciiSlot';
import { Eyebrow } from './PageFrame';

function PaperLink({ paper }: { paper: ResearchPaper }) {
  const [showNotice, setShowNotice] = useState(false);

  if (paper.status === 'published' && paper.doi) {
    return (
      <a
        href={paper.doi}
        target="_blank"
        rel="noopener noreferrer"
        className="link-underline mt-8 inline-flex items-center gap-1.5 text-[0.85rem]"
      >
        Read the paper
        <ExternalLink size={13} />
      </a>
    );
  }

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={() => setShowNotice(true)}
        className="link-underline inline-flex items-center gap-1.5 text-[0.85rem]"
      >
        Read the paper
        <ExternalLink size={13} />
      </button>
      {showNotice && (
        <p className="mt-2 text-[0.85rem] text-muted" role="status">
          Yet to be published.
        </p>
      )}
    </div>
  );
}

export function Research() {
  return (
    <section id="research" className="border-b border-border">
      <div className="box-cell border-b border-border">
        <Eyebrow>Research</Eyebrow>
        <h2 className="section-title mt-3">Papers</h2>
        <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-ink-soft">
          Published work and manuscripts in review — assistive AR, climate forecasting, and
          on-device deep learning for healthcare.
        </p>
      </div>

      {researchPapers.map((paper, index) => (
        <div
          key={paper.title}
          className="box-grid border-b border-border last:border-b-0 lg:grid-cols-[1fr_200px]"
        >
          <div className="box-cell border-b border-border lg:border-b-0 lg:border-r">
            <div className="flex flex-wrap items-center gap-2">
              <span className="tag text-[0.75rem]">
                {paper.status === 'published' ? 'Published' : 'Forthcoming'}
              </span>
              <span className="text-[0.75rem] text-muted">{paper.journal}</span>
            </div>

            <p className="mt-3 text-[0.8rem] text-muted">{paper.journalFull}</p>

            <h3 className="mt-6 font-display text-xl leading-snug text-ink sm:text-2xl">
              {paper.title}
            </h3>

            <p className="mt-6 text-[0.9rem] leading-[1.8] text-ink-soft">{paper.summary}</p>

            <p className="mt-5 text-[0.8rem] text-muted">{paper.tools.join(' · ')}</p>

            <PaperLink paper={paper} />
          </div>

          <div className="box-cell-dark flex flex-col justify-center">
            {index === 0 && (
              <AsciiSlot slot="research-aside" className="mb-8 flex items-center justify-center" />
            )}
            <p className="text-[0.75rem] text-muted">Role</p>
            <p className="mt-1 text-[0.9rem] text-ink">{paper.role}</p>
            <p className="mt-6 text-[0.75rem] text-muted">Model</p>
            <p className="mt-1 font-display text-xl leading-snug text-ink">{paper.model}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

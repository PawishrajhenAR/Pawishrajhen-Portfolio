import { site } from '../data/content';
import { portfolioMailto } from '../lib/mailto';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="box-grid sm:grid-cols-[1fr_auto]">
      <div className="box-cell py-5">
        <p className="text-[0.8rem] text-muted">
          © {year} {site.shortName} — works on my machine™.
        </p>
      </div>
      <div className="box-cell-dark flex flex-wrap items-center justify-end gap-x-5 gap-y-2 py-5">
        <a
          href={portfolioMailto.general(site.email)}
          className="text-[0.8rem] text-muted transition hover:text-ink"
        >
          {site.email}
        </a>
        <a href={site.social.github} target="_blank" rel="noopener noreferrer" className="text-[0.8rem] text-muted hover:text-ink">
          GitHub
        </a>
        <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-[0.8rem] text-muted hover:text-ink">
          LinkedIn
        </a>
      </div>
    </footer>
  );
}

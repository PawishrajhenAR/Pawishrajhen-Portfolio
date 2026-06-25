import { site } from '../data/content';
import { AsciiSlot } from './AsciiSlot';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="box-grid sm:grid-cols-[1fr_auto]">
      <div className="box-cell py-5">
        <p className="text-[0.8rem] text-muted">
          © {year} {site.shortName} — built by hand, not generated.
        </p>
      </div>
      <div className="box-cell-dark flex items-center justify-between gap-5 py-5">
        <AsciiSlot slot="footer-corner" className="hidden sm:flex" />
        <div className="flex items-center gap-5">
          <a href={site.social.github} target="_blank" rel="noopener noreferrer" className="text-[0.8rem] text-muted hover:text-ink">
            GitHub
          </a>
          <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-[0.8rem] text-muted hover:text-ink">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

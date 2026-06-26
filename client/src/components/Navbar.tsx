import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navLinks, site } from '../data/content';
import { handleAnchorClick } from '../lib/smoothScroll';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const onHome = location.pathname === '/';
  const onBlog = location.pathname.startsWith('/blog');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  function sectionHref(hash: string) {
    return onHome ? hash : `/${hash}`;
  }

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header
      data-site-nav
      className={`sticky top-0 z-[100] border-b transition-colors duration-300 ${
        scrolled || open
          ? 'border-border bg-surface/90 backdrop-blur-md'
          : 'border-transparent bg-surface/75 backdrop-blur-md'
      }`}
    >
      <div className="box-grid sm:grid-cols-[1fr_auto]">
        <div className="box-cell flex items-center justify-between gap-3 py-3.5 sm:py-4">
          <Link to="/" className="min-w-0 font-display text-[1.05rem] text-ink">
            {site.shortName}
            <span className="text-muted">.</span>
          </Link>

          <button
            type="button"
            className="mobile-nav-toggle -mr-1 flex shrink-0 items-center justify-center text-ink sm:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-site-nav"
          >
            {open ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
          </button>
        </div>

        <nav
          className="box-cell-dark hidden items-center gap-7 py-3.5 sm:flex sm:py-4"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={sectionHref(link.href)}
              onClick={onHome ? handleAnchorClick : undefined}
              className="text-[0.85rem] text-ink-soft transition hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/blog"
            className={`text-[0.85rem] transition hover:text-ink ${
              onBlog
                ? 'font-medium text-ink underline decoration-rust/50 underline-offset-4'
                : 'text-ink-soft'
            }`}
          >
            Blog
          </Link>
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.85rem] font-medium text-ink underline decoration-rust/50 underline-offset-4 hover:decoration-rust"
          >
            Resume
          </a>
        </nav>
      </div>

      <nav
        id="mobile-site-nav"
        className={`mobile-nav-panel border-t border-border bg-surface/95 sm:hidden ${
          open ? 'is-open' : ''
        }`}
        aria-label="Mobile"
        aria-hidden={!open}
      >
        <div className="box-cell space-y-1 py-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={sectionHref(link.href)}
              onClick={(event) => {
                if (onHome) handleAnchorClick(event);
                closeMenu();
              }}
              className="mobile-nav-link block py-3 text-[0.95rem] text-ink"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/blog"
            className={`mobile-nav-link block py-3 text-[0.95rem] ${
              onBlog ? 'font-medium text-rust' : 'text-ink'
            }`}
            onClick={closeMenu}
          >
            Blog
          </Link>
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-nav-link mt-1 inline-block py-3 text-[0.95rem] font-medium text-rust"
            onClick={closeMenu}
          >
            Resume →
          </a>
        </div>
      </nav>
    </header>
  );
}

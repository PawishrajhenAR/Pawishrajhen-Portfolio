import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks, site } from '../data/content';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      data-site-nav
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? 'border-border bg-surface/80 backdrop-blur-md' : 'border-transparent bg-surface/65 backdrop-blur-md'
      }`}
    >
      <div className="box-grid sm:grid-cols-[1fr_auto]">
        <div className="box-cell flex items-center justify-between py-3.5 sm:py-4">
          <a href="#" className="font-display text-[1.05rem] text-ink">
            {site.shortName}
            <span className="text-muted">.</span>
          </a>

          <button
            type="button"
            className="p-1 text-ink sm:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="box-cell-dark hidden items-center gap-7 py-3.5 sm:flex sm:py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.85rem] text-ink-soft transition hover:text-ink"
            >
              {link.label}
            </a>
          ))}
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

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border sm:hidden"
          >
            <div className="box-cell space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-[0.9rem] text-ink"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-[0.9rem] font-medium text-rust"
              >
                Resume →
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

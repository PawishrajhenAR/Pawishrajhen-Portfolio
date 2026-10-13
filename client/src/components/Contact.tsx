import { FormEvent, useState } from 'react';
import { ExternalLink, Mail } from 'lucide-react';
import { site } from '../data/content';
import { contactMailto } from '../lib/mailto';
import { AsciiSlot } from './AsciiSlot';
import { EmailLink } from './EmailLink';
import { Eyebrow } from './PageFrame';

const inputClass =
  'w-full border border-border bg-cream/40 px-4 py-2.5 text-[0.9rem] text-ink backdrop-blur-sm placeholder:text-muted/70 focus:border-ink focus:outline-none';

export function Contact() {
  const [errorMsg, setErrorMsg] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg('');

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — bots that fill this get a silent no-op.
    if (String(data.get('company_fax') ?? '').trim()) {
      return;
    }

    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    if (name.length < 2 || name.length > 100) {
      setErrorMsg('Please enter your name (at least 2 characters).');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      setErrorMsg('Please enter a valid email.');
      return;
    }
    if (message.length < 10 || message.length > 2000) {
      setErrorMsg('Message should be between 10 and 2000 characters.');
      return;
    }

    const href = contactMailto(site.email, { name, email, message });
    window.location.href = href;
  }

  return (
    <section id="contact" className="border-b border-border">
      <div className="box-grid lg:grid-cols-2">
        <div className="box-cell flex flex-col border-b border-border lg:border-b-0 lg:border-r">
          <div>
            <Eyebrow>Contact</Eyebrow>
            <h2 className="section-title mt-3">Want to talk?</h2>
            <p className="mt-4 max-w-sm text-[0.9rem] leading-relaxed text-ink-soft">
              Internships, research, freelance, or just a question about a project — I read
              everything and usually reply within a day or two.
            </p>

            <EmailLink className="mt-8" />

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.85rem]">
              <a href={site.social.github} target="_blank" rel="noopener noreferrer" className="text-ink-soft hover:text-ink">
                GitHub
              </a>
              <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-ink-soft hover:text-ink">
                LinkedIn
              </a>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="text-ink-soft hover:text-ink">
                Instagram
              </a>
            </div>
          </div>

          <AsciiSlot slot="contact-aside" className="mt-10 flex items-center justify-center lg:mt-auto lg:pt-10" />
        </div>

        <div className="box-cell-dark">
          <form onSubmit={handleSubmit} className="relative space-y-4">
            <div className="flex items-start gap-3 border border-border/70 bg-cream/25 px-3.5 py-3">
              <Mail size={16} className="mt-0.5 shrink-0 text-muted" strokeWidth={1.5} aria-hidden />
              <p className="text-[0.8rem] leading-relaxed text-ink-soft">
                This opens your mail app with a draft to{' '}
                <span className="text-ink">{site.email}</span>. You send it from your own inbox —
                nothing is uploaded to a third-party mail service.
              </p>
            </div>

            {/* Honeypot — leave empty. Odd name avoids browser autofill. */}
            <div aria-hidden="true" className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0">
              <label htmlFor="company_fax">Company fax</label>
              <input
                id="company_fax"
                name="company_fax"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <div>
              <label htmlFor="name" className="mb-1.5 block text-[0.8rem] text-muted">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                minLength={2}
                maxLength={100}
                autoComplete="name"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-[0.8rem] text-muted">
                Your email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-[0.8rem] text-muted">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                maxLength={2000}
                rows={4}
                className={`${inputClass} resize-none`}
                placeholder="What's on your mind?"
              />
            </div>
            {errorMsg && <p className="text-[0.85rem] text-rust">{errorMsg}</p>}
            <button type="submit" className="btn-primary w-full justify-center">
              Open in mail app
              <ExternalLink size={15} strokeWidth={1.75} aria-hidden />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

import { FormEvent, useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { site } from '../data/content';
import { AsciiSlot } from './AsciiSlot';
import { Eyebrow } from './PageFrame';

type FormState = 'idle' | 'loading' | 'success' | 'error';

const inputClass =
  'w-full border border-border bg-cream/40 px-4 py-2.5 text-[0.9rem] text-ink backdrop-blur-sm placeholder:text-muted/70 focus:border-ink focus:outline-none';

export function Contact() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState('loading');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const body = await res.json();

      if (!res.ok) {
        throw new Error(body.error ?? 'Something went wrong — try again?');
      }

      setFormState('success');
      form.reset();
    } catch (err) {
      setFormState('error');
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send.');
    }
  }

  return (
    <section id="contact" className="border-b border-border">
      <div className="box-grid lg:grid-cols-2">
        <div className="box-cell border-b border-border lg:border-b-0 lg:border-r">
          <Eyebrow>Contact</Eyebrow>
          <h2 className="section-title mt-3">Want to talk?</h2>
          <p className="mt-4 max-w-sm text-[0.9rem] leading-relaxed text-ink-soft">
            Internships, research, freelance, or just a question about a project — I read
            everything and usually reply within a day or two.
          </p>

          <a href={`mailto:${site.email}`} className="link-underline mt-8 inline-block text-[1rem]">
            {site.email}
          </a>

          <div className="mt-6 flex gap-5 text-[0.85rem]">
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

          <AsciiSlot slot="contact-aside" className="mt-10 flex items-center justify-center" />
        </div>

        <div className="box-cell-dark">
          {formState === 'success' ? (
            <div className="flex flex-col items-start py-4">
              <CheckCircle className="text-sage" size={28} strokeWidth={1.5} />
              <h3 className="mt-5 font-display text-xl text-ink">Got it — thanks.</h3>
              <p className="mt-2 text-[0.9rem] text-ink-soft">I&apos;ll reply soon.</p>
              <button
                type="button"
                onClick={() => setFormState('idle')}
                className="mt-6 text-[0.85rem] text-muted hover:text-ink"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-[0.8rem] text-muted">
                  Name
                </label>
                <input id="name" name="name" type="text" required minLength={2} maxLength={100} autoComplete="name" className={inputClass} />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-[0.8rem] text-muted">
                  Email
                </label>
                <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-[0.8rem] text-muted">
                  Message
                </label>
                <textarea id="message" name="message" required minLength={10} maxLength={2000} rows={4} className={`${inputClass} resize-none`} placeholder="What's on your mind?" />
              </div>
              {formState === 'error' && (
                <p className="text-[0.85rem] text-rust">{errorMsg}</p>
              )}
              <button
                type="submit"
                disabled={formState === 'loading'}
                className="btn-primary w-full justify-center disabled:opacity-60"
              >
                {formState === 'loading' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending…
                  </>
                ) : (
                  'Send message'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

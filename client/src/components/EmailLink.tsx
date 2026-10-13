import { Mail } from 'lucide-react';
import { site } from '../data/content';
import { portfolioMailto } from '../lib/mailto';

type EmailLinkProps = {
  variant?: 'card' | 'inline' | 'button';
  className?: string;
  subject?: 'general' | 'sayHi';
};

export function EmailLink({ variant = 'card', className = '', subject = 'general' }: EmailLinkProps) {
  const href =
    subject === 'sayHi' ? portfolioMailto.sayHi(site.email) : portfolioMailto.general(site.email);

  if (variant === 'button') {
    return (
      <a href={href} className={`btn-ghost ${className}`.trim()}>
        Say hi
      </a>
    );
  }

  if (variant === 'inline') {
    return (
      <a
        href={href}
        className={`link-underline text-[0.9rem] text-ink ${className}`.trim()}
      >
        {site.email}
      </a>
    );
  }

  return (
    <a
      href={href}
      className={`contact-email group block border border-border bg-surface/40 p-5 backdrop-blur-sm transition-colors hover:border-rust/35 hover:bg-surface/55 ${className}`.trim()}
    >
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-border bg-cream/60 text-muted transition-colors group-hover:border-rust/30 group-hover:text-rust">
          <Mail size={18} strokeWidth={1.5} aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="text-[0.75rem] font-medium text-muted">Email me directly</p>
          <p className="mt-1 break-all font-display text-[1.15rem] leading-snug text-ink sm:text-[1.25rem]">
            {site.email}
          </p>
          <p className="mt-2 text-[0.8rem] text-ink-soft">
            Opens your mail app with a draft ready to send.
          </p>
        </div>
      </div>
    </a>
  );
}

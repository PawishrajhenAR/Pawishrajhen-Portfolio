import { useEffect, useState } from 'react';
import { Check, Link2 } from 'lucide-react';

type BlogShareProps = {
  title: string;
};

export function BlogShare({ title }: BlogShareProps) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // fallback for older browsers
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
    }
  }

  return (
    <div className="blog-share">
      <p className="blog-share__label">Share this post</p>
      <button type="button" onClick={copyLink} className="blog-share__btn">
        {copied ? <Check size={15} /> : <Link2 size={15} />}
        {copied ? 'Link copied' : 'Copy link'}
      </button>
      <p className="blog-share__hint">{title}</p>
    </div>
  );
}

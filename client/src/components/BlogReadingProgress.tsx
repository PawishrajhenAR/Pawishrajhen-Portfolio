import { useEffect, useState } from 'react';

type BlogReadingProgressProps = {
  targetId?: string;
};

export function BlogReadingProgress({ targetId = 'blog-article' }: BlogReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const article = document.getElementById(targetId);
    if (!article) return;

    const update = () => {
      const rect = article.getBoundingClientRect();
      const nav = document.querySelector('[data-site-nav]');
      const navH = nav instanceof HTMLElement ? nav.offsetHeight : 0;
      const start = window.scrollY + rect.top - navH;
      const height = article.offsetHeight - window.innerHeight + navH;
      if (height <= 0) {
        setProgress(100);
        return;
      }
      const value = ((window.scrollY - start) / height) * 100;
      setProgress(Math.min(100, Math.max(0, value)));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [targetId]);

  return (
    <div
      className="blog-reading-progress"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <span className="blog-reading-progress__bar" style={{ transform: `scaleX(${progress / 100})` }} />
    </div>
  );
}

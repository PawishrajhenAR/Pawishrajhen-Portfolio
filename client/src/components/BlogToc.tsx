import { useEffect, useState } from 'react';

type TocHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

type BlogTocProps = {
  headings: TocHeading[];
  className?: string;
};

export function BlogToc({ headings, className = '' }: BlogTocProps) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? '');

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el instanceof HTMLElement);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this page" className={`blog-toc ${className}`.trim()}>
      <p className="blog-toc__label">Jump to section</p>
      <ol className="blog-toc__list">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={heading.level === 3 ? 'blog-toc__item--sub' : undefined}
          >
            <a
              href={`#${heading.id}`}
              className={`blog-toc-link ${activeId === heading.id ? 'is-active' : ''}`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

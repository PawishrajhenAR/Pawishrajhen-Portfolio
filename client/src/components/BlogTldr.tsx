import type { BlogPost } from '../data/blog';

type BlogTldrProps = {
  items: string[];
  className?: string;
};

export function BlogTldr({ items, className = '' }: BlogTldrProps) {
  return (
    <aside className={`blog-tldr ${className}`.trim()} aria-label="Quick summary">
      <p className="blog-tldr__label">In 30 seconds</p>
      <ul className="blog-tldr__list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}

export function BlogAudience({ post }: { post: BlogPost }) {
  return (
    <p className="blog-audience">
      <span className="blog-audience__label">Good for:</span> {post.audience}
    </p>
  );
}

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { formatBlogDate, type BlogPost } from '../data/blog';

type BlogRelatedPostsProps = {
  posts: BlogPost[];
};

export function BlogRelatedPosts({ posts }: BlogRelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="border-b border-border">
      <div className="box-cell border-b border-border py-5">
        <h2 className="font-display text-xl text-ink">Keep reading</h2>
        <p className="mt-2 text-[0.85rem] text-ink-soft">Related posts by topic</p>
      </div>
      <div className="box-grid sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className={`blog-related-card box-cell block transition-colors hover:bg-surface/20 ${
              i < posts.length - 1 ? 'border-b border-border sm:border-b-0' : ''
            } ${i % 2 === 0 ? 'sm:border-r sm:border-border' : ''} ${
              i < 2 ? 'lg:border-r lg:border-border' : ''
            }`}
          >
            <time className="text-[0.75rem] text-muted" dateTime={post.date}>
              {formatBlogDate(post.date)}
            </time>
            <h3 className="mt-2 font-display text-[1.05rem] leading-snug text-ink">{post.title}</h3>
            <p className="mt-2 line-clamp-2 text-[0.85rem] leading-relaxed text-ink-soft">
              {post.excerpt}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-[0.8rem] font-medium text-ink">
              Read
              <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

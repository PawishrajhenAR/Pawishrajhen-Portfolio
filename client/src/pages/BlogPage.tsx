import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Search, X } from 'lucide-react';
import {
  blogTagGuide,
  blogTags,
  filterPosts,
  formatBlogDate,
  getFeaturedPost,
  getTagCounts,
  type BlogPost,
  type BlogTag,
} from '../data/blog';
import { site } from '../data/content';
import { portfolioMailto } from '../lib/mailto';
import { usePageMeta } from '../hooks/usePageMeta';
import { DEFAULT_OG_IMAGE } from '../lib/seo';
import { BlogAudience, BlogTldr } from '../components/BlogTldr';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { Eyebrow } from '../components/PageFrame';
import { PageFrame } from '../components/PageFrame';
import { useScrollToTop } from '../hooks/useScrollToTop';

function PostMeta({ post }: { post: BlogPost }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8rem] text-muted">
      <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
      <span aria-hidden>·</span>
      <span>{post.readMinutes} min read</span>
    </div>
  );
}

function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span key={tag} className="tag">
          {tag}
        </span>
      ))}
    </div>
  );
}

export function BlogPage() {
  useScrollToTop();

  usePageMeta({
    title: `Blog — ${site.name}`,
    description: 'Essays on agents, MCP, evals, and shipping autonomous systems that actually stop.',
    image: DEFAULT_OG_IMAGE,
    path: '/blog',
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const tagParam = searchParams.get('tag') as BlogTag | null;
  const initialTag = tagParam && blogTags.includes(tagParam) ? tagParam : 'all';

  const [activeTag, setActiveTag] = useState<BlogTag>(initialTag);
  const [query, setQuery] = useState('');
  const featured = getFeaturedPost();
  const tagCounts = getTagCounts();

  useEffect(() => {
    const tag = searchParams.get('tag') as BlogTag | null;
    if (tag && blogTags.includes(tag)) {
      setActiveTag(tag);
    } else if (!tag) {
      setActiveTag('all');
    }
  }, [searchParams]);

  const filtered = useMemo(() => filterPosts(query, activeTag), [query, activeTag]);

  const listPosts =
    activeTag === 'all' && !query.trim()
      ? filtered.filter((post) => post.slug !== featured.slug)
      : filtered;

  function selectTag(tag: BlogTag) {
    setActiveTag(tag);
    const next = new URLSearchParams(searchParams);
    if (tag === 'all') {
      next.delete('tag');
    } else {
      next.set('tag', tag);
    }
    setSearchParams(next, { replace: true });
  }

  return (
    <div className="relative min-h-screen text-ink">
      <PageFrame>
        <Navbar />
        <main>
          <section className="border-b border-border">
            <div className="box-grid lg:grid-cols-[minmax(0,1fr)_300px]">
              <div className="box-cell border-b border-border py-8 sm:py-10 lg:border-b-0 lg:border-r">
                <Eyebrow>Blog</Eyebrow>
                <h1 className="section-title mt-3 max-w-2xl">Plain notes on building with AI</h1>
                <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-ink-soft">
                  Short essays on agents, automations, and shipping real products — written so you
                  can skim the summary or read the full thing.
                </p>
                <ul className="mt-6 space-y-2 text-[0.85rem] text-ink-soft">
                  <li className="flex gap-2 before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-rust/70 before:content-['']">
                    <span>
                      <strong className="font-medium text-ink">In 30 seconds</strong> — TL;DR on
                      every post
                    </span>
                  </li>
                  <li className="flex gap-2 before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-rust/70 before:content-['']">
                    <span>
                      <strong className="font-medium text-ink">Good for</strong> — who each essay
                      is meant for
                    </span>
                  </li>
                  <li className="flex gap-2 before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-rust/70 before:content-['']">
                    <span>
                      <strong className="font-medium text-ink">Search &amp; filter</strong> — find
                      posts by topic or keyword
                    </span>
                  </li>
                </ul>
              </div>
              <div className="box-cell-dark flex flex-col justify-between gap-6 py-8 sm:py-10">
                <div>
                  <p className="text-[0.75rem] text-muted">Total posts</p>
                  <p className="mt-1 font-display text-4xl text-ink">{filtered.length}</p>
                  <p className="mt-1 text-[0.85rem] text-ink-soft">
                    {activeTag === 'all' ? 'across all topics' : `in ${activeTag}`}
                  </p>
                </div>
                <p className="text-[0.85rem] leading-relaxed text-ink-soft">
                  New here? Start with the featured post below — it covers agent loops, the thing
                  most demos get wrong.
                </p>
              </div>
            </div>
          </section>

          <section className="border-b border-border">
            <div className="box-cell border-b border-border py-5">
              <p className="text-[0.75rem] font-medium text-muted">Topics at a glance</p>
              <div className="mt-4 box-grid gap-0 sm:grid-cols-2 lg:grid-cols-3">
                {(Object.keys(blogTagGuide) as Array<Exclude<BlogTag, 'all'>>).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => selectTag(tag)}
                    className="blog-topic-card text-left"
                  >
                    <span className="blog-topic-card__title">{blogTagGuide[tag].title}</span>
                    <span className="blog-topic-card__blurb">{blogTagGuide[tag].blurb}</span>
                    <span className="blog-topic-card__count">{tagCounts[tag]} posts</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="box-cell-dark border-b border-border py-4">
              <label className="blog-search" htmlFor="blog-search">
                <Search size={16} className="shrink-0 text-muted" aria-hidden />
                <input
                  id="blog-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search titles, summaries, tags…"
                  className="blog-search__input"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="blog-search__clear"
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </label>
              <div className="mt-4 flex flex-wrap gap-2">
                {blogTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => selectTag(tag)}
                    className={`blog-filter ${activeTag === tag ? 'blog-filter--active' : ''}`}
                  >
                    {tag}
                    {tag !== 'all' && (
                      <span className="blog-filter__count">{tagCounts[tag as Exclude<BlogTag, 'all'>]}</span>
                    )}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-[0.8rem] text-muted">
                Showing {listPosts.length + (activeTag === 'all' && !query.trim() ? 1 : 0)} post
                {listPosts.length + (activeTag === 'all' && !query.trim() ? 1 : 0) === 1 ? '' : 's'}
                {query.trim() ? ` for “${query.trim()}”` : ''}
              </p>
            </div>
          </section>

          {activeTag === 'all' && !query.trim() && (
            <section className="border-b border-border">
              <Link
                to={`/blog/${featured.slug}`}
                className="blog-featured box-cell block py-8 transition-colors hover:bg-surface/20 sm:py-10"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.75rem] font-medium text-rust">Start here · Featured</p>
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-2">
                      <PostMeta post={featured} />
                      <TagList tags={featured.tags} />
                    </div>
                  </div>
                  <ArrowUpRight
                    size={22}
                    className="shrink-0 text-muted"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </div>
                <h2 className="mt-5 font-display text-[1.75rem] leading-[1.15] tracking-[-0.02em] text-ink sm:text-[2.25rem]">
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-ink-soft">
                  {featured.excerpt}
                </p>
                <BlogTldr items={featured.tldr} className="mt-6 max-w-2xl" />
                <BlogAudience post={featured} />
                <span className="mt-6 inline-flex items-center gap-2 text-[0.85rem] font-medium text-ink">
                  Read full essay
                  <ArrowRight size={15} />
                </span>
              </Link>
            </section>
          )}

          <section className="border-b border-border">
            {listPosts.length === 0 ? (
              <div className="box-cell py-16 text-center">
                <p className="font-display text-lg text-ink">No posts found</p>
                <p className="mt-2 text-[0.9rem] text-ink-soft">
                  Try another tag or clear your search.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    selectTag('all');
                  }}
                  className="btn-ghost mt-6"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <>
                <div className="box-cell border-b border-border py-4">
                  <h2 className="font-display text-lg text-ink">All posts</h2>
                  <p className="mt-1 text-[0.85rem] text-ink-soft">Newest first</p>
                </div>
                {listPosts.map((post) => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="blog-card box-cell block border-b border-border py-7 transition-colors hover:bg-surface/15 last:border-b-0"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <PostMeta post={post} />
                      <ArrowUpRight size={18} className="shrink-0 text-muted" strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-3 font-display text-[1.35rem] leading-snug text-ink sm:text-[1.5rem]">
                      {post.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-[0.9rem] leading-relaxed text-ink-soft">
                      {post.excerpt}
                    </p>
                    <BlogAudience post={post} />
                    <div className="mt-4">
                      <TagList tags={post.tags} />
                    </div>
                    <span className="mt-5 inline-flex items-center gap-2 text-[0.85rem] font-medium text-ink">
                      Read article
                      <ArrowRight size={14} />
                    </span>
                  </Link>
                ))}
              </>
            )}
          </section>

          <section className="box-cell-dark py-8 text-center sm:py-10">
            <p className="text-[0.9rem] text-ink-soft">
              Want to talk through something you&apos;re building?{' '}
              <a href={portfolioMailto.sayHi(site.email)} className="link-underline text-ink">
                Email me
              </a>
              .
            </p>
          </section>
        </main>
        <Footer />
      </PageFrame>
    </div>
  );
}

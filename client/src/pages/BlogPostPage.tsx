import { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BlogPostBody, getHeadings } from '../components/BlogPostBody';
import { BlogReadingProgress } from '../components/BlogReadingProgress';
import { BlogRelatedPosts } from '../components/BlogRelatedPosts';
import { BlogShare } from '../components/BlogShare';
import { BlogToc } from '../components/BlogToc';
import { BlogAudience, BlogTldr } from '../components/BlogTldr';
import { Footer } from '../components/Footer';
import { JsonLd } from '../components/JsonLd';
import { Navbar } from '../components/Navbar';
import { Eyebrow } from '../components/PageFrame';
import { PageFrame } from '../components/PageFrame';
import {
  formatBlogDate,
  getAdjacentPosts,
  getPostBySlug,
  getRelatedPosts,
} from '../data/blog';
import { site } from '../data/content';
import { usePageMeta } from '../hooks/usePageMeta';
import { DEFAULT_OG_IMAGE, absoluteUrl } from '../lib/seo';
import { useScrollToTop } from '../hooks/useScrollToTop';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  useScrollToTop();

  usePageMeta({
    title: post ? `${post.title} — ${site.name}` : `Blog — ${site.name}`,
    description: post?.excerpt ?? 'Essays on agents, MCP, evals, and shipping autonomous systems.',
    image: DEFAULT_OG_IMAGE,
    path: post ? `/blog/${post.slug}` : '/blog',
    type: post ? 'article' : 'website',
    publishedTime: post?.date,
  });

  const structuredData = useMemo(() => {
    if (!post) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      author: {
        '@type': 'Person',
        name: site.name,
        url: site.url,
      },
      url: absoluteUrl(`/blog/${post.slug}`),
      image: DEFAULT_OG_IMAGE,
    };
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const headings = getHeadings(post.body);
  const { prev, next } = getAdjacentPosts(post.slug);
  const related = getRelatedPosts(post.slug);

  return (
    <div className="relative min-h-screen text-ink">
      {structuredData && <JsonLd data={structuredData} />}
      <BlogReadingProgress />
      <PageFrame>
        <Navbar />
        <main>
          <section className="border-b border-border">
            <div className="box-cell flex flex-wrap items-center justify-between gap-3 border-b border-border py-4">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-[0.85rem] text-muted transition hover:text-ink"
              >
                <ArrowLeft size={15} />
                Back to all posts
              </Link>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link key={tag} to={`/blog?tag=${tag}`} className="tag transition hover:border-rust/40">
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            <div className="box-grid lg:grid-cols-[minmax(0,1fr)_260px]">
              <div className="box-cell border-b border-border py-8 sm:py-10 lg:border-b-0 lg:border-r">
                <Eyebrow>Essay · {post.readMinutes} min read</Eyebrow>
                <h1 className="section-title mt-3 max-w-3xl">{post.title}</h1>
                <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-ink-soft">
                  {post.excerpt}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.85rem] text-muted">
                  <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
                  <span aria-hidden>·</span>
                  <span>Updated field notes</span>
                </div>
                <BlogAudience post={post} />
                <BlogTldr items={post.tldr} className="mt-6 max-w-2xl" />
              </div>

              <div className="box-cell-dark hidden py-8 lg:block lg:py-10">
                <div className="blog-sidebar-sticky space-y-8">
                  <BlogToc headings={headings} />
                  <BlogShare title={post.title} />
                </div>
              </div>
            </div>
          </section>

          <section className="box-grid border-b border-border lg:grid-cols-[minmax(0,1fr)_260px]">
            <div id="blog-article" className="box-cell py-8 sm:py-10 lg:border-r lg:border-border">
              <BlogPostBody blocks={post.body} />
              <div className="mt-10 border-t border-border pt-8 lg:hidden">
                <BlogShare title={post.title} />
              </div>
            </div>

            <div className="box-cell-dark py-8 lg:hidden">
              <BlogToc headings={headings} />
            </div>

            <div className="box-cell-dark hidden py-8 lg:block lg:border-t-0" aria-hidden />
          </section>

          <BlogRelatedPosts posts={related} />

          <section className="box-grid sm:grid-cols-2">
            <div className="box-cell border-b border-border sm:border-b-0 sm:border-r">
              {prev ? (
                <Link to={`/blog/${prev.slug}`} className="blog-adjacent group">
                  <span className="text-[0.75rem] text-muted">Older post</span>
                  <span className="mt-2 flex items-center gap-2 font-display text-lg text-ink group-hover:text-rust">
                    <ArrowLeft size={16} />
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <p className="text-[0.85rem] text-muted">This is the oldest post.</p>
              )}
            </div>
            <div className="box-cell-dark">
              {next ? (
                <Link to={`/blog/${next.slug}`} className="blog-adjacent group text-right">
                  <span className="text-[0.75rem] text-muted">Newer post</span>
                  <span className="mt-2 flex items-center justify-end gap-2 font-display text-lg text-ink group-hover:text-rust">
                    {next.title}
                    <ArrowRight size={16} />
                  </span>
                </Link>
              ) : (
                <p className="text-right text-[0.85rem] text-muted">You&apos;re on the latest.</p>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </PageFrame>
    </div>
  );
}

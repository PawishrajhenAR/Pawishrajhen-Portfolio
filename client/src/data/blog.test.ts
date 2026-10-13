import { describe, expect, it } from 'vitest';
import {
  filterPosts,
  formatBlogDate,
  getPostBySlug,
  getRelatedPosts,
  getSortedPosts,
} from './blog';

describe('blog helpers', () => {
  it('finds posts by slug', () => {
    const post = getPostBySlug('agent-loops-that-actually-stop');
    expect(post?.title).toContain('Agent loops');
  });

  it('sorts posts newest first', () => {
    const sorted = getSortedPosts();
    expect(sorted[0]?.date >= sorted[1]?.date).toBe(true);
  });

  it('filters by query and tag', () => {
    const agentPosts = filterPosts('agent', 'agents');
    expect(agentPosts.length).toBeGreaterThan(0);
    expect(agentPosts.every((post) => post.tags.includes('agents'))).toBe(true);
  });

  it('returns related posts with shared tags', () => {
    const related = getRelatedPosts('agent-loops-that-actually-stop');
    expect(related.length).toBeGreaterThan(0);
    expect(related.every((post) => post.slug !== 'agent-loops-that-actually-stop')).toBe(true);
  });

  it('formats calendar dates without timezone drift', () => {
    expect(formatBlogDate('2026-06-26')).toBe('Jun 26, 2026');
  });
});

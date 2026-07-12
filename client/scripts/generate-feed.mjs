import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://pawishrajhen-portfolio.vercel.app';
const AUTHOR = 'PAWISHRAJHEN A R';

const blogPath = path.resolve(__dirname, '../src/data/blog.ts');
const blogSource = readFileSync(blogPath, 'utf8');

const posts = [...blogSource.matchAll(/slug:\s*'([^']+)'[\s\S]*?title:\s*'([^']+)'[\s\S]*?excerpt:\s*\n\s*'([^']+)'[\s\S]*?date:\s*'([^']+)'/g)].map(
  (match) => ({
    slug: match[1],
    title: match[2],
    excerpt: match[3],
    date: match[4],
  }),
);

const items = posts
  .map(
    (post) => `  <item>
    <title>${escapeXml(post.title)}</title>
    <link>${SITE_URL}/blog/${post.slug}</link>
    <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <description>${escapeXml(post.excerpt)}</description>
  </item>`,
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${AUTHOR} — Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Essays on agents, MCP, evals, and shipping autonomous systems.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

const outPath = path.resolve(__dirname, '../public/feed.xml');
writeFileSync(outPath, xml);
console.log(`Generated RSS feed with ${posts.length} posts → public/feed.xml`);

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://pawishrajhen-portfolio.vercel.app';

const blogPath = path.resolve(__dirname, '../src/data/blog.ts');
const blogSource = readFileSync(blogPath, 'utf8');
const slugs = [...blogSource.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]);

const urls = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/blog', changefreq: 'weekly', priority: '0.9' },
  ...slugs.map((slug) => ({
    loc: `/blog/${slug}`,
    changefreq: 'monthly',
    priority: '0.8',
  })),
];

const lastmod = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, changefreq, priority }) => `  <url>
    <loc>${SITE_URL}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const outPath = path.resolve(__dirname, '../public/sitemap.xml');
writeFileSync(outPath, xml);
console.log(`Generated sitemap with ${urls.length} URLs → public/sitemap.xml`);

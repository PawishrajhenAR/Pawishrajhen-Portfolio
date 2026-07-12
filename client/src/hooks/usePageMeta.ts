import { useEffect } from 'react';
import { DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, SITE_NAME, absoluteUrl } from '../lib/seo';

export type PageMeta = {
  title: string;
  description?: string;
  image?: string;
  path?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
};

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector(selector);

  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }

  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }

  el.href = href;
}

export function usePageMeta({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_OG_IMAGE,
  path = '/',
  type = 'website',
  publishedTime,
}: PageMeta) {
  useEffect(() => {
    const previousTitle = document.title;
    const url = absoluteUrl(path);

    document.title = title;

    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', image);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', image);

    if (type === 'article' && publishedTime) {
      upsertMeta('property', 'article:published_time', publishedTime);
    }

    upsertCanonical(url);

    return () => {
      document.title = previousTitle;
    };
  }, [title, description, image, path, type, publishedTime]);
}

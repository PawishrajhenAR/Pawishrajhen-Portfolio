import type { MouseEvent } from 'react';

function getNavOffset(): number {
  const nav = document.querySelector('[data-site-nav]');
  return nav instanceof HTMLElement ? nav.offsetHeight : 0;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function scrollToHash(href: string): boolean {
  if (!href.startsWith('#') || href === '#') return false;

  const target = document.querySelector(href);
  if (!(target instanceof HTMLElement)) return false;

  const top = target.getBoundingClientRect().top + window.scrollY - getNavOffset();
  window.scrollTo({
    top,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  });

  return true;
}

export function handleAnchorClick(event: MouseEvent<HTMLAnchorElement>) {
  const href = event.currentTarget.getAttribute('href');
  if (!href?.startsWith('#') || href === '#') return;
  if (scrollToHash(href)) event.preventDefault();
}

export const SITE_URL = 'https://pawishrajhen-portfolio.vercel.app';

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.svg`;

export const SITE_NAME = 'PAWISHRAJHEN A R';

export const DEFAULT_TITLE = `${SITE_NAME} — AI developer`;

export const DEFAULT_DESCRIPTION =
  'AI developer and engineer building autonomous agents, automations, and full-stack AI products that ship.';

export function absoluteUrl(path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

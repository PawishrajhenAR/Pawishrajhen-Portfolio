const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * @param {unknown} body
 * @returns {{ name: string; email: string; message: string } | null}
 */
export function parseContact(body) {
  if (!body || typeof body !== 'object') return null;

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const message = String(body.message ?? '').trim();

  if (name.length < 2 || name.length > 100) return null;
  if (!EMAIL_RE.test(email) || email.length > 254) return null;
  if (message.length < 10 || message.length > 2000) return null;

  return { name, email, message };
}

/** @param {string} str */
export function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

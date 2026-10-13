type MailtoOptions = {
  subject?: string;
  body?: string;
};

/**
 * Build a mailto: URL. Uses encodeURIComponent so spaces stay as %20
 * (URLSearchParams would turn them into "+", which many mail apps show literally).
 */
export function mailtoHref(email: string, options: MailtoOptions = {}): string {
  const parts: string[] = [];
  if (options.subject) {
    parts.push(`subject=${encodeURIComponent(options.subject)}`);
  }
  if (options.body) {
    parts.push(`body=${encodeURIComponent(options.body)}`);
  }
  return parts.length > 0 ? `mailto:${email}?${parts.join('&')}` : `mailto:${email}`;
}

export function contactMailto(
  toEmail: string,
  fields: { name: string; email: string; message: string },
): string {
  const name = fields.name.trim();
  const from = fields.email.trim();
  const message = fields.message.trim();

  const body = [
    `Hi Pawish,`,
    ``,
    message,
    ``,
    `—`,
    name,
    from,
  ].join('\n');

  return mailtoHref(toEmail, {
    subject: `Portfolio message from ${name}`,
    body,
  });
}

export const portfolioMailto = {
  general: (email: string) =>
    mailtoHref(email, { subject: 'Hello — from your portfolio' }),
  sayHi: (email: string) =>
    mailtoHref(email, {
      subject: 'Hey Pawish',
      body: 'Hi Pawish,\n\n',
    }),
  contact: contactMailto,
};

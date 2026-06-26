type MailtoOptions = {
  subject?: string;
  body?: string;
};

export function mailtoHref(email: string, options: MailtoOptions = {}): string {
  const params = new URLSearchParams();
  if (options.subject) params.set('subject', options.subject);
  if (options.body) params.set('body', options.body);
  const query = params.toString();
  return query ? `mailto:${email}?${query}` : `mailto:${email}`;
}

export const portfolioMailto = {
  general: (email: string) =>
    mailtoHref(email, { subject: 'Hello — from your portfolio' }),
  sayHi: (email: string) =>
    mailtoHref(email, {
      subject: 'Hey Pawish',
      body: 'Hi Pawish,\n\n',
    }),
};

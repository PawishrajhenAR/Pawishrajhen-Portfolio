import { describe, expect, it } from 'vitest';
import { contactMailto, mailtoHref } from './mailto';

describe('mailtoHref', () => {
  it('encodes spaces as %20, not +', () => {
    const href = mailtoHref('a@b.com', {
      subject: 'Hello there',
      body: 'Line one\n\nLine two',
    });

    expect(href).toContain('subject=Hello%20there');
    expect(href).toContain('body=Line%20one%0A%0ALine%20two');
    expect(href).not.toContain('+');
  });
});

describe('contactMailto', () => {
  it('builds a clean message body', () => {
    const href = contactMailto('pawish@example.com', {
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'Loved the agent work.',
    });

    expect(href.startsWith('mailto:pawish@example.com?')).toBe(true);
    expect(href).toContain(encodeURIComponent('Portfolio message from Jane Doe'));
    expect(decodeURIComponent(href)).toContain('Hi Pawish,');
    expect(decodeURIComponent(href)).toContain('Loved the agent work.');
    expect(decodeURIComponent(href)).toContain('jane@example.com');
    expect(href.includes('+')).toBe(false);
  });
});

import { describe, expect, it } from 'vitest';
import { escapeHtml, parseContact } from './contact.js';

describe('parseContact', () => {
  it('accepts valid payloads', () => {
    expect(
      parseContact({
        name: 'Jane Doe',
        email: 'jane@example.com',
        message: 'Hello there, this is long enough.',
      }),
    ).toEqual({
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'Hello there, this is long enough.',
    });
  });

  it('rejects short names and messages', () => {
    expect(parseContact({ name: 'J', email: 'jane@example.com', message: 'too short' })).toBeNull();
    expect(parseContact({ name: 'Jane', email: 'bad-email', message: 'valid message here' })).toBeNull();
  });

  it('trims whitespace', () => {
    expect(
      parseContact({
        name: '  Jane  ',
        email: ' jane@example.com ',
        message: '  Hello there, trimmed message.  ',
      }),
    ).toEqual({
      name: 'Jane',
      email: 'jane@example.com',
      message: 'Hello there, trimmed message.',
    });
  });
});

describe('escapeHtml', () => {
  it('escapes unsafe characters', () => {
    expect(escapeHtml('<script>"x"&</script>')).toBe('&lt;script&gt;&quot;x&quot;&amp;&lt;/script&gt;');
  });
});

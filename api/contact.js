const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseContact(body) {
  if (!body || typeof body !== 'object') return null;

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const message = String(body.message ?? '').trim();

  if (name.length < 2 || name.length > 100) return null;
  if (!EMAIL_RE.test(email) || email.length > 254) return null;
  if (message.length < 10 || message.length > 2000) return null;

  return { name, email, message };
}

function setCors(req, res) {
  const allowed = process.env.CLIENT_ORIGIN;
  const origin = req.headers.origin;

  if (allowed && origin === allowed) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!allowed) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default function handler(req, res) {
  setCors(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const parsed = parseContact(req.body);

  if (!parsed) {
    return res.status(400).json({
      error: 'Invalid form data. Check your name, email, and message.',
    });
  }

  const { name, email, message } = parsed;

  console.log('\n--- New contact submission ---');
  console.log(`From: ${name} <${email}>`);
  console.log(`Message: ${message}`);
  console.log(`Time: ${new Date().toISOString()}`);
  console.log('------------------------------\n');

  return res.status(200).json({
    success: true,
    message: 'Your message has been received. Thank you!',
  });
}

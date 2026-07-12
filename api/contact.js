import { parseContact } from '../lib/contact.js';
import { sendContactEmail } from '../lib/sendContactEmail.js';

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

export default async function handler(req, res) {
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

  try {
    await sendContactEmail({ name, email, message });

    return res.status(200).json({
      success: true,
      message: 'Your message has been received. Thank you!',
    });
  } catch (err) {
    console.error('Contact email failed:', err);

    return res.status(500).json({
      error: 'Could not send your message. Please try again or email directly.',
    });
  }
}

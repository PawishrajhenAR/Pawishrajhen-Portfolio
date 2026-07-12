import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Load root .env first, then server/.env (server overrides if both exist)
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { parseContact } from '../../lib/contact.js';
import { sendContactEmail } from '../../lib/sendContactEmail.js';

const app = express();
const PORT = process.env.PORT ?? 3001;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
});

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173' }));
app.use(express.json({ limit: '16kb' }));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/contact', limiter, async (req, res) => {
  const parsed = parseContact(req.body);

  if (!parsed) {
    return res.status(400).json({
      error: 'Invalid form data. Check your name, email, and message.',
    });
  }

  const { name, email, message } = parsed;

  try {
    await sendContactEmail({ name, email, message });

    res.json({
      success: true,
      message: 'Your message has been received. Thank you!',
    });
  } catch (err) {
    console.error('Contact email failed:', err);

    res.status(500).json({
      error: 'Could not send your message. Please try again or email directly.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Portfolio API running on http://localhost:${PORT}`);
});

import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { z } from 'zod';

const app = express();
const PORT = process.env.PORT ?? 3001;

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(2000),
});

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

app.post('/api/contact', limiter, (req, res) => {
  const parsed = contactSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: 'Invalid form data. Check your name, email, and message.',
      details: parsed.error.flatten().fieldErrors,
    });
  }

  const { name, email, message } = parsed.data;

  // Log contact submissions (wire up Resend/SendGrid/Nodemailer in production)
  console.log('\n--- New contact submission ---');
  console.log(`From: ${name} <${email}>`);
  console.log(`Message: ${message}`);
  console.log(`Time: ${new Date().toISOString()}`);
  console.log('------------------------------\n');

  // TODO: Integrate email service — e.g. Resend, SendGrid, or Nodemailer
  // For now, submissions are validated and logged server-side.

  res.json({
    success: true,
    message: 'Your message has been received. Thank you!',
  });
});

app.listen(PORT, () => {
  console.log(`Portfolio API running on http://localhost:${PORT}`);
});

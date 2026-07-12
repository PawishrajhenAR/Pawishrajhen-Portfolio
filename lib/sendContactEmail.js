import { Resend } from 'resend';
import { escapeHtml } from './contact.js';

/**
 * @param {{ name: string; email: string; message: string }} contact
 */
export async function sendContactEmail({ name, email, message }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from =
    process.env.CONTACT_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>';

  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured.');
  }

  if (!to) {
    throw new Error('CONTACT_TO_EMAIL is not configured.');
  }

  const resend = new Resend(apiKey);
  const subject = `Portfolio contact from ${name}`;
  const text = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const html = `
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
  `;

  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject,
    html,
    text,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

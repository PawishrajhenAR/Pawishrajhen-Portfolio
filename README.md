# Pawishrajhen-Portfolio

Personal portfolio for **PAWISHRAJHEN A R** — AI developer and software engineer. Built with React, Vite, Tailwind CSS, Framer Motion, and GSAP.

## Local development

```bash
npm install
npm install --prefix client
npm install --prefix server
npm run dev
```

- **Client:** http://localhost:5173  
- **API:** http://localhost:3001  
- **Tests:** `npm test` (from root or `client/`)

Optional client env (`client/.env`):

```env
VITE_PLAUSIBLE_DOMAIN=pawishrajhen-portfolio.vercel.app
```

Place your resume at `client/public/resume.pdf` (linked from the hero and nav).

## Deploy on Vercel

This repo is configured for [Vercel](https://vercel.com):

1. Import the GitHub repo in the Vercel dashboard (or run `vercel` from the project root).
2. Use the defaults from `vercel.json` — build runs in `client/`, output is `client/dist`.
3. Set these environment variables in the Vercel dashboard:

   | Variable | Example |
   |----------|---------|
   | `RESEND_API_KEY` | `re_xxxxxxxx` (from [resend.com](https://resend.com)) |
   | `CONTACT_TO_EMAIL` | `pawishgpt@gmail.com` |
   | `CONTACT_FROM_EMAIL` | `Portfolio <portfolio@yourdomain.com>` |
   | `CLIENT_ORIGIN` | `https://your-domain.vercel.app` |

The contact form uses `/api/contact` via Vercel Serverless Functions in `api/`. For local dev, copy `server/.env.example` to `server/.env` and add your Resend API key.

## Structure

| Path | Purpose |
|------|---------|
| `client/` | Vite + React frontend |
| `server/` | Express API for local dev |
| `api/` | Vercel serverless handlers (production) |

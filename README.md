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

## Deploy on Vercel

This repo is configured for [Vercel](https://vercel.com):

1. Import the GitHub repo in the Vercel dashboard (or run `vercel` from the project root).
2. Use the defaults from `vercel.json` — build runs in `client/`, output is `client/dist`.
3. Optional env var: `CLIENT_ORIGIN` — your production site URL (e.g. `https://pawishrajhen-portfolio.vercel.app`) for the contact API CORS header.

The contact form uses `/api/contact` via Vercel Serverless Functions in `api/`.

## Structure

| Path | Purpose |
|------|---------|
| `client/` | Vite + React frontend |
| `server/` | Express API for local dev |
| `api/` | Vercel serverless handlers (production) |

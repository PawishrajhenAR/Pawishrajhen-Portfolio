# Pawishrajhen-Portfolio

Personal portfolio for **PAWISHRAJHEN A R** — AI developer and software engineer. Built with React, Vite, Tailwind CSS, Framer Motion, and GSAP.

## Local development

```bash
npm install
npm install --prefix client
npm run dev
```

- **Client:** http://localhost:5173  
- **Tests:** `npm test` (from root or `client/`)

The contact form opens the visitor’s mail app (`mailto:`) with a prefilled draft to the address in `client/src/data/content.ts` — no third-party email API or custom domain required.

Optional client env (`client/.env`):

```env
VITE_PLAUSIBLE_DOMAIN=pawishrajhen-portfolio.vercel.app
```

Place your resume at `client/public/resume.pdf` (linked from the hero and nav).

### Checks

```bash
npm test
npm run build
```

## Deploy on Vercel

This repo is configured for [Vercel](https://vercel.com):

1. Import the GitHub repo in the Vercel dashboard (or run `vercel` from the project root).
2. Use the defaults from `vercel.json` — build runs in `client/`, output is `client/dist`.
3. No email API keys are required.

## Structure

| Path | Purpose |
|------|---------|
| `client/` | Vite + React frontend |
| `server/` | Optional local health API |
| `api/` | Optional Vercel health handler |

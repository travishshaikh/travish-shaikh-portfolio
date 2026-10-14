# Travish Shaikh Portfolio

A premium dark-theme React + Vite portfolio for a freelance WordPress and Shopify developer.

## Requirements
- Node.js 20+ recommended
- npm

## Run locally
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm run preview
```

## Configure contact and social links
Create a `.env` file from `.env.example` and set `VITE_CONTACT_EMAIL`, `VITE_LINKEDIN_URL`, and `VITE_GITHUB_URL`. Vite variables are public in the browser, so never put secrets in them. The contact form currently prepares an email through the visitor's mail app; use a form service or server endpoint for direct submissions.

## Project content
Edit `src/data/projects.js` to update project cards. Project visuals are CSS-generated illustrative previews, not screenshots of the live sites. Replace them with real screenshots before publishing. Review each project's `contributionVerified` value before claiming it as completed work.

## Deploy
Deploy the Vite app to Vercel, Netlify, Cloudflare Pages, or any static host. Build command: `npm run build`. Output directory: `dist`.

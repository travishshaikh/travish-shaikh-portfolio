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
Create a `.env` file from `.env.example` and set `VITE_CONTACT_EMAIL`, `VITE_LINKEDIN_URL`, and `VITE_GITHUB_URL`. Vite variables are public in the browser, so never put secrets in them.

## Resend contact form on Vercel
The contact form posts to `/api/contact`, a Vercel serverless function that sends the inquiry through Resend. In Vercel Project Settings → Environment Variables, set:
- `RESEND_API_KEY`: your Resend API key (server-side only; never use a `VITE_` prefix).
- `RESEND_TO_EMAIL`: `travishshaikh30@gmail.com` (optional; this is the default recipient).

Until you verify your own domain in Resend, use `onboarding@resend.dev` as the sender, and the recipient must be the email address associated with your Resend account. To deliver to a different recipient, verify a domain in Resend and update the sender in `api/contact.js` to an address on that verified domain. After adding or changing environment variables, redeploy the Vercel project.

## Project content
Edit `src/data/projects.js` to update project cards. Project visuals are CSS-generated illustrative previews, not screenshots of the live sites. Replace them with real screenshots before publishing. Review each project's `contributionVerified` value before claiming it as completed work.

## Deploy
Deploy the Vite app to Vercel, Netlify, Cloudflare Pages, or any static host. Build command: `npm run build`. Output directory: `dist`.


## Contact form
The contact section is preconfigured to address inquiries to `Travishshaikh30@gmail.com`. The current static form opens the visitor's email app with the form details prefilled; it does not silently send messages from the website. For direct submissions without opening an email app, connect a form endpoint or backend.


## Website screenshots
Project cards load live website screenshots through the Thum.io screenshot service. Screenshot images are loaded lazily and the card falls back to its local illustrative preview if a screenshot request fails. The free screenshot service has usage limits.

## Contact form delivery
The contact form submits through FormSubmit's AJAX endpoint to the configured `VITE_CONTACT_EMAIL` recipient (default: `Travishshaikh30@gmail.com`). The first submission may require confirming the activation email sent by FormSubmit. Test the live form after deployment and check spam/junk if the activation message is not in the inbox. A success response means the service accepted the submission, not that inbox delivery has been independently verified.

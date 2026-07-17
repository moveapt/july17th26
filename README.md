# moveAPT — Move smarter. Know before you go.

> AI-powered furniture fitting tool. Take photos of your furniture, tell us your new apartment, and moveAPT predicts whether everything fits before moving day.

[![Deploy to Cloudflare Pages](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/moveapt/moveapt)

---

## Important Cloudflare Build Setting

This repository is a **static Next.js export for Cloudflare Pages**. In the Cloudflare dashboard use exactly:

```text
Framework preset: Next.js (Static HTML Export)
Build command: npm run build
Build output directory: out
Root directory: leave blank (repository root)
Node.js version: 22
```

Do **not** use `npx @cloudflare/next-on-pages@1`. That adapter is not needed for this static-export project and caused the dependency failure in the July 17 deployment log.

## Tech Stack

- **Framework**: Next.js 15 (static export)
- **UI**: React 19 + TypeScript + Tailwind CSS v4
- **Animations**: Framer Motion
- **Hosting**: Cloudflare Pages
- **Functions**: Cloudflare Pages Functions (Edge)
- **Email**: Brevo (Sendinblue) API
- **Bot protection**: Cloudflare Turnstile
- **Analytics**: Cloudflare Web Analytics
- **SEO**: OpenGraph, Twitter Cards, JSON-LD, sitemap, robots.txt

---

## Quick Start (Local Development)

### Prerequisites

- Node.js ≥ 20
- npm or pnpm

### 1. Clone and install

```bash
git clone https://github.com/yourusername/moveapt.git
cd moveapt
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
```

> **Note**: The value `1x00000000000000000000AA` is Cloudflare's test site key — Turnstile will always pass in dev with this key. For production, replace with your real site key.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Waitlist endpoint**: The `/api/waitlist` function runs as a Cloudflare Pages Function — it won't work with `next dev`. Use `npx wrangler pages dev ./out` to test it locally after building.

---

## Deploying to Cloudflare Pages

### Method 1: GitHub Integration (Recommended)

1. Push this repo to GitHub.
2. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com).
3. Go to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
4. Select your repo.
5. Set build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Node.js version**: `22`
6. Add environment variables (see below).
7. Click **Save and Deploy**.

### Method 2: Wrangler CLI

```bash
npm run build
npx wrangler pages deploy out --project-name=moveapt
```

---

## Environment Variables

Set these in **Cloudflare Pages → Settings → Environment Variables**:

| Variable | Type | Description |
|---|---|---|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Plain text | Your Turnstile site key (public) |
| `BREVO_API_KEY` | **Secret** | Your Brevo API key |
| `BREVO_LIST_ID` | **Secret** | Brevo contact list ID (numeric) |
| `TURNSTILE_SECRET` | **Secret** | Your Turnstile secret key |

> ⚠️ **Secrets** should be added as encrypted secrets, not plain text.

### Add secrets via CLI:

```bash
npx wrangler pages secret put BREVO_API_KEY --project-name=moveapt
npx wrangler pages secret put BREVO_LIST_ID --project-name=moveapt
npx wrangler pages secret put TURNSTILE_SECRET --project-name=moveapt
```

---

## Brevo (Email) Setup

1. Create an account at [brevo.com](https://www.brevo.com).
2. Go to **Contacts** → **Lists** → **Create a list** (e.g., "moveAPT Waitlist").
3. Note the **List ID** (numeric, visible in the list URL).
4. Go to **API Keys** → **Create a new API key**.
5. Add `BREVO_API_KEY` and `BREVO_LIST_ID` as secrets.

The waitlist endpoint will:
- Create new contacts with `updateEnabled: true`
- Add them to the specified list
- Handle duplicates gracefully

---

## Cloudflare Turnstile Setup

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Turnstile**.
2. Click **Add widget**.
3. Set your site name and domain (e.g., `moveapt.com`).
4. Choose **Invisible** widget type.
5. Copy the **Site Key** → add as `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (plain text).
6. Copy the **Secret Key** → add as `TURNSTILE_SECRET` (secret).

---

## Cloudflare Analytics Setup

1. Go to **Cloudflare Dashboard** → **Analytics & Logs** → **Web Analytics**.
2. Add your site.
3. Copy the analytics **token**.
4. Replace `YOUR_CF_ANALYTICS_TOKEN` in `src/app/layout.tsx` with your token.

---

## Custom Domain Setup

1. In Cloudflare Pages → your project → **Custom domains**.
2. Click **Set up a custom domain**.
3. Enter `moveapt.com` (or your domain).
4. Follow DNS instructions.

If your domain is already on Cloudflare DNS, the CNAME is added automatically.

---

## Project Structure

```
moveapt/
├── functions/
│   └── api/
│       └── waitlist.ts          # Cloudflare Pages Function (waitlist endpoint)
├── public/
│   ├── icons/                   # PNG icons (16, 32, 180, 192, 512)
│   ├── favicon.ico
│   ├── og-image.png
│   ├── robots.txt
│   ├── sitemap.xml
│   └── manifest.webmanifest
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout, metadata, JSON-LD
│   │   ├── page.tsx             # Home page
│   │   ├── globals.css          # Tailwind v4 + custom CSS
│   │   ├── privacy/page.tsx
│   │   └── terms/page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── SocialProof.tsx
│   │   │   ├── FAQ.tsx
│   │   │   └── CTASection.tsx
│   │   └── ui/
│   │       ├── Logo.tsx
│   │       ├── PhoneMockup.tsx
│   │       └── WaitlistForm.tsx
│   ├── hooks/
│   │   └── useInView.ts
│   └── lib/
│       └── utils.ts
├── .env.example
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── prettier.config.mjs
├── tsconfig.json
└── wrangler.toml
```

---

## Available Scripts

```bash
npm run dev          # Start dev server (Next.js only)
npm run build        # Build for production (static export)
npm run start        # Start production server locally
npm run lint         # Run ESLint
npm run format       # Format with Prettier
npm run type-check   # TypeScript type checking
```

---

## SEO Checklist

- [x] Title & meta description
- [x] Canonical URL
- [x] OpenGraph tags (title, description, image)
- [x] Twitter Card tags
- [x] JSON-LD structured data (WebSite, Organization, SoftwareApplication, FAQPage, BreadcrumbList)
- [x] robots.txt (AI crawlers explicitly allowed)
- [x] sitemap.xml
- [x] manifest.webmanifest
- [x] Favicon + Apple touch icon
- [x] Semantic HTML throughout
- [x] ARIA labels on interactive elements
- [x] WCAG AA color contrast

---

## Testing Locally with Wrangler

To test the waitlist function locally:

```bash
npm run build
npx wrangler pages dev ./out --binding BREVO_API_KEY=test --binding BREVO_LIST_ID=1 --binding TURNSTILE_SECRET=test
```

---

## License

MIT © moveAPT

---

*Built with ❤️ by renters who've returned too many couches.*

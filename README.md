# Lumina — Ultra Premium Dental Clinic

Production-ready marketing site for a premium dental clinic, built to convert
visitors into appointments and to establish trust within the first five seconds.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS 4** (CSS-first `@theme` tokens)
- **Framer Motion** — scroll reveals, spring physics, micro-interactions
- **shadcn/ui** primitives (Radix under the hood)
- **React Hook Form + Zod** — typed, validated appointment form
- **next-themes** — light / dark mode
- **Lucide** icons

## Getting started

```bash
cp .env.example .env.local   # optional: set APPOINTMENT_WEBHOOK_URL
npm install
npm run dev                  # http://localhost:3000
```

Scripts: `dev`, `build`, `start`, `lint`, `typecheck`.

## Architecture

```
src/
├── app/                     # App Router: layout, page, api, seo route handlers
│   ├── api/appointment/     # POST endpoint — validates + forwards leads
│   ├── globals.css          # Design tokens (@theme), light/dark, keyframes
│   ├── layout.tsx           # Metadata, OG, fonts, ThemeProvider, JSON-LD
│   ├── page.tsx             # Composes all sections (Server Component)
│   ├── sitemap.ts robots.ts manifest.ts
│   ├── loading.tsx error.tsx not-found.tsx
├── components/
│   ├── ui/                  # shadcn primitives (button, input, select, …)
│   ├── layout/              # header, footer
│   ├── sections/            # hero, services, doctors, before-after, reviews,
│   │                        # why-us, appointment, faq, contacts
│   └── shared/              # theme-provider, theme-toggle, animated-counter,
│                            # section-heading, rating-stars, json-ld, mobile-cta
├── hooks/                   # use-media-query, use-mounted
├── lib/                     # utils, constants, data, animations, validations
└── types/                   # shared TypeScript types
```

Server Components by default; only interactive pieces (`"use client"`) opt in.

## Design system

The palette, radii, and shadows live as CSS variables in `globals.css` under
`@theme`, so Tailwind utilities (`bg-accent`, `rounded-3xl`, …) and dark-mode
overrides derive from a single source of truth.

| Token       | Light      | Dark       |
| ----------- | ---------- | ---------- |
| background  | `#F8FAFC`  | `#0B1120`  |
| primary     | `#0F172A`  | `#E2E8F0`  |
| accent      | `#14B8A6`  | `#14B8A6`  |
| secondary   | `#0EA5E9`  | `#0EA5E9`  |

## Performance & SEO

- `next/image` with AVIF/WebP, priority hero, lazy below-the-fold
- Metadata, OpenGraph, Twitter cards, `Dentist` + `FAQPage` JSON-LD
- `sitemap.xml`, `robots.txt`, PWA `manifest`
- Reduced-motion support, visible focus rings, semantic landmarks (WCAG AA)

## Appointment flow

`components/sections/appointment.tsx` → `POST /api/appointment`.
Both client and server validate with the same Zod schema
(`lib/validations/appointment.ts`). A honeypot field filters bots. Set
`APPOINTMENT_WEBHOOK_URL` to forward leads to a CRM; otherwise they are logged.

## Assets to replace before launch

Replace Unsplash placeholders in `lib/data.ts` and the hero with real photos,
and add `public/og.jpg`, `public/icon-192.png`, `public/icon-512.png`.

## Deploy

Optimised for Vercel: push the repo and import it. Set env vars in the
dashboard. `next build` produces the production bundle.

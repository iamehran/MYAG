# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Dev server at localhost:3000
npm run build      # Production build + TypeScript check
npm run start      # Serve production build
npm run lint       # ESLint
npx tsc --noEmit   # Type-check without building
```

No test suite configured. Use `npm run build` to catch type errors before deploying.

---

## Project Overview

Portfolio site for **Mehran Firdous, AI Automation Architect**. The core concept is a node-graph that mimics automation workflow tools (n8n/Zapier). Visitors land on a splash page, click "run workflow", and navigate a React Flow canvas where each node opens a slide-in panel.

**Page flow:**
```
/ (landing)  →  /canvas (workflow graph + panels)  →  /projects/[slug] (SEO detail pages)
                                                   →  /admin (protected dashboard)
```

---

## Tech Stack

| Package | Version | Notes |
|---|---|---|
| `next` | 16.x | App Router only, `src/` directory |
| `reactflow` | 11.x | v11 API — `useNodesState`, `useEdgesState`. NOT `@xyflow/react` (v12) |
| `framer-motion` | 12.x | All animations, `AnimatePresence` for panel transitions |
| `jose` | latest | JWT for admin auth (Edge-compatible) |
| Tailwind | v4 | CSS-first config in `globals.css`, no `tailwind.config.js` |
| shadcn | v3 | Components in `src/components/ui/` |
| `lucide-react` | latest | All icons |
| `next/font/google` | — | JetBrains Mono (weights 300, 400, 500) |

---

## Architecture

### Routing

- `/` — Landing page with EtherealShadow animated background + "run workflow" button
- `/canvas` — Full-screen React Flow canvas, dynamically imported (`ssr: false`)
- `/projects/[slug]` — Static SEO pages generated from `mockData`
- `/admin` — Login page (JWT cookie auth)
- `/admin/dashboard` — CRUD for projects and templates
- `/api/admin/auth` — POST (login) / DELETE (logout)
- `/api/admin/projects` + `/api/admin/templates` — Protected CRUD APIs
- `/api/content/projects` + `/api/content/templates` — Public read-only APIs

### Canvas system (`src/components/canvas/`)

`WorkflowCanvas.tsx` is the brain. It is always `dynamic(..., { ssr: false })` in `canvas/page.tsx`.

**Node layout** (all positions center on x=0, all widths 200px):
```
trigger  (x: -100, y:   0)  ← identity card
about    (x: -100, y: 160)
work     (x: -100, y: 290)
templates(x: -310, y: 430)  ← branches left
services (x:  110, y: 430)  ← branches right
contact  (x: -100, y: 580)
```

- `nodeTypes`: `trigger` → `TriggerNode`, `work` → `WorkNode`
- `edgeTypes`: `animated` → `AnimatedEdge` (white dashed, flowing dash animation via CSS `edgeFlow` keyframe in `globals.css`)
- `node.data.panel` string drives which panel opens in `PanelContainer`
- `fitView({ padding: 0.22 })` fires once on init via `onInit` + `initialized` ref guard
- `panOnScroll={false}` — prevents scroll conflicts on mobile
- React Flow Controls hidden on mobile via CSS (`@media max-width: 640px`)

### Panel system (`src/components/panels/`)

`PanelContainer` is the slide-in shell:
- Slides from right: `x: '100%'` → `x: 0`
- Width: `min(440px, 100vw)` — full screen on mobile, capped at 440px on desktop
- Closes on: backdrop click, Escape key, X button
- Locks `document.body.overflow` while open (prevents canvas pan-scroll on mobile)
- Safe-area bottom padding: `max(1.25rem, env(safe-area-inset-bottom))`
- Close button: `w-9 h-9` on mobile, `w-7 h-7` on desktop (44px+ touch target)

Adding a new panel: create the component, add it to `PanelContainer`'s switch, add a `WorkNode` in `WorkflowCanvas` with matching `panel` string, add an edge.

### Content / data

`src/lib/mockData.ts` is the default source of truth. Exports:
- `mockProjects: Project[]`
- `mockTemplates: Template[]`
- `mockTestimonials: Testimonial[]`
- TypeScript interfaces for all three

`src/lib/dataStore.ts` — file-based read/write using Node `fs`. Reads/writes `src/data/projects.json` and `src/data/templates.json`. **These JSON files are gitignored** (may contain client info entered via admin).

`WorkPanel` and `TemplatesPanel` fetch from `/api/content/projects` and `/api/content/templates` on mount, falling back to `mockData` on error.

### Admin auth

- `src/lib/auth.ts` — JWT sign/verify with `jose` (Edge-safe). Reads `ADMIN_PASSWORD` and `ADMIN_JWT_SECRET` from env.
- `src/proxy.ts` — Next.js 16 middleware (file must be `proxy.ts`, export must be named `proxy`, not `middleware`). Guards `/admin/:path*`.
- Session stored in httpOnly cookie `admin_session`.

### Styling

**Theme:** White-Grey-Black monochromatic. Zero color accents anywhere.
- Background: `#0C0C0C`
- Text hierarchy: `rgba(255,255,255,0.85)` → `0.7` → `0.45` → `0.3` → `0.2` → `0.18`
- Borders: `rgba(255,255,255,0.06)` → `0.08` → `0.1` → `0.12`
- Font: JetBrains Mono, `fontWeight: 300` / `400` only — never bold/semibold in UI copy
- All user-facing copy is **lowercase**

**Font setup in `layout.tsx`:**
```tsx
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jb', weight: ['300','400','500'] });
// body style: fontFamily: 'var(--font-jb), monospace'
```

**Key globals.css utilities:**
- `.dot-grid` / `.dot-grid-faint` — CSS radial-gradient dot pattern for backgrounds
- `.h-screen-safe` — `100vh` with `100dvh` fallback for iOS Safari dynamic chrome
- `.safe-bottom` / `.safe-top` — `env(safe-area-inset-*)` padding for notched devices
- `@keyframes edgeFlow` — animated dash offset for React Flow edges
- React Flow overrides: transparent bg, white edge path, mono controls, SVG icon fill fix

### EtherealShadow component

`src/components/ui/etheral-shadow.tsx` — Animated SVG turbulence + displacement filter creates a flowing organic shadow shape. Used on the landing page as the full-screen background.

Usage on landing page:
```tsx
<EtherealShadow
  color="rgba(210, 210, 210, 0.9)"
  animation={{ scale: 100, speed: 90 }}
  noise={{ opacity: 1, scale: 1.2 }}
  sizing="fill"
/>
```
A dark radial vignette sits on top (z-10) to keep the text readable.

---

## Mobile Responsiveness

**Landing page (`/`):**
- `h-screen-safe` for iOS safe height
- `gap-5 sm:gap-8` — tighter spacing on small screens
- Headline uses `clamp(1.6rem, 6vw, 2.4rem)` — scales with viewport
- Button has `min-h-[44px]` for 44px minimum touch target

**Canvas page (`/canvas`):**
- `h-screen-safe` — avoids iOS URL-bar cutoff
- Hint text: "tap or click a node to explore"
- Back link has `min-h-[44px]` and `px-2` for larger touch area
- Controls hidden on mobile (`@media max-width: 640px`)
- `panOnScroll={false}` prevents scroll-vs-pan conflicts

**Panels:**
- Full-width on mobile (`min(440px, 100vw)`)
- Header padding: `px-4 sm:px-6`
- Body padding: `px-4 sm:px-6`, bottom uses `env(safe-area-inset-bottom)`
- Close button: `w-9 h-9` on mobile (larger touch target)
- `document.body.overflow = 'hidden'` while panel is open

**Admin dashboard:**
- Form grids: `grid-cols-1 sm:grid-cols-2`
- Featured + URL row: `flex-col sm:flex-row`
- Content area: `px-4 sm:px-6 py-6 sm:py-8`

**Projects detail page:**
- Padding: `px-4 sm:px-6 py-8 sm:py-12`
- Metrics grid: `grid-cols-2 sm:grid-cols-3`

---

## Environment Variables

Required in `.env.local`:
```
ADMIN_PASSWORD=your-secure-password
ADMIN_JWT_SECRET=minimum-32-character-random-string
```

---

## Favicons

All favicon assets live in `public/`:
- `favicon-16x16.png`, `favicon-32x32.png`
- `apple-touch-icon.png`
- `android-chrome-192x192.png`, `android-chrome-512x512.png`
- `site.webmanifest` (theme `#0C0C0C`, display `standalone`)

`src/app/favicon.ico` is the main browser tab icon (auto-served by Next.js).
Icons declared in `layout.tsx` via `metadata.icons`.

---

## Gitignore — sensitive files protected

- `.env`, `.env.*`, `.env.local` — all env variants
- `src/data/projects.json`, `src/data/templates.json` — admin content store
- `CLAUDE.md`, `.claude/` — AI assistant files
- `.DS_Store`, `.idea/`, `.vscode/`
- `*.pem`, `*.key`, `*.p12`, `*.pfx`, `*.secret`

---

## Deployment notes

- File-based data store (`src/data/*.json`) does **not** persist on Vercel (ephemeral filesystem). For production: replace `dataStore.ts` with Vercel KV, PlanetScale, or similar.
- `src/proxy.ts` (Next.js middleware) deploys to Edge runtime automatically on Vercel.
- The `favicon_io/` source directory is not gitignored but contains no sensitive data.

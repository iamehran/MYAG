# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at localhost:3000
npm run build      # Production build (also runs TypeScript check)
npm run start      # Serve production build
npm run lint       # ESLint
npx tsc --noEmit   # Type-check without building
```

No test suite is configured. Verify changes with `npm run build` (it catches type errors and build failures).

## Architecture

This is a Next.js 16 App Router portfolio site for an AI Automation Developer. The core UX concept is a node graph that mimics automation tools (n8n/Zapier). All pages use `'use client'` where needed; the app defaults to dark mode via `class="dark"` on `<html>`.

### Page flow

```
/ (landing)  →  /canvas (workflow graph)  →  panel slides in on node click
                                          →  /projects/[slug] (SEO detail pages, SSG)
```

### Canvas system (`src/components/canvas/`)

`WorkflowCanvas.tsx` is the brain. It wraps everything in `ReactFlowProvider`, holds the `activePanel` state, and manages orientation switching. The two layout modes — `HORIZONTAL_NODES/EDGES` (radial fan) and `VERTICAL_NODES/EDGES` (linear chain) — are hardcoded constant arrays at the top of that file. Switching orientation calls `setNodes`/`setEdges` then `fitView({ duration: 600 })`.

- `nodeTypes` maps `"trigger"` → `TriggerNode` and `"work"` → `WorkNode`
- `edgeTypes` maps `"animated"` → `AnimatedEdge` (custom SVG with flowing green dash animation)
- Node `data.panel` string is what drives `PanelContainer` — e.g. `panel: 'about'`

WorkflowCanvas is **always dynamically imported** (`ssr: false`) in `src/app/canvas/page.tsx` because React Flow is browser-only.

### Panel system (`src/components/panels/`)

`PanelContainer` is the slide-in shell (framer-motion, ESC to close, backdrop click to close). It switches on `panelId` to render the correct panel component. Adding a new panel = add the component, add it to `PanelContainer`'s switch, add a `WorkNode` in `WorkflowCanvas` with the matching `panel` string.

### Content / data

`src/lib/mockData.ts` is the source of truth while Sanity is not configured. It exports `mockProjects`, `mockTemplates`, `mockTestimonials` with their TypeScript interfaces. `WorkPanel`, `TemplatesPanel`, and `projects/[slug]/page.tsx` all import directly from here.

`src/lib/sanity.ts` has the `sanityClient` and GROQ queries ready to swap in. When Sanity is live, replace direct `mockData` imports with async fetches using those queries.

### 3D orb (`src/components/three/FloatingOrb.tsx`)

Uses `@react-three/fiber` + `@react-three/drei`. The Canvas is also dynamically imported (`ssr: false`) in `canvas/page.tsx`. It renders as a decorative background layer behind the React Flow canvas at low opacity.

### Styling

- Dark mode is default, always. `globals.css` sets `:root` to the dark palette directly (no light theme toggle implemented).
- Design tokens use OKLCH. Accent color is emerald (`oklch(0.79 0.15 162)` ≈ `#34d399`).
- React Flow node CSS transitions (`transform 0.55s`) live in `globals.css` — this is what animates layout switches.
- `tailwind-merge` + `clsx` via `src/lib/utils.ts` (`cn()` helper from shadcn).

### CMS (Sanity)

Schemas are in `src/sanity/schemas/`. They are **not yet wired to a live studio** — a separate Sanity project + `sanity.config.ts` needs to be initialized. Env vars required: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`. See `.env.local.example`.

Adding a new project via CMS currently requires also adding a node to `HORIZONTAL_NODES` and `VERTICAL_NODES` in `WorkflowCanvas.tsx` (or building a dynamic node generator that reads from Sanity at build time).

## Key dependencies and versions

| Package | Version | Notes |
|---|---|---|
| `reactflow` | 11.x | v11 API (`useNodesState`, `useEdgesState`). **Not** `@xyflow/react` (v12). |
| `framer-motion` | 12.x | Used for all page and panel animations |
| `@react-three/fiber` | 9.x | R3F for Three.js — must be client-only |
| `@react-three/drei` | 10.x | `MeshDistortMaterial` for orb |
| `next` | 16.x | App Router only, no Pages Router |
| Tailwind | v4 | Config is CSS-first (`globals.css`), no `tailwind.config.js` |
| shadcn | v3 | Components go in `src/components/ui/` |

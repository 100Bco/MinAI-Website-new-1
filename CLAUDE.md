# CLAUDE.md — MinAI Website

## Project Overview

MinAI is a SaaS marketing automation platform website for small businesses and contractors. It showcases an AI-powered infrastructure system that replaces fragmented software tools (CRM, email, SMS, reputation management, booking, etc.) with a unified platform. The site markets 9 core products and collects demo requests.

## Tech Stack

| Layer       | Technology                                                    |
|-------------|---------------------------------------------------------------|
| Frontend    | React 18 + TypeScript 5.6 + Vite 7                           |
| Styling     | Tailwind CSS 3.4 + Shadcn/ui (Radix UI primitives)           |
| Routing     | Wouter 3.3 (lightweight client-side router)                   |
| State       | React Query 5 (server state) + React Context (modal state)    |
| Forms       | React Hook Form + Zod validation                              |
| Animation   | Framer Motion 11                                              |
| Icons       | Lucide React                                                  |
| Backend     | Express.js 5 + Node.js                                        |
| Database    | PostgreSQL + Drizzle ORM 0.39                                 |
| Deployment  | Vercel (static + serverless functions)                        |
| Build       | Vite (client) + esbuild (server)                              |

## Directory Structure

```
├── client/                  # React frontend
│   ├── index.html           # HTML entry point
│   ├── public/              # Static assets (favicon)
│   └── src/
│       ├── App.tsx          # Root component with routing
│       ├── main.tsx         # React DOM entry
│       ├── index.css        # Global styles + custom utilities
│       ├── components/
│       │   ├── AnimatedReveal.tsx   # Framer Motion scroll reveal
│       │   ├── BookDemoModal.tsx    # Demo booking form modal
│       │   ├── layout/             # PageLayout, Navbar, Footer
│       │   └── ui/                 # Shadcn/ui components (button, card, dialog, etc.)
│       ├── context/
│       │   └── ModalContext.tsx     # Global modal state
│       ├── hooks/
│       │   ├── use-demo-requests.ts # React Query mutation
│       │   └── use-toast.ts         # Toast notifications
│       ├── lib/
│       │   ├── utils.ts            # cn() classname merge helper
│       │   ├── queryClient.ts      # React Query configuration
│       │   └── data.ts             # Product definitions (hardcoded)
│       └── pages/
│           ├── Home.tsx            # Landing page (hero, features, FAQ)
│           ├── ProductsIndex.tsx   # Product grid
│           ├── ProductDetail.tsx   # Individual product pages
│           ├── Pricing.tsx         # Pricing tiers & comparison
│           ├── Testimonials.tsx    # Case studies
│           ├── OurWorks.tsx        # Portfolio showcase
│           ├── AboutUs.tsx         # Company info
│           └── not-found.tsx       # 404 page
├── server/                  # Express.js backend
│   ├── index.ts             # Server setup, middleware, port binding
│   ├── routes.ts            # API route handlers
│   ├── db.ts                # PostgreSQL connection (pg.Pool)
│   ├── storage.ts           # Storage abstraction (DB or in-memory)
│   ├── static.ts            # Static file serving (production)
│   └── vite.ts              # Vite dev server integration (development)
├── shared/                  # Shared between client & server
│   ├── schema.ts            # Drizzle ORM schema + Zod validation schemas
│   └── routes.ts            # Type-safe API route definitions
├── api/                     # Vercel serverless functions
│   └── demo-requests.ts     # Demo request handler
├── script/
│   └── build.ts             # Production build script (esbuild)
├── attached_assets/         # Static images and logos
├── tailwind.config.ts       # Tailwind theme (HSL colors, animations)
├── vite.config.ts           # Vite config (React plugin, aliases)
├── tsconfig.json            # TypeScript strict mode config
├── drizzle.config.ts        # Drizzle ORM + PostgreSQL config
├── components.json          # Shadcn/ui configuration
├── vercel.json              # Vercel deployment (rewrites, build)
└── postcss.config.js        # PostCSS with Tailwind + autoprefixer
```

## Commands

```bash
# Development (starts Express + Vite HMR on port 5001)
npm run dev

# Client build (Vite → dist/public/)
npm run build

# Server build (esbuild → dist/index.cjs)
npm run build:server

# Production server
npm start

# TypeScript type checking
npm run check
```

## Client-Side Routes

| Path              | Component            | Description                  |
|-------------------|----------------------|------------------------------|
| `/`               | `Home.tsx`           | Landing page with hero & FAQ |
| `/products`       | `ProductsIndex.tsx`  | Product grid                 |
| `/products/:slug` | `ProductDetail.tsx`  | Individual product detail    |
| `/pricing`        | `Pricing.tsx`        | Pricing tiers & comparison   |
| `/testimonials`   | `Testimonials.tsx`   | Case studies & proof         |
| `/works`          | `OurWorks.tsx`       | Portfolio showcase            |
| `/about`          | `AboutUs.tsx`        | Company mission & values     |
| `*`               | `not-found.tsx`      | 404 page                     |

## API Endpoints

| Method | Path                  | Description              |
|--------|-----------------------|--------------------------|
| POST   | `/api/demo-requests`  | Submit demo booking form |

Request body validated with Zod. Returns 201 on success, 400 on validation error.

## Database Schema

Single table `demo_requests`:

| Column    | Type      | Notes                  |
|-----------|-----------|------------------------|
| id        | serial    | Primary key            |
| name      | text      | Required               |
| email     | text      | Required               |
| phone     | text      | Optional               |
| company   | text      | Optional               |
| message   | text      | Optional               |
| createdAt | timestamp | Default: current time  |

Schema defined in `shared/schema.ts` using Drizzle ORM. Zod schemas for validation are auto-generated with `drizzle-zod`.

## Storage Layer

`server/storage.ts` provides a storage abstraction:
- **DatabaseStorage** — uses Drizzle ORM + PostgreSQL (when `DATABASE_URL` env is set)
- **MemStorage** — in-memory fallback for development without a database

## Architecture Conventions

### Import Aliases

```typescript
import { Button } from "@/components/ui/button"    // → client/src/...
import { schema } from "@shared/schema"             // → shared/...
```

Configured in `tsconfig.json` and `vite.config.ts`.

### Naming Conventions

- **Components & Pages**: PascalCase (`BookDemoModal.tsx`, `ProductDetail.tsx`)
- **Hooks**: camelCase with `use-` prefix (`use-demo-requests.ts`, `use-toast.ts`)
- **Utilities & data**: camelCase (`queryClient.ts`, `data.ts`)
- **UI components**: lowercase (`button.tsx`, `card.tsx`) — Shadcn/ui convention
- **Directories**: lowercase or kebab-case
- **Types/Interfaces**: PascalCase (`IStorage`, `InsertDemoRequest`)

### Component Patterns

- Functional components with hooks only (no class components)
- `React.forwardRef` for UI primitives (Shadcn/ui pattern)
- `ModalContext` for global modal open/close state
- React Query mutations for API calls (see `use-demo-requests.ts`)
- React Hook Form + Zod resolver for form validation
- Framer Motion `AnimatedReveal` wrapper for scroll-triggered animations

### Styling Patterns

- Tailwind CSS utility classes everywhere; no CSS modules or styled-components
- HSL-based CSS variables for theming (defined in `client/src/index.css`)
- Custom utility classes in `index.css`: `.text-glow`, `.box-glow`, `.glass-panel`, `.gradient-text`, `.premium-shadow`, `.vibrant-glow`
- `cn()` helper (from `lib/utils.ts`) merges Tailwind classes using `clsx` + `tailwind-merge`
- Class Variance Authority (`cva`) for component variants in Shadcn/ui components
- Mobile-first responsive design with `md:` and `lg:` breakpoints
- Primary color: blue (HSL 223 100% 55%)
- Font: Inter (loaded via Google Fonts in `index.html`)

### Type Safety

- TypeScript strict mode enabled
- Zod schemas in `shared/schema.ts` serve as single source of truth for types
- Types inferred from Zod schemas (`z.infer<>`) and Drizzle table definitions (`$inferSelect`)
- API contract defined in `shared/routes.ts` — used by both client and server

### Product Data

All product content is hardcoded in `client/src/lib/data.ts` as a typed array. Each product has: id, slug, title, subtitle, icon, description, details, benefits, stats, keyFeatures, and optional whatIs/ctaSection fields. To add/modify products, edit this file.

## Deployment

**Platform:** Vercel

- Build command: `npm run build` (Vite client build only)
- Output directory: `dist/public`
- SPA fallback: all non-API routes rewrite to `/index.html`
- Serverless functions: `/api` directory handles API endpoints
- The `api/demo-requests.ts` file is a standalone Vercel-compatible handler (does not use Express)

## Environment Variables

| Variable       | Required | Description                              |
|----------------|----------|------------------------------------------|
| `DATABASE_URL` | No       | PostgreSQL connection string. If unset, falls back to in-memory storage. |
| `PORT`         | No       | Server port (default: 5001)              |

## Key Files to Know

| File                          | Purpose                                         |
|-------------------------------|--------------------------------------------------|
| `client/src/App.tsx`          | Root component, all route definitions            |
| `client/src/lib/data.ts`     | All product content and definitions              |
| `client/src/index.css`       | Global styles, CSS variables, custom utilities   |
| `shared/schema.ts`           | Database schema + Zod validation (source of truth)|
| `shared/routes.ts`           | Type-safe API route contract                     |
| `server/routes.ts`           | API endpoint implementations                     |
| `server/storage.ts`          | Storage abstraction (DB vs memory)               |
| `tailwind.config.ts`         | Theme colors, animations, typography             |
| `api/demo-requests.ts`       | Vercel serverless API handler                    |

## Common Tasks

### Adding a new page
1. Create component in `client/src/pages/NewPage.tsx`
2. Add route in `client/src/App.tsx` inside the `<Switch>`
3. Add nav link in `client/src/components/layout/Navbar.tsx`
4. Optionally add footer link in `client/src/components/layout/Footer.tsx`

### Adding a new product
Edit `client/src/lib/data.ts` — add a new entry to the products array with a unique slug. The `ProductDetail.tsx` page renders dynamically based on slug.

### Adding a new API endpoint
1. Define the route contract in `shared/routes.ts`
2. Add Zod schema in `shared/schema.ts` if new data is involved
3. Implement handler in `server/routes.ts`
4. Add Vercel serverless handler in `api/` directory for deployment
5. Create a React Query hook in `client/src/hooks/`

### Adding a new UI component
Run Shadcn/ui CLI or manually create in `client/src/components/ui/`. Follow existing patterns: use `cva` for variants, `cn()` for class merging, `React.forwardRef` for ref forwarding.

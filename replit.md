# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains a full bilingual church website for كنيسة الإيمان (Faith Church).

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React 19 + Vite + Tailwind CSS v4

## Artifacts

### faith-church (web, preview path: /)
A complete bilingual church website with:
- **Arabic (RTL) as default language, English as secondary**
- Language switcher in the navbar (persists to localStorage)
- 12 full pages: Home, About, First Visit, Next Steps, Sermons, Events, Kids, Students, Adults, Give, Contact, Resources
- Church history from 1905 founding by American missionaries
- Leadership section featuring Dr. Rev. Said Ibrahim Andraus
- Ministry pages: Kids (Joseph Ramsis), Students (Zarif Raouf), Men's (Fanous Fayz), Women's, Married Couples
- Jabel El Salah prayer mountain resource
- Full contact form and prayer request form
- Framer Motion animations (scroll fade-in, hover effects)
- Fonts: Cairo (Arabic), Inter (English)
- Colors: Blue primary (#1D4ED8), Orange accent (#F97316), Green secondary (#16A34A)

### api-server (api, preview path: /api)
Express 5 backend serving JSON APIs.

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/faith-church run dev` — run church website locally

## Key Files

- `artifacts/faith-church/src/contexts/LanguageContext.tsx` — RTL/LTR language system
- `artifacts/faith-church/src/components/layout/` — Header, Footer, Layout
- `artifacts/faith-church/src/pages/` — All 12 church pages
- `artifacts/faith-church/src/index.css` — Theme colors and Google Fonts

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

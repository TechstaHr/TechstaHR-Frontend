# TechstaHR Frontend

TechstaHR is a Next.js 15 frontend for the public marketing site and the authenticated product experience for admins and team members. This repository brings together the landing page, auth flows, HR/payroll dashboards, task management, and shared UI/state infrastructure in one App Router project.

## Stack

- Next.js 15 with the App Router
- React 18 and TypeScript
- Tailwind CSS for styling
- TanStack Query for server-state fetching and caching
- Zustand for lightweight client state
- Radix UI primitives and shared UI components
- `lucide-react`, `motion`, `recharts`, and `react-hook-form` across the interface

## Project layout

- `app/`: route entry points and layouts
- `app/page.tsx`: public landing page
- `app/(auth)/`: login, register, password reset, and signup flows
- `app/(admin)/`: admin-facing dashboard, people, payroll, billing, reporting, and settings pages
- `app/(team)/`: team-facing dashboard, tasks, notifications, payments, settings, and time tracking pages
- `components/`: reusable UI and feature components, grouped by domain such as `ui`, `cards`, `tables`, `screens`, and dashboard-specific folders
- `lib/actions/`: async feature modules for users, tasks, billing, people, productivity, timesheets, screenshots, and more
- `lib/utils.ts`: shared helpers for formatting, clipboard, chart setup, and validation
- `provider/`: root providers for theme, auth bootstrapping, and React Query
- `store/`: Zustand stores for user, project, and timer state
- `hooks/`: custom hooks such as fetch utilities, mobile detection, and tracking-session helpers
- `context/`: React context used by dashboard-level UI
- `constants/`: navigation and tab configuration for admin/team workspaces
- `config/site.ts`: site metadata and top-level project config
- `public/`: static icons, screenshots, logos, and page imagery
- `docs/`: internal notes and supplementary documentation

## Routing model

The project uses App Router route groups to keep the code organized while preserving clean URLs:

- Public marketing entry: `/`
- Auth routes: `/login`, `/register`, `/forgot-password`, `/reset-password`, `/new-password`, `/sign-up`
- Admin workspace: `/admin/...`
- Team workspace: `/team/...`

Root-level app setup lives in `app/layout.tsx`, which loads global styles and wraps the app with the shared provider stack from `provider/global.tsx`.

## State and data flow

- TanStack Query is initialized in `components/providers/tanstack-provider.tsx`
- Authentication bootstrapping happens in `provider/auth.tsx`, which fetches the current user profile and syncs it into the Zustand user store
- Shared client state is stored in `store/*.ts`
- Server-facing feature modules are organized in `lib/actions/*.actions.ts`

This keeps route files and feature components focused on UI while shared fetch, cache, and state concerns live in predictable places.

## Styling and assets

- Global Tailwind styles live in `app/globals.css`
- The codebase uses the `@/*` import alias defined in `tsconfig.json`
- Product and marketing assets live in `public/icons` and `public/images`

## Local development

Install dependencies with one package manager and stick with it for that environment. The repository currently includes `package-lock.json`, `yarn.lock`, and `bun.lock`.

```bash
npm install
npm run dev
```

Available scripts from `package.json`:

- `npm run dev`: start the Next.js development server
- `npm run build`: create a production build
- `npm run start`: run the production server
- `npm run lint`: run the project lint command

## Where to start when editing

- Landing page updates: `app/page.tsx`
- Global shell/providers: `app/layout.tsx` and `provider/global.tsx`
- Admin/team navigation: `constants/index.ts`
- Shared UI primitives: `components/ui/`
- Feature-specific product screens: `components/screens/`, `components/teamDashboard/`, and route files under `app/(admin)` or `app/(team)`

## Notes

- This README reflects the current frontend structure only
- Backend services, API contracts, and required environment variables should be confirmed from the action modules and deployment setup before changing integrations

# Kareem Portfolio — Angular 22

Angular 22 port of the static portfolio: standalone components, signals, zoneless change detection,
lazy-loaded routes, and **all content fetched from the REST API** (no hard-coded portfolio data).

## Run

```bash
npm install
npm start          # ng serve, proxies /api -> http://localhost:3000 (see proxy.conf.json)
npm run build
```

Requires Node >= 22.22.3 (Angular CLI 22 requirement).

## Dashboard (`/admin`)

A private content manager for everything on the site. Sign in at `/admin` (password = `ADMIN_PASSWORD` in `server/.env`).

| Section     | What you can do                                                                         |
|-------------|------------------------------------------------------------------------------------------|
| Overview    | Counts of projects / skills / experience / unread messages, recent messages, shortcuts   |
| Projects    | Search, create, edit, delete, feature / unfeature (full case-study form with list fields) |
| Skills      | Create, edit, delete skill groups (modal form)                                           |
| Experience  | Create, edit, delete timeline entries (modal form)                                       |
| Profile     | Name, role, email, LinkedIn, GitHub, resume, footer summary                              |
| Messages    | Contact-form inbox: read / unread, reply by email, delete                                |

Changes are saved through the API and show on the public site immediately.
Auth: `AuthService` keeps the token in `localStorage`, `authInterceptor` sends it as `Authorization: Bearer …`
and signs you out on a 401, `adminGuard` verifies it with `GET /api/auth/me` before opening `/admin`.
Code lives in `src/app/features/dashboard/` (25 components) and `src/dashboard.css`.

## API contract (matches `server/src/server.js`)

One typed service per controller in `src/app/core/api/`:

| Service         | Call                                                  | Used by                                   |
|-----------------|-------------------------------------------------------|-------------------------------------------|
| `ProfileApi`    | `GET /api/profile` (may be `null` → local defaults)   | footer, contact links (via `ProfileService`) |
| `ProjectsApi`   | `GET /api/projects?featured=true`                     | home → featured-projects-section          |
| `ProjectsApi`   | `GET /api/projects`                                   | projects page (filter chips = distinct `category`) |
| `ProjectsApi`   | `GET /api/projects/:id` (`404 { message }`)           | project-detail case study                 |
| `SkillsApi`     | `GET /api/skills`                                     | skills page                               |
| `ExperienceApi` | `GET /api/experience`                                 | experience page                           |
| `ContactApi`    | `POST /api/contact` `{ name, email, subject?, message }` → `201` / `400 { message }` | contact-form |
| `AuthApi`       | `POST /api/auth/login`, `GET /api/auth/me`                                            | dashboard login + guard |
| write methods   | `POST/PUT/DELETE` on projects, skills, experience; `PUT /api/profile`; `GET/PATCH/DELETE /api/contact` | dashboard (Bearer token) |

Pages load only their own data with `rxResource` and render loading / error / retry through
`<app-api-state>`. Read resource values with `valueOr()` – `resource.value()` throws in the error state.

Dev: `ng serve` proxies `/api` → `http://localhost:3000` (`proxy.conf.json`). For another host provide
`API_BASE_URL`. Projects have no GitHub/demo URLs or images in the API, so those UI bits are not shown;
cover art is a front-end asset `assets/images/<project id>.svg`.

## Structure

```
src/app
├─ core/        api (one service per controller), models, services, utils, directives, nav config
├─ layout/      site-header, brand, nav-links, theme-toggle, menu-toggle, site-footer
├─ shared/ui/   icon, page-section, section-head, page-hero, breadcrumb, feature-card, process-flow,
│               flow-step, timeline(+item), architecture-diagram, tag-list, bullet-list, notice,
│               api-state (loading / error / retry), toolkit-case-study-section
└─ features/    home (8), about (4), ai-engineering (4), software-engineering (3), enterprise-ai (3),
                projects (6), project-detail (6), machine-learning (2), data-analysis (2),
                skills (2), experience (3), contact (4), future (2), not-found (1)
```

`PortfolioStore` loads everything once at startup and exposes signals; components never call HTTP.

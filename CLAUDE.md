# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

PT Wijaya International's corporate marketing site plus a self-service admin CMS. Built on the Laravel React starter kit: Laravel 12 (PHP 8.4) + Inertia v2 + React 19 (TypeScript) + Tailwind v4, served locally by **Laravel Herd** at `https://wijaya-international.test`. Database is **SQLite** (`database/database.sqlite`).

`AGENTS.md` holds the Laravel Boost guidelines (framework conventions, Pest, Wayfinder, Pint, Inertia). Read it — those rules apply here. This file covers what's specific to *this* app.

## Commands

Frontend assets must be built for changes to appear — Herd serves PHP but not Vite.

- `composer run dev` — run server + queue + Vite together (the normal dev loop; the `php artisan serve` part is redundant under Herd but harmless).
- `npm run dev` — Vite dev server only (with HMR). `npm run build` — production bundle.
- `composer test` — clears config, runs Pint in test mode, then the full Pest suite.
- `php artisan test --compact --filter=NewsTest` — run a single test file/case.
- `vendor/bin/pint` — format PHP (run before finalizing; do **not** use `--test`). `npm run lint` — ESLint autofix. `npm run types` — `tsc --noEmit`. `npm run format` — Prettier.

Tests run against an in-memory SQLite DB (see `phpunit.xml`); they don't touch `database/database.sqlite`.

## Architecture

### Two route groups, one controller each domain
- `routes/web.php` → `PublicController`: the public marketing pages (home, profile, products, projects, services + 4 service sub-pages, news, contact, legal). All render Inertia pages under `resources/js/pages/`.
- `routes/admin.php` → `App\Http\Controllers\Admin\*`: the CMS, prefixed `/admin`, `name('admin.')`, guarded by `['auth','verified']`. Registered via the `then:` closure in `bootstrap/app.php` (not auto-loaded). Resource controllers for dealers, projects, news, news-categories, social-links, inquiries, plus a singleton contact-info editor. Most list controllers also expose a `reorder` POST endpoint backed by an `order` column.
- `routes/settings.php` → user profile / password / 2FA (Fortify).

Middleware is registered in `bootstrap/app.php` (Laravel 12 style — no HTTP Kernel). `HandleInertiaRequests::share()` globally injects `auth.user`, `contactInfo`, and `socialLinks` into every page, so the public layout's header/footer get contact data without each controller re-querying.

### CMS content model
CMS-managed entities (`Project`, `News`, `NewsCategory`, `Dealer`, `SocialLink`, `ContactInfo`, `ContactSubmission`) live in `app/Models`. Conventions to match when adding a model:
- Query scopes `active()` (`is_active = true`) and `ordered()` (by `order` column); news adds `published()`.
- Images: store the DB column as `image_path`, expose an `image_url` accessor. The accessor returns the path verbatim if it starts with `/` (static asset under `public/images/`), otherwise `Storage::url()` (uploaded file on the `public` disk — `public/storage` symlink must exist). Uploads go through `image-upload.tsx`; admin controllers `store('folder','public')` and delete the old file on replace.
- Admin controllers hand-map every model to an explicit array before `Inertia::render` (never pass raw models). Validation lives in Form Request classes under `app/Http/Requests/Admin/` (e.g. `StoreNewsRequest`), not inline — except the tiny public contact form, which validates inline in `PublicController::submitContact`.

### Bilingual content (ID / EN)
Two parallel systems — don't conflate them:
1. **Static UI strings** live in `resources/js/lib/translations.ts` as a flat `{ id: {...}, en: {...} }` dictionary keyed by dotted strings (`'nav.home'`). Components read them via `useLanguage().t('key')` from `resources/js/lib/language-context.tsx`. Language is client-side only, persisted to `localStorage` (defaults to `id`), wrapped around the whole app in `app.tsx`. Server code sometimes returns translation *keys* (e.g. `PublicController::getServices` sets `title => 'services.brand.label'`) that the page resolves through `t()`.
2. **CMS content** stores both languages as sibling DB columns (`title_id`/`title_en`, `body_id`/`body_en`, `name_id`/`name_en`). Controllers ship both; the React page picks by current `lang`.

### Frontend layout
- Pages resolve from `resources/js/pages/**/*.tsx` by Inertia page name (`admin/news/index` → that file). Path alias `@` → `resources/js`.
- `components/ui/` is shadcn-style primitives (Radix + CVA); `components.json` configures the generator. `components/home/`, `components/services/`, `components/public/`, `components/admin/`, `components/profile/` hold page-section components.
- Rich text is TipTap (`components/admin/rich-text-editor.tsx`) producing HTML rendered on public news pages. Maps use Leaflet (dealer locations on the home page). Carousels use Embla; animations use Framer Motion.
- **Wayfinder**: typed route/action helpers are generated into `resources/js/actions/`, `resources/js/routes/`, `resources/js/wayfinder/` (`formVariants` on). Import routes from `@/routes` / actions from `@/actions` rather than hardcoding URLs. React Compiler is enabled in the Vite Babel config.

### Testing
Feature tests under `tests/Feature/Admin/` mirror each admin resource; `tests/Feature/PublicPageTest.php` covers public pages. Pest, with `RefreshDatabase`. Add/adjust a test alongside any behavior change.

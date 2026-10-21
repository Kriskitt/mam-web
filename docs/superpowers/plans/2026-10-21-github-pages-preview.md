# GitHub Pages Preview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Publish the approved MAM frontend as a static GitHub Pages preview from `deploy/github-pages` only.

**Architecture:** Next.js exports pages with `/mam-web` as its base path and trailing slash routes. A shared path helper prefixes public assets; Next Link handles internal routes. GitHub Actions builds and deploys `out/`; preview-only form states make the static limitation explicit.

**Tech Stack:** Next.js 15, React 19, Playwright, GitHub Actions, GitHub Pages.

**Spec:** User-provided “MAM — GitHub Pages Client Preview Deployment” brief, 2026-10-21.

## Global Constraints

- Work and commit only on `deploy/github-pages`; leave `main` at `17b6544`.
- Preserve approved design, animations, navigation, imagery, and responsive behavior.
- No WordPress integration, runtime backend, deployment from `main`, history rewrite, or PR.
- Site must resolve under `/mam-web/`, including direct nested route visits.

## Review Focus

- Root-relative public assets must load on a project Pages site.
- Client navigation and direct nested visits must both load static pages.
- Dynamic room and event routes must export all local slugs.
- Browser-only forms must not imply museum receipt or a real registration.
- Mobile layouts must have no new document overflow.

---

### Task 1: Static export and paths

**Files:** `next.config.mjs`, `src/lib/sitePaths.mjs`, asset consumers in `src/`, `src/styles/typography-v2.css`, `src/components/v2/home/NewsletterSection.module.css`, `tests/sitePaths.test.mjs`.

**Interfaces:** `publicAsset(path)` prefixes a root-relative public path with the configured `basePath`, preserving fragments and external URLs.

- [ ] Write and run a failing Node test for `publicAsset('/assets/mam-logo.svg')`, fragment URLs, and already-prefixed paths.
- [ ] Add `output: 'export'`, `/mam-web` base path, `trailingSlash`, and unoptimized images in Next config; implement the shared helper.
- [ ] Apply the helper where public assets are rendered or preloaded; update the two CSS asset references.
- [ ] Run helper tests, lint, typecheck, and production build; inspect `out/` and exported route paths.

### Task 2: Static routes and honest preview forms

**Files:** `src/app/salas/page.jsx`, `src/app/salas/precolombino/page.jsx`, preview form components, `tests/pages-preview.spec.js`.

**Interfaces:** `/salas` reuses the exhibition overview; `/salas/precolombino` renders the existing viewer. Forms remain visible and show non-submitting preview feedback.

- [ ] Add failing browser checks for direct `/salas` and legacy Precolombino routes plus non-submitting forms.
- [ ] Implement the smallest route and form adjustments needed for static export.
- [ ] Build and run the browser checks under `/mam-web/`.

### Task 3: Actions and publication

**Files:** `.github/workflows/deploy-pages.yml`, local static preview server/test configuration as needed.

**Interfaces:** Push and manual dispatch on `deploy/github-pages` build `out/` and deploy through the official Pages actions.

- [ ] Add the branch-scoped workflow with Node LTS, `npm ci`, build, artifact upload, permissions, environment, and concurrency.
- [ ] Validate all required routes, assets, interactions, desktop/mobile layout, and console locally under `/mam-web/`.
- [ ] Commit and push only the deployment branch; set Pages source to Actions if available.
- [ ] Verify the Actions run, live URL, direct nested routes, and that `main` has not moved.

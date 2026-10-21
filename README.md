# MAM public website

Independent Next.js 15 App Router frontend for the Museo de Arte Moderno de Trujillo. This preproduction repository contains approved public pages and local editorial data; WordPress Headless integration is a later phase.

## Run

Use Node.js 20 or newer. Run `npm ci`, `npm run build`, `npm run lint`, `npm run typecheck`, and `npm run test:e2e` from this directory. The E2E suite uses Chromium and tests the generated `out/` site under `/mam-web/`. For a manual local preview after building, run `node scripts/serve-pages-preview.mjs` and open `http://127.0.0.1:3101/mam-web/`.

This `deploy/github-pages` branch builds a temporary client preview for `https://kriskitt.github.io/mam-web/`. Pushes to this branch run `.github/workflows/deploy-pages.yml`; the `main` branch retains the production-oriented Next.js configuration.

## Content and integrations

- Room and exhibition content: `src/data/v2/roomsV2Data.js`.
- Cronograma and editorial entries: `src/data/cronogramaData.js`.
- Home slides: `src/components/v2/home/HeroSlider.jsx`.
- Precolombino's 22 temporary positions: `src/components/v2/precolombino/PrecolombinoViewer.jsx`.
- Educación content: `src/app/educacion/page.jsx`.
- Contact information, hours, and external map URLs remain in the corresponding public components.

The newsletter, education, and Amigos MAM forms show a non-submitting preview notice. They do **not** save data, send a message, or create a real subscription. The ticket dialog is a non-paying, non-booking preview. Replace these behaviors when the production service is ready.

All public routes use local data during this phase. There is no `/admin`, API Route Handler, database, or WordPress connection. Static export is enabled only on this preview branch; no Site5 or WordPress production settings are changed.

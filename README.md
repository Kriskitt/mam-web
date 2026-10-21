# MAM public website

Independent Next.js 15 App Router frontend for the Museo de Arte Moderno de Trujillo. This preproduction repository contains approved public pages and local editorial data; WordPress Headless integration is a later phase.

## Run

Use Node.js 20 or newer. Run `npm install`, `npm run dev`, `npm run build`, `npm run lint`, `npm run typecheck`, and `npm run test:e2e` from this directory. The E2E suite uses Chromium.

## Content and integrations

- Room and exhibition content: `src/data/v2/roomsV2Data.js`.
- Cronograma and editorial entries: `src/data/cronogramaData.js`.
- Home slides: `src/components/v2/home/HeroSlider.jsx`.
- Precolombino's 22 temporary positions: `src/components/v2/precolombino/PrecolombinoViewer.jsx`.
- Educación content: `src/app/educacion/page.jsx`.
- Contact information, hours, and external map URLs remain in the corresponding public components.

The newsletter, education, and Amigos MAM forms save previews only in the current browser's local storage. They do **not** send a message or create a real subscription. The ticket dialog is a non-paying, non-booking preview. Replace these behaviors when the production service is ready.

All public routes use local data during this phase. There is no `/admin`, API Route Handler, database, or WordPress connection. Hosting mode remains undecided; do not assume the existing Site5 plan runs a persistent Node.js process. Static export has not been enabled or validated.

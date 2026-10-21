import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '*.spec.js',
  use: {
    baseURL: 'http://127.0.0.1:3101/mam-web/',
    browserName: 'chromium',
  },
  webServer: {
    command: 'node scripts/serve-pages-preview.mjs',
    url: 'http://127.0.0.1:3101/mam-web/',
    reuseExistingServer: false,
  },
});

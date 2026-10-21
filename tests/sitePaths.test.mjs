import assert from 'node:assert/strict';
import test from 'node:test';
import { publicAsset } from '../src/lib/sitePaths.mjs';

test('public assets resolve below the GitHub Pages project path', () => {
  assert.equal(publicAsset('/assets/mam-logo.svg'), '/mam-web/assets/mam-logo.svg');
  assert.equal(publicAsset('/fonts/mam/Anko-Regular.ttf'), '/mam-web/fonts/mam/Anko-Regular.ttf');
  assert.equal(publicAsset('/assets/home/newsletter.svg#Layer_1'), '/mam-web/assets/home/newsletter.svg#Layer_1');
});

test('already prefixed and external URLs are preserved', () => {
  assert.equal(publicAsset('/mam-web/assets/mam-logo.svg'), '/mam-web/assets/mam-logo.svg');
  assert.equal(publicAsset('https://www.google.com/maps'), 'https://www.google.com/maps');
});

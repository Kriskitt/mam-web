import { expect, test } from '@playwright/test';

test('direct Salas and legacy Precolombino URLs show the approved views', async ({ page }) => {
  const salas = await page.goto('salas/');
  expect(salas?.status()).toBe(200);
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('link', { name: /SALA MONUMENTAL/i }).first()).toBeVisible();

  const precolombino = await page.goto('salas/precolombino/');
  expect(precolombino?.status()).toBe(200);
  await expect(page.getByRole('region', { name: /Pabellón de Colección Precolombina/ })).toBeVisible();
});

test('preview forms do not save registrations or imply delivery to the museum', async ({ page }) => {
  await page.goto('');
  await page.getByLabel('Correo electrónico').fill('preview@example.test');
  await page.getByRole('button', { name: 'Suscribirse' }).click();
  await expect(page.getByRole('status')).toContainText('no se ha enviado');
  expect(await page.evaluate(() => localStorage.getItem('mam-newsletter-preview'))).toBeNull();

  await page.getByRole('button', { name: 'Abrir inscripción al programa Amigos del MAM' }).click();
  const modal = page.getByRole('dialog', { name: 'Amigos MAM' });
  await modal.getByPlaceholder('Nombres y Apellidos').fill('Persona de prueba');
  await modal.getByPlaceholder('Correo electrónico').fill('amigos@example.test');
  await modal.getByRole('button', { name: 'Enviar' }).click();
  await expect(modal).toContainText('no se ha enviado');
  expect(await page.evaluate(() => localStorage.getItem('mam-amigos-preview'))).toBeNull();

  await page.goto('educacion/');
  await page.getByLabel('Correo electrónico').fill('educacion@example.test');
  await page.getByLabel('Institución educativa').fill('Escuela de prueba');
  await page.getByRole('button', { name: 'Enviar' }).click();
  await expect(page.getByRole('status')).toContainText('no se ha enviado');
  expect(await page.evaluate(() => localStorage.getItem('mam-educacion-preview'))).toBeNull();
});

test('public fonts, SVGs and photographs load beneath the project path', async ({ page, request }) => {
  for (const asset of [
    'fonts/mam/Anko-Regular.ttf',
    'fonts/mam/MonumentGrotesk-Regular.ttf',
    'assets/home/newsletter.svg',
    'assets/v2/newsletter_watermark.svg',
    'assets/angel_slide_img.png',
  ]) {
    const response = await request.get(`/mam-web/${asset}`);
    expect(response.status(), asset).toBe(200);
  }

  await page.goto('');
  const fontLoaded = await page.evaluate(async () => {
    const faces = await document.fonts.load('16px Anko');
    return faces.some((face) => face.status === 'loaded');
  });
  expect(fontLoaded).toBe(true);
  await expect(page.locator('[data-slide-index="0"]')).toHaveAttribute('src', '/mam-web/assets/angel_slide_img.png');
});

test('client navigation reaches a nested room without local console errors', async ({ page }) => {
  const localErrors = [];
  page.on('pageerror', (error) => localErrors.push(error.message));
  page.on('response', (response) => {
    if (response.url().startsWith('http://127.0.0.1:3101/') && response.status() >= 400) {
      localErrors.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.goto('');
  await page.locator('[data-slide-nav="2"]').click();
  await expect(page.locator('[data-slide-nav="2"]')).toHaveAttribute('aria-current', 'true');
  await page.locator('[data-card-index="0"]').click();
  await expect(page).toHaveURL(/\/mam-web\/salas\/monumental\/$/);
  await expect(page.getByRole('heading', { name: 'SALA MONUMENTAL' })).toBeVisible();
  expect(localErrors).toEqual([]);
});

test('room carousel responds to mouse dragging', async ({ page }) => {
  await page.goto('salas/coleccion/');
  const gallery = page.locator('[data-active-index]');
  await gallery.scrollIntoViewIfNeeded();
  await expect(gallery).toHaveAttribute('data-active-index', '0');
  const bounds = await gallery.boundingBox();
  expect(bounds).not.toBeNull();

  const y = bounds.y + bounds.height / 2;
  await page.mouse.move(bounds.x + bounds.width * 0.8, y);
  await page.mouse.down();
  await page.mouse.move(bounds.x + bounds.width * 0.1, y, { steps: 8 });
  await page.mouse.up();
  await expect(gallery).not.toHaveAttribute('data-active-index', '0');
});

test('Precolombino gallery responds to a touch swipe', async ({ page }) => {
  await page.goto('precolombino/');
  const selected = page.getByRole('tab', { name: /Pieza arqueológica 2 de 22/ });
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 1 });
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{ x: 300, y: 300 }],
  });
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchMove',
    touchPoints: [{ x: 120, y: 300 }],
  });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await expect(selected).toHaveAttribute('aria-selected', 'true');
});

test('Precolombino retains its custom cursor and immediate image switching', async ({ page }) => {
  await page.goto('precolombino/');
  await page.locator('#precolombino-artwork').hover({ position: { x: 200, y: 200 } });
  await expect(page.locator('span[class*="directionCursor"]')).toBeVisible();

  await page.getByRole('tab', { name: /Pieza arqueológica 2 de 22/ }).click();
  const activeImage = await page.locator('[data-gallery-index="1"]').evaluate((image) => ({
    opacity: getComputedStyle(image).opacity,
    transitionDuration: getComputedStyle(image).transitionDuration,
    naturalWidth: image.naturalWidth,
  }));
  expect(activeImage.opacity).toBe('1');
  expect(activeImage.transitionDuration).toBe('0s');
  expect(activeImage.naturalWidth).toBeGreaterThan(0);
});

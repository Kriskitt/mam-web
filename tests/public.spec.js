import { expect, test } from '@playwright/test';
import { basePath } from '../src/lib/sitePaths.mjs';

const routes = [
  '/', '/exhibiciones', '/salas', '/salas/monumental', '/salas/coleccion',
  '/salas/angel-chavez', '/salas/temporal', '/salas/proyectos', '/salas/centro',
  '/precolombino', '/salas/precolombino', '/educacion', '/nosotros', '/visitanos',
  '/cronograma', '/cronograma/manifesto-para-la-ciudad',
  '/cronograma/visitas-guiadas-mediaciones',
  '/cronograma/inauguracion-dioses-bravos',
  '/cronograma/conferencia-iconografia-moche',
  '/cronograma/dialogo-sala-angel-chavez',
];

for (const width of [390, 1024, 1440, 1920, 2560]) {
  test(`public routes render without errors or document overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
    const pageErrors = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));

    for (const route of routes) {
      const response = await page.goto(`${basePath}${route}`, { waitUntil: 'domcontentloaded' });
      expect(response?.status(), route).toBe(200);
      await expect(page.locator(route.endsWith('precolombino') ? '[role="region"]' : 'main').first(), route).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), route).toBe(true);
      expect(await page.evaluate(() => [...document.images].filter((image) => image.complete && !image.naturalWidth).map((image) => image.src)), route).toEqual([]);
    }

    expect(pageErrors).toEqual([]);
  });
}

test('legacy Salas Precolombino URL shows the public gallery', async ({ page }) => {
  await page.goto(`${basePath}/salas/precolombino/`);
  await expect(page.getByRole('region', { name: /Pabellón de Colección Precolombina/ })).toBeVisible();
});

for (const route of ['/salas/coleccion', '/nosotros']) {
  test(`carousel loops twice in both directions on ${route}`, async ({ page }) => {
    await page.goto(`${basePath}${route}`);
    const gallery = page.locator('[data-active-index]');
    await expect(gallery.locator('[data-gallery-source="true"]')).toHaveCount(6);
    await expect(gallery).toHaveAttribute('data-active-index', '0');
    await page.waitForTimeout(200);

    for (let step = 1; step <= 12; step++) {
      await page.getByRole('button', { name: 'Imagen siguiente' }).click();
      await expect(gallery).toHaveAttribute('data-active-index', String(step % 6));
    }
    for (let step = 1; step <= 12; step++) {
      await page.getByRole('button', { name: 'Imagen anterior' }).click();
      await expect(gallery).toHaveAttribute('data-active-index', String((6 - step % 6) % 6));
    }

    await gallery.focus();
    await page.keyboard.press('ArrowLeft');
    await expect(gallery).toHaveAttribute('data-active-index', '5');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  });
}

test('Precolombino keeps 22 positions synchronized across controls', async ({ page }) => {
  await page.goto(`${basePath}/precolombino`);
  const thumbnails = page.getByRole('tab', { name: /Pieza arqueológica/ });
  await expect(thumbnails).toHaveCount(22);
  await expect(thumbnails.nth(0)).toHaveAttribute('aria-selected', 'true');

  await thumbnails.nth(21).click();
  await expect(thumbnails.nth(21)).toHaveAttribute('aria-selected', 'true');
  await page.locator('[data-wheel-surface="gallery"]').first().hover({ position: { x: 200, y: 200 } });
  await page.mouse.wheel(0, 100);
  await expect(thumbnails.nth(0)).toHaveAttribute('aria-selected', 'true');
  await page.waitForTimeout(500);
  await page.mouse.wheel(100, 0);
  await expect(thumbnails.nth(1)).toHaveAttribute('aria-selected', 'true');

  await page.getByRole('region', { name: /Pabellón de Colección Precolombina/ }).focus();
  await page.keyboard.press('ArrowLeft');
  await expect(thumbnails.nth(0)).toHaveAttribute('aria-selected', 'true');

  await page.locator('#precolombino-artwork').click({ position: { x: 1100, y: 300 } });
  await expect(thumbnails.nth(1)).toHaveAttribute('aria-selected', 'true');
  await page.waitForTimeout(500);
  const scrollY = await page.evaluate(() => window.scrollY);
  await page.locator('[data-thumbnail-navigator]').hover();
  await page.mouse.wheel(0, 100);
  await expect(thumbnails.nth(2)).toHaveAttribute('aria-selected', 'true');
  expect(await page.evaluate(() => window.scrollY)).toBe(scrollY);
});

test('newsletter does not submit data in the static preview', async ({ page }) => {
  await page.goto(`${basePath}/`);
  await page.getByLabel('Correo electrónico').fill('preview@example.test');
  await page.getByRole('button', { name: 'Suscribirse' }).click();
  await expect(page.getByRole('status')).toContainText('no se ha enviado');
  expect(await page.evaluate(() => localStorage.getItem('mam-newsletter-preview'))).toBeNull();
});

test('Home hero, Amigos modal, and both map embeds remain interactive', async ({ page }) => {
  await page.goto(`${basePath}/`);
  await page.locator('[data-slide-nav="2"]').click();
  await expect(page.locator('[data-slide-nav="2"]')).toHaveAttribute('aria-current', 'true');
  await expect(page.getByTitle('Mapa de Museo de Arte Moderno de Trujillo, Perú')).toHaveAttribute('src', /google\.com\/maps/);

  await page.getByRole('button', { name: 'Abrir inscripción al programa Amigos del MAM' }).click();
  const modal = page.getByRole('dialog', { name: 'Amigos MAM' });
  await expect(modal).toBeVisible();
  await modal.getByPlaceholder('Nombres y Apellidos').fill('Persona de prueba');
  await modal.getByPlaceholder('Correo electrónico').fill('amigos@example.test');
  await modal.getByRole('button', { name: 'Enviar' }).click();
  await expect(modal).toContainText('no se ha enviado');

  await page.goto(`${basePath}/visitanos`);
  await expect(page.getByTitle('Mapa de Museo de Arte Moderno de Trujillo, Perú')).toHaveAttribute('src', /google\.com\/maps/);
});

test('Education form and ticket dialog disclose preproduction limitations', async ({ page }) => {
  await page.goto(`${basePath}/educacion`);
  await page.getByLabel('Correo electrónico').fill('educacion@example.test');
  await page.getByLabel('Institución educativa').fill('Escuela de prueba');
  await page.getByRole('button', { name: 'Enviar' }).click();
  await expect(page.getByRole('status')).toContainText('no se ha enviado');

  await page.goto(`${basePath}/cronograma/manifesto-para-la-ciudad`);
  await page.getByRole('button', { name: 'RESERVAR CUPO' }).click();
  await expect(page.getByText('Reserva de Entradas')).toBeVisible();
  await page.getByRole('button', { name: 'VER RESUMEN' }).click();
  await expect(page.getByText('Esta simulación no reserva ni cobra entradas.')).toBeVisible();
});

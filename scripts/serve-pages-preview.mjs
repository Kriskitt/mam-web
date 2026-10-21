import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { basePath } from '../src/lib/sitePaths.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../out');
const port = Number(process.env.PREVIEW_PORT || 3101);
const contentTypes = {
  '.css': 'text/css',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

createServer(async (request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  if (pathname !== basePath && !pathname.startsWith(`${basePath}/`)) {
    response.writeHead(404).end('Not found');
    return;
  }

  let relativePath;
  try {
    relativePath = decodeURIComponent(pathname.slice(basePath.length));
  } catch {
    response.writeHead(400).end('Bad path');
    return;
  }

  if (relativePath === '') {
    response.writeHead(301, { Location: `${basePath}/` }).end();
    return;
  }
  if (!relativePath.endsWith('/') && !path.extname(relativePath)) {
    response.writeHead(301, { Location: `${pathname}/` }).end();
    return;
  }

  const filePath = path.resolve(root, `.${relativePath}${relativePath.endsWith('/') ? 'index.html' : ''}`);
  if (!filePath.startsWith(`${root}${path.sep}`)) {
    response.writeHead(403).end('Forbidden');
    return;
  }

  try {
    const data = await readFile(filePath);
    response.writeHead(200, { 'Content-Type': contentTypes[path.extname(filePath)] || 'application/octet-stream' });
    response.end(data);
  } catch {
    response.writeHead(404).end('Not found');
  }
}).listen(port, '127.0.0.1', () => {
  process.stdout.write(`Pages preview listening on http://127.0.0.1:${port}${basePath}/\n`);
});

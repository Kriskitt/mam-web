export const basePath = '/mam-web';

// Next Link handles page routes. Public files need their project path explicitly.
export function publicAsset(path) {
  if (!path?.startsWith('/') || path === basePath || path.startsWith(`${basePath}/`)) {
    return path;
  }

  return `${basePath}${path}`;
}

export const normalizePath = (path: string) => {
  if (!path) return '/';
  const trimmed = path.trim();
  if (!trimmed) return '/';
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
};

export const normalizeOrigin = (origin: string) => {
  const trimmed = origin.trim();
  if (!trimmed) {
    return '';
  }

  try {
    const url = new URL(trimmed);
    return url.origin;
  } catch {
    return trimmed.replace(/\/$/, '');
  }
};

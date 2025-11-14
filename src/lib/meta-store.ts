import type { MetaPayload } from '@/types/meta';

const metadataStore = new Map<string, Map<string, MetaPayload>>();

export async function listStoredMetadata(): Promise<
  Array<{ origin: string; path: string; metadata: MetaPayload }>
> {
  const result: Array<{ origin: string; path: string; metadata: MetaPayload }> =
    [];

  for (const [origin, perOrigin] of metadataStore.entries()) {
    for (const [pathKey, metadata] of perOrigin.entries()) {
      result.push({ origin, path: pathKey, metadata });
    }
  }

  return result.sort((a, b) => {
    const originCompare = a.origin.localeCompare(b.origin);
    if (originCompare !== 0) {
      return originCompare;
    }

    return a.path.localeCompare(b.path);
  });
}

export async function getStoredMetadata(origin: string, pathKey: string) {
  return metadataStore.get(origin)?.get(pathKey);
}

export async function saveStoredMetadata(
  origin: string,
  pathKey: string,
  metadata: MetaPayload,
) {
  const perOrigin = metadataStore.get(origin) ?? new Map<string, MetaPayload>();
  perOrigin.set(pathKey, metadata);
  metadataStore.set(origin, perOrigin);
  return metadata;
}

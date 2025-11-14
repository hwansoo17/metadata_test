import { promises as fs } from 'fs';
import path from 'path';

import type { MetaPayload } from '@/types/meta';

type MetaStoreData = Record<string, Record<string, MetaPayload>>;

const STORE_DIR = path.join(process.cwd(), 'data');
const STORE_PATH = path.join(STORE_DIR, 'meta-store.json');

let cache: MetaStoreData | null = null;
let initPromise: Promise<MetaStoreData> | null = null;

async function ensureStore(): Promise<MetaStoreData> {
  if (cache) {
    return cache;
  }

  if (!initPromise) {
    initPromise = (async () => {
      try {
        const raw = await fs.readFile(STORE_PATH, 'utf-8');
        const parsed = JSON.parse(raw) as MetaStoreData;
        cache = parsed;
        return parsed;
      } catch (error) {
        if (
          error instanceof Error &&
          'code' in error &&
          (error as NodeJS.ErrnoException).code === 'ENOENT'
        ) {
          await fs.mkdir(STORE_DIR, { recursive: true });
          await fs.writeFile(STORE_PATH, JSON.stringify({}, null, 2), 'utf-8');
          cache = {};
          return {};
        }

        initPromise = null;
        throw error;
      }
    })();
  }

  const store = await initPromise;
  initPromise = null;
  return store;
}

async function persistStore(store: MetaStoreData): Promise<void> {
  await fs.mkdir(STORE_DIR, { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), 'utf-8');
  cache = store;
}

export async function listStoredMetadata(): Promise<
  Array<{ origin: string; path: string; metadata: MetaPayload }>
> {
  const store = await ensureStore();
  const result: Array<{ origin: string; path: string; metadata: MetaPayload }> =
    [];

  for (const [origin, perOrigin] of Object.entries(store)) {
    for (const [pathKey, metadata] of Object.entries(perOrigin)) {
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
  const store = await ensureStore();
  return store[origin]?.[pathKey];
}

export async function saveStoredMetadata(
  origin: string,
  pathKey: string,
  metadata: MetaPayload,
) {
  const store = await ensureStore();
  if (!store[origin]) {
    store[origin] = {};
  }

  store[origin]![pathKey] = metadata;
  await persistStore(store);
  return metadata;
}

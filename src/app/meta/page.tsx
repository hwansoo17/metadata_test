'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';

import { normalizeOrigin, normalizePath } from '@/lib/meta-utils';
import type { MetaPayload } from '@/types/meta';

const DEFAULT_METADATA: MetaPayload = {
  title: 'About | B-Cube',
  description: '아주대 IT 동아리 B-Cube 소개',
  canonical: 'https://b-cube.store/about',
  ogTitle: 'B-Cube — About',
  ogDescription: '아주대 IT 동아리 B-Cube를 소개합니다.',
  ogImage: 'https://b-cube.store/og/about.png',
  ogType: 'website',
  robots: 'index,follow',
  hreflangs: [
    { hreflang: 'ko', href: 'https://b-cube.store/about' },
    { hreflang: 'en', href: 'https://b-cube.store/en/about' },
  ],
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'B-Cube',
    url: 'https://b-cube.store',
    logo: 'https://b-cube.store/logo.png',
  },
};

type Status =
  | { type: 'success'; message: string }
  | { type: 'error'; message: string }
  | null;

type StoredEntry = {
  origin: string;
  path: string;
  metadata: MetaPayload;
};

const buildEntryKey = (origin: string, path: string) => `${origin}::${path}`;

export default function MetaConfiguratorPage() {
  const [origin, setOrigin] = useState('');
  const [path, setPath] = useState('');
  const [metadataJson, setMetadataJson] = useState(
    JSON.stringify(DEFAULT_METADATA, null, 2),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const [fetchedMetadata, setFetchedMetadata] = useState<MetaPayload | null>(
    null,
  );
  const [entries, setEntries] = useState<StoredEntry[]>([]);
  const [entriesLoading, setEntriesLoading] = useState(false);
  const [selectedEntryKey, setSelectedEntryKey] = useState('');

  const loadEntries = useCallback(
    async (options: { notifyOnError?: boolean } = {}) => {
      const { notifyOnError = false } = options;
      setEntriesLoading(true);
      try {
        const response = await fetch('/api/meta');
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.error ?? '저장 목록을 불러오지 못했습니다.');
        }

        const nextEntries = Array.isArray(payload.entries)
          ? (payload.entries as StoredEntry[])
          : [];

        setEntries(nextEntries);
        setSelectedEntryKey((prev) => {
          if (!prev) return prev;
          const exists = nextEntries.some(
            (entry) => buildEntryKey(entry.origin, entry.path) === prev,
          );
          return exists ? prev : '';
        });
        return true;
      } catch (error) {
        if (notifyOnError) {
          const message =
            error instanceof Error
              ? error.message
              : '저장 목록을 불러오지 못했습니다.';
          setStatus({ type: 'error', message });
        }
        return false;
      } finally {
        setEntriesLoading(false);
      }
    },
    [setStatus],
  );

  useEffect(() => {
    void loadEntries();
  }, [loadEntries]);

  const handleSelectEntry = (value: string) => {
    setSelectedEntryKey(value);

    if (!value) {
      return;
    }

    const entry = entries.find(
      (item) => buildEntryKey(item.origin, item.path) === value,
    );

    if (!entry) {
      setStatus({
        type: 'error',
        message: '선택한 항목을 찾을 수 없습니다.',
      });
      return;
    }

    setOrigin(entry.origin);
    setPath(entry.path);
    setMetadataJson(JSON.stringify(entry.metadata, null, 2));
    setFetchedMetadata(entry.metadata);
    setStatus({
      type: 'success',
      message: `${entry.origin}${entry.path} 메타데이터를 불러왔습니다.`,
    });
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!origin.trim() || !path.trim()) {
      setStatus({ type: 'error', message: 'Origin과 Path를 모두 입력해 주세요.' });
      return;
    }

    let parsedMetadata: MetaPayload;

    try {
      parsedMetadata = JSON.parse(metadataJson);
    } catch {
      setStatus({
        type: 'error',
        message: '메타데이터 JSON을 파싱할 수 없습니다.',
      });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    const normalizedOrigin = normalizeOrigin(origin);
    const normalizedPath = normalizePath(path);

    try {
      const response = await fetch('/api/meta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          origin: normalizedOrigin,
          path: normalizedPath,
          metadata: parsedMetadata,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error ?? '메타데이터 저장에 실패했습니다.');
      }

      setStatus({
        type: 'success',
        message: `${payload.origin ?? normalizedOrigin}${payload.path ?? normalizedPath} 메타데이터가 저장되었습니다.`,
      });
      setFetchedMetadata(payload.metadata ?? parsedMetadata);
      setOrigin(normalizedOrigin);
      setPath(normalizedPath);
      setSelectedEntryKey(buildEntryKey(normalizedOrigin, normalizedPath));
      void loadEntries();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
      setStatus({ type: 'error', message });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleFetch() {
    if (!origin.trim() || !path.trim()) {
      setStatus({ type: 'error', message: 'Origin과 Path를 모두 입력해 주세요.' });
      return;
    }

    setStatus(null);
    setFetchedMetadata(null);

    const normalizedOrigin = normalizeOrigin(origin);
    const normalizedPath = normalizePath(path);

    try {
      const query = new URLSearchParams({
        origin: normalizedOrigin,
        path: normalizedPath,
      });
      const response = await fetch(`/api/meta?${query.toString()}`);
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error ?? '메타데이터를 불러오지 못했습니다.');
      }

      setFetchedMetadata(payload);
      setMetadataJson(JSON.stringify(payload, null, 2));
      setOrigin(normalizedOrigin);
      setPath(normalizedPath);
      setSelectedEntryKey((prev) => {
        const key = buildEntryKey(normalizedOrigin, normalizedPath);
        return entries.some(
          (entry) => buildEntryKey(entry.origin, entry.path) === key,
        )
          ? key
          : prev;
      });
      setStatus({
        type: 'success',
        message: '저장된 메타데이터를 불러왔습니다.',
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
      setStatus({ type: 'error', message });
    }
  }

  return (
    <main
      style={{
        maxWidth: 768,
        margin: '0 auto',
        padding: '2rem 1rem 4rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}
    >
      <header>
        <h1>페이지별 메타데이터 설정</h1>
        <p style={{ color: '#555' }}>
          Origin + Path 조합으로 /api/meta 엔드포인트에 메타데이터를 저장하거나
          불러올 수 있습니다. JSON 구조를 그대로 body로 보냅니다.
        </p>
      </header>

      <section
        style={{
          border: '1px solid #eee',
          borderRadius: 8,
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
          }}
        >
          <label
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
              flex: 1,
              minWidth: 240,
            }}
          >
            <span>저장된 메타데이터 선택</span>
            <select
              value={selectedEntryKey}
              onChange={(event) => handleSelectEntry(event.target.value)}
              style={{ padding: '0.5rem', fontSize: '1rem' }}
            >
              <option value="">선택하세요</option>
              {entries.map((entry) => {
                const key = buildEntryKey(entry.origin, entry.path);
                return (
                  <option key={key} value={key}>
                    {entry.origin}
                    {entry.path}
                  </option>
                );
              })}
            </select>
          </label>

          <button
            type="button"
            onClick={() => loadEntries({ notifyOnError: true })}
            style={{ padding: '0.5rem 1rem', fontWeight: 600 }}
          >
            {entriesLoading ? '새로고침 중...' : '목록 새로고침'}
          </button>
        </div>

        <p style={{ margin: 0, color: '#555' }}>
          {entriesLoading
            ? '목록을 불러오는 중입니다...'
            : entries.length > 0
              ? `총 ${entries.length}개의 경로가 저장되어 있습니다.`
              : '아직 저장된 메타데이터가 없습니다.'}
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <span>Origin</span>
          <input
            type="url"
            placeholder="https://b-cube.store"
            value={origin}
            onChange={(event) => setOrigin(event.target.value)}
            required
            style={{ padding: '0.5rem', fontSize: '1rem' }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <span>Path</span>
          <input
            type="text"
            placeholder="/about"
            value={path}
            onChange={(event) => setPath(event.target.value)}
            required
            style={{ padding: '0.5rem', fontSize: '1rem' }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <span>Metadata JSON</span>
          <textarea
            value={metadataJson}
            onChange={(event) => setMetadataJson(event.target.value)}
            rows={18}
            style={{ fontFamily: 'monospace', padding: '0.75rem', fontSize: '0.95rem' }}
          />
        </label>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '0.75rem 1.25rem',
              fontWeight: 600,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
            }}
          >
            {isSubmitting ? '저장 중...' : '저장하기'}
          </button>

          <button
            type="button"
            onClick={handleFetch}
            style={{
              padding: '0.75rem 1.25rem',
              fontWeight: 600,
            }}
          >
            불러오기
          </button>
        </div>
      </form>

      {status && (
        <p
          style={{
            color: status.type === 'error' ? 'crimson' : 'seagreen',
            fontWeight: 600,
          }}
        >
          {status.message}
        </p>
      )}

      {fetchedMetadata && (
        <section
          style={{
            border: '1px solid #ddd',
            borderRadius: 8,
            padding: '1rem',
          }}
        >
          <h2 style={{ marginTop: 0 }}>미리보기</h2>
          <pre
            style={{
              fontFamily: 'monospace',
              background: '#fafafa',
              padding: '1rem',
              overflowX: 'auto',
            }}
          >
            {JSON.stringify(fetchedMetadata, null, 2)}
          </pre>
        </section>
      )}
    </main>
  );
}

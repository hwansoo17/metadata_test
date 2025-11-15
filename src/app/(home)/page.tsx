'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

import { SHOWCASE_ROUTES } from '@/lib/showcase-routes';

const FEATURED_SHOWCASE_ROUTES = SHOWCASE_ROUTES.slice(0, 6);

export default function HomePage() {
  const [apiKey, setApiKey] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedKey = apiKey.trim();

    if (!trimmedKey) {
      setError('Ghost Admin API 키를 입력해 주세요.');
      setToken('');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setToken('');

    try {
      const response = await fetch('/api/ghost/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key: trimmedKey }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error ?? '토큰 생성에 실패했습니다.');
      }

      setToken(data.token);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : '알 수 없는 오류입니다.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main
      style={{
        maxWidth: 520,
        margin: '0 auto',
        padding: '2rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}
    >
      <section>
        <h1>Ghost Admin 토큰 생성</h1>
        <p>Ghost Admin API 키 하나만 넣으면 5분짜리 JWT 토큰을 만들어 드립니다.</p>
      </section>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <span>Admin API Key</span>
          <input
            type="password"
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
            placeholder="예: 8f15a940bbd4a5b8c011e6c6:..."
            required
            style={{ padding: '0.5rem', fontSize: '1rem' }}
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: '0.75rem 1rem',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
          }}
        >
          {isSubmitting ? '생성 중...' : '토큰 생성'}
        </button>
      </form>

      {error && (
        <p style={{ color: 'crimson' }}>
          {error}
        </p>
      )}

      {token && (
        <section
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <h2>생성된 토큰</h2>
          <textarea
            readOnly
            value={token}
            rows={4}
            style={{ padding: '0.5rem', fontFamily: 'monospace' }}
          />
        </section>
      )}

      <section
        style={{
          borderTop: '1px solid #eee',
          paddingTop: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        <h2 style={{ margin: 0 }}>쇼케이스 빠른 이동</h2>
        <p style={{ margin: 0, color: '#555' }}>
          아래 버튼을 눌러 각 산업별 쇼케이스 페이지로 이동할 수 있습니다.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '0.75rem',
          }}
        >
          {FEATURED_SHOWCASE_ROUTES.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              style={{
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0.75rem 1rem',
                border: '1px solid #ddd',
                borderRadius: 6,
                textDecoration: 'none',
                fontWeight: 600,
                color: '#111',
                background: '#fafafa',
              }}
            >
              {route.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

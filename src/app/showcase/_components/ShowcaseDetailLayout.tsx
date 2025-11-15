import Link from 'next/link';

import { ShowcaseNavigator } from './ShowcaseNavigator';

interface ShowcaseDetailLayoutProps {
  categoryLabel: string;
  title: string;
  description: string;
  highlights: string[];
  currentHref: string;
  highlightTitle?: string;
}

export function ShowcaseDetailLayout({
  categoryLabel,
  title,
  description,
  highlights,
  currentHref,
  highlightTitle = '주요 하이라이트',
}: ShowcaseDetailLayoutProps) {
  return (
    <main
      style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '3rem 1.5rem 4rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.75rem',
      }}
    >
      <header style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div>
          <p style={{ margin: 0, color: '#888', fontWeight: 600 }}>{categoryLabel}</p>
          <h1 style={{ margin: '0.25rem 0 0' }}>{title}</h1>
        </div>
        <p style={{ margin: 0, color: '#555', lineHeight: 1.5 }}>{description}</p>
        <div>
          <Link
            href="/showcase"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 0.9rem',
              borderRadius: 999,
              background: '#f0f0f0',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            ← 쇼케이스 홈으로
          </Link>
        </div>
      </header>

      <section
        style={{
          border: '1px solid #eee',
          borderRadius: 12,
          padding: '1.5rem',
          background: '#fff',
        }}
      >
        <h2 style={{ marginTop: 0 }}>{highlightTitle}</h2>
        <ul style={{ margin: '0.75rem 0 0 1.25rem', color: '#444', lineHeight: 1.6 }}>
          {highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <ShowcaseNavigator currentHref={currentHref} />
    </main>
  );
}


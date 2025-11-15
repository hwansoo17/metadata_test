import Link from 'next/link';

import { SHOWCASE_CATEGORIES } from '@/lib/showcase-routes';

const CATEGORY = SHOWCASE_CATEGORIES.find((category) => category.slug === 'patterns');

if (!CATEGORY) {
  throw new Error('Patterns showcase 데이터가 필요합니다.');
}

export default function PatternsShowcaseCategoryPage() {
  return (
    <main
      style={{
        maxWidth: 960,
        margin: '0 auto',
        padding: '3rem 1.5rem 4rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.75rem',
      }}
    >
      <header style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <p style={{ margin: 0, color: '#888', fontWeight: 600 }}>Showcase · Patterns</p>
        <h1 style={{ margin: 0 }}>{CATEGORY.label}</h1>
        <p style={{ margin: 0, color: '#555', lineHeight: 1.5 }}>{CATEGORY.description}</p>
      </header>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {CATEGORY.children.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            style={{
              border: '1px solid #e5e5e5',
              borderRadius: 12,
              padding: '1.25rem',
              textDecoration: 'none',
              color: '#111',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              background: '#fff',
            }}
          >
            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{child.label}</span>
            <p style={{ margin: 0, color: '#555', lineHeight: 1.4 }}>{child.summary}</p>
            <span style={{ marginTop: 'auto', fontWeight: 600, color: '#0070f3' }}>
              패턴 확인 →
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}


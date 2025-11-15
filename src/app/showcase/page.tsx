import Link from 'next/link';

import { SHOWCASE_CATEGORIES } from '@/lib/showcase-routes';

export default function ShowcaseIndexPage() {
  return (
    <main
      style={{
        maxWidth: 960,
        margin: '0 auto',
        padding: '3rem 1.5rem 4rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <header style={{ textAlign: 'center' }}>
        <p
          style={{
            textTransform: 'uppercase',
            letterSpacing: '0.075em',
            fontSize: '0.85rem',
            color: '#888',
            fontWeight: 600,
            marginBottom: '0.5rem',
          }}
        >
          Showcase
        </p>
        <h1 style={{ marginBottom: '0.75rem', fontSize: '2.25rem' }}>
          산업별 고객 사례 허브
        </h1>
        <p style={{ color: '#555', maxWidth: 640, margin: '0 auto' }}>
          여러 산업군의 실제 구축 사례를 한 곳에서 탐색하고, 니즈에 맞는 레퍼런스를 빠르게 찾을 수 있도록 정리했습니다.
        </p>
      </header>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {SHOWCASE_CATEGORIES.map((category) => (
          <article
            key={category.slug}
            style={{
              border: '1px solid #e5e5e5',
              borderRadius: 16,
              padding: '1.75rem',
              background: '#fff',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.9rem',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#777', fontWeight: 600 }}>
                {category.summary}
              </span>
              <h2 style={{ margin: 0, fontSize: '1.45rem' }}>{category.label}</h2>
              <p style={{ margin: 0, color: '#555', lineHeight: 1.45 }}>{category.description}</p>
            </div>
            <ul
              style={{
                margin: 0,
                paddingLeft: '1.2rem',
                color: '#444',
                lineHeight: 1.5,
                flexGrow: 1,
              }}
            >
              {category.children.slice(0, 3).map((child) => (
                <li key={child.href} style={{ marginBottom: '0.35rem' }}>
                  {child.label} — {child.summary}
                </li>
              ))}
              {category.children.length > 3 ? (
                <li style={{ color: '#777' }}>
                  + {category.children.length - 3}개 더 준비되어 있습니다.
                </li>
              ) : null}
            </ul>
            <Link
              href={category.href}
              style={{
                marginTop: 'auto',
                fontWeight: 600,
                color: '#0070f3',
                textDecoration: 'none',
                alignSelf: 'flex-start',
              }}
            >
              컬렉션 살펴보기 →
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}

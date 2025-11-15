import Link from 'next/link';

import { SHOWCASE_ROUTES } from '@/lib/showcase-routes';

interface ShowcaseNavigatorProps {
  currentHref?: string;
}

export function ShowcaseNavigator({ currentHref }: ShowcaseNavigatorProps) {
  const activeRoute = SHOWCASE_ROUTES.find((route) => route.href === currentHref);
  const routes = SHOWCASE_ROUTES.filter((route) => route.href !== currentHref)
    .sort((a, b) => {
      if (!activeRoute) return 0;
      const aSameCategory = a.category === activeRoute.category;
      const bSameCategory = b.category === activeRoute.category;
      if (aSameCategory === bSameCategory) return 0;
      return aSameCategory ? -1 : 1;
    })
    .slice(0, 6);

  if (routes.length === 0) {
    return null;
  }

  return (
    <section
      style={{
        borderTop: '1px solid #eaeaea',
        paddingTop: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      <h2 style={{ margin: 0 }}>다른 산업도 살펴보세요</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '0.75rem',
        }}
      >
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            style={{
              border: '1px solid #ddd',
              borderRadius: 8,
              padding: '0.75rem 1rem',
              textDecoration: 'none',
              color: '#111',
              background: '#fafafa',
              fontWeight: 600,
            }}
          >
            {route.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

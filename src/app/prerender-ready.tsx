// app/prerender-ready.tsx (client component)
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function PrerenderReady() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const globalWindow =
      window as typeof window & { prerenderReady?: boolean };

    globalWindow.prerenderReady = false;

    // Delay toggling to allow the first paint to complete.
    const readyHandle = window.requestAnimationFrame(() => {
      globalWindow.prerenderReady = true;
    });

    return () => {
      window.cancelAnimationFrame(readyHandle);
      globalWindow.prerenderReady = false;
    };
  }, [pathname]);

  return null;
}

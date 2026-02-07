import { useState, useEffect } from 'react';

/**
 * Hook to detect if a CSS media query matches.
 * Updates reactively when the match state changes (e.g., window resize).
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    setMatches(mql.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

/**
 * Convenience hook: true when viewport is mobile-sized (< 768px).
 */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 767px)');
}

/**
 * Convenience hook: true when viewport is tablet-sized (768px - 1023px).
 */
export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
}

/**
 * Convenience hook: true when viewport is desktop-sized (>= 1024px).
 */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}

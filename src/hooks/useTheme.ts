import { useEffect, useCallback } from 'react';
import { useThemeStore, type ThemeMode } from '../store/themeStore';

/**
 * Hook to manage theme (light/dark/system).
 * Applies `data-theme` attribute to <html> and listens for system changes.
 */
export function useTheme() {
  const mode = useThemeStore((s) => s.mode);
  const setMode = useThemeStore((s) => s.setMode);
  const resolvedTheme = useThemeStore((s) => s.resolvedTheme);

  const applyTheme = useCallback(() => {
    const resolved = mode === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : mode;
    document.documentElement.setAttribute('data-theme', resolved);
  }, [mode]);

  // Apply theme on mount and mode change
  useEffect(() => {
    applyTheme();
  }, [applyTheme]);

  // Listen for system preference changes when in 'system' mode
  useEffect(() => {
    if (mode !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyTheme();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [mode, applyTheme]);

  const toggleTheme = useCallback(() => {
    const current = resolvedTheme();
    setMode(current === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setMode]);

  const cycleTheme = useCallback(() => {
    const order: ThemeMode[] = ['light', 'dark', 'system'];
    const idx = order.indexOf(mode);
    setMode(order[(idx + 1) % order.length]);
  }, [mode, setMode]);

  return {
    mode,
    setMode,
    resolvedTheme: resolvedTheme(),
    toggleTheme,
    cycleTheme,
  };
}

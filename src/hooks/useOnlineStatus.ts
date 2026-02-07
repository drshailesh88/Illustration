import { useState, useEffect, useCallback } from 'react';

/**
 * Hook that tracks the browser's online/offline status.
 * Uses navigator.onLine + online/offline events for real-time detection.
 */
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);
  const [wasOffline, setWasOffline] = useState(false);

  const handleOnline = useCallback(() => {
    setIsOnline(true);
    // Flag that we just came back online (for sync triggers)
    setWasOffline(true);
    // Clear the flag after a short delay so consumers can react
    setTimeout(() => setWasOffline(false), 5000);
  }, []);

  const handleOffline = useCallback(() => {
    setIsOnline(false);
  }, []);

  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [handleOnline, handleOffline]);

  return { isOnline, wasOffline };
}

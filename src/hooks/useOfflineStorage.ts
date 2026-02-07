import { useCallback, useEffect, useRef } from 'react';
import { useOnlineStatus } from './useOnlineStatus';

const OFFLINE_CACHE_PREFIX = 'finnish-offline:';
const SYNC_QUEUE_KEY = 'finnish-sync-queue';

export interface OfflineCacheEntry {
  projectId: string;
  title: string;
  diagramData: string;
  timestamp: number;
  isDirty: boolean;
}

interface SyncQueueItem {
  projectId: string;
  title: string;
  diagramData: string;
  timestamp: number;
}

/**
 * Hook for offline diagram storage with sync queue.
 *
 * - Saves diagrams to localStorage when cloud is unavailable
 * - Maintains a sync queue of pending changes
 * - Replays queued saves when connectivity returns
 */
export function useOfflineStorage(
  syncToCloud?: (projectId: string, title: string, diagramData: string) => Promise<void>,
) {
  const { isOnline, wasOffline } = useOnlineStatus();
  const isSyncingRef = useRef(false);

  /**
   * Save a diagram to the offline cache.
   */
  const saveOffline = useCallback((entry: Omit<OfflineCacheEntry, 'isDirty'>) => {
    try {
      const cacheEntry: OfflineCacheEntry = { ...entry, isDirty: true };
      localStorage.setItem(
        `${OFFLINE_CACHE_PREFIX}${entry.projectId}`,
        JSON.stringify(cacheEntry),
      );
      // Add to sync queue
      addToSyncQueue({
        projectId: entry.projectId,
        title: entry.title,
        diagramData: entry.diagramData,
        timestamp: entry.timestamp,
      });
      return true;
    } catch (err) {
      console.error('Failed to save offline:', err);
      return false;
    }
  }, []);

  /**
   * Load a diagram from the offline cache.
   */
  const loadOffline = useCallback((projectId: string): OfflineCacheEntry | null => {
    try {
      const raw = localStorage.getItem(`${OFFLINE_CACHE_PREFIX}${projectId}`);
      if (!raw) return null;
      return JSON.parse(raw) as OfflineCacheEntry;
    } catch {
      return null;
    }
  }, []);

  /**
   * Mark an offline entry as synced (no longer dirty).
   */
  const markSynced = useCallback((projectId: string) => {
    try {
      const raw = localStorage.getItem(`${OFFLINE_CACHE_PREFIX}${projectId}`);
      if (raw) {
        const entry = JSON.parse(raw) as OfflineCacheEntry;
        entry.isDirty = false;
        localStorage.setItem(
          `${OFFLINE_CACHE_PREFIX}${projectId}`,
          JSON.stringify(entry),
        );
      }
    } catch {
      // Ignore
    }
  }, []);

  /**
   * Remove an entry from the offline cache.
   */
  const clearOffline = useCallback((projectId: string) => {
    localStorage.removeItem(`${OFFLINE_CACHE_PREFIX}${projectId}`);
  }, []);

  // ========================================================================
  // Sync Queue Management
  // ========================================================================

  const getSyncQueue = useCallback((): SyncQueueItem[] => {
    try {
      const raw = localStorage.getItem(SYNC_QUEUE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }, []);

  const addToSyncQueue = (item: SyncQueueItem) => {
    try {
      const queue = JSON.parse(localStorage.getItem(SYNC_QUEUE_KEY) || '[]') as SyncQueueItem[];
      // Replace existing entry for same project (only keep latest)
      const filtered = queue.filter((q) => q.projectId !== item.projectId);
      filtered.push(item);
      localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(filtered));
    } catch {
      // Ignore
    }
  };

  const removeFromSyncQueue = useCallback((projectId: string) => {
    try {
      const queue = JSON.parse(localStorage.getItem(SYNC_QUEUE_KEY) || '[]') as SyncQueueItem[];
      const filtered = queue.filter((q) => q.projectId !== projectId);
      localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(filtered));
    } catch {
      // Ignore
    }
  }, []);

  /**
   * Get count of pending sync items.
   */
  const getPendingCount = useCallback((): number => {
    return getSyncQueue().length;
  }, [getSyncQueue]);

  // ========================================================================
  // Auto-sync when coming back online
  // ========================================================================

  useEffect(() => {
    if (!wasOffline || !isOnline || !syncToCloud || isSyncingRef.current) return;

    const replayQueue = async () => {
      isSyncingRef.current = true;
      const queue = getSyncQueue();

      for (const item of queue) {
        try {
          await syncToCloud(item.projectId, item.title, item.diagramData);
          removeFromSyncQueue(item.projectId);
          markSynced(item.projectId);
        } catch (err) {
          console.error(`Failed to sync project ${item.projectId}:`, err);
          // Stop trying — will retry on next online transition
          break;
        }
      }
      isSyncingRef.current = false;
    };

    replayQueue();
  }, [wasOffline, isOnline, syncToCloud, getSyncQueue, removeFromSyncQueue, markSynced]);

  return {
    isOnline,
    saveOffline,
    loadOffline,
    clearOffline,
    markSynced,
    getPendingCount,
    isSyncing: isSyncingRef.current,
  };
}

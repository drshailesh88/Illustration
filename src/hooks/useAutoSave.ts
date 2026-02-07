import { useEffect, useRef, useState, useCallback } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { SaveStatus } from './useProject';
import { useOnlineStatus } from './useOnlineStatus';

const AUTO_SAVE_DELAY_MS = 30000; // 30 seconds

/**
 * Auto-save hook with 30-second debounce and offline fallback.
 * Only active when projectId is non-null (project already saved once).
 * Falls back to localStorage when cloud save fails or device is offline.
 */
export function useAutoSave(
  projectId: string | null,
  getCanvasState: () => string | null,
  generateThumbnail: () => Blob | null,
) {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasChangesRef = useRef(false);
  const { isOnline } = useOnlineStatus();

  const updateProjectMutation = useMutation(api.projects.updateProject);
  const generateUploadUrlMutation = useMutation(api.storage.generateUploadUrl);

  /**
   * Save diagram data to localStorage as offline fallback.
   */
  const saveToOfflineCache = useCallback((diagramData: string) => {
    if (!projectId) return false;
    try {
      const entry = {
        projectId,
        title: 'Untitled',
        diagramData,
        timestamp: Date.now(),
        isDirty: true,
      };
      localStorage.setItem(`finnish-offline:${projectId}`, JSON.stringify(entry));

      // Add to sync queue
      const queue = JSON.parse(localStorage.getItem('finnish-sync-queue') || '[]');
      const filtered = queue.filter((q: { projectId: string }) => q.projectId !== projectId);
      filtered.push({ projectId, title: entry.title, diagramData, timestamp: entry.timestamp });
      localStorage.setItem('finnish-sync-queue', JSON.stringify(filtered));
      return true;
    } catch {
      return false;
    }
  }, [projectId]);

  const doAutoSave = useCallback(async () => {
    if (!projectId || !hasChangesRef.current) return;

    const diagramData = getCanvasState();
    if (!diagramData) return;

    setSaveStatus('saving');
    hasChangesRef.current = false;

    // If offline, go directly to local cache
    if (!isOnline) {
      const saved = saveToOfflineCache(diagramData);
      if (saved) {
        setSaveStatus('offline-saved');
        setLastSavedAt(Date.now());
      } else {
        setSaveStatus('error');
      }
      return;
    }

    try {
      // Upload thumbnail
      let thumbnailId: string | undefined;
      const thumbnailBlob = generateThumbnail();
      if (thumbnailBlob) {
        try {
          const uploadUrl = await generateUploadUrlMutation();
          const result = await fetch(uploadUrl, {
            method: 'POST',
            headers: { 'Content-Type': thumbnailBlob.type },
            body: thumbnailBlob,
          });
          const json = await result.json();
          thumbnailId = json.storageId;
        } catch {
          // Thumbnail upload failed — save without it
        }
      }

      await updateProjectMutation({
        projectId,
        diagramData,
        ...(thumbnailId ? { thumbnailId } : {}),
      });

      setSaveStatus('saved');
      setLastSavedAt(Date.now());
    } catch (err) {
      console.error('Auto-save failed, falling back to offline cache:', err);
      // Fallback: save to offline cache
      const saved = saveToOfflineCache(diagramData);
      if (saved) {
        setSaveStatus('offline-saved');
        setLastSavedAt(Date.now());
      } else {
        setSaveStatus('error');
      }
    }
  }, [projectId, getCanvasState, generateThumbnail, updateProjectMutation, generateUploadUrlMutation, isOnline, saveToOfflineCache]);

  /**
   * Call this whenever the canvas changes to trigger auto-save timer.
   */
  const markChanged = useCallback(() => {
    if (!projectId) return;
    hasChangesRef.current = true;

    // Reset the debounce timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      doAutoSave();
    }, AUTO_SAVE_DELAY_MS);
  }, [projectId, doAutoSave]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return {
    saveStatus,
    lastSavedAt,
    markChanged,
  };
}

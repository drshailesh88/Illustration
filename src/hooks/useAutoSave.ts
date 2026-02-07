import { useEffect, useRef, useState, useCallback } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { SaveStatus } from './useProject';

const AUTO_SAVE_DELAY_MS = 30000; // 30 seconds

/**
 * Auto-save hook with 30-second debounce.
 * Only active when projectId is non-null (project already saved once).
 * Does not interrupt editing — runs async in the background.
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

  const updateProjectMutation = useMutation(api.projects.updateProject);
  const generateUploadUrlMutation = useMutation(api.storage.generateUploadUrl);

  const doAutoSave = useCallback(async () => {
    if (!projectId || !hasChangesRef.current) return;

    const diagramData = getCanvasState();
    if (!diagramData) return;

    setSaveStatus('saving');
    hasChangesRef.current = false;

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
      console.error('Auto-save failed:', err);
      setSaveStatus('error');
    }
  }, [projectId, getCanvasState, generateThumbnail, updateProjectMutation, generateUploadUrlMutation]);

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

import { useState, useCallback } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useOnlineStatus } from './useOnlineStatus';

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error' | 'offline-saved';

/**
 * Hook for loading and managing a single project.
 * Wraps Convex queries and mutations with save status tracking.
 * Falls back to localStorage when offline.
 */
export function useProject(projectId?: string) {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const { isOnline } = useOnlineStatus();

  // Query project if ID provided
  const project = useQuery(
    api.projects.getProject,
    projectId ? { projectId } : 'skip'
  );

  const saveProjectMutation = useMutation(api.projects.saveProject);
  const updateProjectMutation = useMutation(api.projects.updateProject);
  const deleteProjectMutation = useMutation(api.projects.deleteProject);
  const generateUploadUrlMutation = useMutation(api.storage.generateUploadUrl);

  /**
   * Upload a thumbnail blob to Convex file storage.
   * Returns the storage ID.
   */
  const uploadThumbnail = useCallback(async (blob: Blob): Promise<string | undefined> => {
    try {
      const uploadUrl = await generateUploadUrlMutation();
      const result = await fetch(uploadUrl, {
        method: 'POST',
        headers: { 'Content-Type': blob.type },
        body: blob,
      });
      const { storageId } = await result.json();
      return storageId;
    } catch (err) {
      console.error('Failed to upload thumbnail:', err);
      return undefined;
    }
  }, [generateUploadUrlMutation]);

  /**
   * Save diagram data to localStorage as offline fallback.
   */
  const saveOffline = useCallback((title: string, diagramData: string): string | null => {
    try {
      const offlineId = projectId || `offline-${Date.now()}`;
      const entry = {
        projectId: offlineId,
        title,
        diagramData,
        timestamp: Date.now(),
        isDirty: true,
      };
      localStorage.setItem(`finnish-offline:${offlineId}`, JSON.stringify(entry));

      // Add to sync queue
      const queue = JSON.parse(localStorage.getItem('finnish-sync-queue') || '[]');
      const filtered = queue.filter((q: { projectId: string }) => q.projectId !== offlineId);
      filtered.push({ projectId: offlineId, title, diagramData, timestamp: entry.timestamp });
      localStorage.setItem('finnish-sync-queue', JSON.stringify(filtered));

      return offlineId;
    } catch (err) {
      console.error('Failed to save offline:', err);
      return null;
    }
  }, [projectId]);

  /**
   * Save a new project or update an existing one.
   * Falls back to localStorage when offline.
   */
  const save = useCallback(async (
    title: string,
    diagramData: string,
    thumbnailBlob?: Blob,
  ): Promise<string | null> => {
    setSaveStatus('saving');

    // If offline, save locally
    if (!isOnline) {
      const offlineId = saveOffline(title, diagramData);
      if (offlineId) {
        setSaveStatus('offline-saved');
        return offlineId;
      }
      setSaveStatus('error');
      return null;
    }

    try {
      let thumbnailId: string | undefined;
      if (thumbnailBlob) {
        thumbnailId = await uploadThumbnail(thumbnailBlob);
      }

      if (projectId) {
        // Update existing project
        await updateProjectMutation({
          projectId,
          title,
          diagramData,
          ...(thumbnailId ? { thumbnailId } : {}),
        });
        setSaveStatus('saved');
        return projectId;
      } else {
        // Create new project
        const newId = await saveProjectMutation({
          title,
          diagramData,
          ...(thumbnailId ? { thumbnailId } : {}),
        });
        setSaveStatus('saved');
        return newId;
      }
    } catch (err) {
      console.error('Cloud save failed, falling back to offline:', err);
      // Fallback: save locally
      const offlineId = saveOffline(title, diagramData);
      if (offlineId) {
        setSaveStatus('offline-saved');
        return offlineId;
      }
      setSaveStatus('error');
      throw err;
    }
  }, [projectId, isOnline, uploadThumbnail, saveProjectMutation, updateProjectMutation, saveOffline]);

  /**
   * Delete the current project.
   */
  const remove = useCallback(async () => {
    if (!projectId) return;
    await deleteProjectMutation({ projectId });
  }, [projectId, deleteProjectMutation]);

  return {
    project: project ?? null,
    isLoading: projectId ? project === undefined : false,
    isOnline,
    save,
    remove,
    saveStatus,
    setSaveStatus,
  };
}

import { useState, useCallback } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

/**
 * Hook for loading and managing a single project.
 * Wraps Convex queries and mutations with save status tracking.
 */
export function useProject(projectId?: string) {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

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
   * Save a new project or update an existing one.
   */
  const save = useCallback(async (
    title: string,
    diagramData: string,
    thumbnailBlob?: Blob,
  ): Promise<string | null> => {
    setSaveStatus('saving');
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
      setSaveStatus('error');
      console.error('Failed to save project:', err);
      throw err;
    }
  }, [projectId, uploadThumbnail, saveProjectMutation, updateProjectMutation]);

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
    save,
    remove,
    saveStatus,
    setSaveStatus,
  };
}

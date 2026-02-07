import { useState, useCallback } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

export interface VersionSummary {
  _id: string;
  versionNumber: number;
  title: string;
  source: string;
  createdAt: number;
}

/**
 * Hook for browsing and restoring project version history.
 */
export function useVersionHistory(projectId: string | undefined) {
  const [isRestoring, setIsRestoring] = useState(false);

  // Query versions list (lightweight — no diagramData)
  const versions = useQuery(
    api.versions.getVersions,
    projectId ? { projectId } : 'skip'
  ) as VersionSummary[] | undefined;

  const restoreVersionMutation = useMutation(api.versions.restoreVersion);

  /**
   * Restore a version — replaces the current project data with the selected version.
   * Returns the new version number on success.
   */
  const restoreVersion = useCallback(async (versionId: string): Promise<number | null> => {
    setIsRestoring(true);
    try {
      const result = await restoreVersionMutation({ versionId });
      return result?.newVersion ?? null;
    } catch (err) {
      console.error('Failed to restore version:', err);
      throw err;
    } finally {
      setIsRestoring(false);
    }
  }, [restoreVersionMutation]);

  return {
    versions: versions ?? [],
    isLoading: projectId ? versions === undefined : false,
    isRestoring,
    restoreVersion,
  };
}

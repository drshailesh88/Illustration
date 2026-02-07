import { useState, useCallback } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

const IS_TEST_MODE = import.meta.env.VITE_E2E_TEST_MODE === 'true';

export interface VersionSummary {
  _id: string;
  versionNumber: number;
  title: string;
  source: string;
  createdAt: number;
}

/**
 * Hook for browsing and restoring project version history.
 * In E2E test mode, returns empty state without Convex.
 */
export function useVersionHistory(projectId: string | undefined) {
  if (IS_TEST_MODE) {
    return useVersionHistoryTestMode();
  }
  return useVersionHistoryProduction(projectId);
}

// eslint-disable-next-line react-hooks/rules-of-hooks
function useVersionHistoryTestMode() {
  const [isRestoring] = useState(false);
  const restoreVersion = useCallback(async (_versionId: string): Promise<number | null> => {
    return 1;
  }, []);

  return {
    versions: [] as VersionSummary[],
    isLoading: false,
    isRestoring,
    restoreVersion,
  };
}

// eslint-disable-next-line react-hooks/rules-of-hooks
function useVersionHistoryProduction(projectId: string | undefined) {
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

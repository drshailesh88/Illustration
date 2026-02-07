import { useState, useCallback } from 'react';
import { usePaginatedQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

const IS_TEST_MODE = import.meta.env.VITE_E2E_TEST_MODE === 'true';

/**
 * Hook for loading paginated list of user's projects.
 * Uses Convex's reactive pagination.
 * In E2E test mode, returns empty project list without Convex.
 */
export function useProjects() {
  if (IS_TEST_MODE) {
    return useProjectsTestMode();
  }
  return useProjectsProduction();
}

// eslint-disable-next-line react-hooks/rules-of-hooks
function useProjectsTestMode() {
  const [projects] = useState<any[]>([]);
  const loadMore = useCallback(() => {}, []);
  return {
    projects,
    status: 'Exhausted' as const,
    loadMore,
    isLoading: false,
  };
}

// eslint-disable-next-line react-hooks/rules-of-hooks
function useProjectsProduction() {
  const { results, status, loadMore, isLoading } = usePaginatedQuery(
    api.projects.getProjects,
    {},
    { initialNumItems: 20 }
  );

  return {
    projects: results ?? [],
    status,
    loadMore: () => loadMore(10),
    isLoading,
  };
}

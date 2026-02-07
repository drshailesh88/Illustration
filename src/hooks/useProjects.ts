import { usePaginatedQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

/**
 * Hook for loading paginated list of user's projects.
 * Uses Convex's reactive pagination.
 */
export function useProjects() {
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

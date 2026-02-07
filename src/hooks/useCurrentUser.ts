import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useAuth } from '@clerk/clerk-react';

/**
 * Hook to ensure the current authenticated user has a record in Convex.
 * Calls getOrCreateUser mutation on mount, then queries for current state.
 * Returns the user record and loading state.
 */
export function useCurrentUser() {
  const { isSignedIn } = useAuth();
  const [hasCreated, setHasCreated] = useState(false);
  const getOrCreateUser = useMutation(api.users.getOrCreateUser);
  const user = useQuery(api.users.getUser);

  useEffect(() => {
    if (isSignedIn && !hasCreated) {
      getOrCreateUser()
        .then(() => setHasCreated(true))
        .catch((err) => console.error('Failed to create/get user record:', err));
    }
  }, [isSignedIn, hasCreated, getOrCreateUser]);

  return {
    user: user ?? null,
    isLoading: isSignedIn && user === undefined,
  };
}

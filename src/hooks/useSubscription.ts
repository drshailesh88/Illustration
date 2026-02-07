import { useUser } from '@clerk/clerk-react';
import type { SubscriptionTier, SubscriptionInfo } from '../types';

const IS_TEST_MODE = import.meta.env.VITE_E2E_TEST_MODE === 'true';

/**
 * Hook to get the current user's subscription tier and access permissions.
 * Wraps Clerk's useUser() and reads publicMetadata.subscriptionTier.
 * In E2E test mode, returns Pro-level access without Clerk.
 */
export function useSubscription(): SubscriptionInfo {
  // E2E test mode: always return Pro
  if (IS_TEST_MODE) {
    return {
      tier: 'pro',
      isLoaded: true,
      isPro: true,
      isFree: false,
      isTeam: false,
      canAccessAgentMode: true,
      canExportFullRes: true,
      canAccessFullIcons: true,
    };
  }

  return useSubscriptionInner();
}

function useSubscriptionInner(): SubscriptionInfo {
  const { user, isLoaded } = useUser();

  const tier: SubscriptionTier =
    (user?.publicMetadata?.subscriptionTier as SubscriptionTier) ?? 'free';

  const isPro = tier === 'pro' || tier === 'team';
  const isFree = tier === 'free';
  const isTeam = tier === 'team';

  return {
    tier,
    isLoaded,
    isPro,
    isFree,
    isTeam,
    canAccessAgentMode: isPro,
    canExportFullRes: isPro,
    canAccessFullIcons: isPro,
  };
}

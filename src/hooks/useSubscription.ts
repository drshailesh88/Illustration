import { useUser } from '@clerk/clerk-react';
import type { SubscriptionTier, SubscriptionInfo } from '../types';

/**
 * Hook to get the current user's subscription tier and access permissions.
 * Wraps Clerk's useUser() and reads publicMetadata.subscriptionTier.
 */
export function useSubscription(): SubscriptionInfo {
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

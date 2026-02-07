import type { ReactNode } from 'react';
import { useSubscription } from '../../hooks/useSubscription';
import { UpgradeCTA } from './UpgradeCTA';

interface ProGateProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Gates content behind a Pro (or Team) subscription.
 * Shows an upgrade CTA to free-tier users.
 */
export function ProGate({ children, fallback }: ProGateProps) {
  const { isLoaded, isPro } = useSubscription();

  if (!isLoaded) {
    return null;
  }

  if (isPro) {
    return <>{children}</>;
  }

  return <>{fallback ?? <UpgradeCTA feature="This feature" />}</>;
}

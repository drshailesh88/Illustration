import type { ReactNode } from 'react';
import { useSubscription } from '../../hooks/useSubscription';
import { UpgradeCTA } from './UpgradeCTA';

const IS_TEST_MODE = import.meta.env.VITE_E2E_TEST_MODE === 'true';

interface ProGateProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Gates content behind a Pro (or Team) subscription.
 * Shows an upgrade CTA to free-tier users.
 * In E2E test mode, always grants Pro access.
 */
export function ProGate({ children, fallback }: ProGateProps) {
  // E2E test mode: always grant access
  if (IS_TEST_MODE) {
    return <>{children}</>;
  }

  return <ProGateInner fallback={fallback}>{children}</ProGateInner>;
}

function ProGateInner({ children, fallback }: ProGateProps) {
  const { isLoaded, isPro } = useSubscription();

  if (!isLoaded) {
    return null;
  }

  if (isPro) {
    return <>{children}</>;
  }

  return <>{fallback ?? <UpgradeCTA feature="This feature" />}</>;
}

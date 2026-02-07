/**
 * Test-mode providers that bypass Clerk and Convex for E2E testing.
 * Only used when VITE_E2E_TEST_MODE=true.
 */

import React, { createContext, useContext } from 'react';

// ============================================================================
// Mock Auth Context (replaces Clerk)
// ============================================================================

interface MockAuthContext {
  isLoaded: boolean;
  isSignedIn: boolean;
  userId: string;
  user: {
    id: string;
    primaryEmailAddress: { emailAddress: string };
    publicMetadata: { subscriptionTier: string };
    fullName: string;
    firstName: string;
  };
}

const AuthContext = createContext<MockAuthContext>({
  isLoaded: true,
  isSignedIn: true,
  userId: 'test-user-123',
  user: {
    id: 'test-user-123',
    primaryEmailAddress: { emailAddress: 'test@finnish.dev' },
    publicMetadata: { subscriptionTier: 'pro' },
    fullName: 'Test User',
    firstName: 'Test',
  },
});

export function useTestAuth() {
  return useContext(AuthContext);
}

// ============================================================================
// Mock Convex Provider (replaces ConvexProviderWithClerk)
// ============================================================================

const ConvexContext = createContext<null>(null);

export function MockConvexProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConvexContext.Provider value={null}>
      {children}
    </ConvexContext.Provider>
  );
}

// ============================================================================
// Test Provider Wrapper
// ============================================================================

export function TestProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext.Provider value={{
      isLoaded: true,
      isSignedIn: true,
      userId: 'test-user-123',
      user: {
        id: 'test-user-123',
        primaryEmailAddress: { emailAddress: 'test@finnish.dev' },
        publicMetadata: { subscriptionTier: 'pro' },
        fullName: 'Test User',
        firstName: 'Test',
      },
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const IS_TEST_MODE = import.meta.env.VITE_E2E_TEST_MODE === 'true';

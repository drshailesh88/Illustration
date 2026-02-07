import { useAuth } from '@clerk/clerk-react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useMigration } from '../../hooks/useMigration';
import { MigrationPrompt } from '../MigrationPrompt/MigrationPrompt';

const IS_TEST_MODE = import.meta.env.VITE_E2E_TEST_MODE === 'true';

/**
 * Layout component that protects nested routes behind authentication.
 * Redirects unauthenticated users to /sign-in with a return URL.
 * In E2E test mode, bypasses auth entirely.
 */
export function ProtectedLayout() {
  // E2E test mode: bypass all auth checks, render children directly
  if (IS_TEST_MODE) {
    return <Outlet />;
  }

  return <AuthenticatedLayout />;
}

/**
 * Inner component that uses Clerk hooks (only rendered in production mode).
 */
function AuthenticatedLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();

  // Ensure user record exists in Convex on every authenticated page load
  useCurrentUser();

  // Check for localStorage diagrams to migrate
  const migration = useMigration();

  if (!isLoaded) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-secondary)',
        fontSize: '16px',
      }}>
        Loading...
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return (
    <>
      <Outlet />
      {migration.showPrompt && (
        <MigrationPrompt
          diagramCount={migration.diagramCount}
          isMigrating={migration.isMigrating}
          migratedCount={migration.migratedCount}
          onMigrate={migration.migrate}
          onDismiss={migration.dismiss}
        />
      )}
    </>
  );
}

/**
 * FINNISH App Router
 * Main application component with React Router setup
 *
 * @module App
 */

import { useCallback } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { ToastProvider, useToast } from './components/Toast';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ProtectedLayout } from './components/Auth/ProtectedLayout';
import { ProGate } from './components/Auth/ProGate';
import { UpgradeCTA } from './components/Auth/UpgradeCTA';
import { Welcome } from './pages/Welcome';
import { AgentMode } from './pages/AgentMode';
import { EditorMode } from './pages/EditorMode';
import { ProjectsPage } from './pages/ProjectsPage';
import { CreditsPage } from './pages/CreditsPage';
import { WaitlistPage } from './pages/WaitlistPage/WaitlistPage';
import { PricingPage } from './pages/PricingPage/PricingPage';

// ============================================================================
// App Component
// ============================================================================

/**
 * Main App component with routing configuration
 *
 * Routes:
 * - "/" -> Welcome page (landing)
 * - "/agent" -> AgentMode page (AI-powered diagram generation)
 * - "/editor" -> EditorMode page (manual editing)
 * - "/editor/:id" -> EditorMode with loaded diagram
 * - "/credits" -> CreditsPage (attribution and licenses)
 */
function AppRoutes(): JSX.Element {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSendToEditor = useCallback((svg: string) => {
    const diagramId = `agent-${Date.now()}`;
    const payload = {
      name: 'Agent Diagram',
      svg,
      createdAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(`finnish-diagram-${diagramId}`, JSON.stringify(payload));
      navigate(`/editor/${diagramId}`);
    } catch (error) {
      console.error('Failed to store diagram for editor:', error);
      showToast({
        type: 'error',
        message: 'Failed to open diagram in Editor. Please try again.',
      });
    }
  }, [navigate, showToast]);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Welcome />} />
      <Route path="/credits" element={<CreditsPage />} />
      <Route path="/waitlist" element={<WaitlistPage />} />
      <Route path="/pricing" element={<PricingPage />} />

      {/* Auth pages */}
      <Route
        path="/sign-in/*"
        element={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
            <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" fallbackRedirectUrl="/agent" />
          </div>
        }
      />
      <Route
        path="/sign-up/*"
        element={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
            <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" fallbackRedirectUrl="/agent" />
          </div>
        }
      />

      {/* Protected routes — requires authentication */}
      <Route element={<ProtectedLayout />}>
        {/* Agent Mode — requires Pro tier */}
        <Route
          path="/agent"
          element={
            <ProGate fallback={<UpgradeCTA feature="Agent Mode" description="AI-powered diagram generation requires a Pro subscription. Upgrade to create diagrams with AI." />}>
              <AgentMode onSendToEditor={handleSendToEditor} />
            </ProGate>
          }
        />

        {/* My Projects — any authenticated tier */}
        <Route path="/projects" element={<ProjectsPage />} />

        {/* Editor Mode — any authenticated tier */}
        <Route path="/editor" element={<EditorMode />} />
        <Route path="/editor/:id" element={<EditorMode />} />
      </Route>

      {/* Fallback to Welcome for unknown routes */}
      <Route path="*" element={<Welcome />} />
    </Routes>
  );
}

function App(): JSX.Element {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // Log error to console in development
        if (process.env.NODE_ENV === 'development') {
          console.error('[App Error]', error, errorInfo);
        }
      }}
    >
      <ToastProvider maxToasts={5}>
        <BrowserRouter>
          <div className="finnish-app">
            <AppRoutes />
          </div>
        </BrowserRouter>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;

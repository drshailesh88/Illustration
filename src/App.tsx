/**
 * FINNISH App Router
 * Main application component with React Router setup
 *
 * @module App
 */

import { useCallback } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ToastProvider, useToast } from './components/Toast';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Welcome } from './pages/Welcome';
import { AgentMode } from './pages/AgentMode';
import { EditorMode } from './pages/EditorMode';
import { CreditsPage } from './pages/CreditsPage';

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
      {/* Landing page */}
      <Route path="/" element={<Welcome />} />

      {/* AI Agent mode for diagram generation */}
      <Route path="/agent" element={<AgentMode onSendToEditor={handleSendToEditor} />} />

      {/* Manual editor mode */}
      <Route path="/editor" element={<EditorMode />} />

      {/* Editor with loaded diagram by ID */}
      <Route path="/editor/:id" element={<EditorMode />} />

      {/* Credits and attribution page */}
      <Route path="/credits" element={<CreditsPage />} />

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

/**
 * FINNISH App Router
 * Main application component with React Router setup
 *
 * @module App
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/Toast';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Welcome } from './pages/Welcome';
import { AgentMode } from './pages/AgentMode';
import { EditorMode } from './pages/EditorMode';

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
 */
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
            <Routes>
              {/* Landing page */}
              <Route path="/" element={<Welcome />} />

              {/* AI Agent mode for diagram generation */}
              <Route path="/agent" element={<AgentMode />} />

              {/* Manual editor mode */}
              <Route path="/editor" element={<EditorMode />} />

              {/* Editor with loaded diagram by ID */}
              <Route path="/editor/:id" element={<EditorMode />} />

              {/* Fallback to Welcome for unknown routes */}
              <Route path="*" element={<Welcome />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;

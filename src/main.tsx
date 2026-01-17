/**
 * FINNISH Application Entry Point
 * Renders the main App component with StrictMode
 *
 * @module main
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import global styles
import './styles/global.css';

// ============================================================================
// Application Bootstrap
// ============================================================================

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Make sure there is a <div id="root"></div> in your HTML.');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

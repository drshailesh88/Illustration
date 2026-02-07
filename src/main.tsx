/**
 * FINNISH Application Entry Point
 * Renders the main App component with StrictMode
 *
 * @module main
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ConvexReactClient } from 'convex/react';
import App from './App';

// Import global styles
import './styles/global.css';

// Clerk publishable key from environment
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error(
    'Missing Clerk Publishable Key. Set VITE_CLERK_PUBLISHABLE_KEY in your .env.local file.'
  );
}

// Convex client
const CONVEX_URL = import.meta.env.VITE_CONVEX_URL;

if (!CONVEX_URL) {
  throw new Error(
    'Missing Convex URL. Run `npx convex dev` and ensure VITE_CONVEX_URL is set in .env.local.'
  );
}

const convex = new ConvexReactClient(CONVEX_URL);

// fal.ai image generation (optional — only if API key is configured)
const FAL_AI_API_KEY = import.meta.env.VITE_FAL_AI_API_KEY;
if (FAL_AI_API_KEY) {
  import('./lib/ai/image-generation').then(({ configureFalClient }) => {
    configureFalClient(FAL_AI_API_KEY);
  });
}

// ============================================================================
// Application Bootstrap
// ============================================================================

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Make sure there is a <div id="root"></div> in your HTML.');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      afterSignOutUrl="/"
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <App />
      </ConvexProviderWithClerk>
    </ClerkProvider>
  </React.StrictMode>
);

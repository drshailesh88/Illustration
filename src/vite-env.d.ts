/// <reference types="vite/client" />

/**
 * Vite Environment Variable Type Definitions
 *
 * This file provides TypeScript type safety for environment variables
 * used throughout the FINNISH application.
 */

interface ImportMetaEnv {
  // Authentication (Clerk)
  readonly VITE_CLERK_PUBLISHABLE_KEY: string;

  // Application
  readonly VITE_APP_VERSION: string;

  // API Configuration
  readonly VITE_API_URL: string;
  readonly VITE_API_TIMEOUT: string;

  // AI Service Configuration
  readonly VITE_CLAUDE_API_KEY: string;
  readonly VITE_CLAUDE_MODEL: string;
  readonly VITE_OPENAI_API_KEY: string;
  readonly VITE_AI_MAX_TOKENS: string;
  readonly VITE_AI_TEMPERATURE: string;
  readonly VITE_AI_RPM: string;
  readonly VITE_AI_RETRY_ATTEMPTS: string;
  readonly VITE_AI_RETRY_DELAY: string;

  // Feature Flags
  readonly VITE_FEATURE_AI_GENERATION: string;
  readonly VITE_FEATURE_COLLABORATION: string;
  readonly VITE_FEATURE_CLOUD_SYNC: string;
  readonly VITE_FEATURE_EXPERIMENTAL: string;
  readonly VITE_FEATURE_DEBUG: string;
  readonly VITE_FEATURE_ANALYTICS: string;
  readonly VITE_FEATURE_OFFLINE: string;
  readonly VITE_FEATURE_AGENT_MODE: string;

  // Editor Configuration
  readonly VITE_EDITOR_WIDTH: string;
  readonly VITE_EDITOR_HEIGHT: string;
  readonly VITE_EDITOR_MAX_HISTORY: string;
  readonly VITE_EDITOR_GRID_SIZE: string;
  readonly VITE_EDITOR_SNAP_THRESHOLD: string;
  readonly VITE_EDITOR_AUTOSAVE: string;
  readonly VITE_EDITOR_AUTOSAVE_INTERVAL: string;
  readonly VITE_EDITOR_MAX_OBJECTS: string;
  readonly VITE_EDITOR_RENDER_THROTTLE: string;

  // Export Configuration
  readonly VITE_EXPORT_DPI: string;
  readonly VITE_EXPORT_QUALITY: string;
  readonly VITE_EXPORT_FORMAT: string;

  // Import Configuration
  readonly VITE_IMPORT_MAX_SIZE: string;

  // Vite built-in
  readonly MODE: string;
  readonly BASE_URL: string;
  readonly PROD: boolean;
  readonly DEV: boolean;
  readonly SSR: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

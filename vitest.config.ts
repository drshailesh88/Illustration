/**
 * Vitest Configuration for FINNISH
 * Following TDD principles with 80% coverage target
 */

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    // Test environment
    environment: 'jsdom',

    // Global test setup
    setupFiles: ['./tests/setup.ts'],

    // Include patterns
    include: ['tests/**/*.test.{ts,tsx}', 'src/**/*.test.{ts,tsx}'],

    // Exclude patterns
    exclude: [
      'node_modules/**',
      'dist/**',
      '.git/**',
      '**/*.d.ts',
    ],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',

      // Coverage thresholds - TDD target 80%
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },

      // Include patterns for coverage
      include: [
        'src/**/*.{ts,tsx}',
      ],

      // Exclude patterns from coverage
      exclude: [
        'node_modules/**',
        'tests/**',
        'src/**/*.d.ts',
        'src/**/*.test.{ts,tsx}',
        'src/types/**',
        'src/**/index.ts',
      ],
    },

    // Globals for test utilities
    globals: true,

    // Timeout settings
    testTimeout: 10000,
    hookTimeout: 10000,

    // Watch mode settings
    watch: false,

    // Reporter settings
    reporters: ['verbose'],

    // Mock settings
    mockReset: true,
    clearMocks: true,
    restoreMocks: true,
  },

  // Path aliases (matching tsconfig)
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});

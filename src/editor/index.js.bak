/**
 * FINNISH Canvas Editor
 * Core editor module exports
 *
 * @module editor
 */

import { FinnishCanvas } from './FinnishCanvas.js';
import { HistoryManager } from './history.js';
import { GridManager } from './grid.js';

// Named exports
export { FinnishCanvas, HistoryManager, GridManager };

// Re-export fabric for convenience
export { fabric } from 'fabric';

/**
 * Create a new FinnishCanvas instance with default options
 * Factory function for quick setup
 *
 * @param {string|HTMLCanvasElement} canvasElement - Canvas element or selector
 * @param {Object} options - Configuration options
 * @returns {FinnishCanvas} New canvas instance
 */
export function createEditor(canvasElement, options = {}) {
  return new FinnishCanvas(canvasElement, options);
}

/**
 * Create a new FinnishCanvas with preset dimensions
 *
 * @param {string|HTMLCanvasElement} canvasElement - Canvas element or selector
 * @param {string} preset - Preset name: 'a4', 'letter', 'hd', 'square', 'custom'
 * @param {Object} options - Additional options
 * @returns {FinnishCanvas} New canvas instance
 */
export function createEditorWithPreset(canvasElement, preset = 'hd', options = {}) {
  const presets = {
    // Print presets (at 72 DPI)
    a4: { width: 595, height: 842 },           // A4 at 72 DPI
    a4Landscape: { width: 842, height: 595 },  // A4 Landscape at 72 DPI
    letter: { width: 612, height: 792 },       // US Letter at 72 DPI
    letterLandscape: { width: 792, height: 612 }, // US Letter Landscape

    // Screen presets
    hd: { width: 1280, height: 720 },          // 720p
    fullHd: { width: 1920, height: 1080 },     // 1080p
    '4k': { width: 3840, height: 2160 },       // 4K

    // Social media presets
    instagram: { width: 1080, height: 1080 },  // Instagram square
    instagramStory: { width: 1080, height: 1920 }, // Instagram story
    twitter: { width: 1200, height: 675 },     // Twitter post
    facebook: { width: 1200, height: 630 },    // Facebook post

    // Common sizes
    square: { width: 800, height: 800 },
    small: { width: 400, height: 300 },
    medium: { width: 800, height: 600 },
    large: { width: 1200, height: 900 }
  };

  const presetDimensions = presets[preset] || presets.hd;

  return new FinnishCanvas(canvasElement, {
    ...presetDimensions,
    ...options
  });
}

/**
 * Version information
 */
export const version = '0.1.0';

/**
 * Default export
 */
export default {
  FinnishCanvas,
  HistoryManager,
  GridManager,
  createEditor,
  createEditorWithPreset,
  version
};

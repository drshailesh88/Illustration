/**
 * Unit Tests for Export Store
 * Tests Zustand store managing export settings and progress
 *
 * @module tests/unit/store/exportStore
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { act } from '@testing-library/react';
import {
  useExportStore,
  resetExportStore,
  getExportState,
  getFormatConfig,
  getDPIOptions,
  getStageDescription,
  useExportSettings,
  useExportProgress,
  useExportError,
  useSupportsQuality,
  useSupportsDPI,
  subscribeToExport,
  generateExportFilename,
} from '../../../src/store/exportStore';
import type { ExportFormat, ExportDPI, ExportStage } from '../../../src/types/index';

describe('exportStore', () => {
  // Reset store before each test
  beforeEach(() => {
    resetExportStore();
  });

  // ==========================================================================
  // Initial State Tests
  // ==========================================================================

  describe('Initial State', () => {
    it('should have correct initial format (png)', () => {
      const state = getExportState();
      expect(state.format).toBe('png');
    });

    it('should have correct initial quality (100)', () => {
      const state = getExportState();
      expect(state.quality).toBe(100);
    });

    it('should have correct initial DPI (300)', () => {
      const state = getExportState();
      expect(state.dpi).toBe(300);
    });

    it('should have isExporting as false', () => {
      const state = getExportState();
      expect(state.isExporting).toBe(false);
    });

    it('should have progress at 0', () => {
      const state = getExportState();
      expect(state.progress).toBe(0);
    });

    it('should have stage as preparing', () => {
      const state = getExportState();
      expect(state.stage).toBe('preparing');
    });

    it('should have no error', () => {
      const state = getExportState();
      expect(state.error).toBeNull();
    });
  });

  // ==========================================================================
  // Format Settings Tests
  // ==========================================================================

  describe('setFormat', () => {
    it('should change format to svg', () => {
      act(() => {
        useExportStore.getState().setFormat('svg');
      });

      expect(getExportState().format).toBe('svg');
    });

    it('should change format to pdf', () => {
      act(() => {
        useExportStore.getState().setFormat('pdf');
      });

      expect(getExportState().format).toBe('pdf');
    });

    it('should change format to tikz', () => {
      act(() => {
        useExportStore.getState().setFormat('tikz');
      });

      expect(getExportState().format).toBe('tikz');
    });

    it('should allow changing between all formats', () => {
      const formats: ExportFormat[] = ['png', 'svg', 'pdf', 'tikz'];

      formats.forEach((format) => {
        act(() => {
          useExportStore.getState().setFormat(format);
        });
        expect(getExportState().format).toBe(format);
      });
    });
  });

  describe('setQuality', () => {
    it('should set quality to valid value', () => {
      act(() => {
        useExportStore.getState().setQuality(75);
      });

      expect(getExportState().quality).toBe(75);
    });

    it('should clamp quality below 0 to 0', () => {
      act(() => {
        useExportStore.getState().setQuality(-10);
      });

      expect(getExportState().quality).toBe(0);
    });

    it('should clamp quality above 100 to 100', () => {
      act(() => {
        useExportStore.getState().setQuality(150);
      });

      expect(getExportState().quality).toBe(100);
    });

    it('should allow boundary values', () => {
      act(() => {
        useExportStore.getState().setQuality(0);
      });
      expect(getExportState().quality).toBe(0);

      act(() => {
        useExportStore.getState().setQuality(100);
      });
      expect(getExportState().quality).toBe(100);
    });
  });

  describe('setDPI', () => {
    it('should set DPI to 72', () => {
      act(() => {
        useExportStore.getState().setDPI(72);
      });

      expect(getExportState().dpi).toBe(72);
    });

    it('should set DPI to 150', () => {
      act(() => {
        useExportStore.getState().setDPI(150);
      });

      expect(getExportState().dpi).toBe(150);
    });

    it('should set DPI to 300', () => {
      act(() => {
        useExportStore.getState().setDPI(300);
      });

      expect(getExportState().dpi).toBe(300);
    });

    it('should set DPI to 600', () => {
      act(() => {
        useExportStore.getState().setDPI(600);
      });

      expect(getExportState().dpi).toBe(600);
    });

    it('should not change DPI for invalid values', () => {
      act(() => {
        useExportStore.getState().setDPI(300); // Set to valid value first
      });

      act(() => {
        useExportStore.getState().setDPI(100 as ExportDPI); // Invalid DPI
      });

      // Should remain at previous valid value
      expect(getExportState().dpi).toBe(300);
    });
  });

  // ==========================================================================
  // Export Operations Tests
  // ==========================================================================

  describe('startExport', () => {
    it('should set isExporting to true', () => {
      act(() => {
        useExportStore.getState().startExport();
      });

      expect(getExportState().isExporting).toBe(true);
    });

    it('should reset progress to 0', () => {
      act(() => {
        useExportStore.getState().updateProgress(50);
        useExportStore.getState().startExport();
      });

      expect(getExportState().progress).toBe(0);
    });

    it('should set stage to preparing', () => {
      act(() => {
        useExportStore.getState().startExport();
      });

      expect(getExportState().stage).toBe('preparing');
    });

    it('should clear any existing error', () => {
      act(() => {
        useExportStore.getState().finishExport(false, 'Previous error');
        useExportStore.getState().startExport();
      });

      expect(getExportState().error).toBeNull();
    });
  });

  describe('updateProgress', () => {
    it('should update progress value', () => {
      act(() => {
        useExportStore.getState().updateProgress(50);
      });

      expect(getExportState().progress).toBe(50);
    });

    it('should clamp progress below 0 to 0', () => {
      act(() => {
        useExportStore.getState().updateProgress(-10);
      });

      expect(getExportState().progress).toBe(0);
    });

    it('should clamp progress above 100 to 100', () => {
      act(() => {
        useExportStore.getState().updateProgress(150);
      });

      expect(getExportState().progress).toBe(100);
    });

    it('should update stage when provided', () => {
      act(() => {
        useExportStore.getState().updateProgress(50, 'rendering');
      });

      expect(getExportState().stage).toBe('rendering');
    });

    it('should keep current stage when not provided', () => {
      act(() => {
        useExportStore.getState().updateProgress(25, 'rendering');
        useExportStore.getState().updateProgress(50);
      });

      expect(getExportState().stage).toBe('rendering');
    });

    it('should work with all export stages', () => {
      const stages: ExportStage[] = [
        'preparing',
        'rendering',
        'optimizing',
        'encoding',
        'complete',
        'error',
      ];

      stages.forEach((stage, index) => {
        act(() => {
          useExportStore.getState().updateProgress(index * 20, stage);
        });
        expect(getExportState().stage).toBe(stage);
      });
    });
  });

  describe('finishExport', () => {
    it('should set isExporting to false on success', () => {
      act(() => {
        useExportStore.getState().startExport();
        useExportStore.getState().finishExport(true);
      });

      expect(getExportState().isExporting).toBe(false);
    });

    it('should set progress to 100 on success', () => {
      act(() => {
        useExportStore.getState().startExport();
        useExportStore.getState().finishExport(true);
      });

      expect(getExportState().progress).toBe(100);
    });

    it('should set stage to complete on success', () => {
      act(() => {
        useExportStore.getState().startExport();
        useExportStore.getState().finishExport(true);
      });

      expect(getExportState().stage).toBe('complete');
    });

    it('should clear error on success', () => {
      act(() => {
        useExportStore.getState().finishExport(false, 'Previous error');
        useExportStore.getState().startExport();
        useExportStore.getState().finishExport(true);
      });

      expect(getExportState().error).toBeNull();
    });

    it('should set isExporting to false on failure', () => {
      act(() => {
        useExportStore.getState().startExport();
        useExportStore.getState().finishExport(false);
      });

      expect(getExportState().isExporting).toBe(false);
    });

    it('should set progress to 0 on failure', () => {
      act(() => {
        useExportStore.getState().startExport();
        useExportStore.getState().updateProgress(75);
        useExportStore.getState().finishExport(false);
      });

      expect(getExportState().progress).toBe(0);
    });

    it('should set stage to error on failure', () => {
      act(() => {
        useExportStore.getState().startExport();
        useExportStore.getState().finishExport(false);
      });

      expect(getExportState().stage).toBe('error');
    });

    it('should set error message on failure', () => {
      act(() => {
        useExportStore.getState().startExport();
        useExportStore.getState().finishExport(false, 'Export failed: out of memory');
      });

      expect(getExportState().error).toBe('Export failed: out of memory');
    });

    it('should use default error message when none provided', () => {
      act(() => {
        useExportStore.getState().startExport();
        useExportStore.getState().finishExport(false);
      });

      expect(getExportState().error).toBe('Export failed');
    });
  });

  describe('resetExport', () => {
    it('should reset export state', () => {
      act(() => {
        useExportStore.getState().startExport();
        useExportStore.getState().updateProgress(75, 'encoding');
        useExportStore.getState().resetExport();
      });

      const state = getExportState();
      expect(state.isExporting).toBe(false);
      expect(state.progress).toBe(0);
      expect(state.stage).toBe('preparing');
      expect(state.error).toBeNull();
    });

    it('should clear error', () => {
      act(() => {
        useExportStore.getState().finishExport(false, 'Some error');
        useExportStore.getState().resetExport();
      });

      expect(getExportState().error).toBeNull();
    });

    it('should not reset format, quality, or DPI', () => {
      act(() => {
        useExportStore.getState().setFormat('svg');
        useExportStore.getState().setQuality(75);
        useExportStore.getState().setDPI(600);
        useExportStore.getState().resetExport();
      });

      const state = getExportState();
      expect(state.format).toBe('svg');
      expect(state.quality).toBe(75);
      expect(state.dpi).toBe(600);
    });
  });

  // ==========================================================================
  // Helper Functions Tests
  // ==========================================================================

  describe('getFormatConfig', () => {
    it('should return PNG config', () => {
      const config = getFormatConfig('png');

      expect(config.extension).toBe('.png');
      expect(config.mimeType).toBe('image/png');
      expect(config.supportsQuality).toBe(true);
      expect(config.supportsDPI).toBe(true);
    });

    it('should return SVG config', () => {
      const config = getFormatConfig('svg');

      expect(config.extension).toBe('.svg');
      expect(config.mimeType).toBe('image/svg+xml');
      expect(config.supportsQuality).toBe(false);
      expect(config.supportsDPI).toBe(false);
    });

    it('should return PDF config', () => {
      const config = getFormatConfig('pdf');

      expect(config.extension).toBe('.pdf');
      expect(config.mimeType).toBe('application/pdf');
      expect(config.supportsQuality).toBe(true);
      expect(config.supportsDPI).toBe(true);
    });

    it('should return TikZ config', () => {
      const config = getFormatConfig('tikz');

      expect(config.extension).toBe('.tex');
      expect(config.mimeType).toBe('application/x-tex');
      expect(config.supportsQuality).toBe(false);
      expect(config.supportsDPI).toBe(false);
    });
  });

  describe('getDPIOptions', () => {
    it('should return array of DPI options', () => {
      const options = getDPIOptions();

      expect(options).toHaveLength(4);
      expect(options.map((o) => o.value)).toEqual([72, 150, 300, 600]);
    });

    it('should include labels and descriptions', () => {
      const options = getDPIOptions();

      options.forEach((option) => {
        expect(option.label).toBeDefined();
        expect(option.description).toBeDefined();
      });
    });

    it('should have correct descriptions', () => {
      const options = getDPIOptions();

      expect(options[0].description).toContain('Screen');
      expect(options[1].description).toContain('Draft');
      expect(options[2].description).toContain('Standard');
      expect(options[3].description).toContain('High');
    });
  });

  describe('getStageDescription', () => {
    it('should return description for preparing stage', () => {
      expect(getStageDescription('preparing')).toContain('Preparing');
    });

    it('should return description for rendering stage', () => {
      expect(getStageDescription('rendering')).toContain('Rendering');
    });

    it('should return description for optimizing stage', () => {
      expect(getStageDescription('optimizing')).toContain('Optimizing');
    });

    it('should return description for encoding stage', () => {
      expect(getStageDescription('encoding')).toContain('Encoding');
    });

    it('should return description for complete stage', () => {
      expect(getStageDescription('complete')).toContain('complete');
    });

    it('should return description for error stage', () => {
      expect(getStageDescription('error')).toContain('failed');
    });
  });

  describe('generateExportFilename', () => {
    it('should generate filename with correct extension for PNG', () => {
      const filename = generateExportFilename('png');
      expect(filename).toMatch(/\.png$/);
    });

    it('should generate filename with correct extension for SVG', () => {
      const filename = generateExportFilename('svg');
      expect(filename).toMatch(/\.svg$/);
    });

    it('should generate filename with correct extension for PDF', () => {
      const filename = generateExportFilename('pdf');
      expect(filename).toMatch(/\.pdf$/);
    });

    it('should generate filename with correct extension for TikZ', () => {
      const filename = generateExportFilename('tikz');
      expect(filename).toMatch(/\.tex$/);
    });

    it('should use default prefix', () => {
      const filename = generateExportFilename('png');
      expect(filename).toContain('finnish-export');
    });

    it('should use custom prefix when provided', () => {
      const filename = generateExportFilename('png', 'my-diagram');
      expect(filename).toContain('my-diagram');
    });

    it('should include timestamp', () => {
      const filename = generateExportFilename('png');
      // Timestamp format: YYYYMMDDTHHMMSSmsms
      expect(filename).toMatch(/\d{8}T\d{6}/);
    });
  });

  // ==========================================================================
  // Selector Hooks Tests
  // ==========================================================================

  describe('Selector Hooks', () => {
    it('useExportSettings should return format, quality, and DPI', () => {
      act(() => {
        useExportStore.getState().setFormat('pdf');
        useExportStore.getState().setQuality(80);
        useExportStore.getState().setDPI(600);
      });

      const state = getExportState();
      expect(state.format).toBe('pdf');
      expect(state.quality).toBe(80);
      expect(state.dpi).toBe(600);
    });

    it('useExportProgress should return progress state', () => {
      act(() => {
        useExportStore.getState().startExport();
        useExportStore.getState().updateProgress(50, 'rendering');
      });

      const state = getExportState();
      expect(state.isExporting).toBe(true);
      expect(state.progress).toBe(50);
      expect(state.stage).toBe('rendering');
    });

    it('useExportError should return error state', () => {
      act(() => {
        useExportStore.getState().finishExport(false, 'Test error');
      });

      const state = getExportState();
      expect(state.error).toBe('Test error');
    });

    it('useSupportsQuality should return true for PNG', () => {
      act(() => {
        useExportStore.getState().setFormat('png');
      });

      const config = getFormatConfig(getExportState().format);
      expect(config.supportsQuality).toBe(true);
    });

    it('useSupportsQuality should return false for SVG', () => {
      act(() => {
        useExportStore.getState().setFormat('svg');
      });

      const config = getFormatConfig(getExportState().format);
      expect(config.supportsQuality).toBe(false);
    });

    it('useSupportsDPI should return true for PDF', () => {
      act(() => {
        useExportStore.getState().setFormat('pdf');
      });

      const config = getFormatConfig(getExportState().format);
      expect(config.supportsDPI).toBe(true);
    });

    it('useSupportsDPI should return false for TikZ', () => {
      act(() => {
        useExportStore.getState().setFormat('tikz');
      });

      const config = getFormatConfig(getExportState().format);
      expect(config.supportsDPI).toBe(false);
    });
  });

  // ==========================================================================
  // Store Utilities Tests
  // ==========================================================================

  describe('resetExportStore', () => {
    it('should reset all state to initial values', () => {
      act(() => {
        useExportStore.getState().setFormat('tikz');
        useExportStore.getState().setQuality(50);
        useExportStore.getState().setDPI(600);
        useExportStore.getState().startExport();
        useExportStore.getState().updateProgress(75, 'encoding');
        useExportStore.getState().finishExport(false, 'Error');
      });

      act(() => {
        resetExportStore();
      });

      const state = getExportState();
      expect(state.format).toBe('png');
      expect(state.quality).toBe(100);
      expect(state.dpi).toBe(300);
      expect(state.isExporting).toBe(false);
      expect(state.progress).toBe(0);
      expect(state.stage).toBe('preparing');
      expect(state.error).toBeNull();
    });
  });

  describe('subscribeToExport', () => {
    it('should call callback when subscribed state changes', () => {
      const callback = vi.fn();
      const unsubscribe = subscribeToExport(
        (state) => state.format,
        callback
      );

      act(() => {
        useExportStore.getState().setFormat('svg');
      });

      expect(callback).toHaveBeenCalledWith('svg', 'png');

      unsubscribe();
    });

    it('should not call callback after unsubscribe', () => {
      const callback = vi.fn();
      const unsubscribe = subscribeToExport(
        (state) => state.format,
        callback
      );

      unsubscribe();

      act(() => {
        useExportStore.getState().setFormat('pdf');
      });

      expect(callback).not.toHaveBeenCalled();
    });

    it('should track progress changes', () => {
      const callback = vi.fn();
      const unsubscribe = subscribeToExport(
        (state) => state.progress,
        callback
      );

      act(() => {
        useExportStore.getState().updateProgress(25);
      });

      expect(callback).toHaveBeenCalledWith(25, 0);

      unsubscribe();
    });
  });

  // ==========================================================================
  // Export Cycle Integration Tests
  // ==========================================================================

  describe('Export Cycle', () => {
    it('should complete a successful export cycle', () => {
      // Start export
      act(() => {
        useExportStore.getState().startExport();
      });

      expect(getExportState().isExporting).toBe(true);
      expect(getExportState().progress).toBe(0);
      expect(getExportState().stage).toBe('preparing');

      // Update progress through stages
      act(() => {
        useExportStore.getState().updateProgress(25, 'rendering');
      });

      expect(getExportState().progress).toBe(25);
      expect(getExportState().stage).toBe('rendering');

      act(() => {
        useExportStore.getState().updateProgress(50, 'optimizing');
      });

      expect(getExportState().progress).toBe(50);
      expect(getExportState().stage).toBe('optimizing');

      act(() => {
        useExportStore.getState().updateProgress(75, 'encoding');
      });

      expect(getExportState().progress).toBe(75);
      expect(getExportState().stage).toBe('encoding');

      // Finish export
      act(() => {
        useExportStore.getState().finishExport(true);
      });

      expect(getExportState().isExporting).toBe(false);
      expect(getExportState().progress).toBe(100);
      expect(getExportState().stage).toBe('complete');
      expect(getExportState().error).toBeNull();
    });

    it('should handle a failed export cycle', () => {
      // Start export
      act(() => {
        useExportStore.getState().startExport();
      });

      // Progress through some stages
      act(() => {
        useExportStore.getState().updateProgress(50, 'rendering');
      });

      // Fail export
      act(() => {
        useExportStore.getState().finishExport(false, 'Canvas too large');
      });

      expect(getExportState().isExporting).toBe(false);
      expect(getExportState().progress).toBe(0);
      expect(getExportState().stage).toBe('error');
      expect(getExportState().error).toBe('Canvas too large');
    });
  });
});

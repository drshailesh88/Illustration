/**
 * Unit Tests for PNG Exporter Service
 * Tests PNG export functionality from Fabric.js canvas with DPI and quality settings
 *
 * @module tests/unit/services/PNGExporter
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PNGExporter } from '../../../src/services/export/PNGExporter';
import { createMockFabricCanvas } from '../../setup';

describe('PNGExporter', () => {
  let exporter: PNGExporter;
  let mockCanvas: ReturnType<typeof createMockFabricCanvas>;

  beforeEach(() => {
    exporter = new PNGExporter();
    mockCanvas = createMockFabricCanvas();

    // Setup default mock for toDataURL
    mockCanvas.toDataURL.mockReturnValue(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
    );
  });

  // ==========================================================================
  // Basic Export Tests
  // ==========================================================================

  describe('Basic Export', () => {
    it('should export PNG blob', async () => {
      const result = await exporter.export(mockCanvas as any);

      expect(result.blob).toBeInstanceOf(Blob);
    });

    it('should return correct mime type', async () => {
      const result = await exporter.export(mockCanvas as any);

      expect(result.mimeType).toBe('image/png');
    });

    it('should return correct filename with extension', async () => {
      const result = await exporter.export(mockCanvas as any, { filename: 'my-image' });

      expect(result.filename).toBe('my-image.png');
    });

    it('should use default filename when not specified', async () => {
      const result = await exporter.export(mockCanvas as any);

      expect(result.filename).toBe('illustration.png');
    });

    it('should return blob with image/png type', async () => {
      const result = await exporter.export(mockCanvas as any);

      expect(result.blob.type).toBe('image/png');
    });

    it('should return size greater than 0', async () => {
      const result = await exporter.export(mockCanvas as any);

      expect(result.size).toBeGreaterThan(0);
    });
  });

  // ==========================================================================
  // DPI Tests
  // ==========================================================================

  describe('DPI Settings', () => {
    it('should export at 72 DPI', async () => {
      await exporter.export(mockCanvas as any, { dpi: 72 });

      expect(mockCanvas.toDataURL).toHaveBeenCalledWith(
        expect.objectContaining({
          multiplier: 1, // 72/72 = 1
        })
      );
    });

    it('should export at 150 DPI', async () => {
      await exporter.export(mockCanvas as any, { dpi: 150 });

      expect(mockCanvas.toDataURL).toHaveBeenCalledWith(
        expect.objectContaining({
          multiplier: expect.closeTo(150 / 72, 0.01),
        })
      );
    });

    it('should export at 300 DPI', async () => {
      await exporter.export(mockCanvas as any, { dpi: 300 });

      expect(mockCanvas.toDataURL).toHaveBeenCalledWith(
        expect.objectContaining({
          multiplier: expect.closeTo(300 / 72, 0.01),
        })
      );
    });

    it('should export at 600 DPI', async () => {
      await exporter.export(mockCanvas as any, { dpi: 600 });

      expect(mockCanvas.toDataURL).toHaveBeenCalledWith(
        expect.objectContaining({
          multiplier: expect.closeTo(600 / 72, 0.01),
        })
      );
    });

    it('should use default DPI (150) when not specified', async () => {
      await exporter.export(mockCanvas as any);

      expect(mockCanvas.toDataURL).toHaveBeenCalledWith(
        expect.objectContaining({
          multiplier: expect.closeTo(150 / 72, 0.01),
        })
      );
    });

    it('should validate invalid DPI values', () => {
      const validation = exporter.validateOptions({ dpi: 100 as any, format: 'png' });

      expect(validation.valid).toBe(false);
      expect(validation.errors).toContain('DPI must be one of: 72, 150, 300, 600');
    });
  });

  // ==========================================================================
  // Quality Tests
  // ==========================================================================

  describe('Quality Settings', () => {
    it('should apply quality setting', async () => {
      await exporter.export(mockCanvas as any, { quality: 80 });

      expect(mockCanvas.toDataURL).toHaveBeenCalledWith(
        expect.objectContaining({
          quality: 0.8, // Converted to 0-1 range
        })
      );
    });

    it('should apply maximum quality (100)', async () => {
      await exporter.export(mockCanvas as any, { quality: 100 });

      expect(mockCanvas.toDataURL).toHaveBeenCalledWith(
        expect.objectContaining({
          quality: 1.0,
        })
      );
    });

    it('should apply minimum quality (0)', async () => {
      await exporter.export(mockCanvas as any, { quality: 0 });

      expect(mockCanvas.toDataURL).toHaveBeenCalledWith(
        expect.objectContaining({
          quality: 0,
        })
      );
    });

    it('should use default quality (90) when not specified', async () => {
      await exporter.export(mockCanvas as any);

      expect(mockCanvas.toDataURL).toHaveBeenCalledWith(
        expect.objectContaining({
          quality: 0.9,
        })
      );
    });

    it('should validate quality below 0', () => {
      const validation = exporter.validateOptions({ quality: -10, format: 'png' });

      expect(validation.valid).toBe(false);
      expect(validation.errors).toContain('Quality must be between 0 and 100');
    });

    it('should validate quality above 100', () => {
      const validation = exporter.validateOptions({ quality: 150, format: 'png' });

      expect(validation.valid).toBe(false);
      expect(validation.errors).toContain('Quality must be between 0 and 100');
    });
  });

  // ==========================================================================
  // Transparency Tests
  // ==========================================================================

  describe('Transparency Settings', () => {
    it('should set transparent background when option is true', async () => {
      await exporter.export(mockCanvas as any, { transparent: true });

      // Should set background to transparent
      expect(mockCanvas.backgroundColor).toBeDefined();
    });

    it('should use white background when transparent is false', async () => {
      mockCanvas.backgroundColor = null;

      await exporter.export(mockCanvas as any, { transparent: false });

      // Background should be set to white
      expect(mockCanvas.backgroundColor).toBeDefined();
    });

    it('should preserve existing background when transparent is false', async () => {
      mockCanvas.backgroundColor = '#ff0000';

      await exporter.export(mockCanvas as any, { transparent: false });

      // Original background should be restored after export
      expect(mockCanvas.backgroundColor).toBe('#ff0000');
    });

    it('should use opaque background by default', async () => {
      mockCanvas.backgroundColor = null;

      await exporter.export(mockCanvas as any);

      // Should use default (not transparent)
      expect(mockCanvas.toDataURL).toHaveBeenCalled();
    });
  });

  // ==========================================================================
  // Blob Type Tests
  // ==========================================================================

  describe('Blob Type', () => {
    it('should return blob with correct type', async () => {
      const result = await exporter.export(mockCanvas as any);

      expect(result.blob.type).toBe('image/png');
    });

    it('should return PNG format blob', async () => {
      const result = await exporter.export(mockCanvas as any);

      expect(result.mimeType).toBe('image/png');
    });
  });

  // ==========================================================================
  // Canvas State Restoration Tests
  // ==========================================================================

  describe('Canvas State Restoration', () => {
    it('should restore original background color after export', async () => {
      const originalBgColor = '#ff5500';
      mockCanvas.backgroundColor = originalBgColor;

      await exporter.export(mockCanvas as any, { transparent: true });

      expect(mockCanvas.backgroundColor).toBe(originalBgColor);
    });

    it('should restore original zoom after export', async () => {
      mockCanvas.getZoom.mockReturnValue(2);

      await exporter.export(mockCanvas as any);

      expect(mockCanvas.setZoom).toHaveBeenLastCalledWith(2);
    });

    it('should call renderAll after export', async () => {
      await exporter.export(mockCanvas as any);

      expect(mockCanvas.renderAll).toHaveBeenCalled();
    });
  });

  // ==========================================================================
  // Progress Callback Tests
  // ==========================================================================

  describe('Progress Callback', () => {
    it('should call progress callback during export', async () => {
      const onProgress = vi.fn();

      await exporter.export(mockCanvas as any, {}, onProgress);

      expect(onProgress).toHaveBeenCalled();
    });

    it('should call progress with increasing values', async () => {
      const progressValues: number[] = [];
      const onProgress = vi.fn((progress: number) => {
        progressValues.push(progress);
      });

      await exporter.export(mockCanvas as any, {}, onProgress);

      // Check progress increased
      for (let i = 1; i < progressValues.length; i++) {
        expect(progressValues[i]).toBeGreaterThanOrEqual(progressValues[i - 1]);
      }
    });

    it('should reach 100% on completion', async () => {
      const onProgress = vi.fn();

      await exporter.export(mockCanvas as any, {}, onProgress);

      const lastCall = onProgress.mock.calls[onProgress.mock.calls.length - 1];
      expect(lastCall[0]).toBe(100);
    });

    it('should include progress messages', async () => {
      const messages: string[] = [];
      const onProgress = vi.fn((_progress: number, message?: string) => {
        if (message) messages.push(message);
      });

      await exporter.export(mockCanvas as any, {}, onProgress);

      expect(messages.length).toBeGreaterThan(0);
    });
  });

  // ==========================================================================
  // Convenience Methods Tests
  // ==========================================================================

  describe('exportForPrint', () => {
    it('should export at 300 DPI', async () => {
      await exporter.exportForPrint(mockCanvas as any);

      expect(mockCanvas.toDataURL).toHaveBeenCalledWith(
        expect.objectContaining({
          multiplier: expect.closeTo(300 / 72, 0.01),
        })
      );
    });

    it('should accept other options', async () => {
      await exporter.exportForPrint(mockCanvas as any, { filename: 'print-version' });

      const result = await exporter.exportForPrint(mockCanvas as any, { filename: 'print' });
      expect(result.filename).toBe('print.png');
    });

    it('should call progress callback', async () => {
      const onProgress = vi.fn();

      await exporter.exportForPrint(mockCanvas as any, {}, onProgress);

      expect(onProgress).toHaveBeenCalled();
    });
  });

  describe('exportForWeb', () => {
    it('should export at 72 DPI', async () => {
      await exporter.exportForWeb(mockCanvas as any);

      expect(mockCanvas.toDataURL).toHaveBeenCalledWith(
        expect.objectContaining({
          multiplier: 1, // 72/72 = 1
        })
      );
    });

    it('should use quality 85', async () => {
      await exporter.exportForWeb(mockCanvas as any);

      expect(mockCanvas.toDataURL).toHaveBeenCalledWith(
        expect.objectContaining({
          quality: 0.85,
        })
      );
    });

    it('should accept other options', async () => {
      const result = await exporter.exportForWeb(mockCanvas as any, { filename: 'web-image' });

      expect(result.filename).toBe('web-image.png');
    });
  });

  // ==========================================================================
  // File Size Estimation Tests
  // ==========================================================================

  describe('estimateFileSize', () => {
    it('should return estimated file size', () => {
      mockCanvas.getWidth.mockReturnValue(800);
      mockCanvas.getHeight.mockReturnValue(600);

      const estimate = exporter.estimateFileSize(mockCanvas as any);

      expect(estimate.min).toBeGreaterThan(0);
      expect(estimate.max).toBeGreaterThan(estimate.min);
      expect(estimate.unit).toBeDefined();
    });

    it('should return larger estimate for higher DPI', () => {
      mockCanvas.getWidth.mockReturnValue(800);
      mockCanvas.getHeight.mockReturnValue(600);

      const estimate72 = exporter.estimateFileSize(mockCanvas as any, { dpi: 72 });
      const estimate600 = exporter.estimateFileSize(mockCanvas as any, { dpi: 600 });

      expect(estimate600.max).toBeGreaterThan(estimate72.max);
    });

    it('should return larger estimate for transparent images', () => {
      mockCanvas.getWidth.mockReturnValue(800);
      mockCanvas.getHeight.mockReturnValue(600);

      const estimateOpaque = exporter.estimateFileSize(mockCanvas as any, { transparent: false });
      const estimateTransparent = exporter.estimateFileSize(mockCanvas as any, { transparent: true });

      // Transparent images have 4 bytes per pixel vs 3
      expect(estimateTransparent.max).toBeGreaterThan(estimateOpaque.max);
    });

    it('should use KB for smaller estimates', () => {
      mockCanvas.getWidth.mockReturnValue(100);
      mockCanvas.getHeight.mockReturnValue(100);

      const estimate = exporter.estimateFileSize(mockCanvas as any, { dpi: 72 });

      expect(estimate.unit).toBe('KB');
    });

    it('should use MB for larger estimates', () => {
      mockCanvas.getWidth.mockReturnValue(4000);
      mockCanvas.getHeight.mockReturnValue(4000);

      const estimate = exporter.estimateFileSize(mockCanvas as any, { dpi: 600 });

      expect(estimate.unit).toBe('MB');
    });
  });

  // ==========================================================================
  // Default Options Tests
  // ==========================================================================

  describe('Default Options', () => {
    it('should return correct default options', () => {
      const defaults = exporter.getDefaultOptions();

      expect(defaults.dpi).toBe(150);
      expect(defaults.quality).toBe(90);
      expect(defaults.transparent).toBe(false);
      expect(defaults.filename).toBe('illustration');
    });
  });

  // ==========================================================================
  // Options Validation Tests
  // ==========================================================================

  describe('Options Validation', () => {
    it('should validate valid options', () => {
      const result = exporter.validateOptions({
        format: 'png',
        dpi: 300,
        quality: 80,
      });

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject invalid DPI', () => {
      const result = exporter.validateOptions({
        format: 'png',
        dpi: 200 as any,
      });

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject quality out of range', () => {
      const result = exporter.validateOptions({
        format: 'png',
        quality: 110,
      });

      expect(result.valid).toBe(false);
    });

    it('should accept undefined options', () => {
      const result = exporter.validateOptions(undefined);

      expect(result.valid).toBe(true);
    });
  });

  // ==========================================================================
  // Format Property Tests
  // ==========================================================================

  describe('Format Property', () => {
    it('should have format property set to png', () => {
      expect(exporter.format).toBe('png');
    });
  });

  // ==========================================================================
  // Error Handling Tests
  // ==========================================================================

  describe('Error Handling', () => {
    it('should throw on invalid options', async () => {
      const invalidOptions = { dpi: 999 as any, format: 'png' as const };

      await expect(exporter.export(mockCanvas as any, invalidOptions)).rejects.toThrow();
    });

    it('should handle canvas toDataURL throwing error', async () => {
      mockCanvas.toDataURL.mockImplementation(() => {
        throw new Error('Canvas export failed');
      });

      await expect(exporter.export(mockCanvas as any)).rejects.toThrow('Canvas export failed');
    });

    it('should handle invalid data URL format', async () => {
      mockCanvas.toDataURL.mockReturnValue('invalid-data-url');

      await expect(exporter.export(mockCanvas as any)).rejects.toThrow();
    });
  });

  // ==========================================================================
  // Data URL to Blob Conversion Tests
  // ==========================================================================

  describe('Data URL to Blob Conversion', () => {
    it('should convert valid data URL to blob', async () => {
      const result = await exporter.export(mockCanvas as any);

      expect(result.blob).toBeInstanceOf(Blob);
      expect(result.blob.size).toBeGreaterThan(0);
    });

    it('should preserve MIME type from data URL', async () => {
      mockCanvas.toDataURL.mockReturnValue(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
      );

      const result = await exporter.export(mockCanvas as any);

      expect(result.blob.type).toBe('image/png');
    });
  });

  // ==========================================================================
  // Integration Tests
  // ==========================================================================

  describe('Integration', () => {
    it('should complete full export cycle', async () => {
      const onProgress = vi.fn();

      const result = await exporter.export(
        mockCanvas as any,
        {
          dpi: 300,
          quality: 95,
          transparent: false,
          filename: 'test-export',
        },
        onProgress
      );

      expect(result.blob).toBeInstanceOf(Blob);
      expect(result.filename).toBe('test-export.png');
      expect(result.mimeType).toBe('image/png');
      expect(result.size).toBeGreaterThan(0);
      expect(onProgress).toHaveBeenCalled();
    });

    it('should handle multiple exports in sequence', async () => {
      const result1 = await exporter.export(mockCanvas as any, { dpi: 72 });
      const result2 = await exporter.export(mockCanvas as any, { dpi: 300 });
      const result3 = await exporter.export(mockCanvas as any, { dpi: 600 });

      expect(result1.blob).toBeInstanceOf(Blob);
      expect(result2.blob).toBeInstanceOf(Blob);
      expect(result3.blob).toBeInstanceOf(Blob);
    });
  });
});

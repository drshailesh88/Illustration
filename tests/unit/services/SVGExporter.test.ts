/**
 * Unit Tests for SVG Exporter Service
 * Tests SVG export functionality from Fabric.js canvas
 *
 * @module tests/unit/services/SVGExporter
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SVGExporter } from '../../../src/services/export/SVGExporter';
import { createMockFabricCanvas } from '../../setup';

describe('SVGExporter', () => {
  let exporter: SVGExporter;
  let mockCanvas: ReturnType<typeof createMockFabricCanvas>;

  beforeEach(() => {
    exporter = new SVGExporter();
    mockCanvas = createMockFabricCanvas();
  });

  // ==========================================================================
  // Basic Export Tests
  // ==========================================================================

  describe('Basic Export', () => {
    it('should export valid SVG string', async () => {
      const result = await exporter.export(mockCanvas as any);

      expect(result.blob).toBeInstanceOf(Blob);
      expect(result.mimeType).toBe('image/svg+xml');
    });

    it('should return correct filename with extension', async () => {
      const result = await exporter.export(mockCanvas as any, { filename: 'test' });

      expect(result.filename).toBe('test.svg');
    });

    it('should use default filename when not specified', async () => {
      const result = await exporter.export(mockCanvas as any);

      expect(result.filename).toBe('illustration.svg');
    });

    it('should return blob with correct mime type', async () => {
      const result = await exporter.export(mockCanvas as any);

      expect(result.blob.type).toBe('image/svg+xml');
    });

    it('should return size greater than 0', async () => {
      const result = await exporter.export(mockCanvas as any);

      expect(result.size).toBeGreaterThan(0);
    });

    it('should call toSVG on canvas', async () => {
      await exporter.export(mockCanvas as any);

      expect(mockCanvas.toSVG).toHaveBeenCalled();
    });
  });

  // ==========================================================================
  // Empty Canvas Tests
  // ==========================================================================

  describe('Empty Canvas Handling', () => {
    it('should handle empty canvas', async () => {
      mockCanvas.getObjects.mockReturnValue([]);

      const result = await exporter.export(mockCanvas as any);

      expect(result.blob).toBeInstanceOf(Blob);
    });

    it('should still produce valid SVG for empty canvas', async () => {
      mockCanvas.getObjects.mockReturnValue([]);
      mockCanvas.toSVG.mockReturnValue(
        '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"></svg>'
      );

      const result = await exporter.export(mockCanvas as any);
      const svgContent = await result.blob.text();

      expect(svgContent).toContain('<svg');
      expect(svgContent).toContain('</svg>');
    });
  });

  // ==========================================================================
  // ViewBox Preservation Tests
  // ==========================================================================

  describe('ViewBox Preservation', () => {
    it('should preserve viewBox when option is true (default)', async () => {
      mockCanvas.toSVG.mockReturnValue(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600"></svg>'
      );

      await exporter.export(mockCanvas as any, { preserveViewBox: true });

      expect(mockCanvas.toSVG).toHaveBeenCalledWith(
        expect.objectContaining({
          viewBox: expect.objectContaining({
            minX: 0,
            minY: 0,
            width: 800,
            height: 600,
          }),
        })
      );
    });

    it('should not include viewBox when option is false', async () => {
      await exporter.export(mockCanvas as any, { preserveViewBox: false });

      expect(mockCanvas.toSVG).toHaveBeenCalledWith(
        expect.objectContaining({
          viewBox: undefined,
        })
      );
    });

    it('should use canvas dimensions for viewBox', async () => {
      mockCanvas.getWidth.mockReturnValue(1024);
      mockCanvas.getHeight.mockReturnValue(768);

      await exporter.export(mockCanvas as any, { preserveViewBox: true });

      expect(mockCanvas.toSVG).toHaveBeenCalledWith(
        expect.objectContaining({
          viewBox: expect.objectContaining({
            width: 1024,
            height: 768,
          }),
        })
      );
    });
  });

  // ==========================================================================
  // Optimization Tests
  // ==========================================================================

  describe('Optimization', () => {
    it('should optimize SVG when option is true (default)', async () => {
      mockCanvas.toSVG.mockReturnValue(
        '<svg xmlns="http://www.w3.org/2000/svg"><!-- comment --><g></g></svg>'
      );

      const result = await exporter.export(mockCanvas as any, { optimize: true });
      const svgContent = await result.blob.text();

      // Comments should be removed
      expect(svgContent).not.toContain('<!-- comment -->');
    });

    it('should remove empty groups when optimizing', async () => {
      mockCanvas.toSVG.mockReturnValue(
        '<svg xmlns="http://www.w3.org/2000/svg"><g></g><rect/></svg>'
      );

      const result = await exporter.export(mockCanvas as any, { optimize: true });
      const svgContent = await result.blob.text();

      expect(svgContent).not.toContain('<g></g>');
    });

    it('should remove data-* attributes from Fabric.js', async () => {
      mockCanvas.toSVG.mockReturnValue(
        '<svg xmlns="http://www.w3.org/2000/svg"><rect data-fabric-id="123"/></svg>'
      );

      const result = await exporter.export(mockCanvas as any, { optimize: true });
      const svgContent = await result.blob.text();

      expect(svgContent).not.toContain('data-fabric-id');
    });

    it('should skip optimization when option is false', async () => {
      const originalSvg = '<svg xmlns="http://www.w3.org/2000/svg"><!-- comment --></svg>';
      mockCanvas.toSVG.mockReturnValue(originalSvg);

      const result = await exporter.export(mockCanvas as any, { optimize: false });
      const svgContent = await result.blob.text();

      // Comment should be preserved when not optimizing
      expect(svgContent).toContain('<!-- comment -->');
    });
  });

  // ==========================================================================
  // Minification Tests
  // ==========================================================================

  describe('Minification', () => {
    it('should minify SVG when option is true', async () => {
      mockCanvas.toSVG.mockReturnValue(
        '<svg xmlns="http://www.w3.org/2000/svg">\n  <rect/>\n</svg>'
      );

      const result = await exporter.export(mockCanvas as any, { minify: true });
      const svgContent = await result.blob.text();

      // Should remove newlines
      expect(svgContent).not.toMatch(/\n\s+\n/);
    });

    it('should not minify when option is false (default)', async () => {
      const result = await exporter.export(mockCanvas as any, { minify: false });

      // Default should not be minified
      expect(result.blob).toBeInstanceOf(Blob);
    });
  });

  // ==========================================================================
  // Namespace Tests
  // ==========================================================================

  describe('Namespace Handling', () => {
    it('should ensure xmlns is present', async () => {
      mockCanvas.toSVG.mockReturnValue('<svg><rect/></svg>');

      const result = await exporter.export(mockCanvas as any);
      const svgContent = await result.blob.text();

      expect(svgContent).toContain('xmlns="http://www.w3.org/2000/svg"');
    });

    it('should not duplicate xmlns if already present', async () => {
      mockCanvas.toSVG.mockReturnValue(
        '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>'
      );

      const result = await exporter.export(mockCanvas as any);
      const svgContent = await result.blob.text();

      const xmlnsCount = (svgContent.match(/xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g) || []).length;
      expect(xmlnsCount).toBe(1);
    });
  });

  // ==========================================================================
  // XML Declaration Tests
  // ==========================================================================

  describe('XML Declaration', () => {
    it('should add XML declaration if not present', async () => {
      mockCanvas.toSVG.mockReturnValue('<svg xmlns="http://www.w3.org/2000/svg"></svg>');

      const result = await exporter.export(mockCanvas as any);
      const svgContent = await result.blob.text();

      expect(svgContent).toMatch(/^<\?xml version="1\.0" encoding="UTF-8"\?>/);
    });

    it('should not duplicate XML declaration', async () => {
      mockCanvas.toSVG.mockReturnValue(
        '<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg"></svg>'
      );

      const result = await exporter.export(mockCanvas as any);
      const svgContent = await result.blob.text();

      const xmlDeclCount = (svgContent.match(/<\?xml/g) || []).length;
      expect(xmlDeclCount).toBe(1);
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

      // Check that progress increased
      for (let i = 1; i < progressValues.length; i++) {
        expect(progressValues[i]).toBeGreaterThanOrEqual(progressValues[i - 1]);
      }
    });

    it('should reach 100% progress on completion', async () => {
      const onProgress = vi.fn();

      await exporter.export(mockCanvas as any, {}, onProgress);

      // Last call should be 100%
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
  // Export As String Tests
  // ==========================================================================

  describe('exportAsString', () => {
    it('should return SVG as string', async () => {
      const svgString = await exporter.exportAsString(mockCanvas as any);

      expect(typeof svgString).toBe('string');
      expect(svgString).toContain('<svg');
    });

    it('should apply optimization when specified', async () => {
      mockCanvas.toSVG.mockReturnValue(
        '<svg xmlns="http://www.w3.org/2000/svg"><!-- comment --></svg>'
      );

      const svgString = await exporter.exportAsString(mockCanvas as any, { optimize: true });

      expect(svgString).not.toContain('<!-- comment -->');
    });
  });

  // ==========================================================================
  // Export As Data URL Tests
  // ==========================================================================

  describe('exportAsDataURL', () => {
    it('should return valid data URL', async () => {
      const dataURL = await exporter.exportAsDataURL(mockCanvas as any);

      expect(dataURL).toMatch(/^data:image\/svg\+xml,/);
    });

    it('should encode SVG content', async () => {
      const dataURL = await exporter.exportAsDataURL(mockCanvas as any);

      expect(dataURL).toContain('data:image/svg+xml,');
    });

    it('should apply minification for data URL', async () => {
      mockCanvas.toSVG.mockReturnValue(
        '<svg xmlns="http://www.w3.org/2000/svg">\n  <rect/>\n</svg>'
      );

      const dataURL = await exporter.exportAsDataURL(mockCanvas as any);

      // Data URL should be minified
      expect(dataURL).not.toContain('%0A%20%20'); // Encoded newlines and spaces
    });
  });

  // ==========================================================================
  // Export As Base64 Data URL Tests
  // ==========================================================================

  describe('exportAsBase64DataURL', () => {
    it('should return base64 data URL', async () => {
      const dataURL = await exporter.exportAsBase64DataURL(mockCanvas as any);

      expect(dataURL).toMatch(/^data:image\/svg\+xml;base64,/);
    });

    it('should contain valid base64 content', async () => {
      const dataURL = await exporter.exportAsBase64DataURL(mockCanvas as any);
      const base64Part = dataURL.replace('data:image/svg+xml;base64,', '');

      // Should be valid base64
      expect(() => atob(base64Part)).not.toThrow();
    });
  });

  // ==========================================================================
  // Default Options Tests
  // ==========================================================================

  describe('Default Options', () => {
    it('should return default options', () => {
      const defaults = exporter.getDefaultOptions();

      expect(defaults.optimize).toBe(true);
      expect(defaults.embedFonts).toBe(false);
      expect(defaults.preserveViewBox).toBe(true);
      expect(defaults.minify).toBe(false);
      expect(defaults.filename).toBe('illustration');
    });
  });

  // ==========================================================================
  // Options Validation Tests
  // ==========================================================================

  describe('Options Validation', () => {
    it('should validate options successfully', () => {
      const result = exporter.validateOptions({
        optimize: true,
        embedFonts: false,
      });

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
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
    it('should have format property set to svg', () => {
      expect(exporter.format).toBe('svg');
    });
  });

  // ==========================================================================
  // Font Embedding Tests
  // ==========================================================================

  describe('Font Embedding', () => {
    it('should not embed fonts by default', async () => {
      mockCanvas.toSVG.mockReturnValue(
        '<svg xmlns="http://www.w3.org/2000/svg"></svg>'
      );

      const result = await exporter.export(mockCanvas as any);
      const svgContent = await result.blob.text();

      expect(svgContent).not.toContain('@font-face');
    });

    it('should call embedFonts when option is true', async () => {
      mockCanvas.toSVG.mockReturnValue(
        '<svg xmlns="http://www.w3.org/2000/svg"></svg>'
      );
      mockCanvas.getObjects.mockReturnValue([
        {
          type: 'text',
          fontFamily: 'Arial',
        },
      ]);

      await exporter.export(mockCanvas as any, { embedFonts: true });

      // Should process without error even with fonts
      expect(mockCanvas.getObjects).toHaveBeenCalled();
    });
  });

  // ==========================================================================
  // Error Handling Tests
  // ==========================================================================

  describe('Error Handling', () => {
    it('should handle canvas toSVG throwing error', async () => {
      mockCanvas.toSVG.mockImplementation(() => {
        throw new Error('Canvas export failed');
      });

      await expect(exporter.export(mockCanvas as any)).rejects.toThrow('Canvas export failed');
    });
  });
});

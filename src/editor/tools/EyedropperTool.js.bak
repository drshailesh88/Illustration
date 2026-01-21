/**
 * EyedropperTool - Pick colors from the canvas
 * Click to sample color at that point
 */
import { BaseTool } from './BaseTool.js';

export class EyedropperTool extends BaseTool {
  constructor(editor) {
    super(editor);
    this.lastSampledColor = null;
    this.previewElement = null;
  }

  get name() {
    return 'eyedropper';
  }

  get shortcut() {
    return 'i';
  }

  getCursor() {
    return 'crosshair';
  }

  onActivate() {
    if (this.canvas) {
      this.canvas.selection = false;
      this.canvas.forEachObject((obj) => {
        obj.selectable = false;
        obj.evented = false;
      });
    }

    // Create color preview element
    this.createPreviewElement();

    this.emit('tool:activated', { tool: this.name });
  }

  onDeactivate() {
    this.removePreviewElement();
    this.emit('tool:deactivated', { tool: this.name });
  }

  onMouseDown(e) {
    super.onMouseDown(e);

    if (!this.canvas) return;

    const color = this.sampleColor(this.startPoint);
    this.lastSampledColor = color;

    this.emit('color:sampled', { color, point: this.startPoint });
  }

  onMouseMove(e) {
    super.onMouseMove(e);

    if (!this.canvas) return;

    // Preview color under cursor
    const color = this.sampleColor(this.currentPoint);
    this.updatePreview(color, e.e);
  }

  onMouseUp(e) {
    super.onMouseUp(e);

    if (this.lastSampledColor) {
      this.emit('color:picked', { color: this.lastSampledColor });
    }
  }

  onKeyDown(e) {
    // Alt to sample and apply as fill
    // Shift to sample and apply as stroke
    // These modifiers are read during color:sampled event
  }

  /**
   * Sample color at canvas point
   * @param {Object} point - {x, y} coordinates
   * @returns {string} - Color in hex format
   */
  sampleColor(point) {
    if (!this.canvas) return '#000000';

    // Get the canvas rendering context
    const ctx = this.canvas.getContext();
    if (!ctx) return '#000000';

    // Account for viewport transform
    const vpt = this.canvas.viewportTransform;
    const screenX = point.x * vpt[0] + vpt[4];
    const screenY = point.y * vpt[3] + vpt[5];

    // Get pixel data
    const pixel = ctx.getImageData(
      Math.round(screenX),
      Math.round(screenY),
      1,
      1
    ).data;

    // Convert to hex
    const r = pixel[0];
    const g = pixel[1];
    const b = pixel[2];
    const a = pixel[3] / 255;

    if (a === 0) {
      // Transparent pixel - return canvas background or white
      return '#ffffff';
    }

    return this.rgbToHex(r, g, b);
  }

  /**
   * Convert RGB to hex
   * @param {number} r - Red (0-255)
   * @param {number} g - Green (0-255)
   * @param {number} b - Blue (0-255)
   * @returns {string}
   */
  rgbToHex(r, g, b) {
    const toHex = (n) => {
      const hex = Math.round(n).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  /**
   * Convert hex to RGB
   * @param {string} hex
   * @returns {{r: number, g: number, b: number}}
   */
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }

  /**
   * Create color preview element
   */
  createPreviewElement() {
    if (this.previewElement) return;

    this.previewElement = document.createElement('div');
    this.previewElement.className = 'eyedropper-preview';
    this.previewElement.style.cssText = `
      position: fixed;
      width: 40px;
      height: 40px;
      border-radius: 50% 50% 50% 0;
      border: 2px solid white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      pointer-events: none;
      z-index: 10000;
      transform: translate(-50%, -100%) rotate(-45deg);
      display: none;
    `;

    document.body.appendChild(this.previewElement);
  }

  /**
   * Remove color preview element
   */
  removePreviewElement() {
    if (this.previewElement) {
      this.previewElement.remove();
      this.previewElement = null;
    }
  }

  /**
   * Update preview element position and color
   * @param {string} color - Color to show
   * @param {MouseEvent} e - Mouse event
   */
  updatePreview(color, e) {
    if (!this.previewElement) return;

    this.previewElement.style.display = 'block';
    this.previewElement.style.backgroundColor = color;
    this.previewElement.style.left = `${e.clientX}px`;
    this.previewElement.style.top = `${e.clientY - 10}px`;
  }

  /**
   * Sample average color from a region
   * @param {Object} center - Center point
   * @param {number} radius - Sample radius in pixels
   * @returns {string}
   */
  sampleAverageColor(center, radius = 3) {
    if (!this.canvas) return '#000000';

    const ctx = this.canvas.getContext();
    if (!ctx) return '#000000';

    const vpt = this.canvas.viewportTransform;
    const screenX = center.x * vpt[0] + vpt[4];
    const screenY = center.y * vpt[3] + vpt[5];

    const size = radius * 2 + 1;
    const pixels = ctx.getImageData(
      Math.round(screenX - radius),
      Math.round(screenY - radius),
      size,
      size
    ).data;

    let totalR = 0, totalG = 0, totalB = 0;
    let count = 0;

    for (let i = 0; i < pixels.length; i += 4) {
      const a = pixels[i + 3];
      if (a > 0) {
        totalR += pixels[i];
        totalG += pixels[i + 1];
        totalB += pixels[i + 2];
        count++;
      }
    }

    if (count === 0) return '#ffffff';

    return this.rgbToHex(
      totalR / count,
      totalG / count,
      totalB / count
    );
  }

  /**
   * Get the last sampled color
   * @returns {string|null}
   */
  getLastColor() {
    return this.lastSampledColor;
  }

  /**
   * Apply sampled color to selected objects
   * @param {string} colorType - 'fill' or 'stroke'
   */
  applyToSelection(colorType = 'fill') {
    if (!this.canvas || !this.lastSampledColor) return;

    const activeObject = this.canvas.getActiveObject();
    if (!activeObject) return;

    activeObject.set(colorType, this.lastSampledColor);
    this.canvas.requestRenderAll();

    this.emit('color:applied', {
      color: this.lastSampledColor,
      type: colorType,
      object: activeObject
    });
  }
}

export default EyedropperTool;

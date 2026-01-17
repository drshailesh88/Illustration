/**
 * RectangleTool - Draw rectangles and squares
 * Hold Shift to constrain to square
 */
import { BaseTool } from './BaseTool.js';
import * as fabric from 'fabric';

export class RectangleTool extends BaseTool {
  constructor(editor) {
    super(editor);
    this.currentRect = null;
    this.isShiftHeld = false;
  }

  get name() {
    return 'rectangle';
  }

  get shortcut() {
    return 'r';
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
    this.emit('tool:activated', { tool: this.name });
  }

  onDeactivate() {
    if (this.currentRect) {
      this.canvas?.remove(this.currentRect);
      this.currentRect = null;
    }
    this.emit('tool:deactivated', { tool: this.name });
  }

  onMouseDown(e) {
    super.onMouseDown(e);

    if (!this.canvas) return;

    // Create initial rectangle
    this.currentRect = new fabric.Rect({
      left: this.startPoint.x,
      top: this.startPoint.y,
      width: 0,
      height: 0,
      fill: 'transparent',
      stroke: '#000000',
      strokeWidth: 2,
      strokeUniform: true,
      selectable: false,
      evented: false,
      originX: 'left',
      originY: 'top'
    });

    this.canvas.add(this.currentRect);
    this.emit('shape:start', { type: 'rectangle' });
  }

  onMouseMove(e) {
    super.onMouseMove(e);

    if (!this.isDragging || !this.currentRect) return;

    const { left, top, width, height } = this.calculateDimensions();

    this.currentRect.set({
      left,
      top,
      width,
      height
    });

    this.canvas?.requestRenderAll();
  }

  onMouseUp(e) {
    super.onMouseUp(e);

    if (!this.currentRect) return;

    // Only keep rectangle if it has meaningful size
    if (this.currentRect.width < 2 && this.currentRect.height < 2) {
      this.canvas?.remove(this.currentRect);
      this.emit('shape:cancelled', { type: 'rectangle' });
    } else {
      // Make rectangle selectable
      this.currentRect.set({
        selectable: true,
        evented: true
      });
      this.currentRect.setCoords();

      this.emit('shape:created', {
        type: 'rectangle',
        object: this.currentRect
      });
    }

    this.currentRect = null;
    this.canvas?.requestRenderAll();
  }

  onKeyDown(e) {
    if (e.key === 'Shift') {
      this.isShiftHeld = true;
      if (this.isDragging && this.currentRect) {
        this.updateRect();
      }
    }

    // Cancel with Escape
    if (e.key === 'Escape' && this.currentRect) {
      this.canvas?.remove(this.currentRect);
      this.currentRect = null;
      this.isDragging = false;
      this.canvas?.requestRenderAll();
      this.emit('shape:cancelled', { type: 'rectangle' });
    }
  }

  onKeyUp(e) {
    if (e.key === 'Shift') {
      this.isShiftHeld = false;
      if (this.isDragging && this.currentRect) {
        this.updateRect();
      }
    }
  }

  /**
   * Calculate rectangle dimensions based on drag
   * @returns {{left: number, top: number, width: number, height: number}}
   */
  calculateDimensions() {
    let width = this.currentPoint.x - this.startPoint.x;
    let height = this.currentPoint.y - this.startPoint.y;

    // Constrain to square if shift is held
    if (this.isShiftHeld) {
      const size = Math.max(Math.abs(width), Math.abs(height));
      width = width < 0 ? -size : size;
      height = height < 0 ? -size : size;
    }

    // Calculate actual position (handle negative dimensions)
    const left = width < 0 ? this.startPoint.x + width : this.startPoint.x;
    const top = height < 0 ? this.startPoint.y + height : this.startPoint.y;

    return {
      left,
      top,
      width: Math.abs(width),
      height: Math.abs(height)
    };
  }

  /**
   * Update rectangle with current dimensions
   */
  updateRect() {
    if (!this.currentRect) return;

    const { left, top, width, height } = this.calculateDimensions();

    this.currentRect.set({ left, top, width, height });
    this.canvas?.requestRenderAll();
  }

  /**
   * Create a rectangle with specific dimensions
   * @param {number} x - X position
   * @param {number} y - Y position
   * @param {number} width - Width
   * @param {number} height - Height
   * @param {Object} options - Additional options
   * @returns {fabric.Rect}
   */
  createRect(x, y, width, height, options = {}) {
    const rect = new fabric.Rect({
      left: x,
      top: y,
      width,
      height,
      fill: 'transparent',
      stroke: '#000000',
      strokeWidth: 2,
      strokeUniform: true,
      ...options
    });

    this.canvas?.add(rect);
    this.canvas?.requestRenderAll();

    this.emit('shape:created', { type: 'rectangle', object: rect });

    return rect;
  }
}

export default RectangleTool;

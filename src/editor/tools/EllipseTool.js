/**
 * EllipseTool - Draw ellipses and circles
 * Hold Shift to constrain to circle
 */
import { BaseTool } from './BaseTool.js';
import * as fabric from 'fabric';

export class EllipseTool extends BaseTool {
  constructor(editor) {
    super(editor);
    this.currentEllipse = null;
    this.isShiftHeld = false;
  }

  get name() {
    return 'ellipse';
  }

  get shortcut() {
    return 'e';
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
    if (this.currentEllipse) {
      this.canvas?.remove(this.currentEllipse);
      this.currentEllipse = null;
    }
    this.emit('tool:deactivated', { tool: this.name });
  }

  onMouseDown(e) {
    super.onMouseDown(e);

    if (!this.canvas) return;

    // Create initial ellipse at click point
    this.currentEllipse = new fabric.Ellipse({
      left: this.startPoint.x,
      top: this.startPoint.y,
      rx: 0,
      ry: 0,
      fill: 'transparent',
      stroke: '#000000',
      strokeWidth: 2,
      strokeUniform: true,
      selectable: false,
      evented: false,
      originX: 'center',
      originY: 'center'
    });

    this.canvas.add(this.currentEllipse);
    this.emit('shape:start', { type: 'ellipse' });
  }

  onMouseMove(e) {
    super.onMouseMove(e);

    if (!this.isDragging || !this.currentEllipse) return;

    const { centerX, centerY, rx, ry } = this.calculateDimensions();

    this.currentEllipse.set({
      left: centerX,
      top: centerY,
      rx,
      ry
    });

    this.canvas?.requestRenderAll();
  }

  onMouseUp(e) {
    super.onMouseUp(e);

    if (!this.currentEllipse) return;

    // Only keep ellipse if it has meaningful size
    if (this.currentEllipse.rx < 2 && this.currentEllipse.ry < 2) {
      this.canvas?.remove(this.currentEllipse);
      this.emit('shape:cancelled', { type: 'ellipse' });
    } else {
      // Make ellipse selectable
      this.currentEllipse.set({
        selectable: true,
        evented: true
      });
      this.currentEllipse.setCoords();

      this.emit('shape:created', {
        type: 'ellipse',
        object: this.currentEllipse
      });
    }

    this.currentEllipse = null;
    this.canvas?.requestRenderAll();
  }

  onKeyDown(e) {
    if (e.key === 'Shift') {
      this.isShiftHeld = true;
      if (this.isDragging && this.currentEllipse) {
        this.updateEllipse();
      }
    }

    // Cancel with Escape
    if (e.key === 'Escape' && this.currentEllipse) {
      this.canvas?.remove(this.currentEllipse);
      this.currentEllipse = null;
      this.isDragging = false;
      this.canvas?.requestRenderAll();
      this.emit('shape:cancelled', { type: 'ellipse' });
    }
  }

  onKeyUp(e) {
    if (e.key === 'Shift') {
      this.isShiftHeld = false;
      if (this.isDragging && this.currentEllipse) {
        this.updateEllipse();
      }
    }
  }

  /**
   * Calculate ellipse dimensions based on drag
   * @returns {{centerX: number, centerY: number, rx: number, ry: number}}
   */
  calculateDimensions() {
    const dx = this.currentPoint.x - this.startPoint.x;
    const dy = this.currentPoint.y - this.startPoint.y;

    let rx = Math.abs(dx);
    let ry = Math.abs(dy);

    // Constrain to circle if shift is held
    if (this.isShiftHeld) {
      const radius = Math.max(rx, ry);
      rx = radius;
      ry = radius;
    }

    // Center is at the start point
    const centerX = this.startPoint.x;
    const centerY = this.startPoint.y;

    return { centerX, centerY, rx, ry };
  }

  /**
   * Update ellipse with current dimensions
   */
  updateEllipse() {
    if (!this.currentEllipse) return;

    const { centerX, centerY, rx, ry } = this.calculateDimensions();

    this.currentEllipse.set({ left: centerX, top: centerY, rx, ry });
    this.canvas?.requestRenderAll();
  }

  /**
   * Create an ellipse with specific dimensions
   * @param {number} centerX - Center X
   * @param {number} centerY - Center Y
   * @param {number} rx - Horizontal radius
   * @param {number} ry - Vertical radius
   * @param {Object} options - Additional options
   * @returns {fabric.Ellipse}
   */
  createEllipse(centerX, centerY, rx, ry, options = {}) {
    const ellipse = new fabric.Ellipse({
      left: centerX,
      top: centerY,
      rx,
      ry,
      fill: 'transparent',
      stroke: '#000000',
      strokeWidth: 2,
      strokeUniform: true,
      originX: 'center',
      originY: 'center',
      ...options
    });

    this.canvas?.add(ellipse);
    this.canvas?.requestRenderAll();

    this.emit('shape:created', { type: 'ellipse', object: ellipse });

    return ellipse;
  }

  /**
   * Create a circle (convenience method)
   * @param {number} centerX - Center X
   * @param {number} centerY - Center Y
   * @param {number} radius - Radius
   * @param {Object} options - Additional options
   * @returns {fabric.Ellipse}
   */
  createCircle(centerX, centerY, radius, options = {}) {
    return this.createEllipse(centerX, centerY, radius, radius, options);
  }
}

export default EllipseTool;

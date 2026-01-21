/**
 * LineTool - Draw straight lines
 * Hold Shift to constrain to 45-degree angles
 */
import { BaseTool } from './BaseTool.js';
import * as fabric from 'fabric';

export class LineTool extends BaseTool {
  constructor(editor) {
    super(editor);
    this.currentLine = null;
    this.isShiftHeld = false;
  }

  get name() {
    return 'line';
  }

  get shortcut() {
    return 'l';
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
    if (this.currentLine) {
      this.canvas?.remove(this.currentLine);
      this.currentLine = null;
    }
    this.emit('tool:deactivated', { tool: this.name });
  }

  onMouseDown(e) {
    super.onMouseDown(e);

    if (!this.canvas) return;

    // Create initial line (zero length)
    this.currentLine = new fabric.Line(
      [this.startPoint.x, this.startPoint.y, this.startPoint.x, this.startPoint.y],
      {
        stroke: '#000000',
        strokeWidth: 2,
        strokeUniform: true,
        selectable: false,
        evented: false,
        originX: 'center',
        originY: 'center'
      }
    );

    this.canvas.add(this.currentLine);
    this.emit('shape:start', { type: 'line' });
  }

  onMouseMove(e) {
    super.onMouseMove(e);

    if (!this.isDragging || !this.currentLine) return;

    const endPoint = this.calculateEndPoint();

    this.currentLine.set({
      x2: endPoint.x,
      y2: endPoint.y
    });

    this.canvas?.requestRenderAll();
  }

  onMouseUp(e) {
    super.onMouseUp(e);

    if (!this.currentLine) return;

    // Calculate line length
    const length = Math.hypot(
      this.currentLine.x2 - this.currentLine.x1,
      this.currentLine.y2 - this.currentLine.y1
    );

    // Only keep line if it has meaningful length
    if (length < 2) {
      this.canvas?.remove(this.currentLine);
      this.emit('shape:cancelled', { type: 'line' });
    } else {
      // Make line selectable
      this.currentLine.set({
        selectable: true,
        evented: true
      });
      this.currentLine.setCoords();

      this.emit('shape:created', {
        type: 'line',
        object: this.currentLine
      });
    }

    this.currentLine = null;
    this.canvas?.requestRenderAll();
  }

  onKeyDown(e) {
    if (e.key === 'Shift') {
      this.isShiftHeld = true;
      if (this.isDragging && this.currentLine) {
        this.updateLine();
      }
    }

    // Cancel with Escape
    if (e.key === 'Escape' && this.currentLine) {
      this.canvas?.remove(this.currentLine);
      this.currentLine = null;
      this.isDragging = false;
      this.canvas?.requestRenderAll();
      this.emit('shape:cancelled', { type: 'line' });
    }
  }

  onKeyUp(e) {
    if (e.key === 'Shift') {
      this.isShiftHeld = false;
      if (this.isDragging && this.currentLine) {
        this.updateLine();
      }
    }
  }

  /**
   * Calculate end point, optionally constrained to angles
   * @returns {{x: number, y: number}}
   */
  calculateEndPoint() {
    if (!this.isShiftHeld) {
      return { ...this.currentPoint };
    }

    // Constrain to 45-degree angles
    const dx = this.currentPoint.x - this.startPoint.x;
    const dy = this.currentPoint.y - this.startPoint.y;
    const angle = Math.atan2(dy, dx);
    const length = Math.hypot(dx, dy);

    // Snap to nearest 45-degree angle
    const snapAngle = Math.round(angle / (Math.PI / 4)) * (Math.PI / 4);

    return {
      x: this.startPoint.x + length * Math.cos(snapAngle),
      y: this.startPoint.y + length * Math.sin(snapAngle)
    };
  }

  /**
   * Update line with current dimensions
   */
  updateLine() {
    if (!this.currentLine) return;

    const endPoint = this.calculateEndPoint();

    this.currentLine.set({
      x2: endPoint.x,
      y2: endPoint.y
    });

    this.canvas?.requestRenderAll();
  }

  /**
   * Create a line with specific coordinates
   * @param {number} x1 - Start X
   * @param {number} y1 - Start Y
   * @param {number} x2 - End X
   * @param {number} y2 - End Y
   * @param {Object} options - Additional options
   * @returns {fabric.Line}
   */
  createLine(x1, y1, x2, y2, options = {}) {
    const line = new fabric.Line([x1, y1, x2, y2], {
      stroke: '#000000',
      strokeWidth: 2,
      strokeUniform: true,
      ...options
    });

    this.canvas?.add(line);
    this.canvas?.requestRenderAll();

    this.emit('shape:created', { type: 'line', object: line });

    return line;
  }
}

export default LineTool;

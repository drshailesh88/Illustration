/**
 * ArrowTool - Draw arrows with customizable heads
 * Supports single and double-headed arrows
 */
import { BaseTool } from './BaseTool.js';
import * as fabric from 'fabric';

export class ArrowTool extends BaseTool {
  constructor(editor) {
    super(editor);
    this.currentArrow = null;
    this.arrowHeadSize = 15;
    this.doubleHeaded = false;
    this.isShiftHeld = false;
  }

  get name() {
    return 'arrow';
  }

  get shortcut() {
    return null; // No default shortcut
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
    if (this.currentArrow) {
      this.canvas?.remove(this.currentArrow);
      this.currentArrow = null;
    }
    this.emit('tool:deactivated', { tool: this.name });
  }

  onMouseDown(e) {
    super.onMouseDown(e);

    if (!this.canvas) return;

    // Create initial arrow (zero length)
    this.currentArrow = this.createArrowShape(
      this.startPoint,
      this.startPoint
    );

    this.canvas.add(this.currentArrow);
    this.emit('shape:start', { type: 'arrow' });
  }

  onMouseMove(e) {
    super.onMouseMove(e);

    if (!this.isDragging || !this.currentArrow) return;

    const endPoint = this.calculateEndPoint();

    // Remove old arrow and create new one
    this.canvas?.remove(this.currentArrow);
    this.currentArrow = this.createArrowShape(this.startPoint, endPoint);
    this.canvas?.add(this.currentArrow);

    this.canvas?.requestRenderAll();
  }

  onMouseUp(e) {
    super.onMouseUp(e);

    if (!this.currentArrow) return;

    // Calculate arrow length
    const endPoint = this.calculateEndPoint();
    const length = Math.hypot(
      endPoint.x - this.startPoint.x,
      endPoint.y - this.startPoint.y
    );

    // Only keep arrow if it has meaningful length
    if (length < 10) {
      this.canvas?.remove(this.currentArrow);
      this.emit('shape:cancelled', { type: 'arrow' });
    } else {
      // Make arrow selectable
      this.currentArrow.set({
        selectable: true,
        evented: true
      });
      this.currentArrow.setCoords();

      this.emit('shape:created', {
        type: 'arrow',
        object: this.currentArrow
      });
    }

    this.currentArrow = null;
    this.canvas?.requestRenderAll();
  }

  onKeyDown(e) {
    if (e.key === 'Shift') {
      this.isShiftHeld = true;
      if (this.isDragging) {
        this.updateArrow();
      }
    }

    // Toggle double-headed with 'd'
    if (e.key === 'd' && this.isDragging) {
      this.doubleHeaded = !this.doubleHeaded;
      this.updateArrow();
    }

    // Cancel with Escape
    if (e.key === 'Escape' && this.currentArrow) {
      this.canvas?.remove(this.currentArrow);
      this.currentArrow = null;
      this.isDragging = false;
      this.canvas?.requestRenderAll();
      this.emit('shape:cancelled', { type: 'arrow' });
    }
  }

  onKeyUp(e) {
    if (e.key === 'Shift') {
      this.isShiftHeld = false;
      if (this.isDragging) {
        this.updateArrow();
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
   * Update arrow during drawing
   */
  updateArrow() {
    if (!this.currentArrow || !this.canvas) return;

    const endPoint = this.calculateEndPoint();

    this.canvas.remove(this.currentArrow);
    this.currentArrow = this.createArrowShape(this.startPoint, endPoint);
    this.canvas.add(this.currentArrow);
    this.canvas.requestRenderAll();
  }

  /**
   * Create arrow shape as a group (line + arrowheads)
   * @param {Object} start - Start point {x, y}
   * @param {Object} end - End point {x, y}
   * @returns {fabric.Group}
   */
  createArrowShape(start, end) {
    const elements = [];

    // Main line
    const line = new fabric.Line([start.x, start.y, end.x, end.y], {
      stroke: '#000000',
      strokeWidth: 2,
      strokeUniform: true
    });
    elements.push(line);

    // Calculate arrow direction
    const angle = Math.atan2(end.y - start.y, end.x - start.x);

    // End arrow head
    const endHead = this.createArrowHead(end, angle);
    elements.push(endHead);

    // Start arrow head (if double-headed)
    if (this.doubleHeaded) {
      const startHead = this.createArrowHead(start, angle + Math.PI);
      elements.push(startHead);
    }

    // Create group
    const group = new fabric.Group(elements, {
      selectable: false,
      evented: false
    });

    // Store arrow metadata
    group.arrowData = {
      start: { ...start },
      end: { ...end },
      doubleHeaded: this.doubleHeaded,
      headSize: this.arrowHeadSize
    };

    return group;
  }

  /**
   * Create an arrow head
   * @param {Object} tip - Arrow tip position
   * @param {number} angle - Direction angle in radians
   * @returns {fabric.Polygon}
   */
  createArrowHead(tip, angle) {
    const size = this.arrowHeadSize;
    const headAngle = Math.PI / 6; // 30 degrees

    // Calculate the three points of the arrow head
    const points = [
      { x: tip.x, y: tip.y },
      {
        x: tip.x - size * Math.cos(angle - headAngle),
        y: tip.y - size * Math.sin(angle - headAngle)
      },
      {
        x: tip.x - size * Math.cos(angle + headAngle),
        y: tip.y - size * Math.sin(angle + headAngle)
      }
    ];

    return new fabric.Polygon(points, {
      fill: '#000000',
      stroke: '#000000',
      strokeWidth: 1
    });
  }

  /**
   * Set arrow head size
   * @param {number} size
   */
  setArrowHeadSize(size) {
    this.arrowHeadSize = Math.max(5, Math.min(50, size));
    this.emit('arrow:headSize:changed', { size: this.arrowHeadSize });
  }

  /**
   * Set double-headed mode
   * @param {boolean} enabled
   */
  setDoubleHeaded(enabled) {
    this.doubleHeaded = enabled;
    this.emit('arrow:doubleHeaded:changed', { enabled });
  }

  /**
   * Create an arrow with specific parameters
   * @param {Object} start - Start point
   * @param {Object} end - End point
   * @param {Object} options - Options including doubleHeaded, headSize
   * @returns {fabric.Group}
   */
  createArrow(start, end, options = {}) {
    const prevDoubleHeaded = this.doubleHeaded;
    const prevHeadSize = this.arrowHeadSize;

    if (options.doubleHeaded !== undefined) {
      this.doubleHeaded = options.doubleHeaded;
    }
    if (options.headSize !== undefined) {
      this.arrowHeadSize = options.headSize;
    }

    const arrow = this.createArrowShape(start, end);
    arrow.set({
      selectable: true,
      evented: true
    });

    this.canvas?.add(arrow);
    this.canvas?.requestRenderAll();

    // Restore previous settings
    this.doubleHeaded = prevDoubleHeaded;
    this.arrowHeadSize = prevHeadSize;

    this.emit('shape:created', { type: 'arrow', object: arrow });

    return arrow;
  }
}

export default ArrowTool;

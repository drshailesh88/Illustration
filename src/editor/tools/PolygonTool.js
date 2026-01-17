/**
 * PolygonTool - Draw regular polygons
 * Click to set center, drag to set size and rotation
 */
import { BaseTool } from './BaseTool.js';
import * as fabric from 'fabric';

export class PolygonTool extends BaseTool {
  constructor(editor) {
    super(editor);
    this.currentPolygon = null;
    this.sides = 6; // Default hexagon
    this.isShiftHeld = false;
  }

  get name() {
    return 'polygon';
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
    if (this.currentPolygon) {
      this.canvas?.remove(this.currentPolygon);
      this.currentPolygon = null;
    }
    this.emit('tool:deactivated', { tool: this.name });
  }

  onMouseDown(e) {
    super.onMouseDown(e);

    if (!this.canvas) return;

    // Create initial polygon (very small)
    const points = this.generatePolygonPoints(0, 0, 1, this.sides);

    this.currentPolygon = new fabric.Polygon(points, {
      left: this.startPoint.x,
      top: this.startPoint.y,
      fill: 'transparent',
      stroke: '#000000',
      strokeWidth: 2,
      strokeUniform: true,
      selectable: false,
      evented: false,
      originX: 'center',
      originY: 'center'
    });

    this.canvas.add(this.currentPolygon);
    this.emit('shape:start', { type: 'polygon', sides: this.sides });
  }

  onMouseMove(e) {
    super.onMouseMove(e);

    if (!this.isDragging || !this.currentPolygon) return;

    const { radius, angle } = this.calculateRadiusAndAngle();
    const points = this.generatePolygonPoints(0, 0, radius, this.sides, angle);

    // Update polygon points
    this.currentPolygon.set({ points });
    this.currentPolygon.setCoords();

    this.canvas?.requestRenderAll();
  }

  onMouseUp(e) {
    super.onMouseUp(e);

    if (!this.currentPolygon) return;

    const { radius } = this.calculateRadiusAndAngle();

    // Only keep polygon if it has meaningful size
    if (radius < 5) {
      this.canvas?.remove(this.currentPolygon);
      this.emit('shape:cancelled', { type: 'polygon' });
    } else {
      // Make polygon selectable
      this.currentPolygon.set({
        selectable: true,
        evented: true
      });
      this.currentPolygon.setCoords();

      this.emit('shape:created', {
        type: 'polygon',
        sides: this.sides,
        object: this.currentPolygon
      });
    }

    this.currentPolygon = null;
    this.canvas?.requestRenderAll();
  }

  onKeyDown(e) {
    if (e.key === 'Shift') {
      this.isShiftHeld = true;
    }

    // Adjust number of sides with [ and ]
    if (e.key === '[' && this.sides > 3) {
      this.sides--;
      this.updatePolygonSides();
    }
    if (e.key === ']' && this.sides < 12) {
      this.sides++;
      this.updatePolygonSides();
    }

    // Cancel with Escape
    if (e.key === 'Escape' && this.currentPolygon) {
      this.canvas?.remove(this.currentPolygon);
      this.currentPolygon = null;
      this.isDragging = false;
      this.canvas?.requestRenderAll();
      this.emit('shape:cancelled', { type: 'polygon' });
    }
  }

  onKeyUp(e) {
    if (e.key === 'Shift') {
      this.isShiftHeld = false;
    }
  }

  /**
   * Calculate radius and rotation angle from drag
   * @returns {{radius: number, angle: number}}
   */
  calculateRadiusAndAngle() {
    const dx = this.currentPoint.x - this.startPoint.x;
    const dy = this.currentPoint.y - this.startPoint.y;
    const radius = Math.hypot(dx, dy);
    let angle = Math.atan2(dy, dx);

    // Snap to 15-degree increments if shift is held
    if (this.isShiftHeld) {
      const snapAngle = Math.PI / 12; // 15 degrees
      angle = Math.round(angle / snapAngle) * snapAngle;
    }

    return { radius, angle };
  }

  /**
   * Generate polygon points
   * @param {number} cx - Center X
   * @param {number} cy - Center Y
   * @param {number} radius - Radius
   * @param {number} sides - Number of sides
   * @param {number} rotation - Rotation angle in radians
   * @returns {Array<{x: number, y: number}>}
   */
  generatePolygonPoints(cx, cy, radius, sides, rotation = -Math.PI / 2) {
    const points = [];
    const angleStep = (2 * Math.PI) / sides;

    for (let i = 0; i < sides; i++) {
      const angle = rotation + i * angleStep;
      points.push({
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle)
      });
    }

    return points;
  }

  /**
   * Update polygon sides during drawing
   */
  updatePolygonSides() {
    if (!this.currentPolygon || !this.isDragging) return;

    const { radius, angle } = this.calculateRadiusAndAngle();
    const points = this.generatePolygonPoints(0, 0, radius, this.sides, angle);

    this.currentPolygon.set({ points });
    this.currentPolygon.setCoords();
    this.canvas?.requestRenderAll();

    this.emit('polygon:sides:changed', { sides: this.sides });
  }

  /**
   * Set the number of sides for new polygons
   * @param {number} sides
   */
  setSides(sides) {
    this.sides = Math.max(3, Math.min(12, sides));
    this.emit('polygon:sides:set', { sides: this.sides });
  }

  /**
   * Create a polygon with specific parameters
   * @param {number} centerX - Center X
   * @param {number} centerY - Center Y
   * @param {number} radius - Radius
   * @param {number} sides - Number of sides
   * @param {Object} options - Additional options
   * @returns {fabric.Polygon}
   */
  createPolygon(centerX, centerY, radius, sides = this.sides, options = {}) {
    const points = this.generatePolygonPoints(0, 0, radius, sides);

    const polygon = new fabric.Polygon(points, {
      left: centerX,
      top: centerY,
      fill: 'transparent',
      stroke: '#000000',
      strokeWidth: 2,
      strokeUniform: true,
      originX: 'center',
      originY: 'center',
      ...options
    });

    this.canvas?.add(polygon);
    this.canvas?.requestRenderAll();

    this.emit('shape:created', { type: 'polygon', sides, object: polygon });

    return polygon;
  }
}

export default PolygonTool;

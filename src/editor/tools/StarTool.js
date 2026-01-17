/**
 * StarTool - Draw stars with customizable points and inner radius
 * Click to set center, drag to set size
 */
import { BaseTool } from './BaseTool.js';
import * as fabric from 'fabric';

export class StarTool extends BaseTool {
  constructor(editor) {
    super(editor);
    this.currentStar = null;
    this.points = 5; // Default 5-pointed star
    this.innerRadiusRatio = 0.4; // Inner radius as ratio of outer
    this.isShiftHeld = false;
  }

  get name() {
    return 'star';
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
    if (this.currentStar) {
      this.canvas?.remove(this.currentStar);
      this.currentStar = null;
    }
    this.emit('tool:deactivated', { tool: this.name });
  }

  onMouseDown(e) {
    super.onMouseDown(e);

    if (!this.canvas) return;

    // Create initial star (very small)
    const starPoints = this.generateStarPoints(0, 0, 1, this.points, this.innerRadiusRatio);

    this.currentStar = new fabric.Polygon(starPoints, {
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

    this.canvas.add(this.currentStar);
    this.emit('shape:start', { type: 'star', points: this.points });
  }

  onMouseMove(e) {
    super.onMouseMove(e);

    if (!this.isDragging || !this.currentStar) return;

    const { radius, angle } = this.calculateRadiusAndAngle();
    const starPoints = this.generateStarPoints(0, 0, radius, this.points, this.innerRadiusRatio, angle);

    // Update star points
    this.currentStar.set({ points: starPoints });
    this.currentStar.setCoords();

    this.canvas?.requestRenderAll();
  }

  onMouseUp(e) {
    super.onMouseUp(e);

    if (!this.currentStar) return;

    const { radius } = this.calculateRadiusAndAngle();

    // Only keep star if it has meaningful size
    if (radius < 5) {
      this.canvas?.remove(this.currentStar);
      this.emit('shape:cancelled', { type: 'star' });
    } else {
      // Make star selectable
      this.currentStar.set({
        selectable: true,
        evented: true
      });
      this.currentStar.setCoords();

      this.emit('shape:created', {
        type: 'star',
        points: this.points,
        object: this.currentStar
      });
    }

    this.currentStar = null;
    this.canvas?.requestRenderAll();
  }

  onKeyDown(e) {
    if (e.key === 'Shift') {
      this.isShiftHeld = true;
    }

    // Adjust number of points with [ and ]
    if (e.key === '[' && this.points > 3) {
      this.points--;
      this.updateStarPoints();
    }
    if (e.key === ']' && this.points < 12) {
      this.points++;
      this.updateStarPoints();
    }

    // Adjust inner radius with - and =
    if ((e.key === '-' || e.key === '_') && this.innerRadiusRatio > 0.1) {
      this.innerRadiusRatio = Math.max(0.1, this.innerRadiusRatio - 0.05);
      this.updateStarPoints();
    }
    if ((e.key === '=' || e.key === '+') && this.innerRadiusRatio < 0.9) {
      this.innerRadiusRatio = Math.min(0.9, this.innerRadiusRatio + 0.05);
      this.updateStarPoints();
    }

    // Cancel with Escape
    if (e.key === 'Escape' && this.currentStar) {
      this.canvas?.remove(this.currentStar);
      this.currentStar = null;
      this.isDragging = false;
      this.canvas?.requestRenderAll();
      this.emit('shape:cancelled', { type: 'star' });
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
   * Generate star points
   * @param {number} cx - Center X
   * @param {number} cy - Center Y
   * @param {number} outerRadius - Outer radius
   * @param {number} numPoints - Number of star points
   * @param {number} innerRatio - Inner radius as ratio of outer
   * @param {number} rotation - Rotation angle in radians
   * @returns {Array<{x: number, y: number}>}
   */
  generateStarPoints(cx, cy, outerRadius, numPoints, innerRatio = 0.4, rotation = -Math.PI / 2) {
    const points = [];
    const innerRadius = outerRadius * innerRatio;
    const angleStep = Math.PI / numPoints;

    for (let i = 0; i < numPoints * 2; i++) {
      const angle = rotation + i * angleStep;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      points.push({
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle)
      });
    }

    return points;
  }

  /**
   * Update star points during drawing
   */
  updateStarPoints() {
    if (!this.currentStar || !this.isDragging) return;

    const { radius, angle } = this.calculateRadiusAndAngle();
    const starPoints = this.generateStarPoints(0, 0, radius, this.points, this.innerRadiusRatio, angle);

    this.currentStar.set({ points: starPoints });
    this.currentStar.setCoords();
    this.canvas?.requestRenderAll();

    this.emit('star:config:changed', {
      points: this.points,
      innerRadiusRatio: this.innerRadiusRatio
    });
  }

  /**
   * Set the number of points for new stars
   * @param {number} points
   */
  setPoints(points) {
    this.points = Math.max(3, Math.min(12, points));
    this.emit('star:points:set', { points: this.points });
  }

  /**
   * Set the inner radius ratio
   * @param {number} ratio
   */
  setInnerRadiusRatio(ratio) {
    this.innerRadiusRatio = Math.max(0.1, Math.min(0.9, ratio));
    this.emit('star:innerRadius:set', { ratio: this.innerRadiusRatio });
  }

  /**
   * Create a star with specific parameters
   * @param {number} centerX - Center X
   * @param {number} centerY - Center Y
   * @param {number} radius - Outer radius
   * @param {number} points - Number of points
   * @param {number} innerRatio - Inner radius ratio
   * @param {Object} options - Additional options
   * @returns {fabric.Polygon}
   */
  createStar(centerX, centerY, radius, points = this.points, innerRatio = this.innerRadiusRatio, options = {}) {
    const starPoints = this.generateStarPoints(0, 0, radius, points, innerRatio);

    const star = new fabric.Polygon(starPoints, {
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

    this.canvas?.add(star);
    this.canvas?.requestRenderAll();

    this.emit('shape:created', { type: 'star', points, object: star });

    return star;
  }
}

export default StarTool;

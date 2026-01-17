/**
 * PencilTool - Freehand drawing tool
 * Creates smooth paths from freehand input
 */
import { BaseTool } from './BaseTool.js';
import * as fabric from 'fabric';

export class PencilTool extends BaseTool {
  constructor(editor) {
    super(editor);
    this.points = [];
    this.currentPath = null;
    this.smoothing = 0.3; // Path smoothing factor (0-1)
    this.minDistance = 3; // Minimum distance between points
  }

  get name() {
    return 'pencil';
  }

  get shortcut() {
    return 'n';
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
    this.points = [];
    if (this.currentPath) {
      this.canvas?.remove(this.currentPath);
      this.currentPath = null;
    }
    this.emit('tool:deactivated', { tool: this.name });
  }

  onMouseDown(e) {
    super.onMouseDown(e);

    if (!this.canvas) return;

    // Start collecting points
    this.points = [{ ...this.startPoint }];

    // Create initial path
    this.currentPath = new fabric.Path(`M ${this.startPoint.x} ${this.startPoint.y}`, {
      fill: 'transparent',
      stroke: '#000000',
      strokeWidth: 2,
      strokeLineCap: 'round',
      strokeLineJoin: 'round',
      strokeUniform: true,
      selectable: false,
      evented: false
    });

    this.canvas.add(this.currentPath);
    this.emit('pencil:start');
  }

  onMouseMove(e) {
    super.onMouseMove(e);

    if (!this.isDragging || !this.currentPath) return;

    const point = this.currentPoint;
    const lastPoint = this.points[this.points.length - 1];

    // Only add point if far enough from last point
    const distance = Math.hypot(point.x - lastPoint.x, point.y - lastPoint.y);
    if (distance < this.minDistance) return;

    this.points.push({ ...point });
    this.updatePath();
  }

  onMouseUp(e) {
    super.onMouseUp(e);

    if (!this.currentPath) return;

    // Simplify and smooth the path if we have enough points
    if (this.points.length > 2) {
      const smoothedPath = this.createSmoothedPath();

      // Remove the rough path
      this.canvas?.remove(this.currentPath);

      // Add the smoothed path
      this.currentPath = smoothedPath;
      this.canvas?.add(this.currentPath);

      // Make path selectable
      this.currentPath.set({
        selectable: true,
        evented: true
      });
      this.currentPath.setCoords();

      this.emit('pencil:complete', {
        path: this.currentPath,
        pointCount: this.points.length
      });
    } else {
      // Too few points - remove
      this.canvas?.remove(this.currentPath);
      this.emit('pencil:cancelled');
    }

    this.points = [];
    this.currentPath = null;
    this.canvas?.requestRenderAll();
  }

  onKeyDown(e) {
    // Cancel with Escape
    if (e.key === 'Escape' && this.currentPath) {
      this.canvas?.remove(this.currentPath);
      this.currentPath = null;
      this.points = [];
      this.isDragging = false;
      this.canvas?.requestRenderAll();
      this.emit('pencil:cancelled');
    }
  }

  /**
   * Update the path during drawing
   */
  updatePath() {
    if (!this.currentPath || this.points.length < 2) return;

    // Build simple line path for live preview
    let pathString = `M ${this.points[0].x} ${this.points[0].y}`;

    for (let i = 1; i < this.points.length; i++) {
      pathString += ` L ${this.points[i].x} ${this.points[i].y}`;
    }

    this.currentPath.set({ path: fabric.util.parsePath(pathString) });
    this.canvas?.requestRenderAll();
  }

  /**
   * Create a smoothed path from the collected points
   * @returns {fabric.Path}
   */
  createSmoothedPath() {
    // Simplify points first
    const simplified = this.simplifyPath(this.points, 2);

    // Create smooth bezier curves
    const pathString = this.pointsToBezier(simplified);

    return new fabric.Path(pathString, {
      fill: 'transparent',
      stroke: '#000000',
      strokeWidth: 2,
      strokeLineCap: 'round',
      strokeLineJoin: 'round',
      strokeUniform: true
    });
  }

  /**
   * Simplify path using Ramer-Douglas-Peucker algorithm
   * @param {Array} points - Array of points
   * @param {number} epsilon - Tolerance
   * @returns {Array}
   */
  simplifyPath(points, epsilon) {
    if (points.length < 3) return points;

    // Find the point with the maximum distance
    let dmax = 0;
    let index = 0;
    const end = points.length - 1;

    for (let i = 1; i < end; i++) {
      const d = this.perpendicularDistance(points[i], points[0], points[end]);
      if (d > dmax) {
        index = i;
        dmax = d;
      }
    }

    // If max distance is greater than epsilon, recursively simplify
    if (dmax > epsilon) {
      const left = this.simplifyPath(points.slice(0, index + 1), epsilon);
      const right = this.simplifyPath(points.slice(index), epsilon);

      return [...left.slice(0, -1), ...right];
    }

    return [points[0], points[end]];
  }

  /**
   * Calculate perpendicular distance from point to line
   * @param {Object} point - The point
   * @param {Object} lineStart - Line start point
   * @param {Object} lineEnd - Line end point
   * @returns {number}
   */
  perpendicularDistance(point, lineStart, lineEnd) {
    const dx = lineEnd.x - lineStart.x;
    const dy = lineEnd.y - lineStart.y;

    const norm = Math.hypot(dx, dy);
    if (norm === 0) return Math.hypot(point.x - lineStart.x, point.y - lineStart.y);

    return Math.abs(
      (dy * point.x - dx * point.y + lineEnd.x * lineStart.y - lineEnd.y * lineStart.x) / norm
    );
  }

  /**
   * Convert points to smooth bezier path
   * @param {Array} points - Array of points
   * @returns {string} - SVG path string
   */
  pointsToBezier(points) {
    if (points.length < 2) return '';
    if (points.length === 2) {
      return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
    }

    let path = `M ${points[0].x} ${points[0].y}`;

    // Use Catmull-Rom to Bezier conversion
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(0, i - 1)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(points.length - 1, i + 2)];

      // Calculate control points
      const cp1 = {
        x: p1.x + (p2.x - p0.x) * this.smoothing,
        y: p1.y + (p2.y - p0.y) * this.smoothing
      };

      const cp2 = {
        x: p2.x - (p3.x - p1.x) * this.smoothing,
        y: p2.y - (p3.y - p1.y) * this.smoothing
      };

      path += ` C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${p2.x} ${p2.y}`;
    }

    return path;
  }

  /**
   * Set the smoothing factor
   * @param {number} value - Smoothing factor (0-1)
   */
  setSmoothing(value) {
    this.smoothing = Math.max(0, Math.min(1, value));
    this.emit('pencil:smoothing:changed', { smoothing: this.smoothing });
  }

  /**
   * Set the minimum distance between points
   * @param {number} value - Minimum distance in pixels
   */
  setMinDistance(value) {
    this.minDistance = Math.max(1, value);
  }
}

export default PencilTool;

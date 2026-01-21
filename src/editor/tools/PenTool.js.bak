/**
 * PenTool - Draw Bezier paths point by point
 * Click to add anchor points, drag to create curves
 */
import { BaseTool } from './BaseTool.js';
import * as fabric from 'fabric';

export class PenTool extends BaseTool {
  constructor(editor) {
    super(editor);
    this.pathData = []; // Array of path commands
    this.currentPath = null;
    this.previewLine = null;
    this.pointMarkers = [];
    this.lastPoint = null;
    this.lastControlPoint = null;
    this.isDrawingCurve = false;
  }

  get name() {
    return 'pen';
  }

  get shortcut() {
    return 'p';
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
    this.finishPath();
    this.clearPreview();
    this.emit('tool:deactivated', { tool: this.name });
  }

  onMouseDown(e) {
    super.onMouseDown(e);

    if (!this.canvas) return;

    const point = this.startPoint;

    // Check if clicking on the first point to close path
    if (this.pathData.length > 0 && this.isNearFirstPoint(point)) {
      this.closePath();
      return;
    }

    // Check if double-click to finish open path
    if (e.e?.detail === 2 && this.pathData.length > 0) {
      this.finishPath();
      return;
    }

    // Start dragging to create curve
    this.isDrawingCurve = false;
  }

  onMouseMove(e) {
    super.onMouseMove(e);

    if (!this.canvas) return;

    const point = this.currentPoint;

    if (this.isDragging) {
      // Dragging after click - creating a curve
      this.isDrawingCurve = true;
      this.updateCurvePreview(point);
    } else {
      // Just moving - update preview line
      this.updatePreviewLine(point);
    }
  }

  onMouseUp(e) {
    const point = this.currentPoint;

    if (this.isDrawingCurve) {
      // Add curve point
      this.addCurvePoint(this.startPoint, point);
    } else {
      // Add straight line point
      this.addPoint(this.startPoint);
    }

    super.onMouseUp(e);
    this.isDrawingCurve = false;
  }

  onKeyDown(e) {
    // Enter or Escape to finish path
    if (e.key === 'Enter' || e.key === 'Escape') {
      if (this.pathData.length > 0) {
        this.finishPath();
      }
      e.preventDefault();
    }

    // Backspace to remove last point
    if (e.key === 'Backspace' && this.pathData.length > 0) {
      this.removeLastPoint();
      e.preventDefault();
    }
  }

  /**
   * Add a point (straight line)
   * @param {Object} point - {x, y}
   */
  addPoint(point) {
    if (this.pathData.length === 0) {
      // First point - move to
      this.pathData.push(['M', point.x, point.y]);
    } else {
      // Subsequent points - line to
      this.pathData.push(['L', point.x, point.y]);
    }

    this.lastPoint = point;
    this.lastControlPoint = null;

    this.addPointMarker(point);
    this.updatePath();

    this.emit('path:point:added', { point, type: 'line' });
  }

  /**
   * Add a curve point with control handles
   * @param {Object} anchor - Anchor point {x, y}
   * @param {Object} control - Control point {x, y}
   */
  addCurvePoint(anchor, control) {
    // Calculate reflected control point
    const dx = control.x - anchor.x;
    const dy = control.y - anchor.y;
    const reflectedControl = {
      x: anchor.x - dx,
      y: anchor.y - dy
    };

    if (this.pathData.length === 0) {
      // First point - move to
      this.pathData.push(['M', anchor.x, anchor.y]);
    } else if (this.lastControlPoint) {
      // Continue curve with smooth connection
      this.pathData.push([
        'C',
        this.lastControlPoint.x, this.lastControlPoint.y,
        reflectedControl.x, reflectedControl.y,
        anchor.x, anchor.y
      ]);
    } else {
      // Start curve from straight segment
      this.pathData.push([
        'C',
        this.lastPoint.x, this.lastPoint.y,
        reflectedControl.x, reflectedControl.y,
        anchor.x, anchor.y
      ]);
    }

    this.lastPoint = anchor;
    this.lastControlPoint = control;

    this.addPointMarker(anchor);
    this.updatePath();

    this.emit('path:point:added', { point: anchor, type: 'curve' });
  }

  /**
   * Remove the last point from the path
   */
  removeLastPoint() {
    if (this.pathData.length <= 1) {
      this.pathData = [];
      this.lastPoint = null;
      this.lastControlPoint = null;
    } else {
      this.pathData.pop();
      const lastCmd = this.pathData[this.pathData.length - 1];
      this.lastPoint = this.getPointFromCommand(lastCmd);
      this.lastControlPoint = null;
    }

    // Remove last marker
    if (this.pointMarkers.length > 0) {
      const marker = this.pointMarkers.pop();
      this.canvas?.remove(marker);
    }

    this.updatePath();
    this.emit('path:point:removed');
  }

  /**
   * Close the path by connecting to start
   */
  closePath() {
    if (this.pathData.length < 2) return;

    this.pathData.push(['Z']);
    this.finishPath(true);
  }

  /**
   * Finish and commit the current path
   * @param {boolean} closed - Whether path is closed
   */
  finishPath(closed = false) {
    if (this.pathData.length < 2) {
      this.clearPath();
      return;
    }

    // Create final path object
    if (this.currentPath) {
      this.currentPath.set({
        selectable: true,
        evented: true
      });
      this.currentPath.setCoords();
    }

    this.emit('path:created', {
      path: this.currentPath,
      closed
    });

    this.clearPath();
  }

  /**
   * Clear current path state
   */
  clearPath() {
    this.pathData = [];
    this.currentPath = null;
    this.lastPoint = null;
    this.lastControlPoint = null;
    this.clearPreview();
    this.clearMarkers();
    this.canvas?.requestRenderAll();
  }

  /**
   * Update the visual path on canvas
   */
  updatePath() {
    if (!this.canvas) return;

    // Remove old path
    if (this.currentPath) {
      this.canvas.remove(this.currentPath);
    }

    if (this.pathData.length < 1) return;

    // Create new path
    const pathString = this.pathData.map(cmd => cmd.join(' ')).join(' ');

    this.currentPath = new fabric.Path(pathString, {
      fill: 'transparent',
      stroke: '#000000',
      strokeWidth: 2,
      strokeUniform: true,
      selectable: false,
      evented: false
    });

    this.canvas.add(this.currentPath);
    this.canvas.requestRenderAll();
  }

  /**
   * Update preview line from last point to cursor
   * @param {Object} point - Current cursor position
   */
  updatePreviewLine(point) {
    if (!this.canvas || !this.lastPoint) return;

    // Remove old preview
    if (this.previewLine) {
      this.canvas.remove(this.previewLine);
    }

    // Create dashed preview line
    this.previewLine = new fabric.Line(
      [this.lastPoint.x, this.lastPoint.y, point.x, point.y],
      {
        stroke: '#666666',
        strokeWidth: 1,
        strokeDashArray: [5, 5],
        selectable: false,
        evented: false
      }
    );

    this.canvas.add(this.previewLine);
    this.canvas.requestRenderAll();
  }

  /**
   * Update curve preview when dragging
   * @param {Object} controlPoint - Control point position
   */
  updateCurvePreview(controlPoint) {
    if (!this.canvas || !this.startPoint) return;

    this.clearPreview();

    // Draw control handles
    const reflected = {
      x: 2 * this.startPoint.x - controlPoint.x,
      y: 2 * this.startPoint.y - controlPoint.y
    };

    // Control handle lines
    const handleLine = new fabric.Line(
      [reflected.x, reflected.y, controlPoint.x, controlPoint.y],
      {
        stroke: '#0066ff',
        strokeWidth: 1,
        selectable: false,
        evented: false
      }
    );

    // Control points
    const cp1 = this.createControlPointMarker(controlPoint);
    const cp2 = this.createControlPointMarker(reflected);

    this.canvas.add(handleLine, cp1, cp2);
    this.previewLine = handleLine;

    this.canvas.requestRenderAll();
  }

  /**
   * Add visual marker for anchor point
   * @param {Object} point - Point position
   */
  addPointMarker(point) {
    if (!this.canvas) return;

    const marker = new fabric.Circle({
      left: point.x,
      top: point.y,
      radius: 4,
      fill: '#ffffff',
      stroke: '#0066ff',
      strokeWidth: 2,
      originX: 'center',
      originY: 'center',
      selectable: false,
      evented: false
    });

    this.canvas.add(marker);
    this.pointMarkers.push(marker);
  }

  /**
   * Create a control point marker
   * @param {Object} point - Point position
   * @returns {fabric.Circle}
   */
  createControlPointMarker(point) {
    return new fabric.Circle({
      left: point.x,
      top: point.y,
      radius: 3,
      fill: '#0066ff',
      stroke: '#ffffff',
      strokeWidth: 1,
      originX: 'center',
      originY: 'center',
      selectable: false,
      evented: false
    });
  }

  /**
   * Clear preview elements
   */
  clearPreview() {
    if (!this.canvas) return;

    if (this.previewLine) {
      this.canvas.remove(this.previewLine);
      this.previewLine = null;
    }

    // Remove any temporary preview objects
    this.canvas.getObjects().forEach(obj => {
      if (obj.isPreview) {
        this.canvas.remove(obj);
      }
    });
  }

  /**
   * Clear all point markers
   */
  clearMarkers() {
    if (!this.canvas) return;

    this.pointMarkers.forEach(marker => {
      this.canvas.remove(marker);
    });
    this.pointMarkers = [];
  }

  /**
   * Check if point is near the first point (for closing path)
   * @param {Object} point - Point to check
   * @returns {boolean}
   */
  isNearFirstPoint(point) {
    if (this.pathData.length < 2) return false;

    const firstCmd = this.pathData[0];
    const firstPoint = { x: firstCmd[1], y: firstCmd[2] };
    const distance = Math.hypot(point.x - firstPoint.x, point.y - firstPoint.y);

    return distance < 10; // 10px threshold
  }

  /**
   * Get anchor point from path command
   * @param {Array} cmd - Path command
   * @returns {Object} - {x, y}
   */
  getPointFromCommand(cmd) {
    const type = cmd[0];
    switch (type) {
      case 'M':
      case 'L':
        return { x: cmd[1], y: cmd[2] };
      case 'C':
        return { x: cmd[5], y: cmd[6] };
      case 'Q':
        return { x: cmd[3], y: cmd[4] };
      default:
        return null;
    }
  }
}

export default PenTool;

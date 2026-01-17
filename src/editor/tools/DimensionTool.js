/**
 * DimensionTool - Draw dimension lines with measurements
 * Useful for technical drawings and annotations
 */
import { BaseTool } from './BaseTool.js';
import * as fabric from 'fabric';

export class DimensionTool extends BaseTool {
  constructor(editor) {
    super(editor);
    this.currentDimension = null;
    this.unit = 'px'; // 'px', 'mm', 'cm', 'in'
    this.scale = 1; // pixels per unit
    this.precision = 0; // decimal places
    this.offset = 30; // distance from measured line
    this.isShiftHeld = false;
  }

  get name() {
    return 'dimension';
  }

  get shortcut() {
    return null;
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
    if (this.currentDimension) {
      this.canvas?.remove(this.currentDimension);
      this.currentDimension = null;
    }
    this.emit('tool:deactivated', { tool: this.name });
  }

  onMouseDown(e) {
    super.onMouseDown(e);

    if (!this.canvas) return;

    this.currentDimension = this.createDimensionShape(
      this.startPoint,
      this.startPoint
    );

    this.canvas.add(this.currentDimension);
    this.emit('shape:start', { type: 'dimension' });
  }

  onMouseMove(e) {
    super.onMouseMove(e);

    if (!this.isDragging || !this.currentDimension) return;

    const endPoint = this.calculateEndPoint();

    this.canvas?.remove(this.currentDimension);
    this.currentDimension = this.createDimensionShape(this.startPoint, endPoint);
    this.canvas?.add(this.currentDimension);

    this.canvas?.requestRenderAll();
  }

  onMouseUp(e) {
    super.onMouseUp(e);

    if (!this.currentDimension) return;

    const endPoint = this.calculateEndPoint();
    const length = Math.hypot(
      endPoint.x - this.startPoint.x,
      endPoint.y - this.startPoint.y
    );

    if (length < 10) {
      this.canvas?.remove(this.currentDimension);
      this.emit('shape:cancelled', { type: 'dimension' });
    } else {
      this.currentDimension.set({
        selectable: true,
        evented: true
      });
      this.currentDimension.setCoords();

      this.emit('shape:created', {
        type: 'dimension',
        object: this.currentDimension,
        measurement: this.calculateMeasurement(length)
      });
    }

    this.currentDimension = null;
    this.canvas?.requestRenderAll();
  }

  onKeyDown(e) {
    if (e.key === 'Shift') {
      this.isShiftHeld = true;
      if (this.isDragging) {
        this.updateDimension();
      }
    }

    if (e.key === 'Escape' && this.currentDimension) {
      this.canvas?.remove(this.currentDimension);
      this.currentDimension = null;
      this.isDragging = false;
      this.canvas?.requestRenderAll();
      this.emit('shape:cancelled', { type: 'dimension' });
    }
  }

  onKeyUp(e) {
    if (e.key === 'Shift') {
      this.isShiftHeld = false;
      if (this.isDragging) {
        this.updateDimension();
      }
    }
  }

  /**
   * Calculate end point with optional angle constraint
   * @returns {{x: number, y: number}}
   */
  calculateEndPoint() {
    if (!this.isShiftHeld) {
      return { ...this.currentPoint };
    }

    // Constrain to horizontal or vertical
    const dx = Math.abs(this.currentPoint.x - this.startPoint.x);
    const dy = Math.abs(this.currentPoint.y - this.startPoint.y);

    if (dx > dy) {
      return { x: this.currentPoint.x, y: this.startPoint.y };
    } else {
      return { x: this.startPoint.x, y: this.currentPoint.y };
    }
  }

  /**
   * Update dimension during drawing
   */
  updateDimension() {
    if (!this.currentDimension || !this.canvas) return;

    const endPoint = this.calculateEndPoint();

    this.canvas.remove(this.currentDimension);
    this.currentDimension = this.createDimensionShape(this.startPoint, endPoint);
    this.canvas.add(this.currentDimension);
    this.canvas.requestRenderAll();
  }

  /**
   * Create dimension line shape
   * @param {Object} start - Start point
   * @param {Object} end - End point
   * @returns {fabric.Group}
   */
  createDimensionShape(start, end) {
    const elements = [];

    // Calculate dimension line position (offset from measurement points)
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx);

    // Perpendicular direction for offset
    const perpX = -Math.sin(angle) * this.offset;
    const perpY = Math.cos(angle) * this.offset;

    // Dimension line endpoints
    const dimStart = { x: start.x + perpX, y: start.y + perpY };
    const dimEnd = { x: end.x + perpX, y: end.y + perpY };

    // Main dimension line
    const mainLine = new fabric.Line(
      [dimStart.x, dimStart.y, dimEnd.x, dimEnd.y],
      {
        stroke: '#000000',
        strokeWidth: 1
      }
    );
    elements.push(mainLine);

    // Extension lines
    const extStart = new fabric.Line(
      [start.x, start.y, dimStart.x + perpX * 0.2, dimStart.y + perpY * 0.2],
      {
        stroke: '#000000',
        strokeWidth: 1
      }
    );
    const extEnd = new fabric.Line(
      [end.x, end.y, dimEnd.x + perpX * 0.2, dimEnd.y + perpY * 0.2],
      {
        stroke: '#000000',
        strokeWidth: 1
      }
    );
    elements.push(extStart, extEnd);

    // Arrow heads
    const arrowSize = 8;
    const arrowAngle = Math.PI / 6;

    // Start arrow
    const startArrow = this.createArrowHead(dimStart, angle, arrowSize, arrowAngle);
    elements.push(startArrow);

    // End arrow
    const endArrow = this.createArrowHead(dimEnd, angle + Math.PI, arrowSize, arrowAngle);
    elements.push(endArrow);

    // Measurement text
    const measurement = this.calculateMeasurement(length);
    const textX = (dimStart.x + dimEnd.x) / 2;
    const textY = (dimStart.y + dimEnd.y) / 2;

    const text = new fabric.Text(measurement, {
      left: textX,
      top: textY - 12,
      fontSize: 12,
      fontFamily: 'Arial',
      fill: '#000000',
      originX: 'center',
      originY: 'bottom',
      angle: angle * (180 / Math.PI)
    });

    // Rotate text to be readable (not upside down)
    if (angle > Math.PI / 2 || angle < -Math.PI / 2) {
      text.set({
        angle: (angle + Math.PI) * (180 / Math.PI),
        top: textY + 12,
        originY: 'top'
      });
    }

    elements.push(text);

    const group = new fabric.Group(elements, {
      selectable: false,
      evented: false
    });

    group.dimensionData = {
      start: { ...start },
      end: { ...end },
      length,
      measurement,
      unit: this.unit
    };

    return group;
  }

  /**
   * Create arrow head for dimension line
   * @param {Object} tip - Arrow tip position
   * @param {number} lineAngle - Line direction angle
   * @param {number} size - Arrow size
   * @param {number} headAngle - Arrow head angle
   * @returns {fabric.Polygon}
   */
  createArrowHead(tip, lineAngle, size, headAngle) {
    const points = [
      { x: tip.x, y: tip.y },
      {
        x: tip.x + size * Math.cos(lineAngle - headAngle),
        y: tip.y + size * Math.sin(lineAngle - headAngle)
      },
      {
        x: tip.x + size * Math.cos(lineAngle + headAngle),
        y: tip.y + size * Math.sin(lineAngle + headAngle)
      }
    ];

    return new fabric.Polygon(points, {
      fill: '#000000',
      stroke: null
    });
  }

  /**
   * Calculate measurement string
   * @param {number} pixelLength - Length in pixels
   * @returns {string}
   */
  calculateMeasurement(pixelLength) {
    const value = pixelLength / this.scale;
    const formatted = value.toFixed(this.precision);
    return `${formatted} ${this.unit}`;
  }

  /**
   * Set measurement unit
   * @param {string} unit - 'px', 'mm', 'cm', 'in'
   */
  setUnit(unit) {
    this.unit = unit;
    this.emit('dimension:unit:changed', { unit });
  }

  /**
   * Set scale (pixels per unit)
   * @param {number} scale
   */
  setScale(scale) {
    this.scale = scale;
    this.emit('dimension:scale:changed', { scale });
  }

  /**
   * Set precision (decimal places)
   * @param {number} precision
   */
  setPrecision(precision) {
    this.precision = Math.max(0, Math.min(4, precision));
    this.emit('dimension:precision:changed', { precision: this.precision });
  }

  /**
   * Set offset distance
   * @param {number} offset
   */
  setOffset(offset) {
    this.offset = offset;
    this.emit('dimension:offset:changed', { offset });
  }
}

export default DimensionTool;

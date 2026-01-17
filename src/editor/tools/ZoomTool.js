/**
 * ZoomTool - Zoom in and out of the canvas
 * Click to zoom in, Alt+Click to zoom out
 * Drag to marquee zoom
 */
import { BaseTool } from './BaseTool.js';
import * as fabric from 'fabric';

export class ZoomTool extends BaseTool {
  constructor(editor) {
    super(editor);
    this.zoomRect = null;
    this.minZoom = 0.1;
    this.maxZoom = 10;
    this.zoomStep = 1.2;
    this.isAltHeld = false;
  }

  get name() {
    return 'zoom';
  }

  get shortcut() {
    return 'z';
  }

  getCursor() {
    return this.isAltHeld ? 'zoom-out' : 'zoom-in';
  }

  onActivate() {
    if (this.canvas) {
      this.canvas.selection = false;
      this.canvas.forEachObject((obj) => {
        obj.selectable = false;
        obj.evented = false;
      });
      this.canvas.defaultCursor = 'zoom-in';
      this.canvas.hoverCursor = 'zoom-in';
    }
    this.emit('tool:activated', { tool: this.name });
  }

  onDeactivate() {
    if (this.zoomRect) {
      this.canvas?.remove(this.zoomRect);
      this.zoomRect = null;
    }
    if (this.canvas) {
      this.canvas.defaultCursor = 'default';
    }
    this.emit('tool:deactivated', { tool: this.name });
  }

  onMouseDown(e) {
    super.onMouseDown(e);

    if (!this.canvas) return;

    // Create selection rectangle for marquee zoom
    this.zoomRect = new fabric.Rect({
      left: this.startPoint.x,
      top: this.startPoint.y,
      width: 0,
      height: 0,
      fill: 'rgba(0, 102, 255, 0.1)',
      stroke: '#0066ff',
      strokeWidth: 1,
      strokeDashArray: [5, 5],
      selectable: false,
      evented: false
    });

    this.canvas.add(this.zoomRect);
  }

  onMouseMove(e) {
    super.onMouseMove(e);

    if (!this.isDragging || !this.zoomRect) return;

    const { left, top, width, height } = this.getBoundingBox(
      this.startPoint,
      this.currentPoint
    );

    this.zoomRect.set({ left, top, width, height });
    this.canvas?.requestRenderAll();
  }

  onMouseUp(e) {
    const wasAltHeld = this.isAltHeld;
    const zoomRect = this.zoomRect;
    const width = zoomRect?.width || 0;
    const height = zoomRect?.height || 0;

    // Remove zoom rectangle
    if (zoomRect) {
      this.canvas?.remove(zoomRect);
      this.zoomRect = null;
    }

    if (width > 10 && height > 10) {
      // Marquee zoom
      this.zoomToRect(
        this.getBoundingBox(this.startPoint, this.currentPoint)
      );
    } else {
      // Click zoom
      const point = this.startPoint;
      if (wasAltHeld) {
        this.zoomOut(point);
      } else {
        this.zoomIn(point);
      }
    }

    super.onMouseUp(e);
    this.canvas?.requestRenderAll();
  }

  onKeyDown(e) {
    if (e.key === 'Alt') {
      this.isAltHeld = true;
      if (this.canvas) {
        this.canvas.defaultCursor = 'zoom-out';
        this.canvas.hoverCursor = 'zoom-out';
      }
    }

    // Keyboard shortcuts
    if (e.key === '+' || e.key === '=') {
      this.zoomIn();
      e.preventDefault();
    }
    if (e.key === '-' || e.key === '_') {
      this.zoomOut();
      e.preventDefault();
    }
    if (e.key === '0') {
      this.zoomToFit();
      e.preventDefault();
    }
    if (e.key === '1') {
      this.zoomTo(1);
      e.preventDefault();
    }
  }

  onKeyUp(e) {
    if (e.key === 'Alt') {
      this.isAltHeld = false;
      if (this.canvas) {
        this.canvas.defaultCursor = 'zoom-in';
        this.canvas.hoverCursor = 'zoom-in';
      }
    }
  }

  /**
   * Zoom in at point
   * @param {Object} point - Optional point to zoom towards
   */
  zoomIn(point = null) {
    const currentZoom = this.canvas?.getZoom() || 1;
    const newZoom = Math.min(this.maxZoom, currentZoom * this.zoomStep);
    this.zoomToPoint(newZoom, point);
  }

  /**
   * Zoom out from point
   * @param {Object} point - Optional point to zoom from
   */
  zoomOut(point = null) {
    const currentZoom = this.canvas?.getZoom() || 1;
    const newZoom = Math.max(this.minZoom, currentZoom / this.zoomStep);
    this.zoomToPoint(newZoom, point);
  }

  /**
   * Zoom to specific level
   * @param {number} zoom - Zoom level (1 = 100%)
   * @param {Object} point - Optional point to zoom towards
   */
  zoomTo(zoom, point = null) {
    const clampedZoom = Math.max(this.minZoom, Math.min(this.maxZoom, zoom));
    this.zoomToPoint(clampedZoom, point);
  }

  /**
   * Zoom to point with animation
   * @param {number} zoom - Target zoom level
   * @param {Object} point - Point to zoom towards (canvas coordinates)
   */
  zoomToPoint(zoom, point = null) {
    if (!this.canvas) return;

    if (point) {
      this.canvas.zoomToPoint(new fabric.Point(point.x, point.y), zoom);
    } else {
      // Zoom to center
      const center = this.canvas.getCenter();
      this.canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoom);
    }

    this.canvas.requestRenderAll();
    this.emit('zoom:changed', { zoom, point });
  }

  /**
   * Zoom to fit rectangle
   * @param {Object} rect - {left, top, width, height}
   */
  zoomToRect(rect) {
    if (!this.canvas) return;

    const canvasWidth = this.canvas.getWidth();
    const canvasHeight = this.canvas.getHeight();

    // Calculate zoom to fit rectangle
    const zoomX = canvasWidth / rect.width;
    const zoomY = canvasHeight / rect.height;
    const zoom = Math.min(zoomX, zoomY, this.maxZoom) * 0.9; // 90% to leave margin

    // Center point of rectangle
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Apply zoom and pan
    this.canvas.setZoom(zoom);

    const vpt = this.canvas.viewportTransform.slice();
    vpt[4] = canvasWidth / 2 - centerX * zoom;
    vpt[5] = canvasHeight / 2 - centerY * zoom;
    this.canvas.setViewportTransform(vpt);

    this.canvas.requestRenderAll();

    this.emit('zoom:toRect', { rect, zoom });
  }

  /**
   * Zoom to fit all objects on canvas
   */
  zoomToFit() {
    if (!this.canvas) return;

    const objects = this.canvas.getObjects();
    if (objects.length === 0) {
      this.zoomTo(1);
      return;
    }

    // Get bounding box of all objects
    let minX = Infinity, minY = Infinity;
    let maxX = -Infinity, maxY = -Infinity;

    objects.forEach(obj => {
      const bound = obj.getBoundingRect();
      minX = Math.min(minX, bound.left);
      minY = Math.min(minY, bound.top);
      maxX = Math.max(maxX, bound.left + bound.width);
      maxY = Math.max(maxY, bound.top + bound.height);
    });

    const padding = 50;
    this.zoomToRect({
      left: minX - padding,
      top: minY - padding,
      width: maxX - minX + padding * 2,
      height: maxY - minY + padding * 2
    });

    this.emit('zoom:fit');
  }

  /**
   * Zoom to selection
   */
  zoomToSelection() {
    if (!this.canvas) return;

    const activeObject = this.canvas.getActiveObject();
    if (!activeObject) return;

    const bound = activeObject.getBoundingRect();
    const padding = 50;

    this.zoomToRect({
      left: bound.left - padding,
      top: bound.top - padding,
      width: bound.width + padding * 2,
      height: bound.height + padding * 2
    });

    this.emit('zoom:selection');
  }

  /**
   * Get current zoom level
   * @returns {number}
   */
  getZoom() {
    return this.canvas?.getZoom() || 1;
  }

  /**
   * Get zoom percentage string
   * @returns {string}
   */
  getZoomPercent() {
    return `${Math.round(this.getZoom() * 100)}%`;
  }

  /**
   * Set zoom limits
   * @param {number} min - Minimum zoom level
   * @param {number} max - Maximum zoom level
   */
  setZoomLimits(min, max) {
    this.minZoom = min;
    this.maxZoom = max;
  }
}

export default ZoomTool;

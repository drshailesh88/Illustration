/**
 * HandTool - Pan the canvas view
 * Click and drag to pan around the canvas
 */
import { BaseTool } from './BaseTool.js';

export class HandTool extends BaseTool {
  constructor(editor) {
    super(editor);
    this.lastPanPoint = null;
    this.isPanning = false;
  }

  get name() {
    return 'hand';
  }

  get shortcut() {
    return 'h';
  }

  getCursor() {
    return this.isPanning ? 'grabbing' : 'grab';
  }

  onActivate() {
    if (this.canvas) {
      this.canvas.selection = false;
      this.canvas.forEachObject((obj) => {
        obj.selectable = false;
        obj.evented = false;
      });
      this.canvas.defaultCursor = 'grab';
      this.canvas.hoverCursor = 'grab';
    }
    this.emit('tool:activated', { tool: this.name });
  }

  onDeactivate() {
    this.isPanning = false;
    this.lastPanPoint = null;
    if (this.canvas) {
      this.canvas.defaultCursor = 'default';
    }
    this.emit('tool:deactivated', { tool: this.name });
  }

  onMouseDown(e) {
    super.onMouseDown(e);

    if (!this.canvas) return;

    this.isPanning = true;
    this.lastPanPoint = {
      x: e.e.clientX,
      y: e.e.clientY
    };

    this.canvas.defaultCursor = 'grabbing';
    this.canvas.hoverCursor = 'grabbing';

    this.emit('pan:start');
  }

  onMouseMove(e) {
    super.onMouseMove(e);

    if (!this.isPanning || !this.lastPanPoint || !this.canvas) return;

    const currentPoint = {
      x: e.e.clientX,
      y: e.e.clientY
    };

    // Calculate pan delta
    const deltaX = currentPoint.x - this.lastPanPoint.x;
    const deltaY = currentPoint.y - this.lastPanPoint.y;

    // Get current viewport transform
    const vpt = this.canvas.viewportTransform.slice();

    // Apply pan
    vpt[4] += deltaX;
    vpt[5] += deltaY;

    this.canvas.setViewportTransform(vpt);
    this.canvas.requestRenderAll();

    this.lastPanPoint = currentPoint;

    this.emit('pan:move', { deltaX, deltaY });
  }

  onMouseUp(e) {
    super.onMouseUp(e);

    if (!this.canvas) return;

    this.isPanning = false;
    this.lastPanPoint = null;

    this.canvas.defaultCursor = 'grab';
    this.canvas.hoverCursor = 'grab';

    this.emit('pan:end');
  }

  onKeyDown(e) {
    // Space key temporarily activates hand tool behavior
    // This is typically handled at the editor level
  }

  /**
   * Pan to specific position
   * @param {number} x - X position to center on
   * @param {number} y - Y position to center on
   * @param {boolean} animate - Whether to animate the pan
   */
  panTo(x, y, animate = false) {
    if (!this.canvas) return;

    const zoom = this.canvas.getZoom();
    const center = this.canvas.getCenter();

    const targetX = center.left - x * zoom;
    const targetY = center.top - y * zoom;

    if (animate) {
      this.animatePan(targetX, targetY);
    } else {
      const vpt = this.canvas.viewportTransform.slice();
      vpt[4] = targetX;
      vpt[5] = targetY;
      this.canvas.setViewportTransform(vpt);
      this.canvas.requestRenderAll();
    }

    this.emit('pan:to', { x, y });
  }

  /**
   * Pan by a delta amount
   * @param {number} deltaX - X delta
   * @param {number} deltaY - Y delta
   */
  panBy(deltaX, deltaY) {
    if (!this.canvas) return;

    const vpt = this.canvas.viewportTransform.slice();
    vpt[4] += deltaX;
    vpt[5] += deltaY;

    this.canvas.setViewportTransform(vpt);
    this.canvas.requestRenderAll();

    this.emit('pan:by', { deltaX, deltaY });
  }

  /**
   * Animate pan to position
   * @param {number} targetX - Target X
   * @param {number} targetY - Target Y
   */
  animatePan(targetX, targetY) {
    if (!this.canvas) return;

    const vpt = this.canvas.viewportTransform;
    const startX = vpt[4];
    const startY = vpt[5];
    const duration = 300;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);

      const currentX = startX + (targetX - startX) * eased;
      const currentY = startY + (targetY - startY) * eased;

      const newVpt = this.canvas.viewportTransform.slice();
      newVpt[4] = currentX;
      newVpt[5] = currentY;

      this.canvas.setViewportTransform(newVpt);
      this.canvas.requestRenderAll();

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  /**
   * Reset pan to origin
   * @param {boolean} animate - Whether to animate
   */
  resetPan(animate = true) {
    this.panTo(0, 0, animate);
    this.emit('pan:reset');
  }

  /**
   * Get current pan position
   * @returns {{x: number, y: number}}
   */
  getPanPosition() {
    if (!this.canvas) return { x: 0, y: 0 };

    const vpt = this.canvas.viewportTransform;
    return {
      x: -vpt[4] / this.canvas.getZoom(),
      y: -vpt[5] / this.canvas.getZoom()
    };
  }
}

export default HandTool;

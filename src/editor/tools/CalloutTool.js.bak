/**
 * CalloutTool - Create speech bubbles and callout shapes
 * Click to place, drag to size
 */
import { BaseTool } from './BaseTool.js';
import * as fabric from 'fabric';

export class CalloutTool extends BaseTool {
  constructor(editor) {
    super(editor);
    this.currentCallout = null;
    this.calloutStyle = 'rounded'; // 'rounded', 'rectangular', 'cloud'
    this.tailPosition = 'bottom-left';
  }

  get name() {
    return 'callout';
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
    if (this.currentCallout) {
      this.canvas?.remove(this.currentCallout);
      this.currentCallout = null;
    }
    this.emit('tool:deactivated', { tool: this.name });
  }

  onMouseDown(e) {
    super.onMouseDown(e);

    if (!this.canvas) return;

    // Create initial callout
    this.currentCallout = this.createCalloutShape(
      this.startPoint.x,
      this.startPoint.y,
      100,
      60
    );

    this.canvas.add(this.currentCallout);
    this.emit('shape:start', { type: 'callout' });
  }

  onMouseMove(e) {
    super.onMouseMove(e);

    if (!this.isDragging || !this.currentCallout) return;

    const { left, top, width, height } = this.getBoundingBox(this.startPoint, this.currentPoint);

    // Remove old and create new
    this.canvas?.remove(this.currentCallout);
    this.currentCallout = this.createCalloutShape(left, top, Math.max(50, width), Math.max(30, height));
    this.canvas?.add(this.currentCallout);

    this.canvas?.requestRenderAll();
  }

  onMouseUp(e) {
    super.onMouseUp(e);

    if (!this.currentCallout) return;

    const { width, height } = this.getBoundingBox(this.startPoint, this.currentPoint);

    // Only keep if meaningful size
    if (width < 20 && height < 20) {
      this.canvas?.remove(this.currentCallout);
      this.emit('shape:cancelled', { type: 'callout' });
    } else {
      this.currentCallout.set({
        selectable: true,
        evented: true
      });
      this.currentCallout.setCoords();

      this.emit('shape:created', {
        type: 'callout',
        object: this.currentCallout
      });
    }

    this.currentCallout = null;
    this.canvas?.requestRenderAll();
  }

  onKeyDown(e) {
    // Cycle through styles with 's'
    if (e.key === 's' && this.isDragging) {
      const styles = ['rounded', 'rectangular', 'cloud'];
      const currentIndex = styles.indexOf(this.calloutStyle);
      this.calloutStyle = styles[(currentIndex + 1) % styles.length];
      this.updateCallout();
    }

    // Cancel with Escape
    if (e.key === 'Escape' && this.currentCallout) {
      this.canvas?.remove(this.currentCallout);
      this.currentCallout = null;
      this.isDragging = false;
      this.canvas?.requestRenderAll();
      this.emit('shape:cancelled', { type: 'callout' });
    }
  }

  /**
   * Update callout during drawing
   */
  updateCallout() {
    if (!this.currentCallout || !this.canvas) return;

    const bounds = this.currentCallout.getBoundingRect();

    this.canvas.remove(this.currentCallout);
    this.currentCallout = this.createCalloutShape(
      bounds.left,
      bounds.top,
      bounds.width,
      bounds.height
    );
    this.canvas.add(this.currentCallout);
    this.canvas.requestRenderAll();
  }

  /**
   * Create callout shape based on current style
   * @param {number} x - X position
   * @param {number} y - Y position
   * @param {number} width - Width
   * @param {number} height - Height
   * @returns {fabric.Path|fabric.Group}
   */
  createCalloutShape(x, y, width, height) {
    let pathString;
    const tailSize = Math.min(20, width * 0.2);
    const radius = Math.min(10, width * 0.1, height * 0.1);

    switch (this.calloutStyle) {
      case 'rectangular':
        pathString = this.createRectangularCallout(x, y, width, height, tailSize);
        break;
      case 'cloud':
        return this.createCloudCallout(x, y, width, height);
      case 'rounded':
      default:
        pathString = this.createRoundedCallout(x, y, width, height, radius, tailSize);
        break;
    }

    return new fabric.Path(pathString, {
      fill: '#ffffff',
      stroke: '#000000',
      strokeWidth: 2,
      strokeUniform: true,
      selectable: false,
      evented: false
    });
  }

  /**
   * Create rounded callout path
   * @returns {string}
   */
  createRoundedCallout(x, y, w, h, r, tailSize) {
    const tailX = x + tailSize;
    const tailY = y + h + tailSize;

    return `
      M ${x + r} ${y}
      L ${x + w - r} ${y}
      Q ${x + w} ${y} ${x + w} ${y + r}
      L ${x + w} ${y + h - r}
      Q ${x + w} ${y + h} ${x + w - r} ${y + h}
      L ${x + tailSize + 15} ${y + h}
      L ${tailX} ${tailY}
      L ${x + tailSize - 5} ${y + h}
      L ${x + r} ${y + h}
      Q ${x} ${y + h} ${x} ${y + h - r}
      L ${x} ${y + r}
      Q ${x} ${y} ${x + r} ${y}
      Z
    `;
  }

  /**
   * Create rectangular callout path
   * @returns {string}
   */
  createRectangularCallout(x, y, w, h, tailSize) {
    const tailX = x + tailSize;
    const tailY = y + h + tailSize;

    return `
      M ${x} ${y}
      L ${x + w} ${y}
      L ${x + w} ${y + h}
      L ${x + tailSize + 15} ${y + h}
      L ${tailX} ${tailY}
      L ${x + tailSize - 5} ${y + h}
      L ${x} ${y + h}
      Z
    `;
  }

  /**
   * Create cloud-style callout
   * @returns {fabric.Group}
   */
  createCloudCallout(x, y, width, height) {
    const elements = [];

    // Create cloud bumps
    const numBumpsH = Math.max(3, Math.floor(width / 30));
    const numBumpsV = Math.max(2, Math.floor(height / 30));
    const bumpRadiusH = width / (numBumpsH * 1.5);
    const bumpRadiusV = height / (numBumpsV * 1.5);

    // Main body (filled)
    const body = new fabric.Rect({
      left: x + bumpRadiusH / 2,
      top: y + bumpRadiusV / 2,
      width: width - bumpRadiusH,
      height: height - bumpRadiusV,
      fill: '#ffffff',
      stroke: null
    });
    elements.push(body);

    // Top bumps
    for (let i = 0; i < numBumpsH; i++) {
      const cx = x + (i + 0.5) * (width / numBumpsH);
      const cy = y;
      elements.push(new fabric.Ellipse({
        left: cx,
        top: cy,
        rx: bumpRadiusH,
        ry: bumpRadiusV * 0.8,
        fill: '#ffffff',
        stroke: '#000000',
        strokeWidth: 2,
        originX: 'center',
        originY: 'center'
      }));
    }

    // Bottom bumps
    for (let i = 0; i < numBumpsH; i++) {
      const cx = x + (i + 0.5) * (width / numBumpsH);
      const cy = y + height;
      elements.push(new fabric.Ellipse({
        left: cx,
        top: cy,
        rx: bumpRadiusH,
        ry: bumpRadiusV * 0.8,
        fill: '#ffffff',
        stroke: '#000000',
        strokeWidth: 2,
        originX: 'center',
        originY: 'center'
      }));
    }

    // Side bumps
    for (let i = 0; i < numBumpsV; i++) {
      const cy = y + (i + 0.5) * (height / numBumpsV);

      // Left
      elements.push(new fabric.Ellipse({
        left: x,
        top: cy,
        rx: bumpRadiusH * 0.8,
        ry: bumpRadiusV,
        fill: '#ffffff',
        stroke: '#000000',
        strokeWidth: 2,
        originX: 'center',
        originY: 'center'
      }));

      // Right
      elements.push(new fabric.Ellipse({
        left: x + width,
        top: cy,
        rx: bumpRadiusH * 0.8,
        ry: bumpRadiusV,
        fill: '#ffffff',
        stroke: '#000000',
        strokeWidth: 2,
        originX: 'center',
        originY: 'center'
      }));
    }

    // Tail bubbles
    const tailBubbles = [
      { x: x + 20, y: y + height + 15, r: 8 },
      { x: x + 10, y: y + height + 28, r: 5 },
      { x: x + 5, y: y + height + 38, r: 3 }
    ];

    tailBubbles.forEach(b => {
      elements.push(new fabric.Circle({
        left: b.x,
        top: b.y,
        radius: b.r,
        fill: '#ffffff',
        stroke: '#000000',
        strokeWidth: 2,
        originX: 'center',
        originY: 'center'
      }));
    });

    const group = new fabric.Group(elements, {
      selectable: false,
      evented: false
    });

    group.calloutData = {
      style: 'cloud',
      width,
      height
    };

    return group;
  }

  /**
   * Set callout style
   * @param {string} style - 'rounded', 'rectangular', 'cloud'
   */
  setStyle(style) {
    if (['rounded', 'rectangular', 'cloud'].includes(style)) {
      this.calloutStyle = style;
      this.emit('callout:style:changed', { style });
    }
  }

  /**
   * Set tail position
   * @param {string} position - e.g., 'bottom-left', 'bottom-right', 'top-left'
   */
  setTailPosition(position) {
    this.tailPosition = position;
    this.emit('callout:tail:changed', { position });
  }
}

export default CalloutTool;

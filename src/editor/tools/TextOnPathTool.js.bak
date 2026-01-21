/**
 * TextOnPathTool - Create text that follows a path
 * First draw or select a path, then add text to it
 */
import { BaseTool } from './BaseTool.js';
import * as fabric from 'fabric';

export class TextOnPathTool extends BaseTool {
  constructor(editor) {
    super(editor);
    this.selectedPath = null;
    this.textOnPath = null;
    this.defaultFontFamily = 'Arial';
    this.defaultFontSize = 18;
    this.defaultFill = '#000000';
  }

  get name() {
    return 'text-on-path';
  }

  get shortcut() {
    return null; // No default shortcut
  }

  getCursor() {
    return 'text';
  }

  onActivate() {
    if (this.canvas) {
      this.canvas.selection = false;
      // Only allow selecting path objects
      this.canvas.forEachObject((obj) => {
        obj.selectable = obj.type === 'path';
        obj.evented = obj.type === 'path';
      });
    }
    this.emit('tool:activated', { tool: this.name });
  }

  onDeactivate() {
    this.selectedPath = null;
    this.textOnPath = null;
    this.emit('tool:deactivated', { tool: this.name });
  }

  onMouseDown(e) {
    super.onMouseDown(e);

    if (!this.canvas) return;

    const target = e.target;

    if (target && target.type === 'path') {
      // Selected a path - create text on it
      this.selectedPath = target;
      this.createTextOnPath();
    }
  }

  onMouseMove(e) {
    super.onMouseMove(e);
    // Highlight paths on hover
    if (!this.canvas) return;

    const target = this.canvas.findTarget(e.e);
    if (target && target.type === 'path') {
      this.canvas.defaultCursor = 'pointer';
    } else {
      this.canvas.defaultCursor = this.getCursor();
    }
  }

  onMouseUp(e) {
    super.onMouseUp(e);
  }

  /**
   * Create text on the selected path
   */
  createTextOnPath() {
    if (!this.canvas || !this.selectedPath) return;

    // Get the path string
    const pathString = this.selectedPath.path
      .map(cmd => cmd.join(' '))
      .join(' ');

    // Create text on path using a group
    const text = 'Text on path';

    // For fabric.js, we need to create a custom implementation
    // This creates positioned text characters along the path
    this.textOnPath = this.createTextAlongPath(text, this.selectedPath);

    if (this.textOnPath) {
      this.canvas.add(this.textOnPath);
      this.canvas.requestRenderAll();

      this.emit('text-on-path:created', {
        text: this.textOnPath,
        path: this.selectedPath
      });
    }
  }

  /**
   * Create text positioned along a path
   * @param {string} text - Text to place
   * @param {fabric.Path} path - Path to follow
   * @returns {fabric.Group}
   */
  createTextAlongPath(text, path) {
    const pathLength = this.getPathLength(path);
    const charSpacing = this.defaultFontSize * 0.6;
    const totalTextWidth = text.length * charSpacing;

    // Start position along path (centered)
    let startOffset = (pathLength - totalTextWidth) / 2;
    startOffset = Math.max(0, startOffset);

    const chars = [];

    for (let i = 0; i < text.length; i++) {
      const offset = startOffset + i * charSpacing;
      const point = this.getPointAtLength(path, offset);
      const angle = this.getAngleAtLength(path, offset);

      if (point) {
        const char = new fabric.Text(text[i], {
          left: point.x,
          top: point.y,
          fontSize: this.defaultFontSize,
          fontFamily: this.defaultFontFamily,
          fill: this.defaultFill,
          originX: 'center',
          originY: 'center',
          angle: angle * (180 / Math.PI)
        });
        chars.push(char);
      }
    }

    if (chars.length === 0) return null;

    // Group all characters
    const group = new fabric.Group(chars, {
      selectable: true,
      evented: true
    });

    // Store reference to original path
    group.textOnPathData = {
      text: text,
      pathId: path.id || Date.now()
    };

    return group;
  }

  /**
   * Get approximate path length
   * @param {fabric.Path} path
   * @returns {number}
   */
  getPathLength(path) {
    // Approximate path length by sampling
    let length = 0;
    let lastPoint = null;
    const samples = 100;

    for (let i = 0; i <= samples; i++) {
      const t = i / samples;
      const point = this.getPointAtT(path, t);

      if (lastPoint && point) {
        length += Math.hypot(point.x - lastPoint.x, point.y - lastPoint.y);
      }
      lastPoint = point;
    }

    return length;
  }

  /**
   * Get point at specific length along path
   * @param {fabric.Path} path
   * @param {number} targetLength
   * @returns {{x: number, y: number}|null}
   */
  getPointAtLength(path, targetLength) {
    let length = 0;
    let lastPoint = this.getPointAtT(path, 0);
    const samples = 200;

    for (let i = 1; i <= samples; i++) {
      const t = i / samples;
      const point = this.getPointAtT(path, t);

      if (lastPoint && point) {
        const segmentLength = Math.hypot(point.x - lastPoint.x, point.y - lastPoint.y);

        if (length + segmentLength >= targetLength) {
          // Interpolate to exact position
          const ratio = (targetLength - length) / segmentLength;
          return {
            x: lastPoint.x + (point.x - lastPoint.x) * ratio,
            y: lastPoint.y + (point.y - lastPoint.y) * ratio
          };
        }

        length += segmentLength;
      }
      lastPoint = point;
    }

    return lastPoint;
  }

  /**
   * Get angle at specific length along path
   * @param {fabric.Path} path
   * @param {number} targetLength
   * @returns {number}
   */
  getAngleAtLength(path, targetLength) {
    const p1 = this.getPointAtLength(path, targetLength - 1);
    const p2 = this.getPointAtLength(path, targetLength + 1);

    if (p1 && p2) {
      return Math.atan2(p2.y - p1.y, p2.x - p1.x);
    }

    return 0;
  }

  /**
   * Get point at parameter t (0-1) along path
   * @param {fabric.Path} path
   * @param {number} t
   * @returns {{x: number, y: number}|null}
   */
  getPointAtT(path, t) {
    const pathData = path.path;
    if (!pathData || pathData.length === 0) return null;

    // Simplified: treats path as series of line segments
    const transform = path.calcTransformMatrix();
    const totalSegments = pathData.length - 1;
    const targetSegment = Math.floor(t * totalSegments);
    const segmentT = (t * totalSegments) - targetSegment;

    let currentPoint = null;

    for (let i = 0; i <= Math.min(targetSegment + 1, pathData.length - 1); i++) {
      const cmd = pathData[i];
      const type = cmd[0];

      let newPoint = null;

      switch (type) {
        case 'M':
        case 'L':
          newPoint = { x: cmd[1], y: cmd[2] };
          break;
        case 'C':
          newPoint = { x: cmd[5], y: cmd[6] };
          break;
        case 'Q':
          newPoint = { x: cmd[3], y: cmd[4] };
          break;
      }

      if (i === targetSegment && currentPoint && newPoint) {
        // Interpolate within this segment
        const point = {
          x: currentPoint.x + (newPoint.x - currentPoint.x) * segmentT,
          y: currentPoint.y + (newPoint.y - currentPoint.y) * segmentT
        };

        // Apply path transform
        return fabric.util.transformPoint(point, transform);
      }

      if (newPoint) {
        currentPoint = newPoint;
      }
    }

    if (currentPoint) {
      return fabric.util.transformPoint(currentPoint, transform);
    }

    return null;
  }

  /**
   * Update text content on path
   * @param {string} newText
   */
  updateText(newText) {
    if (!this.textOnPath || !this.selectedPath) return;

    this.canvas?.remove(this.textOnPath);
    this.textOnPath = this.createTextAlongPath(newText, this.selectedPath);

    if (this.textOnPath) {
      this.canvas?.add(this.textOnPath);
      this.canvas?.requestRenderAll();
    }
  }
}

export default TextOnPathTool;

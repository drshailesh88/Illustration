/**
 * BracketTool - Draw curly braces and brackets for annotations
 * Useful for grouping items or indicating spans
 */
import { BaseTool } from './BaseTool.js';
import * as fabric from 'fabric';

export class BracketTool extends BaseTool {
  constructor(editor) {
    super(editor);
    this.currentBracket = null;
    this.bracketStyle = 'curly'; // 'curly', 'square', 'round'
    this.orientation = 'horizontal'; // 'horizontal' or 'vertical'
    this.isShiftHeld = false;
  }

  get name() {
    return 'bracket';
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
    if (this.currentBracket) {
      this.canvas?.remove(this.currentBracket);
      this.currentBracket = null;
    }
    this.emit('tool:deactivated', { tool: this.name });
  }

  onMouseDown(e) {
    super.onMouseDown(e);

    if (!this.canvas) return;

    this.currentBracket = this.createBracketShape(
      this.startPoint,
      this.startPoint
    );

    this.canvas.add(this.currentBracket);
    this.emit('shape:start', { type: 'bracket' });
  }

  onMouseMove(e) {
    super.onMouseMove(e);

    if (!this.isDragging || !this.currentBracket) return;

    const endPoint = this.calculateEndPoint();

    this.canvas?.remove(this.currentBracket);
    this.currentBracket = this.createBracketShape(this.startPoint, endPoint);
    this.canvas?.add(this.currentBracket);

    this.canvas?.requestRenderAll();
  }

  onMouseUp(e) {
    super.onMouseUp(e);

    if (!this.currentBracket) return;

    const endPoint = this.calculateEndPoint();
    const length = Math.hypot(
      endPoint.x - this.startPoint.x,
      endPoint.y - this.startPoint.y
    );

    if (length < 20) {
      this.canvas?.remove(this.currentBracket);
      this.emit('shape:cancelled', { type: 'bracket' });
    } else {
      this.currentBracket.set({
        selectable: true,
        evented: true
      });
      this.currentBracket.setCoords();

      this.emit('shape:created', {
        type: 'bracket',
        object: this.currentBracket
      });
    }

    this.currentBracket = null;
    this.canvas?.requestRenderAll();
  }

  onKeyDown(e) {
    if (e.key === 'Shift') {
      this.isShiftHeld = true;
      if (this.isDragging) {
        this.updateBracket();
      }
    }

    // Cycle styles with 's'
    if (e.key === 's' && this.isDragging) {
      const styles = ['curly', 'square', 'round'];
      const currentIndex = styles.indexOf(this.bracketStyle);
      this.bracketStyle = styles[(currentIndex + 1) % styles.length];
      this.updateBracket();
    }

    // Toggle orientation with 'o'
    if (e.key === 'o' && this.isDragging) {
      this.orientation = this.orientation === 'horizontal' ? 'vertical' : 'horizontal';
      this.updateBracket();
    }

    if (e.key === 'Escape' && this.currentBracket) {
      this.canvas?.remove(this.currentBracket);
      this.currentBracket = null;
      this.isDragging = false;
      this.canvas?.requestRenderAll();
      this.emit('shape:cancelled', { type: 'bracket' });
    }
  }

  onKeyUp(e) {
    if (e.key === 'Shift') {
      this.isShiftHeld = false;
      if (this.isDragging) {
        this.updateBracket();
      }
    }
  }

  /**
   * Calculate end point with optional constraints
   * @returns {{x: number, y: number}}
   */
  calculateEndPoint() {
    if (this.isShiftHeld) {
      // Constrain to horizontal or vertical
      const dx = Math.abs(this.currentPoint.x - this.startPoint.x);
      const dy = Math.abs(this.currentPoint.y - this.startPoint.y);

      if (dx > dy) {
        return { x: this.currentPoint.x, y: this.startPoint.y };
      } else {
        return { x: this.startPoint.x, y: this.currentPoint.y };
      }
    }

    return { ...this.currentPoint };
  }

  /**
   * Update bracket during drawing
   */
  updateBracket() {
    if (!this.currentBracket || !this.canvas) return;

    const endPoint = this.calculateEndPoint();

    this.canvas.remove(this.currentBracket);
    this.currentBracket = this.createBracketShape(this.startPoint, endPoint);
    this.canvas.add(this.currentBracket);
    this.canvas.requestRenderAll();
  }

  /**
   * Create bracket shape
   * @param {Object} start - Start point
   * @param {Object} end - End point
   * @returns {fabric.Path}
   */
  createBracketShape(start, end) {
    let pathString;

    // Determine orientation based on points
    const dx = Math.abs(end.x - start.x);
    const dy = Math.abs(end.y - start.y);
    const isHorizontal = dx >= dy;

    switch (this.bracketStyle) {
      case 'square':
        pathString = this.createSquareBracket(start, end, isHorizontal);
        break;
      case 'round':
        pathString = this.createRoundBracket(start, end, isHorizontal);
        break;
      case 'curly':
      default:
        pathString = this.createCurlyBracket(start, end, isHorizontal);
        break;
    }

    return new fabric.Path(pathString, {
      fill: 'transparent',
      stroke: '#000000',
      strokeWidth: 2,
      strokeUniform: true,
      selectable: false,
      evented: false
    });
  }

  /**
   * Create curly brace path
   * @returns {string}
   */
  createCurlyBracket(start, end, isHorizontal) {
    if (isHorizontal) {
      const midX = (start.x + end.x) / 2;
      const height = 15;
      const y = start.y;

      return `
        M ${start.x} ${y}
        Q ${start.x + 10} ${y} ${start.x + 10} ${y + height / 2}
        T ${midX - 5} ${y + height}
        L ${midX} ${y + height + 5}
        L ${midX + 5} ${y + height}
        Q ${end.x - 10} ${y + height / 2} ${end.x - 10} ${y + height / 2}
        T ${end.x} ${y}
      `;
    } else {
      const midY = (start.y + end.y) / 2;
      const width = 15;
      const x = start.x;

      return `
        M ${x} ${start.y}
        Q ${x} ${start.y + 10} ${x + width / 2} ${start.y + 10}
        T ${x + width} ${midY - 5}
        L ${x + width + 5} ${midY}
        L ${x + width} ${midY + 5}
        Q ${x + width / 2} ${end.y - 10} ${x + width / 2} ${end.y - 10}
        T ${x} ${end.y}
      `;
    }
  }

  /**
   * Create square bracket path
   * @returns {string}
   */
  createSquareBracket(start, end, isHorizontal) {
    const depth = 10;

    if (isHorizontal) {
      return `
        M ${start.x} ${start.y}
        L ${start.x} ${start.y + depth}
        L ${end.x} ${start.y + depth}
        L ${end.x} ${start.y}
      `;
    } else {
      return `
        M ${start.x} ${start.y}
        L ${start.x + depth} ${start.y}
        L ${start.x + depth} ${end.y}
        L ${start.x} ${end.y}
      `;
    }
  }

  /**
   * Create round bracket path
   * @returns {string}
   */
  createRoundBracket(start, end, isHorizontal) {
    if (isHorizontal) {
      const midX = (start.x + end.x) / 2;
      const height = 15;

      return `
        M ${start.x} ${start.y}
        Q ${midX} ${start.y + height * 2} ${end.x} ${start.y}
      `;
    } else {
      const midY = (start.y + end.y) / 2;
      const width = 15;

      return `
        M ${start.x} ${start.y}
        Q ${start.x + width * 2} ${midY} ${start.x} ${end.y}
      `;
    }
  }

  /**
   * Set bracket style
   * @param {string} style - 'curly', 'square', 'round'
   */
  setStyle(style) {
    if (['curly', 'square', 'round'].includes(style)) {
      this.bracketStyle = style;
      this.emit('bracket:style:changed', { style });
    }
  }

  /**
   * Set orientation
   * @param {string} orientation - 'horizontal' or 'vertical'
   */
  setOrientation(orientation) {
    if (['horizontal', 'vertical'].includes(orientation)) {
      this.orientation = orientation;
      this.emit('bracket:orientation:changed', { orientation });
    }
  }
}

export default BracketTool;

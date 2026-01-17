/**
 * BaseTool - Abstract base class for all tools
 * Provides common interface and shared functionality
 */
export class BaseTool {
  constructor(editor) {
    this.editor = editor;
    this.canvas = editor?.canvas;
    this.isActive = false;
    this.isDragging = false;
    this.startPoint = null;
    this.currentPoint = null;
  }

  /**
   * Get the tool name
   * @returns {string}
   */
  get name() {
    return 'base';
  }

  /**
   * Get the keyboard shortcut
   * @returns {string|null}
   */
  get shortcut() {
    return null;
  }

  /**
   * Get the cursor style for this tool
   * @returns {string}
   */
  getCursor() {
    return 'default';
  }

  /**
   * Called when the tool is activated
   */
  activate() {
    this.isActive = true;
    if (this.canvas) {
      this.canvas.defaultCursor = this.getCursor();
      this.canvas.hoverCursor = this.getCursor();
    }
    this.onActivate();
  }

  /**
   * Called when the tool is deactivated
   */
  deactivate() {
    this.isActive = false;
    this.isDragging = false;
    this.startPoint = null;
    this.currentPoint = null;
    this.onDeactivate();
  }

  /**
   * Override in subclasses for custom activation logic
   */
  onActivate() {}

  /**
   * Override in subclasses for custom deactivation logic
   */
  onDeactivate() {}

  /**
   * Handle mouse down event
   * @param {Object} e - Fabric.js event object
   */
  onMouseDown(e) {
    if (!this.isActive) return;

    this.isDragging = true;
    this.startPoint = this.getPointer(e);
    this.currentPoint = { ...this.startPoint };
  }

  /**
   * Handle mouse move event
   * @param {Object} e - Fabric.js event object
   */
  onMouseMove(e) {
    if (!this.isActive) return;

    this.currentPoint = this.getPointer(e);
  }

  /**
   * Handle mouse up event
   * @param {Object} e - Fabric.js event object
   */
  onMouseUp(e) {
    if (!this.isActive) return;

    this.isDragging = false;
    this.currentPoint = this.getPointer(e);
  }

  /**
   * Handle key down event
   * @param {KeyboardEvent} e
   */
  onKeyDown(e) {}

  /**
   * Handle key up event
   * @param {KeyboardEvent} e
   */
  onKeyUp(e) {}

  /**
   * Get pointer coordinates from event
   * @param {Object} e - Fabric.js event object
   * @returns {{x: number, y: number}}
   */
  getPointer(e) {
    if (this.canvas) {
      return this.canvas.getPointer(e.e);
    }
    // Fallback for events without canvas
    const rect = e.e?.target?.getBoundingClientRect?.() || { left: 0, top: 0 };
    return {
      x: (e.e?.clientX || 0) - rect.left,
      y: (e.e?.clientY || 0) - rect.top
    };
  }

  /**
   * Calculate bounding box from two points (handles negative dimensions)
   * @param {Object} start - Start point {x, y}
   * @param {Object} end - End point {x, y}
   * @returns {{left: number, top: number, width: number, height: number}}
   */
  getBoundingBox(start, end) {
    const left = Math.min(start.x, end.x);
    const top = Math.min(start.y, end.y);
    const width = Math.abs(end.x - start.x);
    const height = Math.abs(end.y - start.y);

    return { left, top, width, height };
  }

  /**
   * Emit a tool event
   * @param {string} eventName
   * @param {Object} data
   */
  emit(eventName, data = {}) {
    if (this.editor?.emit) {
      this.editor.emit(eventName, { tool: this.name, ...data });
    }
  }
}

export default BaseTool;

/**
 * SelectTool - Selection and transformation tool
 * Allows selecting, moving, scaling, and rotating objects
 */
import { BaseTool } from './BaseTool.js';

export class SelectTool extends BaseTool {
  constructor(editor) {
    super(editor);
    this.selectedObjects = [];
    this.isTransforming = false;
    this.selectionRect = null;
  }

  get name() {
    return 'select';
  }

  get shortcut() {
    return 'v';
  }

  getCursor() {
    return 'default';
  }

  onActivate() {
    if (this.canvas) {
      // Enable object selection
      this.canvas.selection = true;
      this.canvas.forEachObject((obj) => {
        obj.selectable = true;
        obj.evented = true;
      });
    }
    this.emit('tool:activated', { tool: this.name });
  }

  onDeactivate() {
    if (this.canvas) {
      // Clear selection when switching tools
      this.canvas.discardActiveObject();
      this.canvas.requestRenderAll();
    }
    this.selectedObjects = [];
    this.emit('tool:deactivated', { tool: this.name });
  }

  onMouseDown(e) {
    super.onMouseDown(e);

    if (!this.canvas) return;

    const target = e.target;

    if (target) {
      // Object clicked - handle selection
      if (!this.isShiftPressed(e)) {
        // Single selection
        this.selectedObjects = [target];
      } else {
        // Add to selection with shift
        const index = this.selectedObjects.indexOf(target);
        if (index === -1) {
          this.selectedObjects.push(target);
        } else {
          this.selectedObjects.splice(index, 1);
        }
      }

      this.emit('selection:changed', { objects: this.selectedObjects });
    } else if (!this.isShiftPressed(e)) {
      // Clicked on empty space - clear selection
      this.selectedObjects = [];
      this.emit('selection:cleared');
    }
  }

  onMouseMove(e) {
    super.onMouseMove(e);

    if (!this.isDragging || !this.canvas) return;

    // Update cursor based on hover state
    const target = this.canvas.findTarget(e.e);
    if (target) {
      this.canvas.defaultCursor = 'move';
    } else {
      this.canvas.defaultCursor = 'default';
    }
  }

  onMouseUp(e) {
    super.onMouseUp(e);

    if (this.canvas) {
      this.canvas.requestRenderAll();
    }

    this.emit('selection:complete', { objects: this.selectedObjects });
  }

  onKeyDown(e) {
    if (!this.isActive || !this.canvas) return;

    const activeObject = this.canvas.getActiveObject();
    if (!activeObject) return;

    // Handle delete key
    if (e.key === 'Delete' || e.key === 'Backspace') {
      this.deleteSelected();
      e.preventDefault();
    }

    // Handle arrow keys for nudging
    const nudgeAmount = e.shiftKey ? 10 : 1;
    switch (e.key) {
      case 'ArrowUp':
        activeObject.top -= nudgeAmount;
        e.preventDefault();
        break;
      case 'ArrowDown':
        activeObject.top += nudgeAmount;
        e.preventDefault();
        break;
      case 'ArrowLeft':
        activeObject.left -= nudgeAmount;
        e.preventDefault();
        break;
      case 'ArrowRight':
        activeObject.left += nudgeAmount;
        e.preventDefault();
        break;
    }

    activeObject.setCoords();
    this.canvas.requestRenderAll();
  }

  /**
   * Delete selected objects
   */
  deleteSelected() {
    if (!this.canvas) return;

    const activeObjects = this.canvas.getActiveObjects();
    if (activeObjects.length === 0) return;

    activeObjects.forEach((obj) => {
      this.canvas.remove(obj);
    });

    this.canvas.discardActiveObject();
    this.canvas.requestRenderAll();

    this.emit('objects:deleted', { count: activeObjects.length });
  }

  /**
   * Select all objects on canvas
   */
  selectAll() {
    if (!this.canvas) return;

    const objects = this.canvas.getObjects();
    if (objects.length === 0) return;

    if (objects.length === 1) {
      this.canvas.setActiveObject(objects[0]);
    } else {
      const selection = new fabric.ActiveSelection(objects, { canvas: this.canvas });
      this.canvas.setActiveObject(selection);
    }

    this.canvas.requestRenderAll();
    this.emit('selection:all');
  }

  /**
   * Check if shift key is pressed
   * @param {Object} e - Event object
   * @returns {boolean}
   */
  isShiftPressed(e) {
    return e.e?.shiftKey || false;
  }
}

export default SelectTool;

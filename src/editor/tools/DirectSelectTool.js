/**
 * DirectSelectTool - Select and manipulate individual path points
 * Allows editing Bezier control points and path vertices
 */
import { BaseTool } from './BaseTool.js';

export class DirectSelectTool extends BaseTool {
  constructor(editor) {
    super(editor);
    this.selectedPath = null;
    this.selectedPointIndex = -1;
    this.selectedControlPoint = null; // 'c1' or 'c2' for bezier handles
    this.isEditingPath = false;
  }

  get name() {
    return 'direct-select';
  }

  get shortcut() {
    return 'a';
  }

  getCursor() {
    return 'crosshair';
  }

  onActivate() {
    if (this.canvas) {
      this.canvas.selection = false;
      this.canvas.forEachObject((obj) => {
        obj.selectable = false;
        obj.evented = true;
      });
    }
    this.emit('tool:activated', { tool: this.name });
  }

  onDeactivate() {
    this.exitPathEditMode();
    this.emit('tool:deactivated', { tool: this.name });
  }

  onMouseDown(e) {
    super.onMouseDown(e);

    if (!this.canvas) return;

    const target = e.target;

    if (target && target.type === 'path') {
      if (this.selectedPath !== target) {
        // New path selected
        this.exitPathEditMode();
        this.enterPathEditMode(target);
      }

      // Find clicked point
      const pointer = this.getPointer(e);
      this.findClickedPoint(pointer);
    } else {
      // Clicked outside - exit edit mode
      this.exitPathEditMode();
    }
  }

  onMouseMove(e) {
    super.onMouseMove(e);

    if (!this.isDragging || !this.selectedPath) return;
    if (this.selectedPointIndex === -1 && !this.selectedControlPoint) return;

    const pointer = this.currentPoint;
    this.moveSelectedPoint(pointer);
  }

  onMouseUp(e) {
    super.onMouseUp(e);

    if (this.selectedPath) {
      this.selectedPath.setCoords();
      this.canvas?.requestRenderAll();
      this.emit('path:modified', { path: this.selectedPath });
    }
  }

  /**
   * Enter path editing mode
   * @param {fabric.Path} path
   */
  enterPathEditMode(path) {
    this.selectedPath = path;
    this.isEditingPath = true;

    // Create visual indicators for path points
    this.renderPathPoints();

    this.emit('path:edit:enter', { path });
  }

  /**
   * Exit path editing mode
   */
  exitPathEditMode() {
    if (!this.selectedPath) return;

    // Remove visual indicators
    this.clearPathPoints();

    this.selectedPath = null;
    this.selectedPointIndex = -1;
    this.selectedControlPoint = null;
    this.isEditingPath = false;

    this.canvas?.requestRenderAll();
    this.emit('path:edit:exit');
  }

  /**
   * Find which point was clicked
   * @param {Object} pointer - Click coordinates
   */
  findClickedPoint(pointer) {
    if (!this.selectedPath) return;

    const path = this.selectedPath.path;
    const hitRadius = 8;
    const transform = this.selectedPath.calcTransformMatrix();

    this.selectedPointIndex = -1;
    this.selectedControlPoint = null;

    for (let i = 0; i < path.length; i++) {
      const cmd = path[i];
      const points = this.getCommandPoints(cmd, transform);

      for (const point of points) {
        const dist = Math.hypot(pointer.x - point.x, pointer.y - point.y);
        if (dist < hitRadius) {
          this.selectedPointIndex = i;
          this.selectedControlPoint = point.type;
          this.emit('point:selected', { index: i, type: point.type });
          return;
        }
      }
    }
  }

  /**
   * Get transformed points from a path command
   * @param {Array} cmd - Path command
   * @param {Array} transform - Transform matrix
   * @returns {Array}
   */
  getCommandPoints(cmd, transform) {
    const points = [];
    const type = cmd[0];

    switch (type) {
      case 'M':
      case 'L':
        points.push({
          x: cmd[1],
          y: cmd[2],
          type: 'anchor'
        });
        break;
      case 'C':
        points.push(
          { x: cmd[1], y: cmd[2], type: 'c1' },
          { x: cmd[3], y: cmd[4], type: 'c2' },
          { x: cmd[5], y: cmd[6], type: 'anchor' }
        );
        break;
      case 'Q':
        points.push(
          { x: cmd[1], y: cmd[2], type: 'c1' },
          { x: cmd[3], y: cmd[4], type: 'anchor' }
        );
        break;
    }

    // Apply transform to points
    return points.map(p => {
      const transformed = fabric.util.transformPoint({ x: p.x, y: p.y }, transform);
      return { ...transformed, type: p.type };
    });
  }

  /**
   * Move the selected point
   * @param {Object} pointer - New position
   */
  moveSelectedPoint(pointer) {
    if (!this.selectedPath || this.selectedPointIndex === -1) return;

    const path = this.selectedPath.path;
    const cmd = path[this.selectedPointIndex];
    const type = cmd[0];

    // Inverse transform to get local coordinates
    const inverseTransform = fabric.util.invertTransform(
      this.selectedPath.calcTransformMatrix()
    );
    const localPoint = fabric.util.transformPoint(pointer, inverseTransform);

    switch (type) {
      case 'M':
      case 'L':
        cmd[1] = localPoint.x;
        cmd[2] = localPoint.y;
        break;
      case 'C':
        if (this.selectedControlPoint === 'c1') {
          cmd[1] = localPoint.x;
          cmd[2] = localPoint.y;
        } else if (this.selectedControlPoint === 'c2') {
          cmd[3] = localPoint.x;
          cmd[4] = localPoint.y;
        } else {
          cmd[5] = localPoint.x;
          cmd[6] = localPoint.y;
        }
        break;
      case 'Q':
        if (this.selectedControlPoint === 'c1') {
          cmd[1] = localPoint.x;
          cmd[2] = localPoint.y;
        } else {
          cmd[3] = localPoint.x;
          cmd[4] = localPoint.y;
        }
        break;
    }

    // Re-render path
    this.selectedPath.setPath(path);
    this.renderPathPoints();
    this.canvas?.requestRenderAll();
  }

  /**
   * Render visual indicators for path points
   */
  renderPathPoints() {
    // This would create small circles at each path point
    // Implementation depends on how we want to visualize edit points
    this.canvas?.requestRenderAll();
  }

  /**
   * Clear visual indicators for path points
   */
  clearPathPoints() {
    // Remove the visual indicators
    this.canvas?.requestRenderAll();
  }
}

export default DirectSelectTool;

/**
 * Grid Manager for FINNISH Canvas Editor
 * Provides toggleable grid overlay and snap-to-grid functionality
 *
 * @module grid
 */

import { fabric } from 'fabric';

/**
 * Grid Manager class for managing grid overlay and snapping
 */
export class GridManager {
  /**
   * @param {Object} options - Configuration options
   * @param {number} options.gridSize - Grid size in pixels (default: 20)
   * @param {string} options.gridColor - Grid line color (default: '#e0e0e0')
   * @param {string} options.majorGridColor - Major grid line color (default: '#c0c0c0')
   * @param {number} options.majorGridInterval - Major grid line interval (default: 5)
   * @param {number} options.gridLineWidth - Grid line width (default: 1)
   * @param {boolean} options.snapEnabled - Whether snap is enabled (default: false)
   * @param {number} options.snapThreshold - Snap threshold in pixels (default: 10)
   */
  constructor(options = {}) {
    this.gridSize = options.gridSize || 20;
    this.gridColor = options.gridColor || '#e0e0e0';
    this.majorGridColor = options.majorGridColor || '#c0c0c0';
    this.majorGridInterval = options.majorGridInterval || 5;
    this.gridLineWidth = options.gridLineWidth || 1;
    this.snapEnabled = options.snapEnabled || false;
    this.snapThreshold = options.snapThreshold || 10;

    this.canvas = null;
    this.gridGroup = null;
    this.visible = false;

    // Predefined grid sizes
    this.availableSizes = [10, 20, 50];

    // Bound handlers for event listeners
    this._boundMovingHandler = this._onObjectMoving.bind(this);
    this._boundScalingHandler = this._onObjectScaling.bind(this);
  }

  /**
   * Attach the grid manager to a canvas
   * @param {fabric.Canvas} canvas - The Fabric.js canvas instance
   */
  attach(canvas) {
    this.canvas = canvas;
    this._setupSnapListeners();
  }

  /**
   * Set up snap event listeners
   * @private
   */
  _setupSnapListeners() {
    if (!this.canvas) return;

    this.canvas.on('object:moving', this._boundMovingHandler);
    this.canvas.on('object:scaling', this._boundScalingHandler);
  }

  /**
   * Handle object moving for snap functionality
   * @private
   */
  _onObjectMoving(e) {
    if (!this.snapEnabled || !e.target) return;

    const obj = e.target;
    const { left, top, width, height, scaleX, scaleY } = obj;

    // Calculate object bounds
    const objLeft = left;
    const objTop = top;
    const objRight = left + (width * (scaleX || 1));
    const objBottom = top + (height * (scaleY || 1));
    const objCenterX = left + (width * (scaleX || 1)) / 2;
    const objCenterY = top + (height * (scaleY || 1)) / 2;

    // Snap to nearest grid line
    let snappedLeft = this._snapValue(objLeft);
    let snappedTop = this._snapValue(objTop);

    // Check if center snapping is closer
    const centerSnapX = this._snapValue(objCenterX);
    const centerSnapY = this._snapValue(objCenterY);

    if (Math.abs(objCenterX - centerSnapX) < Math.abs(objLeft - snappedLeft)) {
      snappedLeft = centerSnapX - (width * (scaleX || 1)) / 2;
    }

    if (Math.abs(objCenterY - centerSnapY) < Math.abs(objTop - snappedTop)) {
      snappedTop = centerSnapY - (height * (scaleY || 1)) / 2;
    }

    // Apply snapped position if within threshold
    if (Math.abs(objLeft - snappedLeft) <= this.snapThreshold) {
      obj.set('left', snappedLeft);
    }
    if (Math.abs(objTop - snappedTop) <= this.snapThreshold) {
      obj.set('top', snappedTop);
    }
  }

  /**
   * Handle object scaling for snap functionality
   * @private
   */
  _onObjectScaling(e) {
    if (!this.snapEnabled || !e.target) return;

    const obj = e.target;
    const { left, top, width, height, scaleX, scaleY } = obj;

    // Calculate new dimensions
    const newWidth = width * scaleX;
    const newHeight = height * scaleY;

    // Snap dimensions to grid
    const snappedWidth = this._snapValue(newWidth);
    const snappedHeight = this._snapValue(newHeight);

    // Apply snapped scale if within threshold
    if (Math.abs(newWidth - snappedWidth) <= this.snapThreshold) {
      obj.set('scaleX', snappedWidth / width);
    }
    if (Math.abs(newHeight - snappedHeight) <= this.snapThreshold) {
      obj.set('scaleY', snappedHeight / height);
    }
  }

  /**
   * Snap a value to the nearest grid line
   * @param {number} value - The value to snap
   * @returns {number} The snapped value
   */
  _snapValue(value) {
    return Math.round(value / this.gridSize) * this.gridSize;
  }

  /**
   * Snap a point to the grid
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   * @returns {{x: number, y: number}} Snapped coordinates
   */
  snapPoint(x, y) {
    return {
      x: this._snapValue(x),
      y: this._snapValue(y)
    };
  }

  /**
   * Show the grid overlay
   */
  show() {
    if (this.visible || !this.canvas) return;

    this._createGrid();
    this.visible = true;
  }

  /**
   * Hide the grid overlay
   */
  hide() {
    if (!this.visible || !this.canvas) return;

    this._removeGrid();
    this.visible = false;
  }

  /**
   * Toggle grid visibility
   * @returns {boolean} New visibility state
   */
  toggle() {
    if (this.visible) {
      this.hide();
    } else {
      this.show();
    }
    return this.visible;
  }

  /**
   * Create the grid overlay
   * @private
   */
  _createGrid() {
    if (!this.canvas) return;

    const canvasWidth = this.canvas.getWidth();
    const canvasHeight = this.canvas.getHeight();
    const lines = [];

    // Create vertical lines
    for (let x = 0; x <= canvasWidth; x += this.gridSize) {
      const isMajor = (x / this.gridSize) % this.majorGridInterval === 0;
      lines.push(new fabric.Line([x, 0, x, canvasHeight], {
        stroke: isMajor ? this.majorGridColor : this.gridColor,
        strokeWidth: isMajor ? this.gridLineWidth * 1.5 : this.gridLineWidth,
        selectable: false,
        evented: false,
        excludeFromExport: true
      }));
    }

    // Create horizontal lines
    for (let y = 0; y <= canvasHeight; y += this.gridSize) {
      const isMajor = (y / this.gridSize) % this.majorGridInterval === 0;
      lines.push(new fabric.Line([0, y, canvasWidth, y], {
        stroke: isMajor ? this.majorGridColor : this.gridColor,
        strokeWidth: isMajor ? this.gridLineWidth * 1.5 : this.gridLineWidth,
        selectable: false,
        evented: false,
        excludeFromExport: true
      }));
    }

    // Create a group for all grid lines
    this.gridGroup = new fabric.Group(lines, {
      selectable: false,
      evented: false,
      excludeFromExport: true,
      objectCaching: false
    });

    // Add grid to canvas at the back
    this.canvas.add(this.gridGroup);
    this.gridGroup.sendToBack();
    this.canvas.renderAll();
  }

  /**
   * Remove the grid overlay
   * @private
   */
  _removeGrid() {
    if (this.gridGroup && this.canvas) {
      this.canvas.remove(this.gridGroup);
      this.gridGroup = null;
      this.canvas.renderAll();
    }
  }

  /**
   * Update the grid (e.g., after canvas resize)
   */
  refresh() {
    if (this.visible) {
      this._removeGrid();
      this._createGrid();
    }
  }

  /**
   * Set the grid size
   * @param {number} size - New grid size in pixels
   */
  setGridSize(size) {
    if (!this.availableSizes.includes(size) && size > 0) {
      // Allow custom sizes, just validate it's positive
      this.gridSize = size;
    } else if (this.availableSizes.includes(size)) {
      this.gridSize = size;
    } else {
      console.warn('Invalid grid size. Using default sizes:', this.availableSizes);
      return;
    }

    this.refresh();
  }

  /**
   * Get available grid sizes
   * @returns {number[]} Array of available grid sizes
   */
  getAvailableSizes() {
    return [...this.availableSizes];
  }

  /**
   * Enable snap to grid
   */
  enableSnap() {
    this.snapEnabled = true;
  }

  /**
   * Disable snap to grid
   */
  disableSnap() {
    this.snapEnabled = false;
  }

  /**
   * Toggle snap to grid
   * @returns {boolean} New snap state
   */
  toggleSnap() {
    this.snapEnabled = !this.snapEnabled;
    return this.snapEnabled;
  }

  /**
   * Check if snap is enabled
   * @returns {boolean}
   */
  isSnapEnabled() {
    return this.snapEnabled;
  }

  /**
   * Check if grid is visible
   * @returns {boolean}
   */
  isVisible() {
    return this.visible;
  }

  /**
   * Set snap threshold
   * @param {number} threshold - New snap threshold in pixels
   */
  setSnapThreshold(threshold) {
    if (threshold > 0) {
      this.snapThreshold = threshold;
    }
  }

  /**
   * Set grid color
   * @param {string} color - CSS color string
   */
  setGridColor(color) {
    this.gridColor = color;
    this.refresh();
  }

  /**
   * Set major grid color
   * @param {string} color - CSS color string
   */
  setMajorGridColor(color) {
    this.majorGridColor = color;
    this.refresh();
  }

  /**
   * Get current grid configuration
   * @returns {Object}
   */
  getConfig() {
    return {
      gridSize: this.gridSize,
      gridColor: this.gridColor,
      majorGridColor: this.majorGridColor,
      majorGridInterval: this.majorGridInterval,
      gridLineWidth: this.gridLineWidth,
      snapEnabled: this.snapEnabled,
      snapThreshold: this.snapThreshold,
      visible: this.visible
    };
  }

  /**
   * Set grid configuration
   * @param {Object} config - Configuration object
   */
  setConfig(config) {
    if (config.gridSize !== undefined) this.gridSize = config.gridSize;
    if (config.gridColor !== undefined) this.gridColor = config.gridColor;
    if (config.majorGridColor !== undefined) this.majorGridColor = config.majorGridColor;
    if (config.majorGridInterval !== undefined) this.majorGridInterval = config.majorGridInterval;
    if (config.gridLineWidth !== undefined) this.gridLineWidth = config.gridLineWidth;
    if (config.snapEnabled !== undefined) this.snapEnabled = config.snapEnabled;
    if (config.snapThreshold !== undefined) this.snapThreshold = config.snapThreshold;

    this.refresh();
  }

  /**
   * Clean up and detach from canvas
   */
  dispose() {
    if (this.canvas) {
      this.canvas.off('object:moving', this._boundMovingHandler);
      this.canvas.off('object:scaling', this._boundScalingHandler);
    }

    this._removeGrid();
    this.canvas = null;
  }
}

export default GridManager;

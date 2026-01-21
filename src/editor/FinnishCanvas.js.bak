/**
 * FINNISH Canvas Editor
 * Core Fabric.js canvas wrapper for AI-powered SVG editing
 *
 * @module FinnishCanvas
 */

import { fabric } from 'fabric';
import { HistoryManager } from './history.js';
import { GridManager } from './grid.js';

/**
 * FinnishCanvas - Main canvas wrapper for the FINNISH editor
 */
export class FinnishCanvas {
  /**
   * Create a new FinnishCanvas instance
   * @param {string|HTMLCanvasElement} canvasElement - Canvas element or selector
   * @param {Object} options - Configuration options
   * @param {number} options.width - Canvas width (default: 800)
   * @param {number} options.height - Canvas height (default: 600)
   * @param {string} options.backgroundColor - Background color (default: '#ffffff')
   * @param {boolean} options.enableHistory - Enable undo/redo (default: true)
   * @param {boolean} options.enableGrid - Enable grid manager (default: true)
   * @param {number} options.gridSize - Grid size in pixels (default: 20)
   * @param {number} options.maxHistoryStates - Max undo/redo states (default: 50)
   */
  constructor(canvasElement, options = {}) {
    this.options = {
      width: options.width || 800,
      height: options.height || 600,
      backgroundColor: options.backgroundColor || '#ffffff',
      enableHistory: options.enableHistory !== false,
      enableGrid: options.enableGrid !== false,
      gridSize: options.gridSize || 20,
      maxHistoryStates: options.maxHistoryStates || 50,
      ...options
    };

    // Initialize Fabric.js canvas
    this.canvas = new fabric.Canvas(canvasElement, {
      width: this.options.width,
      height: this.options.height,
      backgroundColor: this.options.backgroundColor,
      selection: true,
      preserveObjectStacking: true,
      renderOnAddRemove: true,
      stopContextMenu: true,
      fireRightClick: true
    });

    // Zoom and pan state
    this.zoomLevel = 1;
    this.minZoom = 0.1;
    this.maxZoom = 10;
    this.isPanning = false;
    this.lastPosX = 0;
    this.lastPosY = 0;

    // Initialize managers
    if (this.options.enableHistory) {
      this.history = new HistoryManager({ maxStates: this.options.maxHistoryStates });
      this.history.attach(this.canvas);
    }

    if (this.options.enableGrid) {
      this.grid = new GridManager({ gridSize: this.options.gridSize });
      this.grid.attach(this.canvas);
    }

    // Event emitter for selection events
    this.eventListeners = {
      'selection:created': [],
      'selection:updated': [],
      'selection:cleared': [],
      'object:modified': [],
      'object:added': [],
      'object:removed': [],
      'zoom:changed': [],
      'canvas:ready': []
    };

    // Set up canvas event handlers
    this._setupEventHandlers();
    this._setupZoomPan();

    // Assign unique IDs to objects
    this._objectIdCounter = 0;

    // Emit ready event
    this._emit('canvas:ready', { canvas: this });
  }

  /**
   * Set up canvas event handlers
   * @private
   */
  _setupEventHandlers() {
    // Selection events - emit for properties panel
    this.canvas.on('selection:created', (e) => {
      this._emit('selection:created', {
        selected: e.selected,
        target: e.target,
        properties: this._getObjectProperties(e.target)
      });
    });

    this.canvas.on('selection:updated', (e) => {
      this._emit('selection:updated', {
        selected: e.selected,
        deselected: e.deselected,
        target: e.target,
        properties: this._getObjectProperties(e.target)
      });
    });

    this.canvas.on('selection:cleared', (e) => {
      this._emit('selection:cleared', { deselected: e.deselected });
    });

    // Object events
    this.canvas.on('object:modified', (e) => {
      // Clear previous state after modification is complete
      if (e.target && e.target._previousState) {
        delete e.target._previousState;
      }
      this._emit('object:modified', {
        target: e.target,
        properties: this._getObjectProperties(e.target)
      });
    });

    this.canvas.on('object:added', (e) => {
      // Assign ID to new objects
      if (e.target && !e.target.id) {
        e.target.id = this._generateObjectId();
      }
      this._emit('object:added', { target: e.target });
    });

    this.canvas.on('object:removed', (e) => {
      this._emit('object:removed', { target: e.target });
    });
  }

  /**
   * Set up zoom and pan controls
   * @private
   */
  _setupZoomPan() {
    // Mouse wheel zoom
    this.canvas.on('mouse:wheel', (opt) => {
      const delta = opt.e.deltaY;
      let zoom = this.canvas.getZoom();
      zoom *= 0.999 ** delta;

      // Clamp zoom level
      zoom = Math.max(this.minZoom, Math.min(this.maxZoom, zoom));

      // Zoom to cursor position
      this.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      this.zoomLevel = zoom;

      this._emit('zoom:changed', { zoom: this.zoomLevel });

      opt.e.preventDefault();
      opt.e.stopPropagation();
    });

    // Pan with middle mouse button or Alt+drag
    this.canvas.on('mouse:down', (opt) => {
      const evt = opt.e;
      if (evt.button === 1 || (evt.altKey && evt.button === 0)) {
        this.isPanning = true;
        this.canvas.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
        this.canvas.setCursor('grabbing');
      }
    });

    this.canvas.on('mouse:move', (opt) => {
      if (!this.isPanning) return;

      const evt = opt.e;
      const vpt = this.canvas.viewportTransform;
      vpt[4] += evt.clientX - this.lastPosX;
      vpt[5] += evt.clientY - this.lastPosY;
      this.canvas.requestRenderAll();
      this.lastPosX = evt.clientX;
      this.lastPosY = evt.clientY;
    });

    this.canvas.on('mouse:up', () => {
      if (this.isPanning) {
        this.isPanning = false;
        this.canvas.selection = true;
        this.canvas.setCursor('default');
      }
    });
  }

  /**
   * Generate a unique object ID
   * @private
   * @returns {string}
   */
  _generateObjectId() {
    return `finnish_obj_${Date.now()}_${++this._objectIdCounter}`;
  }

  /**
   * Get properties of an object for the properties panel
   * @private
   * @param {fabric.Object} obj - The object
   * @returns {Object} Properties object
   */
  _getObjectProperties(obj) {
    if (!obj) return null;

    const props = {
      id: obj.id,
      type: obj.type,
      left: Math.round(obj.left),
      top: Math.round(obj.top),
      width: Math.round(obj.width * obj.scaleX),
      height: Math.round(obj.height * obj.scaleY),
      scaleX: obj.scaleX,
      scaleY: obj.scaleY,
      angle: Math.round(obj.angle),
      opacity: obj.opacity,
      fill: obj.fill,
      stroke: obj.stroke,
      strokeWidth: obj.strokeWidth,
      visible: obj.visible,
      selectable: obj.selectable,
      name: obj.name || ''
    };

    // Add type-specific properties
    if (obj.type === 'text' || obj.type === 'i-text' || obj.type === 'textbox') {
      props.text = obj.text;
      props.fontFamily = obj.fontFamily;
      props.fontSize = obj.fontSize;
      props.fontWeight = obj.fontWeight;
      props.fontStyle = obj.fontStyle;
      props.textAlign = obj.textAlign;
    }

    if (obj.type === 'path') {
      props.pathData = obj.path;
    }

    return props;
  }

  // ==================== Zoom Controls ====================

  /**
   * Set zoom level
   * @param {number} zoom - Zoom level (0.1 to 10)
   */
  setZoom(zoom) {
    zoom = Math.max(this.minZoom, Math.min(this.maxZoom, zoom));
    const center = this.canvas.getCenter();
    this.canvas.zoomToPoint({ x: center.left, y: center.top }, zoom);
    this.zoomLevel = zoom;
    this._emit('zoom:changed', { zoom: this.zoomLevel });
  }

  /**
   * Zoom in by a step
   * @param {number} step - Zoom step (default: 0.1)
   */
  zoomIn(step = 0.1) {
    this.setZoom(this.zoomLevel + step);
  }

  /**
   * Zoom out by a step
   * @param {number} step - Zoom step (default: 0.1)
   */
  zoomOut(step = 0.1) {
    this.setZoom(this.zoomLevel - step);
  }

  /**
   * Reset zoom to 100%
   */
  resetZoom() {
    this.setZoom(1);
    this.resetPan();
  }

  /**
   * Zoom to fit all objects
   */
  zoomToFit() {
    const objects = this.canvas.getObjects().filter(obj => obj !== this.grid?.gridGroup);
    if (objects.length === 0) return;

    const group = new fabric.Group(objects);
    const groupWidth = group.width;
    const groupHeight = group.height;
    group.destroy();

    const canvasWidth = this.canvas.getWidth();
    const canvasHeight = this.canvas.getHeight();

    const scaleX = canvasWidth / groupWidth;
    const scaleY = canvasHeight / groupHeight;
    const zoom = Math.min(scaleX, scaleY) * 0.9; // 90% to add padding

    this.setZoom(zoom);
  }

  /**
   * Reset pan to origin
   */
  resetPan() {
    const vpt = this.canvas.viewportTransform;
    vpt[4] = 0;
    vpt[5] = 0;
    this.canvas.requestRenderAll();
  }

  /**
   * Get current zoom level
   * @returns {number}
   */
  getZoom() {
    return this.zoomLevel;
  }

  // ==================== Grid Controls ====================

  /**
   * Show grid overlay
   */
  showGrid() {
    if (this.grid) {
      this.grid.show();
    }
  }

  /**
   * Hide grid overlay
   */
  hideGrid() {
    if (this.grid) {
      this.grid.hide();
    }
  }

  /**
   * Toggle grid visibility
   * @returns {boolean} New visibility state
   */
  toggleGrid() {
    return this.grid ? this.grid.toggle() : false;
  }

  /**
   * Set grid size
   * @param {number} size - Grid size (10, 20, or 50)
   */
  setGridSize(size) {
    if (this.grid) {
      this.grid.setGridSize(size);
    }
  }

  /**
   * Enable snap to grid
   */
  enableSnap() {
    if (this.grid) {
      this.grid.enableSnap();
    }
  }

  /**
   * Disable snap to grid
   */
  disableSnap() {
    if (this.grid) {
      this.grid.disableSnap();
    }
  }

  /**
   * Toggle snap to grid
   * @returns {boolean} New snap state
   */
  toggleSnap() {
    return this.grid ? this.grid.toggleSnap() : false;
  }

  // ==================== History Controls ====================

  /**
   * Undo last action
   * @returns {Promise<boolean>}
   */
  async undo() {
    if (this.history) {
      return await this.history.undo();
    }
    return false;
  }

  /**
   * Redo last undone action
   * @returns {Promise<boolean>}
   */
  async redo() {
    if (this.history) {
      return await this.history.redo();
    }
    return false;
  }

  /**
   * Check if undo is available
   * @returns {boolean}
   */
  canUndo() {
    return this.history ? this.history.canUndo() : false;
  }

  /**
   * Check if redo is available
   * @returns {boolean}
   */
  canRedo() {
    return this.history ? this.history.canRedo() : false;
  }

  /**
   * Clear history
   */
  clearHistory() {
    if (this.history) {
      this.history.clear();
    }
  }

  // ==================== SVG Import ====================

  /**
   * Load SVG from a string
   * @param {string} svgString - SVG markup string
   * @param {Object} options - Load options
   * @returns {Promise<fabric.Object[]>} Loaded objects
   */
  async loadSVGFromString(svgString, options = {}) {
    return new Promise((resolve, reject) => {
      // Pause history recording during import
      const resume = this.history?.pause();

      fabric.loadSVGFromString(svgString, (objects, options) => {
        if (!objects || objects.length === 0) {
          resume?.();
          reject(new Error('Failed to parse SVG'));
          return;
        }

        // Assign IDs to imported objects
        objects.forEach(obj => {
          obj.id = this._generateObjectId();
        });

        // Group objects if multiple, or add single object
        if (objects.length > 1) {
          const group = fabric.util.groupSVGElements(objects, options);
          group.id = this._generateObjectId();
          this.canvas.add(group);
          this.canvas.centerObject(group);
        } else {
          this.canvas.add(objects[0]);
          this.canvas.centerObject(objects[0]);
        }

        this.canvas.renderAll();
        resume?.();

        // Record the import as a single action
        if (this.history) {
          this.history.recordSnapshot('SVG import');
        }

        resolve(objects);
      }, null, {
        crossOrigin: 'anonymous',
        ...options
      });
    });
  }

  /**
   * Load SVG from a URL
   * @param {string} url - URL to SVG file
   * @param {Object} options - Load options
   * @returns {Promise<fabric.Object[]>} Loaded objects
   */
  async loadSVGFromURL(url, options = {}) {
    return new Promise((resolve, reject) => {
      // Pause history recording during import
      const resume = this.history?.pause();

      fabric.loadSVGFromURL(url, (objects, options) => {
        if (!objects || objects.length === 0) {
          resume?.();
          reject(new Error('Failed to load SVG from URL'));
          return;
        }

        // Assign IDs to imported objects
        objects.forEach(obj => {
          obj.id = this._generateObjectId();
        });

        // Group objects if multiple, or add single object
        if (objects.length > 1) {
          const group = fabric.util.groupSVGElements(objects, options);
          group.id = this._generateObjectId();
          this.canvas.add(group);
          this.canvas.centerObject(group);
        } else {
          this.canvas.add(objects[0]);
          this.canvas.centerObject(objects[0]);
        }

        this.canvas.renderAll();
        resume?.();

        // Record the import as a single action
        if (this.history) {
          this.history.recordSnapshot('SVG import from URL');
        }

        resolve(objects);
      }, null, {
        crossOrigin: 'anonymous',
        ...options
      });
    });
  }

  // ==================== Export Methods ====================

  /**
   * Export canvas to SVG string
   * @param {Object} options - Export options
   * @returns {string} SVG markup
   */
  exportSVG(options = {}) {
    const defaultOptions = {
      suppressPreamble: false,
      viewBox: {
        minX: 0,
        minY: 0,
        width: this.canvas.getWidth(),
        height: this.canvas.getHeight()
      },
      encoding: 'UTF-8',
      ...options
    };

    // Temporarily hide grid for export
    const gridWasVisible = this.grid?.isVisible();
    if (gridWasVisible) {
      this.grid.hide();
    }

    const svg = this.canvas.toSVG(defaultOptions);

    // Restore grid
    if (gridWasVisible) {
      this.grid.show();
    }

    return svg;
  }

  /**
   * Export canvas to PNG
   * @param {Object} options - Export options
   * @param {number} options.dpi - DPI (72, 150, 300, 600) - default: 72
   * @param {string} options.format - Output format ('png' or 'jpeg') - default: 'png'
   * @param {number} options.quality - JPEG quality (0-1) - default: 1
   * @param {boolean} options.withBackground - Include background - default: true
   * @returns {string} Data URL of the image
   */
  exportPNG(options = {}) {
    const dpi = options.dpi || 72;
    const format = options.format || 'png';
    const quality = options.quality || 1;
    const withBackground = options.withBackground !== false;

    // Calculate multiplier based on DPI (72 DPI is baseline)
    const multiplier = dpi / 72;

    // Temporarily hide grid for export
    const gridWasVisible = this.grid?.isVisible();
    if (gridWasVisible) {
      this.grid.hide();
    }

    const dataURL = this.canvas.toDataURL({
      format: format,
      quality: quality,
      multiplier: multiplier,
      enableRetinaScaling: false,
      withoutShadow: false,
      withoutTransform: false
    });

    // Restore grid
    if (gridWasVisible) {
      this.grid.show();
    }

    return dataURL;
  }

  /**
   * Export canvas to PNG as Blob
   * @param {Object} options - Export options (same as exportPNG)
   * @returns {Promise<Blob>} PNG Blob
   */
  async exportPNGBlob(options = {}) {
    const dataURL = this.exportPNG(options);
    const response = await fetch(dataURL);
    return await response.blob();
  }

  /**
   * Download the canvas as PNG
   * @param {string} filename - Filename (default: 'finnish-export.png')
   * @param {Object} options - Export options
   */
  downloadPNG(filename = 'finnish-export.png', options = {}) {
    const dataURL = this.exportPNG(options);
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Download the canvas as SVG
   * @param {string} filename - Filename (default: 'finnish-export.svg')
   * @param {Object} options - Export options
   */
  downloadSVG(filename = 'finnish-export.svg', options = {}) {
    const svg = this.exportSVG(options);
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // ==================== Object Grouping ====================

  /**
   * Group selected objects
   * @returns {fabric.Group|null} The created group or null
   */
  groupSelected() {
    const activeSelection = this.canvas.getActiveObject();

    if (!activeSelection || activeSelection.type !== 'activeSelection') {
      return null;
    }

    // Get objects before grouping for history
    const objectIds = activeSelection.getObjects().map(obj => obj.id);

    // Create group
    const group = activeSelection.toGroup();
    group.id = this._generateObjectId();

    // Record for history
    if (this.history) {
      this.history.record('group', {
        groupId: group.id,
        objectIds: objectIds
      }, 'Group objects');
    }

    this.canvas.renderAll();
    return group;
  }

  /**
   * Ungroup selected group
   * @returns {fabric.Object[]|null} The ungrouped objects or null
   */
  ungroupSelected() {
    const activeObject = this.canvas.getActiveObject();

    if (!activeObject || activeObject.type !== 'group') {
      return null;
    }

    const groupId = activeObject.id;

    // Get object IDs before ungrouping
    const items = activeObject.getObjects();

    // Ungroup
    const selection = activeObject.toActiveSelection();

    // Assign IDs to ungrouped objects
    const objectIds = selection.getObjects().map(obj => {
      if (!obj.id) {
        obj.id = this._generateObjectId();
      }
      return obj.id;
    });

    // Record for history
    if (this.history) {
      this.history.record('ungroup', {
        groupId: groupId,
        objectIds: objectIds
      }, 'Ungroup objects');
    }

    this.canvas.renderAll();
    return selection.getObjects();
  }

  // ==================== Layer Ordering ====================

  /**
   * Bring selected object forward
   */
  bringForward() {
    const activeObject = this.canvas.getActiveObject();
    if (!activeObject) return;

    this.canvas.bringObjectForward(activeObject);
    this.canvas.renderAll();
  }

  /**
   * Bring selected object to front
   */
  bringToFront() {
    const activeObject = this.canvas.getActiveObject();
    if (!activeObject) return;

    this.canvas.bringObjectToFront(activeObject);
    this.canvas.renderAll();
  }

  /**
   * Send selected object backward
   */
  sendBackward() {
    const activeObject = this.canvas.getActiveObject();
    if (!activeObject) return;

    // Don't send behind grid
    const gridIndex = this.grid?.gridGroup ? this.canvas.getObjects().indexOf(this.grid.gridGroup) : -1;
    const currentIndex = this.canvas.getObjects().indexOf(activeObject);

    if (gridIndex >= 0 && currentIndex <= gridIndex + 1) {
      return; // Don't send behind grid
    }

    this.canvas.sendObjectBackwards(activeObject);
    this.canvas.renderAll();
  }

  /**
   * Send selected object to back
   */
  sendToBack() {
    const activeObject = this.canvas.getActiveObject();
    if (!activeObject) return;

    // Send to back but keep above grid
    this.canvas.sendObjectToBack(activeObject);

    // If grid exists, make sure object is above it
    if (this.grid?.gridGroup) {
      this.grid.gridGroup.sendToBack();
    }

    this.canvas.renderAll();
  }

  // ==================== Selection Methods ====================

  /**
   * Get the currently selected object(s)
   * @returns {fabric.Object|null}
   */
  getActiveObject() {
    return this.canvas.getActiveObject();
  }

  /**
   * Get all selected objects
   * @returns {fabric.Object[]}
   */
  getActiveObjects() {
    return this.canvas.getActiveObjects();
  }

  /**
   * Select an object by ID
   * @param {string} id - Object ID
   */
  selectById(id) {
    const obj = this.canvas.getObjects().find(o => o.id === id);
    if (obj) {
      this.canvas.setActiveObject(obj);
      this.canvas.renderAll();
    }
  }

  /**
   * Select all objects
   */
  selectAll() {
    const objects = this.canvas.getObjects().filter(obj =>
      obj.selectable && obj !== this.grid?.gridGroup
    );

    if (objects.length === 0) return;

    if (objects.length === 1) {
      this.canvas.setActiveObject(objects[0]);
    } else {
      const selection = new fabric.ActiveSelection(objects, { canvas: this.canvas });
      this.canvas.setActiveObject(selection);
    }

    this.canvas.renderAll();
  }

  /**
   * Deselect all objects
   */
  deselectAll() {
    this.canvas.discardActiveObject();
    this.canvas.renderAll();
  }

  /**
   * Delete selected object(s)
   */
  deleteSelected() {
    const activeObjects = this.canvas.getActiveObjects();

    if (activeObjects.length === 0) return;

    activeObjects.forEach(obj => {
      this.canvas.remove(obj);
    });

    this.canvas.discardActiveObject();
    this.canvas.renderAll();
  }

  // ==================== Object Manipulation ====================

  /**
   * Add an object to the canvas
   * @param {fabric.Object} obj - Object to add
   */
  add(obj) {
    if (!obj.id) {
      obj.id = this._generateObjectId();
    }
    this.canvas.add(obj);
    this.canvas.renderAll();
  }

  /**
   * Remove an object from the canvas
   * @param {fabric.Object} obj - Object to remove
   */
  remove(obj) {
    this.canvas.remove(obj);
    this.canvas.renderAll();
  }

  /**
   * Get all objects on the canvas
   * @returns {fabric.Object[]}
   */
  getObjects() {
    return this.canvas.getObjects().filter(obj => obj !== this.grid?.gridGroup);
  }

  /**
   * Clear all objects from the canvas
   */
  clear() {
    const gridGroup = this.grid?.gridGroup;

    this.canvas.clear();
    this.canvas.backgroundColor = this.options.backgroundColor;

    // Restore grid if it was visible
    if (gridGroup) {
      this.grid.gridGroup = null;
      this.grid.visible = false;
    }

    this.canvas.renderAll();

    if (this.history) {
      this.history.clear();
    }
  }

  // ==================== Canvas Properties ====================

  /**
   * Set canvas dimensions
   * @param {number} width - New width
   * @param {number} height - New height
   */
  setDimensions(width, height) {
    this.canvas.setWidth(width);
    this.canvas.setHeight(height);
    this.options.width = width;
    this.options.height = height;

    // Refresh grid if visible
    if (this.grid) {
      this.grid.refresh();
    }

    this.canvas.renderAll();
  }

  /**
   * Set background color
   * @param {string} color - CSS color
   */
  setBackgroundColor(color) {
    this.canvas.backgroundColor = color;
    this.options.backgroundColor = color;
    this.canvas.renderAll();
  }

  /**
   * Get canvas dimensions
   * @returns {{width: number, height: number}}
   */
  getDimensions() {
    return {
      width: this.canvas.getWidth(),
      height: this.canvas.getHeight()
    };
  }

  // ==================== Event Handling ====================

  /**
   * Add an event listener
   * @param {string} event - Event name
   * @param {Function} callback - Callback function
   */
  on(event, callback) {
    if (this.eventListeners[event]) {
      this.eventListeners[event].push(callback);
    } else {
      // Pass through to Fabric.js canvas
      this.canvas.on(event, callback);
    }
  }

  /**
   * Remove an event listener
   * @param {string} event - Event name
   * @param {Function} callback - Callback function
   */
  off(event, callback) {
    if (this.eventListeners[event]) {
      this.eventListeners[event] = this.eventListeners[event].filter(cb => cb !== callback);
    } else {
      this.canvas.off(event, callback);
    }
  }

  /**
   * Emit an event
   * @private
   */
  _emit(event, data) {
    if (this.eventListeners[event]) {
      this.eventListeners[event].forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('Event listener error:', error);
        }
      });
    }
  }

  // ==================== Serialization ====================

  /**
   * Export canvas state to JSON
   * @returns {Object}
   */
  toJSON() {
    // Temporarily hide grid
    const gridWasVisible = this.grid?.isVisible();
    if (gridWasVisible) {
      this.grid.hide();
    }

    const json = this.canvas.toJSON(['id', 'name', 'selectable', 'evented']);

    // Restore grid
    if (gridWasVisible) {
      this.grid.show();
    }

    return json;
  }

  /**
   * Load canvas state from JSON
   * @param {Object|string} json - JSON object or string
   * @returns {Promise<void>}
   */
  async loadFromJSON(json) {
    return new Promise((resolve, reject) => {
      // Pause history
      const resume = this.history?.pause();

      // Temporarily remove grid
      const gridWasVisible = this.grid?.isVisible();
      if (gridWasVisible) {
        this.grid.hide();
      }

      const jsonObj = typeof json === 'string' ? JSON.parse(json) : json;

      this.canvas.loadFromJSON(jsonObj, () => {
        // Assign IDs to objects without them
        this.canvas.getObjects().forEach(obj => {
          if (!obj.id) {
            obj.id = this._generateObjectId();
          }
        });

        // Restore grid
        if (gridWasVisible) {
          this.grid.show();
        }

        resume?.();

        this.canvas.renderAll();
        resolve();
      }, (o, object) => {
        // Optional: handle each object as it's loaded
      });
    });
  }

  // ==================== Cleanup ====================

  /**
   * Dispose of the canvas and clean up
   */
  dispose() {
    if (this.grid) {
      this.grid.dispose();
    }

    this.canvas.dispose();

    // Clear event listeners
    Object.keys(this.eventListeners).forEach(key => {
      this.eventListeners[key] = [];
    });
  }

  /**
   * Get the underlying Fabric.js canvas
   * @returns {fabric.Canvas}
   */
  getFabricCanvas() {
    return this.canvas;
  }
}

export default FinnishCanvas;

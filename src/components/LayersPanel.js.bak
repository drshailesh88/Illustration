/**
 * LayersPanel.js - Layers panel component for FINNISH project
 *
 * LAYER LIST:
 * - Display all objects on canvas as layers
 * - Thumbnail preview for each layer
 * - Layer name (editable on double-click)
 * - Visibility toggle (eye icon)
 * - Lock toggle (lock icon)
 * - Drag to reorder layers
 *
 * LAYER ACTIONS:
 * - New layer button
 * - Delete layer button
 * - Duplicate layer button
 * - Group selected layers
 * - Ungroup
 *
 * LAYER HIERARCHY:
 * - Nested groups shown with indentation
 * - Expand/collapse groups
 * - Select multiple layers (shift+click, ctrl+click)
 *
 * SYNC WITH CANVAS:
 * - When canvas object selected, highlight in panel
 * - When panel layer clicked, select on canvas
 * - Real-time update when objects added/removed
 */

import { LayerItem } from './LayerItem.js';

export class LayersPanel {
  constructor(options = {}) {
    this.container = options.container || null;
    this.canvas = null;
    this.layers = new Map(); // id -> LayerItem
    this.objectToLayer = new Map(); // fabric object -> LayerItem
    this.selectedLayers = new Set();
    this.lastSelectedLayer = null;
    this.expandedGroups = new Set();

    this.element = null;
    this.layerList = null;
    this.actionBar = null;
    this.contextMenu = null;

    this.createElement();
    this.createContextMenu();

    if (this.container) {
      this.container.appendChild(this.element);
    }
  }

  createElement() {
    this.element = document.createElement('div');
    this.element.className = 'layers-panel';

    // Header
    const header = document.createElement('div');
    header.className = 'layers-panel-header';

    const title = document.createElement('h3');
    title.textContent = 'Layers';
    header.appendChild(title);

    // Search/filter (optional)
    const searchContainer = document.createElement('div');
    searchContainer.className = 'layers-search';

    this.searchInput = document.createElement('input');
    this.searchInput.type = 'text';
    this.searchInput.placeholder = 'Filter layers...';
    this.searchInput.className = 'layers-search-input';
    this.searchInput.addEventListener('input', () => this.filterLayers());
    searchContainer.appendChild(this.searchInput);

    header.appendChild(searchContainer);
    this.element.appendChild(header);

    // Layer list container
    const listContainer = document.createElement('div');
    listContainer.className = 'layers-list-container';

    this.layerList = document.createElement('div');
    this.layerList.className = 'layers-list';
    listContainer.appendChild(this.layerList);

    this.element.appendChild(listContainer);

    // Action bar
    this.actionBar = document.createElement('div');
    this.actionBar.className = 'layers-action-bar';

    // New layer button
    const newLayerBtn = this.createActionButton(
      'new-layer',
      'New Layer',
      `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 2v12M2 8h12" stroke="currentColor" stroke-width="2" fill="none"/>
      </svg>`,
      () => this.createNewLayer()
    );
    this.actionBar.appendChild(newLayerBtn);

    // Duplicate button
    const duplicateBtn = this.createActionButton(
      'duplicate-layer',
      'Duplicate Layer',
      `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <rect x="4" y="4" width="8" height="8" fill="none" stroke="currentColor" stroke-width="1.5"/>
        <rect x="2" y="2" width="8" height="8" fill="none" stroke="currentColor" stroke-width="1.5"/>
      </svg>`,
      () => this.duplicateSelected()
    );
    this.actionBar.appendChild(duplicateBtn);

    // Group button
    const groupBtn = this.createActionButton(
      'group-layers',
      'Group Layers',
      `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <rect x="1" y="1" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5"/>
        <rect x="9" y="1" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5"/>
        <rect x="1" y="9" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5"/>
        <rect x="9" y="9" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5"/>
      </svg>`,
      () => this.groupSelected()
    );
    this.actionBar.appendChild(groupBtn);

    // Ungroup button
    const ungroupBtn = this.createActionButton(
      'ungroup-layers',
      'Ungroup',
      `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <rect x="1" y="1" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2,2"/>
        <rect x="9" y="1" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2,2"/>
        <rect x="1" y="9" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2,2"/>
        <rect x="9" y="9" width="6" height="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2,2"/>
      </svg>`,
      () => this.ungroupSelected()
    );
    this.actionBar.appendChild(ungroupBtn);

    // Delete button
    const deleteBtn = this.createActionButton(
      'delete-layer',
      'Delete Layer',
      `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M4 4h8v10H4zM6 2h4M2 4h12" fill="none" stroke="currentColor" stroke-width="1.5"/>
        <path d="M6 6v6M8 6v6M10 6v6" fill="none" stroke="currentColor" stroke-width="1"/>
      </svg>`,
      () => this.deleteSelected()
    );
    this.actionBar.appendChild(deleteBtn);

    this.element.appendChild(this.actionBar);
  }

  createActionButton(id, title, icon, onClick) {
    const btn = document.createElement('button');
    btn.className = 'layers-action-btn';
    btn.id = id;
    btn.title = title;
    btn.innerHTML = icon;
    btn.addEventListener('click', onClick);
    return btn;
  }

  createContextMenu() {
    this.contextMenu = document.createElement('div');
    this.contextMenu.className = 'layers-context-menu';
    this.contextMenu.style.display = 'none';

    const menuItems = [
      { id: 'ctx-duplicate', label: 'Duplicate', action: () => this.duplicateSelected() },
      { id: 'ctx-delete', label: 'Delete', action: () => this.deleteSelected() },
      { id: 'ctx-separator1', separator: true },
      { id: 'ctx-group', label: 'Group', action: () => this.groupSelected() },
      { id: 'ctx-ungroup', label: 'Ungroup', action: () => this.ungroupSelected() },
      { id: 'ctx-separator2', separator: true },
      { id: 'ctx-bring-front', label: 'Bring to Front', action: () => this.bringToFront() },
      { id: 'ctx-bring-forward', label: 'Bring Forward', action: () => this.bringForward() },
      { id: 'ctx-send-backward', label: 'Send Backward', action: () => this.sendBackward() },
      { id: 'ctx-send-back', label: 'Send to Back', action: () => this.sendToBack() },
      { id: 'ctx-separator3', separator: true },
      { id: 'ctx-lock', label: 'Lock', action: () => this.toggleLockSelected() },
      { id: 'ctx-hide', label: 'Hide', action: () => this.toggleVisibilitySelected() },
    ];

    menuItems.forEach(item => {
      if (item.separator) {
        const separator = document.createElement('div');
        separator.className = 'context-menu-separator';
        this.contextMenu.appendChild(separator);
      } else {
        const menuItem = document.createElement('div');
        menuItem.className = 'context-menu-item';
        menuItem.id = item.id;
        menuItem.textContent = item.label;
        menuItem.addEventListener('click', () => {
          item.action();
          this.hideContextMenu();
        });
        this.contextMenu.appendChild(menuItem);
      }
    });

    document.body.appendChild(this.contextMenu);

    // Hide context menu on click outside
    document.addEventListener('click', (e) => {
      if (!this.contextMenu.contains(e.target)) {
        this.hideContextMenu();
      }
    });
  }

  showContextMenu(x, y) {
    this.contextMenu.style.display = 'block';
    this.contextMenu.style.left = `${x}px`;
    this.contextMenu.style.top = `${y}px`;

    // Ensure menu stays within viewport
    const rect = this.contextMenu.getBoundingClientRect();
    if (rect.right > window.innerWidth) {
      this.contextMenu.style.left = `${window.innerWidth - rect.width - 5}px`;
    }
    if (rect.bottom > window.innerHeight) {
      this.contextMenu.style.top = `${window.innerHeight - rect.height - 5}px`;
    }
  }

  hideContextMenu() {
    this.contextMenu.style.display = 'none';
  }

  /**
   * Connect to Fabric.js canvas
   * @param {fabric.Canvas} fabricCanvas - The Fabric.js canvas instance
   */
  setCanvas(fabricCanvas) {
    this.canvas = fabricCanvas;
    this.attachCanvasListeners();
    this.refresh();
  }

  attachCanvasListeners() {
    if (!this.canvas) return;

    // Object added
    this.canvas.on('object:added', (e) => {
      if (e.target && !e.target._layerIgnore) {
        this.addLayerForObject(e.target);
      }
    });

    // Object removed
    this.canvas.on('object:removed', (e) => {
      if (e.target) {
        this.removeLayerForObject(e.target);
      }
    });

    // Object modified
    this.canvas.on('object:modified', (e) => {
      if (e.target) {
        const layer = this.objectToLayer.get(e.target);
        if (layer) {
          layer.updateThumbnail();
        }
      }
    });

    // Selection created/updated
    this.canvas.on('selection:created', (e) => this.syncSelectionFromCanvas(e));
    this.canvas.on('selection:updated', (e) => this.syncSelectionFromCanvas(e));
    this.canvas.on('selection:cleared', () => this.clearSelection());

    // Object moved (z-index change)
    this.canvas.on('object:moving', () => {
      // Optional: update during move if needed
    });
  }

  syncSelectionFromCanvas(e) {
    this.clearSelection(false);

    const activeObjects = this.canvas.getActiveObjects();
    activeObjects.forEach(obj => {
      const layer = this.objectToLayer.get(obj);
      if (layer) {
        this.selectedLayers.add(layer.id);
        layer.setSelected(true);
      }
    });
  }

  /**
   * Update layer list from canvas
   */
  refresh() {
    // Clear existing layers
    this.layers.forEach(layer => layer.destroy());
    this.layers.clear();
    this.objectToLayer.clear();
    this.selectedLayers.clear();
    this.layerList.innerHTML = '';

    if (!this.canvas) return;

    // Get all objects from canvas (in reverse order for layer display - top layer first)
    const objects = this.canvas.getObjects().slice().reverse();

    objects.forEach((obj, index) => {
      this.addLayerForObject(obj, false);
    });

    // Sync selection
    const activeObjects = this.canvas.getActiveObjects();
    activeObjects.forEach(obj => {
      const layer = this.objectToLayer.get(obj);
      if (layer) {
        this.selectedLayers.add(layer.id);
        layer.setSelected(true);
      }
    });
  }

  addLayerForObject(obj, prepend = true) {
    // Skip if already has a layer
    if (this.objectToLayer.has(obj)) return;

    // Generate name based on object type
    const name = this.generateLayerName(obj);

    const layerItem = new LayerItem({
      object: obj,
      name: name,
      visible: obj.visible !== false,
      locked: !obj.selectable,
      depth: 0,
      panel: this,
      onSelect: (layer, e) => this.handleLayerSelect(layer, e),
      onVisibilityChange: (layer, visible) => this.handleVisibilityChange(layer, visible),
      onLockChange: (layer, locked) => this.handleLockChange(layer, locked),
      onNameChange: (layer, name) => this.handleNameChange(layer, name),
      onReorder: (draggedId, targetId, position) => this.handleReorder(draggedId, targetId, position),
      onContextMenu: (layer, e) => this.handleContextMenu(layer, e),
      onExpandToggle: (layer, expanded) => this.handleExpandToggle(layer, expanded),
    });

    // Store references
    this.layers.set(layerItem.id, layerItem);
    this.objectToLayer.set(obj, layerItem);

    // Store layer ID on object for reference
    obj._layerId = layerItem.id;

    // Add to DOM
    if (prepend) {
      this.layerList.insertBefore(layerItem.getElement(), this.layerList.firstChild);
    } else {
      this.layerList.appendChild(layerItem.getElement());
    }

    // Handle groups
    if (obj.type === 'group' && obj._objects) {
      this.addGroupChildren(obj, layerItem, 1);
    }
  }

  addGroupChildren(group, parentLayer, depth) {
    const children = group._objects || [];

    children.forEach(childObj => {
      const name = this.generateLayerName(childObj);

      const childLayer = new LayerItem({
        object: childObj,
        name: name,
        visible: childObj.visible !== false,
        locked: !childObj.selectable,
        depth: depth,
        parent: parentLayer,
        panel: this,
        onSelect: (layer, e) => this.handleLayerSelect(layer, e),
        onVisibilityChange: (layer, visible) => this.handleVisibilityChange(layer, visible),
        onLockChange: (layer, locked) => this.handleLockChange(layer, locked),
        onNameChange: (layer, name) => this.handleNameChange(layer, name),
        onReorder: (draggedId, targetId, position) => this.handleReorder(draggedId, targetId, position),
        onContextMenu: (layer, e) => this.handleContextMenu(layer, e),
        onExpandToggle: (layer, expanded) => this.handleExpandToggle(layer, expanded),
      });

      parentLayer.children.push(childLayer);
      this.layers.set(childLayer.id, childLayer);
      this.objectToLayer.set(childObj, childLayer);
      childObj._layerId = childLayer.id;

      // Insert after parent
      const parentElement = parentLayer.getElement();
      parentElement.parentNode.insertBefore(childLayer.getElement(), parentElement.nextSibling);

      // Recursive for nested groups
      if (childObj.type === 'group' && childObj._objects) {
        this.addGroupChildren(childObj, childLayer, depth + 1);
      }
    });
  }

  removeLayerForObject(obj) {
    const layer = this.objectToLayer.get(obj);
    if (!layer) return;

    // Remove children first
    layer.children.forEach(child => {
      this.layers.delete(child.id);
      if (child.object) {
        this.objectToLayer.delete(child.object);
      }
      child.destroy();
    });

    // Remove layer
    this.layers.delete(layer.id);
    this.objectToLayer.delete(obj);
    this.selectedLayers.delete(layer.id);
    layer.destroy();
  }

  generateLayerName(obj) {
    const typeNames = {
      'rect': 'Rectangle',
      'circle': 'Circle',
      'ellipse': 'Ellipse',
      'triangle': 'Triangle',
      'polygon': 'Polygon',
      'line': 'Line',
      'polyline': 'Polyline',
      'path': 'Path',
      'group': 'Group',
      'i-text': 'Text',
      'text': 'Text',
      'textbox': 'Text Box',
      'image': 'Image',
      'activeSelection': 'Selection',
    };

    const baseName = obj.name || typeNames[obj.type] || 'Object';
    const count = this.getObjectTypeCount(obj.type);

    return count > 0 ? `${baseName} ${count + 1}` : baseName;
  }

  getObjectTypeCount(type) {
    let count = 0;
    this.layers.forEach(layer => {
      if (layer.object && layer.object.type === type) {
        count++;
      }
    });
    return count;
  }

  handleLayerSelect(layer, e) {
    const isMultiSelect = e.shiftKey || e.ctrlKey || e.metaKey;

    if (e.shiftKey && this.lastSelectedLayer) {
      // Range selection
      this.selectRange(this.lastSelectedLayer, layer);
    } else if (e.ctrlKey || e.metaKey) {
      // Toggle selection
      if (this.selectedLayers.has(layer.id)) {
        this.selectedLayers.delete(layer.id);
        layer.setSelected(false);
      } else {
        this.selectedLayers.add(layer.id);
        layer.setSelected(true);
      }
    } else {
      // Single selection
      this.clearSelection(false);
      this.selectedLayers.add(layer.id);
      layer.setSelected(true);
    }

    this.lastSelectedLayer = layer;
    this.syncSelectionToCanvas();
  }

  selectRange(fromLayer, toLayer) {
    const layerElements = Array.from(this.layerList.children);
    const fromIndex = layerElements.indexOf(fromLayer.getElement());
    const toIndex = layerElements.indexOf(toLayer.getElement());

    const start = Math.min(fromIndex, toIndex);
    const end = Math.max(fromIndex, toIndex);

    this.clearSelection(false);

    for (let i = start; i <= end; i++) {
      const layerId = layerElements[i].dataset.layerId;
      const layer = this.layers.get(layerId);
      if (layer) {
        this.selectedLayers.add(layer.id);
        layer.setSelected(true);
      }
    }
  }

  clearSelection(syncToCanvas = true) {
    this.selectedLayers.forEach(layerId => {
      const layer = this.layers.get(layerId);
      if (layer) {
        layer.setSelected(false);
      }
    });
    this.selectedLayers.clear();

    if (syncToCanvas && this.canvas) {
      this.canvas.discardActiveObject();
      this.canvas.requestRenderAll();
    }
  }

  syncSelectionToCanvas() {
    if (!this.canvas) return;

    const objects = [];
    this.selectedLayers.forEach(layerId => {
      const layer = this.layers.get(layerId);
      if (layer && layer.object && layer.object.selectable !== false) {
        objects.push(layer.object);
      }
    });

    if (objects.length === 0) {
      this.canvas.discardActiveObject();
    } else if (objects.length === 1) {
      this.canvas.setActiveObject(objects[0]);
    } else {
      const selection = new fabric.ActiveSelection(objects, { canvas: this.canvas });
      this.canvas.setActiveObject(selection);
    }

    this.canvas.requestRenderAll();
  }

  handleVisibilityChange(layer, visible) {
    if (this.canvas) {
      this.canvas.requestRenderAll();
    }
  }

  handleLockChange(layer, locked) {
    // Update is handled in LayerItem
  }

  handleNameChange(layer, name) {
    if (layer.object) {
      layer.object.name = name;
    }
  }

  handleReorder(draggedId, targetId, position) {
    const draggedLayer = this.layers.get(draggedId);
    const targetLayer = this.layers.get(targetId);

    if (!draggedLayer || !targetLayer) return;
    if (!draggedLayer.object || !targetLayer.object) return;

    const draggedObj = draggedLayer.object;
    const targetObj = targetLayer.object;

    // Get current canvas objects
    const objects = this.canvas.getObjects();
    const draggedIndex = objects.indexOf(draggedObj);
    const targetIndex = objects.indexOf(targetObj);

    if (draggedIndex === -1 || targetIndex === -1) return;

    // Remove from current position
    this.canvas.remove(draggedObj);

    // Calculate new index (remember: canvas is bottom-to-top, panel is top-to-bottom)
    let newIndex = targetIndex;
    if (position === 'before') {
      // In panel "before" means higher in list = higher z-index in canvas
      newIndex = targetIndex;
    } else {
      // In panel "after" means lower in list = lower z-index in canvas
      newIndex = targetIndex;
    }

    // Adjust for removal
    if (draggedIndex < targetIndex) {
      newIndex--;
    }

    // Re-insert at new position
    const currentObjects = this.canvas.getObjects();
    this.canvas.insertAt(draggedObj, newIndex);

    // Update DOM
    const draggedElement = draggedLayer.getElement();
    const targetElement = targetLayer.getElement();

    if (position === 'before') {
      this.layerList.insertBefore(draggedElement, targetElement);
    } else {
      this.layerList.insertBefore(draggedElement, targetElement.nextSibling);
    }

    this.canvas.requestRenderAll();
  }

  handleContextMenu(layer, e) {
    // Ensure layer is selected
    if (!this.selectedLayers.has(layer.id)) {
      this.clearSelection(false);
      this.selectedLayers.add(layer.id);
      layer.setSelected(true);
      this.syncSelectionToCanvas();
    }

    this.showContextMenu(e.clientX, e.clientY);
  }

  handleExpandToggle(layer, expanded) {
    // Show/hide children
    layer.children.forEach(child => {
      child.getElement().style.display = expanded ? 'flex' : 'none';
    });
  }

  filterLayers() {
    const query = this.searchInput.value.toLowerCase().trim();

    this.layers.forEach(layer => {
      const element = layer.getElement();
      if (!query || layer.name.toLowerCase().includes(query)) {
        element.style.display = 'flex';
      } else {
        element.style.display = 'none';
      }
    });
  }

  /**
   * Create a new empty layer (rectangle as placeholder)
   */
  createNewLayer() {
    if (!this.canvas) return;

    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      fill: '#cccccc',
      stroke: '#999999',
      strokeWidth: 1,
      name: 'New Layer',
    });

    this.canvas.add(rect);
    this.canvas.setActiveObject(rect);
    this.canvas.requestRenderAll();
  }

  /**
   * Duplicate selected layers
   */
  duplicateSelected() {
    if (!this.canvas || this.selectedLayers.size === 0) return;

    const toDuplicate = [];
    this.selectedLayers.forEach(layerId => {
      const layer = this.layers.get(layerId);
      if (layer && layer.object) {
        toDuplicate.push(layer.object);
      }
    });

    toDuplicate.forEach(obj => {
      obj.clone((cloned) => {
        cloned.set({
          left: obj.left + 20,
          top: obj.top + 20,
          name: (obj.name || 'Object') + ' Copy',
        });
        this.canvas.add(cloned);
      });
    });

    this.canvas.requestRenderAll();
  }

  /**
   * Group selected layers
   */
  groupSelected() {
    if (!this.canvas || this.selectedLayers.size < 2) return;

    const objects = [];
    this.selectedLayers.forEach(layerId => {
      const layer = this.layers.get(layerId);
      if (layer && layer.object) {
        objects.push(layer.object);
      }
    });

    if (objects.length < 2) return;

    // Create group
    const group = new fabric.Group(objects, {
      name: 'Group',
    });

    // Remove individual objects
    objects.forEach(obj => {
      this.canvas.remove(obj);
    });

    // Add group
    this.canvas.add(group);
    this.canvas.setActiveObject(group);
    this.canvas.requestRenderAll();
    this.refresh();
  }

  /**
   * Ungroup selected group
   */
  ungroupSelected() {
    if (!this.canvas) return;

    this.selectedLayers.forEach(layerId => {
      const layer = this.layers.get(layerId);
      if (layer && layer.object && layer.object.type === 'group') {
        const group = layer.object;
        const items = group._objects.slice();

        // Ungroup
        group._restoreObjectsState();
        this.canvas.remove(group);

        items.forEach(item => {
          this.canvas.add(item);
        });
      }
    });

    this.canvas.discardActiveObject();
    this.canvas.requestRenderAll();
    this.refresh();
  }

  /**
   * Delete selected layers
   */
  deleteSelected() {
    if (!this.canvas || this.selectedLayers.size === 0) return;

    const toDelete = [];
    this.selectedLayers.forEach(layerId => {
      const layer = this.layers.get(layerId);
      if (layer && layer.object) {
        toDelete.push(layer.object);
      }
    });

    toDelete.forEach(obj => {
      this.canvas.remove(obj);
    });

    this.canvas.discardActiveObject();
    this.canvas.requestRenderAll();
  }

  /**
   * Bring selected objects to front
   */
  bringToFront() {
    if (!this.canvas) return;

    this.selectedLayers.forEach(layerId => {
      const layer = this.layers.get(layerId);
      if (layer && layer.object) {
        this.canvas.bringObjectToFront(layer.object);
      }
    });

    this.canvas.requestRenderAll();
    this.refresh();
  }

  /**
   * Bring selected objects forward
   */
  bringForward() {
    if (!this.canvas) return;

    this.selectedLayers.forEach(layerId => {
      const layer = this.layers.get(layerId);
      if (layer && layer.object) {
        this.canvas.bringObjectForward(layer.object);
      }
    });

    this.canvas.requestRenderAll();
    this.refresh();
  }

  /**
   * Send selected objects backward
   */
  sendBackward() {
    if (!this.canvas) return;

    this.selectedLayers.forEach(layerId => {
      const layer = this.layers.get(layerId);
      if (layer && layer.object) {
        this.canvas.sendObjectBackwards(layer.object);
      }
    });

    this.canvas.requestRenderAll();
    this.refresh();
  }

  /**
   * Send selected objects to back
   */
  sendToBack() {
    if (!this.canvas) return;

    this.selectedLayers.forEach(layerId => {
      const layer = this.layers.get(layerId);
      if (layer && layer.object) {
        this.canvas.sendObjectToBack(layer.object);
      }
    });

    this.canvas.requestRenderAll();
    this.refresh();
  }

  /**
   * Toggle lock on selected layers
   */
  toggleLockSelected() {
    this.selectedLayers.forEach(layerId => {
      const layer = this.layers.get(layerId);
      if (layer) {
        layer.toggleLock();
      }
    });
  }

  /**
   * Toggle visibility on selected layers
   */
  toggleVisibilitySelected() {
    this.selectedLayers.forEach(layerId => {
      const layer = this.layers.get(layerId);
      if (layer) {
        layer.toggleVisibility();
      }
    });

    if (this.canvas) {
      this.canvas.requestRenderAll();
    }
  }

  /**
   * Select layer programmatically by ID
   * @param {string} id - Layer ID
   */
  selectLayer(id) {
    const layer = this.layers.get(id);
    if (!layer) return;

    this.clearSelection(false);
    this.selectedLayers.add(id);
    layer.setSelected(true);
    this.lastSelectedLayer = layer;
    this.syncSelectionToCanvas();

    // Scroll layer into view
    layer.getElement().scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /**
   * Get selected layer IDs
   * @returns {string[]} Array of selected layer IDs
   */
  getSelectedLayers() {
    return Array.from(this.selectedLayers);
  }

  /**
   * Get layer by object
   * @param {fabric.Object} obj - Fabric.js object
   * @returns {LayerItem|undefined}
   */
  getLayerByObject(obj) {
    return this.objectToLayer.get(obj);
  }

  /**
   * Get layer by ID
   * @param {string} id - Layer ID
   * @returns {LayerItem|undefined}
   */
  getLayerById(id) {
    return this.layers.get(id);
  }

  /**
   * Get the DOM element
   * @returns {HTMLElement}
   */
  getElement() {
    return this.element;
  }

  /**
   * Destroy the panel and clean up
   */
  destroy() {
    this.layers.forEach(layer => layer.destroy());
    this.layers.clear();
    this.objectToLayer.clear();
    this.selectedLayers.clear();

    if (this.contextMenu && this.contextMenu.parentNode) {
      this.contextMenu.parentNode.removeChild(this.contextMenu);
    }

    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }

    this.canvas = null;
    this.element = null;
  }
}

export default LayersPanel;

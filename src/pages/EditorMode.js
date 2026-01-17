/**
 * FINNISH - Editor Mode
 *
 * Adobe Illustrator-like canvas editor with:
 * - Left sidebar: Toolbar
 * - Center: Canvas (Fabric.js)
 * - Right sidebar: Properties panel + Layers panel
 * - Top: Menu bar (File, Edit, View, Export)
 * - Bottom: Status bar (zoom level, canvas size, selection info)
 */

import { fabric } from 'fabric';

// SVG Icons for tools
const ToolIcons = {
    select: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/>
        <path d="M13 13l6 6"/>
    </svg>`,
    hand: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v0"/>
        <path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v6"/>
        <path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8"/>
        <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2a8 8 0 0 1-8-8V6"/>
    </svg>`,
    rectangle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
    </svg>`,
    ellipse: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <ellipse cx="12" cy="12" rx="10" ry="8"/>
    </svg>`,
    line: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="5" y1="19" x2="19" y2="5"/>
    </svg>`,
    arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="5" y1="12" x2="19" y2="12"/>
        <polyline points="15 8 19 12 15 16"/>
    </svg>`,
    pen: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 19l7-7 3 3-7 7-3-3z"/>
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
        <path d="M2 2l7.586 7.586"/>
        <circle cx="11" cy="11" r="2"/>
    </svg>`,
    text: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="4 7 4 4 20 4 20 7"/>
        <line x1="9" y1="20" x2="15" y2="20"/>
        <line x1="12" y1="4" x2="12" y2="20"/>
    </svg>`,
    image: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
    </svg>`,
    zoomIn: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
    </svg>`,
    zoomOut: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        <line x1="8" y1="11" x2="14" y2="11"/>
    </svg>`,
    undo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>
    </svg>`,
    redo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/>
    </svg>`,
    delete: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="3 6 5 6 21 6"/>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>`,
    eye: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
    </svg>`,
    eyeOff: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>`,
    chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"/>
    </svg>`,
    layers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/>
        <polyline points="2 12 12 17 22 12"/>
    </svg>`,
    box: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
    </svg>`,
    circle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
    </svg>`
};

// Tool definitions
const TOOLS = [
    { id: 'select', name: 'Select', icon: ToolIcons.select, shortcut: 'V' },
    { id: 'hand', name: 'Hand', icon: ToolIcons.hand, shortcut: 'H' },
    { type: 'separator' },
    { id: 'rectangle', name: 'Rectangle', icon: ToolIcons.rectangle, shortcut: 'R' },
    { id: 'ellipse', name: 'Ellipse', icon: ToolIcons.ellipse, shortcut: 'E' },
    { id: 'line', name: 'Line', icon: ToolIcons.line, shortcut: 'L' },
    { id: 'arrow', name: 'Arrow', icon: ToolIcons.arrow, shortcut: 'A' },
    { type: 'separator' },
    { id: 'pen', name: 'Pen', icon: ToolIcons.pen, shortcut: 'P' },
    { id: 'text', name: 'Text', icon: ToolIcons.text, shortcut: 'T' },
    { id: 'image', name: 'Image', icon: ToolIcons.image, shortcut: 'I' }
];

class EditorMode {
    constructor(container, app) {
        this.container = container;
        this.app = app;

        // State
        this.currentTool = 'select';
        this.canvas = null;
        this.zoom = 100;
        this.canvasWidth = 800;
        this.canvasHeight = 600;
        this.history = [];
        this.historyIndex = -1;
        this.maxHistory = 50;
        this.isPanning = false;
        this.lastPanPoint = null;
        this.isDrawing = false;
        this.drawStartPoint = null;
        this.tempShape = null;

        // DOM references
        this.canvasElement = null;
        this.propertiesPanel = null;
        this.layersPanel = null;

        this.init();
    }

    init() {
        this.render();
        this.initCanvas();
        this.setupEventListeners();
        this.updateStatusBar();

        // Check if there's a diagram to load
        const sharedState = this.app.getSharedState();
        if (sharedState.currentDiagram) {
            this.loadDiagram(sharedState.currentDiagram);
        }
    }

    render() {
        this.container.innerHTML = `
            <div class="editor-mode">
                <!-- Menu Bar -->
                <div class="menu-bar">
                    <div class="menu-item" data-menu="file">File</div>
                    <div class="menu-item" data-menu="edit">Edit</div>
                    <div class="menu-item" data-menu="view">View</div>
                    <div class="menu-item" data-menu="object">Object</div>
                    <div class="menu-item" data-menu="export">Export</div>
                    <div class="menu-separator"></div>
                    <button class="tool-btn" data-action="undo" data-tooltip="Undo (Ctrl+Z)">
                        ${ToolIcons.undo}
                    </button>
                    <button class="tool-btn" data-action="redo" data-tooltip="Redo (Ctrl+Y)">
                        ${ToolIcons.redo}
                    </button>
                    <div class="menu-separator"></div>
                    <button class="tool-btn" data-action="delete" data-tooltip="Delete">
                        ${ToolIcons.delete}
                    </button>
                </div>

                <!-- Editor Container -->
                <div class="editor-container">
                    <!-- Left Toolbar -->
                    <aside class="toolbar">
                        ${TOOLS.map(tool => {
                            if (tool.type === 'separator') {
                                return '<div class="toolbar-separator"></div>';
                            }
                            return `
                                <button
                                    class="tool-btn ${tool.id === this.currentTool ? 'active' : ''}"
                                    data-tool="${tool.id}"
                                    data-tooltip="${tool.name} (${tool.shortcut})"
                                >
                                    ${tool.icon}
                                </button>
                            `;
                        }).join('')}
                    </aside>

                    <!-- Canvas Area -->
                    <div class="canvas-area" id="canvas-area">
                        <div class="canvas-wrapper" id="canvas-wrapper">
                            <canvas id="editor-canvas"></canvas>
                        </div>
                    </div>

                    <!-- Right Sidebar -->
                    <aside class="right-sidebar">
                        <!-- Properties Panel -->
                        <div class="panel" id="properties-panel">
                            <div class="panel-header">
                                <h4>Properties</h4>
                                ${ToolIcons.chevron}
                            </div>
                            <div class="panel-content" id="properties-content">
                                <div class="empty-state">
                                    <p>Select an object to edit its properties</p>
                                </div>
                            </div>
                        </div>

                        <!-- Layers Panel -->
                        <div class="panel" id="layers-panel">
                            <div class="panel-header">
                                <h4>Layers</h4>
                                ${ToolIcons.chevron}
                            </div>
                            <div class="panel-content">
                                <div class="layers-list" id="layers-list">
                                    <!-- Layers will be rendered here -->
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>

                <!-- Status Bar -->
                <div class="status-bar">
                    <div class="status-item">
                        <span id="selection-info">No selection</span>
                    </div>
                    <div class="status-item">
                        <span>Canvas: ${this.canvasWidth} x ${this.canvasHeight}</span>
                    </div>
                    <div class="status-spacer"></div>
                    <div class="status-item zoom-control">
                        <button class="zoom-btn" data-action="zoom-out">-</button>
                        <span id="zoom-level">${this.zoom}%</span>
                        <button class="zoom-btn" data-action="zoom-in">+</button>
                    </div>
                </div>
            </div>
        `;

        this.propertiesPanel = document.getElementById('properties-content');
        this.layersPanel = document.getElementById('layers-list');
    }

    initCanvas() {
        this.canvasElement = document.getElementById('editor-canvas');

        // Initialize Fabric.js canvas
        this.canvas = new fabric.Canvas('editor-canvas', {
            width: this.canvasWidth,
            height: this.canvasHeight,
            backgroundColor: '#ffffff',
            selection: true,
            preserveObjectStacking: true
        });

        // Set canvas wrapper size
        const wrapper = document.getElementById('canvas-wrapper');
        wrapper.style.width = this.canvasWidth + 'px';
        wrapper.style.height = this.canvasHeight + 'px';

        // Save initial state
        this.saveState();
    }

    setupEventListeners() {
        // Tool selection
        const toolButtons = this.container.querySelectorAll('[data-tool]');
        toolButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.selectTool(btn.dataset.tool);
            });
        });

        // Menu actions
        const menuItems = this.container.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                this.handleMenuClick(item.dataset.menu);
            });
        });

        // Action buttons (undo, redo, delete)
        const actionButtons = this.container.querySelectorAll('[data-action]');
        actionButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.handleAction(btn.dataset.action);
            });
        });

        // Panel collapse toggle
        const panelHeaders = this.container.querySelectorAll('.panel-header');
        panelHeaders.forEach(header => {
            header.addEventListener('click', () => {
                header.parentElement.classList.toggle('collapsed');
            });
        });

        // Canvas events
        this.canvas.on('selection:created', (e) => this.onSelectionChange(e));
        this.canvas.on('selection:updated', (e) => this.onSelectionChange(e));
        this.canvas.on('selection:cleared', () => this.onSelectionCleared());
        this.canvas.on('object:modified', () => this.saveState());
        this.canvas.on('object:added', () => {
            this.updateLayersPanel();
            this.saveState();
        });
        this.canvas.on('object:removed', () => {
            this.updateLayersPanel();
            this.saveState();
        });

        // Mouse events for drawing shapes
        this.canvas.on('mouse:down', (e) => this.onMouseDown(e));
        this.canvas.on('mouse:move', (e) => this.onMouseMove(e));
        this.canvas.on('mouse:up', (e) => this.onMouseUp(e));

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));

        // Zoom controls
        const canvasArea = document.getElementById('canvas-area');
        canvasArea.addEventListener('wheel', (e) => {
            if (e.ctrlKey) {
                e.preventDefault();
                const delta = e.deltaY > 0 ? -10 : 10;
                this.setZoom(this.zoom + delta);
            }
        });
    }

    selectTool(toolId) {
        this.currentTool = toolId;

        // Update UI
        const toolButtons = this.container.querySelectorAll('[data-tool]');
        toolButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tool === toolId);
        });

        // Update canvas mode
        if (toolId === 'select') {
            this.canvas.selection = true;
            this.canvas.defaultCursor = 'default';
            this.canvas.hoverCursor = 'move';
        } else if (toolId === 'hand') {
            this.canvas.selection = false;
            this.canvas.defaultCursor = 'grab';
            this.canvas.hoverCursor = 'grab';
        } else if (toolId === 'text') {
            this.canvas.selection = false;
            this.canvas.defaultCursor = 'text';
        } else {
            this.canvas.selection = false;
            this.canvas.defaultCursor = 'crosshair';
            this.canvas.hoverCursor = 'crosshair';
        }

        this.canvas.renderAll();
    }

    handleMenuClick(menu) {
        switch (menu) {
            case 'file':
                this.showFileMenu();
                break;
            case 'edit':
                this.showEditMenu();
                break;
            case 'view':
                this.showViewMenu();
                break;
            case 'object':
                this.showObjectMenu();
                break;
            case 'export':
                this.showExportMenu();
                break;
        }
    }

    handleAction(action) {
        switch (action) {
            case 'undo':
                this.undo();
                break;
            case 'redo':
                this.redo();
                break;
            case 'delete':
                this.deleteSelected();
                break;
            case 'zoom-in':
                this.setZoom(this.zoom + 10);
                break;
            case 'zoom-out':
                this.setZoom(this.zoom - 10);
                break;
        }
    }

    handleKeyDown(e) {
        // Don't handle if typing in input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        // Tool shortcuts
        const toolShortcuts = {
            'v': 'select',
            'h': 'hand',
            'r': 'rectangle',
            'e': 'ellipse',
            'l': 'line',
            'a': 'arrow',
            'p': 'pen',
            't': 'text',
            'i': 'image'
        };

        const key = e.key.toLowerCase();

        if (toolShortcuts[key] && !e.ctrlKey && !e.metaKey) {
            this.selectTool(toolShortcuts[key]);
            return;
        }

        // Ctrl/Cmd shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch (key) {
                case 'z':
                    e.preventDefault();
                    if (e.shiftKey) {
                        this.redo();
                    } else {
                        this.undo();
                    }
                    break;
                case 'y':
                    e.preventDefault();
                    this.redo();
                    break;
                case 's':
                    e.preventDefault();
                    this.exportSVG();
                    break;
                case 'a':
                    e.preventDefault();
                    this.selectAll();
                    break;
            }
        }

        // Delete key
        if (key === 'delete' || key === 'backspace') {
            if (this.canvas.getActiveObject()) {
                e.preventDefault();
                this.deleteSelected();
            }
        }

        // Escape to deselect
        if (key === 'escape') {
            this.canvas.discardActiveObject();
            this.canvas.renderAll();
        }
    }

    onMouseDown(e) {
        const pointer = this.canvas.getPointer(e.e);

        if (this.currentTool === 'hand') {
            this.isPanning = true;
            this.lastPanPoint = { x: e.e.clientX, y: e.e.clientY };
            this.canvas.defaultCursor = 'grabbing';
            return;
        }

        if (this.currentTool === 'text') {
            this.addText(pointer);
            return;
        }

        // Drawing tools
        if (['rectangle', 'ellipse', 'line', 'arrow'].includes(this.currentTool)) {
            this.isDrawing = true;
            this.drawStartPoint = pointer;
            this.createTempShape(pointer);
        }
    }

    onMouseMove(e) {
        if (this.isPanning && this.lastPanPoint) {
            const vpt = this.canvas.viewportTransform;
            const dx = e.e.clientX - this.lastPanPoint.x;
            const dy = e.e.clientY - this.lastPanPoint.y;
            vpt[4] += dx;
            vpt[5] += dy;
            this.canvas.requestRenderAll();
            this.lastPanPoint = { x: e.e.clientX, y: e.e.clientY };
            return;
        }

        if (this.isDrawing && this.tempShape) {
            const pointer = this.canvas.getPointer(e.e);
            this.updateTempShape(pointer);
        }
    }

    onMouseUp(e) {
        if (this.isPanning) {
            this.isPanning = false;
            this.lastPanPoint = null;
            this.canvas.defaultCursor = 'grab';
            return;
        }

        if (this.isDrawing && this.tempShape) {
            this.finalizeTempShape();
            this.isDrawing = false;
            this.drawStartPoint = null;
            this.tempShape = null;
        }
    }

    createTempShape(pointer) {
        const options = {
            left: pointer.x,
            top: pointer.y,
            fill: 'rgba(0, 120, 212, 0.1)',
            stroke: '#0078d4',
            strokeWidth: 2,
            selectable: false,
            evented: false
        };

        switch (this.currentTool) {
            case 'rectangle':
                this.tempShape = new fabric.Rect({
                    ...options,
                    width: 0,
                    height: 0
                });
                break;
            case 'ellipse':
                this.tempShape = new fabric.Ellipse({
                    ...options,
                    rx: 0,
                    ry: 0
                });
                break;
            case 'line':
            case 'arrow':
                this.tempShape = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
                    ...options,
                    fill: null
                });
                break;
        }

        if (this.tempShape) {
            this.canvas.add(this.tempShape);
        }
    }

    updateTempShape(pointer) {
        if (!this.tempShape || !this.drawStartPoint) return;

        const startX = this.drawStartPoint.x;
        const startY = this.drawStartPoint.y;
        const width = pointer.x - startX;
        const height = pointer.y - startY;

        switch (this.currentTool) {
            case 'rectangle':
                this.tempShape.set({
                    left: width > 0 ? startX : pointer.x,
                    top: height > 0 ? startY : pointer.y,
                    width: Math.abs(width),
                    height: Math.abs(height)
                });
                break;
            case 'ellipse':
                this.tempShape.set({
                    left: width > 0 ? startX : pointer.x,
                    top: height > 0 ? startY : pointer.y,
                    rx: Math.abs(width) / 2,
                    ry: Math.abs(height) / 2
                });
                break;
            case 'line':
            case 'arrow':
                this.tempShape.set({
                    x2: pointer.x,
                    y2: pointer.y
                });
                break;
        }

        this.canvas.renderAll();
    }

    finalizeTempShape() {
        if (!this.tempShape) return;

        // Make selectable
        this.tempShape.set({
            selectable: true,
            evented: true
        });

        // Add arrow head for arrow tool
        if (this.currentTool === 'arrow') {
            const line = this.tempShape;
            const angle = Math.atan2(line.y2 - line.y1, line.x2 - line.x1);
            const headLength = 15;

            const triangle = new fabric.Triangle({
                left: line.x2,
                top: line.y2,
                width: headLength,
                height: headLength,
                fill: '#0078d4',
                angle: (angle * 180 / Math.PI) + 90,
                originX: 'center',
                originY: 'center'
            });

            // Group line and arrowhead
            const group = new fabric.Group([line, triangle], {
                selectable: true
            });

            this.canvas.remove(line);
            this.canvas.add(group);
            this.tempShape = null;
            return;
        }

        // Give it a name for layers panel
        this.tempShape.set('name', `${this.currentTool}-${Date.now()}`);

        this.canvas.setActiveObject(this.tempShape);
        this.canvas.renderAll();
    }

    addText(pointer) {
        const text = new fabric.IText('Double-click to edit', {
            left: pointer.x,
            top: pointer.y,
            fontFamily: 'Arial',
            fontSize: 16,
            fill: '#333333',
            name: `text-${Date.now()}`
        });

        this.canvas.add(text);
        this.canvas.setActiveObject(text);
        text.enterEditing();
        text.selectAll();
        this.canvas.renderAll();

        // Switch back to select tool
        this.selectTool('select');
    }

    onSelectionChange(e) {
        const selected = e.selected;
        this.updatePropertiesPanel(selected);
        this.updateStatusBar();
        this.updateLayersPanel();
    }

    onSelectionCleared() {
        this.updatePropertiesPanel(null);
        this.updateStatusBar();
        this.updateLayersPanel();
    }

    updatePropertiesPanel(objects) {
        if (!objects || objects.length === 0) {
            this.propertiesPanel.innerHTML = `
                <div class="empty-state">
                    <p>Select an object to edit its properties</p>
                </div>
            `;
            return;
        }

        const obj = objects[0];
        const isText = obj.type === 'i-text' || obj.type === 'text';

        this.propertiesPanel.innerHTML = `
            <div class="property-group">
                <label class="property-label">Position</label>
                <div class="property-row">
                    <div class="property-group">
                        <input type="number" class="property-input" id="prop-x" value="${Math.round(obj.left)}" />
                    </div>
                    <div class="property-group">
                        <input type="number" class="property-input" id="prop-y" value="${Math.round(obj.top)}" />
                    </div>
                </div>
            </div>

            <div class="property-group">
                <label class="property-label">Size</label>
                <div class="property-row">
                    <div class="property-group">
                        <input type="number" class="property-input" id="prop-width" value="${Math.round(obj.width * obj.scaleX)}" />
                    </div>
                    <div class="property-group">
                        <input type="number" class="property-input" id="prop-height" value="${Math.round(obj.height * obj.scaleY)}" />
                    </div>
                </div>
            </div>

            <div class="property-group">
                <label class="property-label">Rotation</label>
                <input type="number" class="property-input" id="prop-angle" value="${Math.round(obj.angle)}" />
            </div>

            ${!isText ? `
            <div class="property-group">
                <label class="property-label">Fill Color</label>
                <div class="color-picker-wrapper">
                    <input type="color" class="color-swatch" id="prop-fill" value="${obj.fill || '#ffffff'}" />
                    <input type="text" class="property-input color-input" id="prop-fill-text" value="${obj.fill || '#ffffff'}" />
                </div>
            </div>

            <div class="property-group">
                <label class="property-label">Stroke Color</label>
                <div class="color-picker-wrapper">
                    <input type="color" class="color-swatch" id="prop-stroke" value="${obj.stroke || '#000000'}" />
                    <input type="text" class="property-input color-input" id="prop-stroke-text" value="${obj.stroke || '#000000'}" />
                </div>
            </div>

            <div class="property-group">
                <label class="property-label">Stroke Width</label>
                <input type="number" class="property-input" id="prop-stroke-width" value="${obj.strokeWidth || 1}" min="0" max="50" />
            </div>
            ` : `
            <div class="property-group">
                <label class="property-label">Font Size</label>
                <input type="number" class="property-input" id="prop-font-size" value="${obj.fontSize || 16}" min="8" max="200" />
            </div>

            <div class="property-group">
                <label class="property-label">Text Color</label>
                <div class="color-picker-wrapper">
                    <input type="color" class="color-swatch" id="prop-text-color" value="${obj.fill || '#000000'}" />
                    <input type="text" class="property-input color-input" id="prop-text-color-text" value="${obj.fill || '#000000'}" />
                </div>
            </div>
            `}

            <div class="property-group">
                <label class="property-label">Opacity</label>
                <input type="range" class="property-input" id="prop-opacity" value="${(obj.opacity || 1) * 100}" min="0" max="100" />
            </div>
        `;

        // Setup property change listeners
        this.setupPropertyListeners(obj);
    }

    setupPropertyListeners(obj) {
        const inputs = {
            'prop-x': (v) => obj.set('left', parseFloat(v)),
            'prop-y': (v) => obj.set('top', parseFloat(v)),
            'prop-width': (v) => obj.set('scaleX', parseFloat(v) / obj.width),
            'prop-height': (v) => obj.set('scaleY', parseFloat(v) / obj.height),
            'prop-angle': (v) => obj.set('angle', parseFloat(v)),
            'prop-fill': (v) => obj.set('fill', v),
            'prop-fill-text': (v) => obj.set('fill', v),
            'prop-stroke': (v) => obj.set('stroke', v),
            'prop-stroke-text': (v) => obj.set('stroke', v),
            'prop-stroke-width': (v) => obj.set('strokeWidth', parseFloat(v)),
            'prop-font-size': (v) => obj.set('fontSize', parseFloat(v)),
            'prop-text-color': (v) => obj.set('fill', v),
            'prop-text-color-text': (v) => obj.set('fill', v),
            'prop-opacity': (v) => obj.set('opacity', parseFloat(v) / 100)
        };

        Object.entries(inputs).forEach(([id, setter]) => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('input', (e) => {
                    setter(e.target.value);
                    this.canvas.renderAll();
                });
                input.addEventListener('change', () => {
                    this.saveState();
                });
            }
        });
    }

    updateLayersPanel() {
        const objects = this.canvas.getObjects();
        const activeObjects = this.canvas.getActiveObjects();

        if (objects.length === 0) {
            this.layersPanel.innerHTML = `
                <div class="empty-state">
                    <p>No objects on canvas</p>
                </div>
            `;
            return;
        }

        // Render layers in reverse order (top layer first)
        this.layersPanel.innerHTML = [...objects].reverse().map((obj, index) => {
            const isSelected = activeObjects.includes(obj);
            const name = obj.name || `${obj.type}-${objects.length - index}`;
            const icon = this.getObjectIcon(obj.type);

            return `
                <div class="layer-item ${isSelected ? 'selected' : ''}" data-index="${objects.length - 1 - index}">
                    <span class="layer-icon">${icon}</span>
                    <span class="layer-name">${name}</span>
                    <span class="layer-visibility ${obj.visible === false ? 'hidden' : ''}" data-index="${objects.length - 1 - index}">
                        ${obj.visible === false ? ToolIcons.eyeOff : ToolIcons.eye}
                    </span>
                </div>
            `;
        }).join('');

        // Setup layer click handlers
        const layerItems = this.layersPanel.querySelectorAll('.layer-item');
        layerItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.closest('.layer-visibility')) {
                    const index = parseInt(item.dataset.index);
                    const obj = objects[index];
                    if (obj) {
                        this.canvas.setActiveObject(obj);
                        this.canvas.renderAll();
                    }
                }
            });
        });

        // Setup visibility toggles
        const visibilityToggles = this.layersPanel.querySelectorAll('.layer-visibility');
        visibilityToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(toggle.dataset.index);
                const obj = objects[index];
                if (obj) {
                    obj.set('visible', !obj.visible);
                    this.canvas.renderAll();
                    this.updateLayersPanel();
                }
            });
        });
    }

    getObjectIcon(type) {
        switch (type) {
            case 'rect':
                return ToolIcons.box;
            case 'ellipse':
            case 'circle':
                return ToolIcons.circle;
            case 'line':
                return ToolIcons.line;
            case 'i-text':
            case 'text':
                return ToolIcons.text;
            case 'group':
                return ToolIcons.layers;
            default:
                return ToolIcons.box;
        }
    }

    updateStatusBar() {
        const selectionInfo = document.getElementById('selection-info');
        const zoomLevel = document.getElementById('zoom-level');

        const activeObjects = this.canvas.getActiveObjects();
        if (activeObjects.length === 0) {
            selectionInfo.textContent = 'No selection';
        } else if (activeObjects.length === 1) {
            const obj = activeObjects[0];
            selectionInfo.textContent = `${obj.type} selected`;
        } else {
            selectionInfo.textContent = `${activeObjects.length} objects selected`;
        }

        zoomLevel.textContent = `${this.zoom}%`;
    }

    setZoom(level) {
        this.zoom = Math.max(10, Math.min(400, level));
        const scale = this.zoom / 100;

        const wrapper = document.getElementById('canvas-wrapper');
        wrapper.style.transform = `scale(${scale})`;
        wrapper.style.transformOrigin = 'center center';

        this.updateStatusBar();
    }

    // History management
    saveState() {
        const json = JSON.stringify(this.canvas.toJSON());

        // Remove states after current index
        this.history = this.history.slice(0, this.historyIndex + 1);

        // Add new state
        this.history.push(json);

        // Limit history size
        if (this.history.length > this.maxHistory) {
            this.history.shift();
        }

        this.historyIndex = this.history.length - 1;
    }

    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.loadState(this.history[this.historyIndex]);
        }
    }

    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.loadState(this.history[this.historyIndex]);
        }
    }

    loadState(json) {
        this.canvas.loadFromJSON(json, () => {
            this.canvas.renderAll();
            this.updateLayersPanel();
            this.updateStatusBar();
        });
    }

    deleteSelected() {
        const activeObjects = this.canvas.getActiveObjects();
        if (activeObjects.length > 0) {
            activeObjects.forEach(obj => {
                this.canvas.remove(obj);
            });
            this.canvas.discardActiveObject();
            this.canvas.renderAll();
        }
    }

    selectAll() {
        this.canvas.discardActiveObject();
        const objects = this.canvas.getObjects();
        if (objects.length > 0) {
            const selection = new fabric.ActiveSelection(objects, {
                canvas: this.canvas
            });
            this.canvas.setActiveObject(selection);
            this.canvas.renderAll();
        }
    }

    // Export functions
    exportSVG() {
        const svg = this.canvas.toSVG();
        this.downloadFile(svg, 'diagram.svg', 'image/svg+xml');
    }

    exportPNG() {
        const dataURL = this.canvas.toDataURL({
            format: 'png',
            multiplier: 2
        });
        const link = document.createElement('a');
        link.download = 'diagram.png';
        link.href = dataURL;
        link.click();
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Menu handlers (simplified - would normally show dropdowns)
    showFileMenu() {
        const action = prompt('File actions: new, open, save, export-svg, export-png');
        if (action === 'new') {
            if (confirm('Clear canvas? Unsaved changes will be lost.')) {
                this.canvas.clear();
                this.canvas.backgroundColor = '#ffffff';
                this.canvas.renderAll();
            }
        } else if (action === 'export-svg') {
            this.exportSVG();
        } else if (action === 'export-png') {
            this.exportPNG();
        }
    }

    showEditMenu() {
        const action = prompt('Edit actions: undo, redo, delete, select-all');
        switch (action) {
            case 'undo': this.undo(); break;
            case 'redo': this.redo(); break;
            case 'delete': this.deleteSelected(); break;
            case 'select-all': this.selectAll(); break;
        }
    }

    showViewMenu() {
        const action = prompt('View actions: zoom-in, zoom-out, zoom-100, fit');
        switch (action) {
            case 'zoom-in': this.setZoom(this.zoom + 25); break;
            case 'zoom-out': this.setZoom(this.zoom - 25); break;
            case 'zoom-100': this.setZoom(100); break;
        }
    }

    showObjectMenu() {
        const action = prompt('Object actions: bring-front, send-back, group, ungroup');
        const active = this.canvas.getActiveObject();
        if (!active) return;

        switch (action) {
            case 'bring-front':
                active.bringToFront();
                break;
            case 'send-back':
                active.sendToBack();
                break;
        }
        this.canvas.renderAll();
        this.updateLayersPanel();
    }

    showExportMenu() {
        const action = prompt('Export as: svg, png');
        switch (action) {
            case 'svg': this.exportSVG(); break;
            case 'png': this.exportPNG(); break;
        }
    }

    // Load diagram from Agent mode
    loadDiagram(diagramData) {
        if (!diagramData || !diagramData.svg) return;

        // Parse SVG and add to canvas
        fabric.loadSVGFromString(diagramData.svg, (objects, options) => {
            const group = fabric.util.groupSVGElements(objects, options);

            // Scale to fit canvas
            const maxWidth = this.canvasWidth * 0.9;
            const maxHeight = this.canvasHeight * 0.9;
            const scale = Math.min(
                maxWidth / group.width,
                maxHeight / group.height,
                1
            );

            group.scale(scale);
            group.set({
                left: (this.canvasWidth - group.width * scale) / 2,
                top: (this.canvasHeight - group.height * scale) / 2
            });

            this.canvas.add(group);
            this.canvas.setActiveObject(group);
            this.canvas.renderAll();

            // Ungroup so elements are editable
            setTimeout(() => {
                const items = group._objects;
                group._restoreObjectsState();
                this.canvas.remove(group);
                items.forEach(item => {
                    this.canvas.add(item);
                });
                this.canvas.renderAll();
                this.updateLayersPanel();
                this.saveState();
            }, 100);
        });
    }

    getCanvasData() {
        return {
            objects: this.canvas.toJSON(),
            zoom: this.zoom
        };
    }

    cleanup() {
        // Cleanup canvas
        if (this.canvas) {
            this.canvas.dispose();
        }
    }
}

export { EditorMode };

/**
 * LayerItem.js - Individual layer item component for FINNISH project
 *
 * Features:
 * - Thumbnail (canvas snapshot of object)
 * - Name input (editable on double-click)
 * - Visibility toggle
 * - Lock toggle
 * - Drag handle
 * - Click to select
 * - Context menu (right-click)
 */

export class LayerItem {
  constructor(options = {}) {
    this.id = options.id || this.generateId();
    this.object = options.object || null;
    this.name = options.name || 'Layer';
    this.visible = options.visible !== false;
    this.locked = options.locked || false;
    this.selected = options.selected || false;
    this.expanded = options.expanded !== false;
    this.depth = options.depth || 0;
    this.children = options.children || [];
    this.parent = options.parent || null;
    this.panel = options.panel || null;

    this.element = null;
    this.thumbnailCanvas = null;
    this.nameInput = null;
    this.isEditing = false;
    this.dragHandle = null;

    this.onSelect = options.onSelect || (() => {});
    this.onVisibilityChange = options.onVisibilityChange || (() => {});
    this.onLockChange = options.onLockChange || (() => {});
    this.onNameChange = options.onNameChange || (() => {});
    this.onReorder = options.onReorder || (() => {});
    this.onContextMenu = options.onContextMenu || (() => {});
    this.onExpandToggle = options.onExpandToggle || (() => {});

    this.createElement();
    this.updateThumbnail();
  }

  generateId() {
    return 'layer_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  createElement() {
    this.element = document.createElement('div');
    this.element.className = 'layer-item';
    this.element.dataset.layerId = this.id;
    this.element.draggable = true;
    this.element.style.paddingLeft = `${12 + this.depth * 20}px`;

    if (this.selected) {
      this.element.classList.add('selected');
    }

    // Drag handle
    this.dragHandle = document.createElement('div');
    this.dragHandle.className = 'layer-drag-handle';
    this.dragHandle.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
        <circle cx="3" cy="3" r="1.5"/>
        <circle cx="9" cy="3" r="1.5"/>
        <circle cx="3" cy="6" r="1.5"/>
        <circle cx="9" cy="6" r="1.5"/>
        <circle cx="3" cy="9" r="1.5"/>
        <circle cx="9" cy="9" r="1.5"/>
      </svg>
    `;
    this.element.appendChild(this.dragHandle);

    // Expand/collapse button for groups
    if (this.children.length > 0 || (this.object && this.object.type === 'group')) {
      this.expandButton = document.createElement('button');
      this.expandButton.className = 'layer-expand-btn';
      this.expandButton.innerHTML = this.expanded ?
        '<svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 3l3 4 3-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>' :
        '<svg width="10" height="10" viewBox="0 0 10 10"><path d="M3 2l4 3-4 3" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';
      this.expandButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleExpand();
      });
      this.element.appendChild(this.expandButton);
    } else {
      // Spacer for alignment
      const spacer = document.createElement('div');
      spacer.className = 'layer-expand-spacer';
      this.element.appendChild(spacer);
    }

    // Thumbnail container
    const thumbnailContainer = document.createElement('div');
    thumbnailContainer.className = 'layer-thumbnail';

    this.thumbnailCanvas = document.createElement('canvas');
    this.thumbnailCanvas.width = 32;
    this.thumbnailCanvas.height = 32;
    thumbnailContainer.appendChild(this.thumbnailCanvas);
    this.element.appendChild(thumbnailContainer);

    // Name input/display
    const nameContainer = document.createElement('div');
    nameContainer.className = 'layer-name-container';

    this.nameDisplay = document.createElement('span');
    this.nameDisplay.className = 'layer-name';
    this.nameDisplay.textContent = this.name;

    this.nameInput = document.createElement('input');
    this.nameInput.type = 'text';
    this.nameInput.className = 'layer-name-input';
    this.nameInput.value = this.name;
    this.nameInput.style.display = 'none';

    nameContainer.appendChild(this.nameDisplay);
    nameContainer.appendChild(this.nameInput);
    this.element.appendChild(nameContainer);

    // Controls container
    const controls = document.createElement('div');
    controls.className = 'layer-controls';

    // Visibility toggle
    this.visibilityBtn = document.createElement('button');
    this.visibilityBtn.className = 'layer-btn layer-visibility-btn';
    this.visibilityBtn.title = 'Toggle Visibility';
    this.updateVisibilityIcon();
    controls.appendChild(this.visibilityBtn);

    // Lock toggle
    this.lockBtn = document.createElement('button');
    this.lockBtn.className = 'layer-btn layer-lock-btn';
    this.lockBtn.title = 'Toggle Lock';
    this.updateLockIcon();
    controls.appendChild(this.lockBtn);

    this.element.appendChild(controls);

    this.attachEventListeners();
  }

  attachEventListeners() {
    // Click to select
    this.element.addEventListener('click', (e) => {
      if (e.target === this.nameInput) return;
      this.onSelect(this, e);
    });

    // Double-click to edit name
    this.nameDisplay.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      this.startNameEdit();
    });

    // Name input events
    this.nameInput.addEventListener('blur', () => this.finishNameEdit());
    this.nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.finishNameEdit();
      } else if (e.key === 'Escape') {
        this.cancelNameEdit();
      }
    });

    // Visibility toggle
    this.visibilityBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleVisibility();
    });

    // Lock toggle
    this.lockBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleLock();
    });

    // Context menu
    this.element.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.onContextMenu(this, e);
    });

    // Drag events
    this.element.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', this.id);
      e.dataTransfer.effectAllowed = 'move';
      this.element.classList.add('dragging');
    });

    this.element.addEventListener('dragend', () => {
      this.element.classList.remove('dragging');
    });

    this.element.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';

      const rect = this.element.getBoundingClientRect();
      const midY = rect.top + rect.height / 2;

      this.element.classList.remove('drag-above', 'drag-below');
      if (e.clientY < midY) {
        this.element.classList.add('drag-above');
      } else {
        this.element.classList.add('drag-below');
      }
    });

    this.element.addEventListener('dragleave', () => {
      this.element.classList.remove('drag-above', 'drag-below');
    });

    this.element.addEventListener('drop', (e) => {
      e.preventDefault();
      const draggedId = e.dataTransfer.getData('text/plain');

      if (draggedId !== this.id) {
        const rect = this.element.getBoundingClientRect();
        const midY = rect.top + rect.height / 2;
        const position = e.clientY < midY ? 'before' : 'after';

        this.onReorder(draggedId, this.id, position);
      }

      this.element.classList.remove('drag-above', 'drag-below');
    });
  }

  updateVisibilityIcon() {
    this.visibilityBtn.innerHTML = this.visible ?
      `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 3C4.5 3 1.5 5.5 0 8c1.5 2.5 4.5 5 8 5s6.5-2.5 8-5c-1.5-2.5-4.5-5-8-5zm0 8c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm0-5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
      </svg>` :
      `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" opacity="0.4">
        <path d="M14.5 1.5l-13 13M8 3C4.5 3 1.5 5.5 0 8c.7 1.2 1.7 2.3 2.9 3.1M5.1 12.9C6 13.3 7 13.5 8 13.5c3.5 0 6.5-2.5 8-5.5-.5-.9-1.2-1.8-2-2.5M6.5 6.5c-.3.4-.5.9-.5 1.5 0 1.1.9 2 2 2 .6 0 1.1-.2 1.5-.5"/>
      </svg>`;
    this.visibilityBtn.classList.toggle('inactive', !this.visible);
  }

  updateLockIcon() {
    this.lockBtn.innerHTML = this.locked ?
      `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M12 7V5c0-2.2-1.8-4-4-4S4 2.8 4 5v2H3v7h10V7h-1zM6 5c0-1.1.9-2 2-2s2 .9 2 2v2H6V5zm5 7H5v-3h6v3z"/>
      </svg>` :
      `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" opacity="0.4">
        <path d="M12 7h-1V5c0-1.1-.4-2.2-1.2-3-.8-.8-1.9-1.2-3-1-.9.2-1.8.6-2.4 1.4-.6.7-1 1.6-1 2.6h2c0-.5.2-1 .5-1.4.3-.4.8-.6 1.3-.6.5 0 1 .2 1.4.6.4.4.6.9.6 1.4v2H3v7h10V7zm-2 5H5v-3h6v3z"/>
      </svg>`;
    this.lockBtn.classList.toggle('active', this.locked);
  }

  updateThumbnail() {
    if (!this.object || !this.thumbnailCanvas) return;

    const ctx = this.thumbnailCanvas.getContext('2d');
    ctx.clearRect(0, 0, 32, 32);

    // Create a temporary canvas to render the object
    try {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = 100;
      tempCanvas.height = 100;

      // Clone object and render to temp canvas
      const objBounds = this.object.getBoundingRect();
      const scale = Math.min(28 / objBounds.width, 28 / objBounds.height, 1);

      // Draw checkerboard background for transparency
      ctx.fillStyle = '#2a2a2a';
      ctx.fillRect(0, 0, 32, 32);

      for (let x = 0; x < 32; x += 4) {
        for (let y = 0; y < 32; y += 4) {
          if ((x + y) % 8 === 0) {
            ctx.fillStyle = '#3a3a3a';
            ctx.fillRect(x, y, 4, 4);
          }
        }
      }

      // Save state and translate to center
      ctx.save();
      ctx.translate(16, 16);
      ctx.scale(scale, scale);
      ctx.translate(-objBounds.width / 2, -objBounds.height / 2);

      // Render object based on type
      this.renderObjectToContext(ctx, this.object, objBounds);

      ctx.restore();
    } catch (e) {
      // Fallback: draw placeholder
      ctx.fillStyle = '#4a4a4a';
      ctx.fillRect(4, 4, 24, 24);
      ctx.fillStyle = '#666';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(this.object.type?.[0]?.toUpperCase() || '?', 16, 19);
    }
  }

  renderObjectToContext(ctx, obj, bounds) {
    const type = obj.type;

    ctx.fillStyle = obj.fill || '#666';
    ctx.strokeStyle = obj.stroke || 'transparent';
    ctx.lineWidth = obj.strokeWidth || 1;

    switch (type) {
      case 'rect':
        ctx.fillRect(0, 0, bounds.width, bounds.height);
        if (obj.stroke) ctx.strokeRect(0, 0, bounds.width, bounds.height);
        break;

      case 'circle':
        ctx.beginPath();
        ctx.arc(bounds.width / 2, bounds.height / 2, Math.min(bounds.width, bounds.height) / 2, 0, Math.PI * 2);
        ctx.fill();
        if (obj.stroke) ctx.stroke();
        break;

      case 'ellipse':
        ctx.beginPath();
        ctx.ellipse(bounds.width / 2, bounds.height / 2, bounds.width / 2, bounds.height / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        if (obj.stroke) ctx.stroke();
        break;

      case 'triangle':
      case 'polygon':
        ctx.beginPath();
        ctx.moveTo(bounds.width / 2, 0);
        ctx.lineTo(bounds.width, bounds.height);
        ctx.lineTo(0, bounds.height);
        ctx.closePath();
        ctx.fill();
        if (obj.stroke) ctx.stroke();
        break;

      case 'line':
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(bounds.width, bounds.height);
        ctx.stroke();
        break;

      case 'path':
      case 'group':
      case 'activeSelection':
        // For complex objects, draw a placeholder
        ctx.fillStyle = obj.fill || '#666';
        ctx.fillRect(2, 2, bounds.width - 4, bounds.height - 4);
        break;

      case 'i-text':
      case 'text':
      case 'textbox':
        ctx.fillStyle = obj.fill || '#fff';
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText('T', bounds.width / 2 - 3, bounds.height / 2 + 4);
        break;

      case 'image':
        ctx.fillStyle = '#555';
        ctx.fillRect(0, 0, bounds.width, bounds.height);
        // Draw image icon
        ctx.strokeStyle = '#888';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(4, bounds.height - 4);
        ctx.lineTo(bounds.width / 3, bounds.height / 2);
        ctx.lineTo(bounds.width * 2 / 3, bounds.height * 2 / 3);
        ctx.lineTo(bounds.width - 4, bounds.height / 3);
        ctx.stroke();
        break;

      default:
        ctx.fillRect(0, 0, bounds.width, bounds.height);
    }
  }

  startNameEdit() {
    if (this.locked) return;

    this.isEditing = true;
    this.nameDisplay.style.display = 'none';
    this.nameInput.style.display = 'block';
    this.nameInput.value = this.name;
    this.nameInput.focus();
    this.nameInput.select();
  }

  finishNameEdit() {
    if (!this.isEditing) return;

    const newName = this.nameInput.value.trim();
    if (newName && newName !== this.name) {
      this.name = newName;
      this.nameDisplay.textContent = newName;
      this.onNameChange(this, newName);
    }

    this.isEditing = false;
    this.nameDisplay.style.display = 'block';
    this.nameInput.style.display = 'none';
  }

  cancelNameEdit() {
    this.isEditing = false;
    this.nameInput.value = this.name;
    this.nameDisplay.style.display = 'block';
    this.nameInput.style.display = 'none';
  }

  toggleVisibility() {
    this.visible = !this.visible;
    this.updateVisibilityIcon();

    if (this.object) {
      this.object.visible = this.visible;
    }

    this.onVisibilityChange(this, this.visible);
  }

  toggleLock() {
    this.locked = !this.locked;
    this.updateLockIcon();

    if (this.object) {
      this.object.selectable = !this.locked;
      this.object.evented = !this.locked;
    }

    this.onLockChange(this, this.locked);
  }

  toggleExpand() {
    this.expanded = !this.expanded;

    if (this.expandButton) {
      this.expandButton.innerHTML = this.expanded ?
        '<svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 3l3 4 3-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>' :
        '<svg width="10" height="10" viewBox="0 0 10 10"><path d="M3 2l4 3-4 3" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';
    }

    this.onExpandToggle(this, this.expanded);
  }

  setSelected(selected) {
    this.selected = selected;
    this.element.classList.toggle('selected', selected);
  }

  setDepth(depth) {
    this.depth = depth;
    this.element.style.paddingLeft = `${12 + depth * 20}px`;
  }

  setName(name) {
    this.name = name;
    this.nameDisplay.textContent = name;
    this.nameInput.value = name;
  }

  setVisible(visible) {
    this.visible = visible;
    this.updateVisibilityIcon();
  }

  setLocked(locked) {
    this.locked = locked;
    this.updateLockIcon();
  }

  getElement() {
    return this.element;
  }

  destroy() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    this.element = null;
    this.thumbnailCanvas = null;
    this.object = null;
  }
}

export default LayerItem;

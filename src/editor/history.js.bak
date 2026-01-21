/**
 * History Manager for FINNISH Canvas Editor
 * Implements the Command Pattern for undo/redo functionality
 *
 * @module history
 */

/**
 * Command class representing a single undoable action
 */
class Command {
  /**
   * @param {string} type - Type of command (add, remove, modify, group, etc.)
   * @param {Object} data - Data needed to undo/redo the command
   * @param {string} description - Human-readable description
   */
  constructor(type, data, description = '') {
    this.type = type;
    this.data = data;
    this.description = description;
    this.timestamp = Date.now();
  }
}

/**
 * History Manager implementing undo/redo with command pattern
 */
export class HistoryManager {
  /**
   * @param {Object} options - Configuration options
   * @param {number} options.maxStates - Maximum number of history states (default: 50)
   */
  constructor(options = {}) {
    this.maxStates = options.maxStates || 50;
    this.undoStack = [];
    this.redoStack = [];
    this.canvas = null;
    this.isExecuting = false; // Flag to prevent recording during undo/redo
    this.listeners = {
      change: [],
      undo: [],
      redo: []
    };
  }

  /**
   * Attach the history manager to a canvas
   * @param {fabric.Canvas} canvas - The Fabric.js canvas instance
   */
  attach(canvas) {
    this.canvas = canvas;
    this._setupCanvasListeners();
  }

  /**
   * Set up canvas event listeners for automatic history tracking
   * @private
   */
  _setupCanvasListeners() {
    if (!this.canvas) return;

    // Track object additions
    this.canvas.on('object:added', (e) => {
      if (this.isExecuting || !e.target) return;
      this.push(new Command('add', {
        objectJSON: e.target.toJSON(['id', 'name', 'selectable', 'evented']),
        objectId: e.target.id || this._generateId()
      }, 'Add object'));
    });

    // Track object removals
    this.canvas.on('object:removed', (e) => {
      if (this.isExecuting || !e.target) return;
      this.push(new Command('remove', {
        objectJSON: e.target.toJSON(['id', 'name', 'selectable', 'evented']),
        objectId: e.target.id
      }, 'Remove object'));
    });

    // Track object modifications
    this.canvas.on('object:modified', (e) => {
      if (this.isExecuting || !e.target) return;
      // Store the current state after modification
      this.push(new Command('modify', {
        objectId: e.target.id,
        afterState: e.target.toJSON(['id', 'name', 'selectable', 'evented']),
        beforeState: e.target._previousState || null
      }, 'Modify object'));
    });

    // Store state before modification starts
    this.canvas.on('object:moving', this._storeBeforeState.bind(this));
    this.canvas.on('object:scaling', this._storeBeforeState.bind(this));
    this.canvas.on('object:rotating', this._storeBeforeState.bind(this));
    this.canvas.on('object:skewing', this._storeBeforeState.bind(this));
  }

  /**
   * Store object state before modification
   * @private
   */
  _storeBeforeState(e) {
    if (this.isExecuting || !e.target) return;
    if (!e.target._previousState) {
      e.target._previousState = e.target.toJSON(['id', 'name', 'selectable', 'evented']);
    }
  }

  /**
   * Generate a unique ID for objects
   * @private
   * @returns {string}
   */
  _generateId() {
    return 'obj_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Push a command onto the history stack
   * @param {Command} command - The command to push
   */
  push(command) {
    if (this.isExecuting) return;

    this.undoStack.push(command);

    // Clear redo stack when new action is performed
    this.redoStack = [];

    // Enforce max states limit
    while (this.undoStack.length > this.maxStates) {
      this.undoStack.shift();
    }

    this._emit('change', { action: 'push', command });
  }

  /**
   * Record a custom command manually
   * @param {string} type - Command type
   * @param {Object} data - Command data
   * @param {string} description - Command description
   */
  record(type, data, description = '') {
    this.push(new Command(type, data, description));
  }

  /**
   * Record a canvas snapshot for complex operations
   * @param {string} description - Description of the operation
   */
  recordSnapshot(description = 'Canvas snapshot') {
    if (!this.canvas) return;

    this.push(new Command('snapshot', {
      canvasJSON: this.canvas.toJSON(['id', 'name', 'selectable', 'evented'])
    }, description));
  }

  /**
   * Undo the last action
   * @returns {boolean} Whether undo was successful
   */
  async undo() {
    if (!this.canUndo() || !this.canvas) return false;

    const command = this.undoStack.pop();
    this.isExecuting = true;

    try {
      await this._executeUndo(command);
      this.redoStack.push(command);
      this._emit('undo', { command });
      this._emit('change', { action: 'undo', command });
      return true;
    } catch (error) {
      console.error('Undo failed:', error);
      this.undoStack.push(command); // Restore command on failure
      return false;
    } finally {
      this.isExecuting = false;
    }
  }

  /**
   * Execute the undo operation for a command
   * @private
   */
  async _executeUndo(command) {
    switch (command.type) {
      case 'add':
        // Remove the added object
        const addedObj = this._findObjectById(command.data.objectId);
        if (addedObj) {
          this.canvas.remove(addedObj);
        }
        break;

      case 'remove':
        // Re-add the removed object
        await this._loadObjectFromJSON(command.data.objectJSON);
        break;

      case 'modify':
        // Restore the before state
        if (command.data.beforeState) {
          const modifiedObj = this._findObjectById(command.data.objectId);
          if (modifiedObj) {
            this.canvas.remove(modifiedObj);
            await this._loadObjectFromJSON(command.data.beforeState);
          }
        }
        break;

      case 'snapshot':
        // Store current state for redo, then restore snapshot
        command.data.currentCanvasJSON = this.canvas.toJSON(['id', 'name', 'selectable', 'evented']);
        await this._loadCanvasFromJSON(command.data.canvasJSON);
        break;

      case 'group':
        // Ungroup the objects
        const group = this._findObjectById(command.data.groupId);
        if (group && group.type === 'group') {
          const items = group.getObjects();
          group.destroy();
          this.canvas.remove(group);
          items.forEach(item => {
            this.canvas.add(item);
          });
        }
        break;

      case 'ungroup':
        // Regroup the objects
        const objects = command.data.objectIds.map(id => this._findObjectById(id)).filter(Boolean);
        if (objects.length > 0) {
          const group = new fabric.Group(objects);
          group.id = command.data.groupId;
          objects.forEach(obj => this.canvas.remove(obj));
          this.canvas.add(group);
        }
        break;

      default:
        console.warn('Unknown command type:', command.type);
    }

    this.canvas.renderAll();
  }

  /**
   * Redo the last undone action
   * @returns {boolean} Whether redo was successful
   */
  async redo() {
    if (!this.canRedo() || !this.canvas) return false;

    const command = this.redoStack.pop();
    this.isExecuting = true;

    try {
      await this._executeRedo(command);
      this.undoStack.push(command);
      this._emit('redo', { command });
      this._emit('change', { action: 'redo', command });
      return true;
    } catch (error) {
      console.error('Redo failed:', error);
      this.redoStack.push(command); // Restore command on failure
      return false;
    } finally {
      this.isExecuting = false;
    }
  }

  /**
   * Execute the redo operation for a command
   * @private
   */
  async _executeRedo(command) {
    switch (command.type) {
      case 'add':
        // Re-add the object
        await this._loadObjectFromJSON(command.data.objectJSON);
        break;

      case 'remove':
        // Remove the object again
        const obj = this._findObjectById(command.data.objectId);
        if (obj) {
          this.canvas.remove(obj);
        }
        break;

      case 'modify':
        // Apply the after state
        if (command.data.afterState) {
          const modifiedObj = this._findObjectById(command.data.objectId);
          if (modifiedObj) {
            this.canvas.remove(modifiedObj);
            await this._loadObjectFromJSON(command.data.afterState);
          }
        }
        break;

      case 'snapshot':
        // Restore to the state after the snapshot (which was stored during undo)
        if (command.data.currentCanvasJSON) {
          await this._loadCanvasFromJSON(command.data.currentCanvasJSON);
        }
        break;

      case 'group':
        // Re-group the objects
        const objects = command.data.objectIds.map(id => this._findObjectById(id)).filter(Boolean);
        if (objects.length > 0) {
          const group = new fabric.Group(objects);
          group.id = command.data.groupId;
          objects.forEach(obj => this.canvas.remove(obj));
          this.canvas.add(group);
        }
        break;

      case 'ungroup':
        // Ungroup again
        const group = this._findObjectById(command.data.groupId);
        if (group && group.type === 'group') {
          const items = group.getObjects();
          group.destroy();
          this.canvas.remove(group);
          items.forEach(item => {
            item.id = item.id || this._generateId();
            this.canvas.add(item);
          });
        }
        break;

      default:
        console.warn('Unknown command type:', command.type);
    }

    this.canvas.renderAll();
  }

  /**
   * Find an object by ID on the canvas
   * @private
   */
  _findObjectById(id) {
    return this.canvas.getObjects().find(obj => obj.id === id);
  }

  /**
   * Load an object from JSON and add to canvas
   * @private
   */
  async _loadObjectFromJSON(json) {
    return new Promise((resolve, reject) => {
      fabric.util.enlivenObjects([json], (objects) => {
        if (objects && objects.length > 0) {
          const obj = objects[0];
          this.canvas.add(obj);
          resolve(obj);
        } else {
          reject(new Error('Failed to load object from JSON'));
        }
      });
    });
  }

  /**
   * Load entire canvas from JSON
   * @private
   */
  async _loadCanvasFromJSON(json) {
    return new Promise((resolve, reject) => {
      this.canvas.loadFromJSON(json, () => {
        this.canvas.renderAll();
        resolve();
      }, (o, object) => {
        // Optional: handle each object as it's loaded
      });
    });
  }

  /**
   * Check if undo is available
   * @returns {boolean}
   */
  canUndo() {
    return this.undoStack.length > 0;
  }

  /**
   * Check if redo is available
   * @returns {boolean}
   */
  canRedo() {
    return this.redoStack.length > 0;
  }

  /**
   * Get the number of available undo steps
   * @returns {number}
   */
  getUndoCount() {
    return this.undoStack.length;
  }

  /**
   * Get the number of available redo steps
   * @returns {number}
   */
  getRedoCount() {
    return this.redoStack.length;
  }

  /**
   * Clear all history
   */
  clear() {
    this.undoStack = [];
    this.redoStack = [];
    this._emit('change', { action: 'clear' });
  }

  /**
   * Add an event listener
   * @param {string} event - Event name (change, undo, redo)
   * @param {Function} callback - Callback function
   */
  on(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    }
  }

  /**
   * Remove an event listener
   * @param {string} event - Event name
   * @param {Function} callback - Callback function
   */
  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
  }

  /**
   * Emit an event
   * @private
   */
  _emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('Event listener error:', error);
        }
      });
    }
  }

  /**
   * Get history state for debugging
   * @returns {Object}
   */
  getState() {
    return {
      undoCount: this.undoStack.length,
      redoCount: this.redoStack.length,
      maxStates: this.maxStates,
      undoCommands: this.undoStack.map(c => ({ type: c.type, description: c.description })),
      redoCommands: this.redoStack.map(c => ({ type: c.type, description: c.description }))
    };
  }

  /**
   * Pause history recording temporarily
   * @returns {Function} Resume function
   */
  pause() {
    this.isExecuting = true;
    return () => {
      this.isExecuting = false;
    };
  }

  /**
   * Execute a function without recording history
   * @param {Function} fn - Function to execute
   */
  withoutRecording(fn) {
    const resume = this.pause();
    try {
      fn();
    } finally {
      resume();
    }
  }
}

export default HistoryManager;

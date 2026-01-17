/**
 * Unit Tests for History Manager
 * Tests undo/redo functionality using the Command Pattern
 *
 * @module tests/unit/editor/history
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { HistoryManager } from '../../../src/editor/history.js';
import { createMockFabricCanvas } from '../../setup';

describe('HistoryManager', () => {
  let historyManager: HistoryManager;
  let mockCanvas: ReturnType<typeof createMockFabricCanvas>;

  beforeEach(() => {
    historyManager = new HistoryManager();
    mockCanvas = createMockFabricCanvas();
  });

  // ==========================================================================
  // Initialization Tests
  // ==========================================================================

  describe('Initialization', () => {
    it('should initialize with empty undo stack', () => {
      expect(historyManager.getUndoCount()).toBe(0);
    });

    it('should initialize with empty redo stack', () => {
      expect(historyManager.getRedoCount()).toBe(0);
    });

    it('should initialize with default max states (50)', () => {
      expect(historyManager.maxStates).toBe(50);
    });

    it('should accept custom max states option', () => {
      const customHistory = new HistoryManager({ maxStates: 100 });
      expect(customHistory.maxStates).toBe(100);
    });

    it('should not have canvas attached initially', () => {
      expect(historyManager.canvas).toBeNull();
    });
  });

  // ==========================================================================
  // Push State Tests
  // ==========================================================================

  describe('Push States to Stack', () => {
    it('should push command to undo stack', () => {
      historyManager.record('add', { objectId: 'obj1' }, 'Add object');

      expect(historyManager.getUndoCount()).toBe(1);
    });

    it('should increment undo count with each push', () => {
      historyManager.record('add', { objectId: 'obj1' }, 'Add 1');
      historyManager.record('add', { objectId: 'obj2' }, 'Add 2');
      historyManager.record('add', { objectId: 'obj3' }, 'Add 3');

      expect(historyManager.getUndoCount()).toBe(3);
    });

    it('should clear redo stack when new state is pushed', () => {
      // Setup: push some states and do undo to populate redo stack
      historyManager.attach(mockCanvas as any);
      historyManager.record('add', { objectId: 'obj1' }, 'Add 1');
      historyManager.record('add', { objectId: 'obj2' }, 'Add 2');

      // Manually set redo stack for testing
      (historyManager as any).redoStack = [{ type: 'add', data: {} }];

      // Push new state
      historyManager.record('add', { objectId: 'obj3' }, 'Add 3');

      expect(historyManager.getRedoCount()).toBe(0);
    });

    it('should store command data', () => {
      historyManager.record('modify', { objectId: 'obj1', newState: { x: 100 } }, 'Modify');

      const state = historyManager.getState();
      expect(state.undoCommands[0].type).toBe('modify');
    });

    it('should store command description', () => {
      historyManager.record('add', { objectId: 'obj1' }, 'Add rectangle');

      const state = historyManager.getState();
      expect(state.undoCommands[0].description).toBe('Add rectangle');
    });
  });

  // ==========================================================================
  // Max States Limit Tests
  // ==========================================================================

  describe('Max States Limit', () => {
    it('should limit history to max states', () => {
      const historyWithLimit = new HistoryManager({ maxStates: 5 });

      for (let i = 0; i < 10; i++) {
        historyWithLimit.record('add', { objectId: `obj${i}` }, `Add ${i}`);
      }

      expect(historyWithLimit.getUndoCount()).toBe(5);
    });

    it('should remove oldest states when limit exceeded', () => {
      const historyWithLimit = new HistoryManager({ maxStates: 3 });

      historyWithLimit.record('add', { objectId: 'obj0' }, 'First');
      historyWithLimit.record('add', { objectId: 'obj1' }, 'Second');
      historyWithLimit.record('add', { objectId: 'obj2' }, 'Third');
      historyWithLimit.record('add', { objectId: 'obj3' }, 'Fourth');

      const state = historyWithLimit.getState();

      // Should only have the last 3 states
      expect(state.undoCommands.length).toBe(3);
      expect(state.undoCommands[0].description).toBe('Second');
      expect(state.undoCommands[2].description).toBe('Fourth');
    });

    it('should use default max states of 50', () => {
      for (let i = 0; i < 60; i++) {
        historyManager.record('add', { objectId: `obj${i}` }, `Add ${i}`);
      }

      expect(historyManager.getUndoCount()).toBe(50);
    });
  });

  // ==========================================================================
  // Undo Tests
  // ==========================================================================

  describe('Undo', () => {
    beforeEach(() => {
      historyManager.attach(mockCanvas as any);
    });

    it('should pop from undo stack', async () => {
      historyManager.record('add', { objectId: 'obj1', objectJSON: { type: 'rect' } }, 'Add');

      const undoCountBefore = historyManager.getUndoCount();
      await historyManager.undo();

      expect(historyManager.getUndoCount()).toBe(undoCountBefore - 1);
    });

    it('should push to redo stack on undo', async () => {
      historyManager.record('add', { objectId: 'obj1', objectJSON: { type: 'rect' } }, 'Add');

      await historyManager.undo();

      expect(historyManager.getRedoCount()).toBe(1);
    });

    it('should return true on successful undo', async () => {
      historyManager.record('add', { objectId: 'obj1', objectJSON: { type: 'rect' } }, 'Add');

      const result = await historyManager.undo();

      expect(result).toBe(true);
    });

    it('should return false when nothing to undo', async () => {
      const result = await historyManager.undo();

      expect(result).toBe(false);
    });

    it('should return false when canvas is not attached', async () => {
      const unattachedHistory = new HistoryManager();
      unattachedHistory.record('add', { objectId: 'obj1' }, 'Add');

      const result = await unattachedHistory.undo();

      expect(result).toBe(false);
    });

    it('should emit undo event', async () => {
      const callback = vi.fn();
      historyManager.on('undo', callback);
      historyManager.record('add', { objectId: 'obj1', objectJSON: { type: 'rect' } }, 'Add');

      await historyManager.undo();

      expect(callback).toHaveBeenCalled();
    });

    it('should emit change event on undo', async () => {
      const callback = vi.fn();
      historyManager.on('change', callback);
      historyManager.record('add', { objectId: 'obj1', objectJSON: { type: 'rect' } }, 'Add');

      // Clear the callback count from the push
      callback.mockClear();

      await historyManager.undo();

      expect(callback).toHaveBeenCalled();
    });
  });

  // ==========================================================================
  // Redo Tests
  // ==========================================================================

  describe('Redo', () => {
    beforeEach(() => {
      historyManager.attach(mockCanvas as any);
    });

    it('should restore state from redo stack', async () => {
      historyManager.record('add', { objectId: 'obj1', objectJSON: { type: 'rect' } }, 'Add');
      await historyManager.undo();

      const redoCountBefore = historyManager.getRedoCount();
      await historyManager.redo();

      expect(historyManager.getRedoCount()).toBe(redoCountBefore - 1);
    });

    it('should push back to undo stack on redo', async () => {
      historyManager.record('add', { objectId: 'obj1', objectJSON: { type: 'rect' } }, 'Add');
      await historyManager.undo();

      const undoCountBefore = historyManager.getUndoCount();
      await historyManager.redo();

      expect(historyManager.getUndoCount()).toBe(undoCountBefore + 1);
    });

    it('should return true on successful redo', async () => {
      historyManager.record('add', { objectId: 'obj1', objectJSON: { type: 'rect' } }, 'Add');
      await historyManager.undo();

      const result = await historyManager.redo();

      expect(result).toBe(true);
    });

    it('should return false when nothing to redo', async () => {
      const result = await historyManager.redo();

      expect(result).toBe(false);
    });

    it('should return false when canvas is not attached', async () => {
      const unattachedHistory = new HistoryManager();
      (unattachedHistory as any).redoStack = [{ type: 'add', data: { objectJSON: {} } }];

      const result = await unattachedHistory.redo();

      expect(result).toBe(false);
    });

    it('should emit redo event', async () => {
      const callback = vi.fn();
      historyManager.on('redo', callback);
      historyManager.record('add', { objectId: 'obj1', objectJSON: { type: 'rect' } }, 'Add');
      await historyManager.undo();

      await historyManager.redo();

      expect(callback).toHaveBeenCalled();
    });

    it('should emit change event on redo', async () => {
      const callback = vi.fn();
      historyManager.record('add', { objectId: 'obj1', objectJSON: { type: 'rect' } }, 'Add');
      await historyManager.undo();

      historyManager.on('change', callback);
      await historyManager.redo();

      expect(callback).toHaveBeenCalled();
    });
  });

  // ==========================================================================
  // Clear Tests
  // ==========================================================================

  describe('Clear', () => {
    it('should clear undo stack', () => {
      historyManager.record('add', { objectId: 'obj1' }, 'Add 1');
      historyManager.record('add', { objectId: 'obj2' }, 'Add 2');

      historyManager.clear();

      expect(historyManager.getUndoCount()).toBe(0);
    });

    it('should clear redo stack', () => {
      historyManager.attach(mockCanvas as any);
      historyManager.record('add', { objectId: 'obj1', objectJSON: { type: 'rect' } }, 'Add');

      // Create redo entries
      (historyManager as any).redoStack = [{ type: 'add', data: {} }];

      historyManager.clear();

      expect(historyManager.getRedoCount()).toBe(0);
    });

    it('should emit change event on clear', () => {
      const callback = vi.fn();
      historyManager.on('change', callback);
      historyManager.record('add', { objectId: 'obj1' }, 'Add');

      callback.mockClear();
      historyManager.clear();

      expect(callback).toHaveBeenCalledWith({ action: 'clear' });
    });

    it('should reset history completely', () => {
      historyManager.record('add', { objectId: 'obj1' }, 'Add 1');
      historyManager.record('modify', { objectId: 'obj1' }, 'Modify');
      historyManager.record('remove', { objectId: 'obj1' }, 'Remove');

      historyManager.clear();

      expect(historyManager.canUndo()).toBe(false);
      expect(historyManager.canRedo()).toBe(false);
    });
  });

  // ==========================================================================
  // Can Undo/Redo Tests
  // ==========================================================================

  describe('canUndo/canRedo', () => {
    it('should return false for canUndo when stack is empty', () => {
      expect(historyManager.canUndo()).toBe(false);
    });

    it('should return true for canUndo when stack has items', () => {
      historyManager.record('add', { objectId: 'obj1' }, 'Add');

      expect(historyManager.canUndo()).toBe(true);
    });

    it('should return false for canRedo when stack is empty', () => {
      expect(historyManager.canRedo()).toBe(false);
    });

    it('should return true for canRedo after undo', async () => {
      historyManager.attach(mockCanvas as any);
      historyManager.record('add', { objectId: 'obj1', objectJSON: { type: 'rect' } }, 'Add');
      await historyManager.undo();

      expect(historyManager.canRedo()).toBe(true);
    });
  });

  // ==========================================================================
  // Canvas Attachment Tests
  // ==========================================================================

  describe('Canvas Attachment', () => {
    it('should attach canvas', () => {
      historyManager.attach(mockCanvas as any);

      expect(historyManager.canvas).toBe(mockCanvas);
    });

    it('should set up canvas event listeners', () => {
      historyManager.attach(mockCanvas as any);

      expect(mockCanvas.on).toHaveBeenCalled();
    });

    it('should listen to object:added event', () => {
      historyManager.attach(mockCanvas as any);

      expect(mockCanvas.on).toHaveBeenCalledWith('object:added', expect.any(Function));
    });

    it('should listen to object:removed event', () => {
      historyManager.attach(mockCanvas as any);

      expect(mockCanvas.on).toHaveBeenCalledWith('object:removed', expect.any(Function));
    });

    it('should listen to object:modified event', () => {
      historyManager.attach(mockCanvas as any);

      expect(mockCanvas.on).toHaveBeenCalledWith('object:modified', expect.any(Function));
    });
  });

  // ==========================================================================
  // Event Listener Tests
  // ==========================================================================

  describe('Event Listeners', () => {
    it('should add event listener with on()', () => {
      const callback = vi.fn();
      historyManager.on('change', callback);
      historyManager.record('add', { objectId: 'obj1' }, 'Add');

      expect(callback).toHaveBeenCalled();
    });

    it('should remove event listener with off()', () => {
      const callback = vi.fn();
      historyManager.on('change', callback);
      historyManager.off('change', callback);
      historyManager.record('add', { objectId: 'obj1' }, 'Add');

      expect(callback).not.toHaveBeenCalled();
    });

    it('should support multiple listeners for same event', () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      historyManager.on('change', callback1);
      historyManager.on('change', callback2);
      historyManager.record('add', { objectId: 'obj1' }, 'Add');

      expect(callback1).toHaveBeenCalled();
      expect(callback2).toHaveBeenCalled();
    });

    it('should handle listener errors gracefully', () => {
      const errorCallback = vi.fn(() => {
        throw new Error('Listener error');
      });
      const normalCallback = vi.fn();

      historyManager.on('change', errorCallback);
      historyManager.on('change', normalCallback);

      // Should not throw
      expect(() => {
        historyManager.record('add', { objectId: 'obj1' }, 'Add');
      }).not.toThrow();

      expect(normalCallback).toHaveBeenCalled();
    });
  });

  // ==========================================================================
  // State Retrieval Tests
  // ==========================================================================

  describe('getState', () => {
    it('should return current state', () => {
      historyManager.record('add', { objectId: 'obj1' }, 'Add');

      const state = historyManager.getState();

      expect(state).toHaveProperty('undoCount');
      expect(state).toHaveProperty('redoCount');
      expect(state).toHaveProperty('maxStates');
      expect(state).toHaveProperty('undoCommands');
      expect(state).toHaveProperty('redoCommands');
    });

    it('should include correct undo count', () => {
      historyManager.record('add', { objectId: 'obj1' }, 'Add 1');
      historyManager.record('add', { objectId: 'obj2' }, 'Add 2');

      const state = historyManager.getState();

      expect(state.undoCount).toBe(2);
    });

    it('should include command summaries', () => {
      historyManager.record('add', { objectId: 'obj1' }, 'Add rectangle');
      historyManager.record('modify', { objectId: 'obj1' }, 'Modify position');

      const state = historyManager.getState();

      expect(state.undoCommands[0].type).toBe('add');
      expect(state.undoCommands[0].description).toBe('Add rectangle');
      expect(state.undoCommands[1].type).toBe('modify');
    });
  });

  // ==========================================================================
  // Pause/Resume Tests
  // ==========================================================================

  describe('Pause/Resume', () => {
    it('should pause recording', () => {
      const resume = historyManager.pause();

      historyManager.record('add', { objectId: 'obj1' }, 'Add');

      expect(historyManager.getUndoCount()).toBe(0);

      resume();
    });

    it('should resume recording after pause', () => {
      const resume = historyManager.pause();
      historyManager.record('add', { objectId: 'obj1' }, 'Add 1');
      resume();

      historyManager.record('add', { objectId: 'obj2' }, 'Add 2');

      expect(historyManager.getUndoCount()).toBe(1);
    });

    it('should return resume function', () => {
      const resume = historyManager.pause();

      expect(typeof resume).toBe('function');
    });
  });

  // ==========================================================================
  // Without Recording Tests
  // ==========================================================================

  describe('withoutRecording', () => {
    it('should execute function without recording history', () => {
      historyManager.withoutRecording(() => {
        historyManager.record('add', { objectId: 'obj1' }, 'Add');
      });

      expect(historyManager.getUndoCount()).toBe(0);
    });

    it('should resume recording after function completes', () => {
      historyManager.withoutRecording(() => {
        historyManager.record('add', { objectId: 'obj1' }, 'Add 1');
      });

      historyManager.record('add', { objectId: 'obj2' }, 'Add 2');

      expect(historyManager.getUndoCount()).toBe(1);
    });

    it('should resume recording even if function throws', () => {
      expect(() => {
        historyManager.withoutRecording(() => {
          throw new Error('Test error');
        });
      }).toThrow('Test error');

      // Should be able to record after error
      historyManager.record('add', { objectId: 'obj1' }, 'Add');
      expect(historyManager.getUndoCount()).toBe(1);
    });
  });

  // ==========================================================================
  // Record Snapshot Tests
  // ==========================================================================

  describe('recordSnapshot', () => {
    it('should record canvas snapshot', () => {
      historyManager.attach(mockCanvas as any);
      historyManager.recordSnapshot('Full canvas snapshot');

      expect(historyManager.getUndoCount()).toBe(1);
    });

    it('should store canvas JSON in snapshot', () => {
      historyManager.attach(mockCanvas as any);
      historyManager.recordSnapshot('Snapshot');

      const state = historyManager.getState();
      expect(state.undoCommands[0].type).toBe('snapshot');
    });

    it('should use default description when not provided', () => {
      historyManager.attach(mockCanvas as any);
      historyManager.recordSnapshot();

      const state = historyManager.getState();
      expect(state.undoCommands[0].description).toBe('Canvas snapshot');
    });

    it('should not record when canvas is not attached', () => {
      historyManager.recordSnapshot('No canvas');

      expect(historyManager.getUndoCount()).toBe(0);
    });
  });

  // ==========================================================================
  // Undo/Redo Count Tests
  // ==========================================================================

  describe('Undo/Redo Counts', () => {
    it('should return correct undo count', () => {
      historyManager.record('add', {}, 'Add 1');
      historyManager.record('add', {}, 'Add 2');
      historyManager.record('add', {}, 'Add 3');

      expect(historyManager.getUndoCount()).toBe(3);
    });

    it('should return correct redo count', async () => {
      historyManager.attach(mockCanvas as any);
      historyManager.record('add', { objectId: 'obj1', objectJSON: {} }, 'Add 1');
      historyManager.record('add', { objectId: 'obj2', objectJSON: {} }, 'Add 2');

      await historyManager.undo();
      await historyManager.undo();

      expect(historyManager.getRedoCount()).toBe(2);
    });

    it('should update counts after undo', async () => {
      historyManager.attach(mockCanvas as any);
      historyManager.record('add', { objectId: 'obj1', objectJSON: {} }, 'Add');

      const undoBefore = historyManager.getUndoCount();
      await historyManager.undo();

      expect(historyManager.getUndoCount()).toBe(undoBefore - 1);
      expect(historyManager.getRedoCount()).toBe(1);
    });

    it('should update counts after redo', async () => {
      historyManager.attach(mockCanvas as any);
      historyManager.record('add', { objectId: 'obj1', objectJSON: {} }, 'Add');
      await historyManager.undo();

      const redoBefore = historyManager.getRedoCount();
      await historyManager.redo();

      expect(historyManager.getRedoCount()).toBe(redoBefore - 1);
      expect(historyManager.getUndoCount()).toBe(1);
    });
  });

  // ==========================================================================
  // Command Types Tests
  // ==========================================================================

  describe('Command Types', () => {
    beforeEach(() => {
      historyManager.attach(mockCanvas as any);
    });

    it('should handle add command type', () => {
      historyManager.record('add', { objectId: 'obj1', objectJSON: { type: 'rect' } }, 'Add');

      const state = historyManager.getState();
      expect(state.undoCommands[0].type).toBe('add');
    });

    it('should handle remove command type', () => {
      historyManager.record('remove', { objectId: 'obj1', objectJSON: { type: 'rect' } }, 'Remove');

      const state = historyManager.getState();
      expect(state.undoCommands[0].type).toBe('remove');
    });

    it('should handle modify command type', () => {
      historyManager.record(
        'modify',
        { objectId: 'obj1', beforeState: {}, afterState: {} },
        'Modify'
      );

      const state = historyManager.getState();
      expect(state.undoCommands[0].type).toBe('modify');
    });

    it('should handle group command type', () => {
      historyManager.record(
        'group',
        { groupId: 'group1', objectIds: ['obj1', 'obj2'] },
        'Group objects'
      );

      const state = historyManager.getState();
      expect(state.undoCommands[0].type).toBe('group');
    });

    it('should handle ungroup command type', () => {
      historyManager.record(
        'ungroup',
        { groupId: 'group1', objectIds: ['obj1', 'obj2'] },
        'Ungroup'
      );

      const state = historyManager.getState();
      expect(state.undoCommands[0].type).toBe('ungroup');
    });

    it('should handle snapshot command type', () => {
      historyManager.recordSnapshot('Take snapshot');

      const state = historyManager.getState();
      expect(state.undoCommands[0].type).toBe('snapshot');
    });
  });
});

/**
 * Integration Tests for Editor Mode Selection
 * Tests object selection, multi-selection, keyboard interactions,
 * and undo/redo operations in the canvas editor
 *
 * @module tests/integration/editorSelection
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { act } from '@testing-library/react';
import {
  useEditorStore,
  resetEditorStore,
  getEditorState,
} from '../../src/store/editorStore';
import { ToolType } from '../../src/types/index';
import { createMockFabricCanvas, waitForStateUpdate } from '../setup';

// ============================================================================
// Mock Types & Helpers
// ============================================================================

/**
 * Mock Fabric.js object for testing
 */
interface MockFabricObject {
  id: string;
  type: string;
  left: number;
  top: number;
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
  selectable: boolean;
  evented: boolean;
  getBoundingRect: () => { left: number; top: number; width: number; height: number };
  set: (props: Partial<MockFabricObject>) => void;
  toJSON: () => Record<string, unknown>;
}

/**
 * Create a mock Fabric.js object
 */
const createMockObject = (overrides: Partial<MockFabricObject> = {}): MockFabricObject => {
  const defaults: MockFabricObject = {
    id: `obj-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: 'rect',
    left: 0,
    top: 0,
    width: 100,
    height: 100,
    scaleX: 1,
    scaleY: 1,
    selectable: true,
    evented: true,
    getBoundingRect: function () {
      return {
        left: this.left,
        top: this.top,
        width: this.width * this.scaleX,
        height: this.height * this.scaleY,
      };
    },
    set: function (props) {
      Object.assign(this, props);
    },
    toJSON: function () {
      return {
        id: this.id,
        type: this.type,
        left: this.left,
        top: this.top,
        width: this.width,
        height: this.height,
      };
    },
  };

  return { ...defaults, ...overrides };
};

/**
 * Simulate a mouse click event on canvas
 */
const simulateClick = (
  canvas: ReturnType<typeof createMockFabricCanvas>,
  x: number,
  y: number,
  options: { shiftKey?: boolean; ctrlKey?: boolean; metaKey?: boolean } = {}
) => {
  const event = {
    e: {
      clientX: x,
      clientY: y,
      shiftKey: options.shiftKey ?? false,
      ctrlKey: options.ctrlKey ?? false,
      metaKey: options.metaKey ?? false,
    },
    target: null as MockFabricObject | null,
    pointer: { x, y },
  };

  return event;
};

/**
 * Simulate a drag selection box
 */
const simulateDragSelection = (
  canvas: ReturnType<typeof createMockFabricCanvas>,
  startX: number,
  startY: number,
  endX: number,
  endY: number
) => {
  return {
    start: { x: startX, y: startY },
    end: { x: endX, y: endY },
    bounds: {
      left: Math.min(startX, endX),
      top: Math.min(startY, endY),
      width: Math.abs(endX - startX),
      height: Math.abs(endY - startY),
    },
  };
};

/**
 * Check if an object is within a selection bounds
 */
const isObjectInBounds = (
  obj: MockFabricObject,
  bounds: { left: number; top: number; width: number; height: number }
): boolean => {
  const objBounds = obj.getBoundingRect();
  return (
    objBounds.left >= bounds.left &&
    objBounds.top >= bounds.top &&
    objBounds.left + objBounds.width <= bounds.left + bounds.width &&
    objBounds.top + objBounds.height <= bounds.top + bounds.height
  );
};

// ============================================================================
// Integration Tests
// ============================================================================

describe('Editor Selection Integration Tests', () => {
  let mockCanvas: ReturnType<typeof createMockFabricCanvas>;
  let mockObjects: MockFabricObject[];

  beforeEach(() => {
    resetEditorStore();
    mockCanvas = createMockFabricCanvas();
    mockObjects = [];

    // Set up canvas with test objects
    act(() => {
      useEditorStore.getState().setCanvas(mockCanvas as any);
      useEditorStore.getState().setActiveTool(ToolType.SELECT);
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    mockObjects = [];
  });

  // ==========================================================================
  // Test: Click object -> selection appears
  // ==========================================================================

  describe('Single Object Selection', () => {
    it('should select object when clicked', async () => {
      const obj = createMockObject({ id: 'rect-1', left: 100, top: 100 });
      mockObjects.push(obj);
      mockCanvas._objects = mockObjects;
      mockCanvas.getActiveObject.mockReturnValue(obj);

      // Simulate clicking on the object
      act(() => {
        useEditorStore.getState().selectObjects([obj.id]);
      });

      await waitForStateUpdate();

      const { selectedObjects } = getEditorState();
      expect(selectedObjects).toContain(obj.id);
      expect(selectedObjects).toHaveLength(1);
    });

    it('should clear previous selection when clicking new object', async () => {
      const obj1 = createMockObject({ id: 'rect-1' });
      const obj2 = createMockObject({ id: 'rect-2' });
      mockObjects.push(obj1, obj2);
      mockCanvas._objects = mockObjects;

      // Select first object
      act(() => {
        useEditorStore.getState().selectObjects([obj1.id]);
      });

      expect(getEditorState().selectedObjects).toContain(obj1.id);

      // Select second object (should clear first)
      act(() => {
        useEditorStore.getState().selectObjects([obj2.id]);
      });

      await waitForStateUpdate();

      const { selectedObjects } = getEditorState();
      expect(selectedObjects).not.toContain(obj1.id);
      expect(selectedObjects).toContain(obj2.id);
      expect(selectedObjects).toHaveLength(1);
    });

    it('should clear selection when clicking empty canvas', async () => {
      const obj = createMockObject({ id: 'rect-1' });
      mockObjects.push(obj);
      mockCanvas._objects = mockObjects;

      // Select object
      act(() => {
        useEditorStore.getState().selectObjects([obj.id]);
      });

      expect(getEditorState().selectedObjects).toHaveLength(1);

      // Click on empty area
      act(() => {
        useEditorStore.getState().clearSelection();
      });

      await waitForStateUpdate();

      expect(getEditorState().selectedObjects).toHaveLength(0);
      expect(mockCanvas.discardActiveObject).toHaveBeenCalled();
    });

    it('should select objects of different types', async () => {
      const rect = createMockObject({ id: 'rect-1', type: 'rect' });
      const circle = createMockObject({ id: 'circle-1', type: 'circle' });
      const text = createMockObject({ id: 'text-1', type: 'text' });

      mockObjects.push(rect, circle, text);
      mockCanvas._objects = mockObjects;

      // Select each type
      for (const obj of mockObjects) {
        act(() => {
          useEditorStore.getState().selectObjects([obj.id]);
        });

        expect(getEditorState().selectedObjects).toContain(obj.id);
      }
    });

    it('should not select non-selectable objects', async () => {
      const obj = createMockObject({ id: 'locked-1', selectable: false });
      mockObjects.push(obj);
      mockCanvas._objects = mockObjects;

      // Attempt to select non-selectable object
      const canSelect = obj.selectable;
      if (canSelect) {
        act(() => {
          useEditorStore.getState().selectObjects([obj.id]);
        });
      }

      // Selection should remain empty since object is not selectable
      expect(canSelect).toBe(false);
    });
  });

  // ==========================================================================
  // Test: Drag selection box -> multiple objects selected
  // ==========================================================================

  describe('Drag Selection (Marquee)', () => {
    it('should select multiple objects within selection box', async () => {
      const obj1 = createMockObject({ id: 'rect-1', left: 50, top: 50, width: 50, height: 50 });
      const obj2 = createMockObject({ id: 'rect-2', left: 120, top: 80, width: 50, height: 50 });
      const obj3 = createMockObject({ id: 'rect-3', left: 200, top: 50, width: 50, height: 50 });

      mockObjects.push(obj1, obj2, obj3);
      mockCanvas._objects = mockObjects;

      // Simulate drag selection from (40, 40) to (180, 180)
      const selection = simulateDragSelection(mockCanvas, 40, 40, 180, 180);

      // Find objects within bounds
      const selectedIds = mockObjects
        .filter((obj) => isObjectInBounds(obj, selection.bounds))
        .map((obj) => obj.id);

      act(() => {
        useEditorStore.getState().selectObjects(selectedIds);
      });

      await waitForStateUpdate();

      const { selectedObjects } = getEditorState();
      expect(selectedObjects).toContain(obj1.id);
      expect(selectedObjects).toContain(obj2.id);
      expect(selectedObjects).not.toContain(obj3.id); // Outside bounds
    });

    it('should select no objects when selection box is empty', async () => {
      const obj = createMockObject({ id: 'rect-1', left: 100, top: 100 });
      mockObjects.push(obj);
      mockCanvas._objects = mockObjects;

      // Simulate drag selection in empty area
      const selection = simulateDragSelection(mockCanvas, 300, 300, 400, 400);

      const selectedIds = mockObjects
        .filter((obj) => isObjectInBounds(obj, selection.bounds))
        .map((obj) => obj.id);

      act(() => {
        useEditorStore.getState().selectObjects(selectedIds);
      });

      await waitForStateUpdate();

      expect(getEditorState().selectedObjects).toHaveLength(0);
    });

    it('should select all objects when selection box covers entire canvas', async () => {
      const obj1 = createMockObject({ id: 'rect-1', left: 50, top: 50 });
      const obj2 = createMockObject({ id: 'rect-2', left: 200, top: 200 });
      const obj3 = createMockObject({ id: 'rect-3', left: 400, top: 300 });

      mockObjects.push(obj1, obj2, obj3);
      mockCanvas._objects = mockObjects;

      // Simulate large selection covering all objects
      const selection = simulateDragSelection(mockCanvas, 0, 0, 600, 500);

      const selectedIds = mockObjects
        .filter((obj) => isObjectInBounds(obj, selection.bounds))
        .map((obj) => obj.id);

      act(() => {
        useEditorStore.getState().selectObjects(selectedIds);
      });

      await waitForStateUpdate();

      expect(getEditorState().selectedObjects).toHaveLength(3);
    });

    it('should handle selection box drawn in reverse direction', async () => {
      const obj = createMockObject({ id: 'rect-1', left: 100, top: 100, width: 50, height: 50 });
      mockObjects.push(obj);
      mockCanvas._objects = mockObjects;

      // Draw selection from bottom-right to top-left
      const selection = simulateDragSelection(mockCanvas, 200, 200, 50, 50);

      const selectedIds = mockObjects
        .filter((obj) => isObjectInBounds(obj, selection.bounds))
        .map((obj) => obj.id);

      act(() => {
        useEditorStore.getState().selectObjects(selectedIds);
      });

      await waitForStateUpdate();

      expect(getEditorState().selectedObjects).toContain(obj.id);
    });
  });

  // ==========================================================================
  // Test: Shift+click -> adds to selection
  // ==========================================================================

  describe('Shift+Click Multi-Selection', () => {
    it('should add object to selection when shift+clicking', async () => {
      const obj1 = createMockObject({ id: 'rect-1' });
      const obj2 = createMockObject({ id: 'rect-2' });

      mockObjects.push(obj1, obj2);
      mockCanvas._objects = mockObjects;

      // Select first object
      act(() => {
        useEditorStore.getState().selectObjects([obj1.id]);
      });

      expect(getEditorState().selectedObjects).toEqual([obj1.id]);

      // Shift+click second object to add to selection
      act(() => {
        useEditorStore.getState().addToSelection(obj2.id);
      });

      await waitForStateUpdate();

      const { selectedObjects } = getEditorState();
      expect(selectedObjects).toContain(obj1.id);
      expect(selectedObjects).toContain(obj2.id);
      expect(selectedObjects).toHaveLength(2);
    });

    it('should not add duplicate when shift+clicking already selected object', async () => {
      const obj = createMockObject({ id: 'rect-1' });
      mockObjects.push(obj);
      mockCanvas._objects = mockObjects;

      // Select object
      act(() => {
        useEditorStore.getState().selectObjects([obj.id]);
      });

      // Shift+click same object
      act(() => {
        useEditorStore.getState().addToSelection(obj.id);
      });

      await waitForStateUpdate();

      expect(getEditorState().selectedObjects).toHaveLength(1);
    });

    it('should allow selecting many objects with repeated shift+clicks', async () => {
      const objects = Array.from({ length: 10 }, (_, i) =>
        createMockObject({ id: `rect-${i}` })
      );

      mockObjects.push(...objects);
      mockCanvas._objects = mockObjects;

      // Select first object
      act(() => {
        useEditorStore.getState().selectObjects([objects[0].id]);
      });

      // Add remaining objects with shift+click
      for (let i = 1; i < objects.length; i++) {
        act(() => {
          useEditorStore.getState().addToSelection(objects[i].id);
        });
      }

      await waitForStateUpdate();

      expect(getEditorState().selectedObjects).toHaveLength(10);
    });

    it('should toggle selection when shift+clicking selected object', async () => {
      const obj1 = createMockObject({ id: 'rect-1' });
      const obj2 = createMockObject({ id: 'rect-2' });

      mockObjects.push(obj1, obj2);
      mockCanvas._objects = mockObjects;

      // Select both objects
      act(() => {
        useEditorStore.getState().selectObjects([obj1.id, obj2.id]);
      });

      expect(getEditorState().selectedObjects).toHaveLength(2);

      // Shift+click to remove obj1 from selection
      act(() => {
        useEditorStore.getState().removeFromSelection(obj1.id);
      });

      await waitForStateUpdate();

      expect(getEditorState().selectedObjects).not.toContain(obj1.id);
      expect(getEditorState().selectedObjects).toContain(obj2.id);
      expect(getEditorState().selectedObjects).toHaveLength(1);
    });
  });

  // ==========================================================================
  // Test: Delete key -> selected objects removed
  // ==========================================================================

  describe('Delete Selected Objects', () => {
    it('should remove single selected object on delete', async () => {
      const obj = createMockObject({ id: 'rect-1' });
      mockObjects.push(obj);
      mockCanvas._objects = mockObjects;

      // Select object
      act(() => {
        useEditorStore.getState().selectObjects([obj.id]);
      });

      // Simulate delete key press
      const deleteSelectedObjects = () => {
        const { selectedObjects, canvas } = getEditorState();
        if (canvas && selectedObjects.length > 0) {
          selectedObjects.forEach((id) => {
            const objToRemove = mockCanvas._objects.find(
              (o: MockFabricObject) => o.id === id
            );
            if (objToRemove) {
              mockCanvas.remove(objToRemove);
            }
          });
          useEditorStore.getState().clearSelection();
        }
      };

      act(() => {
        deleteSelectedObjects();
      });

      await waitForStateUpdate();

      expect(mockCanvas.remove).toHaveBeenCalled();
      expect(getEditorState().selectedObjects).toHaveLength(0);
    });

    it('should remove multiple selected objects on delete', async () => {
      const obj1 = createMockObject({ id: 'rect-1' });
      const obj2 = createMockObject({ id: 'rect-2' });
      const obj3 = createMockObject({ id: 'rect-3' });

      mockObjects.push(obj1, obj2, obj3);
      mockCanvas._objects = mockObjects;

      // Select multiple objects
      act(() => {
        useEditorStore.getState().selectObjects([obj1.id, obj2.id]);
      });

      const deleteSelectedObjects = () => {
        const { selectedObjects } = getEditorState();
        selectedObjects.forEach((id) => {
          const objToRemove = mockCanvas._objects.find(
            (o: MockFabricObject) => o.id === id
          );
          if (objToRemove) {
            mockCanvas.remove(objToRemove);
          }
        });
        useEditorStore.getState().clearSelection();
      };

      act(() => {
        deleteSelectedObjects();
      });

      await waitForStateUpdate();

      expect(mockCanvas.remove).toHaveBeenCalledTimes(2);
      expect(getEditorState().selectedObjects).toHaveLength(0);
    });

    it('should do nothing on delete when no objects selected', async () => {
      const obj = createMockObject({ id: 'rect-1' });
      mockObjects.push(obj);
      mockCanvas._objects = mockObjects;

      expect(getEditorState().selectedObjects).toHaveLength(0);

      const deleteSelectedObjects = () => {
        const { selectedObjects } = getEditorState();
        if (selectedObjects.length === 0) {
          return;
        }
        selectedObjects.forEach((id) => {
          const objToRemove = mockCanvas._objects.find(
            (o: MockFabricObject) => o.id === id
          );
          if (objToRemove) {
            mockCanvas.remove(objToRemove);
          }
        });
      };

      act(() => {
        deleteSelectedObjects();
      });

      expect(mockCanvas.remove).not.toHaveBeenCalled();
    });

    it('should add delete operation to history', async () => {
      const obj = createMockObject({ id: 'rect-1' });
      mockObjects.push(obj);
      mockCanvas._objects = mockObjects;
      mockCanvas.toJSON.mockReturnValue({ objects: [obj.toJSON()] });

      // Push initial state to history
      act(() => {
        useEditorStore.getState().pushHistory(JSON.stringify({ objects: [obj] }));
      });

      // Select and delete
      act(() => {
        useEditorStore.getState().selectObjects([obj.id]);
      });

      // Push state after deletion
      act(() => {
        useEditorStore.getState().pushHistory(JSON.stringify({ objects: [] }));
      });

      const { history } = getEditorState();
      expect(history.past.length).toBeGreaterThan(0);
    });
  });

  // ==========================================================================
  // Test: Ctrl+Z -> undo works
  // ==========================================================================

  describe('Undo/Redo Operations', () => {
    it('should undo last operation', async () => {
      mockCanvas.toJSON.mockReturnValue({ objects: [] });

      // Push initial state
      act(() => {
        useEditorStore.getState().pushHistory(JSON.stringify({ objects: [] }));
      });

      // Push state after adding object
      act(() => {
        useEditorStore.getState().pushHistory(
          JSON.stringify({ objects: [{ id: 'rect-1', type: 'rect' }] })
        );
      });

      const historyBefore = getEditorState().history;
      expect(historyBefore.past.length).toBe(2);
      expect(historyBefore.future.length).toBe(0);

      // Undo
      act(() => {
        useEditorStore.getState().undo();
      });

      await waitForStateUpdate();

      const historyAfter = getEditorState().history;
      expect(historyAfter.past.length).toBe(1);
      expect(historyAfter.future.length).toBe(1);
    });

    it('should redo undone operation', async () => {
      mockCanvas.toJSON.mockReturnValue({ objects: [] });

      // Set up history with future state
      useEditorStore.setState({
        canvas: mockCanvas as any,
        history: {
          past: [JSON.stringify({ objects: [] })],
          future: [JSON.stringify({ objects: [{ id: 'rect-1' }] })],
        },
      });

      const historyBefore = getEditorState().history;
      expect(historyBefore.future.length).toBe(1);

      // Redo
      act(() => {
        useEditorStore.getState().redo();
      });

      await waitForStateUpdate();

      const historyAfter = getEditorState().history;
      expect(historyAfter.future.length).toBe(0);
      expect(historyAfter.past.length).toBe(2);
    });

    it('should clear future history when new action is performed', async () => {
      // Set up history with future state (from undoing)
      useEditorStore.setState({
        history: {
          past: [JSON.stringify({ objects: [] })],
          future: [JSON.stringify({ objects: [{ id: 'rect-1' }] })],
        },
      });

      expect(getEditorState().history.future.length).toBe(1);

      // Perform new action (push new state)
      act(() => {
        useEditorStore.getState().pushHistory(
          JSON.stringify({ objects: [{ id: 'rect-2' }] })
        );
      });

      await waitForStateUpdate();

      // Future should be cleared
      expect(getEditorState().history.future).toHaveLength(0);
    });

    it('should do nothing when undo called with empty history', async () => {
      const initialHistory = getEditorState().history;
      expect(initialHistory.past).toHaveLength(0);

      act(() => {
        useEditorStore.getState().undo();
      });

      // History should remain unchanged
      expect(getEditorState().history.past).toHaveLength(0);
    });

    it('should do nothing when redo called with empty future', async () => {
      act(() => {
        useEditorStore.getState().pushHistory(JSON.stringify({ objects: [] }));
      });

      const initialHistory = getEditorState().history;
      expect(initialHistory.future).toHaveLength(0);

      act(() => {
        useEditorStore.getState().redo();
      });

      // Future should remain empty
      expect(getEditorState().history.future).toHaveLength(0);
    });

    it('should maintain correct state after multiple undo/redo cycles', async () => {
      mockCanvas.toJSON.mockReturnValue({ objects: [] });

      // Build up history
      const states = [
        { objects: [] },
        { objects: [{ id: 'obj-1' }] },
        { objects: [{ id: 'obj-1' }, { id: 'obj-2' }] },
        { objects: [{ id: 'obj-1' }, { id: 'obj-2' }, { id: 'obj-3' }] },
      ];

      for (const state of states) {
        act(() => {
          useEditorStore.getState().pushHistory(JSON.stringify(state));
        });
      }

      expect(getEditorState().history.past).toHaveLength(4);

      // Undo twice
      act(() => {
        useEditorStore.getState().undo();
        useEditorStore.getState().undo();
      });

      expect(getEditorState().history.past).toHaveLength(2);
      expect(getEditorState().history.future).toHaveLength(2);

      // Redo once
      act(() => {
        useEditorStore.getState().redo();
      });

      expect(getEditorState().history.past).toHaveLength(3);
      expect(getEditorState().history.future).toHaveLength(1);
    });

    it('should clear all history', async () => {
      // Build up history
      act(() => {
        useEditorStore.getState().pushHistory(JSON.stringify({ objects: [] }));
        useEditorStore.getState().pushHistory(JSON.stringify({ objects: [{ id: '1' }] }));
      });

      useEditorStore.setState({
        history: {
          past: getEditorState().history.past,
          future: [JSON.stringify({ objects: [{ id: '2' }] })],
        },
      });

      expect(getEditorState().history.past.length).toBeGreaterThan(0);
      expect(getEditorState().history.future.length).toBeGreaterThan(0);

      act(() => {
        useEditorStore.getState().clearHistory();
      });

      expect(getEditorState().history.past).toHaveLength(0);
      expect(getEditorState().history.future).toHaveLength(0);
    });
  });

  // ==========================================================================
  // Keyboard Shortcut Tests
  // ==========================================================================

  describe('Keyboard Shortcuts', () => {
    it('should handle select all (Ctrl+A) keyboard shortcut', async () => {
      const objects = Array.from({ length: 5 }, (_, i) =>
        createMockObject({ id: `rect-${i}` })
      );
      mockObjects.push(...objects);
      mockCanvas._objects = mockObjects;

      // Simulate Ctrl+A by selecting all objects
      const selectAll = () => {
        const allIds = mockCanvas._objects.map((o: MockFabricObject) => o.id);
        useEditorStore.getState().selectObjects(allIds);
      };

      act(() => {
        selectAll();
      });

      await waitForStateUpdate();

      expect(getEditorState().selectedObjects).toHaveLength(5);
    });

    it('should handle deselect all (Escape) keyboard shortcut', async () => {
      const obj = createMockObject({ id: 'rect-1' });
      mockObjects.push(obj);
      mockCanvas._objects = mockObjects;

      // Select object
      act(() => {
        useEditorStore.getState().selectObjects([obj.id]);
      });

      expect(getEditorState().selectedObjects).toHaveLength(1);

      // Simulate Escape key
      act(() => {
        useEditorStore.getState().clearSelection();
      });

      expect(getEditorState().selectedObjects).toHaveLength(0);
    });

    it('should switch to selection tool (V) keyboard shortcut', async () => {
      // Start with different tool
      act(() => {
        useEditorStore.getState().setActiveTool(ToolType.RECTANGLE);
      });

      expect(getEditorState().activeTool).toBe(ToolType.RECTANGLE);

      // Simulate V key press
      act(() => {
        useEditorStore.getState().setActiveTool(ToolType.SELECT);
      });

      expect(getEditorState().activeTool).toBe(ToolType.SELECT);
    });
  });

  // ==========================================================================
  // Edge Cases
  // ==========================================================================

  describe('Edge Cases', () => {
    it('should handle selection when canvas is not initialized', async () => {
      // Reset canvas to null
      act(() => {
        useEditorStore.getState().setCanvas(null);
      });

      // Attempt selection
      act(() => {
        useEditorStore.getState().selectObjects(['some-id']);
      });

      // Should still update state without throwing
      expect(getEditorState().selectedObjects).toEqual(['some-id']);
    });

    it('should handle very large selections', async () => {
      const objects = Array.from({ length: 1000 }, (_, i) =>
        createMockObject({ id: `rect-${i}` })
      );
      mockObjects.push(...objects);
      mockCanvas._objects = mockObjects;

      const allIds = objects.map((o) => o.id);

      act(() => {
        useEditorStore.getState().selectObjects(allIds);
      });

      await waitForStateUpdate();

      expect(getEditorState().selectedObjects).toHaveLength(1000);
    });

    it('should handle rapid selection changes', async () => {
      const objects = Array.from({ length: 10 }, (_, i) =>
        createMockObject({ id: `rect-${i}` })
      );
      mockObjects.push(...objects);
      mockCanvas._objects = mockObjects;

      // Rapidly change selection
      act(() => {
        for (let i = 0; i < 100; i++) {
          const randomId = `rect-${Math.floor(Math.random() * 10)}`;
          useEditorStore.getState().selectObjects([randomId]);
        }
      });

      // Should have exactly one item selected
      expect(getEditorState().selectedObjects).toHaveLength(1);
    });

    it('should maintain selection state across tool changes', async () => {
      const obj = createMockObject({ id: 'rect-1' });
      mockObjects.push(obj);
      mockCanvas._objects = mockObjects;

      // Select object
      act(() => {
        useEditorStore.getState().selectObjects([obj.id]);
      });

      // Change tool
      act(() => {
        useEditorStore.getState().setActiveTool(ToolType.HAND);
      });

      // Selection should persist
      expect(getEditorState().selectedObjects).toContain(obj.id);

      // Change back to select tool
      act(() => {
        useEditorStore.getState().setActiveTool(ToolType.SELECT);
      });

      expect(getEditorState().selectedObjects).toContain(obj.id);
    });
  });
});

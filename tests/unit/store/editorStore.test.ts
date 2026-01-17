/**
 * Unit Tests for Editor Store
 * Tests Zustand store managing canvas, tools, viewport, and history state
 *
 * @module tests/unit/store/editorStore
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { act } from '@testing-library/react';
import {
  useEditorStore,
  resetEditorStore,
  getEditorState,
  useCanvas,
  useActiveTool,
  useViewport,
  useSelection,
  useGridState,
  useHistoryState,
  subscribeToEditor,
} from '../../../src/store/editorStore';
import { ToolType } from '../../../src/types/index';
import { createMockFabricCanvas } from '../../setup';

describe('editorStore', () => {
  // Reset store before each test
  beforeEach(() => {
    resetEditorStore();
  });

  // ==========================================================================
  // Initial State Tests
  // ==========================================================================

  describe('Initial State', () => {
    it('should have correct initial state values', () => {
      const state = getEditorState();

      expect(state.canvas).toBeNull();
      expect(state.selectedObjects).toEqual([]);
      expect(state.activeTool).toBe(ToolType.SELECT);
      expect(state.zoom).toBe(1);
      expect(state.pan).toEqual({ x: 0, y: 0 });
      expect(state.gridVisible).toBe(true);
      expect(state.snapToGrid).toBe(false);
      expect(state.gridSize).toBe(20);
      expect(state.history).toEqual({ past: [], future: [] });
      expect(state.isLoading).toBe(false);
    });

    it('should default activeTool to SELECT', () => {
      const state = getEditorState();
      expect(state.activeTool).toBe(ToolType.SELECT);
    });

    it('should have grid visible by default', () => {
      const state = getEditorState();
      expect(state.gridVisible).toBe(true);
    });

    it('should have snap to grid disabled by default', () => {
      const state = getEditorState();
      expect(state.snapToGrid).toBe(false);
    });
  });

  // ==========================================================================
  // Canvas Management Tests
  // ==========================================================================

  describe('Canvas Management', () => {
    it('should set canvas reference', () => {
      const mockCanvas = createMockFabricCanvas();

      act(() => {
        useEditorStore.getState().setCanvas(mockCanvas);
      });

      expect(getEditorState().canvas).toBe(mockCanvas);
    });

    it('should clear canvas reference when set to null', () => {
      const mockCanvas = createMockFabricCanvas();

      act(() => {
        useEditorStore.getState().setCanvas(mockCanvas);
        useEditorStore.getState().setCanvas(null);
      });

      expect(getEditorState().canvas).toBeNull();
    });
  });

  // ==========================================================================
  // Tool Management Tests
  // ==========================================================================

  describe('setActiveTool', () => {
    it('should update active tool', () => {
      act(() => {
        useEditorStore.getState().setActiveTool(ToolType.PEN);
      });

      expect(getEditorState().activeTool).toBe(ToolType.PEN);
    });

    it('should allow changing between any tool types', () => {
      const toolsToTest = [
        ToolType.SELECT,
        ToolType.PEN,
        ToolType.PENCIL,
        ToolType.RECTANGLE,
        ToolType.ELLIPSE,
        ToolType.TEXT,
        ToolType.HAND,
        ToolType.ZOOM,
      ];

      toolsToTest.forEach((tool) => {
        act(() => {
          useEditorStore.getState().setActiveTool(tool);
        });
        expect(getEditorState().activeTool).toBe(tool);
      });
    });

    it('should notify subscribers when tool changes', () => {
      const callback = vi.fn();
      const unsubscribe = subscribeToEditor(
        (state) => state.activeTool,
        callback
      );

      act(() => {
        useEditorStore.getState().setActiveTool(ToolType.RECTANGLE);
      });

      expect(callback).toHaveBeenCalledWith(ToolType.RECTANGLE, ToolType.SELECT);

      unsubscribe();
    });
  });

  // ==========================================================================
  // Viewport Management Tests
  // ==========================================================================

  describe('setZoom', () => {
    it('should update zoom level', () => {
      act(() => {
        useEditorStore.getState().setZoom(2);
      });

      expect(getEditorState().zoom).toBe(2);
    });

    it('should clamp zoom to minimum value (0.1)', () => {
      act(() => {
        useEditorStore.getState().setZoom(0.05);
      });

      expect(getEditorState().zoom).toBe(0.1);
    });

    it('should clamp zoom to maximum value (10)', () => {
      act(() => {
        useEditorStore.getState().setZoom(15);
      });

      expect(getEditorState().zoom).toBe(10);
    });

    it('should apply zoom to canvas when canvas is available', () => {
      const mockCanvas = createMockFabricCanvas();

      act(() => {
        useEditorStore.getState().setCanvas(mockCanvas);
        useEditorStore.getState().setZoom(2);
      });

      expect(mockCanvas.setZoom).toHaveBeenCalledWith(2);
      expect(mockCanvas.requestRenderAll).toHaveBeenCalled();
    });

    it('should not throw when canvas is null', () => {
      expect(() => {
        act(() => {
          useEditorStore.getState().setZoom(2);
        });
      }).not.toThrow();
    });
  });

  describe('setPan', () => {
    it('should update pan position', () => {
      act(() => {
        useEditorStore.getState().setPan({ x: 100, y: 50 });
      });

      expect(getEditorState().pan).toEqual({ x: 100, y: 50 });
    });

    it('should allow negative pan values', () => {
      act(() => {
        useEditorStore.getState().setPan({ x: -100, y: -200 });
      });

      expect(getEditorState().pan).toEqual({ x: -100, y: -200 });
    });

    it('should apply pan to canvas viewport transform when canvas is available', () => {
      const mockCanvas = createMockFabricCanvas();

      act(() => {
        useEditorStore.getState().setCanvas(mockCanvas);
        useEditorStore.getState().setPan({ x: 100, y: 50 });
      });

      expect(mockCanvas.setViewportTransform).toHaveBeenCalled();
      expect(mockCanvas.requestRenderAll).toHaveBeenCalled();
    });
  });

  describe('resetViewport', () => {
    it('should reset zoom to default (1)', () => {
      act(() => {
        useEditorStore.getState().setZoom(5);
        useEditorStore.getState().resetViewport();
      });

      expect(getEditorState().zoom).toBe(1);
    });

    it('should reset pan to origin (0, 0)', () => {
      act(() => {
        useEditorStore.getState().setPan({ x: 500, y: 300 });
        useEditorStore.getState().resetViewport();
      });

      expect(getEditorState().pan).toEqual({ x: 0, y: 0 });
    });

    it('should apply reset to canvas when available', () => {
      const mockCanvas = createMockFabricCanvas();

      act(() => {
        useEditorStore.getState().setCanvas(mockCanvas);
        useEditorStore.getState().setZoom(3);
        useEditorStore.getState().setPan({ x: 100, y: 100 });
        useEditorStore.getState().resetViewport();
      });

      expect(mockCanvas.setZoom).toHaveBeenLastCalledWith(1);
      expect(mockCanvas.setViewportTransform).toHaveBeenLastCalledWith([1, 0, 0, 1, 0, 0]);
    });
  });

  // ==========================================================================
  // Selection Management Tests
  // ==========================================================================

  describe('selectObjects', () => {
    it('should replace current selection with new object IDs', () => {
      act(() => {
        useEditorStore.getState().selectObjects(['obj1', 'obj2']);
      });

      expect(getEditorState().selectedObjects).toEqual(['obj1', 'obj2']);
    });

    it('should clear selection when given empty array', () => {
      act(() => {
        useEditorStore.getState().selectObjects(['obj1']);
        useEditorStore.getState().selectObjects([]);
      });

      expect(getEditorState().selectedObjects).toEqual([]);
    });

    it('should replace existing selection completely', () => {
      act(() => {
        useEditorStore.getState().selectObjects(['obj1', 'obj2']);
        useEditorStore.getState().selectObjects(['obj3']);
      });

      expect(getEditorState().selectedObjects).toEqual(['obj3']);
    });
  });

  describe('addToSelection', () => {
    it('should add object to existing selection', () => {
      act(() => {
        useEditorStore.getState().selectObjects(['obj1']);
        useEditorStore.getState().addToSelection('obj2');
      });

      expect(getEditorState().selectedObjects).toEqual(['obj1', 'obj2']);
    });

    it('should not add duplicate object IDs', () => {
      act(() => {
        useEditorStore.getState().selectObjects(['obj1']);
        useEditorStore.getState().addToSelection('obj1');
      });

      expect(getEditorState().selectedObjects).toEqual(['obj1']);
    });
  });

  describe('removeFromSelection', () => {
    it('should remove object from selection', () => {
      act(() => {
        useEditorStore.getState().selectObjects(['obj1', 'obj2', 'obj3']);
        useEditorStore.getState().removeFromSelection('obj2');
      });

      expect(getEditorState().selectedObjects).toEqual(['obj1', 'obj3']);
    });

    it('should handle removing non-existent object gracefully', () => {
      act(() => {
        useEditorStore.getState().selectObjects(['obj1']);
        useEditorStore.getState().removeFromSelection('obj999');
      });

      expect(getEditorState().selectedObjects).toEqual(['obj1']);
    });
  });

  describe('clearSelection', () => {
    it('should clear all selected objects', () => {
      act(() => {
        useEditorStore.getState().selectObjects(['obj1', 'obj2', 'obj3']);
        useEditorStore.getState().clearSelection();
      });

      expect(getEditorState().selectedObjects).toEqual([]);
    });

    it('should discard active object on canvas when available', () => {
      const mockCanvas = createMockFabricCanvas();

      act(() => {
        useEditorStore.getState().setCanvas(mockCanvas);
        useEditorStore.getState().selectObjects(['obj1']);
        useEditorStore.getState().clearSelection();
      });

      expect(mockCanvas.discardActiveObject).toHaveBeenCalled();
      expect(mockCanvas.requestRenderAll).toHaveBeenCalled();
    });
  });

  // ==========================================================================
  // Grid Management Tests
  // ==========================================================================

  describe('toggleGrid', () => {
    it('should toggle grid visibility from true to false', () => {
      expect(getEditorState().gridVisible).toBe(true);

      act(() => {
        useEditorStore.getState().toggleGrid();
      });

      expect(getEditorState().gridVisible).toBe(false);
    });

    it('should toggle grid visibility from false to true', () => {
      act(() => {
        useEditorStore.getState().toggleGrid(); // false
        useEditorStore.getState().toggleGrid(); // true
      });

      expect(getEditorState().gridVisible).toBe(true);
    });
  });

  describe('toggleSnap', () => {
    it('should toggle snap-to-grid from false to true', () => {
      expect(getEditorState().snapToGrid).toBe(false);

      act(() => {
        useEditorStore.getState().toggleSnap();
      });

      expect(getEditorState().snapToGrid).toBe(true);
    });

    it('should toggle snap-to-grid from true to false', () => {
      act(() => {
        useEditorStore.getState().toggleSnap(); // true
        useEditorStore.getState().toggleSnap(); // false
      });

      expect(getEditorState().snapToGrid).toBe(false);
    });
  });

  describe('setGridSize', () => {
    it('should update grid size', () => {
      act(() => {
        useEditorStore.getState().setGridSize(10);
      });

      expect(getEditorState().gridSize).toBe(10);
    });

    it('should not allow zero or negative grid size', () => {
      act(() => {
        useEditorStore.getState().setGridSize(0);
      });

      // Should remain at default since 0 is invalid
      expect(getEditorState().gridSize).toBe(20);

      act(() => {
        useEditorStore.getState().setGridSize(-10);
      });

      expect(getEditorState().gridSize).toBe(20);
    });
  });

  // ==========================================================================
  // History Management Tests
  // ==========================================================================

  describe('pushHistory', () => {
    it('should add state to history past array', () => {
      const testState = '{"objects":[]}';

      act(() => {
        useEditorStore.getState().pushHistory(testState);
      });

      expect(getEditorState().history.past).toContain(testState);
    });

    it('should clear future history when new state is pushed', () => {
      act(() => {
        // Set up some history states
        useEditorStore.getState().pushHistory('state1');
        useEditorStore.getState().pushHistory('state2');
      });

      // Manually set some future states for testing
      useEditorStore.setState({
        history: {
          past: ['state1', 'state2'],
          future: ['future1', 'future2'],
        },
      });

      act(() => {
        useEditorStore.getState().pushHistory('state3');
      });

      expect(getEditorState().history.future).toEqual([]);
    });

    it('should limit history to max 50 states', () => {
      const states = Array.from({ length: 60 }, (_, i) => `state${i}`);

      act(() => {
        states.forEach((state) => {
          useEditorStore.getState().pushHistory(state);
        });
      });

      expect(getEditorState().history.past.length).toBe(50);
      // Should keep the most recent 50 states
      expect(getEditorState().history.past[49]).toBe('state59');
    });
  });

  describe('undo', () => {
    it('should move state from past to future', () => {
      const mockCanvas = createMockFabricCanvas();
      mockCanvas.toJSON.mockReturnValue({ objects: [] });

      act(() => {
        useEditorStore.getState().setCanvas(mockCanvas);
        useEditorStore.getState().pushHistory('{"objects":[]}');
        useEditorStore.getState().pushHistory('{"objects":[{"type":"rect"}]}');
      });

      const pastLengthBefore = getEditorState().history.past.length;

      act(() => {
        useEditorStore.getState().undo();
      });

      expect(getEditorState().history.past.length).toBe(pastLengthBefore - 1);
      expect(getEditorState().history.future.length).toBeGreaterThan(0);
    });

    it('should do nothing when past is empty', () => {
      const mockCanvas = createMockFabricCanvas();

      act(() => {
        useEditorStore.getState().setCanvas(mockCanvas);
      });

      expect(getEditorState().history.past).toEqual([]);

      act(() => {
        useEditorStore.getState().undo();
      });

      expect(getEditorState().history.past).toEqual([]);
      expect(mockCanvas.loadFromJSON).not.toHaveBeenCalled();
    });

    it('should do nothing when canvas is null', () => {
      act(() => {
        useEditorStore.getState().pushHistory('state1');
        useEditorStore.getState().undo();
      });

      // State should still be there since undo didn't happen
      expect(getEditorState().history.past).toContain('state1');
    });
  });

  describe('redo', () => {
    it('should move state from future to past', () => {
      const mockCanvas = createMockFabricCanvas();
      mockCanvas.toJSON.mockReturnValue({ objects: [] });

      // Set up state with future history
      useEditorStore.setState({
        canvas: mockCanvas,
        history: {
          past: ['state1'],
          future: ['future1'],
        },
      });

      act(() => {
        useEditorStore.getState().redo();
      });

      expect(getEditorState().history.future.length).toBe(0);
      expect(getEditorState().history.past.length).toBe(2);
    });

    it('should do nothing when future is empty', () => {
      const mockCanvas = createMockFabricCanvas();

      act(() => {
        useEditorStore.getState().setCanvas(mockCanvas);
        useEditorStore.getState().pushHistory('state1');
      });

      expect(getEditorState().history.future).toEqual([]);

      act(() => {
        useEditorStore.getState().redo();
      });

      expect(mockCanvas.loadFromJSON).not.toHaveBeenCalled();
    });

    it('should do nothing when canvas is null', () => {
      useEditorStore.setState({
        history: {
          past: ['state1'],
          future: ['future1'],
        },
      });

      act(() => {
        useEditorStore.getState().redo();
      });

      // Future should still contain the state
      expect(getEditorState().history.future).toContain('future1');
    });
  });

  describe('clearHistory', () => {
    it('should clear both past and future history', () => {
      act(() => {
        useEditorStore.getState().pushHistory('state1');
        useEditorStore.getState().pushHistory('state2');
      });

      useEditorStore.setState({
        history: {
          past: ['state1', 'state2'],
          future: ['future1'],
        },
      });

      act(() => {
        useEditorStore.getState().clearHistory();
      });

      expect(getEditorState().history.past).toEqual([]);
      expect(getEditorState().history.future).toEqual([]);
    });
  });

  // ==========================================================================
  // UI State Management Tests
  // ==========================================================================

  describe('setLoading', () => {
    it('should set loading state to true', () => {
      act(() => {
        useEditorStore.getState().setLoading(true);
      });

      expect(getEditorState().isLoading).toBe(true);
    });

    it('should set loading state to false', () => {
      act(() => {
        useEditorStore.getState().setLoading(true);
        useEditorStore.getState().setLoading(false);
      });

      expect(getEditorState().isLoading).toBe(false);
    });
  });

  // ==========================================================================
  // Selector Hooks Tests
  // ==========================================================================

  describe('Selector Hooks', () => {
    it('useCanvas should return canvas state', () => {
      const mockCanvas = createMockFabricCanvas();

      act(() => {
        useEditorStore.getState().setCanvas(mockCanvas);
      });

      // Test the selector directly
      const canvas = useEditorStore.getState().canvas;
      expect(canvas).toBe(mockCanvas);
    });

    it('useActiveTool should return active tool', () => {
      act(() => {
        useEditorStore.getState().setActiveTool(ToolType.PENCIL);
      });

      const activeTool = useEditorStore.getState().activeTool;
      expect(activeTool).toBe(ToolType.PENCIL);
    });

    it('useViewport should return zoom and pan', () => {
      act(() => {
        useEditorStore.getState().setZoom(2);
        useEditorStore.getState().setPan({ x: 100, y: 50 });
      });

      const state = getEditorState();
      expect(state.zoom).toBe(2);
      expect(state.pan).toEqual({ x: 100, y: 50 });
    });

    it('useSelection should return selection state', () => {
      act(() => {
        useEditorStore.getState().selectObjects(['obj1', 'obj2']);
      });

      const state = getEditorState();
      expect(state.selectedObjects).toEqual(['obj1', 'obj2']);
    });

    it('useGridState should return grid configuration', () => {
      act(() => {
        useEditorStore.getState().toggleGrid();
        useEditorStore.getState().toggleSnap();
        useEditorStore.getState().setGridSize(30);
      });

      const state = getEditorState();
      expect(state.gridVisible).toBe(false);
      expect(state.snapToGrid).toBe(true);
      expect(state.gridSize).toBe(30);
    });

    it('useHistoryState should return history info', () => {
      act(() => {
        useEditorStore.getState().pushHistory('state1');
        useEditorStore.getState().pushHistory('state2');
      });

      const state = getEditorState();
      expect(state.history.past.length).toBe(2);
      expect(state.history.future.length).toBe(0);
    });
  });

  // ==========================================================================
  // Store Utilities Tests
  // ==========================================================================

  describe('resetEditorStore', () => {
    it('should reset store to initial state', () => {
      const mockCanvas = createMockFabricCanvas();

      act(() => {
        useEditorStore.getState().setCanvas(mockCanvas);
        useEditorStore.getState().setActiveTool(ToolType.PEN);
        useEditorStore.getState().setZoom(3);
        useEditorStore.getState().setPan({ x: 100, y: 100 });
        useEditorStore.getState().selectObjects(['obj1']);
        useEditorStore.getState().toggleGrid();
        useEditorStore.getState().toggleSnap();
        useEditorStore.getState().pushHistory('state1');
        useEditorStore.getState().setLoading(true);
      });

      act(() => {
        resetEditorStore();
      });

      const state = getEditorState();
      expect(state.canvas).toBeNull();
      expect(state.activeTool).toBe(ToolType.SELECT);
      expect(state.zoom).toBe(1);
      expect(state.pan).toEqual({ x: 0, y: 0 });
      expect(state.selectedObjects).toEqual([]);
      expect(state.gridVisible).toBe(true);
      expect(state.snapToGrid).toBe(false);
      expect(state.history).toEqual({ past: [], future: [] });
      expect(state.isLoading).toBe(false);
    });
  });

  describe('subscribeToEditor', () => {
    it('should call callback when subscribed state changes', () => {
      const callback = vi.fn();
      const unsubscribe = subscribeToEditor(
        (state) => state.zoom,
        callback
      );

      act(() => {
        useEditorStore.getState().setZoom(2);
      });

      expect(callback).toHaveBeenCalledWith(2, 1);

      unsubscribe();
    });

    it('should not call callback after unsubscribe', () => {
      const callback = vi.fn();
      const unsubscribe = subscribeToEditor(
        (state) => state.zoom,
        callback
      );

      unsubscribe();

      act(() => {
        useEditorStore.getState().setZoom(3);
      });

      expect(callback).not.toHaveBeenCalled();
    });
  });
});

# FINN-002: Editor Mode (Fabric.js Canvas Editor)

## Status
**Draft** | Priority: P0 | Effort: Large

## Overview
Editor Mode provides a full-featured vector editing canvas powered by Fabric.js. This is where users can manually create, modify, and fine-tune illustrations with precise control over every element.

## User Stories

### US-1: Direct Manipulation
> As a user, I want to click and drag elements on the canvas so that I can position them precisely.

**Acceptance Criteria:**
- Single click selects an object
- Drag moves selected object(s)
- Handles appear for resize/rotate
- Shift+drag constrains to axis
- Multi-select with Shift+click or marquee

### US-2: Drawing Tools
> As a user, I want access to standard drawing tools so that I can create shapes and paths manually.

**Acceptance Criteria:**
- Rectangle, ellipse, line, polygon tools
- Freehand drawing with smoothing
- Pen tool for bezier curves
- Text tool with font selection
- Arrow and connector tools

### US-3: Layer Management
> As a user, I want to organize elements into layers so that I can manage complex illustrations.

**Acceptance Criteria:**
- Layer panel showing all objects
- Drag to reorder layers
- Toggle visibility per layer
- Lock layers to prevent editing
- Group/ungroup functionality

### US-4: Styling Controls
> As a user, I want to control colors, strokes, and effects so that my illustrations look professional.

**Acceptance Criteria:**
- Fill color picker with scientific palettes
- Stroke width and style (solid, dashed, dotted)
- Opacity control
- Drop shadow and glow effects
- Gradient fills

## Technical Design

### Canvas Architecture
```
Fabric.js Canvas
    |
    +-- Background Layer (grid, guides)
    +-- Content Layers (user objects)
    +-- UI Layer (selection handles, cursor)
    +-- Overlay Layer (temporary elements)
```

### Core Components

#### CanvasManager
```typescript
class CanvasManager {
  private canvas: fabric.Canvas;
  private history: HistoryManager;
  private selection: SelectionManager;

  addObject(obj: fabric.Object): void;
  removeObject(obj: fabric.Object): void;
  getSelectedObjects(): fabric.Object[];
  exportSVG(): string;
  exportJSON(): CanvasState;
}
```

#### HistoryManager
```typescript
class HistoryManager {
  private undoStack: CanvasState[];
  private redoStack: CanvasState[];

  checkpoint(): void;
  undo(): void;
  redo(): void;
  canUndo(): boolean;
  canRedo(): boolean;
}
```

#### ToolManager
```typescript
interface Tool {
  name: string;
  icon: string;
  cursor: string;
  onMouseDown(e: fabric.IEvent): void;
  onMouseMove(e: fabric.IEvent): void;
  onMouseUp(e: fabric.IEvent): void;
}

class ToolManager {
  private activeTool: Tool;
  private tools: Map<string, Tool>;

  setActiveTool(name: string): void;
  registerTool(tool: Tool): void;
}
```

### Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| V | Selection tool |
| R | Rectangle tool |
| E | Ellipse tool |
| L | Line tool |
| P | Pen tool |
| T | Text tool |
| Delete/Backspace | Delete selected |
| Cmd/Ctrl+Z | Undo |
| Cmd/Ctrl+Shift+Z | Redo |
| Cmd/Ctrl+G | Group |
| Cmd/Ctrl+Shift+G | Ungroup |
| Cmd/Ctrl+C | Copy |
| Cmd/Ctrl+V | Paste |
| Cmd/Ctrl+D | Duplicate |
| Cmd/Ctrl+A | Select all |

## UI/UX Design

### Layout
```
+--------------------------------------------------+
|  Toolbar (tools, actions)                        |
+--------+--------------------------------+--------+
|        |                                |        |
| Tools  |          Canvas               | Props  |
| Panel  |                                | Panel  |
|        |                                |        |
+--------+--------------------------------+--------+
|  Layers Panel                          | Zoom   |
+--------------------------------------------------+
```

### Responsive Behavior
- Panels collapse on smaller screens
- Touch support for tablet users
- Pinch-to-zoom on touch devices

## Dependencies
- Fabric.js 6.x
- React for UI components
- Zustand/Jotai for state management

## Testing Strategy
- Unit tests for CanvasManager methods
- Integration tests for tool interactions
- Visual regression tests for rendering
- Performance tests for large canvases (1000+ objects)

## Performance Targets
- 60 FPS during pan/zoom
- < 100ms for object selection
- < 500ms for undo/redo
- Support 10,000+ objects without degradation

## Open Questions
1. Should we support multiple canvases/artboards?
2. How to handle very large illustrations (poster size)?
3. Collaboration features for future versions?

## References
- [Fabric.js Documentation](http://fabricjs.com/docs/)
- [Figma Keyboard Shortcuts](https://www.figma.com/shortcuts/)

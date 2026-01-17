# Implementation Plan: Editor Mode

**Feature**: 002-editor-mode
**Created**: 2026-01-17
**Status**: In Progress (Background agents building)

## Technical Context

| Aspect | Decision | Rationale |
|--------|----------|-----------|
| **Canvas Library** | Fabric.js 6.x | MIT, 30k stars, best SVG manipulation |
| **UI Framework** | React 18 + TypeScript | Consistency with Agent Mode |
| **State Management** | Zustand + Fabric events | Canvas state synced to React |
| **History** | Command pattern | Standard for undo/redo in editors |

## Constitution Check

| Principle | Compliance | Notes |
|-----------|------------|-------|
| I. AI-First | N/A | This is the manual editing mode |
| II. Publication-Ready | ✅ COMPLIANT | Fabric.js produces clean SVG |
| III. Domain-Specific | 🔶 PARTIAL | Icon library integration pending |
| IV. Tweakable | ✅ COMPLIANT | Core purpose of this feature |
| V. TDD | ✅ IN PROGRESS | Tests being written by agents |
| VI. Spec-Driven | ✅ COMPLIANT | Following spec |
| VII. Open Source | ✅ COMPLIANT | Fabric.js is MIT |

## Phase 0: Research (Completed by Background Agents)

### Fabric.js Best Practices
- Use `fabric.Canvas` with `preserveObjectStacking: true`
- Implement custom selection styles for professional look
- Use `renderOnAddRemove: false` for batch operations

### Undo/Redo Implementation
- Command pattern with action objects
- Store serialized canvas state (too heavy for large canvases)
- Alternative: Store diff of changes (more complex but efficient)
- **Decision**: Hybrid - full state for first 10, then diffs

## Phase 1: Data Model

### Entities

```typescript
interface EditorState {
  canvas: fabric.Canvas | null;
  selectedObjects: string[];
  activeTool: ToolType;
  history: HistoryState;
  zoom: number;
  pan: { x: number; y: number };
}

type ToolType =
  | 'select'
  | 'directSelect'
  | 'rectangle'
  | 'ellipse'
  | 'line'
  | 'pen'
  | 'text'
  | 'arrow'
  | 'hand'
  | 'zoom';

interface HistoryState {
  undoStack: CanvasSnapshot[];
  redoStack: CanvasSnapshot[];
  maxStates: number; // 50
}

interface CanvasSnapshot {
  id: string;
  timestamp: Date;
  json: string; // fabric.Canvas.toJSON()
  description: string;
}

interface LayerInfo {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  thumbnail?: string;
}
```

## Phase 2: Component Architecture (Built by Agents)

```
src/
├── pages/
│   └── EditorMode/
│       ├── EditorMode.tsx         # Main editor layout
│       ├── Canvas.tsx             # Fabric.js canvas wrapper
│       ├── MenuBar.tsx            # File, Edit, View menus
│       └── StatusBar.tsx          # Zoom, selection info
├── components/
│   ├── Toolbar/
│   │   ├── Toolbar.tsx            # Tool buttons
│   │   └── tools/                 # Individual tool implementations
│   ├── PropertiesPanel/
│   │   ├── PropertiesPanel.tsx    # Selected object properties
│   │   ├── TransformSection.tsx
│   │   ├── AppearanceSection.tsx
│   │   └── TextSection.tsx
│   └── LayersPanel/
│       ├── LayersPanel.tsx        # Layer list
│       └── LayerItem.tsx          # Individual layer row
├── editor/
│   ├── FinnishCanvas.ts           # Extended Fabric.js canvas
│   ├── history.ts                 # Undo/redo manager
│   ├── grid.ts                    # Grid overlay
│   └── tools/                     # Tool implementations
└── store/
    └── editorStore.ts             # Zustand store
```

## Current Progress (Background Agents)

✅ **Completed**:
- FinnishCanvas.js with object manipulation
- History manager (undo/redo)
- Grid overlay with snap
- Toolbar component
- Tool implementations (Select, Rectangle, Ellipse, Line, Pen, etc.)
- LayersPanel component
- PropertiesPanel component
- ColorPicker component

🔄 **In Progress**:
- Integration between components
- React wrappers for JS components
- Store setup

## Quality Gates

- [ ] Unit tests for history manager
- [ ] Unit tests for each tool
- [ ] Integration test: draw shape → select → transform → undo
- [ ] Performance: 60fps during drag operations
- [ ] Keyboard shortcuts working (Ctrl+Z, Delete, etc.)

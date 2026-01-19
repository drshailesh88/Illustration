# FINNISH Architecture Documentation

> **Comprehensive Technical Reference for the FINNISH Scientific Illustration Platform**
>
> Last Updated: 2026-01-19 | Version: 1.0.0

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture Overview](#architecture-overview)
3. [Directory Structure](#directory-structure)
4. [Core Technologies](#core-technologies)
5. [State Management](#state-management)
6. [Canvas Architecture](#canvas-architecture)
7. [Core Features](#core-features)
8. [Data Models](#data-models)
9. [Key Files Reference](#key-files-reference)
10. [Development Guide](#development-guide)
11. [Appendix](#appendix)

---

## Project Overview

### Mission

FINNISH is an AI-powered scientific illustration **web application** designed to be the affordable alternative to BioRender for academics. The application provides comprehensive icon and template libraries for **35 scientific specialties** at a target price point of $20-25/month (compared to BioRender's $38-39/month).

### Strategic Goals

| Priority | Competitor | Strategy |
|----------|------------|----------|
| #1 | BioRender | Kill NOW (v1.0 focus) |
| #2 | Napkin.AI | Defer to v2.0 (AI diagram generation) |
| #3 | Adobe | Long-term (professional features) |

### Key Differentiators

1. **AI Prompt-to-Illustration** - Generate diagrams from natural language
2. **AI Image Generation** - Custom illustrations via fal.ai FLUX integration
3. **Massive Icon Library** - 12,000+ icons (vs BioRender's paywalled library)
4. **PPTX Export** - Critical for scientists who need PowerPoint compatibility
5. **Background Removal** - Browser-based, FREE (no API costs)
6. **Competitive Pricing** - $20-25/month vs $38-39/month

---

## Architecture Overview

### High-Level Architecture Diagram

```
+------------------------------------------------------------------+
|                         FINNISH Web App                           |
+------------------------------------------------------------------+
|                                                                   |
|  +------------------+  +------------------+  +------------------+ |
|  |   Welcome Page   |  |   Agent Mode     |  |   Editor Mode    | |
|  |   (Landing)      |  |   (AI Chat)      |  |   (Canvas)       | |
|  +------------------+  +------------------+  +------------------+ |
|                                |                     |            |
|                    +-----------+-----------+         |            |
|                    |                       |         |            |
|  +------------------+  +------------------+  +------------------+ |
|  |   AI Services    |  |  Canvas Engine   |  |   Export Engine  | |
|  | - fal.ai FLUX    |  | - Fabric.js      |  | - PNG/SVG/PDF    | |
|  | - Background     |  | - Paper.js       |  | - PPTX           | |
|  |   Removal        |  | - Rough.js       |  | - LaTeX          | |
|  +------------------+  +------------------+  +------------------+ |
|                                |                                  |
|  +------------------+  +------------------+  +------------------+ |
|  |   State (Zustand)|  |   Icon Library   |  |   Data Layer     | |
|  | - Editor Store   |  | - Tabler Icons   |  | - Templates      | |
|  | - Layer Store    |  | - Health Icons   |  | - Icons          | |
|  | - Conversation   |  | - Bioicons       |  | - Colors         | |
|  | - Export Store   |  | - SciDraw        |  |                  | |
|  +------------------+  +------------------+  +------------------+ |
|                                                                   |
+------------------------------------------------------------------+
```

### Application Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Welcome` | Landing page |
| `/agent` | `AgentMode` | AI-powered diagram generation |
| `/editor` | `EditorMode` | Manual canvas editor |
| `/editor/:id` | `EditorMode` | Editor with loaded diagram |

---

## Directory Structure

```
/home/user/Illustration/
├── src/
│   ├── agent/                 # AI agent integration
│   │   └── index.ts
│   │
│   ├── assets/                # Static assets
│   │   └── icons/             # SVG icons by category
│   │       ├── biology/
│   │       ├── chemistry/
│   │       ├── engineering/
│   │       ├── medicine/
│   │       └── physics/
│   │
│   ├── components/            # React components
│   │   ├── AIGeneration/      # AI image generation UI
│   │   ├── BackgroundRemoval/ # Background removal tool
│   │   ├── Canvas/            # Main canvas component
│   │   ├── ExportDialog/      # Export options UI
│   │   ├── IconBrowser/       # Icon browsing component
│   │   ├── IconPicker/        # Icon selection component
│   │   ├── IllustratorToolbar/# Professional drawing tools
│   │   ├── ImportDialog/      # File import UI
│   │   ├── NewFromTemplate/   # Template selection
│   │   ├── StylePanel/        # Style configuration
│   │   └── Toast/             # Notification system
│   │
│   ├── data/                  # Static data files
│   │   ├── colors/            # Color palettes (35 specialties)
│   │   ├── icons/             # Icon definitions (35 specialties)
│   │   └── templates/         # Diagram templates (35 specialties)
│   │
│   ├── editor/                # Editor tools
│   │   └── tools/
│   │       ├── SelectTool.ts
│   │       ├── ShapeTool.ts
│   │       ├── TextTool.ts
│   │       └── ToolRegistry.ts
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── useDiagramGenerator.ts
│   │   ├── useIllustratorTools.ts
│   │   ├── useKeyboardShortcuts.ts
│   │   ├── useLayerSync.ts
│   │   └── useToolSwitching.ts
│   │
│   ├── lib/                   # Library integrations
│   │   ├── ai/                # AI services
│   │   │   ├── image-generation.ts  # fal.ai FLUX
│   │   │   └── index.ts
│   │   ├── color/             # Color utilities
│   │   ├── export/            # Export functions
│   │   │   ├── index.ts       # PNG, SVG, PDF
│   │   │   └── pptx.ts        # PowerPoint export
│   │   ├── freehand/          # Freehand drawing
│   │   ├── glfx/              # WebGL image filters
│   │   ├── icons/             # Icon library integration
│   │   │   ├── bioicons.ts    # 70+ bio icons
│   │   │   ├── healthIcons.ts # Health icons
│   │   │   ├── iconPark.ts    # Icon Park
│   │   │   ├── scidraw.ts     # SciDraw icons
│   │   │   ├── scienceIcons.ts
│   │   │   ├── simpleIcons.ts
│   │   │   └── index.ts       # Unified search
│   │   ├── image/             # Image processing
│   │   │   └── background-removal.ts
│   │   ├── paper/             # Paper.js integration
│   │   │   ├── PenTool.ts     # Bezier pen tool
│   │   │   └── usePenTool.ts
│   │   └── rough/             # Rough.js integration
│   │       └── HandDrawnStyle.ts
│   │
│   ├── pages/                 # Page components
│   │   ├── AgentMode/         # AI chat interface
│   │   ├── EditorMode/        # Main editor
│   │   │   ├── EditorMode.tsx
│   │   │   ├── MenuBar.tsx
│   │   │   ├── RightPanel.tsx
│   │   │   ├── StatusBar.tsx
│   │   │   └── Toolbar.tsx
│   │   └── Welcome/           # Landing page
│   │
│   ├── services/              # Backend services
│   │   └── ai/
│   │       ├── backends/
│   │       │   ├── MermaidBackend.ts
│   │       │   └── SVGBackend.ts
│   │       ├── prompts/       # AI prompts (35 specialties)
│   │       └── PromptParser.ts
│   │
│   ├── store/                 # Zustand stores
│   │   ├── conversationStore.ts
│   │   ├── editorStore.ts
│   │   ├── exportStore.ts
│   │   ├── layerStore.ts
│   │   └── index.ts
│   │
│   ├── styles/                # Global CSS
│   ├── types/                 # TypeScript definitions
│   │   └── index.ts
│   ├── utils/                 # Utility functions
│   │
│   ├── App.tsx               # Root component
│   └── main.tsx              # Entry point
│
├── docs/                     # Documentation
├── public/                   # Static public files
├── tests/                    # Test files
├── CLAUDE.md                 # AI assistant instructions
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

---

## Core Technologies

### Frontend Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.x | UI framework |
| TypeScript | 5.7.x | Type safety |
| Vite | 6.0.x | Build tool & dev server |
| React Router | 7.1.x | Client-side routing |

### Canvas & Graphics

| Library | Version | Purpose |
|---------|---------|---------|
| **Fabric.js** | 6.5.x | Primary canvas engine |
| **Paper.js** | 0.12.x | Bezier curves & pen tool |
| **Rough.js** | 4.6.x | Hand-drawn style effects |
| **perfect-freehand** | 1.2.x | Pressure-sensitive drawing |
| **glfx.js** | 0.0.4 | WebGL image filters |

### Export & Documents

| Library | Version | Purpose |
|---------|---------|---------|
| **save-svg-as-png** | 1.4.x | PNG export |
| **jsPDF** | 4.0.x | PDF generation |
| **svg2pdf.js** | 2.7.x | SVG to PDF conversion |
| **pptxgenjs** | 4.0.x | PowerPoint export |

### AI & Image Processing

| Library | Version | Purpose |
|---------|---------|---------|
| **@fal-ai/serverless-client** | 0.15.x | AI image generation |
| **@imgly/background-removal** | 1.7.x | Browser-based bg removal |

### Icons

| Library | Icons | License |
|---------|-------|---------|
| @tabler/icons-react | 4,000+ | MIT |
| healthicons-react | 1,500+ | CC0 |
| @scienceicons/react | 500+ | MIT |
| @icon-park/react | 2,400+ | Apache 2.0 |
| simple-icons | 200+ | CC0 |
| Bioicons | 70+ | CC0/MIT/CC-BY |
| SciDraw | 60+ | CC-BY |

### State Management

| Library | Version | Purpose |
|---------|---------|---------|
| **Zustand** | 5.0.x | Lightweight state management |

### Additional Libraries

| Library | Purpose |
|---------|---------|
| colorjs.io | Advanced color manipulation |
| mermaid | Diagram generation |
| katex | LaTeX rendering |
| uuid | Unique ID generation |
| lodash-es | Utility functions |

---

## State Management

FINNISH uses **Zustand** for state management with four primary stores:

### Store Architecture

```
+------------------+     +------------------+
|   editorStore    |     |   layerStore     |
|------------------|     |------------------|
| - canvas ref     |     | - layers[]       |
| - active tool    |     | - activeLayerId  |
| - zoom/pan       |     | - visibility     |
| - selection      |     | - locking        |
| - history        |     | - drag state     |
| - grid settings  |     +------------------+
+------------------+

+------------------+     +------------------+
| conversationStore|     |   exportStore    |
|------------------|     |------------------|
| - messages[]     |     | - format         |
| - diagrams[]     |     | - quality        |
| - currentDiagram |     | - DPI            |
| - isGenerating   |     | - progress       |
+------------------+     +------------------+
```

### Editor Store (`src/store/editorStore.ts`)

Primary store for canvas and editing state.

```typescript
interface EditorState {
  canvas: FabricCanvas | null;    // Fabric.js canvas reference
  selectedObjects: string[];       // Selected object IDs
  activeTool: ToolType;           // Current active tool
  zoom: number;                   // Zoom level (0.1 - 10)
  pan: PanPosition;               // Viewport pan position
  gridVisible: boolean;           // Grid visibility
  snapToGrid: boolean;            // Snap-to-grid toggle
  gridSize: number;               // Grid cell size in pixels
  history: HistoryState;          // Undo/redo history
  isLoading: boolean;             // Loading state
}

// Key actions
setCanvas(canvas)          // Set canvas reference
setActiveTool(tool)        // Switch active tool
setZoom(zoom)              // Update zoom level
undo() / redo()            // History navigation
pushHistory(state)         // Save state to history
```

**Usage:**
```typescript
import { useEditorStore, useActiveTool, useViewport } from '@/store';

// In component
const activeTool = useActiveTool();
const { zoom, pan } = useViewport();
const setActiveTool = useEditorStore((s) => s.setActiveTool);
```

### Layer Store (`src/store/layerStore.ts`)

Manages layer hierarchy and properties.

```typescript
interface StoreLayer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  objects: string[];    // Object IDs in this layer
  order: number;        // Z-order
}

interface LayerState {
  activeLayerId: string | null;
  layers: StoreLayer[];
  isPanelExpanded: boolean;
  dragState: { isDragging, draggedLayerId, dropTargetId };
}
```

### Conversation Store (`src/store/conversationStore.ts`)

Manages AI chat and diagram generation.

```typescript
interface ConversationState {
  messages: Message[];
  currentDiagram: DiagramGeneration | null;
  diagramHistory: DiagramGeneration[];
  isGenerating: boolean;
  error: string | null;
}
```

### Export Store (`src/store/exportStore.ts`)

Tracks export configuration and progress.

```typescript
interface ExportState {
  format: ExportFormat;      // 'png' | 'svg' | 'pdf' | 'tikz'
  quality: number;           // 0-100
  dpi: ExportDPI;           // 72 | 150 | 300 | 600
  isExporting: boolean;
  progress: number;
  stage: ExportStage;
  error: string | null;
}
```

---

## Canvas Architecture

### Dual-Canvas System

FINNISH uses a dual-canvas architecture combining Fabric.js and Paper.js:

```
+----------------------------------------+
|           Canvas Container             |
|  +----------------------------------+  |
|  |         Fabric.js Canvas         |  |
|  |  - Shape rendering               |  |
|  |  - Object manipulation           |  |
|  |  - Selection & transform         |  |
|  |  - Image handling                |  |
|  +----------------------------------+  |
|                   |                    |
|  +----------------------------------+  |
|  |       Paper.js Pen Overlay       |  |
|  |  - Bezier curve creation         |  |
|  |  - Handle manipulation           |  |
|  |  - Path preview                  |  |
|  +----------------------------------+  |
+----------------------------------------+
```

### Canvas Component (`src/components/Canvas/Canvas.tsx`)

The main canvas component wraps Fabric.js and provides:

```typescript
interface CanvasRef {
  getCanvas(): FabricCanvas | null;
  toSVG(): string;
  toPNG(multiplier?: number): string;
  toJSON(): object;
  loadFromJSON(json): Promise<void>;
  clear(): void;
  addObject(object): void;
  removeObject(object): void;
}

interface CanvasProps {
  width?: number;           // Canvas width (default: 800)
  height?: number;          // Canvas height (default: 600)
  backgroundColor?: string; // Background color
  onSelectionChange?: (objects) => void;
  onObjectModified?: (object) => void;
  onMouseMove?: (coords) => void;
  onReady?: (canvas) => void;
}
```

### Tool System

Tools are managed through the `ToolType` enum:

```typescript
enum ToolType {
  // Selection
  SELECT = 'select',
  DIRECT_SELECT = 'directSelect',

  // Drawing
  PEN = 'pen',
  PENCIL = 'pencil',
  LINE = 'line',

  // Shapes
  RECTANGLE = 'rectangle',
  ELLIPSE = 'ellipse',
  POLYGON = 'polygon',
  STAR = 'star',

  // Annotation
  ARROW = 'arrow',
  BRACKET = 'bracket',
  CALLOUT = 'callout',
  DIMENSION = 'dimension',

  // Text
  TEXT = 'text',
  TEXT_ON_PATH = 'textOnPath',

  // Utility
  HAND = 'hand',
  ZOOM = 'zoom',
  EYEDROPPER = 'eyedropper',
}
```

### Pen Tool (Paper.js Integration)

The professional pen tool is implemented using Paper.js:

```typescript
// src/lib/paper/PenTool.ts

class PenTool {
  // Features:
  // - Click to add anchor points
  // - Drag to create bezier curve handles
  // - Hold Shift for constrained angles (45 degrees)
  // - Double-click to close path
  // - ESC to finish open path
  // - Backspace/Delete to remove last segment

  onPathComplete?: (path: paper.Path, svgData: string) => void;
}
```

The PenToolOverlay component (`src/components/Canvas/PenToolOverlay.tsx`) handles:
- Paper.js scope initialization
- Event bridging between Paper.js and Fabric.js
- Path to Fabric.js object conversion

---

## Core Features

### 1. Export System

#### Supported Formats

| Format | Library | Features |
|--------|---------|----------|
| **PNG** | save-svg-as-png | Scale (1x-4x), transparency, custom DPI |
| **SVG** | Native | Font embedding, optimization |
| **PDF** | jsPDF + svg2pdf | Page sizes (A4, Letter, A3), orientation, margins |
| **PPTX** | pptxgenjs | Slide layouts (16:9, 4:3), centering, metadata |
| **LaTeX** | Custom | TikZ code generation |

#### PPTX Export (`src/lib/export/pptx.ts`)

```typescript
interface PptxExportOptions {
  layout?: '16x9' | '16x10' | '4x3' | 'custom';
  customWidth?: number;          // inches
  customHeight?: number;         // inches
  multiplier?: number;           // Resolution (1x, 2x, 4x)
  quality?: number;              // 0-1
  author?: string;
  title?: string;
  subject?: string;
  company?: string;
  centerImage?: boolean;
  slideBackground?: string;      // hex color or 'transparent'
  padding?: number;              // inches
}

// Usage
await exportAsPptx(canvas, 'diagram', {
  layout: '16x9',
  multiplier: 2,
  title: 'Cell Structure'
});
```

#### PDF Export (`src/lib/export/index.ts`)

```typescript
interface PdfExportOptions {
  pageSize?: 'a4' | 'letter' | 'a3' | 'custom';
  orientation?: 'portrait' | 'landscape';
  margins?: { top, right, bottom, left };  // mm
  title?: string;
  author?: string;
}
```

### 2. AI Image Generation (`src/lib/ai/image-generation.ts`)

Integration with fal.ai FLUX models for AI-powered image generation.

```typescript
interface GenerationOptions {
  prompt: string;
  negativePrompt?: string;
  imageSize?: ImageSize;          // 'square_hd' | 'landscape_4_3' | etc.
  numImages?: number;             // 1-4
  seed?: number;
  model?: FluxModel;              // 'fal-ai/flux/schnell' (cheapest)
  numInferenceSteps?: number;
  guidanceScale?: number;
  enableSafetyChecker?: boolean;
}

// Pricing
// fal-ai/flux/schnell: $0.008/image (~4-6 seconds)
// fal-ai/flux/dev:     $0.012/image (~8-12 seconds)
// fal-ai/flux-pro:     $0.03/image  (~12-20 seconds)

// Usage
configureFalClient('your-api-key');
const result = await generateImage({
  prompt: 'Scientific diagram of EGFR signaling pathway',
  imageSize: 'square_hd',
  model: 'fal-ai/flux/schnell',
});
```

#### Scientific Diagram Presets

```typescript
type IllustrationStyle =
  | 'clean'          // Clean vector, minimal details
  | 'detailed'       // Detailed scientific illustration
  | 'sketch'         // Hand-drawn style
  | 'diagram'        // Technical diagram
  | 'photorealistic';

await generateScientificDiagram(
  'human heart anatomy',
  'detailed',
  'with labeled chambers'
);
```

### 3. Background Removal (`src/lib/image/background-removal.ts`)

Browser-based background removal using @imgly/background-removal (runs entirely client-side).

```typescript
interface BackgroundRemovalOptions {
  onProgress?: (progress: number, stage?: BackgroundRemovalStage) => void;
  model?: 'small' | 'medium';
  output?: {
    format?: 'image/png' | 'image/webp' | 'image/jpeg';
    quality?: number;
  };
}

interface BackgroundRemovalResult {
  blob: Blob;
  width: number;
  height: number;
  processingTime: number;  // milliseconds
}

// Usage
const result = await removeImageBackground(file, {
  onProgress: (progress, stage) => {
    console.log(`${stage}: ${Math.round(progress * 100)}%`);
  }
});
const imageUrl = URL.createObjectURL(result.blob);
```

**Key Advantage:** Zero API costs - runs entirely in browser using WebAssembly.

### 4. Hand-Drawn Style (Rough.js)

Located in `src/lib/rough/HandDrawnStyle.ts`:

```typescript
interface HandDrawnSettings {
  enabled: boolean;
  roughness: number;      // 0-10, default 1
  bowing: number;         // 0-10, default 1
  seed?: number;          // For consistent randomness
  strokeWidth?: number;
  fillStyle?: 'hachure' | 'solid' | 'zigzag' | 'cross-hatch' | 'dots';
}
```

### 5. Icon Library System

#### Unified Search (`src/lib/icons/index.ts`)

```typescript
interface UnifiedIconResult {
  id: string;
  name: string;
  category: string;
  keywords: string[];
  library: 'tabler' | 'health' | 'science' | 'iconpark' | 'simple' | 'bioicons' | 'scidraw';
  component?: React.ComponentType;  // For React icon libraries
  svg?: string;                     // For inline SVG icons
  viewBox?: string;
  license?: string;
}

// Search across all libraries
const results = searchAllIcons('cell membrane');

// Get total counts
const counts = getTotalIconCount();
// { total: 8000+, byLibrary: { health: 200, bioicons: 70, ... } }
```

#### Library-Specific APIs

```typescript
// Bioicons
import { searchBioicons, getBioiconById, bioiconToSvg } from '@/lib/icons';

// SciDraw
import { searchSciDrawIcons, scidrawToSvg } from '@/lib/icons';

// Health Icons
import { searchHealthIcons, getHealthIconsByCategory } from '@/lib/icons';
```

---

## Data Models

### Icon Definition (`src/data/icons/index.ts`)

```typescript
interface IconDefinition {
  id: string;              // Unique identifier
  name: string;            // Display name
  category: string;        // Category within domain
  domain: IconDomain;      // medicine, biology, etc.
  svg: string;             // SVG content
  keywords: string[];      // Search keywords
  width?: number;
  height?: number;
  viewBox?: string;
}

type IconDomain =
  | 'medicine'
  | 'biology'
  | 'chemistry'
  | 'physics'
  | 'engineering'
  | 'mathematics'
  | 'computer-science'
  | 'neuroscience';
```

### Template Definition (`src/data/templates/index.ts`)

```typescript
interface DiagramTemplate {
  id: string;
  name: string;
  description: string;
  domain: TemplateDomain;
  category: string;
  svg: string;                    // SVG template with placeholders
  placeholders: Placeholder[];    // Editable regions
  defaultValues: Record<string, string>;
  thumbnail?: string;
}

interface Placeholder {
  id: string;
  type: 'text' | 'icon' | 'color' | 'number';
  label: string;
  defaultValue: string;
  validation?: {
    required?: boolean;
    pattern?: string;
    min?: number;
    max?: number;
  };
}
```

### Canvas Object Types

Fabric.js objects used in the canvas:

```typescript
// Standard Fabric.js types
import { Rect, Ellipse, Line, IText, Path, Group, Image } from 'fabric';

// Custom properties added to objects
interface FinnishObject {
  id: string;           // Unique identifier
  layerId?: string;     // Associated layer
  isGrid?: boolean;     // Grid line marker
  metadata?: {
    createdAt: number;
    updatedAt: number;
    sourceIcon?: string;
    sourceTemplate?: string;
  };
}
```

### Color Palettes (`src/data/colors/`)

```typescript
interface ColorPalette {
  id: string;
  name: string;
  domain: string;
  colors: {
    primary: string[];
    secondary: string[];
    accent: string[];
    neutral: string[];
  };
  semanticColors?: {
    positive?: string;
    negative?: string;
    warning?: string;
    info?: string;
  };
}
```

---

## Key Files Reference

### Entry Points

| File | Description |
|------|-------------|
| `src/main.tsx` | Application bootstrap, renders App |
| `src/App.tsx` | Root component, routing setup |
| `src/vite-env.d.ts` | Vite environment type declarations |

### Core Components

| File | Description |
|------|-------------|
| `src/components/Canvas/Canvas.tsx` | Fabric.js canvas wrapper |
| `src/components/Canvas/PenToolOverlay.tsx` | Paper.js pen tool overlay |
| `src/components/Canvas/CanvasContext.tsx` | Canvas React context |
| `src/pages/EditorMode/EditorMode.tsx` | Main editor page layout |
| `src/pages/EditorMode/MenuBar.tsx` | Top menu bar with actions |
| `src/pages/EditorMode/Toolbar.tsx` | Left-side tool palette |
| `src/pages/EditorMode/RightPanel.tsx` | Properties/layers/icons panel |
| `src/pages/AgentMode/AgentMode.tsx` | AI chat interface |

### State Management

| File | Description |
|------|-------------|
| `src/store/editorStore.ts` | Canvas and tool state |
| `src/store/layerStore.ts` | Layer management state |
| `src/store/conversationStore.ts` | AI conversation state |
| `src/store/exportStore.ts` | Export configuration state |
| `src/store/index.ts` | Combined store exports |

### Library Integrations

| File | Description |
|------|-------------|
| `src/lib/export/index.ts` | PNG/SVG/PDF export |
| `src/lib/export/pptx.ts` | PowerPoint export |
| `src/lib/ai/image-generation.ts` | fal.ai FLUX integration |
| `src/lib/image/background-removal.ts` | @imgly background removal |
| `src/lib/paper/PenTool.ts` | Professional pen tool class |
| `src/lib/rough/HandDrawnStyle.ts` | Rough.js integration |
| `src/lib/icons/index.ts` | Unified icon library |
| `src/lib/icons/bioicons.ts` | Bioicons integration (70+) |
| `src/lib/icons/scidraw.ts` | SciDraw integration |

### Type Definitions

| File | Description |
|------|-------------|
| `src/types/index.ts` | Core TypeScript interfaces |

### Configuration

| File | Description |
|------|-------------|
| `vite.config.ts` | Vite build configuration |
| `tsconfig.json` | TypeScript configuration |
| `vitest.config.ts` | Test configuration |
| `package.json` | Dependencies and scripts |

---

## Development Guide

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Setup

```bash
# Clone repository
git clone <repository-url>
cd Illustration

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server on port 3000 |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build |
| `npm test` | Run Vitest tests |
| `npm run test:coverage` | Run tests with coverage |
| `npm run lint` | ESLint check |
| `npm run typecheck` | TypeScript type checking |

### Path Aliases

Configured in `vite.config.ts`:

| Alias | Path |
|-------|------|
| `@` | `./src` |
| `@components` | `./src/components` |
| `@editor` | `./src/editor` |
| `@services` | `./src/services` |
| `@store` | `./src/store` |
| `@stores` | `./src/stores` |
| `@utils` | `./src/utils` |
| `@types` | `./src/types` |
| `@styles` | `./src/styles` |
| `@hooks` | `./src/hooks` |
| `@pages` | `./src/pages` |

### Adding a New Feature

#### 1. Adding a New Tool

```typescript
// 1. Add to ToolType enum (src/types/index.ts)
enum ToolType {
  // ...existing tools
  MY_NEW_TOOL = 'myNewTool',
}

// 2. Handle in Canvas component (src/components/Canvas/Canvas.tsx)
useEffect(() => {
  if (activeTool === ToolType.MY_NEW_TOOL) {
    canvas.selection = false;
    canvas.defaultCursor = 'crosshair';
    // ... setup tool
  }
}, [activeTool]);

// 3. Add to toolbar (src/pages/EditorMode/Toolbar.tsx)
```

#### 2. Adding a New Export Format

```typescript
// 1. Create export function in src/lib/export/
export async function exportAsMyFormat(
  canvas: FabricCanvas,
  filename: string,
  options: MyFormatOptions
): Promise<void> {
  // Implementation
}

// 2. Export from src/lib/export/index.ts
export { exportAsMyFormat } from './myFormat';

// 3. Add to ExportDialog (src/components/ExportDialog/)
// 4. Wire up in EditorMode handleExport
```

#### 3. Adding a New Icon Library

```typescript
// 1. Create file in src/lib/icons/myIcons.ts
export interface MyIconMeta {
  id: string;
  name: string;
  category: string;
  keywords: string[];
  svg: string;
}

export const myIconsList: MyIconMeta[] = [/* icons */];

export function searchMyIcons(query: string): MyIconMeta[] {
  // Implementation
}

// 2. Export from src/lib/icons/index.ts
export * from './myIcons';

// 3. Add to unified search in searchAllIcons()
```

#### 4. Adding a New Specialty

Each specialty needs three files:
- `src/data/icons/{specialty}.ts` - Icon definitions
- `src/data/templates/{specialty}.ts` - Diagram templates
- `src/data/colors/{specialty}.ts` - Color palettes

Also update the index files to export the new data.

### Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- src/lib/export/pptx.test.ts
```

### Building for Production

```bash
# Build
npm run build

# Output in ./dist/
# - Chunked vendor code (React, Fabric.js)
# - Sourcemaps included
# - Minified with Terser
```

---

## Appendix

### A. Complete Specialty List (35 Total)

| Category | Specialties |
|----------|-------------|
| Medicine | Cardiology, Pulmonology, Emergency Medicine, Gastroenterology, Infectious Disease, Nephrology, Neurology, Hematology-Oncology, Endocrinology, Orthopedics, Anesthesiology, Radiology, Ophthalmology, Dermatology, ENT, Pediatrics, OB/GYN, Psychiatry, Rheumatology, Pathology |
| Science | Physiology, Biochemistry, Mathematics, Molecular Biology, Pharmacology, Neuroscience Research, Cell Biology, Chemistry, Physics, Microbiology |
| Engineering | Engineering, Biomedical Engineering, Computer Science |
| General | Anatomy, Biology General |

### B. Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `V` | Select tool |
| `P` | Pen tool |
| `R` | Rectangle tool |
| `E` | Ellipse tool |
| `L` | Line tool |
| `T` | Text tool |
| `H` | Hand (pan) tool |
| `Ctrl+Z` | Undo |
| `Ctrl+Y` / `Ctrl+Shift+Z` | Redo |
| `Ctrl+C` | Copy |
| `Ctrl+V` | Paste |
| `Delete` | Delete selected |
| `Ctrl+A` | Select all |
| `Ctrl+Shift+B` | Background removal |
| `Ctrl+E` | Export dialog |

### C. Environment Variables

```bash
# .env.example
VITE_FAL_API_KEY=your-fal-ai-api-key
VITE_APP_NAME=FINNISH
VITE_APP_VERSION=1.0.0
```

### D. License Information

**FINNISH Application:** MIT License

**Third-Party Icon Licenses:**
- Tabler Icons: MIT
- Health Icons: CC0
- Science Icons: MIT
- Icon Park: Apache 2.0
- Simple Icons: CC0
- Bioicons: CC0/MIT/CC-BY
- SciDraw: CC-BY

**Attribution Required (CC-BY):**
```
Scientific illustrations from:
- Bioicons (bioicons.com) - CC-BY
- SciDraw (scidraw.io) - CC-BY
- Servier Medical Art (smart.servier.com) - CC-BY 4.0
```

### E. Performance Considerations

1. **Chunked Builds:** Vendor code (React, Fabric.js) is separated into chunks
2. **Lazy Loading:** Large components can be dynamically imported
3. **WebWorkers:** Background removal uses WebAssembly for performance
4. **Canvas Optimization:** Fabric.js `requestRenderAll()` batches renders

### F. Browser Support

- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

**Required APIs:**
- WebAssembly (for background removal)
- WebGL (for glfx filters)
- Canvas API
- Clipboard API

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-19 | Initial comprehensive documentation |

---

*This documentation reflects the codebase as of January 19, 2026.*

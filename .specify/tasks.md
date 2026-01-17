# Tasks: FINNISH - AI-Powered Scientific Illustration Tool

**Input**: Design documents from `.specify/features/`
**Prerequisites**: constitution.md, spec.md for all 5 features, plan.md
**TDD Requirement**: Per constitution, all features MUST have tests (80% coverage target)

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., AM1 = Agent Mode Story 1)
- Include exact file paths in descriptions

## Feature Code Reference

| Code | Feature | Spec File |
|------|---------|-----------|
| AM | Agent Mode | 001-agent-mode |
| EM | Editor Mode | 002-editor-mode |
| EX | Export Pipeline | 003-export-pipeline |
| DL | Domain Libraries | 004-domain-libraries |
| IM | Import External | 005-import-external |

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and core dependencies

- [ ] T001 [P] Install all npm dependencies with `npm install` in /home/user/Illustration
- [ ] T002 [P] Create TypeScript path aliases in src/tsconfig.json for @components, @editor, @services, @utils
- [ ] T003 [P] Configure Vite aliases to match TypeScript paths in vite.config.ts
- [ ] T004 [P] Create environment configuration in src/config/env.ts (API keys, feature flags)
- [ ] T005 [P] Setup ESLint configuration in eslint.config.js following constitution
- [ ] T006 Create main App router with React Router in src/App.tsx (AgentMode, EditorMode routes)
- [ ] T007 [P] Create shared types in src/types/index.ts (DiagramGeneration, Conversation, Layer, etc.)
- [ ] T008 [P] Create design tokens in src/styles/tokens.ts (colors, typography per constitution)

**Checkpoint**: Project builds with `npm run dev`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that ALL features depend on

**⚠️ CRITICAL**: No feature work can begin until this phase is complete

### State Management

- [ ] T009 Create Zustand store structure in src/store/index.ts
- [ ] T010 [P] Create editor store in src/store/editorStore.ts (canvas state, selected objects, active tool)
- [ ] T011 [P] Create conversation store in src/store/conversationStore.ts (messages, history)
- [ ] T012 [P] Create export store in src/store/exportStore.ts (format, quality, progress)

### Canvas Foundation

- [ ] T013 Create React wrapper for FinnishCanvas in src/components/Canvas/Canvas.tsx
- [ ] T014 [P] Create canvas context provider in src/components/Canvas/CanvasContext.tsx
- [ ] T015 Integrate FinnishCanvas with Zustand store in src/components/Canvas/useCanvas.ts

### AI Service Foundation

- [ ] T016 Create AI service interface in src/services/ai/types.ts
- [ ] T017 [P] Create Claude API client in src/services/ai/ClaudeClient.ts
- [ ] T018 [P] Create diagram generation service in src/services/ai/DiagramGenerator.ts
- [ ] T019 Create prompt templates in src/services/ai/prompts/index.ts

### Testing Foundation

- [ ] T020 [P] Create test utilities in tests/utils/testHelpers.ts
- [ ] T021 [P] Create canvas test mocks in tests/mocks/fabricMocks.ts
- [ ] T022 [P] Create AI service mocks in tests/mocks/aiMocks.ts

**Checkpoint**: Foundation ready - all stores connected, canvas renders, AI service callable

---

## Phase 3: Agent Mode - Story 1 (Generate from Prompt) 🎯 MVP

**Goal**: User types prompt, receives publication-ready SVG within 5 seconds

**Independent Test**: Type "Create a CONSORT flow diagram" → SVG appears in preview

### Tests for AM1

- [ ] T023 [P] [AM1] Unit test for DiagramGenerator in tests/unit/services/DiagramGenerator.test.ts
- [ ] T024 [P] [AM1] Unit test for prompt parsing in tests/unit/services/PromptParser.test.ts
- [ ] T025 [P] [AM1] Integration test for generation flow in tests/integration/agentMode.test.ts

### Implementation for AM1

- [ ] T026 [P] [AM1] Create AgentMode page layout in src/pages/AgentMode/AgentMode.tsx
- [ ] T027 [P] [AM1] Create PromptInput component in src/pages/AgentMode/PromptInput.tsx
- [ ] T028 [P] [AM1] Create DiagramPreview component in src/pages/AgentMode/DiagramPreview.tsx
- [ ] T029 [P] [AM1] Create ChatMessage component in src/pages/AgentMode/ChatMessage.tsx
- [ ] T030 [AM1] Create PromptParser service in src/services/ai/PromptParser.ts (intent detection)
- [ ] T031 [AM1] Implement Mermaid generation path in src/services/ai/backends/MermaidBackend.ts
- [ ] T032 [AM1] Implement SVG generation path in src/services/ai/backends/SVGBackend.ts
- [ ] T033 [AM1] Create generation loading state in src/pages/AgentMode/GenerationStatus.tsx
- [ ] T034 [AM1] Add "Send to Editor" button with navigation in src/pages/AgentMode/DiagramActions.tsx
- [ ] T035 [AM1] Add "Download" button (PNG/SVG) in src/pages/AgentMode/DiagramActions.tsx
- [ ] T036 [AM1] Add "Regenerate" button in src/pages/AgentMode/DiagramActions.tsx

**Checkpoint**: Can generate diagram from prompt, view preview, send to editor

---

## Phase 4: Agent Mode - Story 2 (Refine with Follow-ups)

**Goal**: User can refine diagram through conversational follow-ups

**Independent Test**: After generating, say "make boxes blue" → diagram updates

### Tests for AM2

- [ ] T037 [P] [AM2] Unit test for conversation context in tests/unit/services/ConversationManager.test.ts
- [ ] T038 [P] [AM2] Integration test for refinement in tests/integration/diagramRefinement.test.ts

### Implementation for AM2

- [ ] T039 [P] [AM2] Create ConversationManager in src/services/ai/ConversationManager.ts
- [ ] T040 [AM2] Create ChatHistory component in src/pages/AgentMode/ChatHistory.tsx
- [ ] T041 [AM2] Implement context-aware prompting in src/services/ai/ContextBuilder.ts
- [ ] T042 [AM2] Add version tracking for diagram iterations in src/store/conversationStore.ts
- [ ] T043 [AM2] Create version selector UI in src/pages/AgentMode/VersionSelector.tsx

**Checkpoint**: Can refine diagrams through conversation, see history

---

## Phase 5: Agent Mode - Story 3 (Template Suggestions)

**Goal**: New users see categorized templates by scientific domain

**Independent Test**: Click "Templates" → see CONSORT, PRISMA, Forest Plot options

### Tests for AM3

- [ ] T044 [P] [AM3] Unit test for template service in tests/unit/services/TemplateService.test.ts

### Implementation for AM3

- [ ] T045 [P] [AM3] Create template data in src/data/templates/index.ts
- [ ] T046 [P] [AM3] Create medicine templates in src/data/templates/medicine.ts (CONSORT, PRISMA, etc.)
- [ ] T047 [P] [AM3] Create biology templates in src/data/templates/biology.ts
- [ ] T048 [P] [AM3] Create chemistry templates in src/data/templates/chemistry.ts
- [ ] T049 [AM3] Create TemplateGallery component in src/pages/AgentMode/TemplateGallery.tsx
- [ ] T050 [AM3] Create TemplateCard component in src/pages/AgentMode/TemplateCard.tsx
- [ ] T051 [AM3] Create DomainSelector component in src/pages/AgentMode/DomainSelector.tsx

**Checkpoint**: Can browse templates by domain, insert template prompts

---

## Phase 6: Editor Mode - Story 1 (Object Manipulation) 🎯 MVP

**Goal**: Select, move, resize, rotate any object on canvas

**Independent Test**: Click object → drag handles appear → resize works

### Tests for EM1

- [ ] T052 [P] [EM1] Unit test for SelectTool in tests/unit/editor/SelectTool.test.ts
- [ ] T053 [P] [EM1] Unit test for object transforms in tests/unit/editor/transforms.test.ts
- [ ] T054 [P] [EM1] Integration test for selection flow in tests/integration/editorSelection.test.ts

### Implementation for EM1

- [ ] T055 [P] [EM1] Create EditorMode page layout in src/pages/EditorMode/EditorMode.tsx
- [ ] T056 [P] [EM1] Create ToolbarContainer in src/pages/EditorMode/ToolbarContainer.tsx
- [ ] T057 [P] [EM1] Create SidePanel container in src/pages/EditorMode/SidePanel.tsx
- [ ] T058 [EM1] Integrate existing Toolbar with EditorMode in src/pages/EditorMode/EditorMode.tsx
- [ ] T059 [EM1] Integrate existing LayersPanel in src/pages/EditorMode/EditorMode.tsx
- [ ] T060 [EM1] Integrate existing PropertiesPanel in src/pages/EditorMode/EditorMode.tsx
- [ ] T061 [EM1] Connect tool selection to Zustand store in src/store/editorStore.ts
- [ ] T062 [EM1] Add keyboard shortcuts (Delete, Ctrl+Z, Ctrl+C/V) in src/hooks/useKeyboardShortcuts.ts

**Checkpoint**: Can select, move, resize, rotate objects with undo/redo

---

## Phase 7: Editor Mode - Story 2 (Drawing Tools)

**Goal**: Draw rectangles, ellipses, lines, text, arrows

**Independent Test**: Select rectangle tool → draw on canvas → shape appears

### Tests for EM2

- [ ] T063 [P] [EM2] Unit test for RectangleTool in tests/unit/editor/RectangleTool.test.ts
- [ ] T064 [P] [EM2] Unit test for TextTool in tests/unit/editor/TextTool.test.ts

### Implementation for EM2

- [ ] T065 [P] [EM2] Create tool registry in src/editor/tools/ToolRegistry.ts
- [ ] T066 [EM2] Connect all existing tools to registry in src/editor/tools/index.ts
- [ ] T067 [EM2] Create tool switching logic in src/hooks/useToolSwitching.ts
- [ ] T068 [EM2] Add tool options panel in src/components/ToolOptions/ToolOptions.tsx
- [ ] T069 [EM2] Add shape-specific options in src/components/ToolOptions/ShapeOptions.tsx

**Checkpoint**: All drawing tools functional with options

---

## Phase 8: Editor Mode - Story 3 (Layer Management)

**Goal**: Reorder, show/hide, lock/unlock layers

**Independent Test**: Drag layer in panel → object order changes on canvas

### Tests for EM3

- [ ] T070 [P] [EM3] Unit test for layer operations in tests/unit/editor/LayerManager.test.ts

### Implementation for EM3

- [ ] T071 [EM3] Create LayerManager service in src/services/LayerManager.ts
- [ ] T072 [EM3] Add drag-and-drop reordering to LayersPanel in src/components/LayersPanel.js
- [ ] T073 [EM3] Sync layer changes with FinnishCanvas in src/hooks/useLayerSync.ts

**Checkpoint**: Full layer management working

---

## Phase 9: Export Pipeline - Story 1 (PNG Export) 🎯 MVP

**Goal**: Export canvas as PNG at various DPI (72, 150, 300, 600)

**Independent Test**: Click Export → PNG 300 DPI → file downloads

### Tests for EX1

- [ ] T074 [P] [EX1] Unit test for PNG export in tests/unit/services/PNGExporter.test.ts

### Implementation for EX1

- [ ] T075 [P] [EX1] Create ExportService interface in src/services/export/types.ts
- [ ] T076 [EX1] Create PNGExporter in src/services/export/PNGExporter.ts
- [ ] T077 [EX1] Create ExportDialog component in src/components/ExportDialog/ExportDialog.tsx
- [ ] T078 [EX1] Add DPI selector in src/components/ExportDialog/DPISelector.tsx
- [ ] T079 [EX1] Add quality slider in src/components/ExportDialog/QualitySlider.tsx
- [ ] T080 [EX1] Create download utility in src/utils/download.ts

**Checkpoint**: Can export PNG at publication-quality 300 DPI

---

## Phase 10: Export Pipeline - Story 2 (SVG/PDF Export)

**Goal**: Export as optimized SVG or camera-ready PDF

**Independent Test**: Click Export → PDF → opens/downloads PDF

### Tests for EX2

- [ ] T081 [P] [EX2] Unit test for SVG export in tests/unit/services/SVGExporter.test.ts
- [ ] T082 [P] [EX2] Unit test for PDF export in tests/unit/services/PDFExporter.test.ts

### Implementation for EX2

- [ ] T083 [P] [EX2] Create SVGExporter with optimization in src/services/export/SVGExporter.ts
- [ ] T084 [P] [EX2] Create PDFExporter using pdf-lib in src/services/export/PDFExporter.ts
- [ ] T085 [EX2] Add format tabs to ExportDialog in src/components/ExportDialog/FormatTabs.tsx
- [ ] T086 [EX2] Add SVG optimization options in src/components/ExportDialog/SVGOptions.tsx
- [ ] T087 [EX2] Add PDF page size options in src/components/ExportDialog/PDFOptions.tsx

**Checkpoint**: Can export SVG and PDF with options

---

## Phase 11: Export Pipeline - Story 3 (LaTeX/TikZ Export)

**Goal**: Export diagram as TikZ code for LaTeX papers

**Independent Test**: Export → LaTeX → compilable .tex file

### Tests for EX3

- [ ] T088 [P] [EX3] Unit test for TikZ export in tests/unit/services/TikZExporter.test.ts

### Implementation for EX3

- [ ] T089 [P] [EX3] Create TikZExporter in src/services/export/TikZExporter.ts
- [ ] T090 [P] [EX3] Create shape-to-TikZ converters in src/services/export/tikz/shapes.ts
- [ ] T091 [P] [EX3] Create color-to-TikZ converters in src/services/export/tikz/colors.ts
- [ ] T092 [EX3] Add LaTeX tab to ExportDialog in src/components/ExportDialog/LaTeXOptions.tsx
- [ ] T093 [EX3] Add TikZ preview in src/components/ExportDialog/TikZPreview.tsx

**Checkpoint**: Can export working LaTeX/TikZ code

---

## Phase 12: Domain Libraries - Story 1 (Icon Browser) 🎯 MVP

**Goal**: Browse and insert icons by scientific domain

**Independent Test**: Open icons → Medicine → Heart → insert on canvas

### Tests for DL1

- [ ] T094 [P] [DL1] Unit test for IconLibrary in tests/unit/services/IconLibrary.test.ts

### Implementation for DL1

- [ ] T095 [P] [DL1] Expand IconLibrary with all domains in src/services/IconLibrary.js
- [ ] T096 [P] [DL1] Add 50+ biology icons in src/assets/icons/biology/
- [ ] T097 [P] [DL1] Add 50+ chemistry icons in src/assets/icons/chemistry/
- [ ] T098 [P] [DL1] Add 50+ physics icons in src/assets/icons/physics/
- [ ] T099 [P] [DL1] Add 50+ engineering icons in src/assets/icons/engineering/
- [ ] T100 [DL1] Create IconBrowser panel in src/components/IconBrowser/IconBrowser.tsx
- [ ] T101 [DL1] Add search functionality in src/components/IconBrowser/IconSearch.tsx
- [ ] T102 [DL1] Add domain filter tabs in src/components/IconBrowser/DomainTabs.tsx

**Checkpoint**: Can browse and insert icons from all domains

---

## Phase 13: Domain Libraries - Story 2 (Diagram Templates)

**Goal**: Start from pre-built domain-specific diagram templates

**Independent Test**: New → Template → CONSORT → editable diagram

### Tests for DL2

- [ ] T103 [P] [DL2] Unit test for TemplateLoader in tests/unit/services/TemplateLoader.test.ts

### Implementation for DL2

- [ ] T104 [P] [DL2] Create CONSORT template SVG in src/assets/templates/medicine/consort.svg
- [ ] T105 [P] [DL2] Create PRISMA template SVG in src/assets/templates/medicine/prisma.svg
- [ ] T106 [P] [DL2] Create ForestPlot template in src/assets/templates/medicine/forest-plot.svg
- [ ] T107 [P] [DL2] Create KM curve template in src/assets/templates/medicine/km-curve.svg
- [ ] T108 [DL2] Create TemplateLoader service in src/services/TemplateLoader.ts
- [ ] T109 [DL2] Create NewFromTemplate dialog in src/components/NewFromTemplate/NewFromTemplate.tsx

**Checkpoint**: Can start from domain templates

---

## Phase 14: Import External - Story 1 (Import SVG) 🎯 MVP

**Goal**: Import external SVG files as editable objects

**Independent Test**: Drag SVG file → objects appear → can select/move each

### Tests for IM1

- [ ] T110 [P] [IM1] Unit test for SVG parser in tests/unit/services/SVGImporter.test.ts

### Implementation for IM1

- [ ] T111 [P] [IM1] Create SVGImporter service in src/services/import/SVGImporter.ts
- [ ] T112 [P] [IM1] Create SVG element parser in src/services/import/SVGParser.ts
- [ ] T113 [IM1] Add drag-and-drop handler in src/components/Canvas/DropZone.tsx
- [ ] T114 [IM1] Add file picker dialog in src/components/ImportDialog/ImportDialog.tsx
- [ ] T115 [IM1] Handle grouped elements in src/services/import/GroupHandler.ts

**Checkpoint**: Can import SVG and edit individual elements

---

## Phase 15: Import External - Story 2 (Clipboard Paste)

**Goal**: Paste SVG/images from clipboard

**Independent Test**: Copy SVG from browser → Ctrl+V → appears on canvas

### Tests for IM2

- [ ] T116 [P] [IM2] Unit test for clipboard handler in tests/unit/services/ClipboardHandler.test.ts

### Implementation for IM2

- [ ] T117 [IM2] Create ClipboardHandler in src/services/import/ClipboardHandler.ts
- [ ] T118 [IM2] Add paste event listener in src/hooks/useClipboard.ts
- [ ] T119 [IM2] Handle image paste in src/services/import/ImageImporter.ts

**Checkpoint**: Can paste from clipboard

---

## Phase 16: Import External - Story 3 (PNG/JPEG Import)

**Goal**: Import raster images for tracing or reference

**Independent Test**: Drop PNG → image on canvas → can resize/position

### Tests for IM3

- [ ] T120 [P] [IM3] Unit test for image import in tests/unit/services/ImageImporter.test.ts

### Implementation for IM3

- [ ] T121 [IM3] Create ImageImporter service in src/services/import/ImageImporter.ts
- [ ] T122 [IM3] Add image-to-SVG tracing (potrace) in src/services/import/ImageTracer.ts
- [ ] T123 [IM3] Add "Trace Image" button in src/components/ImportDialog/TraceOptions.tsx

**Checkpoint**: Can import and optionally trace images

---

## Phase 17: Polish & Cross-Cutting Concerns

**Purpose**: Final quality improvements across all features

- [ ] T124 [P] Add loading states to all async operations
- [ ] T125 [P] Add error boundaries in src/components/ErrorBoundary.tsx
- [ ] T126 [P] Add toast notifications in src/components/Toast/Toast.tsx
- [ ] T127 Create welcome screen in src/pages/Welcome/Welcome.tsx
- [ ] T128 [P] Add keyboard shortcuts help dialog in src/components/ShortcutsHelp.tsx
- [ ] T129 [P] Ensure all colors meet WCAG AA per constitution
- [ ] T130 [P] Add responsive layout for smaller screens
- [ ] T131 Run full test suite and verify 80% coverage
- [ ] T132 Performance optimization (lazy loading, memoization)
- [ ] T133 Create README with setup instructions

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ──────────────────────────────────┐
                                                  ▼
Phase 2 (Foundation) ─────────────────────────────┤
                                                  │
     ┌────────────────────────────────────────────┤
     │                                            │
     ▼                                            ▼
Phase 3-5        Phase 6-8        Phase 9-11    Phase 12-13    Phase 14-16
(Agent Mode)     (Editor Mode)    (Export)      (Domain Libs)  (Import)
     │                │               │              │              │
     └────────────────┴───────────────┴──────────────┴──────────────┘
                                      │
                                      ▼
                            Phase 17 (Polish)
```

### Parallel Execution Strategy

After Phase 2 (Foundation), these can run in parallel:
- **Team A**: Agent Mode (Phases 3-5)
- **Team B**: Editor Mode (Phases 6-8)
- **Team C**: Export Pipeline (Phases 9-11)
- **Team D**: Domain Libraries (Phases 12-13)
- **Team E**: Import External (Phases 14-16)

---

## Summary

| Phase | Feature | Tasks | Parallel Tasks |
|-------|---------|-------|----------------|
| 1 | Setup | 8 | 7 |
| 2 | Foundation | 14 | 10 |
| 3-5 | Agent Mode | 29 | 18 |
| 6-8 | Editor Mode | 22 | 9 |
| 9-11 | Export Pipeline | 20 | 12 |
| 12-13 | Domain Libraries | 16 | 13 |
| 14-16 | Import External | 14 | 7 |
| 17 | Polish | 10 | 8 |
| **Total** | | **133** | **84** |

### MVP Scope (Recommended)

Complete these phases for a working MVP:
1. Phase 1: Setup
2. Phase 2: Foundation
3. Phase 3: Agent Mode - Story 1 (Generate from Prompt)
4. Phase 6: Editor Mode - Story 1 (Object Manipulation)
5. Phase 9: Export Pipeline - Story 1 (PNG Export)

**MVP Task Count**: 49 tasks

This delivers: Prompt → Generate → Edit → Export PNG

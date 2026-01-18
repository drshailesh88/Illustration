# Feature Specification: Illustrator-like Library Integration

**Feature Branch**: `006-illustrator-integration`
**Created**: 2026-01-18
**Status**: Draft

## Overview

Transform Finnish into an Adobe Illustrator-like experience by integrating best-in-class open-source libraries for professional SVG editing, hand-drawn styles, advanced path manipulation, and comprehensive export capabilities.

## Library Integration Matrix (MIT/Apache 2.0 Licensed)

| Component | Library | Purpose | Priority |
|-----------|---------|---------|----------|
| Canvas Engine | Fabric.js 6.x | Core canvas (already installed) | P0 |
| Path/Bezier | Paper.js | Advanced path manipulation, pen tool | P1 |
| SVG Manipulation | SVG.js | SVG DOM manipulation | P1 |
| Hand-drawn Style | Rough.js | Sketchy hand-drawn effects | P2 |
| Freehand Drawing | perfect-freehand | Natural brush strokes | P2 |
| Image Filters | glfx.js | WebGL image effects | P2 |
| Color | Color.js | Color space manipulation | P1 |
| Export PNG | saveSvgAsPng | High-quality PNG export | P1 |
| Export PDF | jsPDF + svg2pdf | Vector PDF export | P1 |
| Icons | Tabler Icons | General UI icons | P1 |
| Medical Icons | Health Icons | Medical/healthcare symbols | P1 |
| Scientific | Bioicons | Scientific illustration symbols | P1 |

## User Scenarios & Testing

### User Story 1 - Professional Pen Tool (Priority: P1)

As an illustrator creating custom diagrams, I want to draw precise Bezier curves like in Illustrator so that I can create publication-quality custom shapes.

**Why this priority**: Pen tool is the signature feature of professional illustration software.

**Independent Test**: User draws a complex curve with multiple control points, adjusts handles, and exports clean SVG.

**Acceptance Scenarios**:

1. **Given** I select the pen tool, **When** I click on canvas, **Then** I create anchor points
2. **Given** I have anchor points, **When** I drag while clicking, **Then** I create smooth curves with control handles
3. **Given** I have a path, **When** I click on an existing point, **Then** I can edit its handles
4. **Given** I have a path, **When** I press Cmd/Ctrl and drag a handle, **Then** it moves independently (corner point)
5. **Given** I have an open path, **When** I click the first point, **Then** the path closes

---

### User Story 2 - Hand-drawn Style Effects (Priority: P2)

As an academic making informal diagrams, I want to apply hand-drawn/sketchy effects so that my diagrams look approachable in presentations.

**Why this priority**: Hand-drawn style is trending in academic presentations and distinguishes us from formal tools.

**Independent Test**: User selects a rectangle and applies "sketch" style, sees rough edges.

**Acceptance Scenarios**:

1. **Given** I have a shape selected, **When** I click "Apply Sketch Style", **Then** the shape gets rough, hand-drawn edges
2. **Given** I'm in sketch mode, **When** I draw a new shape, **Then** it's automatically hand-drawn style
3. **Given** I have a sketchy shape, **When** I toggle off sketch mode, **Then** it reverts to clean vectors

---

### User Story 3 - Natural Freehand Drawing (Priority: P2)

As a user annotating a diagram, I want to draw natural brush strokes so that my annotations look hand-written.

**Why this priority**: Freehand annotation is common in academic workflows (like grading or marking up figures).

**Independent Test**: User draws a freehand line, sees natural pressure variation even with mouse.

**Acceptance Scenarios**:

1. **Given** I select the brush tool, **When** I draw on canvas, **Then** I see smooth strokes with natural width variation
2. **Given** I'm drawing, **When** I vary my speed, **Then** the stroke thickness responds naturally
3. **Given** I have a tablet with pressure, **When** I draw, **Then** pressure affects stroke width

---

### User Story 4 - Advanced Color Management (Priority: P1)

As a user matching journal color requirements, I want professional color tools so that I can work in specific color spaces and generate accessible palettes.

**Why this priority**: Academic journals have specific color requirements; accessibility is mandatory.

**Independent Test**: User creates a color in LAB space, converts to CMYK for print.

**Acceptance Scenarios**:

1. **Given** I open the color picker, **When** I switch to LAB mode, **Then** I can input LAB values directly
2. **Given** I have a color, **When** I click "Generate Palette", **Then** I see complementary, triadic, analogous options
3. **Given** I select colors, **When** I check "Accessibility", **Then** I see WCAG contrast ratios

---

### User Story 5 - High-Quality Export (Priority: P1)

As a researcher submitting to journals, I want to export in multiple formats at publication quality so that my figures meet journal requirements.

**Why this priority**: Export quality directly impacts publication acceptance.

**Independent Test**: User exports to 300dpi PNG and vector PDF, both are crisp.

**Acceptance Scenarios**:

1. **Given** I have a diagram, **When** I export to PNG, **Then** I can specify DPI (72, 150, 300, 600)
2. **Given** I export to PNG at 300dpi, **When** I open the file, **Then** it's crisp with no artifacts
3. **Given** I export to PDF, **When** I open in Illustrator, **Then** all paths are editable vectors
4. **Given** I have text in my diagram, **When** I export to PDF, **Then** text is preserved as text (not outlines)

---

### User Story 6 - Integrated Icon Libraries (Priority: P1)

As an academic creating scientific diagrams, I want access to domain-specific icons so that I don't need to create common symbols from scratch.

**Why this priority**: Icons are essential for scientific illustration; integration saves significant time.

**Independent Test**: User searches for "heart", sees medical heart icon, drags to canvas.

**Acceptance Scenarios**:

1. **Given** I open the icon panel, **When** I search "dna", **Then** I see DNA icons from Bioicons
2. **Given** I see an icon, **When** I drag it to canvas, **Then** it's added as editable SVG
3. **Given** I have icon on canvas, **When** I ungroup it, **Then** I can edit individual paths
4. **Given** I search medical term, **When** results show, **Then** Health Icons appear first

---

### User Story 7 - WebGL Image Filters (Priority: P2)

As a user enhancing imported images, I want real-time image filters so that I can adjust brightness, contrast, and apply effects.

**Why this priority**: Image manipulation is important but not core to vector illustration.

**Independent Test**: User imports an image, applies blur effect, sees real-time preview.

**Acceptance Scenarios**:

1. **Given** I have an image selected, **When** I open filters panel, **Then** I see brightness, contrast, blur, etc.
2. **Given** I adjust a slider, **When** I move it, **Then** the preview updates in real-time
3. **Given** I apply filters, **When** I export, **Then** filters are baked into the output

---

## Requirements

### Functional Requirements

- **FR-001**: System MUST integrate Paper.js for advanced path/Bezier operations
- **FR-002**: System MUST provide pen tool with anchor points and bezier handles
- **FR-003**: System MUST integrate Rough.js for hand-drawn style effects
- **FR-004**: System MUST integrate perfect-freehand for natural brush strokes
- **FR-005**: System MUST integrate Color.js for advanced color manipulation
- **FR-006**: System MUST support multiple color spaces (RGB, HSL, LAB, CMYK)
- **FR-007**: System MUST integrate saveSvgAsPng for PNG export
- **FR-008**: System MUST support DPI settings (72, 150, 300, 600) for PNG export
- **FR-009**: System MUST integrate jsPDF + svg2pdf for PDF export
- **FR-010**: System MUST preserve text as text in PDF exports
- **FR-011**: System MUST integrate Tabler Icons library
- **FR-012**: System MUST integrate Health Icons library
- **FR-013**: System MUST integrate Bioicons library
- **FR-014**: System MUST provide unified icon search across all libraries
- **FR-015**: System SHOULD integrate glfx.js for WebGL image filters

### Non-Functional Requirements

- **NFR-001**: All integrated libraries MUST be MIT or Apache 2.0 licensed
- **NFR-002**: Canvas operations MUST maintain 60fps during editing
- **NFR-003**: Icon search MUST return results in under 200ms
- **NFR-004**: PNG export MUST complete in under 3 seconds for typical diagrams
- **NFR-005**: PDF export MUST produce files under 2MB for typical diagrams

## Technical Architecture

### Library Integration Strategy

```
src/
├── lib/
│   ├── paper/           # Paper.js integration
│   │   ├── PaperCanvas.ts
│   │   └── BezierTool.ts
│   ├── rough/           # Rough.js integration
│   │   └── SketchStyle.ts
│   ├── freehand/        # perfect-freehand integration
│   │   └── BrushTool.ts
│   ├── color/           # Color.js integration
│   │   └── ColorManager.ts
│   ├── export/          # Export pipeline
│   │   ├── PngExporter.ts
│   │   └── PdfExporter.ts
│   └── icons/           # Icon library integration
│       ├── IconRegistry.ts
│       ├── tablerIcons.ts
│       ├── healthIcons.ts
│       └── bioicons.ts
```

### Fabric.js + Paper.js Integration

Paper.js will run in parallel for advanced path operations:
1. User draws with Paper.js pen tool
2. Path is converted to SVG
3. SVG is imported into Fabric.js canvas
4. Fabric.js handles manipulation, Paper.js handles precision path editing

## Success Criteria

- **SC-001**: Pen tool produces curves indistinguishable from Illustrator
- **SC-002**: Export quality meets Nature/Science journal requirements
- **SC-003**: Icon search returns relevant results for 90%+ medical/scientific queries
- **SC-004**: Hand-drawn mode produces consistently appealing sketchy effects
- **SC-005**: Users familiar with Illustrator can use tool without training

## Dependencies

- Fabric.js 6.x (already installed)
- Paper.js ^0.12
- Rough.js ^4.6
- perfect-freehand ^1.2
- Color.js ^0.4
- save-svg-as-png ^1.4
- jspdf ^2.5
- svg2pdf.js ^2.2
- @tabler/icons ^3.x
- healthicons (npm or direct SVG)
- bioicons (npm or direct SVG)

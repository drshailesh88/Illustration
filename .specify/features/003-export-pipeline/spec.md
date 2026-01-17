# Feature Specification: Export Pipeline

**Feature Branch**: `003-export-pipeline`
**Created**: 2026-01-17
**Status**: Draft

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Export to PNG (Priority: P1)

As a researcher submitting to a journal, I want to export my diagram as a 300 DPI PNG so that it meets publication quality requirements.

**Why this priority**: PNG is the most common format requested by journals.

**Independent Test**: User clicks Export > PNG > 300 DPI, receives a PNG file that is exactly 300 DPI when inspected.

**Acceptance Scenarios**:

1. **Given** a diagram is ready, **When** I click "Export" and select "PNG", **Then** I see DPI options (72, 150, 300, 600)
2. **Given** I select 300 DPI, **When** export completes, **Then** the downloaded PNG has 300 DPI metadata
3. **Given** my diagram is 1000x800 pixels at 72 DPI, **When** I export at 300 DPI, **Then** the PNG is approximately 4167x3333 pixels
4. **Given** I export a PNG, **When** I open it in Photoshop, **Then** it shows "300 pixels/inch" resolution

---

### User Story 2 - Export to SVG (Priority: P1)

As a researcher who wants scalable graphics, I want to export my diagram as SVG so that it remains crisp at any size.

**Why this priority**: SVG is essential for vector quality and further editing.

**Independent Test**: User exports SVG, opens in Illustrator, and can select/edit individual elements.

**Acceptance Scenarios**:

1. **Given** a diagram is ready, **When** I click "Export" and select "SVG", **Then** an SVG file downloads
2. **Given** I export SVG, **When** I open in a vector editor, **Then** all elements are editable (not rasterized)
3. **Given** my diagram has text, **When** I export SVG, **Then** text remains as text (not paths), OR option to outline fonts
4. **Given** I export SVG, **When** I view file size, **Then** it is optimized (no unnecessary metadata)

---

### User Story 3 - Export to PDF (Priority: P1)

As a researcher preparing camera-ready figures, I want to export to PDF so that I can embed the figure in my LaTeX document.

**Why this priority**: PDF is standard for academic publications and LaTeX workflows.

**Independent Test**: User exports PDF, includes it in LaTeX with \includegraphics, compiles successfully.

**Acceptance Scenarios**:

1. **Given** a diagram is ready, **When** I click "Export" and select "PDF", **Then** a PDF file downloads
2. **Given** I export PDF, **When** I include in LaTeX, **Then** it compiles without errors
3. **Given** my diagram has specific dimensions, **When** I export PDF, **Then** the PDF page size matches diagram bounds
4. **Given** I export PDF, **When** I zoom in 400% in PDF reader, **Then** lines remain crisp (vector quality)

---

### User Story 4 - Export to LaTeX/TikZ (Priority: P2)

As an academic using LaTeX, I want to export my diagram as TikZ code so that I can include it directly in my .tex file and maintain consistent styling.

**Why this priority**: Advanced feature for LaTeX power users; most can use PDF/SVG.

**Independent Test**: User exports TikZ code, pastes into LaTeX document, compiles to identical diagram.

**Acceptance Scenarios**:

1. **Given** a simple flowchart, **When** I click "Export" and select "LaTeX/TikZ", **Then** I receive .tex code
2. **Given** I paste TikZ code into my LaTeX document, **When** I compile, **Then** the diagram renders matching the editor
3. **Given** my diagram uses colors, **When** I export TikZ, **Then** colors are defined as LaTeX color commands

---

### User Story 5 - Copy to Clipboard (Priority: P2)

As a user creating a presentation, I want to copy my diagram to clipboard so that I can paste directly into PowerPoint or Google Slides.

**Why this priority**: Convenient for quick sharing, but users can use file export as alternative.

**Independent Test**: User clicks Copy, pastes into Google Slides, diagram appears correctly.

**Acceptance Scenarios**:

1. **Given** a diagram is ready, **When** I click "Copy to Clipboard", **Then** the diagram is copied as PNG
2. **Given** I copied to clipboard, **When** I paste in PowerPoint, **Then** the diagram appears at correct size
3. **Given** I want high quality, **When** I choose "Copy as SVG", **Then** applications that support SVG paste receive vector

---

### Edge Cases

- What happens when diagram is very large and export takes time? → Show progress indicator
- What happens when browser blocks download? → Show manual save instructions
- What happens when TikZ export fails for complex shapes? → Fall back to embedded image with warning
- What happens when user exports empty canvas? → Show warning "Nothing to export"

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST export PNG at selectable DPI (72, 150, 300, 600)
- **FR-002**: System MUST export SVG with optimized output (SVGO or equivalent)
- **FR-003**: System MUST export PDF with correct page bounds
- **FR-004**: System MUST export LaTeX/TikZ code for basic shapes and flowcharts
- **FR-005**: System MUST support copy-to-clipboard as PNG
- **FR-006**: System MUST show export progress for large diagrams
- **FR-007**: System MUST include diagram title in filename suggestion
- **FR-008**: System MUST preserve transparency in PNG when background is transparent

### Key Entities

- **ExportJob**: A request to export with format, options, and status
- **ExportOptions**: DPI, format, background transparency, font embedding

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: PNG export at 300 DPI completes in under 3 seconds for typical diagrams
- **SC-002**: Exported PNG files have correct DPI metadata verifiable in image editors
- **SC-003**: SVG files are 30% smaller than unoptimized baseline (SVGO metrics)
- **SC-004**: PDF files are accepted by arXiv submission system without modification
- **SC-005**: TikZ export produces compilable code for 80% of diagram types

# Feature Specification: Import External Content

**Feature Branch**: `005-import-external`
**Created**: 2026-01-17
**Status**: Draft

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Import SVG File (Priority: P1)

As a user who received an AI-generated infographic from Gemini/NotebookLM, I want to import it into FINNISH so that I can edit individual elements.

**Why this priority**: This is the "tweakability" killer feature - letting users edit content from other tools.

**Independent Test**: User drags SVG from Gemini into FINNISH, can select and move individual shapes.

**Acceptance Scenarios**:

1. **Given** I have an SVG file, **When** I drag it onto the canvas, **Then** the SVG loads as editable objects
2. **Given** an SVG is imported, **When** I click on a shape, **Then** I can select and move it independently
3. **Given** an SVG has grouped elements, **When** I import it, **Then** groups are preserved and I can ungroup them
4. **Given** an SVG has text, **When** I import it, **Then** text is editable (not converted to paths)

---

### User Story 2 - Import PNG/JPEG for Tracing (Priority: P2)

As a user who only has a raster image of a diagram, I want to import it as a background so that I can trace over it or use it as reference.

**Why this priority**: Useful for recreating diagrams from papers, but not core workflow.

**Independent Test**: User imports PNG, it appears on canvas, user can draw shapes over it.

**Acceptance Scenarios**:

1. **Given** I have a PNG file, **When** I drag it onto canvas, **Then** it appears as an image object
2. **Given** an image is imported, **When** I select it, **Then** I can resize and position it
3. **Given** an image is on canvas, **When** I draw shapes over it, **Then** shapes appear above the image
4. **Given** I want to trace, **When** I reduce image opacity, **Then** I can see my drawings clearly while tracing

---

### User Story 3 - Import from Clipboard (Priority: P1)

As a user who copied an image or SVG, I want to paste it into FINNISH so that I can quickly bring in content from other apps.

**Why this priority**: Copy-paste is the most intuitive import method.

**Independent Test**: User copies SVG code from Mermaid Live Editor, pastes in FINNISH, diagram appears.

**Acceptance Scenarios**:

1. **Given** I copied an image, **When** I press Ctrl+V in FINNISH, **Then** the image is pasted onto canvas
2. **Given** I copied SVG code, **When** I paste, **Then** the SVG is parsed and added as editable objects
3. **Given** I copied HTML containing SVG, **When** I paste, **Then** the SVG is extracted and added

---

### User Story 4 - Remove Watermarks (Priority: P2)

As a user who imported an infographic with a watermark, I want to remove or cover the watermark so that I can use the diagram in my publication.

**Why this priority**: Common need, but ethically sensitive - should respect licensing.

**Independent Test**: User selects watermark text, deletes it from imported SVG.

**Acceptance Scenarios**:

1. **Given** an imported SVG has a text watermark, **When** I select the text, **Then** I can delete it
2. **Given** an imported image has a watermark, **When** I select the image, **Then** I see "Crop" option to remove watermarked area
3. **Given** I want to cover a watermark, **When** I draw a shape over it, **Then** the shape covers the watermark

**Note**: System should display reminder about respecting original content licensing.

---

### User Story 5 - Open Recent Files (Priority: P3)

As a returning user, I want to see files I recently worked on so that I can quickly continue my work.

**Why this priority**: Convenience feature, not core functionality.

**Independent Test**: User opens FINNISH, sees "Recent" section with last 5 files.

**Acceptance Scenarios**:

1. **Given** I worked on files before, **When** I open FINNISH, **Then** I see "Recent" in the start screen
2. **Given** recent files are shown, **When** I click one, **Then** it opens in Editor Mode
3. **Given** I want to clear history, **When** I click "Clear Recent", **Then** the list is emptied

---

### Edge Cases

- What happens when imported SVG uses fonts not available locally? → Substitute with similar fonts, show warning
- What happens when SVG is malformed? → Show error with details, offer to import as image
- What happens when pasted content is neither image nor SVG? → Show "Unsupported format" message
- What happens when imported file is very large (>10MB)? → Warn user, offer to optimize

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST support drag-and-drop import of SVG files
- **FR-002**: System MUST support drag-and-drop import of PNG/JPEG files
- **FR-003**: System MUST support paste from clipboard (Ctrl+V)
- **FR-004**: System MUST parse imported SVG into editable objects
- **FR-005**: System MUST preserve SVG groups as groups in editor
- **FR-006**: System MUST preserve editable text when possible
- **FR-007**: System MUST handle malformed SVG gracefully with error message
- **FR-008**: System MUST support opening files via file picker dialog
- **FR-009**: System MUST maintain recent files list (last 10)

### Key Entities

- **ImportedFile**: A file brought into the system with source type and parsed content
- **ImportResult**: Success/failure status with any warnings (missing fonts, etc.)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: SVG files from Gemini/NotebookLM import successfully 95% of the time
- **SC-002**: Imported SVG elements are individually selectable in 90% of cases
- **SC-003**: Import completes in under 2 seconds for files up to 5MB
- **SC-004**: Paste from clipboard works for 95% of common sources (browsers, design tools)
- **SC-005**: Users can remove text watermarks from imported SVGs in under 10 seconds

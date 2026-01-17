# Feature Specification: Editor Mode (Manual Diagram Editing)

**Feature Branch**: `002-editor-mode`
**Created**: 2026-01-17
**Status**: Draft

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Select and Move Objects (Priority: P1)

As an academic who received an AI-generated diagram, I want to select and move individual elements so that I can fine-tune positioning for my publication.

**Why this priority**: This is the core "tweakable" requirement - without it, AI-generated diagrams are unusable for precise publications.

**Independent Test**: User clicks on a box in a generated flowchart, drags it 50 pixels right, and sees it move smoothly.

**Acceptance Scenarios**:

1. **Given** a diagram is loaded in Editor Mode, **When** I click on an object, **Then** it shows selection handles (corners and edges)
2. **Given** an object is selected, **When** I drag it, **Then** it moves smoothly following my cursor
3. **Given** an object is selected, **When** I drag a corner handle, **Then** it resizes proportionally
4. **Given** an object is selected, **When** I drag the rotation handle, **Then** it rotates around its center
5. **Given** I hold Shift while dragging, **When** I move an object, **Then** it snaps to horizontal/vertical alignment

---

### User Story 2 - Edit Text Content (Priority: P1)

As a user, I want to edit text labels directly on the canvas so that I can correct typos or update numbers without regenerating.

**Why this priority**: Text editing is essential - most tweaks are label changes.

**Independent Test**: User double-clicks a text label, types new text, and sees it update in place.

**Acceptance Scenarios**:

1. **Given** I double-click on a text element, **When** the text becomes editable, **Then** I can type new content
2. **Given** I'm editing text, **When** I click outside, **Then** the edit is saved and text exits edit mode
3. **Given** I'm editing text, **When** I press Escape, **Then** the edit is cancelled and original text is restored

---

### User Story 3 - Change Colors and Styles (Priority: P1)

As a user preparing figures for a journal, I want to change colors and stroke styles so that my diagrams match journal requirements or my paper's color scheme.

**Why this priority**: Journals often have specific color requirements; accessibility also requires color changes.

**Independent Test**: User selects a box, opens color picker, changes fill to blue, and sees immediate update.

**Acceptance Scenarios**:

1. **Given** an object is selected, **When** I change the fill color in properties panel, **Then** the object updates immediately
2. **Given** an object is selected, **When** I change stroke width to 3px, **Then** the border thickens immediately
3. **Given** I select multiple objects, **When** I change fill color, **Then** all selected objects update together
4. **Given** I'm choosing colors, **When** I view the color picker, **Then** I see WCAG AA compliant suggested pairs

---

### User Story 4 - Manage Layers (Priority: P2)

As a user with a complex diagram, I want to reorder, hide, and lock layers so that I can work on specific parts without accidentally modifying others.

**Why this priority**: Important for complex diagrams, but not needed for simple edits.

**Independent Test**: User drags a layer above another in the layers panel and sees the canvas update.

**Acceptance Scenarios**:

1. **Given** the layers panel is visible, **When** I view it, **Then** I see all objects listed with thumbnails
2. **Given** a layer exists, **When** I click the eye icon, **Then** that layer becomes hidden on canvas
3. **Given** a layer exists, **When** I click the lock icon, **Then** that layer cannot be selected or modified
4. **Given** two layers exist, **When** I drag one above the other, **Then** the canvas z-order updates

---

### User Story 5 - Undo and Redo Actions (Priority: P1)

As a user making edits, I want to undo mistakes instantly so that I can experiment without fear.

**Why this priority**: Essential for any editor - users expect Ctrl+Z to work.

**Independent Test**: User moves an object, presses Ctrl+Z, object returns to original position.

**Acceptance Scenarios**:

1. **Given** I made an edit, **When** I press Ctrl+Z, **Then** the edit is undone
2. **Given** I undid an edit, **When** I press Ctrl+Shift+Z, **Then** the edit is redone
3. **Given** I made 50 edits, **When** I press Ctrl+Z 50 times, **Then** all edits are undone in reverse order
4. **Given** I made an edit after undoing, **When** I check redo, **Then** the previously undone actions are no longer available

---

### User Story 6 - Add Annotations (Priority: P2)

As a researcher, I want to add arrows, callouts, and brackets to annotate specific parts of my diagram for clarity.

**Why this priority**: Common need for figure annotations in papers, but users can use basic shapes as workaround.

**Independent Test**: User selects arrow tool, draws arrow pointing to a specific area.

**Acceptance Scenarios**:

1. **Given** I select the arrow tool, **When** I click and drag on canvas, **Then** an arrow is created following my drag
2. **Given** I select the text tool, **When** I click on canvas, **Then** a text box appears for me to type
3. **Given** I select the callout tool, **When** I click on canvas, **Then** a callout shape with text area is created

---

### Edge Cases

- What happens when canvas is zoomed out and user tries to select small objects? → Provide zoom-to-fit and zoom-to-selection
- What happens when objects overlap and user wants to select the one behind? → Support Tab to cycle through overlapping selections
- What happens when user tries to edit a locked layer? → Show visual feedback and tooltip explaining layer is locked
- What happens when undo history is full (50 states)? → Oldest states are silently discarded

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow selection of individual objects via click
- **FR-002**: System MUST allow multi-selection via Shift+click or marquee selection
- **FR-003**: System MUST allow moving objects via drag
- **FR-004**: System MUST allow resizing objects via corner/edge handles
- **FR-005**: System MUST allow rotation via rotation handle
- **FR-006**: System MUST allow double-click to edit text in place
- **FR-007**: System MUST provide properties panel showing selected object's attributes
- **FR-008**: System MUST allow changing fill color, stroke color, stroke width, opacity
- **FR-009**: System MUST provide layers panel showing all objects
- **FR-010**: System MUST allow reordering layers via drag-and-drop
- **FR-011**: System MUST allow hiding layers (visibility toggle)
- **FR-012**: System MUST allow locking layers (prevent modification)
- **FR-013**: System MUST support undo with minimum 50 history states
- **FR-014**: System MUST support redo
- **FR-015**: System MUST provide zoom and pan controls
- **FR-016**: System MUST provide drawing tools: rectangle, ellipse, line, arrow, text
- **FR-017**: System MUST support keyboard shortcuts (Ctrl+Z, Ctrl+C, Ctrl+V, Delete, etc.)

### Key Entities

- **Canvas**: The main editing surface containing all objects
- **Object**: Any element on canvas (shape, text, image, group)
- **Selection**: Currently selected object(s) with active handles
- **Layer**: An object's representation in the layers panel with visibility/lock state
- **HistoryState**: A snapshot of canvas state for undo/redo

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can complete basic edit (move + color change) in under 30 seconds
- **SC-002**: Editor maintains 60fps during drag operations
- **SC-003**: Undo responds in under 100ms
- **SC-004**: Users familiar with Illustrator/Figma can use editor without tutorial (intuitive UI)
- **SC-005**: 95% of edit operations can be completed with mouse alone (no keyboard required)

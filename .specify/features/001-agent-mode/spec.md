# Feature Specification: Agent Mode (AI Diagram Generation)

**Feature Branch**: `001-agent-mode`
**Created**: 2026-01-17
**Status**: Draft

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Generate Diagram from Prompt (Priority: P1)

As an academic researcher, I want to describe a diagram in plain English and receive a publication-ready SVG so that I can quickly create figures for my paper without learning complex software.

**Why this priority**: This is the core value proposition - AI-first generation. Without this, FINNISH is just another editor.

**Independent Test**: User types "Create a CONSORT flow diagram showing 500 enrolled, 250 per arm, 10% dropout" and receives a valid SVG within 5 seconds.

**Acceptance Scenarios**:

1. **Given** the Agent Mode page is open, **When** I type "Create a flowchart showing patient enrollment" and press Enter, **Then** I see a generated flowchart SVG preview within 5 seconds
2. **Given** a diagram has been generated, **When** I click "Regenerate", **Then** a new variation is created while preserving my intent
3. **Given** a diagram has been generated, **When** I click "Send to Editor", **Then** the SVG is loaded into Editor Mode for manual tweaking

---

### User Story 2 - Refine with Follow-up Prompts (Priority: P1)

As a user, I want to refine my generated diagram through conversational follow-ups so that I can iteratively improve without starting over.

**Why this priority**: Essential for the AI-first experience - users expect ChatGPT-like refinement.

**Independent Test**: After generating a diagram, user says "make the boxes blue and add a legend" and the diagram updates accordingly.

**Acceptance Scenarios**:

1. **Given** a diagram was just generated, **When** I type "change the title to 'Study Flow'" **Then** the diagram updates with the new title
2. **Given** a diagram exists, **When** I type "add a box showing 'Lost to follow-up: 25'" **Then** a new element appears in the diagram
3. **Given** multiple refinements made, **When** I scroll up in chat history, **Then** I can see all previous versions and prompts

---

### User Story 3 - Use Template Suggestions (Priority: P2)

As a new user, I want to see suggested diagram templates for my field so that I know what's possible and can start quickly.

**Why this priority**: Improves discoverability and reduces blank-page anxiety, but not core functionality.

**Independent Test**: User selects "Medicine" domain and sees CONSORT, PRISMA, Forest Plot templates.

**Acceptance Scenarios**:

1. **Given** I'm on Agent Mode, **When** I click "Templates", **Then** I see categorized templates by scientific domain
2. **Given** templates are shown, **When** I click "CONSORT Flow Diagram", **Then** a template prompt is inserted with placeholders I can fill
3. **Given** I selected a template, **When** I modify the placeholders and submit, **Then** a customized diagram is generated

---

### User Story 4 - View Generation History (Priority: P3)

As a returning user, I want to see my previous diagram generations so that I can continue work from a previous session.

**Why this priority**: Nice to have for productivity, but users can regenerate if needed.

**Independent Test**: User returns next day and sees list of previously generated diagrams.

**Acceptance Scenarios**:

1. **Given** I generated diagrams yesterday, **When** I open Agent Mode today, **Then** I see a "Recent" section with my previous work
2. **Given** history is displayed, **When** I click a previous diagram, **Then** the conversation is restored and I can continue refining

---

### Edge Cases

- What happens when the AI cannot understand the prompt? → Show helpful error with suggestions
- What happens when generation takes longer than 30 seconds? → Show progress indicator and allow cancellation
- What happens when the user's prompt requests something unethical? → Decline gracefully with explanation
- What happens with network failure mid-generation? → Allow retry, preserve prompt

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST accept natural language prompts for diagram generation
- **FR-002**: System MUST generate SVG output viewable in the preview pane
- **FR-003**: System MUST complete simple diagram generation within 5 seconds
- **FR-004**: System MUST maintain conversation context for follow-up refinements
- **FR-005**: System MUST provide "Send to Editor" action for generated diagrams
- **FR-006**: System MUST provide "Download" action (PNG, SVG options)
- **FR-007**: System MUST provide "Regenerate" action for new variations
- **FR-008**: System MUST display template suggestions organized by scientific domain
- **FR-009**: System MUST persist generation history locally

### Key Entities

- **Conversation**: A session containing user prompts and AI responses with diagram outputs
- **DiagramGeneration**: A single generated diagram with metadata (prompt, timestamp, SVG content, rendering backend used)
- **Template**: A pre-defined prompt structure with placeholders for common diagram types

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 90% of users can generate their first diagram within 2 minutes of opening Agent Mode
- **SC-002**: Simple diagrams (flowcharts, basic charts) generate in under 5 seconds
- **SC-003**: Complex diagrams (CONSORT, pathways) generate in under 15 seconds
- **SC-004**: 80% of generated diagrams require fewer than 3 refinement prompts to reach user satisfaction
- **SC-005**: Template usage reduces time-to-first-diagram by 50% compared to freeform prompts

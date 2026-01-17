# Feature Specification: Domain-Specific Libraries

**Feature Branch**: `004-domain-libraries`
**Created**: 2026-01-17
**Status**: Draft

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse Scientific Icons (Priority: P1)

As a biology researcher, I want to browse biology-specific icons so that I can add professional scientific symbols to my diagrams.

**Why this priority**: Icon libraries are core differentiator vs generic tools - this is what makes FINNISH a "BioRender killer".

**Independent Test**: User opens icon picker, selects "Biology" category, sees DNA helix icon, drags to canvas.

**Acceptance Scenarios**:

1. **Given** I'm in Editor Mode, **When** I click "Icons" in toolbar, **Then** an icon picker panel opens
2. **Given** icon picker is open, **When** I click "Biology" tab, **Then** I see biology icons (DNA, cells, organisms, etc.)
3. **Given** I see an icon I want, **When** I click it, **Then** it's added to my canvas at center
4. **Given** I see an icon, **When** I drag it to canvas, **Then** it's placed where I drop it
5. **Given** I added a scientific icon, **When** I select it, **Then** I can resize/recolor like any other object

---

### User Story 2 - Search Icons (Priority: P1)

As a user who knows what I need, I want to search for icons by name so that I can find them quickly without browsing categories.

**Why this priority**: Search is faster than browsing for experienced users.

**Independent Test**: User types "mitochondria" in search, sees mitochondria icon in results.

**Acceptance Scenarios**:

1. **Given** icon picker is open, **When** I type "heart" in search, **Then** I see heart-related icons from all domains
2. **Given** I search "SGLT2", **When** results appear, **Then** relevant pharmaceutical/mechanism icons are shown
3. **Given** no results match my search, **When** I see empty results, **Then** I see "No icons found. Try different keywords."

---

### User Story 3 - Use Diagram Templates (Priority: P1)

As a medical researcher, I want to use a CONSORT flow diagram template so that I can create a standards-compliant figure quickly.

**Why this priority**: Templates for standard diagram types (CONSORT, PRISMA, etc.) are major time-savers.

**Independent Test**: User selects CONSORT template, fills in numbers, gets a valid CONSORT diagram.

**Acceptance Scenarios**:

1. **Given** I'm in Agent Mode, **When** I click "Templates", **Then** I see templates organized by domain
2. **Given** I select "Medicine" domain, **When** I view templates, **Then** I see CONSORT, PRISMA, Forest Plot, Kaplan-Meier, etc.
3. **Given** I select CONSORT template, **When** it loads, **Then** I see a form with fields: Enrollment N, Randomized N, etc.
4. **Given** I fill template fields, **When** I click "Generate", **Then** a properly formatted CONSORT diagram is created

---

### User Story 4 - Switch Scientific Domains (Priority: P2)

As a multidisciplinary researcher, I want to access icons and templates from different domains so that I can create diagrams spanning multiple fields.

**Why this priority**: Flexibility for cross-domain work, but most users work in one field.

**Independent Test**: User adds a chemistry molecule AND a biology cell to the same diagram.

**Acceptance Scenarios**:

1. **Given** I'm viewing Biology icons, **When** I click "Chemistry" tab, **Then** I see chemistry icons (molecules, lab equipment)
2. **Given** I added a biology icon, **When** I add a chemistry icon, **Then** both coexist on my canvas
3. **Given** I'm in any domain, **When** I click "All", **Then** I see icons from all domains together

---

### User Story 5 - Save Custom Templates (Priority: P3)

As a frequent user, I want to save my own diagram as a template so that I can reuse my layout for similar figures.

**Why this priority**: Nice to have for power users, but not essential for core experience.

**Independent Test**: User saves current diagram as template, later starts new diagram from that template.

**Acceptance Scenarios**:

1. **Given** I have a diagram I want to reuse, **When** I click "Save as Template", **Then** I'm prompted for a name
2. **Given** I saved a template, **When** I view templates, **Then** I see my saved template under "My Templates"
3. **Given** I select my saved template, **When** it loads, **Then** my previous layout appears ready for new data

---

### Edge Cases

- What happens when icon library is still loading? → Show loading state, allow canvas use
- What happens when user requests domain with no icons yet? → Show "Coming soon" with request form
- What happens when icon colors clash with user's chosen palette? → Icons inherit current fill color by default

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide icon library with minimum 100 icons per major domain
- **FR-002**: System MUST include domains: Medicine, Biology, Chemistry, Physics, Engineering, Mathematics, Computer Science, General
- **FR-003**: System MUST support icon search across all domains
- **FR-004**: System MUST allow icons to be added via click or drag-and-drop
- **FR-005**: System MUST allow icons to be recolored after placement
- **FR-006**: System MUST provide standard diagram templates (CONSORT, PRISMA, Forest Plot, etc.)
- **FR-007**: System MUST allow users to save custom templates
- **FR-008**: System MUST organize templates by scientific domain

### Key Entities

- **Icon**: An SVG symbol with name, category, tags, and metadata
- **IconCategory**: A domain grouping (Biology, Chemistry, etc.)
- **Template**: A pre-built diagram structure with placeholder fields
- **CustomTemplate**: A user-saved template

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can find a relevant icon in under 15 seconds via search
- **SC-002**: Icon library includes 2,000+ scientific icons at launch
- **SC-003**: Each major domain has at least 10 standard templates
- **SC-004**: Icons load and display within 200ms of selection
- **SC-005**: 90% of users in medical/biology fields find CONSORT/PRISMA templates within 30 seconds

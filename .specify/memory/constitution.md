<!--
Sync Impact Report:
- Version change: 0.0.0 → 1.0.0
- Initial constitution for FINNISH project
- Added 7 core principles
- Templates updated: pending first spec creation
-->

# FINNISH Constitution

> "Finish your diagrams. Finish the competition."

## Mission Statement

FINNISH is an AI-powered illustration and diagram editor designed to replace Adobe Illustrator, BioRender, and Napkin.AI for academics and scientists. It enables users to generate publication-quality diagrams through natural language prompts, then refine them through an intuitive editor interface.

## Core Principles

### I. AI-First Generation

Every diagram starts with a prompt, not a blank canvas. Users describe what they need in natural language, and the system generates a complete first draft using the most appropriate rendering engine (Mermaid, Plotly, drawsvg, Manim, LaTeX/TikZ, or AI image generation).

**Non-negotiable rules:**
- MUST support natural language input for all diagram types
- MUST intelligently route requests to the optimal generation backend
- MUST provide immediate visual feedback within 5 seconds for simple diagrams
- MUST allow regeneration with modified prompts

### II. Publication-Ready Output

All output MUST meet international journal publication standards without additional processing.

**Non-negotiable rules:**
- MUST support 300 DPI minimum for raster exports
- MUST produce WCAG AA compliant color combinations
- MUST use Nature/Science journal-compliant typography defaults
- MUST export to PNG, SVG, PDF, and LaTeX/TikZ formats
- MUST preserve vector quality in all scalable formats

### III. Domain-Specific Templates

The system MUST provide specialized templates and icon libraries for ALL scientific disciplines, not just cardiology.

**Non-negotiable rules:**
- MUST include templates for: Medicine, Biology, Chemistry, Physics, Engineering, Mathematics, Computer Science, Earth Sciences, and General Science
- MUST provide domain-specific diagram types (CONSORT, PRISMA, pathway diagrams, circuit diagrams, molecular structures, etc.)
- MUST include curated icon libraries per domain (minimum 100 icons per major domain)
- MUST allow users to save custom templates

### IV. Tweakable by Design

AI generates the first draft; humans refine it. The editor MUST provide full manual control over every generated element.

**Non-negotiable rules:**
- MUST allow selection, movement, resizing, and rotation of any object
- MUST support grouping and ungrouping of elements
- MUST provide layer management (reorder, visibility, lock)
- MUST support undo/redo with minimum 50 history states
- MUST allow import of external SVG/PNG for editing (including infographics from other tools)

### V. Test-Driven Development (NON-NEGOTIABLE)

All features MUST be developed using TDD methodology with comprehensive test coverage.

**Non-negotiable rules:**
- Tests MUST be written before implementation code
- Red-Green-Refactor cycle MUST be strictly followed
- Minimum 80% code coverage required for all modules
- Integration tests MUST cover all user scenarios in specifications
- RALF loop (max 20 iterations) MUST be applied for any failing feature

### VI. Spec-Driven Development

All features MUST follow the spec-kit methodology: Constitution → Specification → Plan → Tasks → Implementation.

**Non-negotiable rules:**
- NO feature implementation without a written specification
- Specifications MUST focus on user scenarios, not technical details
- Plans MUST be reviewed before task generation
- Tasks MUST be atomic and independently testable

### VII. Open and Self-Hostable

FINNISH MUST remain open source and self-hostable, with no vendor lock-in.

**Non-negotiable rules:**
- MUST use MIT/Apache 2.0/BSD licensed dependencies only
- MUST NOT require proprietary services for core functionality
- MUST be deployable on user's own infrastructure
- MUST NOT include usage tracking without explicit opt-in

## Technology Constraints

### Approved Libraries (MIT/Apache 2.0/BSD)
- **Editor Core**: Fabric.js (MIT)
- **Diagrams**: Mermaid.js (MIT), D2, PlantUML
- **Charts**: Plotly.js (MIT), Apache ECharts (Apache 2.0), AntV G2 (MIT)
- **Math**: KaTeX (MIT), MathJax (Apache 2.0)
- **Icons**: Bioicons (CC0), Health Icons (CC0), Lucide (MIT)
- **Molecules**: Mol* (Apache 2.0), RDKit (BSD)
- **Animation**: Manim (MIT)

### Prohibited
- GPL-only dependencies without MIT alternatives
- Proprietary libraries with usage restrictions
- Dependencies with "Made with X" watermark requirements

## Quality Gates

### Before Merge
- [ ] All tests pass (unit + integration)
- [ ] Code coverage >= 80%
- [ ] No TypeScript strict mode errors
- [ ] Specification compliance verified
- [ ] Manual QA on affected user scenarios

### Before Release
- [ ] All P1 user scenarios working
- [ ] Performance benchmarks met (5s generation, 60fps editor)
- [ ] Export quality verified (300 DPI, vector integrity)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)

## Governance

This constitution supersedes all other practices and guidelines. Any deviation requires:

1. Written justification with impact analysis
2. Amendment proposal reviewed by project lead
3. Version increment following semantic versioning:
   - MAJOR: Principle removal or fundamental redefinition
   - MINOR: New principle or significant expansion
   - PATCH: Clarification or wording improvement

All code reviews MUST verify compliance with these principles. Complexity MUST be justified against the Simplicity principle.

**Version**: 1.0.0 | **Ratified**: 2026-01-17 | **Last Amended**: 2026-01-17

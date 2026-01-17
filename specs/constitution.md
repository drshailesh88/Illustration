# FINNISH Project Constitution

## Project Name
**FINNISH** - Free Illustration for Natural, Novel, Intelligent Scientific Hierarchies

## Mission Statement
> "Kill Adobe Illustrator, BioRender, and Napkin.AI for academics"

We are building an AI-powered, open-source illustration tool specifically designed for academic and scientific publication workflows. Our goal is to democratize professional-quality scientific illustration by making it accessible, intelligent, and publication-ready.

---

## Core Principles

### 1. AI-First
- Natural language commands drive illustration creation
- Agent mode interprets intent and generates appropriate visuals
- Continuous learning from user corrections and preferences
- Smart suggestions based on scientific domain context

### 2. Publication-Ready
- Export to LaTeX/TikZ for seamless journal integration
- Vector-first approach ensuring infinite scalability
- Compliant with major journal formatting requirements
- High-DPI raster export when needed (300+ DPI)

### 3. Domain-Specific
- Pre-built libraries for biology, chemistry, physics, medicine
- Scientific symbol palettes and notation support
- Field-specific templates (flowcharts, pathways, anatomical diagrams)
- Integration with academic standards (SI units, chemical notation)

### 4. Tweakable
- Every AI-generated element is fully editable
- Fine-grained control over positioning, styling, and layering
- Non-destructive editing with full history
- Export intermediate formats for external tool compatibility

### 5. Open
- Open-source core under permissive license
- Community-contributed template libraries
- Extensible plugin architecture
- Transparent AI decision-making

---

## Quality Standards

### TypeScript Strict Mode
- All code written in TypeScript with strict mode enabled
- No `any` types without explicit justification
- Comprehensive type definitions for all public APIs
- Runtime validation at system boundaries

### 80% Test Coverage Minimum
- Unit tests for all utility functions and services
- Integration tests for editor operations
- E2E tests for critical user workflows
- Visual regression tests for rendering consistency

### Spec-First Development
- Every feature begins with a specification document
- Specs reviewed before implementation begins
- Implementation must satisfy all spec requirements
- Specs updated when requirements evolve

### RALF Loop (Research, Articulate, Loop, Finalize)
1. **Research**: Investigate problem space and existing solutions
2. **Articulate**: Write clear specification with acceptance criteria
3. **Loop**: Iterate on implementation with continuous feedback
4. **Finalize**: Complete documentation and ensure test coverage

---

## Target Users

### Primary: Academics
- Graduate students writing theses and dissertations
- Researchers preparing journal submissions
- Faculty creating lecture materials
- Lab groups documenting experimental setups

### Secondary: Medical Professionals
- Clinicians creating patient education materials
- Medical illustrators seeking faster workflows
- Healthcare educators developing training content
- Research hospitals documenting procedures

### Tertiary: Students
- Undergraduate students in STEM fields
- Students learning scientific communication
- Teaching assistants creating course materials
- Science communicators and journalists

---

## Technical Stack

- **Frontend**: React + TypeScript + Vite
- **Canvas**: Fabric.js for vector editing
- **Rendering**: SVG-native with canvas fallback
- **AI Integration**: LLM-powered agent system
- **Export**: Native LaTeX/TikZ, SVG, PNG, PDF
- **Diagrams**: Mermaid.js for flowcharts
- **Math**: KaTeX for equation rendering

---

## Success Metrics

1. **Adoption**: 10,000 active academic users within first year
2. **Quality**: 95% of exports pass journal submission checks
3. **Speed**: 10x faster than manual illustration for common tasks
4. **Satisfaction**: NPS > 50 among academic users
5. **Community**: 100+ community-contributed templates

---

*This constitution guides all development decisions for the FINNISH project.*

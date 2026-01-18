# FINNISH Project Directives

> **CRITICAL: Read this file at the start of EVERY session. This captures the persistent expansion plan.**

## Mission

FINNISH is an AI-powered scientific illustration tool replacing Adobe Illustrator, BioRender, and Napkin.AI for academics. We are building comprehensive icon and template libraries for **35 scientific specialties**.

---

## Current State (as of 2026-01-18)

| Metric | Current | Target | Progress |
|--------|---------|--------|----------|
| Specialties Complete | 15 | 35 | 43% |
| Icons | 1,231+ | 3,180 | 39% |
| Templates | 301+ | 709 | 42% |
| Prompts | 212+ | 525 | 40% |

**Completed (15)**: Cardiology, Pulmonology, Emergency Medicine, Gastroenterology, Infectious Disease, Nephrology, Neurology, Hematology-Oncology, Endocrinology, Orthopedics, Anesthesiology, Radiology, Ophthalmology, Dermatology, ENT
**In Progress**: Pediatrics, OB/GYN, Psychiatry
**Next in Queue**: Rheumatology, Pathology, Anatomy, Physiology, Biochemistry

---

## ⚠️ CONTEXT REFRESH REMINDER

> **ALWAYS run THREE PARALLEL WORKSTREAMS with multiple async agents:**
>
> **Workstream A: Specialty Expansion** (4-6 agents)
> - Launch agents for incomplete specialties using Ralph Loop
> - Check `.specify/ralph-loop/progress.json` for status
>
> **Workstream B: Illustrator Integration** (2-3 agents)
> - Icon Picker UI, Pen Tool wiring, Color management
> - Check `src/lib/` and `src/components/` for existing code
>
> **Workstream C: Feature Testing & Fixing** (2-3 agents) ← NEW
> - Test EVERY feature and wiring with mock runs
> - Apply Ralph Loop: iterate until 100% functional
> - DO NOT remove features - FIX them instead
> - Check `src/components/`, `src/lib/`, `src/hooks/`
>
> **Use Task tool with `run_in_background: true` for all agents!**

---

## THE PLAN: Parallel Async Agent Expansion

### Strategy: Launch Multiple Specialties Simultaneously

**DO NOT work on one specialty at a time.** Use async agents to expand multiple specialties in parallel:

```
┌─────────────────────────────────────────────────────────┐
│                  PARALLEL EXPANSION                      │
├─────────────────────────────────────────────────────────┤
│  Agent 1 → Neurology         (Phase 1 Medical)          │
│  Agent 2 → Pulmonology       (Phase 1 Medical)          │
│  Agent 3 → Gastroenterology  (Phase 1 Medical)          │
│  Agent 4 → Emergency Med     (Phase 1 Medical)          │
│  Agent 5 → Physics           (Phase 6 Physical)         │
│  Agent 6 → Chemistry         (Phase 6 Physical)         │
│  Agent 7 → Biology           (Phase 6 Life Sciences)    │
│  Agent 8 → Engineering       (Phase 6 Engineering)      │
└─────────────────────────────────────────────────────────┘
```

### How to Launch Parallel Expansion

When continuing work, use the Task tool with multiple async agents:

```
Task 1: "Expand neurology icons using Ralph Loop"
Task 2: "Expand pulmonology icons using Ralph Loop"
Task 3: "Expand physics icons using Ralph Loop"
... (launch 4-8 agents simultaneously)
```

### Scope: Medical AND Non-Medical

We are expanding ALL scientific domains, not just medical:

| Domain | Specialties | Priority |
|--------|-------------|----------|
| Medicine | 20 specialties | High |
| Basic Sciences | 7 specialties | High |
| Physical Sciences | 3 specialties | Medium |
| Life Sciences | 3 specialties | Medium |
| Engineering | 2 specialties | Medium |

---

## Ralph Loop Methodology

### Core Principle
> "Ralph is a Bash loop" - Iterate on each specialty until it reaches cardiology-level completeness (90%+).

### Completeness Formula
```
Score = (Icons × 0.40) + (Templates × 0.35) + (Prompts × 0.15) + (Colors × 0.10)
```

### Iteration Protocol
```
FOR each specialty in parallel:
    WHILE completeness < 90%:
        1. ASSESS against cardiology benchmark
        2. IDENTIFY gaps (icons, templates, prompts, colors)
        3. IMPLEMENT highest-priority missing content
        4. VALIDATE (TypeScript, visual quality)
        5. MEASURE new completeness score
        6. COMMIT progress with Ralph Loop iteration number
    END WHILE
    OUTPUT <promise>{SPECIALTY}_COMPLETE</promise>
END FOR
```

### Checkpoints
- **FOUNDATION_25**: Core anatomy + basic structure (25%)
- **PATHOLOGY_50**: Disease states + diagnostics (50%)
- **CLINICAL_75**: Equipment, procedures, workflows (75%)
- **COMPLETE**: Full coverage with polish (90%+)

### Progress File
Track progress in: `.specify/ralph-loop/progress.json`

---

## Spec-Kit Methodology

Use spec-kit for planning and implementation:

### Available Commands
| Command | Purpose |
|---------|---------|
| `/speckit.specify` | Create feature specification |
| `/speckit.plan` | Design implementation plan |
| `/speckit.tasks` | Generate actionable tasks |
| `/speckit.implement` | Execute implementation |
| `/speckit.analyze` | Cross-artifact consistency check |
| `/speckit.clarify` | Ask clarification questions |

### Workflow
```
Constitution → Specification → Plan → Tasks → Implementation
```

### Key Files
- `.specify/memory/constitution.md` - Project principles
- `.specify/features/` - Feature specifications
- `.specify/ralph-loop/` - Expansion framework
- `.specify/tasks.md` - 133-task roadmap

---

## File Structure for Expansion

For each specialty, create/update:

```
src/data/
├── icons/{specialty}.ts          # Icon definitions
├── templates/{specialty}.ts      # Template definitions
└── colors/{specialty}.ts         # Color schemes

src/services/ai/prompts/
└── {specialty}-prompts.ts        # Domain prompts
```

---

## Quality Requirements

### Icons
- SVG format with proper viewBox
- Uses `currentColor` for theming
- Recognizable at 24x24 and 64x64
- Consistent stroke width (1.5-2px)
- Anatomically/scientifically accurate

### Templates
- Valid Mermaid/Fabric.js structure
- Customizable placeholders
- Professional academic appearance
- Domain-appropriate colors

### TypeScript
- Strict mode compliance
- Proper type definitions
- Index file exports updated

---

## Session Startup Checklist

When starting a new session:

1. **Read this file** (CLAUDE.md)
2. **Check progress**: Read `.specify/ralph-loop/progress.json`
3. **Check Illustrator status**: Review Feature 006 implementation gaps
4. **Identify pending specialties**: See execution order below
5. **Launch parallel agents**: Use Task tool for 4-8 specialties
6. **Apply Ralph Loop**: Iterate until 90% completeness
7. **Commit frequently**: Use "feat: Ralph Loop Iteration N - {specialty}" format

### THREE PARALLEL WORKSTREAMS

```
Workstream A: Content Expansion (Ralph Loop)
├── 35 specialties with icons, templates, prompts
├── Status: 15/35 complete (43%)
└── Currently: 5 agents on Phase 4 specialties

Workstream B: Editor Features (Illustrator Integration)
├── Pen tool, hand-drawn styles, icon libraries
└── Spec: .specify/features/006-illustrator-integration/spec.md

Workstream C: Feature Testing & Fixing (NEW!)
├── Test EVERY feature, fix broken wiring
├── Ralph Loop until 100% functional
├── NEVER remove features - always fix them
└── Currently: 2-3 agents testing Canvas, Export, Pen tool
```

---

## Execution Order (35 Specialties)

### Phase 1: Medical Core ✓ COMPLETE
1. ~~Cardiology~~ ✓ COMPLETE
2. ~~Neurology~~ ✓ COMPLETE
3. ~~Pulmonology~~ ✓ COMPLETE
4. ~~Gastroenterology~~ ✓ COMPLETE
5. ~~Emergency Medicine~~ ✓ COMPLETE

### Phase 2: Medical Specialties ✓ COMPLETE
6. ~~Hematology/Oncology~~ ✓ COMPLETE
7. ~~Infectious Disease~~ ✓ COMPLETE
8. ~~Nephrology~~ ✓ COMPLETE
9. ~~Endocrinology~~ ✓ COMPLETE
10. ~~Orthopedics~~ ✓ COMPLETE

### Phase 3: Surgical & Procedural ✓ COMPLETE
11. ~~Anesthesiology~~ ✓ COMPLETE
12. ~~Radiology~~ ✓ COMPLETE
13. ~~Ophthalmology~~ ✓ COMPLETE
14. ~~Dermatology~~ ✓ COMPLETE
15. ~~ENT~~ ✓ COMPLETE

### Phase 4: Special Populations (CURRENT FOCUS)
16. **Pediatrics** ← IN PROGRESS
17. **OB/GYN** ← IN PROGRESS
18. **Psychiatry** ← IN PROGRESS
19. Rheumatology
20. Pathology

### Phase 5: Basic Sciences
21. Anatomy
22. Physiology
23. Biochemistry
24. Pharmacology
25. Cell Biology
26. Molecular Biology
27. Microbiology

### Phase 6: Physical & Engineering Sciences
28. Physics
29. Chemistry
30. Mathematics
31. Biology (General)
32. Neuroscience (Research)
33. Biomedical Engineering
34. General Engineering
35. Computer Science

---

## Commit Message Format

```
feat: Ralph Loop Iteration {N} - {Specialty} {checkpoint}

- Added {X} icons for {subcategory}
- Added {Y} templates for {type}
- Completeness: {previous}% → {current}%
```

---

## ILLUSTRATOR INTEGRATION PLAN (Feature 006)

> **DO NOT FORGET THIS PLAN** - See full spec at `.specify/features/006-illustrator-integration/spec.md`

### Goal
Transform FINNISH into an Adobe Illustrator-like experience with professional SVG editing capabilities.

### Library Stack (MIT/Apache 2.0 Licensed)

| Component | Library | Status | Priority |
|-----------|---------|--------|----------|
| Canvas Engine | Fabric.js 6.x | ✅ Working | P0 |
| Path/Bezier | Paper.js | ✅ Installed | P1 |
| Hand-drawn Style | Rough.js | ✅ Installed | P2 |
| Freehand Drawing | perfect-freehand | ⚠️ Partial | P2 |
| Color Management | Color.js | ✅ Installed | P1 |
| Export PNG | saveSvgAsPng | ⚠️ Verify | P1 |
| Export PDF | jsPDF + svg2pdf | ✅ Working | P1 |
| Image Filters | glfx.js | ❌ Missing | P2 |
| General Icons | Tabler Icons | ❌ Missing | P1 |
| Medical Icons | Health Icons | ❌ Missing | P1 |
| Scientific Icons | Bioicons | ❌ Missing | P1 |

### Missing Features to Implement

1. **Professional Pen Tool** (P1)
   - Bezier curves with control handles
   - Anchor point editing
   - Path closing

2. **Hand-drawn Style Toggle** (P2)
   - Apply Rough.js sketchy effects
   - One-click style switching

3. **External Icon Libraries** (P1)
   - Install: `npm install @tabler/icons healthicons bioicons`
   - Create unified search across libraries

4. **WebGL Image Filters** (P2)
   - Install: `npm install glfx`
   - Real-time filter preview

### Integration Files

```
src/lib/
├── paper/      # ✅ Paper.js wrapper
├── rough/      # ✅ Rough.js wrapper
├── freehand/   # ✅ Freehand drawing
├── color/      # ✅ Color management
├── export/     # ✅ Export pipeline
└── icons/      # ⚠️ Needs external libs
```

### Session Task: Check Illustrator Progress
When starting a session, also check:
- Are external icon libraries installed?
- Is pen tool node editing working?
- Are hand-drawn styles accessible in UI?

---

## FEATURE TESTING WORKSTREAM (Workstream C) - CRITICAL

> **DO NOT FORGET THIS** - Every session must include testing agents

### Goal
Ensure ALL features are 100% functional. Use Ralph Loop methodology for testing - iterate until everything works.

### Testing Ralph Loop Protocol
```
FOR each feature/component:
    WHILE functionality < 100%:
        1. MOCK RUN the feature (test in isolation)
        2. IDENTIFY bugs, broken wiring, missing connections
        3. FIX the issue (DO NOT remove the feature!)
        4. VALIDATE fix works
        5. TEST integration with other features
        6. COMMIT fix with "fix: Ralph Loop - {component}" format
    END WHILE
    OUTPUT <promise>{FEATURE}_WORKING</promise>
END FOR
```

### Testing Checklist (Per Feature)

| Feature | Test Method | Status |
|---------|-------------|--------|
| Canvas Engine (Fabric.js) | Load, draw, select, move objects | ⬜ |
| Pen Tool (Paper.js) | Draw paths, bezier curves, edit nodes | ⬜ |
| Hand-drawn Mode (Rough.js) | Toggle sketchy style on/off | ⬜ |
| Freehand Drawing | Draw with stylus/mouse, smooth strokes | ⬜ |
| Color Picker | Select colors, apply to objects | ⬜ |
| Export PNG | Export canvas to PNG file | ⬜ |
| Export PDF | Export canvas to PDF file | ⬜ |
| Export SVG | Export canvas to SVG file | ⬜ |
| Icon Picker | Search, filter, insert specialty icons | ⬜ |
| Template System | Load, customize, save templates | ⬜ |
| Zoom/Pan | Canvas navigation works smoothly | ⬜ |
| Undo/Redo | History management works | ⬜ |
| Layer Management | Create, reorder, visibility toggle | ⬜ |
| Text Tool | Add, edit, style text objects | ⬜ |
| Shape Tools | Rectangle, circle, polygon creation | ⬜ |
| AI Generation | Generate illustrations from prompts | ⬜ |

### Key Testing Locations

```
src/components/
├── Canvas/           # Main canvas component - TEST FIRST
├── Toolbar/          # All tools UI - TEST WIRING
├── IconPicker/       # Icon library browser - TEST SEARCH
├── ColorPicker/      # Color selection - TEST APPLICATION
├── ExportDialog/     # Export functionality - TEST OUTPUTS
└── LayerPanel/       # Layer management - TEST CRUD

src/lib/
├── paper/            # Pen tool implementation - TEST PATHS
├── rough/            # Hand-drawn effects - TEST TOGGLE
├── freehand/         # Freehand drawing - TEST STROKES
├── color/            # Color management - TEST CONVERSION
└── export/           # Export pipeline - TEST ALL FORMATS

src/hooks/
├── useCanvas.ts      # Canvas state management
├── useTool.ts        # Tool selection/switching
└── useHistory.ts     # Undo/redo functionality
```

### Testing Priority Order

1. **P0 - Core Canvas** (Must work first)
   - Canvas renders
   - Objects can be added
   - Selection works
   - Movement/resize works

2. **P1 - Essential Tools**
   - Shape tools (rectangle, circle, line)
   - Text tool
   - Color picker + application
   - Export (at least PNG)

3. **P2 - Professional Features**
   - Pen tool with bezier curves
   - Hand-drawn style toggle
   - PDF export
   - Icon picker integration

4. **P3 - Nice to Have**
   - WebGL filters
   - AI generation
   - Template auto-layout

### Fix Principles (IMPORTANT)

1. **NEVER DELETE A BROKEN FEATURE** - Fix it instead
2. **Trace the wiring** - Usually issues are connection problems, not logic errors
3. **Check imports/exports** - Missing exports are common culprits
4. **Verify props flow** - Components might not receive expected props
5. **Test in isolation first** - Then test integration
6. **Console.log liberally** - Add temporary logs to trace issues
7. **Check for TypeScript errors** - They often reveal the problem

### Session Task: Testing Agents
When starting a session, launch testing agents:
- Agent 1: Test Canvas core + Shape tools
- Agent 2: Test Export pipeline (PNG, PDF, SVG)
- Agent 3: Test Pen tool + Hand-drawn mode

---

## Remember

1. **PARALLEL EXPANSION** - Launch multiple agents, don't work sequentially
2. **MEDICAL AND NON-MEDICAL** - All 35 specialties matter
3. **RALPH LOOP** - Iterate until 90% completeness
4. **SPEC-KIT** - Use methodology for planning
5. **COMMIT OFTEN** - Track progress with clear messages
6. **ILLUSTRATOR INTEGRATION** - Don't forget Feature 006 (pen tool, hand-drawn, icons)
7. **FEATURE TESTING** - Test EVERY feature, fix broken wiring, Ralph Loop until 100% functional
8. **NEVER REMOVE FEATURES** - Always fix instead of removing

---

*Last Updated: 2026-01-18 | Version: 1.1.0*

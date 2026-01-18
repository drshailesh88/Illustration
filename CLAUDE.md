# FINNISH Project Directives

> **CRITICAL: Read this file at the start of EVERY session. This captures the persistent expansion plan.**

## Mission

FINNISH is an AI-powered scientific illustration tool replacing Adobe Illustrator, BioRender, and Napkin.AI for academics. We are building comprehensive icon and template libraries for **35 scientific specialties**.

---

## Current State (as of 2026-01-18)

| Metric | Current | Target | Progress |
|--------|---------|--------|----------|
| Specialties Complete | 1 | 35 | 2.9% |
| Icons | 221 | 3,180 | 6.95% |
| Templates | 50 | 709 | 7.05% |
| Prompts | 25 | 525 | 4.8% |

**Completed**: Cardiology (100% - BENCHMARK)
**Next in Queue**: Neurology, Pulmonology, Gastroenterology, Emergency Medicine (Phase 1)

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

### TWO PARALLEL WORKSTREAMS

```
Workstream A: Content Expansion (Ralph Loop)
├── 35 specialties with icons, templates, prompts
└── Currently: 8 agents running in parallel

Workstream B: Editor Features (Illustrator Integration)
├── Pen tool, hand-drawn styles, icon libraries
└── Spec: .specify/features/006-illustrator-integration/spec.md
```

---

## Execution Order (35 Specialties)

### Phase 1: Medical Core (CURRENT FOCUS)
1. ~~Cardiology~~ ✓ COMPLETE
2. **Neurology** ← NEXT
3. Pulmonology
4. Gastroenterology
5. Emergency Medicine

### Phase 2: Medical Specialties
6. Hematology/Oncology
7. Infectious Disease
8. Nephrology
9. Endocrinology
10. Orthopedics

### Phase 3: Surgical & Procedural
11. Anesthesiology
12. Radiology
13. Ophthalmology
14. Dermatology
15. ENT

### Phase 4: Special Populations
16. Pediatrics
17. OB/GYN
18. Psychiatry
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

## Remember

1. **PARALLEL EXPANSION** - Launch multiple agents, don't work sequentially
2. **MEDICAL AND NON-MEDICAL** - All 35 specialties matter
3. **RALPH LOOP** - Iterate until 90% completeness
4. **SPEC-KIT** - Use methodology for planning
5. **COMMIT OFTEN** - Track progress with clear messages
6. **ILLUSTRATOR INTEGRATION** - Don't forget Feature 006 (pen tool, hand-drawn, icons)

---

*Last Updated: 2026-01-18 | Version: 1.1.0*

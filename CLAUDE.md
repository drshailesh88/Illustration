# FINNISH Project Directives

> **CRITICAL: Read this file at the start of EVERY session. This captures the persistent expansion plan.**

## Mission

FINNISH is an AI-powered scientific illustration tool **killing BioRender** for academics. We're building the **free/affordable alternative** ($20-25/month vs BioRender's $38-39) with comprehensive icon and template libraries for **35 scientific specialties**.

### Strategic Focus: KILL BIORENDER

```
┌─────────────────────────────────────────────────────────────────┐
│                    COMPETITION PRIORITY                          │
├─────────────────────────────────────────────────────────────────┤
│  #1 BioRender     → KILL NOW (v1.0 focus)                       │
│  #2 Napkin.AI     → DEFER TO v2.0 (AI diagram generation)       │
│  #3 Adobe         → Long-term (professional features)           │
└─────────────────────────────────────────────────────────────────┘
```

**What makes us beat BioRender:**
1. **AI Prompt-to-Illustration** - Prompt it, get diagrams, tweak manually
2. **Massive Icon Library** - 2,700+ bioicons + 2,384 custom icons
3. **PPTX Export** - Scientists NEED PowerPoint export
4. **Price** - $20-25/month vs $38-39

---

## Current State (as of 2026-01-18)

| Metric | Current | Target | Progress |
|--------|---------|--------|----------|
| Specialties Complete | **33** | 35 | **94%** |
| Icons | **2,384** | 3,180 | **75%** |
| Templates | **610** | 709 | **86%** |
| Prompts | **469** | 525 | **89%** |

**Completed (33)**: Cardiology, Pulmonology, Emergency Medicine, Gastroenterology, Infectious Disease, Nephrology, Neurology, Hematology-Oncology, Endocrinology, Orthopedics, Anesthesiology, Radiology, Ophthalmology, Dermatology, ENT, Pediatrics, OB/GYN, Psychiatry, Rheumatology, Pathology, Physiology, Biochemistry, Mathematics, Molecular Biology, Engineering, Biomedical Engineering, Computer Science, Pharmacology, Neuroscience Research, Cell Biology, Chemistry, Physics, Microbiology

**Remaining (2)**: Anatomy, Biology (General)

---

## KILL BIORENDER ROADMAP

### Phase 1: Icon Superiority (HIGH PRIORITY)

**External Icon Libraries (All MIT/CC0 - Safe for Commercial)**

| Library | Icons | License | Status |
|---------|-------|---------|--------|
| Bioicons | 2,700+ | CC0/MIT/CC-BY | **INTEGRATE** |
| @tabler/icons-react | 4,000+ | MIT | ✅ Installed |
| healthicons-react | 1,500+ | MIT | ✅ Installed |
| @scienceicons/react | 500+ | MIT | ✅ Installed |
| Custom FINNISH | 2,384 | Proprietary | ✅ Complete |

**Total Potential Icons: 11,000+** (BioRender has ~30,000 but many are locked behind paywall)

### Phase 2: Export Formats (CRITICAL)

| Format | Status | Priority |
|--------|--------|----------|
| PNG | ✅ Working | P0 |
| SVG | ✅ Working | P0 |
| PDF | ✅ Working | P0 |
| **PPTX** | **❌ MISSING** | **P0 - URGENT** |

**PPTX Export is CRITICAL** - Scientists live in PowerPoint. This is a BioRender-killer feature.

### Phase 3: Prompt-to-Illustration Workflow

**What BioRender CANNOT do:**
- User prompts: "Draw a cell signaling pathway with EGFR activation"
- AI generates initial diagram using icon library
- User manually tweaks/adjusts in editor
- Export to PPTX/PDF/PNG

**Implementation:**
1. AI understands scientific domain vocabulary
2. Maps prompt concepts to icon library
3. Auto-layouts diagram with connections
4. User refines in Fabric.js canvas

---

## Icon Licensing for Commercial Use

**SAFE TO USE (MIT/CC0):**
- Bioicons: CC0 (no attribution), CC-BY (attribute), MIT
- Tabler Icons: MIT License
- Health Icons: MIT License
- Science Icons: MIT License

**CC-BY Attribution Required:**
- Add attribution in app "About" section
- "Icons from Bioicons (bioicons.com) licensed under CC-BY"

---

## ⚠️ CONTEXT REFRESH REMINDER

> **ALWAYS run THREE PARALLEL WORKSTREAMS with multiple async agents:**
>
> **Workstream A: Kill BioRender Features** (HIGHEST PRIORITY)
> - PPTX Export implementation
> - Bioicons integration (unified search)
> - Prompt-to-illustration workflow
>
> **Workstream B: Specialty Completion** (2 agents)
> - Complete remaining: Anatomy, Biology (General)
> - Check `.specify/ralph-loop/progress.json`
>
> **Workstream C: Feature Testing & Fixing** (2-3 agents)
> - Test EVERY feature with mock runs
> - Ralph Loop until 100% functional
> - NEVER remove features - FIX them
>
> **Use Task tool with `run_in_background: true` for all agents!**

---

## PPTX Export Implementation (URGENT)

### Technical Approach

```typescript
// Library: pptxgenjs (MIT License)
// npm install pptxgenjs

import PptxGenJS from 'pptxgenjs';

export async function exportAsPptx(
  canvas: fabric.Canvas,
  filename: string
): Promise<void> {
  const pptx = new PptxGenJS();
  const slide = pptx.addSlide();

  // Convert canvas to image
  const dataUrl = canvas.toDataURL({ format: 'png', quality: 1 });

  // Add to slide with proper sizing
  slide.addImage({
    data: dataUrl,
    x: 0.5, y: 0.5,
    w: 9, h: 6.5
  });

  await pptx.writeFile({ fileName: filename });
}
```

### PPTX Features Needed
1. Canvas → PPTX slide conversion
2. Multiple slides from artboards
3. Maintain vector quality where possible
4. Editable text objects
5. Proper aspect ratio handling

---

## Bioicons Integration Plan

### Step 1: Download/Reference Bioicons
```bash
# Option A: NPM package (if available)
npm install bioicons

# Option B: Download SVG files from bioicons.com
# Store in: src/assets/bioicons/
```

### Step 2: Create Unified Icon Search
```typescript
// src/lib/icons/unified-search.ts
export function searchAllIcons(query: string): IconResult[] {
  return [
    ...searchFinnishIcons(query),
    ...searchBioicons(query),
    ...searchTablerIcons(query),
    ...searchHealthIcons(query),
  ].sort(byRelevance);
}
```

### Step 3: Icon Picker UI
- Unified search bar
- Filter by source (FINNISH, Bioicons, Tabler, Health)
- Filter by category (Biology, Chemistry, Medicine, etc.)
- Preview panel
- Drag-and-drop to canvas

---

## Ralph Loop Methodology

### Core Principle
> "Ralph is a Bash loop" - Iterate on each specialty until it reaches cardiology-level completeness (90%+).

### Completeness Formula
```
Score = (Icons × 0.40) + (Templates × 0.35) + (Prompts × 0.15) + (Colors × 0.10)
```

### Progress File
Track progress in: `.specify/ralph-loop/progress.json`

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

---

## Session Startup Checklist

When starting a new session:

1. **Read this file** (CLAUDE.md)
2. **Check progress**: Read `.specify/ralph-loop/progress.json`
3. **Priority 1**: PPTX export implementation status
4. **Priority 2**: Bioicons integration status
5. **Priority 3**: Complete remaining 2 specialties
6. **Launch parallel agents** for Kill BioRender features
7. **Commit frequently** with clear messages

---

## Execution Order (35 Specialties)

### Phases 1-5: ✓ COMPLETE (33/35)
All medical, basic science, physical, and engineering specialties complete.

### Remaining (2):
- [ ] Anatomy
- [ ] Biology (General)

---

## Library Stack (All MIT/Apache 2.0 - Safe for Commercial)

| Component | Library | Status |
|-----------|---------|--------|
| Canvas Engine | Fabric.js 6.x | ✅ Working |
| Path/Bezier | Paper.js | ✅ Installed |
| Hand-drawn Style | Rough.js | ✅ Installed |
| Freehand Drawing | perfect-freehand | ✅ Installed |
| Color Management | Color.js | ✅ Installed |
| Export PNG | saveSvgAsPng | ✅ Working |
| Export PDF | jsPDF + svg2pdf | ✅ Working |
| **Export PPTX** | pptxgenjs | **❌ NEED TO ADD** |
| Image Filters | glfx.js | ✅ Installed |
| Icons (General) | Tabler Icons | ✅ Installed |
| Icons (Medical) | Health Icons | ✅ Installed |
| Icons (Science) | @scienceicons | ✅ Installed |
| **Icons (Bio)** | Bioicons | **❌ NEED TO ADD** |

---

## Commit Message Format

```
feat: Kill BioRender - {feature description}
fix: Ralph Loop - {component} fix
feat: Ralph Loop Iteration {N} - {Specialty} {checkpoint}
```

---

## DEFERRED TO v2.0 (Napkin.AI Features)

The following are DEFERRED - do NOT implement until v2.0:
- Real-time collaborative editing
- AI-powered automatic layout optimization
- Natural language to complex diagram generation
- Template generation from prompts
- Advanced AI style transfer

Focus on **killing BioRender first** with:
- Massive icon library
- PPTX export
- Simple prompt-to-diagram workflow
- Professional manual editing tools

---

## Remember

1. **KILL BIORENDER** - This is the #1 priority
2. **PPTX EXPORT** - Scientists need PowerPoint
3. **ICON SUPERIORITY** - Integrate all open source icon libraries
4. **PROMPT + TWEAK** - AI generates, user refines
5. **PRICE TO WIN** - $20-25/month undercuts BioRender
6. **DEFER NAPKIN.AI** - Complex AI features are v2.0
7. **TEST EVERYTHING** - Ralph Loop until 100% functional
8. **NEVER REMOVE FEATURES** - Always fix instead

---

*Last Updated: 2026-01-18 | Version: 2.0.0 - Kill BioRender Edition*

# FINNISH Project Directives

> **CRITICAL: Read this file at the start of EVERY session. This captures the persistent expansion plan.**

---

## SESSION CONTINUITY LOG

> **READ THIS FIRST** - Resume from where the last session ended

### Last Session: 2026-01-19 (Session 5 - Licensing Resolution)

**Session Status**: ALL LICENSING ISSUES RESOLVED ✅

### Completed This Session:
- [x] **AGPL-3.0 Resolution** - Replaced @imgly/background-removal with @mediapipe/tasks-vision (Apache 2.0)
- [x] **GPL-2.0 Resolution** - Removed potrace (was unused, custom JS implementation exists)
- [x] **Background Removal Rewrite** - Rewrote src/lib/image/background-removal.ts to use MediaPipe Image Segmenter
- [x] **Licensing Audit Update** - Updated docs/LICENSING_AUDIT.md to v2.0 reflecting all resolutions
- [x] **Build Verification** - All TypeScript checks pass, production build successful

### Previous Session (2026-01-19 - Session 4):
- [x] AIGenerationTool UI Wiring - Added "AI Generate Image..." (Ctrl+Shift+A) to Image menu
- [x] SciDraw Icon Library - Created src/lib/icons/scidraw.ts with 60+ scientific icons
- [x] Ralph Loop Feature Testing - Created docs/FEATURE_AUDIT.md (15KB)
- [x] Licensing Audit - Created docs/LICENSING_AUDIT.md (17KB)
- [x] Architecture Documentation - Created docs/ARCHITECTURE.md (32KB)

### Licensing Status: ✅ ALL CLEAR FOR COMMERCIAL USE
- **CC-BY**: SciDraw, some Bioicons - attribution required on About page (standard practice)

### Previous Session (2026-01-19 - Session 3):
- [x] Bioicons Integration - Created src/lib/icons/bioicons.ts with 70 scientific icons
- [x] BackgroundRemovalTool UI Wiring - Added "Image" menu with "Remove Background..." (Ctrl+Shift+B)
- [x] Export Testing - All 4 formats verified working (PNG, SVG, PDF, PPTX)
- [x] fal.ai AI Image Generation - Installed @fal-ai/serverless-client, created full library and UI component

### Previous Session (2026-01-18):
- [x] PPTX Export - pptxgenjs installed, src/lib/export/pptx.ts implemented
- [x] Background Removal - @imgly/background-removal installed, library implemented
- [x] Pen Tool UI Wiring - PenToolOverlay component created, integrated with Canvas
- [x] Ralph Loop - All 35 specialties complete

### Files Created This Session:
- `src/lib/icons/scidraw.ts` - 60+ scientific icons with categories
- `docs/FEATURE_AUDIT.md` - Ralph loop feature testing results (15KB)
- `docs/LICENSING_AUDIT.md` - Comprehensive licensing audit (17KB)
- `docs/ARCHITECTURE.md` - Full technical documentation (32KB)

### Files Modified This Session:
- `src/lib/icons/index.ts` - Added SciDraw exports and unified search integration
- `src/pages/EditorMode/MenuBar.tsx` - Added "AI Generate Image..." to Image menu
- `src/pages/EditorMode/EditorMode.tsx` - Wired AIGenerationTool modal with overlay

### Next Session Should:
1. ~~Resolve licensing issues (AGPL-3.0 and GPL-2.0 packages)~~ ✅ DONE
2. Create attribution/credits page for CC-BY content
3. UI polish and user experience improvements
4. End-to-end testing with real users
5. Production deployment pipeline

### Blocking Issues (Before Release):
- ~~**CRITICAL**: @imgly/background-removal AGPL-3.0 licensing~~ ✅ RESOLVED
- ~~**CRITICAL**: potrace GPL-2.0 licensing~~ ✅ RESOLVED
- **None remaining** - All dependencies are now MIT/Apache 2.0/CC0/CC-BY compatible

### Icon Library Status:
| Library | Icons | Status |
|---------|-------|--------|
| Tabler Icons | 4,000+ | ✅ Integrated |
| Health Icons | 1,500+ | ✅ Integrated |
| Science Icons | 500+ | ✅ Integrated |
| Icon Park | 2,400+ | ✅ Integrated |
| Simple Icons | 200+ | ✅ Integrated |
| Bioicons | 70 | ✅ Integrated |
| **SciDraw** | **60+** | ✅ **NEW** |

---

## QUICK START FOR NEW SESSION

```bash
# 1. Check what was installed
cat package.json | grep -E "pptxgenjs|background-removal|fal-ai"

# 2. Check icon library status
ls -la src/lib/icons/

# 3. Check AI generation module
ls -la src/lib/ai/

# 4. Check documentation
ls -la docs/

# 5. Run the build to verify everything works
npm run build
```

**All core "Kill BioRender" features are now implemented!**

**Documentation Created:**
- `docs/ARCHITECTURE.md` - Full technical documentation (32KB)
- `docs/FEATURE_AUDIT.md` - Ralph loop feature testing (15KB)
- `docs/LICENSING_AUDIT.md` - Comprehensive licensing audit (17KB)

---

## Mission

FINNISH is an AI-powered scientific illustration **web app** killing BioRender for academics. We're building the **free/affordable alternative** ($20-25/month vs BioRender's $38-39) with comprehensive icon and template libraries for **35 scientific specialties**.

**Tech Stack**: React + Vite + TypeScript + Fabric.js (Web App - runs in browser)

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
2. **AI Image Generation** - Generate custom illustrations with fal.ai/OpenAI
3. **Massive Icon Library** - 12,000+ icons (vs BioRender's paywalled library)
4. **PPTX Export** - Scientists NEED PowerPoint export
5. **Background Removal** - Browser-based, FREE (no API costs)
6. **Price** - $20-25/month vs $38-39

---

## Current State (as of 2026-01-19)

| Metric | Current | Target | Progress |
|--------|---------|--------|----------|
| Specialties Complete | **35** | 35 | **100%** |
| Icons | **2,646** | 3,180 | **83%** |
| Templates | **661** | 709 | **93%** |
| Prompts | **509** | 525 | **97%** |

**All 35 Specialties COMPLETE**: Cardiology, Pulmonology, Emergency Medicine, Gastroenterology, Infectious Disease, Nephrology, Neurology, Hematology-Oncology, Endocrinology, Orthopedics, Anesthesiology, Radiology, Ophthalmology, Dermatology, ENT, Pediatrics, OB/GYN, Psychiatry, Rheumatology, Pathology, Physiology, Biochemistry, Mathematics, Molecular Biology, Engineering, Biomedical Engineering, Computer Science, Pharmacology, Neuroscience Research, Cell Biology, Chemistry, Physics, Microbiology, **Anatomy**, **Biology General**

**All v1.0 "Kill BioRender" Features Complete!**
- See `docs/FEATURE_AUDIT.md` for feature verification results
- See `docs/LICENSING_AUDIT.md` for licensing compliance status

---

## VERSIONED FEATURE ROADMAP

### v1.0 - KILL BIORENDER (NOW)

| Feature | Library | Status | Priority |
|---------|---------|--------|----------|
| PPTX Export | pptxgenjs (MIT) | ✅ DONE | **P0** |
| Bioicons Integration | bioicons (CC0/MIT) | ✅ DONE | **P0** |
| SciDraw Integration | scidraw.io (CC-BY) | ✅ DONE | **P0** |
| Complete Pen Tool UI | Paper.js | ✅ DONE | **P0** |
| Background Removal | @imgly/background-removal-js | ✅ DONE | **P1** |
| Unified Icon Search | Custom | ✅ DONE | **P1** |
| Complete Anatomy | Ralph Loop | ✅ DONE | **P1** |
| Complete Biology General | Ralph Loop | ✅ DONE | **P1** |

### v1.5 - ENHANCED (Post-Launch)

| Feature | Library | Cost | Priority |
|---------|---------|------|----------|
| AI Image Generation | fal.ai FLUX Turbo | $0.008/image | **P1** |
| AI Image Generation | OpenAI GPT-image-1 | $0.01-0.17/image | **P2** |
| Simple Interactivity | Custom (tooltips, clickable) | Free | **P2** |
| Inpainting | fal.ai / browser-based | Variable | **P2** |

### v2.0 - NAPKIN.AI FEATURES (DEFERRED)

- Real-time collaborative editing
- AI-powered automatic layout optimization
- Natural language to complex diagram generation
- Template generation from prompts
- Advanced AI style transfer

---

## PARALLEL AGENT LAUNCH TEMPLATE

When starting a session, launch these agents simultaneously:

```
Agent 1: PPTX Export
- Install pptxgenjs if not installed
- Create src/lib/export/pptx.ts
- Add exportAsPptx function
- Update ExportDialog component
- Test export functionality

Agent 2: Background Removal
- Install @imgly/background-removal if not installed
- Create src/lib/image/background-removal.ts
- Create BackgroundRemovalTool component
- Wire to toolbar
- Test with sample images

Agent 3: Bioicons Integration
- Clone/download bioicons from GitHub
- Convert to FINNISH icon format
- Add to src/data/icons/bioicons.ts
- Update icons/index.ts
- Create unified search

Agent 4: Anatomy Specialty (Ralph Loop)
- Create src/data/icons/anatomy.ts (if needed)
- Add 90+ anatomy icons
- Create src/data/templates/anatomy.ts
- Create src/data/colors/anatomy.ts
- Update progress.json

Agent 5: Biology General Specialty (Ralph Loop)
- Create src/data/icons/biology-general.ts
- Add 90+ general biology icons
- Create templates and colors
- Update progress.json
```

---

## AI IMAGE GENERATION OPTIONS

### Recommended: fal.ai FLUX (Cheapest + Best Quality)

```typescript
// npm install @fal-ai/serverless-client

import * as fal from '@fal-ai/serverless-client';

// FLUX.2 Turbo - $0.008/image (CHEAPEST)
const result = await fal.subscribe('fal-ai/flux/schnell', {
  input: {
    prompt: 'Scientific diagram of EGFR signaling pathway, clean vector style',
    image_size: 'square_hd',
    num_images: 1,
  },
});
```

**Pricing Comparison:**
| Model | Cost/Image | Quality | Speed |
|-------|-----------|---------|-------|
| fal.ai FLUX Turbo | **$0.008** | Good | 6.6s |
| fal.ai FLUX Dev | $0.012 | Better | 10s |
| fal.ai FLUX Pro | $0.03 | Best | 15s |
| OpenAI GPT-image-1 Low | $0.01 | Good | 5s |
| OpenAI GPT-image-1 High | $0.17 | Best | 10s |

**For $20-25/month subscription**: User can generate ~2,500-3,000 images with FLUX Turbo

---

## BACKGROUND REMOVAL (FREE - Browser-Based)

```typescript
// npm install @imgly/background-removal

import { removeBackground } from '@imgly/background-removal';

// Runs entirely in browser - NO API COSTS!
const blob = await removeBackground(imageFile);
const url = URL.createObjectURL(blob);
```

**Why this is a killer feature:**
- Zero server costs (runs in WebGPU/WASM)
- Complete privacy (images never leave browser)
- Fast: <1 second for 1000x1000 images
- BioRender doesn't have this!

---

## PPTX EXPORT (CRITICAL)

```typescript
// npm install pptxgenjs

import PptxGenJS from 'pptxgenjs';

export async function exportAsPptx(
  canvas: fabric.Canvas,
  filename: string
): Promise<void> {
  const pptx = new PptxGenJS();
  const slide = pptx.addSlide();

  // Convert canvas to high-res image
  const dataUrl = canvas.toDataURL({ format: 'png', quality: 1, multiplier: 2 });

  slide.addImage({
    data: dataUrl,
    x: 0.5, y: 0.5,
    w: 9, h: 6.5
  });

  await pptx.writeFile({ fileName: filename });
}
```

---

## ICON LIBRARIES TO INTEGRATE

### External Libraries (All Free + Commercial-Safe)

| Library | Icons | License | How to Get |
|---------|-------|---------|------------|
| Bioicons | 2,700+ | CC0/MIT/CC-BY | bioicons.com / GitHub |
| SciDraw | 1,000+ | CC-BY | scidraw.io |
| Servier Medical Art | 3,000+ | CC-BY 4.0 | via Bioicons |
| Tabler Icons | 4,000+ | MIT | ✅ Already installed |
| Health Icons | 1,500+ | MIT | ✅ Already installed |
| Science Icons | 500+ | MIT | ✅ Already installed |

**Total: ~12,700 icons** (vs BioRender's paywalled 30,000)

### Unified Search Implementation

```typescript
// src/lib/icons/unified-search.ts
export interface UnifiedIcon {
  id: string;
  name: string;
  svg: string;
  source: 'finnish' | 'bioicons' | 'scidraw' | 'tabler' | 'health';
  category: string;
  license: 'MIT' | 'CC0' | 'CC-BY';
}

export function searchAllIcons(query: string): UnifiedIcon[] {
  return [
    ...searchFinnishIcons(query),
    ...searchBioicons(query),
    ...searchSciDraw(query),
    ...searchTablerIcons(query),
    ...searchHealthIcons(query),
  ].sort(byRelevance);
}
```

---

## RALPH LOOP FOR REMAINING SPECIALTIES

### Anatomy (Target: 90+ icons, 25+ templates)

Categories needed:
- Skeletal system (bones, joints, spine)
- Muscular system (major muscle groups)
- Nervous system (brain regions, nerves)
- Cardiovascular system (heart, vessels)
- Respiratory system (lungs, airways)
- Digestive system (organs, GI tract)
- Urinary system (kidneys, bladder)
- Reproductive system (male/female)
- Endocrine system (glands)
- Lymphatic system (nodes, vessels)
- Integumentary system (skin layers)
- Special senses (eye, ear anatomy)

### Biology General (Target: 90+ icons, 25+ templates)

Categories needed:
- Cell structure (membrane, organelles)
- DNA/RNA (helix, transcription, translation)
- Proteins (structure, folding)
- Ecosystems (food webs, biomes)
- Evolution (phylogenetic trees, fossils)
- Plant biology (photosynthesis, structure)
- Animal diversity (phyla representatives)
- Microbiology (bacteria, viruses, fungi)
- Biochemistry (pathways, enzymes)
- Genetics (Punnett squares, chromosomes)
- Laboratory (equipment, techniques)
- Scientific method (hypothesis, experiments)

---

## ⚠️ CONTEXT REFRESH REMINDER

> **ALWAYS run THREE PARALLEL WORKSTREAMS with multiple async agents:**
>
> **Workstream A: Kill BioRender Features** (HIGHEST PRIORITY)
> - PPTX Export (pptxgenjs)
> - Background removal (@imgly/background-removal-js)
> - Bioicons + SciDraw integration
> - Pen tool UI wiring
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

## Session Startup Checklist

When starting a new session:

1. **Read SESSION CONTINUITY LOG** at top of this file
2. **Run quick status checks** (see commands above)
3. **Check progress.json** for specialty status
4. **Launch parallel agents** for unfinished work
5. **Update SESSION CONTINUITY LOG** before ending session
6. **Commit frequently** with clear messages

---

## Library Stack (All MIT/Apache 2.0 - Safe for Commercial)

| Component | Library | Status |
|-----------|---------|--------|
| Canvas Engine | Fabric.js 6.x | ✅ Working |
| Path/Bezier | Paper.js | ✅ Installed (needs wiring) |
| Hand-drawn Style | Rough.js | ✅ Installed |
| Freehand Drawing | perfect-freehand | ✅ Installed |
| Color Management | Color.js | ✅ Installed |
| Export PNG | saveSvgAsPng | ✅ Working |
| Export PDF | jsPDF + svg2pdf | ✅ Working |
| **Export PPTX** | pptxgenjs | **❌ INSTALL** |
| **Background Removal** | @imgly/background-removal-js | **❌ INSTALL** |
| **AI Generation** | @fal-ai/serverless-client | **❌ INSTALL (v1.5)** |
| Image Filters | glfx.js | ✅ Installed |
| Icons (General) | Tabler Icons | ✅ Installed |
| Icons (Medical) | Health Icons | ✅ Installed |
| Icons (Science) | @scienceicons | ✅ Installed |
| **Icons (Bio)** | Bioicons | **❌ INTEGRATE** |
| **Icons (SciDraw)** | SciDraw.io | **❌ INTEGRATE** |

---

## Commit Message Format

```
feat: Kill BioRender - {feature description}
fix: Ralph Loop - {component} fix
feat: Ralph Loop Iteration {N} - {Specialty} {checkpoint}
```

---

## Icon Licensing for Commercial Use

**SAFE TO USE (MIT/CC0):**
- Bioicons: CC0 (no attribution), CC-BY (attribute), MIT
- SciDraw: CC-BY (attribute)
- Tabler Icons: MIT License
- Health Icons: MIT License
- Science Icons: MIT License

**CC-BY Attribution Required (add to About page):**
```
Scientific illustrations from:
- Bioicons (bioicons.com) - CC-BY
- SciDraw (scidraw.io) - CC-BY
- Servier Medical Art (smart.servier.com) - CC-BY 4.0
```

---

## Remember

1. **KILL BIORENDER** - This is the #1 priority
2. **WEB APP** - React + Vite, runs in browser
3. **PPTX EXPORT** - Scientists need PowerPoint
4. **BACKGROUND REMOVAL** - Free, browser-based, killer feature
5. **ICON SUPERIORITY** - 12,700+ icons from open source
6. **AI GENERATION** - fal.ai FLUX Turbo at $0.008/image (v1.5)
7. **PRICE TO WIN** - $20-25/month undercuts BioRender
8. **DEFER NAPKIN.AI** - Complex AI features are v2.0
9. **TEST EVERYTHING** - Ralph Loop until 100% functional
10. **NEVER REMOVE FEATURES** - Always fix instead
11. **UPDATE SESSION LOG** - Before ending each session

---

*Last Updated: 2026-01-18 | Version: 2.2.0 - Kill BioRender Edition*

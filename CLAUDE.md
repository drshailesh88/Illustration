# FINNISH Project Directives

> **CRITICAL: Read this file at the start of EVERY session. This captures the persistent expansion plan.**

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

## VERSIONED FEATURE ROADMAP

### v1.0 - KILL BIORENDER (NOW)

| Feature | Library | Status | Priority |
|---------|---------|--------|----------|
| PPTX Export | pptxgenjs (MIT) | ❌ TODO | **P0** |
| Bioicons Integration | bioicons (CC0/MIT) | ❌ TODO | **P0** |
| SciDraw Integration | scidraw.io (CC-BY) | ❌ TODO | **P0** |
| Complete Pen Tool UI | Paper.js | ⚠️ WIRE UP | **P0** |
| Background Removal | @imgly/background-removal-js | ❌ TODO | **P1** |
| Unified Icon Search | Custom | ❌ TODO | **P1** |
| Complete Anatomy | Ralph Loop | ❌ TODO | **P1** |
| Complete Biology General | Ralph Loop | ❌ TODO | **P1** |

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

## SIMPLE INTERACTIVITY (v1.5)

```typescript
// Clickable regions with tooltips
interface InteractiveRegion {
  id: string;
  bounds: { x: number; y: number; width: number; height: number };
  tooltip: string;
  onClick?: () => void;
  link?: string;
}

// Add to canvas objects
fabricObject.set('interactiveData', {
  tooltip: 'Click to learn more about EGFR',
  link: 'https://en.wikipedia.org/wiki/EGFR'
});
```

---

## INPAINTING (v1.5)

```typescript
// Option 1: fal.ai (API-based)
const result = await fal.subscribe('fal-ai/flux/inpaint', {
  input: {
    image_url: originalImage,
    mask_url: maskImage,
    prompt: 'Replace with mitochondria illustration',
  },
});

// Option 2: Browser-based (future - when models get smaller)
// Using transformers.js or similar
```

---

## PEN TOOL WIRING (Paper.js)

The pen tool is installed but needs UI wiring:

```typescript
// src/lib/paper/index.ts - EXISTS
// Need to wire to: src/components/Toolbar/PenTool.tsx

// Key functionality to expose:
export interface PenToolAPI {
  startPath(): void;
  addPoint(x: number, y: number): void;
  addBezierPoint(x: number, y: number, handleIn: Point, handleOut: Point): void;
  closePath(): void;
  editNode(nodeIndex: number, position: Point): void;
  deleteNode(nodeIndex: number): void;
  convertToFabric(): fabric.Path;
}
```

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

1. **Read this file** (CLAUDE.md)
2. **Check progress**: Read `.specify/ralph-loop/progress.json`
3. **Priority 1**: PPTX export implementation
4. **Priority 2**: Background removal implementation
5. **Priority 3**: Bioicons + SciDraw integration
6. **Priority 4**: Pen tool UI wiring
7. **Priority 5**: Complete remaining 2 specialties
8. **Launch parallel agents** for all workstreams
9. **Commit frequently** with clear messages

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

---

*Last Updated: 2026-01-18 | Version: 2.1.0 - Kill BioRender Edition*

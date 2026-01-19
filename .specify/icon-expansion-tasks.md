# FINNISH Icon Library Expansion & Attribution Tasks

> **PERSISTENT TASK DOCUMENT** - This file captures all planned work for icon library expansion.
> Read this file at the start of any session working on icons or attribution.

---

## Overview

**Goal**: Expand the icon libraries to their full potential and create proper CC-BY attribution.

**Current State** (as of 2026-01-19):
- SciDraw: 60 icons implemented (source has 1,000+)
- Bioicons: 70 icons implemented (source has 2,700+)

**Target State**:
- SciDraw: 300+ icons (prioritize most useful categories)
- Bioicons: 500+ icons (prioritize most useful categories)
- Attribution page: Complete with all CC-BY credits

---

## Task 1: Create Attribution/Credits Page

**Status**: NOT STARTED
**Priority**: HIGH (required before release)
**File**: `src/pages/CreditsPage.tsx` (new)

### Requirements:
1. Create a new page component at `/credits` or `/about`
2. Include required CC-BY attributions for:
   - SciDraw icons (CC-BY) - Credit: Federico Claudi & Alex Harston, https://scidraw.io/
   - Bioicons with CC-BY license - Credit: https://bioicons.com/
   - Servier Medical Art (if any) - CC-BY 4.0, https://smart.servier.com/
3. Include recommended attributions for:
   - Tabler Icons (MIT) - https://tabler.io/icons
   - Health Icons (CC0) - https://healthicons.org/
   - Science Icons (MIT) - https://github.com/continuous-foundation/scienceicons
   - Icon Park (Apache 2.0) - https://iconpark.oceanengine.com/
   - Simple Icons (CC0) - https://simpleicons.org/
4. Add route to the app router
5. Link from main navigation/footer

### Attribution Text Template:
```
FINNISH uses the following open-source libraries and resources:

SCIENTIFIC ILLUSTRATIONS (CC-BY - Attribution Required)
--------------------------------------------------------
- SciDraw-style illustrations: Original work by Federico Claudi &
  Alex Harston. https://scidraw.io/
- Bioicons: Some icons from Bioicons. https://bioicons.com/
- Servier Medical Art: Some medical illustrations based on
  Servier Medical Art. https://smart.servier.com/

ICON LIBRARIES
--------------
- Tabler Icons (MIT): https://tabler.io/icons
- Health Icons (CC0): https://healthicons.org/
- Science Icons (MIT): https://github.com/continuous-foundation/scienceicons
- Icon Park (Apache 2.0): https://iconpark.oceanengine.com/
- Simple Icons (CC0): https://simpleicons.org/

SOFTWARE LIBRARIES
------------------
- Fabric.js (MIT): Canvas rendering engine
- Paper.js (MIT): Vector graphics library
- Rough.js (MIT): Hand-drawn graphics
- MediaPipe (Apache 2.0): Background removal
- KaTeX (MIT): LaTeX math rendering
- Mermaid (MIT): Diagram generation
- jsPDF (MIT): PDF generation
- pptxgenjs (MIT): PowerPoint export
```

---

## Task 2: Expand SciDraw Icons

**Status**: NOT STARTED
**Priority**: MEDIUM
**File**: `src/lib/icons/scidraw.ts`

### Current Categories (60 icons):
- Model Organisms (10): mouse, rat, drosophila, zebrafish, c.elegans, xenopus, macaque, ferret, marmoset
- Neuroscience (12): pyramidal neuron, purkinje cell, interneuron, synapse, brain views, hippocampus, etc.
- Lab Equipment (12): microscope, pipette, electrode, syringe, petri dish, etc.
- Scientific Setups (10): treadmill, two-photon, mazes, operant chamber, etc.
- Molecular (10): DNA, RNA, protein, lipid bilayer, ion channel, etc.
- Anatomy (8): eye, spinal cord, cochlea, muscle fiber, blood vessel, etc.

### Categories to Expand:
1. **More Model Organisms** (target +20):
   - Arabidopsis (plant)
   - E. coli (bacteria)
   - Saccharomyces (yeast)
   - Planaria
   - Hydra
   - Sea urchin
   - Chicken embryo
   - Axolotl
   - Lamprey
   - Squid

2. **More Neuroscience** (target +30):
   - More neuron types: motor neuron, sensory neuron, dopamine neuron, serotonin neuron
   - Brain regions: thalamus, amygdala, striatum, hypothalamus, cerebellum detail
   - Recording: multi-electrode array, patch pipette, calcium imaging trace
   - Circuits: feedforward, recurrent, lateral inhibition

3. **More Lab Equipment** (target +20):
   - PCR machine, gel electrophoresis, western blot
   - Incubator, hood, autoclave
   - Cryostat, microtome
   - Spectrophotometer, plate reader

4. **More Molecular** (target +20):
   - CRISPR complex, Cas9
   - Ribosome, polymerase
   - Signaling pathways icons
   - Protein domains

5. **Cell Biology** (new category, target +30):
   - Cell division stages
   - Apoptosis
   - Autophagy
   - Endocytosis/exocytosis
   - Cell migration

---

## Task 3: Expand Bioicons

**Status**: NOT STARTED
**Priority**: MEDIUM
**File**: `src/lib/icons/bioicons.ts`

### Current Categories (70 icons):
- Cell Biology (14): cell membrane, animal cell, plant cell, nucleus, mitochondria, etc.
- Molecular Biology (13): DNA helix, RNA strand, protein structure, enzyme, etc.
- Microbiology (10): bacterium, coccus, spirillum, virus, bacteriophage, etc.
- Biochemistry (10): ATP, glucose, lipid bilayer, metabolic pathway, etc.
- Laboratory (12): test tube, erlenmeyer flask, beaker, pipette, etc.
- Anatomy (11): brain, heart, lungs, liver, kidney, etc.

### Categories to Expand:
1. **More Cell Biology** (target +30):
   - More organelles: vacuole, plasmodesmata, tight junction
   - Cell processes: mitosis stages, meiosis, cytokinesis
   - Cell types: red blood cell, white blood cell, platelet, stem cell

2. **More Anatomy** (target +40):
   - Complete organ systems
   - Tissues: epithelial, connective, nervous, muscle
   - Histology: H&E stain appearances

3. **Immunology** (new category, target +20):
   - Antibodies types (IgA, IgM, IgG, IgE)
   - T cells, B cells, macrophages
   - Complement cascade
   - Cytokines

4. **Genetics** (new category, target +20):
   - Inheritance patterns
   - Punnett squares
   - Karyotypes
   - Epigenetics marks

5. **Ecology** (new category, target +15):
   - Food web diagrams
   - Population dynamics
   - Biomes
   - Carbon cycle

---

## Task 4: Icon Format Specifications

Both libraries use the same format:

```typescript
interface IconMeta {
  id: string;           // Unique kebab-case ID
  name: string;         // Human-readable name
  category: string;     // Category for grouping
  keywords: string[];   // Search keywords
  svg: string;          // SVG path content (no <svg> wrapper)
  viewBox: string;      // Always '0 0 24 24'
  license: 'CC0' | 'MIT' | 'CC-BY';
  attribution?: string; // Optional specific attribution
}
```

### SVG Guidelines:
- ViewBox: 0 0 24 24 (24x24 standard)
- Use `currentColor` for stroke and fill
- Stroke width: 1.5 for main lines, 1 for details, 0.75 for fine details
- Keep paths simple and clean
- Use semantic grouping where helpful

---

## Parallel Agent Assignment

### Agent 1: Attribution Page
- Create `src/pages/CreditsPage.tsx`
- Add route to router
- Style consistently with app
- Include all required attributions

### Agent 2: SciDraw Model Organisms
- Add 20 new model organism icons
- Follow existing format in scidraw.ts

### Agent 3: SciDraw Neuroscience
- Add 30 new neuroscience icons
- Include neuron types, brain regions, recording methods

### Agent 4: Bioicons Cell Biology & Anatomy
- Add 30 cell biology icons
- Add 40 anatomy icons

### Agent 5: Bioicons New Categories
- Add Immunology category (20 icons)
- Add Genetics category (20 icons)
- Add Ecology category (15 icons)

---

## Progress Tracking

| Task | Assigned | Status | Icons Added |
|------|----------|--------|-------------|
| Attribution Page | Agent a2b0e1e | ✅ COMPLETE | N/A |
| SciDraw Model Organisms | - | ✅ (existing) | 10 |
| SciDraw Neuroscience | Agent aa64426 | ✅ COMPLETE | +25 (37 total) |
| SciDraw Lab Equipment | - | ✅ (existing) | 12 |
| SciDraw Molecular | - | ✅ (existing) | 10 |
| SciDraw Cell Biology | Agent a4d34bd | ✅ COMPLETE | +20 new |
| SciDraw Anatomy | - | ✅ (existing) | 8 |
| Bioicons Cell Biology | - | ✅ (existing) | 14 |
| Bioicons Molecular Biology | - | ✅ (existing) | 12 |
| Bioicons Microbiology | - | ✅ (existing) | 10 |
| Bioicons Biochemistry | - | ✅ (existing) | 10 |
| Bioicons Laboratory | - | ✅ (existing) | 12 |
| Bioicons Anatomy | Agent | ✅ COMPLETE | +12 new |
| Bioicons Genetics | Agent afc54a6 | ✅ COMPLETE | +18 new |
| Bioicons Ecology | Agent a1761ba | ✅ COMPLETE | +15 new |

**FINAL TOTALS (as of 2026-01-19)**:
- SciDraw: 107 icons (up from 60)
- Bioicons: 103 icons (up from 70)
- **Grand Total: 210 scientific icons**

---

## Completion Criteria

1. Attribution page created and accessible
2. All CC-BY attributions properly displayed
3. SciDraw expanded to 180+ icons
4. Bioicons expanded to 195+ icons
5. All icons follow format specification
6. Unified search returns new icons
7. Build passes with no TypeScript errors

---

## Notes for Context Refresh

If you're resuming this work:
1. Read this file first
2. Check Progress Tracking table above
3. Pick up where the last session left off
4. Update Progress Tracking when completing tasks
5. Commit frequently with descriptive messages

**Do NOT assume** - ask the user if:
- Priorities have changed
- Specific icons are needed
- Different categories should be prioritized

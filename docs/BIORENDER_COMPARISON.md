# FINNISH vs BioRender: Comprehensive Gap Analysis

**Date:** January 19, 2026
**Purpose:** Identify competitive gaps and create roadmap to become the #1 BioRender alternative

---

## Executive Summary

| Metric | BioRender | FINNISH | Gap | Priority |
|--------|-----------|---------|-----|----------|
| **Icon Library** | 50,000+ | ~12,700 | -37,300 | **CRITICAL** |
| **Templates** | 5,000+ | 661 | -4,339 | **HIGH** |
| **Price (Academic)** | $35/month | $20-25/month | **+$10-15 savings** | ADVANTAGE |
| **PPTX Export** | Yes | Yes | None | PARITY |
| **Real-time Collaboration** | Yes | No | Missing | HIGH |
| **AI Features** | Limited | fal.ai FLUX | **Better** | ADVANTAGE |
| **Background Removal** | No | Yes (free) | **Better** | ADVANTAGE |
| **Graph/Data Viz** | Yes (new) | No | Missing | MEDIUM |
| **Poster Builder** | Yes | No | Missing | MEDIUM |
| **3D Protein Viewer** | Yes (PDB) | No | Missing | LOW |
| **Offline Editing** | No | No | Parity | - |
| **Publication License** | Paid only | Free | **Better** | ADVANTAGE |

**Bottom Line:** FINNISH has significant advantages in price, AI, and background removal. The critical gaps are **icon quantity** and **collaboration features**.

---

## 1. ICON LIBRARY GAP ANALYSIS

### Current State

| Library | FINNISH Count | Available | Gap | Source |
|---------|---------------|-----------|-----|--------|
| Tabler Icons | 4,000+ | 4,000+ | 0 | Fully integrated |
| Health Icons | 1,500+ | 1,500+ | 0 | Fully integrated |
| Science Icons | 500+ | 500+ | 0 | Fully integrated |
| Icon Park | 2,400+ | 2,400+ | 0 | Fully integrated |
| Simple Icons | 200+ | 200+ | 0 | Fully integrated |
| **Bioicons** | **1,548** | **2,804** | **-1,256** | bioicons.com |
| **SciDraw** | **159** | **~1,200+** | **-1,041** | scidraw.io |
| **TOTAL** | **~10,307** | **~12,604** | **-2,297** | - |

### The "SciDraw Problem" (You mentioned "SkyDraw" - I believe you meant SciDraw)

**Issue:** SciDraw integration has only **159 icons** when scidraw.io offers **1,200+ high-quality scientific illustrations**.

**Why this matters:**
- SciDraw has the most detailed **model organism** illustrations (mice, flies, zebrafish, C. elegans)
- SciDraw has professional **neuroscience** illustrations (brain regions, neural circuits, recording setups)
- SciDraw has **lab equipment** and experimental setup illustrations
- These are exactly what researchers need for publications

**Solution:** Expand SciDraw library from 159 → 1,200+ icons

### Bioicons Gap

**Issue:** We have 1,548 out of 2,804 available Bioicons (55% coverage)

**Missing categories needing expansion:**
- Machine Learning (neural networks, AI diagrams)
- Chemo- and Bioinformatics (pipelines, databases)
- Extracellular matrix (collagen, fibronectin)
- Molecular modelling (protein structures, binding sites)
- Nanotechnology (nanoparticles, delivery systems)
- Parasites (malaria, trypanosomes)
- Scientific graphs (chart types, data viz)

---

## 2. FEATURE GAP ANALYSIS

### Critical Missing Features (Must Have)

#### 2.1 Real-Time Collaboration
**BioRender has:** Shared folders, commenting, team editing, version history

**FINNISH impact:** Cannot compete for lab/team subscriptions without this

**Solution Options:**
| Option | Library | Complexity | Cost |
|--------|---------|------------|------|
| Yjs + WebRTC | `y-js`, `y-webrtc` | Medium | Free (P2P) |
| Yjs + WebSocket | `y-websocket` | Medium-High | Server costs |
| Liveblocks | `@liveblocks/react` | Low | $0.15/MAU |
| Partykit | `partykit` | Medium | $0-20/month |
| Supabase Realtime | `@supabase/realtime` | Medium | Free tier |

**Recommendation:** Start with **Yjs + Supabase** for cost-effective real-time sync

#### 2.2 Commenting System
**BioRender has:** In-canvas comments, threaded discussions, @mentions

**Solution:** Implement annotation layer with threaded comments stored in project metadata

### High Priority Missing Features

#### 2.3 Graph/Data Visualization Tool
**BioRender has:** New feature for creating publication-ready graphs with presets

**Our advantage:** We already have Mermaid for diagrams

**Solution:** Integrate a charting library
| Option | License | Features |
|--------|---------|----------|
| Chart.js | MIT | Simple, lightweight |
| Recharts | MIT | React-native, composable |
| D3.js | ISC | Full control, complex |
| Plotly.js | MIT | Scientific charts, 3D |

**Recommendation:** Use **Plotly.js** for scientific chart types (scatter, heatmaps, error bars)

#### 2.4 Poster Builder
**BioRender has:** Drag-and-drop poster templates, landscape/portrait, grid layouts

**Solution:** Add poster presets to canvas system
- A0, A1, A2, A3 poster sizes
- Multi-panel grid layouts
- Text block templates (Title, Authors, Abstract, Methods, Results, Conclusion)
- Automatic scaling for print

### Medium Priority Missing Features

#### 2.5 Drawing Tools (Membranes, Cell Layers, DNA)
**BioRender has:** Specialized drawing tools for biological structures

**Our current state:** Generic pen tool with Paper.js

**Solution:** Create specialized shape generators:
```typescript
// Membrane generator
createCellMembrane(width, height, phospholipidDensity)

// DNA helix generator
createDNAHelix(length, basePairs, style)

// Cell layer generator
createCellLayer(cellCount, rows, cellType)
```

#### 2.6 3D Protein Visualization
**BioRender has:** PDB file import, 3D structure display

**Solution Options:**
| Option | License | Features |
|--------|---------|----------|
| 3Dmol.js | BSD-3 | Lightweight, PDB support |
| NGL Viewer | MIT | Full featured, RCSB integration |
| Mol* | MIT | Modern, WebGPU ready |

**Recommendation:** Integrate **3Dmol.js** for basic PDB viewing in v2.0

### Low Priority / v3.0 Features

- Institution SSO (enterprise feature)
- Brand asset management
- Custom icon requests
- API access for programmatic figure generation

---

## 3. COMPETITIVE ADVANTAGES TO EMPHASIZE

### 3.1 Price Leadership
| Plan | BioRender | FINNISH | Savings |
|------|-----------|---------|---------|
| Academic Individual | $35/month | $20/month | $180/year |
| Industry Individual | $79/month | $40/month | $468/year |
| Lab (5 users) | $99/month | $75/month | $288/year |

### 3.2 AI Image Generation (BioRender doesn't have this level)
- fal.ai FLUX integration: $0.008/image
- Custom scientific diagram prompts
- Style presets (clean, detailed, sketch)
- **Users can generate ~2,500 images/month within subscription**

### 3.3 Background Removal (BioRender doesn't have this)
- Browser-based, zero server cost
- MediaPipe ML model, Apache 2.0 licensed
- Complete privacy (images never leave browser)
- <1 second processing

### 3.4 No Publication License Fee
- BioRender requires paid subscription to publish
- FINNISH: All exports are publication-ready, no extra fees

### 3.5 SVG Export on All Plans
- BioRender restricts SVG/EPS to premium plans
- FINNISH: Full vector export for everyone

---

## 4. IMPLEMENTATION ROADMAP

### Phase 1: Icon Library Expansion (2 weeks)

#### Week 1: SciDraw Expansion
**Goal:** 159 → 1,200+ icons

**Tasks:**
1. Scrape/download all SciDraw illustrations from scidraw.io
2. Convert to consistent SVG format (24x24 viewBox)
3. Categorize and add keywords
4. Update `src/lib/icons/scidraw.ts`
5. Test unified search integration

**Categories to add:**
- Expanded model organisms (primates, ferrets, axolotl)
- Brain atlases (mouse, human, rat)
- Electrophysiology equipment
- Behavioral testing setups
- Surgical instruments
- Histology/microscopy

#### Week 2: Bioicons Completion
**Goal:** 1,548 → 2,804 icons (100% coverage)

**Tasks:**
1. Clone bioicons GitHub repo
2. Identify missing icons by category
3. Process and import remaining 1,256 icons
4. Update `src/lib/icons/bioicons-data.ts`
5. Verify all 37 categories represented

### Phase 2: Collaboration MVP (3 weeks)

#### Week 3-4: Real-Time Sync Foundation
1. Set up Yjs for CRDT-based collaboration
2. Integrate with Supabase Realtime or WebSocket
3. Implement cursor presence (see who's editing)
4. Add basic conflict resolution

#### Week 5: Collaboration UI
1. Invite link generation
2. User presence indicators
3. Comment overlay system
4. Share dialog with permissions

### Phase 3: Data Visualization (2 weeks)

#### Week 6: Chart Integration
1. Integrate Plotly.js
2. Create scientific chart presets:
   - Scatter plots with error bars
   - Bar charts with significance markers
   - Heatmaps for expression data
   - Survival curves (Kaplan-Meier)

#### Week 7: Chart-to-Canvas Bridge
1. Export charts as SVG
2. Import into Fabric.js canvas
3. Style customization (colors, fonts)
4. Data table editor

### Phase 4: Poster Builder (2 weeks)

#### Week 8: Poster Templates
1. Add poster size presets (A0-A3)
2. Create grid layout system
3. Add text block templates

#### Week 9: Poster Polish
1. Auto-numbering for figures
2. Reference list component
3. Logo/affiliation placement
4. Export at print resolution (300 DPI)

### Phase 5: Specialized Drawing Tools (2 weeks)

#### Week 10: Biological Shape Generators
1. Cell membrane generator (phospholipid bilayer)
2. DNA/RNA helix generator
3. Cell layer/tissue generator
4. Pathway arrow styles

#### Week 11: Tool Polish
1. Add to toolbar UI
2. Customization panels
3. Preset styles library
4. Documentation

---

## 5. SOLUTION FOR SCIDRAW PROBLEM

### Immediate Actions

#### Option A: Bulk Import from scidraw.io (Recommended)
```bash
# The scidraw.io repository is on GitHub
git clone https://github.com/SciDraw/scidraw-database

# Icons are stored as SVG files organized by category
# Process and convert to FINNISH format
```

**Process:**
1. Download all SVG files from scidraw.io repository
2. Create processing script to:
   - Normalize viewBox to 24x24
   - Extract metadata (name, category, keywords)
   - Ensure consistent stroke/fill styling
3. Generate TypeScript definitions
4. Update unified search

#### Option B: API Integration
- scidraw.io may have an API for icon search
- Implement lazy loading from their CDN
- Cache locally after first use

#### Option C: Manual Curation (Slowest but highest quality)
- Hand-pick the most useful 500 icons
- Ensure perfect quality and categorization
- Add FINNISH-specific keywords

### Recommended Approach: Option A + C Hybrid
1. Bulk import all 1,200+ icons (Option A)
2. Hand-curate top 200 for "featured" status (Option C)
3. Add quality ratings from user feedback

---

## 6. QUICK WINS (Can implement this week)

| Feature | Effort | Impact | Priority |
|---------|--------|--------|----------|
| Complete SciDraw import | 2 days | High | **DO NOW** |
| Complete Bioicons import | 1 day | Medium | **DO NOW** |
| Add poster size presets | 4 hours | Medium | This week |
| Add membrane drawing tool | 1 day | High | This week |
| DNA helix generator | 1 day | High | This week |
| Chart.js basic integration | 2 days | Medium | This week |

---

## 7. SUCCESS METRICS

### Icon Library
- **Target:** 15,000+ icons by end of Q1
- **Measure:** Total searchable icons in unified search

### User Acquisition
- **Target:** 10,000 free users in first 3 months
- **Measure:** Sign-ups, active monthly users

### Feature Parity
- **Target:** Match BioRender core features by Q2
- **Measure:** Feature checklist completion

### Customer Satisfaction
- **Target:** NPS > 50
- **Measure:** User surveys, support tickets

---

## 8. CONCLUSION

FINNISH has a strong foundation with key advantages over BioRender:
- **Better pricing** ($20 vs $35)
- **Better AI** (fal.ai FLUX generation)
- **Better privacy** (browser-based background removal)
- **Better licensing** (no publication fees)

The critical gaps to close:
1. **Icon library** - Expand from ~10,000 to 15,000+ (especially SciDraw)
2. **Collaboration** - Add real-time editing for teams
3. **Data visualization** - Add scientific charting
4. **Poster builder** - Add poster templates and sizes
5. **Specialized tools** - Add membrane, DNA, cell layer generators

**With these improvements, FINNISH will not just match BioRender - it will surpass it.**

---

*Analysis prepared: January 19, 2026*
*Next review: After Phase 1 completion*

# FINN-005: Domain-Specific Template Libraries

## Status
**Draft** | Priority: P1 | Effort: Large

## Overview
Provide comprehensive libraries of scientific symbols, templates, and pre-built components organized by academic domain. These accelerate illustration creation by offering professionally-designed, scientifically-accurate building blocks.

## User Stories

### US-1: Symbol Library Access
> As a biology researcher, I want to drag-and-drop cell organelles onto my canvas so that I can quickly build cellular diagrams.

**Acceptance Criteria:**
- Organized symbol browser by domain
- Search functionality across all symbols
- Preview before insertion
- Symbols are fully editable after placement
- Recent/favorite symbols for quick access

### US-2: Template Starting Points
> As a user creating a flowchart, I want to start from a template so that I don't have to build common structures from scratch.

**Acceptance Criteria:**
- Template gallery with previews
- Templates for common diagram types
- Customizable placeholders
- Style variations per template
- Community-contributed templates

### US-3: Consistent Styling
> As a user, I want all symbols in a domain to have consistent visual style so that my diagrams look professional.

**Acceptance Criteria:**
- Coherent color palettes per domain
- Consistent line weights and proportions
- Style presets (minimal, detailed, colorful)
- Global style overrides

### US-4: Scientific Accuracy
> As a medical professional, I want anatomical symbols to be accurate so that my educational materials are trustworthy.

**Acceptance Criteria:**
- Symbols reviewed for accuracy
- Citations/references where applicable
- Version control for corrections
- Accuracy badges/ratings

## Domain Libraries

### Biology
- **Cell Biology**: Membranes, organelles, cytoskeleton
- **Molecular Biology**: DNA, RNA, proteins, enzymes
- **Genetics**: Chromosomes, inheritance diagrams, pedigrees
- **Ecology**: Food webs, ecosystems, populations
- **Anatomy**: Organ systems, tissues, body regions

### Chemistry
- **Organic**: Molecular structures, reaction mechanisms
- **Inorganic**: Crystal structures, coordination compounds
- **Biochemistry**: Amino acids, carbohydrates, lipids
- **Lab Equipment**: Glassware, instruments, setups

### Physics
- **Mechanics**: Forces, vectors, motion diagrams
- **Electromagnetism**: Circuits, fields, waves
- **Optics**: Lenses, mirrors, ray diagrams
- **Quantum**: Energy levels, orbitals, particles

### Medicine
- **Anatomy**: Detailed organ systems
- **Pathology**: Disease processes, abnormalities
- **Pharmacology**: Drug interactions, mechanisms
- **Procedures**: Surgical techniques, clinical workflows

### Mathematics
- **Geometry**: Shapes, constructions, proofs
- **Graphs**: Function plots, data visualizations
- **Diagrams**: Venn, tree, network structures

### General Scientific
- **Flowcharts**: Process flows, decision trees
- **Timelines**: Historical, experimental sequences
- **Comparisons**: Before/after, side-by-side
- **Infographics**: Data presentation, statistics

## Technical Design

### Library Structure
```
libraries/
├── biology/
│   ├── cell/
│   │   ├── nucleus.svg
│   │   ├── mitochondria.svg
│   │   ├── membrane.svg
│   │   └── metadata.json
│   ├── molecular/
│   └── anatomy/
├── chemistry/
├── physics/
└── templates/
    ├── flowchart-basic.json
    ├── pathway-horizontal.json
    └── comparison-split.json
```

### Symbol Metadata
```typescript
interface SymbolMetadata {
  id: string;
  name: string;
  domain: string;
  category: string;
  tags: string[];
  description: string;
  source?: string;  // Citation
  accuracy?: 'verified' | 'community' | 'unverified';
  variants?: string[];  // Alternative versions
  relatedSymbols?: string[];
}
```

### Template Format
```typescript
interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  preview: string;  // Thumbnail URL
  canvas: CanvasState;
  placeholders: Placeholder[];
  styles: StylePreset[];
}

interface Placeholder {
  id: string;
  type: 'text' | 'symbol' | 'image';
  label: string;
  defaultValue?: any;
  constraints?: PlaceholderConstraints;
}
```

### Core Components

#### LibraryManager
```typescript
class LibraryManager {
  private libraries: Map<string, Library>;

  getLibraries(): Library[];
  getSymbols(domain: string, category?: string): Symbol[];
  searchSymbols(query: string, filters?: SearchFilters): Symbol[];
  getTemplates(category?: string): Template[];
  loadSymbol(id: string): Promise<fabric.Object>;
}
```

#### SymbolBrowser
```typescript
interface SymbolBrowserProps {
  onSelect: (symbol: Symbol) => void;
  domain?: string;
  searchQuery?: string;
}

// React component for browsing/searching symbols
const SymbolBrowser: React.FC<SymbolBrowserProps>;
```

#### TemplateApplier
```typescript
class TemplateApplier {
  applyTemplate(template: Template, canvas: fabric.Canvas): void;
  fillPlaceholder(id: string, value: any): void;
  applyStylePreset(preset: StylePreset): void;
}
```

## UI/UX Design

### Symbol Panel
```
+---------------------------+
|  Symbols              [x] |
+---------------------------+
|  [Search symbols...]      |
+---------------------------+
|  Domains:                 |
|  [Biology] [Chemistry]    |
|  [Physics] [Medicine]     |
+---------------------------+
|  > Cell Biology           |
|    [nucleus] [mito]       |
|    [membrane] [ribo]      |
|  > Molecular              |
|  > Anatomy                |
+---------------------------+
|  Recently Used:           |
|  [sym1] [sym2] [sym3]     |
+---------------------------+
```

### Template Gallery
```
+------------------------------------------------+
|  Templates                                      |
+------------------------------------------------+
|  Categories: [All] [Flowchart] [Pathway] [...]  |
+------------------------------------------------+
|  +----------+  +----------+  +----------+       |
|  |          |  |          |  |          |       |
|  | Flowchart|  | Cell     |  | Timeline |       |
|  | Basic    |  | Pathway  |  | Horiz    |       |
|  +----------+  +----------+  +----------+       |
|                                                 |
|  +----------+  +----------+  +----------+       |
|  | Comparison|  | Cycle    |  | Hierarchy|      |
|  +----------+  +----------+  +----------+       |
+------------------------------------------------+
```

## Content Pipeline

### Symbol Creation Guidelines
1. Design in vector format (SVG)
2. Use consistent artboard sizes
3. Apply standard color palette
4. Include metadata JSON
5. Review for scientific accuracy
6. Create size variants if needed

### Quality Assurance
- Domain expert review for accuracy
- Visual consistency check
- Accessibility audit (color contrast)
- Performance test (file size, complexity)

## Community Contributions

### Submission Process
1. Fork template repository
2. Add symbols following guidelines
3. Include metadata and sources
4. Submit pull request
5. Review by maintainers + domain expert
6. Merge and deploy to CDN

### Licensing
- Core library: CC BY 4.0
- Community contributions: CC BY-SA 4.0
- Attribution required but modification allowed

## Dependencies
- CDN for symbol hosting
- Search index (Algolia/MeiliSearch)
- Git-based version control for library

## Testing Strategy
- Unit tests for LibraryManager methods
- Visual tests for symbol rendering
- Integration tests for template application
- Load tests for large libraries

## Metrics
- Symbol usage frequency
- Search query patterns
- Template completion rates
- Community contribution velocity

## Open Questions
1. How to handle conflicting symbol styles?
2. Versioning strategy for symbol updates?
3. Offline access to symbol libraries?
4. Monetization of premium symbol packs?

## References
- [BioRender Icon Library](https://biorender.com/)
- [Font Awesome (Icon design patterns)](https://fontawesome.com/)
- [Noun Project](https://thenounproject.com/)

# FINN-003: Import External Infographics

## Status
**Draft** | Priority: P1 | Effort: Medium

## Overview
Enable users to import existing infographics from external sources (images, SVGs, PDFs) and convert them into editable FINNISH canvas objects. This allows users to build upon existing work rather than starting from scratch.

## User Stories

### US-1: SVG Import
> As a user, I want to import SVG files so that I can edit existing vector graphics.

**Acceptance Criteria:**
- Drag-and-drop SVG files onto canvas
- Preserve all paths, shapes, and groups
- Maintain original colors and styles
- Support complex SVGs (nested groups, transforms)
- Handle embedded fonts gracefully

### US-2: Image Import with Vectorization
> As a user, I want to import raster images and optionally vectorize them so that I can work with non-vector sources.

**Acceptance Criteria:**
- Support PNG, JPG, WebP formats
- Image placed as embedded object
- Optional AI-powered vectorization
- Manual tracing tools for precision
- Preserve original as reference layer

### US-3: PDF Import
> As a user, I want to import figures from PDF papers so that I can recreate or modify them.

**Acceptance Criteria:**
- Extract vector content from PDFs
- Support multi-page PDFs with page selection
- Preserve text as editable text objects
- Handle embedded fonts
- Rasterize complex elements gracefully

### US-4: BioRender/Napkin Import
> As a user switching from BioRender or Napkin, I want to import my existing work so that I don't have to start over.

**Acceptance Criteria:**
- Accept exported SVG/PNG from these tools
- AI-assisted reconstruction of editable elements
- Map to equivalent FINNISH templates where possible
- Preserve layout and relationships

## Technical Design

### Import Pipeline
```
File Input --> Format Detector --> Parser --> Normalizer --> Canvas Objects
                                     |
                                     v
                              AI Enhancement (optional)
                                     |
                                     v
                              Object Recognition
```

### Supported Formats

| Format | Parser | Editable | Notes |
|--------|--------|----------|-------|
| SVG | svg.js | Full | Native support |
| PNG/JPG | Canvas API | Limited | Raster only, optional vectorize |
| PDF | pdf.js | Partial | Vector extraction |
| AI/EPS | External lib | Full | Adobe Illustrator files |

### Core Components

#### ImportManager
```typescript
interface ImportOptions {
  vectorize?: boolean;
  preserveText?: boolean;
  targetLayer?: string;
  scale?: number;
}

class ImportManager {
  async importFile(file: File, options?: ImportOptions): Promise<ImportResult>;
  async importFromURL(url: string, options?: ImportOptions): Promise<ImportResult>;
  detectFormat(file: File): FileFormat;
}

interface ImportResult {
  objects: fabric.Object[];
  warnings: string[];
  originalSize: { width: number; height: number };
}
```

#### SVGParser
```typescript
class SVGParser {
  parse(svgString: string): ParsedSVG;
  toFabricObjects(parsed: ParsedSVG): fabric.Object[];
  optimizePaths(objects: fabric.Object[]): fabric.Object[];
}
```

#### Vectorizer
```typescript
interface VectorizeOptions {
  colorMode: 'color' | 'grayscale' | 'monochrome';
  pathSimplification: number; // 0-100
  minAreaThreshold: number;
}

class Vectorizer {
  async vectorize(image: ImageData, options?: VectorizeOptions): Promise<fabric.Path[]>;
}
```

### AI Enhancement

For complex imports, the AI agent can:
1. Recognize scientific symbols and replace with library versions
2. Identify diagram types and suggest appropriate templates
3. Extract text from images using OCR
4. Reconstruct relationships between elements

## UI/UX Design

### Import Dialog
```
+----------------------------------------+
|  Import File                      [X]  |
+----------------------------------------+
|  [Drop files here or click to browse]  |
|                                        |
|  Detected: SVG Vector Graphic          |
|                                        |
|  Options:                              |
|  [ ] Vectorize embedded images         |
|  [x] Preserve text as editable         |
|  [ ] Run AI enhancement                |
|                                        |
|  Scale: [100%  v]                      |
|                                        |
|  [Cancel]              [Import]        |
+----------------------------------------+
```

### Drag-and-Drop Zone
- Full canvas becomes drop zone when dragging
- Visual feedback showing valid drop area
- Progress indicator for large files
- Preview thumbnail before confirming

## Dependencies
- pdf.js for PDF parsing
- potrace/imagetracerjs for vectorization
- Tesseract.js for OCR (optional)
- Fabric.js for canvas integration

## Testing Strategy
- Unit tests for each parser
- Integration tests with sample files of each format
- Visual comparison tests for import fidelity
- Performance tests for large files (50MB+)

## Security Considerations
- Sanitize SVG content (remove scripts, event handlers)
- Validate file headers match declared type
- Limit maximum file size
- Sandbox PDF parsing

## Open Questions
1. How to handle fonts not available in browser?
2. Should we support direct URL imports?
3. License implications of importing copyrighted content?

## References
- [SVG Specification](https://www.w3.org/TR/SVG2/)
- [PDF.js Documentation](https://mozilla.github.io/pdf.js/)
- [Potrace Algorithm](http://potrace.sourceforge.net/)

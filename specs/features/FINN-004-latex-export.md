# FINN-004: LaTeX/TikZ Export

## Status
**Draft** | Priority: P0 | Effort: Medium

## Overview
Export illustrations directly to LaTeX-compatible formats, primarily TikZ. This enables seamless integration with academic papers, ensuring figures match document styling and can be version-controlled alongside manuscript source.

## User Stories

### US-1: Basic TikZ Export
> As an academic writing in LaTeX, I want to export my illustration as TikZ code so that I can include it directly in my paper.

**Acceptance Criteria:**
- Export produces valid TikZ code
- Code compiles without errors in standard LaTeX setup
- Visual output matches canvas appearance
- Reasonable code readability and organization

### US-2: Style Matching
> As a user, I want my exported figure to match my document's style so that it looks consistent with the rest of my paper.

**Acceptance Criteria:**
- Export respects document font settings
- Colors can map to LaTeX color definitions
- Line widths match document conventions
- Support for both `article` and `beamer` classes

### US-3: Equation Integration
> As a user including equations in my figure, I want them to render properly in LaTeX so that math notation is consistent.

**Acceptance Criteria:**
- Equations export as LaTeX math mode
- Support for both inline and display math
- Preserve equation positions relative to graphics
- Handle special symbols and operators

### US-4: Multiple Export Formats
> As a user, I want to choose between different export formats so that I can use whatever my workflow requires.

**Acceptance Criteria:**
- TikZ (primary)
- PGFPlots (for data visualizations)
- Standalone SVG with LaTeX text
- PDF with embedded fonts
- PNG at specified DPI

## Technical Design

### Export Pipeline
```
Canvas State --> Object Analyzer --> TikZ Generator --> Code Formatter --> Output
                      |                    |
                      v                    v
               Optimization          Style Mapper
               (simplify paths)      (colors, fonts)
```

### TikZ Code Structure
```latex
\begin{tikzpicture}[scale=1]
  % Styles
  \tikzset{
    finnish-fill/.style={fill=#1, fill opacity=0.8},
    finnish-stroke/.style={draw=#1, line width=0.5pt},
  }

  % Background elements
  \fill[finnish-fill=blue!20] (0,0) rectangle (10,8);

  % Main content
  \draw[finnish-stroke=black] (2,3) -- (5,6);
  \node at (4,5) {Label};

  % Foreground elements
  \draw[thick, ->] (0,0) -- (10,0) node[right] {$x$};
\end{tikzpicture}
```

### Core Components

#### TikZExporter
```typescript
interface ExportOptions {
  scale?: number;
  standalone?: boolean;
  colorScheme?: 'rgb' | 'cmyk' | 'named';
  fontFamily?: string;
  includeComments?: boolean;
  optimizePaths?: boolean;
}

class TikZExporter {
  export(canvas: fabric.Canvas, options?: ExportOptions): TikZOutput;
  exportObject(obj: fabric.Object): string;
  generatePreamble(options: ExportOptions): string;
}

interface TikZOutput {
  code: string;
  preamble: string;
  requiredPackages: string[];
  warnings: string[];
}
```

#### PathConverter
```typescript
class PathConverter {
  fabricPathToTikZ(path: fabric.Path): string;
  simplifyPath(path: fabric.Path, tolerance: number): fabric.Path;
  optimizeBeziers(path: fabric.Path): fabric.Path;
}
```

#### StyleMapper
```typescript
interface TikZStyle {
  fill?: string;
  draw?: string;
  lineWidth?: string;
  lineCap?: string;
  lineJoin?: string;
  opacity?: number;
}

class StyleMapper {
  fabricStyleToTikZ(obj: fabric.Object): TikZStyle;
  colorToLaTeX(color: string, scheme: string): string;
  fontToLaTeX(fontFamily: string, fontSize: number): string;
}
```

### Object Mapping

| Fabric.js | TikZ Equivalent |
|-----------|-----------------|
| fabric.Rect | `\draw ... rectangle ...` |
| fabric.Circle | `\draw ... circle ...` |
| fabric.Ellipse | `\draw ... ellipse ...` |
| fabric.Line | `\draw ... -- ...` |
| fabric.Path | `\draw ... path commands ...` |
| fabric.Text | `\node {...}` |
| fabric.Group | `\begin{scope}...\end{scope}` |
| fabric.Image | `\node {\includegraphics{...}}` |

### Path Command Translation
```
Fabric.js M x y    --> TikZ (x, y)
Fabric.js L x y    --> TikZ -- (x, y)
Fabric.js C ... xy --> TikZ .. controls ... .. (x, y)
Fabric.js Q ... xy --> TikZ quadratic bezier
Fabric.js Z        --> TikZ -- cycle
```

## UI/UX Design

### Export Dialog
```
+----------------------------------------+
|  Export to LaTeX                  [X]  |
+----------------------------------------+
|  Format: [TikZ           v]            |
|                                        |
|  Options:                              |
|  [x] Standalone document               |
|  [x] Include comments                  |
|  [ ] Optimize paths                    |
|                                        |
|  Color scheme: [RGB        v]          |
|  Scale: [1.0    ]                      |
|                                        |
|  Preview:                              |
|  +----------------------------------+  |
|  | \begin{tikzpicture}              |  |
|  |   \draw (0,0) -- (1,1);          |  |
|  | \end{tikzpicture}                |  |
|  +----------------------------------+  |
|                                        |
|  [Copy to Clipboard]  [Download .tex]  |
+----------------------------------------+
```

### Live Preview
- Side-by-side view of canvas and rendered TikZ
- Real-time updates as user makes changes
- Highlight corresponding code when selecting objects

## Dependencies
- No external dependencies for export
- Optional: LaTeX installation for preview rendering
- Optional: pdf2svg for preview display

## Testing Strategy
- Unit tests for each object type conversion
- Integration tests comparing visual output
- Compatibility tests across LaTeX distributions
- Roundtrip tests (export then re-import)

## LaTeX Package Requirements
Generated code will require:
```latex
\usepackage{tikz}
\usepackage{xcolor}
\usetikzlibrary{shapes, arrows, positioning}
% Optional for advanced features:
\usetikzlibrary{calc, backgrounds, fit}
```

## Open Questions
1. How to handle unsupported features (blur, complex gradients)?
2. Should we support PSTricks as alternative to TikZ?
3. How to handle coordinate precision (floating point issues)?

## References
- [TikZ/PGF Manual](https://tikz.dev/)
- [LaTeX Color Names](https://www.latextemplates.com/svgnames-colors)
- [Overleaf TikZ Tutorials](https://www.overleaf.com/learn/latex/TikZ_package)

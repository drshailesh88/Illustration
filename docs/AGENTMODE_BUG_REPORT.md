# AgentMode Bug Report

**Test Date:** 2026-01-20
**Tester:** Dr. Chen (Researcher for Nature review paper)
**Test Environment:** http://localhost:5173/agent

---

## Executive Summary

**CRITICAL FINDING:** AgentMode does NOT use real AI generation. It uses **hardcoded SVG templates** with simple keyword matching. The "AI-powered diagram generation" feature is misleading and non-functional.

---

## Test Results

### 1. AI Generation Mechanism: ❌ FAILED

**What was tested:**
- Prompt: "Create an EGFR signaling pathway diagram"
- Expected: Real AI generation using fal.ai or similar service
- Actual: **Hardcoded SVG template returned**

**Code Analysis (`src/pages/AgentMode/AgentMode.tsx:201-236`):**

```typescript
const generateDiagramFromPrompt = (prompt: string): { text: string; diagram: string } => {
  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes('consort') || lowerPrompt.includes('trial')) {
    return {
      text: "I've created a CONSORT flow diagram...",
      diagram: generateConsortDiagram()  // HARDCODED SVG
    };
  }

  if (lowerPrompt.includes('forest') || lowerPrompt.includes('meta')) {
    return {
      text: "Here's a forest plot...",
      diagram: generateForestPlot()  // HARDCODED SVG
    };
  }

  if (lowerPrompt.includes('pathway') || lowerPrompt.includes('signaling')) {
    return {
      text: "I've created a signaling pathway diagram...",
      diagram: generatePathwayDiagram()  // HARDCODED MAPK/ERK template
    };
  }

  // Falls through to generic template for EGFR-specific prompts
  return {
    text: "I've created a diagram based on your description...",
    diagram: generateGenericDiagram()
  };
};
```

**Issues:**
- NO fal.ai integration (confirmed with grep search)
- NO OpenAI integration
- NO actual AI API calls
- Only 5 hardcoded templates (CONSORT, Forest Plot, Pathway, Flowchart, Generic)
- Keyword matching is too simplistic
- **"EGFR" keyword doesn't match "pathway" → returns generic 3-box diagram**
- Same input always produces identical output (no randomness or variation)

---

### 2. Template Gallery: ✅ WORKS

**What works:**
- Left sidebar displays 4 categories: Medicine, Biology, Chemistry, General
- 11 templates available (3 Medicine, 3 Biology, 2 Chemistry, 3 General)
- Clicking template populates prompt input field
- Search/filter functionality works
- Collapsible sidebar works

**Templates available:**
- Medicine: CONSORT, PRISMA, Forest Plot
- Biology: Pathway, Cell Diagram, Phylogenetic Tree
- Chemistry: Reaction Scheme, Molecular Structure
- General: Flowchart, Table, Timeline, Venn Diagram

---

### 3. Prompt Input: ✅ WORKS

**What works:**
- Multi-line textarea with auto-expansion
- Enter to send, Shift+Enter for newline
- Loading state shows spinner
- Stop button can cancel "generation" (just clears timeout)
- Placeholder text: "Describe the diagram you want to create..."

---

### 4. Chat History: ✅ WORKS

**What works:**
- User messages (right-aligned, blue background)
- AI responses (left-aligned, gray background)
- Timestamps on messages
- Diagrams display inline with messages
- Auto-scroll to bottom on new messages
- Welcome screen with prompt suggestions
- Typing indicator during "generation"

---

### 5. Diagram Preview: ✅ WORKS

**What works:**
- Right preview pane shows current diagram
- Zoom controls (25% - 400%)
- Close button to hide preview
- Responsive design (hidden on mobile)

---

### 6. Diagram Actions: ✅ PARTIAL

**What works:**
- **Download as SVG**: ✅ Creates Blob and downloads file
- **Download as PNG**: ✅ Renders SVG to canvas, exports as PNG
- **Copy SVG**: ✅ Copies to clipboard, shows "Copied!" confirmation
- **Regenerate**: ⚠️ **WORKS but produces IDENTICAL output** (runs same template function again)
- **Send to Editor**: ❌ **DOESN'T WORK** (see below)

---

### 7. Send to Editor: ❌ CRITICAL FAILURE

**What was tested:**
- Click "Send to Editor" button on generated diagram
- Expected: Navigate to `/editor/:id` with diagram loaded
- Actual: **Nothing happens**

**Root Cause 1: No callback wired (`src/App.tsx:48`)**

```typescript
// App.tsx - AgentMode mounted WITHOUT props
<Route path="/agent" element={<AgentMode />} />
```

```typescript
// AgentMode.tsx:239 - Expects onSendToEditor prop
interface AgentModeProps {
  onSendToEditor?: (svg: string) => void;
}

export const AgentMode: React.FC<AgentModeProps> = ({ onSendToEditor }) => {
  // ...
  const handleSendToEditor = useCallback((svg: string) => {
    if (onSendToEditor) {
      onSendToEditor(svg);  // NEVER CALLED - prop undefined!
    }
  }, [onSendToEditor]);
```

**Root Cause 2: No diagram persistence logic**

Even if the callback was wired, there's no logic to:
1. Save the SVG diagram to localStorage (expected format: `finnish-diagram-{id}`)
2. Generate a unique diagram ID
3. Navigate to `/editor/{id}`

**EditorMode expects diagrams in localStorage (`src/pages/EditorMode/EditorMode.tsx:401-435`):**

```typescript
const loadDiagram = useCallback(async (diagramId: string) => {
  try {
    // Try to load from localStorage
    const stored = localStorage.getItem(`finnish-diagram-${diagramId}`);

    if (stored) {
      const diagramData = JSON.parse(stored);

      if (canvasRef.current) {
        await canvasRef.current.loadFromJSON(diagramData.canvas);
        // ...
      }
    }
  } catch (error) {
    // ...
  }
}, [navigate, setLoading, showToast]);
```

**Expected data format:**

```typescript
{
  name: string;
  canvas: fabric.Canvas.toJSON();
  metadata?: any;
}
```

**But AgentMode only has raw SVG strings, not Fabric.js JSON!**

---

### 8. Console Errors: ✅ NONE

During code analysis, no obvious console errors were found. The UI should render without crashes.

---

### 9. Responsive Design: ✅ WORKS

**What works:**
- Template gallery collapses on screens < 1200px
- Both sidebar and preview pane hide on screens < 992px
- Chat container padding adjusts on mobile

---

## Critical Bugs Summary

| Bug | Severity | Impact |
|-----|----------|--------|
| No real AI generation | **P0** | Misleading feature, doesn't work as advertised |
| Send to Editor broken | **P0** | Can't edit AI-generated diagrams |
| Limited template variety | **P1** | Only 5 hardcoded templates |
- Regenerate produces identical output | **P1** | No variation, defeats purpose |
- No EGFR-specific template | **P2** | Fallback to generic 3-box diagram |

---

## What Works Well

1. ✅ Template gallery with categories and search
2. ✅ Prompt input with keyboard shortcuts
3. ✅ Chat history with timestamps
4. ✅ Diagram preview with zoom
5. ✅ Download as SVG/PNG
6. ✅ Copy SVG to clipboard
7. ✅ Responsive layout
8. ✅ Loading states and animations
9. ✅ Clean, professional UI design

---

## Required Fixes for v1.0

### Fix 1: Implement Real AI Generation

**Option A: Integrate fal.ai FLUX Turbo**

```typescript
// Install: npm install @fal-ai/serverless-client
import * as fal from '@fal-ai/serverless-client';

const generateDiagramFromPrompt = async (prompt: string): Promise<string> => {
  try {
    const result = await fal.subscribe('fal-ai/flux/schnell', {
      input: {
        prompt: `Scientific diagram of ${prompt}, clean vector style`,
        image_size: 'square_hd',
        num_images: 1,
      },
    });

    // Convert generated image to SVG (or use PNG)
    return result.images[0].url;
  } catch (error) {
    console.error('AI generation failed:', error);
    throw error;
  }
};
```

**Cost:** $0.008/image → ~3,000 images for $20/month subscription

**Option B: Use OpenAI GPT-image-1**

```typescript
const response = await openai.images.generate({
  model: "gpt-image-1",
  prompt: `Scientific diagram: ${prompt}`,
  size: "1024x1024",
  quality: "standard",
});

return response.data[0].url;
```

**Cost:** $0.01-0.17/image

**Option C: Hybrid Approach (Recommended)**

1. Use keyword matching to detect known template types
2. Call fal.ai for custom/generic prompts
3. Maintain fallback to hardcoded templates for offline use

---

### Fix 2: Wire "Send to Editor" functionality

**Step 1: Add navigation logic to App.tsx**

```typescript
<Route path="/agent" element={<AgentMode onSendToEditor={handleSendToEditor} />} />
```

```typescript
const handleSendToEditor = (svg: string) => {
  // Generate unique ID
  const diagramId = `agent-${Date.now()}`;

  // Save to localStorage
  localStorage.setItem(`finnish-diagram-${diagramId}`, JSON.stringify({
    name: 'AI-Generated Diagram',
    svg: svg,
    createdAt: new Date().toISOString()
  }));

  // Navigate to editor
  navigate(`/editor/${diagramId}`);
};
```

**Step 2: Update EditorMode to load SVG strings**

Add logic to convert SVG string to Fabric.js canvas:

```typescript
const loadDiagram = useCallback(async (diagramId: string) => {
  try {
    const stored = localStorage.getItem(`finnish-diagram-${diagramId}`);

    if (stored) {
      const diagramData = JSON.parse(stored);

      if (diagramData.svg && canvasRef.current) {
        // Load SVG string into Fabric.js
        await canvasRef.current.loadSVGFromString(diagramData.svg);
        showToast({
          type: 'success',
          message: `Loaded diagram: ${diagramData.name || diagramId}`,
        });
      } else if (diagramData.canvas && canvasRef.current) {
        // Load existing JSON format
        await canvasRef.current.loadFromJSON(diagramData.canvas);
      }
    }
  } catch (error) {
    console.error('Failed to load diagram:', error);
    showToast({
      type: 'error',
      message: 'Failed to load diagram',
    });
  }
}, [navigate, setLoading, showToast]);
```

---

### Fix 3: Add randomness to templates

```typescript
const generatePathwayDiagram = (): string => {
  // Randomize colors, positions, etc.
  const colors = ['#e3f2fd', '#fff3e0', '#e8f5e9', '#fce4ec'];
  const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

  return `<svg ...>
    <ellipse class="receptor" fill="${randomColor()}" cx="300" cy="70" ... />
    <!-- ... -->
  </svg>`;
};
```

---

### Fix 4: Add more template variations

Extend the keyword matching to include:
- EGFR, MAPK, AKT, mTOR → Signaling pathway
- DNA, RNA, transcription, translation → Genetic pathway
- Cell, organelle, mitochondria → Cell structure
- Reaction, synthesis, mechanism → Chemical scheme
- Trial, clinical, randomized → CONSORT/PRISMA

---

## Recommendations

### Immediate Actions (Before v1.0 Launch)

1. **CRITICAL:** Either:
   - Implement real AI generation with fal.ai, OR
   - **Remove "AI-powered" claims** and clearly state "Template-based generation"

2. **HIGH PRIORITY:** Fix "Send to Editor" functionality

3. **MEDIUM PRIORITY:** Add more template variations for common prompts

### Long-term Improvements (v1.5+)

1. Integrate fal.ai FLUX Turbo for true AI generation
2. Add fine-tuning options for diagrams
3. Implement iterative editing (user: "add arrows", agent: updates diagram)
4. Add diagram style transfer (match journal guidelines)
5. Implement version control for diagrams

---

## Conclusion

AgentMode has a **solid foundation** with excellent UI/UX, but the **core "AI generation" feature is non-functional**. The current implementation uses hardcoded SVG templates with simple keyword matching, which is misleading to users expecting AI-powered diagram creation.

**Recommendation:** Do NOT ship AgentMode as-is in v1.0. Either implement real AI generation or reposition it as "Template-assisted diagram creation" and fix the "Send to Editor" workflow.

---

**Tested by:** Dr. Chen
**Report Date:** 2026-01-20

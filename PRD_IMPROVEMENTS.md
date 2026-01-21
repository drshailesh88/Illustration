# FINNISH Improvement PRD - Ralph Looping Phase

> **Goal**: Fix all identified issues through test-driven development with Dr. Chen (mock user)
> **Method**: Ralph Looping - Test → Fix → Test again until 100% functional
> **Tools**: agent-browser for browser automation, ralphy for autonomous AI loop

---

## Critical Issues to Fix

### 1. AgentMode - Real AI Integration
**Status**: ❌ Uses hardcoded SVG templates instead of real AI API
**Priority**: P0 (Critical)
**File**: `src/pages/AgentMode/`
**Description**:
- AgentMode currently has hardcoded SVG templates
- Should use fal.ai API for real AI diagram generation
- Connect to actual `@fal-ai/serverless-client` library (already installed)
- Template gallery should be functional

**Test Case**: Dr. Chen tries to generate a "signaling pathway" diagram via AgentMode

**Expected Behavior**:
- User enters prompt: "Create an EGFR signaling pathway diagram"
- AI generates actual diagram using fal.ai FLUX model
- Shows preview in DiagramPreview component
- Can send to editor for further editing

**Current Behavior**:
- Shows hardcoded SVG templates
- No real AI generation
- Template gallery not fully implemented

---

### 2. Recent Files Implementation
**Status**: ❌ Hardcoded, not functional
**Priority**: P1 (High)
**Files**: `src/pages/EditorMode/MenuBar.tsx`, `src/pages/Welcome/Welcome.tsx`
**Description**:
- MenuBar → File → Recent Files shows hardcoded list
- Welcome page → Recent diagrams shows hardcoded list
- Should load from localStorage or API
- Should update on save

**Test Case**: Dr. Chen saves a diagram, then checks "Recent Files" in menu

**Expected Behavior**:
- Save stores diagram metadata (filename, timestamp, thumbnail)
- Menu shows actual recently saved diagrams
- Clicking recent diagram loads it
- Welcome page shows actual recent diagrams

**Current Behavior**:
- Shows static hardcoded list
- Clicking does nothing or shows same list always

---

### 3. Disabled Menu Items - Image Filters
**Status**: ❌ Menu items disabled: Crop, Resize, Adjustments, Filters
**Priority**: P1 (High)
**File**: `src/pages/EditorMode/MenuBar.tsx`
**Description**:
- Menu → Image → Crop (disabled)
- Menu → Image → Resize (disabled)
- Menu → Image → Adjustments (disabled)
- Menu → Image → Filters (disabled)
- Libraries installed: glfx (filters), should implement features

**Test Case**: Dr. Chen wants to crop an image or apply a filter

**Expected Behavior**:
- Crop tool opens dialog to select crop area
- Resize dialog allows changing dimensions
- Adjustments dialog for brightness/contrast
- Filters dialog applies glfx effects (blur, sharpen, etc.)

**Current Behavior**:
- All menu items are disabled
- No way to perform these operations

---

### 4. IconPicker - Drag and Drop
**Status**: ❌ Missing drag-and-drop to canvas
**Priority**: P2 (Medium)
**File**: `src/components/IconPicker/IconPicker.tsx`
**Description**:
- IconPicker shows icons
- User clicks to insert (works)
- No drag-and-drop to canvas
- Improves UX significantly

**Test Case**: Dr. Chen wants to drag icon from IconPicker to canvas

**Expected Behavior**:
- Drag icon from IconPicker grid
- Drop onto canvas
- Icon appears at drop location

**Current Behavior**:
- Must click icon to insert
- No drag-and-drop support

---

### 5. ExportDialog - Additional PDF Options
**Status**: ⚠️ Basic PDF export works, but missing advanced options
**Priority**: P2 (Medium)
**File**: `src/components/ExportDialog/ExportDialog.tsx`
**Description**:
- PDF export has page size, orientation, margins
- Missing: compression, metadata, embedding options
- jsPDF supports more options

**Test Case**: Dr. Chen exports to PDF with custom metadata

**Expected Behavior**:
- Add compression level option
- Add custom metadata fields (author, title, subject, keywords)
- Add font embedding option

**Current Behavior**:
- Basic export works
- Limited metadata options

---

### 6. PropertiesPanel - More Object Types
**Status**: ⚠️ Only shows basic transform + appearance + text
**Priority**: P2 (Medium)
**File**: `src/components/PropertiesPanel.tsx`
**Description**:
- Shows Transform (position, size, rotation)
- Shows Appearance (fill, stroke, opacity)
- Shows Text (font, size, weight) for text objects
- Missing: Image properties, Group properties, Path properties

**Test Case**: Dr. Chen selects an image object and wants to adjust properties

**Expected Behavior**:
- Show image-specific properties (clip, filters, crop)
- Show group-specific properties (alignment, distribution)
- Show path-specific properties (stroke cap, stroke join, dash pattern)

**Current Behavior**:
- Shows generic properties only
- No type-specific properties

---

### 7. RightPanel - Additional Tabs
**Status**: ⚠️ Has Layers, Properties, Icons, Style tabs
**Priority**: P3 (Low)
**File**: `src/pages/EditorMode/RightPanel.tsx`
**Description**:
- Current tabs: Layers, Properties, Icons, Style
- Could add: Templates tab, History/Undo panel, Align/Distribute panel

**Test Case**: Dr. Chen wants quick access to templates from right panel

**Expected Behavior**:
- Templates tab shows template gallery
- History panel shows undo/redo stack
- Align panel provides alignment tools

**Current Behavior**:
- No Templates tab
- No History panel
- No Align panel

---

### 8. Unused Dependencies Cleanup
**Status**: ⚠️ Potentially unused packages
**Priority**: P3 (Low)
**File**: `package.json`
**Description**:
- `mermaid` - Found in src/services/ai/backends/MermaidBackend.ts, no imports in src/lib/
- `pdf-lib` - Imported but no wrapper in src/lib/export/
- `svg-parser` - Imported but no wrapper found
- Should verify usage or remove

**Test Case**: None (cleanup task)

**Expected Behavior**:
- Verify if packages are used
- Remove if truly unused
- Document if used but not obvious

**Current Behavior**:
- Packages installed but usage unclear

---

## Test-Driven Development Approach

### Dr. Chen Test Scenarios

**Scenario 1: Create a Cell Signaling Diagram**
1. Start AgentMode
2. Enter prompt: "Create an EGFR signaling pathway diagram"
3. Wait for AI generation
4. Preview result
5. Send to EditorMode
6. Add receptor icon from IconPicker
7. Add pathway arrows
8. Export as PPTX
9. **Expected**: Entire flow works smoothly

**Scenario 2: Edit Saved Diagram**
1. Go to EditorMode
2. Click File → Recent Files
3. Select previous diagram
4. Crop an image
5. Apply filter (brightness/contrast)
6. Add new icons via drag-and-drop
7. Save
8. **Expected**: All operations work, recent files updates

**Scenario 3: Create Research Figure**
1. Start from Welcome → New from Template
2. Select scientific template
3. Use Shape Generator → DNA Helix
4. Use Shape Generator → Cell Membrane
5. Export as PDF with custom metadata
6. **Expected**: All features functional

---

## Ralph Loop Execution Plan

### Phase 1: Browser Automation Setup
- [ ] Install agent-browser ✅ (already installed)
- [ ] Install ralphy-cli ✅ (already installed)
- [ ] Initialize ralphy config for project
- [ ] Create PRD.md (this file)
- [ ] Start dev server: `npm run dev`

### Phase 2: Parallel Agent Launch

**Agent 1: Dr. Chen - Test AgentMode**
- Launch browser with agent-browser
- Navigate to http://localhost:3000/agent
- Test AI generation with real prompts
- Document what works/broken
- Report bugs to fix agents

**Agent 2: Dr. Chen - Test EditorMode**
- Launch browser with agent-browser
- Navigate to http://localhost:3000/editor
- Test all menu items
- Test drawing tools
- Test export functionality
- Report bugs

**Agent 3: Fix Agent - Critical Bugs**
- Fix AgentMode AI integration
- Fix Recent Files functionality
- Fix disabled menu items
- Run tests after each fix

**Agent 4: Fix Agent - UX Improvements**
- Implement drag-and-drop for IconPicker
- Add PDF export options
- Enhance PropertiesPanel
- Clean up unused dependencies

### Phase 3: Ralph Loop Execution
```
ralphy --parallel --max-parallel 4 --browser --prd PRD_IMPROVEMENTS.md
```

### Phase 4: Verification
- Re-run Dr. Chen test scenarios
- Verify all issues resolved
- Document remaining issues
- Repeat Phase 2-3 if needed

---

## Success Criteria

### Functional Requirements
- [x] All 35 specialties complete
- [ ] AgentMode generates real AI diagrams (not hardcoded templates)
- [ ] Recent Files shows actual saved diagrams
- [ ] Crop, Resize, Adjustments, Filters menu items work
- [ ] IconPicker supports drag-and-drop to canvas
- [ ] PDF export has advanced options (compression, metadata)
- [ ] PropertiesPanel shows type-specific properties

### Quality Requirements
- [ ] All TypeScript checks pass (`npm run typecheck`)
- [ ] All tests pass (`npm run test`)
- [ ] Build succeeds (`npm run build`)
- [ ] No console errors in browser
- [ ] All Dr. Chen test scenarios pass end-to-end

### Performance Requirements
- [ ] Page load time < 3 seconds
- [ ] AI generation < 10 seconds
- [ ] Background removal < 2 seconds
- [ ] Export operations < 5 seconds

---

## Notes

- **Browser Automation**: Use `agent-browser` for UI testing
- **AI Engine**: Use `--opencode` (OpenCode) or `--cursor` for ralphy
- **Session**: Create isolated sessions for parallel agents
- **Debugging**: Use `--headed` mode to watch browser actions
- **Screenshots**: Take screenshots for bug reports

---

*Last Updated: 2026-01-20*

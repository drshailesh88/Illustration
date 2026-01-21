# FINNISH App Validation Methodology Specification

## CRITICAL: READ THIS FIRST ON EVERY SESSION

This document defines the EXACT methodology for validating the FINNISH Academic Illustrator app.
DO NOT deviate from this. DO NOT try alternative tools. Follow this exactly.

---

## Persona: Dr. Sarah Chen
- Role: Clinical Researcher at Stanford
- Task: Preparing 50-60 publication-quality figures for Nature Medicine submission
- Approach: Use the app as a real academic user would

---

## Tools (FIXED - DO NOT CHANGE)

### 1. Browser Automation: Vercel Agent Browser CLI
**Package**: `@vercel/agent-browser` (already installed globally)

**Commands**:
```bash
agent-browser open <url>              # Open browser session, returns session_id
agent-browser snapshot <session_id>   # Get page structure with refs
agent-browser click <session_id> <ref> # Click element by reference
agent-browser type <session_id> <ref> <text> # Type into form field
agent-browser screenshot <session_id> <path> # Save screenshot
agent-browser scroll <session_id> <direction> <amount> # Scroll page
agent-browser close <session_id>      # Close session
```

### 2. Iterative Fixing: Ralph Loop
- Identify issue during testing
- Log it in handover.json
- Fix the code
- Re-test to verify fix
- Move to next issue
- Repeat until all issues resolved

### 3. State Management: handover.json
- Track progress across sessions
- List completed/pending tests
- Document issues found/fixed
- Define next steps
- Update after every major action

---

## Testing Phases

### Phase 1: Site Mapping
- Navigate all routes (/, /agent, /editor, /credits)
- Snapshot each page
- Catalog all interactive elements

### Phase 2: Functional Testing (50-60 Diagrams)
Test creating these diagram types as Dr. Chen:

**Medicine (15 diagrams)**:
1. CONSORT Flow Diagram (RCT)
2. PRISMA Flow Diagram (systematic review)
3. Forest Plot (meta-analysis)
4. Kaplan-Meier Survival Curves
5. ROC Curves
6. Funnel Plot
7. STROBE Flow Diagram
8. STARD Diagram
9. Treatment Algorithm
10. Clinical Trial Timeline
11. Patient Flow Diagram
12. Dose-Response Curve
13. Pharmacokinetics Plot
14. Adverse Events Summary
15. Study Design Schematic

**Biology (15 diagrams)**:
16. Cell Signaling Pathway (MAPK, PI3K, etc.)
17. Protein Interaction Network
18. Gene Expression Heatmap
19. Phylogenetic Tree
20. Cell Cycle Diagram
21. Metabolic Pathway
22. Receptor Binding Diagram
23. Enzyme Mechanism
24. DNA Replication Fork
25. Transcription/Translation
26. Membrane Transport
27. Apoptosis Pathway
28. Immune Response Cascade
29. Neurotransmitter Pathway
30. Protein Structure Diagram

**Chemistry (10 diagrams)**:
31. Reaction Mechanism
32. Synthesis Route
33. Molecular Orbital Diagram
34. Energy Level Diagram
35. Phase Diagram
36. Chromatography Result
37. Spectroscopy Analysis
38. Crystal Structure
39. Chemical Equilibrium
40. Catalytic Cycle

**General Scientific (10 diagrams)**:
41. Experimental Design Flowchart
42. Data Analysis Pipeline
43. Method Comparison
44. Timeline Figure
45. Conceptual Model
46. System Architecture
47. Decision Tree
48. Venn Diagram
49. Process Flow
50. Hierarchical Classification

**Additional Complex (10 diagrams)**:
51-60. Combinations and variations of above

### Phase 3: Feature Testing
For each diagram test:
- [ ] Template selection works
- [ ] Custom data input accepted
- [ ] Diagram renders correctly
- [ ] Send to Editor works
- [ ] Export PNG works (300 DPI)
- [ ] Export SVG works
- [ ] Export PDF works
- [ ] Icons searchable and insertable
- [ ] Modifications in Editor work
- [ ] Undo/Redo works

### Phase 4: Issue Resolution (Ralph Loop)
For each issue:
1. Document in VALIDATION_OUTPUT.md
2. Identify root cause in code
3. Implement fix
4. Re-test with agent-browser
5. Verify fix works
6. Update handover.json
7. Move to next issue

---

## Progress Tracking

Current diagram being tested: [UPDATE THIS]
Diagrams completed: [UPDATE THIS]/60
Issues found: [UPDATE THIS]
Issues fixed: [UPDATE THIS]

---

## Session Recovery Protocol

On EVERY new session or context reset:
1. Read this file first
2. Read handover.json for current state
3. Read VALIDATION_OUTPUT.md for issue log
4. Resume from where left off
5. DO NOT start over
6. DO NOT try different tools

---

## Files to Maintain

1. `/METHODOLOGY_SPEC.md` - This file (methodology)
2. `/handover.json` - State management
3. `/VALIDATION_OUTPUT.md` - Issue documentation
4. `/tmp/*.png` - Screenshots as evidence

---

*Last Updated: 2026-01-19*

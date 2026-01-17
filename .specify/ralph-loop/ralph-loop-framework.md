# Ralph Loop Framework for Scientific Illustration Expansion

## Core Principle

> "Ralph is a Bash loop" - Iterate on each specialty until it reaches cardiology-level completeness, then move to the next.

---

## The FINNISH Ralph Loop Protocol

### Execution Model

```
FOR each specialty in taxonomy:
    WHILE specialty_completeness < 90%:
        1. ASSESS current state against cardiology benchmark
        2. IDENTIFY gaps (icons, templates, prompts, colors)
        3. IMPLEMENT highest-priority missing content
        4. VALIDATE additions (TypeScript, visual quality)
        5. MEASURE new completeness score
        6. COMMIT progress
    END WHILE
    OUTPUT <promise>{SPECIALTY}_COMPLETE</promise>
END FOR
```

---

## Assessment Criteria

### Completeness Score Formula

```
Completeness = (Icons × 0.40) + (Templates × 0.35) + (Prompts × 0.15) + (Colors × 0.10)

Where:
- Icons = (Implemented / Target) × 100
- Templates = (Implemented / Target) × 100
- Prompts = (Implemented / Target) × 100
- Colors = (Has Complete Scheme ? 100 : 0)
```

### Quality Metrics

Each component must meet these quality standards:

#### Icons
- [ ] SVG format with proper viewBox
- [ ] Uses currentColor for theming
- [ ] Recognizable at 24x24 and 64x64
- [ ] Consistent stroke width (1.5-2px)
- [ ] Proper categorization and tags
- [ ] Anatomically/scientifically accurate

#### Templates
- [ ] Valid Mermaid/Fabric.js structure
- [ ] Customizable placeholders
- [ ] Professional academic appearance
- [ ] Follows domain conventions (e.g., CONSORT for trials)
- [ ] Color-coded appropriately
- [ ] Responsive to different sizes

#### Prompts
- [ ] Clear input specification
- [ ] Detailed output description
- [ ] Includes visual element expectations
- [ ] Has example output SVG
- [ ] Covers common use cases

#### Color Schemes
- [ ] Anatomically appropriate colors
- [ ] Pathology differentiation
- [ ] Accessibility (WCAG contrast)
- [ ] Consistent with medical conventions
- [ ] Dark/light mode variants

---

## Iteration Checkpoints

### Milestone 1: Foundation (25%)
**Goal**: Core anatomical icons and basic structure

Deliverables:
- 25% of target icons (core anatomy)
- 2-3 basic templates
- Color scheme foundation
- Index file structure

Completion signal:
```
<checkpoint>FOUNDATION_25</checkpoint>
```

### Milestone 2: Pathology (50%)
**Goal**: Add disease states and diagnostic elements

Deliverables:
- 50% of target icons (anatomy + pathology)
- 50% of templates
- Pathology color extensions
- Initial prompts

Completion signal:
```
<checkpoint>PATHOLOGY_50</checkpoint>
```

### Milestone 3: Clinical (75%)
**Goal**: Equipment, procedures, and clinical workflows

Deliverables:
- 75% of target icons (+ equipment/procedures)
- All templates
- Clinical workflow prompts
- Few-shot examples

Completion signal:
```
<checkpoint>CLINICAL_75</checkpoint>
```

### Milestone 4: Complete (90%)
**Goal**: Full coverage with polish

Deliverables:
- 90%+ icons
- All templates validated
- All prompts with examples
- Complete color schemes
- Documentation

Completion signal:
```
<promise>{SPECIALTY}_COMPLETE</promise>
```

---

## File Structure Per Specialty

```
src/data/
├── icons/
│   ├── {specialty}.ts          # Icon definitions
│   └── index.ts                 # Updated exports
├── templates/
│   ├── {specialty}.ts          # Template definitions
│   └── index.ts                 # Updated exports
└── colors/
    └── {specialty}.ts          # Color schemes

src/services/ai/prompts/
└── {specialty}-prompts.ts      # Domain prompts

tests/unit/
└── {specialty}.test.ts         # Validation tests
```

---

## Ralph Loop Prompt Template

Use this prompt structure for each specialty iteration:

```
SPECIALTY: {specialty_name}
CURRENT_COMPLETENESS: {current_score}%
TARGET: 90%

BENCHMARK COMPARISON:
- Cardiology Icons: 120 (target)
- {Specialty} Icons: {current} / {target}
- Cardiology Templates: 25
- {Specialty} Templates: {current} / {target}

GAPS IDENTIFIED:
{list of missing items from benchmark comparison}

ITERATION GOAL:
Implement the following high-priority items:
1. {specific item 1}
2. {specific item 2}
3. {specific item 3}
...

QUALITY REQUIREMENTS:
- TypeScript strict mode compliance
- SVG icons use currentColor
- Templates have proper placeholders
- All items have accurate tags

COMPLETION CRITERIA:
When {specialty} reaches 90% completeness with all quality metrics passing:
OUTPUT: <promise>{SPECIALTY}_COMPLETE</promise>

If blocked or unable to proceed:
OUTPUT: <blocked>{reason}</blocked>
```

---

## Comparison Protocol

### Before Each Iteration

```javascript
function assessSpecialty(specialty: string): AssessmentResult {
  const cardiologyBenchmark = getCardiologyMetrics();
  const currentMetrics = getSpecialtyMetrics(specialty);

  return {
    icons: {
      current: currentMetrics.icons.length,
      target: calculateTarget(specialty, 'icons'),
      gap: calculateGap(currentMetrics.icons, cardiologyBenchmark.icons),
      percentage: (currentMetrics.icons.length / calculateTarget(specialty, 'icons')) * 100
    },
    templates: {
      current: currentMetrics.templates.length,
      target: calculateTarget(specialty, 'templates'),
      gap: calculateGap(currentMetrics.templates, cardiologyBenchmark.templates),
      percentage: (currentMetrics.templates.length / calculateTarget(specialty, 'templates')) * 100
    },
    prompts: {
      current: currentMetrics.prompts.length,
      target: calculateTarget(specialty, 'prompts'),
      gap: calculateGap(currentMetrics.prompts, cardiologyBenchmark.prompts),
      percentage: (currentMetrics.prompts.length / calculateTarget(specialty, 'prompts')) * 100
    },
    colorScheme: currentMetrics.hasCompleteColorScheme,
    overallCompleteness: calculateOverallCompleteness(currentMetrics)
  };
}
```

### After Each Iteration

```javascript
function validateIteration(specialty: string): ValidationResult {
  const assessment = assessSpecialty(specialty);
  const previousScore = getPreviousScore(specialty);

  return {
    improved: assessment.overallCompleteness > previousScore,
    delta: assessment.overallCompleteness - previousScore,
    meetsQuality: runQualityChecks(specialty),
    complete: assessment.overallCompleteness >= 90,
    nextPriorities: identifyNextPriorities(assessment)
  };
}
```

---

## Escape Hatches

### Max Iterations per Specialty
```
MAX_ITERATIONS = 50
```

If a specialty hasn't reached 90% after 50 iterations:
1. Document blocking issues
2. List attempted approaches
3. Output `<blocked>{specialty}: {reason}</blocked>`
4. Move to next specialty
5. Return for retry later

### Manual Override
```
/ralph-skip {specialty}     # Skip to next specialty
/ralph-force {specialty}    # Mark as complete despite score
/ralph-reset {specialty}    # Reset iteration count
```

---

## Progress Tracking

### Status File: `.specify/ralph-loop/progress.json`

```json
{
  "currentSpecialty": "cardiology",
  "completedSpecialties": [],
  "blockedSpecialties": [],
  "progress": {
    "cardiology": {
      "iterations": 0,
      "currentScore": 1.43,
      "lastCheckpoint": null,
      "startedAt": "2026-01-17T00:00:00Z",
      "completedAt": null
    }
  },
  "globalStats": {
    "totalSpecialties": 35,
    "completed": 0,
    "inProgress": 1,
    "blocked": 0,
    "notStarted": 34
  }
}
```

---

## Integration with FINNISH

### Skill Command: `/ralph-loop`

```bash
# Start Ralph Loop for a specialty
/ralph-loop cardiology --max-iterations 50

# Check progress
/ralph-status

# Compare to benchmark
/ralph-compare neurology cardiology
```

### Automated Hooks

```javascript
// hooks/post-commit.ts
if (isRalphLoopActive()) {
  const assessment = assessCurrentSpecialty();
  if (assessment.overallCompleteness >= 90) {
    outputPromise(currentSpecialty);
    advanceToNextSpecialty();
  } else {
    logProgress(assessment);
  }
}
```

---

## Success Criteria

### Per Specialty
- ≥90% completeness score
- All quality metrics passing
- TypeScript compilation success
- Visual review approval

### Global
- All 35 specialties complete
- Consistent quality across domains
- Cross-specialty icon compatibility
- Unified color system
- Complete search/discovery

### Final Output
```
<promise>ALL_SPECIALTIES_COMPLETE</promise>
```

---

## Timeline Estimates

| Phase | Specialties | Target Icons | Estimated Iterations |
|-------|-------------|--------------|---------------------|
| Phase 1 | 5 | 600 | 100-150 |
| Phase 2 | 5 | 450 | 75-100 |
| Phase 3 | 5 | 350 | 60-80 |
| Phase 4 | 5 | 400 | 70-90 |
| Phase 5 | 7 | 750 | 100-120 |
| Phase 6 | 8 | 630 | 80-100 |
| **Total** | **35** | **3,180** | **485-640** |

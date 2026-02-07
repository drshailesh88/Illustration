# Implementation Plan: Wire Agent Mode to Real AI Pipeline

**Branch**: `001-wire-agent-ai` | **Date**: 2026-02-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-wire-agent-ai/spec.md`

## Summary

Replace AgentMode's hardcoded SVG fallback diagrams with the real AI generation pipeline. The existing infrastructure (DiagramGenerator, PromptParser, MermaidBackend, SVGBackend, useDiagramGenerator hook) is architecturally sound but disconnected. The work is: (1) add a Claude Sonnet backend as primary LLM provider, (2) create a specialty prompt registry connecting 45 unused prompt files, (3) fix template matching to use the 661+ real templates instead of hardcoded SVGs, (4) remove hardcoded fallbacks from AgentMode.tsx, (5) add prompt caching for cost optimization.

## Technical Context

**Language/Version**: TypeScript 5.x (React 18 + Vite)
**Primary Dependencies**: Fabric.js 6.x, Mermaid.js (rendering), Anthropic SDK (new), OpenAI SDK (existing)
**Storage**: localStorage (conversation persistence), Zustand (state management)
**Testing**: Vitest (unit), manual verification (Agent Mode E2E)
**Target Platform**: Web browser (SPA)
**Project Type**: Single-page web application
**Performance Goals**: Template-matched diagrams < 5s, AI-generated diagrams < 30s
**Constraints**: Client-side API calls (no server), API keys in env vars, prompt caching for cost
**Scale/Scope**: Single user, 45 specialty domains, 661+ templates, 12 template categories

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| **The Combination IS the Product** | PASS | This task IS wiring Agent Mode (AI generation) to work properly |
| **Verified Accuracy Over Speed** | PASS | Template matching uses verified structures; AI-generated elements will be labeled |
| **Users Own Everything** | PASS | No attribution restrictions on generated diagrams |
| **Cost Discipline from Day One** | PASS | Template matching skips AI, prompt caching for Claude, cheap model fallback |
| **Simplicity Over Features** | PASS | Wiring existing infrastructure, not adding new abstractions |
| **Never remove features** | PASS | Removing hardcoded fallbacks, replacing with real pipeline (upgrade, not removal) |
| **No code without specs** | PASS | This spec exists |
| **Test before done** | PASS | Build verification + manual testing planned |
| **Medical accuracy matters** | PASS | Specialty prompts enhance domain accuracy |
| **PII protection** | N/A | Deferred to Task 17 |

**All gates pass. No violations.**

## Project Structure

### Documentation (this feature)

```text
specs/001-wire-agent-ai/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0 research findings
├── data-model.md        # Phase 1 data model
├── quickstart.md        # Phase 1 quickstart guide
├── contracts/           # Phase 1 API contracts
│   └── llm-backends.md  # LLM provider interface contracts
└── checklists/
    └── requirements.md  # Spec quality checklist
```

### Source Code (repository root)

```text
src/
├── services/ai/
│   ├── backends/
│   │   ├── MermaidBackend.ts      # MODIFY - fix template population, connect specialty prompts
│   │   ├── SVGBackend.ts          # MODIFY - connect specialty prompts for SVG generation
│   │   └── ClaudeBackend.ts       # NEW - Anthropic Claude Sonnet API integration
│   ├── prompts/
│   │   ├── index.ts               # MODIFY - add specialty prompt registry
│   │   └── *-prompts.ts           # EXISTING (45 files) - no changes needed
│   ├── DiagramGenerator.ts        # MODIFY - add Claude backend, fix routing
│   ├── LLMService.ts              # MODIFY - add Claude Sonnet as primary, GPT-4o mini as fallback
│   ├── ContextBuilder.ts          # MODIFY - inject specialty prompts into context
│   ├── PromptParser.ts            # MODIFY - add specialty detection (cardiology vs neurology)
│   └── types.ts                   # MODIFY - add Claude-specific types
├── pages/AgentMode/
│   └── AgentMode.tsx              # MODIFY - remove hardcoded fallbacks, trust real pipeline
├── hooks/
│   └── useDiagramGenerator.ts     # EXISTING - no changes needed (already wired correctly)
└── store/
    └── useAgentStore.ts           # EXISTING - no changes needed
```

**Structure Decision**: Existing single web app structure. All changes are modifications to existing files except one new file (ClaudeBackend.ts).

## Architecture Overview

### Current Flow (Broken)
```
User Prompt → useDiagramGenerator.generate() → DiagramGenerator → MermaidBackend
                                                                    ↓ (fails: no LLM)
AgentMode catches null → hardcoded generateConsortDiagram() etc. → SVG displayed
```

### Target Flow (Fixed)
```
User Prompt → useDiagramGenerator.generate() → DiagramGenerator
    ↓
PromptParser.parse() → detects type + domain + specialty
    ↓
┌─ Template Match (PRISMA/CONSORT/etc)?
│   YES → Extract data from prompt → Fill template → Render Mermaid → SVG (no AI call)
│   NO ↓
├─ Claude Sonnet API → structured Mermaid DSL → Validate → Render → SVG
│   ↓ (fails)
├─ GPT-4o mini API → structured Mermaid DSL → Validate → Render → SVG
│   ↓ (fails)
└─ Regex fallback → basic template → Render → SVG + error note
    ↓
ConversationManager records turn
    ↓
SVG displayed in chat with actions (Send to Editor, Regenerate, Download)
```

### Key Design Decisions

1. **Claude Sonnet as LLM, not as backend**: Claude doesn't replace MermaidBackend. Claude generates Mermaid DSL text, MermaidBackend validates and renders it to SVG. The LLM is a tool used BY the backends, not a competing backend.

2. **Specialty detection via keyword scoring**: Extend PromptParser to detect specialty (cardiology, neurology, etc.) beyond just domain (medicine). Use the same keyword-scoring approach already in place.

3. **Prompt caching via Anthropic cache_control**: Use Anthropic's built-in prompt caching by marking system prompts with `cache_control: { type: "ephemeral" }`. This gives 90% cost reduction on cached tokens.

4. **No new npm packages**: Use `fetch()` directly for Claude API calls (same pattern as existing LLMService.callChatCompletions). Avoid adding @anthropic-ai/sdk to keep bundle small.

5. **Template-first routing**: Check template match BEFORE calling AI. If PromptParser detects a known template (PRISMA, CONSORT, forest plot, Kaplan-Meier), route directly to the template system with extracted data. Only call AI for non-template prompts.

---

## Phase 0: Research Findings

### Research Summary

All research completed via codebase exploration. Key findings:

#### R1: LLM Integration Pattern
- **Decision**: Use `fetch()` to call Anthropic Messages API directly (same as existing OpenAI pattern in LLMService.ts)
- **Rationale**: LLMService already uses `fetch()` for OpenAI. Adding Anthropic SDK would increase bundle size. Direct fetch is simple and consistent.
- **Alternatives**: @anthropic-ai/sdk (rejected: adds bundle weight, overkill for Messages API)

#### R2: Claude Sonnet API Format
- **Decision**: POST to `https://api.anthropic.com/v1/messages` with `anthropic-version: 2023-06-01`
- **Rationale**: Standard Anthropic Messages API with JSON mode
- **Key difference from OpenAI**: Uses `system` as top-level param (not message role), response in `content[0].text`

#### R3: Prompt Caching Strategy
- **Decision**: Mark system prompts with `cache_control: { type: "ephemeral" }` in the Anthropic Messages API
- **Rationale**: System prompts (domain context, specialty examples, output format instructions) are the same across calls. Caching gives ~90% cost reduction on these tokens.
- **Implementation**: Add `cache_control` to the system message block. Anthropic automatically caches.

#### R4: Specialty Prompt Registry
- **Decision**: Create a registry in `src/services/ai/prompts/index.ts` that maps specialty names to their prompt files
- **Rationale**: 45 specialty files exist with `DOMAIN_PROMPT`, `PROMPTS`, and `FEW_SHOT_EXAMPLES` exports. They're all exported but never consumed.
- **Structure**: `SPECIALTY_REGISTRY: Record<string, { domainPrompt, prompts, examples }>` built by importing all 45 files

#### R5: Template Matching vs AI Call
- **Decision**: Check PromptParser.template field first. If matched (CONSORT/PRISMA/forest-plot/kaplan-meier), use MermaidBackend's existing `generateFromTemplate()` path with extracted data. Skip AI call entirely.
- **Rationale**: Constitution principle #4 (Cost Discipline). Known diagram types should never hit AI.
- **Current bug**: MermaidBackend already has `generateConsortFromData()`, `generatePrismaFromData()`, etc., but the routing in DiagramGenerator doesn't check template match before calling the full generation pipeline.

#### R6: Fallback Chain
- **Decision**: Claude Sonnet (primary) → GPT-4o mini (fallback) → regex extraction + template (last resort)
- **Rationale**: Claude Sonnet is best at scientific context. GPT-4o mini is cheap and fast for simple cases. Regex extraction already exists in LLMService.fallbackParse().
- **Timeout**: 30s for Claude, 20s for GPT-4o mini, instant for regex

---

## Phase 1: Design

### Data Model

See [data-model.md](./data-model.md) for full entity definitions.

Key additions:
- `LLMProvider`: enum of 'anthropic' | 'openai' | 'fallback'
- `SpecialtyContext`: { domainPrompt, fewShotExamples, specialtyPrompts }
- `LLMConfig`: { provider, apiKey, model, baseUrl, timeout, cacheControl }

### Contracts

See [contracts/llm-backends.md](./contracts/llm-backends.md) for API interface contracts.

Key interfaces:
- Anthropic Messages API request/response format
- LLMService.callClaude() method signature
- SpecialtyRegistry.getContext() method signature

### Implementation Phases

#### Phase A: LLM Provider Layer (Foundation)
1. Add Claude Sonnet support to LLMService
2. Add GPT-4o mini as explicit fallback
3. Add prompt caching headers for Anthropic
4. Add provider selection logic (Claude primary → GPT-4o mini fallback)

#### Phase B: Specialty Prompt Registry
1. Create specialty registry mapping in prompts/index.ts
2. Add specialty detection to PromptParser
3. Wire ContextBuilder to inject specialty context into prompts

#### Phase C: Template-First Routing
1. Fix DiagramGenerator to check template match before AI call
2. Route CONSORT/PRISMA/forest-plot/Kaplan-Meier to direct template filling
3. Use MermaidBackend's existing `generateConsortFromData()` etc.

#### Phase D: AgentMode Cleanup
1. Remove hardcoded generateConsortDiagram/generateForestPlot/etc. from AgentMode.tsx
2. Remove the fallback `generateDiagramFromPrompt()` function
3. Trust the real pipeline - let errors propagate as user-friendly messages
4. Add better error handling for when both AI providers fail

#### Phase E: Integration Testing
1. Verify template-matched prompts work (PRISMA, CONSORT)
2. Verify AI-generated prompts work (pathways, custom)
3. Verify fallback chain (Claude → GPT-4o mini → regex)
4. Verify build passes (`tsc --noEmit && vite build`)

### File Change Summary

| File | Action | Scope |
|------|--------|-------|
| `src/services/ai/LLMService.ts` | MODIFY | Add callClaude(), add provider routing, prompt caching |
| `src/services/ai/prompts/index.ts` | MODIFY | Add SPECIALTY_REGISTRY, getSpecialtyContext() |
| `src/services/ai/PromptParser.ts` | MODIFY | Add specialty detection keywords |
| `src/services/ai/ContextBuilder.ts` | MODIFY | Inject specialty prompts from registry |
| `src/services/ai/DiagramGenerator.ts` | MODIFY | Template-first routing, register Claude provider |
| `src/services/ai/backends/MermaidBackend.ts` | MODIFY | Use specialty examples in generation |
| `src/services/ai/types.ts` | MODIFY | Add LLMProvider, SpecialtyContext types |
| `src/pages/AgentMode/AgentMode.tsx` | MODIFY | Remove hardcoded fallbacks, improve error handling |

**No new files needed** (ClaudeBackend was originally planned but Claude support fits better inside LLMService as a provider, consistent with existing OpenAI pattern).

### Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Claude API key not available | GPT-4o mini fallback + regex fallback. Never blocks generation. |
| Prompt caching not effective | Monitor cache hit rate. System prompts are identical per session. |
| Specialty detection wrong | Low impact - wrong specialty just gives slightly less relevant context. Generation still works. |
| Mermaid DSL from AI is invalid | MermaidBackend.validate() + attemptDslFix() already handles this. |
| Template matching false positive | Only match high-confidence templates (>0.85). Err toward AI generation. |
| Bundle size increase | No new packages. Direct fetch for Claude API. |

### Constitution Re-check (Post-Design)

| Principle | Status | Notes |
|-----------|--------|-------|
| **The Combination IS the Product** | PASS | Agent Mode properly generates, user edits in Editor |
| **Verified Accuracy Over Speed** | PASS | Template-first for verified types, AI for custom |
| **Cost Discipline** | PASS | Template skip AI, prompt caching, cheap fallback |
| **Simplicity Over Features** | PASS | Modifying existing files, no new abstractions |
| **No code without specs** | PASS | Spec complete, plan complete |

**All gates pass post-design.**

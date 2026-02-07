# Tasks: Wire Agent Mode to Real AI Pipeline

**Input**: Design documents from `/specs/001-wire-agent-ai/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/llm-backends.md

**Tests**: Not requested - manual verification via quickstart.md steps.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Exact file paths included in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Add new types and configure environment for AI provider integration

- [X] T001 Add `LLMProvider`, `LLMProviderConfig`, `SpecialtyPromptSet`, `SpecialtyContext` types and extend `ParsedPrompt` with `specialty?: string` field and `GenerationMetadata` with `provider`, `cachedTokens`, `fallbackUsed`, `templateMatched` fields in `src/services/ai/types.ts`
- [X] T002 [P] Ensure `VITE_ANTHROPIC_API_KEY` and `VITE_OPENAI_API_KEY` are read from `import.meta.env` in `src/services/ai/LLMService.ts` constructor, alongside existing `config.ai.openaiApiKey` path

---

## Phase 2: Foundational (LLM Provider Layer)

**Purpose**: Add Claude Sonnet as primary LLM provider with GPT-4o mini fallback. BLOCKS User Story 2 (AI-generated diagrams).

**Note**: User Story 1 (template matching) does NOT depend on this phase and can proceed in parallel.

- [X] T003 Add `callClaude(systemPrompt: string, userPrompt: string): Promise<LLMResponse>` method to `src/services/ai/LLMService.ts` using `fetch()` to POST to `https://api.anthropic.com/v1/messages` with headers `x-api-key`, `anthropic-version: 2023-06-01`, and `content-type: application/json`. Request body: `{ model: "claude-sonnet-4-5-20250929", max_tokens: 4096, system: [{ type: "text", text: systemPrompt, cache_control: { type: "ephemeral" } }], messages: [{ role: "user", content: userPrompt }] }`. Extract response from `response.content[0].text`. Parse as JSON. Handle non-200 status and parse errors by throwing.
- [X] T004 Add `isClaudeAvailable(): boolean` helper to `src/services/ai/LLMService.ts` that checks if `VITE_ANTHROPIC_API_KEY` is configured (similar to existing `isAvailable()` which checks OpenAI key)
- [X] T005 Modify `parsePrompt(prompt, diagramType?)` in `src/services/ai/LLMService.ts` to try Claude first: (1) if `isClaudeAvailable()` → `callClaude(getSystemPrompt(diagramType), prompt)`, (2) on failure or unavailable, if `isAvailable()` (OpenAI) → existing `callOpenAI()`, (3) on failure → `fallbackParse()`. Return `LLMResponse` with `provider` field set.
- [X] T006 Modify `generateMermaidDSL(diagramType, data)` in `src/services/ai/LLMService.ts` to try Claude first with same fallback chain: Claude → OpenAI `callChatCompletions()` → `generateFallbackDSL()`. Include Mermaid-specific system prompt instructing JSON output format.

**Checkpoint**: LLM provider layer complete. Claude Sonnet is primary, OpenAI is fallback, regex is last resort.

---

## Phase 3: User Story 1 - Template-Matched Diagrams (Priority: P1) MVP

**Goal**: PRISMA, CONSORT, forest plot, and Kaplan-Meier prompts are detected and rendered instantly using structured templates filled with user data. No AI API call made. Hardcoded fallbacks removed from AgentMode.

**Independent Test**: Type "Create a PRISMA flow diagram with 500 records identified, 120 duplicates, 380 screened, 200 excluded, 130 included" in Agent Mode. Verify correct PRISMA flowchart renders in < 5 seconds without any network call to AI providers.

### Implementation for User Story 1

- [X] T007 [US1] Add template-first routing to `DiagramGenerator.generate()` in `src/services/ai/DiagramGenerator.ts`: after `this.parser.parse()` returns `parsedPrompt`, check `if (parsedPrompt.template && parsedPrompt.confidence > 0.85)`. If true, extract data using `this.llmService.fallbackParse(prompt, parsedPrompt.template)` and route to existing `MermaidBackend` template generators (`generateConsortFromData`, `generatePrismaFromData`, `generateForestPlotFromData`, `generatePathwayFromData`). Set `metadata.templateMatched = true`. Skip AI call entirely.
- [X] T008 [US1] Verify and fix `MermaidBackend.generateConsortFromData()` in `src/services/ai/backends/MermaidBackend.ts` — ensure the generated Mermaid DSL passes `mermaid.parse()` validation and renders to SVG correctly with user-provided numbers from the parsed prompt entities
- [X] T009 [US1] Verify and fix `MermaidBackend.generatePrismaFromData()` in `src/services/ai/backends/MermaidBackend.ts` — ensure PRISMA flow renders correctly with identification, screening, eligibility, and included counts from user prompt
- [X] T010 [P] [US1] Verify and fix `MermaidBackend.generateForestPlotFromData()` in `src/services/ai/backends/MermaidBackend.ts` — ensure forest plot renders with study names, effect sizes, and confidence intervals from user prompt
- [X] T011 [US1] Remove hardcoded fallback diagram generators from `src/pages/AgentMode/AgentMode.tsx`: delete `generateConsortDiagram()` (~lines 23-67), `generateForestPlot()` (~lines 69-113), `generatePathwayDiagram()` (~lines 115-144), `generateFlowchart()` (~lines 146-178), `generateGenericDiagram()` (~lines 180-199), and `generateDiagramFromPrompt()` (~lines 202-237)
- [X] T012 [US1] Update `handleSendPrompt()` in `src/pages/AgentMode/AgentMode.tsx` (~lines 256-302): remove the fallback branch that calls `generateDiagramFromPrompt()` when `result?.svg` is falsy. Instead, let the real pipeline handle all cases — if `generate()` returns a result with SVG, display it; if it returns null or errors, show user-friendly error message (see US4)

**Checkpoint**: Template-matched diagrams (PRISMA, CONSORT, forest plot) work via real pipeline. Zero hardcoded SVG generators remain in AgentMode. This is the MVP demo moment.

---

## Phase 4: User Story 2 - AI-Generated Custom Diagrams (Priority: P1)

**Goal**: Non-template prompts (signaling pathways, custom diagrams) are sent to Claude Sonnet API, which generates Mermaid DSL. The DSL is validated and rendered to SVG. If Claude fails, falls back to GPT-4o mini, then regex.

**Independent Test**: Type "Create a diagram of the JAK-STAT signaling pathway showing receptor activation and nuclear translocation" in Agent Mode. Verify diagram renders in < 30 seconds. Check Network tab shows POST to `api.anthropic.com`.

**Dependencies**: Requires Phase 2 (LLM Provider Layer) complete.

### Implementation for User Story 2

- [X] T013 [US2] Verify that `MermaidBackend.generateFromPrompt()` in `src/services/ai/backends/MermaidBackend.ts` correctly uses `LLMService.parsePrompt()` (which now tries Claude first per T005) to parse user prompt into structured data, then generates Mermaid DSL from that data. Ensure the pipeline: prompt → LLMService.parsePrompt() → structured data → generateDSLFromParsedData() → validate() → renderToSvg() works end-to-end.
- [X] T014 [US2] Verify that `MermaidBackend.generateFromPrompt()` fallback chain works when LLM parsing succeeds but DSL generation needs AI: ensure `LLMService.generateMermaidDSL()` (which now tries Claude first per T006) is called and its output is validated and rendered
- [X] T015 [US2] Test the full fallback chain in `src/services/ai/LLMService.ts`: (1) with `VITE_ANTHROPIC_API_KEY` set, verify Claude is called primary, (2) remove the key, verify GPT-4o mini is called, (3) remove both keys, verify `fallbackParse()` produces a basic diagram. Ensure no console errors or unhandled promise rejections in any scenario.
- [X] T016 [US2] Ensure `DiagramGenerator.generate()` in `src/services/ai/DiagramGenerator.ts` sets `metadata.provider` to the actual provider used ('anthropic', 'openai', or 'fallback') and `metadata.fallbackUsed` to true when Claude was tried but failed

**Checkpoint**: Custom AI-generated diagrams work. Claude Sonnet is primary, GPT-4o mini is fallback. The full generation pipeline is alive.

---

## Phase 5: User Story 3 - Specialty-Aware Generation (Priority: P2)

**Goal**: System detects medical specialty from user prompts and enhances AI requests with relevant context from the 45 existing specialty prompt files. A cardiology prompt gets cardiology-specific terminology and few-shot examples.

**Independent Test**: Type "Create a diagram of the cardiac conduction system" in Agent Mode. Verify the generated diagram uses appropriate cardiology terminology (SA node, AV node, bundle of His, Purkinje fibers) rather than generic labels.

**Dependencies**: Requires Phase 4 (US2) complete (specialty context enhances AI-generated diagrams).

### Implementation for User Story 3

- [X] T017 [P] [US3] Create `SPECIALTY_REGISTRY: Record<string, SpecialtyPromptSet>` in `src/services/ai/prompts/index.ts` by importing all 45 specialty prompt files and mapping specialty names to their exports: `{ domainPrompt: {SPECIALTY}_DOMAIN_PROMPT, prompts: {SPECIALTY}_PROMPTS, examples: {SPECIALTY}_FEW_SHOT_EXAMPLES }`. Import from existing files: cardiology-prompts.ts, neurology-prompts.ts, pulmonology-prompts.ts, anatomy-prompts.ts, etc. (all 45)
- [X] T018 [P] [US3] Add `getSpecialtyContext(specialty: string): SpecialtyContext | undefined` function to `src/services/ai/prompts/index.ts` that looks up SPECIALTY_REGISTRY by name and returns `{ specialty, domainPrompt, relevantExamples: examples.slice(0, 3), relevantPrompts: prompts }`
- [X] T019 [US3] Add `SPECIALTY_KEYWORD_MAP: Record<string, string[]>` to `src/services/ai/PromptParser.ts` mapping 45 specialty names to keyword arrays: cardiology → [heart, cardiac, ecg, arrhythmia, coronary, myocardial, atrial, ventricular], neurology → [brain, neural, stroke, seizure, dementia, cerebrospinal, cortex], pulmonology → [lung, respiratory, asthma, copd, ventilator, bronchial], etc.
- [X] T020 [US3] Add specialty detection to `PromptParser.parse()` in `src/services/ai/PromptParser.ts`: after existing domain detection, iterate SPECIALTY_KEYWORD_MAP, score keyword matches, and set `parsedPrompt.specialty` to the best match if score > 0.3. Use same scoring pattern as existing `detectDiagramType()`.
- [X] T021 [US3] Modify `ContextBuilder.buildGenerationPrompt()` in `src/services/ai/ContextBuilder.ts` to accept optional `specialtyContext: SpecialtyContext` parameter. When provided, inject specialty domain prompt into the system context section and include up to 3 few-shot examples in the prompt
- [X] T022 [US3] Wire specialty context into `DiagramGenerator.generate()` in `src/services/ai/DiagramGenerator.ts`: after parsing prompt, call `getSpecialtyContext(parsedPrompt.specialty)` from the registry, then pass it to `contextBuilder.buildGenerationPrompt()` when building the generation request
- [X] T023 [US3] Pass specialty few-shot examples to `MermaidBackend.generateFromPrompt()` in `src/services/ai/backends/MermaidBackend.ts` via the generation request context, so the backend can use them as DSL examples when generating from prompt

**Checkpoint**: Specialty-aware generation works. Prompts for specific medical specialties get enhanced with relevant domain context and examples.

---

## Phase 6: User Story 4 - Error Recovery and User Feedback (Priority: P2)

**Goal**: When AI generation fails completely, users see clear error messages with actionable suggestions. Never a blank screen or raw error. Previous diagrams in conversation remain visible.

**Independent Test**: Set invalid API keys, type a prompt, verify a friendly error message appears with suggestions. Verify previously generated diagrams are still visible.

**Dependencies**: Requires Phase 3 (US1) and Phase 4 (US2) complete (error handling wraps the real pipeline).

### Implementation for User Story 4

- [X] T024 [US4] Improve error handling in `handleSendPrompt()` in `src/pages/AgentMode/AgentMode.tsx`: when `generate()` returns null or throws, add assistant message with `isError: true` and content that includes: (1) user-friendly error description, (2) suggestion to rephrase or try a template, (3) no raw error strings or stack traces exposed to user
- [X] T025 [P] [US4] Add API key availability check in `src/pages/AgentMode/AgentMode.tsx`: on component mount or first prompt, check if `import.meta.env.VITE_ANTHROPIC_API_KEY` or `import.meta.env.VITE_OPENAI_API_KEY` is configured. If neither is set, show a guidance message: "AI generation requires an API key. Configure VITE_ANTHROPIC_API_KEY in your environment to enable diagram generation. Template-based diagrams (PRISMA, CONSORT) work without an API key."
- [X] T026 [P] [US4] Add empty/nonsensical prompt validation in `handleSendPrompt()` in `src/pages/AgentMode/AgentMode.tsx`: if prompt is empty after trimming, or less than 5 characters, show guidance message "Please describe the scientific diagram you'd like to create" without calling the generation pipeline
- [X] T027 [US4] Verify that `useAgentStore.addMessage()` in `src/store/useAgentStore.ts` preserves all previous messages when a new error message is added. Verify the chat UI (`src/pages/AgentMode/ChatHistory.tsx`) renders error messages with a distinct visual style (existing `isError` flag) while keeping prior diagram messages fully functional

**Checkpoint**: Error recovery is robust. Users always get helpful feedback. No blank screens or raw errors.

---

## Phase 7: Polish & Build Verification

**Purpose**: Ensure everything builds, passes TypeScript checks, and matches success criteria

- [X] T028 Run TypeScript check: `npx tsc --noEmit` — fix any type errors introduced by new types and modified signatures
- [X] T029 Run full production build: `NODE_OPTIONS="--max-old-space-size=8192" npm run build` — fix any build errors
- [X] T030 Verify SC-006: grep `src/pages/AgentMode/AgentMode.tsx` for any remaining hardcoded SVG generators — must find zero
- [X] T031 Run quickstart.md verification: test template-matched diagram (PRISMA), AI-generated diagram (pathway), fallback chain, and build — all must pass
- [X] T032 Verify `src/services/ai/LLMService.ts` never logs API keys to console, error messages, or user-visible output (FR-014)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on T001 (types) — BLOCKS User Story 2
- **User Story 1 (Phase 3)**: Depends on T001 (types) only — can run in PARALLEL with Phase 2
- **User Story 2 (Phase 4)**: Depends on Phase 2 completion (LLM provider layer)
- **User Story 3 (Phase 5)**: Depends on Phase 4 (US2) — specialty context enhances AI generation
- **User Story 4 (Phase 6)**: Depends on Phase 3 (US1) + Phase 4 (US2) — error handling wraps real pipeline
- **Polish (Phase 7)**: Depends on all user stories complete

### User Story Dependencies

```
Phase 1 (Setup: T001-T002)
    │
    ├─→ Phase 2 (Foundational: T003-T006) ─→ Phase 4 (US2: T013-T016) ─→ Phase 5 (US3: T017-T023)
    │                                                                        │
    └─→ Phase 3 (US1: T007-T012) ────────────────────────────────────────────┤
                                                                              │
                                                                              └─→ Phase 6 (US4: T024-T027) ─→ Phase 7 (Polish: T028-T032)
```

**Key insight**: US1 (template matching) and Phase 2 (LLM layer) can run in PARALLEL since template matching doesn't use AI.

### Within Each User Story

- Foundational infrastructure before story-specific tasks
- Service layer changes before UI changes
- Backend changes before frontend changes
- Commit after each logical group

### Parallel Opportunities

- **Phase 1**: T001 and T002 can run in parallel (different files)
- **Phase 2 + Phase 3**: Can run simultaneously (Phase 2 = LLMService, Phase 3 = DiagramGenerator + AgentMode)
- **Phase 3**: T008, T009, T010 can run in parallel (different template generators in same file, different functions)
- **Phase 5**: T017 and T018 can run in parallel (registry + lookup function in same file, additive)
- **Phase 5**: T019 and T020 are sequential (keywords then detection logic in PromptParser)
- **Phase 6**: T025 and T026 can run in parallel (different checks in AgentMode)

---

## Parallel Execution Example: Maximum Speed

```bash
# Sprint 1: Setup + Parallel Foundations
T001: Add types to types.ts
T002: Configure env vars in LLMService.ts

# Sprint 2: LLM Layer + Template Routing (PARALLEL)
# Agent A: LLM Provider Layer (Phase 2)
T003: Add callClaude() to LLMService.ts
T004: Add isClaudeAvailable() to LLMService.ts
T005: Modify parsePrompt() provider chain
T006: Modify generateMermaidDSL() provider chain

# Agent B: Template-First Routing (Phase 3 - US1)
T007: Add template-first routing to DiagramGenerator.ts
T008: Verify generateConsortFromData() in MermaidBackend.ts
T009: Verify generatePrismaFromData() in MermaidBackend.ts
T010: Verify generateForestPlotFromData() in MermaidBackend.ts
T011: Remove hardcoded fallbacks from AgentMode.tsx
T012: Update handleSendPrompt() in AgentMode.tsx

# Sprint 3: AI Generation (US2) after LLM layer done
T013-T016: Wire and verify AI generation pipeline

# Sprint 4: Specialty + Error Handling (PARALLEL)
# Agent A: Specialty Registry (US3)
T017-T023: Build and wire specialty prompt system

# Agent B: Error Recovery (US4)
T024-T027: Improve error handling in AgentMode
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T002)
2. Complete Phase 3: User Story 1 — Template-Matched Diagrams (T007-T012)
3. **STOP and VALIDATE**: Type PRISMA/CONSORT prompt → diagram renders instantly → demo moment works
4. This MVP works WITHOUT any API keys — pure local template matching

### Incremental Delivery

1. Setup + US1 → Template diagrams work (no AI needed) → **MVP Demo**
2. Add Foundational + US2 → AI diagrams work (Claude + fallback) → **Full AI Pipeline**
3. Add US3 → Specialty-aware generation → **Domain Intelligence**
4. Add US4 → Robust error handling → **Production Ready**
5. Polish → Build passes, all success criteria met → **Ship It**

### Suggested MVP Scope

**User Story 1 (Template-Matched Diagrams) is the MVP**. It delivers the core demo moment without any AI API dependency:
- Doctor types PRISMA prompt → gets correct diagram in 3 seconds
- Works offline, works without API keys
- Demonstrates the product's value instantly
- 6 tasks (T007-T012), estimated ~2-3 hours of focused implementation

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [Story] label maps task to specific user story
- No new npm packages needed — uses `fetch()` for Claude API
- Commit after each task with format: `feat: <description> (task 2)`
- Build must pass before committing: `npx tsc --noEmit && NODE_OPTIONS="--max-old-space-size=8192" npx vite build`
- Total: 32 tasks across 7 phases, 4 user stories

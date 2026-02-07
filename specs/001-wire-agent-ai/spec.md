# Feature Specification: Wire Agent Mode to Real AI Pipeline

**Feature Branch**: `001-wire-agent-ai`
**Created**: 2026-02-07
**Status**: Draft
**Input**: User description: "Replace hardcoded SVG templates in AgentMode with real AI generation using Claude Sonnet (primary) with GPT-4o mini fallback. Template matching for known types (PRISMA, CONSORT). Connect existing specialty prompts. Remove hardcoded fallbacks."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Generate Diagram from Text Prompt (Priority: P1)

A medical researcher opens Agent Mode and types "Create a PRISMA flow diagram with 500 records identified, 120 duplicates removed, 380 screened, 200 excluded, 180 assessed for eligibility, 50 excluded for wrong population, 130 included in final analysis." The system recognizes this as a PRISMA diagram (a known template type), fills in the structured template with the user's numbers, and renders a publication-quality PRISMA flowchart within seconds - without making any AI API call. The diagram appears in the chat as an interactive SVG preview.

**Why this priority**: This is the core product - the "demo moment" where a doctor types a prompt and gets a diagram. Template-matched diagrams (PRISMA, CONSORT, forest plot) are the most common use case for medical researchers and must work instantly and reliably.

**Independent Test**: Can be fully tested by typing a PRISMA/CONSORT prompt in Agent Mode and verifying a correct, editable diagram renders with the user's exact numbers.

**Acceptance Scenarios**:

1. **Given** the user is on the Agent Mode page, **When** they type a PRISMA prompt with specific numbers, **Then** the system recognizes the template type, fills in the numbers, and displays a correct PRISMA flowchart SVG within 3 seconds.
2. **Given** the user types a CONSORT prompt, **When** the system processes the prompt, **Then** it renders a CONSORT flow diagram with the user's enrollment/randomization/follow-up data without calling an external AI API.
3. **Given** the user types a forest plot prompt with study names and effect sizes, **When** the system processes it, **Then** a forest plot renders with correct data points and confidence intervals.
4. **Given** the user clicks a template from the sidebar, **When** the template prompt populates the input, **Then** submitting it generates the corresponding diagram correctly.

---

### User Story 2 - AI-Generated Custom Diagrams (Priority: P1)

A researcher types "Create a diagram showing the JAK-STAT signaling pathway with receptor activation, phosphorylation cascade, and nuclear translocation of STAT dimers." This is NOT a known template type, so the system sends the prompt to Claude Sonnet API. The AI returns a structured specification describing elements, connections, and layout. The system renders this into an SVG diagram using the Mermaid rendering engine. The user sees the result in the chat preview.

**Why this priority**: Custom AI-generated diagrams are the product's differentiator over BioRender. Users need to generate arbitrary scientific diagrams, not just predefined templates.

**Independent Test**: Can be tested by typing a non-template prompt (e.g., a signaling pathway) and verifying the AI generates and renders a meaningful diagram.

**Acceptance Scenarios**:

1. **Given** the user types a prompt that doesn't match any known template, **When** the system processes it, **Then** it sends the prompt to the AI provider and renders the returned diagram within 30 seconds.
2. **Given** the AI provider (Claude Sonnet) is unavailable or errors, **When** the system detects the failure, **Then** it automatically retries with the fallback provider (GPT-4o mini) and still produces a diagram.
3. **Given** the user types a vague prompt like "cell diagram", **When** the system processes it, **Then** it generates a reasonable default diagram and suggests refinements in the response message.

---

### User Story 3 - Specialty-Aware Generation (Priority: P2)

A cardiologist types "Create a diagram of the cardiac conduction system." The system detects the medical domain (cardiology) and enhances the AI prompt with specialty-specific context, terminology guidelines, and example patterns from the existing cardiology prompt library. The resulting diagram uses appropriate medical vocabulary and visual conventions for cardiac electrophysiology.

**Why this priority**: Specialty awareness differentiates FINNISH from generic diagramming tools. The 50+ existing specialty prompt files represent significant invested work that must be connected.

**Independent Test**: Can be tested by comparing output quality for a cardiology prompt with and without specialty context - the specialty-aware version should use correct terminology and conventions.

**Acceptance Scenarios**:

1. **Given** the user types a prompt related to a specific medical specialty, **When** the system processes it, **Then** it detects the domain and enhances the prompt with relevant specialty context before sending to AI.
2. **Given** specialty prompt files exist for 35+ specialties, **When** any specialty-related prompt is submitted, **Then** the corresponding specialty prompts are loaded and used to enhance generation quality.

---

### User Story 4 - Error Recovery and User Feedback (Priority: P2)

When AI generation fails completely (all providers down, malformed response, rendering error), the user sees a clear error message with actionable suggestions: "Generation failed. Try rephrasing your prompt or selecting a template from the sidebar." The system never shows a blank screen or cryptic error. Previously generated diagrams in the conversation remain visible.

**Why this priority**: Robustness is critical for the conference demo and user trust. Failures must be graceful.

**Independent Test**: Can be tested by simulating API failures and verifying the user always sees helpful feedback.

**Acceptance Scenarios**:

1. **Given** the AI provider returns an error, **When** the system handles the failure, **Then** the user sees a friendly error message with suggestions, not a raw error.
2. **Given** the AI returns malformed output that cannot be rendered, **When** the system detects the rendering failure, **Then** it shows a "Generation didn't produce a valid diagram" message and suggests trying again or using a template.
3. **Given** the user has previously generated diagrams in the conversation, **When** a subsequent generation fails, **Then** all previous diagrams remain visible and functional.

---

### Edge Cases

- What happens when the user submits an empty or nonsensical prompt (e.g., "asdfghjkl")? System should respond with guidance: "Please describe the scientific diagram you'd like to create."
- What happens when the user's prompt is ambiguous between template types (e.g., mentions both PRISMA and CONSORT)? System should pick the strongest match and note the alternative.
- What happens when the AI returns valid SVG that is too large or too complex to render? System should set reasonable limits on element count and warn the user.
- What happens when the user has no internet connection? System should detect offline status and suggest using the Editor Mode directly.
- What happens when API keys are not configured? System should show a setup prompt rather than silently failing.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST detect known diagram types (PRISMA, CONSORT, forest plot, Kaplan-Meier) from user prompts and generate them using structured templates filled with user-provided data, without making external AI API calls.
- **FR-002**: System MUST send non-template prompts to Claude Sonnet as the primary AI provider to generate structured diagram specifications.
- **FR-003**: System MUST automatically fall back to GPT-4o mini when Claude Sonnet is unavailable, returns an error, or times out.
- **FR-004**: System MUST render AI-generated diagram specifications into interactive SVG using the Mermaid rendering engine for structured diagrams.
- **FR-005**: System MUST detect the scientific domain (medicine, biology, chemistry, etc.) from user prompts and enhance AI requests with relevant specialty context from the existing 50+ specialty prompt files.
- **FR-006**: System MUST display generated diagrams inline in the chat conversation as interactive SVG previews.
- **FR-007**: System MUST provide action buttons on generated diagrams: "Send to Editor", "Regenerate", and "Download SVG".
- **FR-008**: System MUST show a loading state with progress indication while diagram generation is in progress.
- **FR-009**: System MUST display clear, user-friendly error messages when generation fails, with actionable suggestions for the user.
- **FR-010**: System MUST cache AI system prompts to reduce cost on repeated calls (prompt caching).
- **FR-011**: System MUST remove all hardcoded fallback diagram generators (generateConsortDiagram, generateForestPlot, etc.) from AgentMode and replace them with the real pipeline.
- **FR-012**: System MUST preserve conversation history so users can see all previously generated diagrams in the current session.
- **FR-013**: System MUST extract numerical data from user prompts for template-based diagrams (e.g., "500 records screened" -> screening count = 500).
- **FR-014**: System MUST never send API keys to the browser console, error messages, or any user-visible output.

### Key Entities

- **User Prompt**: The natural language text the user types to request a diagram. Contains diagram type hints, domain context, and specific data.
- **Parsed Prompt**: Structured analysis of the user prompt including detected diagram type, domain, confidence score, matched keywords, and extracted entities (numbers, node names, connections).
- **Diagram Specification**: Structured description of diagram elements, connections, labels, colors, and layout - either from template matching or AI generation.
- **Generated Diagram**: The final SVG output rendered from the diagram specification, displayed in the chat and available for export or editing.
- **Conversation**: Ordered sequence of user prompts and generated diagrams within a session, providing context for refinement.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can generate a PRISMA, CONSORT, or forest plot diagram from a text prompt in under 5 seconds (template-matched, no AI call).
- **SC-002**: Users can generate a custom AI-powered diagram from a free-text prompt in under 30 seconds.
- **SC-003**: 90% of prompts for known diagram types (PRISMA, CONSORT, forest plot) are correctly detected and routed to template matching without an AI call.
- **SC-004**: When the primary AI provider fails, the fallback provider produces a diagram within 45 seconds with no user intervention required.
- **SC-005**: All generated diagrams contain individually selectable elements (not flat images) when sent to Editor Mode.
- **SC-006**: Zero hardcoded fallback diagrams remain in the AgentMode component after implementation.
- **SC-007**: Specialty domain detection correctly identifies the relevant domain for 80% of specialty-specific prompts (e.g., cardiology, neurology, biochemistry).

## Assumptions

- API keys for Claude Sonnet and GPT-4o mini are available and configured in environment variables.
- The existing Mermaid rendering engine in the codebase produces valid SVG output.
- The existing 50+ specialty prompt files in `src/services/ai/prompts/` contain usable few-shot examples and domain guidance.
- The `useDiagramGenerator` hook and `DiagramGenerator` service are architecturally sound and need wiring, not rewriting.
- Users have an internet connection for AI-generated diagrams (template-matched diagrams could work offline).
- The LLMService already supports OpenAI format; Claude Sonnet support needs to be added as a new backend.

# Research: Wire Agent Mode to Real AI Pipeline

**Date**: 2026-02-07 | **Branch**: `001-wire-agent-ai`

## R1: LLM Integration Pattern

**Decision**: Use `fetch()` to call Anthropic Messages API directly
**Rationale**: LLMService already uses `fetch()` for OpenAI (LLMService.ts:236-265). Adding @anthropic-ai/sdk would increase bundle size unnecessarily. Direct fetch is simple, consistent, and avoids a new dependency.
**Alternatives considered**: @anthropic-ai/sdk (rejected: bundle weight, overkill for Messages API)

## R2: Claude Sonnet API Format

**Decision**: POST to `https://api.anthropic.com/v1/messages`

**Request format**:
```json
{
  "model": "claude-sonnet-4-5-20250929",
  "max_tokens": 4096,
  "system": [
    {
      "type": "text",
      "text": "System prompt here...",
      "cache_control": { "type": "ephemeral" }
    }
  ],
  "messages": [
    { "role": "user", "content": "User prompt" }
  ]
}
```

**Headers**:
```
x-api-key: <ANTHROPIC_API_KEY>
anthropic-version: 2023-06-01
content-type: application/json
```

**Response**: `response.content[0].text` contains the generated text.

**Key difference from OpenAI**: System prompt is a top-level param (not a message role). No `response_format: { type: 'json_object' }` - instead, instruct JSON in the system prompt.

## R3: Prompt Caching Strategy

**Decision**: Mark system prompts with `cache_control: { type: "ephemeral" }` in the system message array.

**How it works**:
1. First request: full tokens charged, system prompt cached by Anthropic
2. Subsequent requests (within 5 min TTL): cached system tokens charged at ~10% of normal rate
3. Cache is per-API-key, keyed on the exact text content
4. Only works with system messages, not user messages

**Expected savings**: Scientific domain prompt (~2000 tokens) + output format instructions (~1000 tokens) = ~3000 tokens cached. At $3/Mtok input, saves ~$2.70/M cached tokens.

## R4: Specialty Prompt Registry

**Decision**: Create `SPECIALTY_REGISTRY` in `src/services/ai/prompts/index.ts`

**Current state**: 45 specialty prompt files exist, each exporting:
- `{SPECIALTY}_DOMAIN_PROMPT` (string) - Base domain guidance
- `{SPECIALTY}_PROMPTS` (Record<string, string>) - 20-24 specific prompts
- `{SPECIALTY}_FEW_SHOT_EXAMPLES` (FewShotExample[]) - 4-5 examples with Mermaid output

**All exported but never consumed**. No mapping from detected specialty to prompt file.

**Registry structure**:
```typescript
export const SPECIALTY_REGISTRY: Record<string, SpecialtyPromptSet> = {
  cardiology: { domainPrompt: CARDIOLOGY_DOMAIN_PROMPT, prompts: CARDIOLOGY_PROMPTS, examples: CARDIOLOGY_FEW_SHOT_EXAMPLES },
  neurology: { domainPrompt: NEUROLOGY_DOMAIN_PROMPT, prompts: NEUROLOGY_PROMPTS, examples: NEUROLOGY_FEW_SHOT_EXAMPLES },
  // ... 43 more
};
```

**Lazy loading consideration**: Importing all 45 files upfront adds to bundle. Could use dynamic `import()` but adds complexity. For V1, static imports are acceptable since the files are small (text data, no heavy deps).

## R5: Template Matching vs AI Call

**Decision**: Check `parsedPrompt.template` field before calling AI. If matched with confidence > 0.85, route to template filling.

**Currently broken**: DiagramGenerator.generate() always calls backend.generate() which tries LLM first. It doesn't check parsedPrompt.template to skip AI for known types.

**Fix**: In DiagramGenerator.generate(), after parsing:
```
if (parsedPrompt.template && parsedPrompt.confidence > 0.85) {
  return this.generateFromTemplate(parsedPrompt.template, parsedPrompt.entities);
}
```

**Templates with existing generators**:
- CONSORT → MermaidBackend.generateConsortFromData()
- PRISMA → MermaidBackend.generatePrismaFromData()
- Forest Plot → MermaidBackend.generateForestPlotFromData()
- Pathway → MermaidBackend.generatePathwayFromData()

## R6: Fallback Chain

**Decision**: Three-tier fallback with timeouts

| Tier | Provider | Model | Timeout | When Used |
|------|----------|-------|---------|-----------|
| 1 | Anthropic | claude-sonnet-4-5-20250929 | 30s | Primary for all AI calls |
| 2 | OpenAI | gpt-4o-mini | 20s | When Claude fails/unavailable |
| 3 | Regex | LLMService.fallbackParse() | Instant | When both APIs fail |

**Failure detection**: HTTP error, timeout, malformed JSON response, or empty content.

## R7: Existing Code That Already Works

**No changes needed**:
- `useDiagramGenerator.ts` - Hook is correctly wired, passes options to DiagramGenerator
- `useAgentStore.ts` - Store correctly manages messages, diagrams, loading state
- `ConversationManager.ts` - Conversation tracking works
- `DiagramPreview.tsx` - SVG rendering with sanitization works
- `DiagramActions.tsx` - Send to Editor, Download, Regenerate all work
- `ChatHistory.tsx` - Message display works

**These just need the pipeline to produce real SVGs instead of null/error.**

# Data Model: Wire Agent Mode to Real AI Pipeline

**Date**: 2026-02-07 | **Branch**: `001-wire-agent-ai`

## New Types

### LLMProvider
```typescript
type LLMProvider = 'anthropic' | 'openai' | 'fallback';
```
Identifies which AI provider generated the response.

### LLMProviderConfig
```typescript
interface LLMProviderConfig {
  provider: LLMProvider;
  apiKey: string;
  model: string;
  baseUrl: string;
  timeout: number;         // ms
  enableCaching: boolean;  // Anthropic prompt caching
}
```
Configuration for each LLM provider. Read from environment variables.

### SpecialtyPromptSet
```typescript
interface SpecialtyPromptSet {
  domainPrompt: string;                    // Base domain guidance text
  prompts: Record<string, string>;         // Specialty-specific prompt templates
  examples: FewShotExample[];              // Few-shot examples with Mermaid output
}
```
Represents one specialty's complete prompt data (e.g., cardiology, neurology).

### SpecialtyContext
```typescript
interface SpecialtyContext {
  specialty: string;                       // e.g., 'cardiology'
  domainPrompt: string;                    // Domain guidance for system prompt
  relevantExamples: FewShotExample[];      // Top 2-3 most relevant examples
  relevantPrompts: Record<string, string>; // Most relevant specialty prompts
}
```
The resolved context injected into the AI prompt for a specific generation request.

## Modified Types

### ParsedPrompt (extended)
```typescript
interface ParsedPrompt {
  // Existing fields (no changes)
  diagramType: DiagramType;
  domain: DiagramDomain;
  confidence: number;
  matchedKeywords: string[];
  isModification: boolean;
  template?: string;
  entities: ExtractedEntities;
  alternatives: AlternativeInterpretation[];

  // New field
  specialty?: string;    // Detected specialty (e.g., 'cardiology', 'neurology')
}
```

### GenerationMetadata (extended)
```typescript
interface GenerationMetadata {
  // Existing fields (no changes)
  generationTimeMs: number;
  tokensUsed?: { prompt: number; completion: number };

  // New fields
  provider?: LLMProvider;       // Which provider generated this
  cachedTokens?: number;        // How many tokens were cache hits
  fallbackUsed?: boolean;       // Whether fallback was triggered
  templateMatched?: boolean;    // Whether template matching was used (no AI call)
}
```

## Existing Types (No Changes)

- `Message` - Agent store message type (role, content, diagram, timestamp)
- `GenerationRequest` - Backend generation request
- `GenerationResult` - Backend generation result (svg, backend, metadata)
- `ExtendedGenerationResult` - Full result with parsedPrompt, conversationId, suggestions
- `ConversationContext` - Multi-turn conversation tracking
- `FewShotExample` - { prompt, output, reasoning? } - already defined in prompts

## Entity Relationships

```
User Prompt
    │
    ├─→ ParsedPrompt (type, domain, specialty, template, entities)
    │       │
    │       ├─→ SpecialtyContext (from SPECIALTY_REGISTRY via specialty field)
    │       │
    │       ├─→ Template Match? → Direct generation (no AI)
    │       │
    │       └─→ AI Generation → LLMProviderConfig (Claude → OpenAI → fallback)
    │
    ├─→ GenerationResult (svg, backend, metadata with provider info)
    │
    └─→ ConversationContext (turn history, version tracking)
```

## Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `VITE_ANTHROPIC_API_KEY` | Claude Sonnet API key | Yes (for AI generation) |
| `VITE_OPENAI_API_KEY` | GPT-4o mini fallback | Optional (fallback) |

These are read at runtime via `import.meta.env.VITE_*` (Vite convention for client-side env vars).

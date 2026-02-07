# API Contracts: LLM Backend Integration

**Date**: 2026-02-07 | **Branch**: `001-wire-agent-ai`

## LLMService Method Contracts

### callClaude(systemPrompt: string, userPrompt: string): Promise<LLMResponse>

**Purpose**: Send a prompt to Claude Sonnet API and return parsed JSON response.

**Request**:
```
POST https://api.anthropic.com/v1/messages
Headers:
  x-api-key: ${VITE_ANTHROPIC_API_KEY}
  anthropic-version: 2023-06-01
  content-type: application/json

Body:
{
  "model": "claude-sonnet-4-5-20250929",
  "max_tokens": 4096,
  "system": [
    {
      "type": "text",
      "text": "${systemPrompt}",
      "cache_control": { "type": "ephemeral" }
    }
  ],
  "messages": [
    { "role": "user", "content": "${userPrompt}" }
  ]
}
```

**Response (success)**:
```json
{
  "content": [{ "type": "text", "text": "{...json...}" }],
  "usage": {
    "input_tokens": 1500,
    "output_tokens": 800,
    "cache_creation_input_tokens": 1200,
    "cache_read_input_tokens": 0
  }
}
```

**Extracted**: `JSON.parse(response.content[0].text)` → DiagramData

**Error handling**: On non-200 status or parse error, throw and trigger fallback to OpenAI.

---

### parsePrompt(prompt: string, diagramType?: string): Promise<LLMResponse>

**Modified contract** (currently OpenAI-only, now multi-provider):

```
1. If VITE_ANTHROPIC_API_KEY available:
   → callClaude(systemPrompt, prompt)
   → On success: return LLMResponse
   → On failure: continue to step 2

2. If VITE_OPENAI_API_KEY available:
   → callOpenAI(systemPrompt, prompt)  [existing method]
   → On success: return LLMResponse
   → On failure: continue to step 3

3. fallbackParse(prompt, diagramType)
   → Always succeeds (regex-based)
   → return LLMResponse
```

---

### generateMermaidDSL(diagramType: string, data: DiagramData): Promise<string>

**Modified contract** (now uses Claude primary):

```
1. If VITE_ANTHROPIC_API_KEY available:
   → callClaude(mermaidSystemPrompt, JSON.stringify({ type, data }))
   → Extract Mermaid DSL from response
   → On success: return DSL string
   → On failure: continue to step 2

2. If VITE_OPENAI_API_KEY available:
   → callChatCompletions(payload)  [existing method]
   → On success: return DSL string
   → On failure: continue to step 3

3. generateFallbackDSL(diagramType, data)
   → Always succeeds (hardcoded DSL templates)
   → return DSL string
```

---

## Specialty Registry Contract

### getSpecialtyContext(specialty: string): SpecialtyContext | undefined

**Purpose**: Look up specialty prompt data by detected specialty name.

**Input**: `specialty` - lowercase specialty name (e.g., 'cardiology', 'neurology')

**Output**:
```typescript
{
  specialty: 'cardiology',
  domainPrompt: 'Use AHA/ACC guideline-based terminology...',
  relevantExamples: [
    { prompt: '...', output: '...mermaid DSL...', reasoning: '...' },
    { prompt: '...', output: '...mermaid DSL...' }
  ],
  relevantPrompts: {
    'ecgSystematicApproach': '...',
    'acsAlgorithm': '...'
  }
}
```

**Returns undefined** if specialty not in registry.

---

## DiagramGenerator Routing Contract

### generate(prompt: string, options?: GenerateOptions): Promise<ExtendedGenerationResult>

**Modified routing logic**:

```
1. parsedPrompt = parser.parse(prompt, context)

2. IF parsedPrompt.template AND parsedPrompt.confidence > 0.85:
   → Extract data using LLMService.fallbackParse()
   → Call backend.generateFromTemplate(template, data)
   → Return result (no AI call made, metadata.templateMatched = true)

3. ELSE:
   → Get specialty context from registry
   → Build enhanced prompt with specialty + domain context
   → Call backend.generate(request)  [backend uses LLM internally]
   → Return result (metadata.provider set to actual provider used)
```

---

## PromptParser Extended Contract

### parse(prompt: string, context?: string): ParsedPrompt

**New field in output**: `specialty?: string`

**Detection logic** (additive to existing):
```
For each SPECIALTY_KEYWORD_MAP entry:
  Score keywords found in prompt
  If score > threshold (0.3):
    parsedPrompt.specialty = best matching specialty
```

**Specialty keywords** (subset):
- cardiology: heart, cardiac, ecg, arrhythmia, coronary, myocardial
- neurology: brain, neural, stroke, seizure, dementia, cerebrospinal
- pulmonology: lung, respiratory, asthma, copd, ventilator, bronchial
- (45 specialties total)

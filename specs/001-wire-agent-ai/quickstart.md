# Quickstart: Wire Agent Mode to Real AI Pipeline

**Branch**: `001-wire-agent-ai` | **Date**: 2026-02-07

## Prerequisites

1. Anthropic API key (Claude Sonnet access)
2. OpenAI API key (GPT-4o mini, optional fallback)
3. Node.js 18+, npm

## Setup

```bash
# 1. Switch to feature branch
git checkout 001-wire-agent-ai

# 2. Set environment variables (create .env.local if not exists)
echo "VITE_ANTHROPIC_API_KEY=sk-ant-..." >> .env.local
echo "VITE_OPENAI_API_KEY=sk-..." >> .env.local  # optional

# 3. Install deps (no new packages needed)
npm install

# 4. Start dev server
npm run dev
```

## Verification Steps

### 1. Template-Matched Diagram (No AI Call)
Open `http://localhost:5173/agent` and type:
```
Create a PRISMA flow diagram with 500 records identified, 120 duplicates, 380 screened, 200 excluded, 130 included
```
**Expected**: PRISMA diagram renders in < 5 seconds. No network call to AI providers.

### 2. AI-Generated Diagram (Claude Sonnet)
Type:
```
Create a diagram of the JAK-STAT signaling pathway showing receptor activation and nuclear translocation
```
**Expected**: Diagram renders in < 30 seconds. Network tab shows POST to `api.anthropic.com`.

### 3. Fallback Chain
Remove `VITE_ANTHROPIC_API_KEY` from .env.local, restart dev server. Type the same pathway prompt.
**Expected**: Falls back to GPT-4o mini (or regex if no OpenAI key). Diagram still renders.

### 4. Build Verification
```bash
npx tsc --noEmit
NODE_OPTIONS="--max-old-space-size=8192" npm run build
```
**Expected**: Both pass with zero errors.

## Implementation Order

1. `src/services/ai/types.ts` - Add new types
2. `src/services/ai/LLMService.ts` - Add Claude provider
3. `src/services/ai/prompts/index.ts` - Add specialty registry
4. `src/services/ai/PromptParser.ts` - Add specialty detection
5. `src/services/ai/ContextBuilder.ts` - Inject specialty context
6. `src/services/ai/DiagramGenerator.ts` - Template-first routing
7. `src/services/ai/backends/MermaidBackend.ts` - Use specialty examples
8. `src/pages/AgentMode/AgentMode.tsx` - Remove hardcoded fallbacks

## Key Files

| File | What to Change |
|------|---------------|
| `LLMService.ts` | Add `callClaude()`, modify `parsePrompt()` to try Claude first |
| `prompts/index.ts` | Add `SPECIALTY_REGISTRY` and `getSpecialtyContext()` |
| `PromptParser.ts` | Add `specialty` field to ParsedPrompt, add keyword maps |
| `ContextBuilder.ts` | Use specialty context in `buildGenerationPrompt()` |
| `DiagramGenerator.ts` | Check `parsedPrompt.template` before AI call |
| `AgentMode.tsx` | Delete lines 22-237 (hardcoded generators), simplify error handling |

# FINNISH Project Constitution
## Version 3.0 | Updated: 2026-02-07 | Source: Founder Interview

## Mission
Democratize scientific illustration. One app that solves every illustration problem for the scientific community - AI generates it, you edit it, done.

---

## Core Principles

### 1. The Combination IS the Product
- Agent Mode (AI generation) + Editor Mode (manual editing) = FINNISH
- Neither mode alone is valuable. Agent Mode alone = a Claude wrapper. Editor Mode alone = another BioRender clone.
- The flow: Prompt → AI generates → accept/reject → optionally edit → export

### 2. Verified Accuracy Over Speed
- Curated icon library is the MOAT. Verified scientific icons are used FIRST.
- AI-generated elements are labeled "AI-generated - verify accuracy"
- Track what AI generates most often → add those as verified icons over time

### 3. Users Own Everything
- No forced attribution on paid tier. No licensing restrictions.
- "You made it, it's yours." Full commercial use rights.
- The opposite of BioRender's approach.

### 4. Cost Discipline from Day One
- Prompt caching for system prompts (90% savings on repeated calls)
- Smart model routing: cheap model for simple, capable model for complex
- Template matching: known diagram types (PRISMA, CONSORT) skip AI entirely
- No OpenRouter middleman. Direct API keys only.

### 5. Simplicity Over Features
- Excalidraw-level editor, NOT Adobe Illustrator complexity
- No onboarding tutorial - the app speaks for itself through clean design
- Fast: under 2 seconds to load, "this is going to be easy to use"
- Fix first, add later. Never ship broken features.

---

## Non-Negotiable Rules

1. **Never remove features** - Fix them. If it's broken, debug it.
2. **No code without specs** - Every feature starts with specification, then plan, then tasks.
3. **Test before done** - No task is complete without verification (build passes, feature works).
4. **Commit frequently** - Small, atomic commits with clear messages.
5. **Medical accuracy matters** - We serve doctors and researchers. Inaccurate icons/diagrams can mislead.
6. **PII protection** - Warn users before processing prompts that contain patient-identifiable information.

---

## Tech Stack (Locked)

| Component | Choice | Reason |
|-----------|--------|--------|
| Frontend | React 18 + Vite + TypeScript | Existing codebase, proven |
| Canvas | Fabric.js 6.x | Full-featured, well-documented |
| Auth | Clerk | Easy, familiar to founder |
| Database + Storage | Convex | Pure TypeScript, LLM-debuggable, real-time capable |
| Hosting | Vercel | Easy deployment, free tier sufficient |
| Payments | Lemon Squeezy | Single integration, handles INR + international, taxes |
| AI Primary | Claude Sonnet (Anthropic) | Best at scientific context, structured output |
| AI Secondary | GPT-4o mini or Gemini Flash (paid) | Fast/cheap for simple tasks |
| AI Fallback | DeepSeek | Cost optimization for high-volume |
| AI Image Gen | fal.ai FLUX | Photorealistic/artistic, $0.008/image |

---

## Quality Standards

### Code Quality
- TypeScript strict mode - no `any` without justification
- Build must pass (`tsc --noEmit && vite build`) before any commit
- No console errors in production

### Performance
- App loads in under 2 seconds
- Agent Mode generates diagrams in under 30 seconds
- No heavy splash screens or loading bars

### User Experience
- English only
- Dark mode available (V1)
- Mobile-responsive landing + Agent Mode on mobile
- Editor Mode shows "Open on desktop" on mobile
- Offline Editor Mode works, syncs when connected

---

## Target Users (Priority Order)

1. **Medical professionals** - ALL branches of medicine (primary, go-to-market)
2. **Scientists** - Biology, Chemistry, other disciplines (secondary)
3. **Conference deadline**: July 2026 - live demo to medical audience

---

## Business Model

| Tier | Price | Includes |
|------|-------|----------|
| Free | ₹0 | Editor Mode only, limited icons, low-res PNG with subtle corner watermark, NO Agent Mode |
| Pro | ~₹1,000/month (~$12 USD) | Agent Mode + full Editor, full icons, full-res PNG + SVG + PDF + PPTX, no watermark |
| Team/Lab | ~₹3,000/month | 5 seats, shared assets, higher AI quota |

---

*This constitution guides ALL development decisions. When in doubt, refer here.*

# FINNISH - Central Directive (AGENTS.md)

> **READ THIS FILE FIRST IN EVERY SESSION. This is the single source of truth.**
> **This file serves as the Ralph Wiggum AGENTS.md - operational reference for every loop iteration.**

---

## WHAT IS FINNISH

One app that solves every illustration problem for the scientific community.
AI generates it, you edit it, done. Killing BioRender for academics.

**The Formula**: Agent Mode (AI generation) + Editor Mode (manual editing) = FINNISH
Neither mode alone is the product. The COMBINATION is the product.

**Target**: Medical professionals (all branches) discovering the app at a July 2026 conference.
**The Demo Moment**: Doctor opens FINNISH → types complex diagram prompt → gets publication-quality SVG in 30 seconds → sends to Editor → tweaks in 2 minutes → exports → signs up for Pro.

---

## METHODOLOGY

We use three integrated systems:

### 1. SpecKit (Spec-Driven Development)
Every feature follows: `/speckit.specify` → `/speckit.clarify` → `/speckit.plan` → `/speckit.tasks` → `/speckit.implement`
- Constitution at `specs/constitution.md`
- Feature specs at `.specify/features/`
- Never write code without a spec first

### 2. Task Master (Progress Tracking)
- Tasks at `.taskmaster/tasks/tasks.json`
- PRD at `.taskmaster/docs/prd.txt`
- Use `task-master next` to find the next unblocked task
- Use `task-master set-status --id=<id> --status=done` when verified complete

### 3. Ralph Wiggum Loop (Implementation)
- Each iteration: read plan → pick task → implement → test → commit → loop
- Fresh context per iteration prevents hallucination buildup
- State persists via git commits + this file + tasks.json
- "Fail predictably, iterate to success"
- Build must pass before committing: `npx tsc --noEmit && NODE_OPTIONS="--max-old-space-size=8192" npx vite build`

### 4. Playwright (Verification)
- E2E tests verify features work in a real browser
- Canvas-based testing via screenshot comparison
- No task is "done" without proof it works

---

## BUILD COMMANDS

```bash
# TypeScript check (fast, run frequently)
npx tsc --noEmit

# Full build (needs extra memory for large bundle)
NODE_OPTIONS="--max-old-space-size=8192" npm run build

# Dev server
npm run dev

# Tests (when set up)
npx vitest run

# Playwright E2E (when set up)
npx playwright test
```

---

## TECH STACK (LOCKED - DO NOT CHANGE)

| Component | Choice | Notes |
|-----------|--------|-------|
| Frontend | React 18 + Vite + TypeScript | Existing |
| Styling | Tailwind CSS | ADDED - replaces inline CSS-in-JS progressively |
| Canvas | Fabric.js 6.x | Existing |
| Auth | Clerk | TO BUILD |
| Database | Convex | TO BUILD - Pure TypeScript, LLM-debuggable |
| Hosting | Vercel | TO CONFIGURE |
| Payments | Lemon Squeezy | TO BUILD |
| AI Primary | Claude Sonnet | Complex diagrams |
| AI Secondary | GPT-4o mini or Gemini Flash (paid) | Simple/fast |
| AI Fallback | DeepSeek | Cost optimization |
| AI Image Gen | fal.ai FLUX Turbo | $0.008/image, photorealistic |
| Export | PNG, SVG, PDF (jsPDF), PPTX (pptxgenjs) | ALL V1 |
| Design Model | Claude Opus + frontend-design plugin | NON-NEGOTIABLE for all UI work |

---

## AI COST OPTIMIZATION (MANDATORY)

1. **Prompt caching** - System prompts cached for 90% savings on repeated calls
2. **Smart model routing** - Cheap model (GPT-4o mini/Gemini Flash) for simple diagrams, Claude Sonnet for complex
3. **Template matching** - Known types (PRISMA, CONSORT) skip AI entirely, use structured templates filled with user data
4. **No OpenRouter** - Direct API keys only, no middleman markup
5. **Provider keys available**: Anthropic (Claude), OpenAI (GPT), Google (Gemini with Cloud Billing), DeepSeek

---

## CODEBASE MAP

```
convex/                            # Convex backend (serverless database functions)
├── schema.ts                  # Database schema (projects, users tables)
├── auth.config.ts             # Clerk JWT provider config
├── projects.ts                # Project CRUD mutations & queries
├── users.ts                   # User record mutations & queries
├── storage.ts                 # File storage (thumbnail uploads)
└── _generated/                # Auto-generated types (Convex CLI)

src/
├── App.tsx                    # Router: /, /agent, /editor, /editor/:id, /projects, /credits
├── pages/
│   ├── AgentMode/             # AI diagram generation (CURRENTLY USES HARDCODED SVG - MUST FIX)
│   ├── EditorMode/            # Fabric.js canvas editor + cloud save
│   ├── ProjectsPage/          # My Projects dashboard
│   ├── Welcome/               # Landing page
│   └── CreditsPage/           # CC-BY attribution
├── services/
│   ├── ai/                    # AI pipeline (DiagramGenerator, PromptParser, LLMService, backends/)
│   ├── export/                # PNG, SVG, PDF, TikZ exporters
│   └── templates/             # Diagram templates
├── store/                     # Zustand stores (single source of truth)
│   ├── useAgentStore.ts
│   ├── editorStore.ts
│   ├── layerStore.ts
│   ├── exportStore.ts
│   └── conversationStore.ts
├── lib/
│   ├── icons/                 # 12,000+ icons (Tabler, Health, Science, Bioicons, SciDraw, etc.)
│   ├── export/pptx.ts         # PPTX export (pptxgenjs)
│   ├── image/                 # Background removal (MediaPipe)
│   ├── ai/                    # fal.ai integration
│   └── canvas/                # Fabric.js utilities
├── components/                # Shared UI components
└── hooks/                     # Custom React hooks
```

---

## CURRENT STATE (2026-02-07)

### What Works
- [x] TypeScript build passes (stale .d.ts files deleted)
- [x] Vite build passes (needs NODE_OPTIONS="--max-old-space-size=8192")
- [x] Editor Mode UI exists with 15+ tools
- [x] Export pipeline exists (PNG, SVG, PDF, TikZ in services/export/, PPTX in lib/export/)
- [x] Icon library: 12,000+ icons across 7 libraries + custom specialties
- [x] Background removal: MediaPipe (browser-based, free)
- [x] State management: Clean single src/store/ (no duplication)
- [x] Routing: Agent Mode, Editor Mode, Welcome, Credits pages
- [x] Authentication: Clerk (email/password + Google OAuth) - Task 4 DONE
- [x] Tier-based access: Free (Editor only), Pro (Agent + Editor), Team
- [x] Auth-aware routing: Protected routes, sign-in redirect, upgrade CTAs
- [x] Database: Convex schema, mutations, queries (projects + users) - Task 5 DONE
- [x] Cloud saving: Save/load diagrams to Convex with thumbnails
- [x] My Projects dashboard: /projects with grid, delete, navigation
- [x] Auto-save: 30-second debounce, save status indicator
- [x] User record sync: Lazy creation from Clerk identity
- [x] localStorage migration: Prompt to move browser diagrams to cloud

### What's Broken
- [ ] AgentMode uses HARDCODED SVG templates, NOT real AI (Task 2)
- [ ] AI pipeline exists in services/ai/ but is DISCONNECTED from AgentMode
- [ ] Send to Editor flow untested end-to-end (Task 3)

### What's Missing
- [x] Authentication (Clerk) - Task 4 DONE
- [ ] Database & cloud saving (Convex) - Task 5
- [ ] My Projects dashboard - Task 6
- [ ] Version history - Task 7
- [ ] Lemon Squeezy payments - Task 12
- [ ] Dark mode - Task 14
- [ ] Mobile responsive - Task 15
- [ ] Offline mode with sync - Task 16
- [ ] PII detection - Task 17
- [ ] AI image generation (fal.ai) wired to Agent Mode - Task 26
- [ ] Smart model routing - Task 10
- [ ] Playwright E2E tests - Task 25

---

## TASK DEPENDENCY MAP (Critical Path)

```
Task 1 (Fix build) ✅ DONE
    │
    ├── Task 2 (Wire Agent Mode to real AI) ← NEXT PRIORITY
    │   ├── Task 3 (Send to Editor flow)
    │   │   └── Task 11 (Iterative refinement)
    │   ├── Task 9 (Sketch/photo upload)
    │   ├── Task 10 (Smart model routing)
    │   └── Task 17 (PII detection)
    │
    ├── Task 4 (Clerk auth) ← CAN RUN PARALLEL WITH Task 2
    │   ├── Task 5 (Convex database)
    │   │   ├── Task 6 (My Projects)
    │   │   │   └── Task 15 (Mobile responsive)
    │   │   │       └── Task 21 (Landing page)
    │   │   ├── Task 7 (Version history)
    │   │   ├── Task 16 (Offline mode)
    │   │   └── Task 23 (Vercel deploy)
    │   └── Task 12 (Lemon Squeezy)
    │       └── Task 13 (Free tier limits)
    │
    ├── Task 8 (Verify Editor features) ← CAN RUN PARALLEL
    │   ├── Task 18 (Canvas presets)
    │   └── Task 20 (Curate icons)
    │
    ├── Task 14 (Dark mode) ← INDEPENDENT
    │
    └── Task 22 (Waitlist page) ← INDEPENDENT, DO ANYTIME
```

---

## DECISIONS MADE (DO NOT REVISIT)

1. **AI Image Generation (fal.ai)** → V1, not deferred
2. **LLM Provider** → Tiered: Claude Sonnet (primary) + GPT-4o mini/Gemini Flash (secondary) + DeepSeek (fallback)
3. **PDF/PPTX Export** → V1, code exists, debug if broken
4. **Database** → Convex (not Supabase, not Firebase)
5. **Payments** → Lemon Squeezy (not Stripe)
6. **No OpenRouter** → Direct API keys only
7. **Content ownership** → Users own everything, no forced attribution
8. **Mobile** → Agent Mode works on mobile, Editor Mode = "open on desktop"

---

## PER-SESSION WORKFLOW

1. Read this CLAUDE.md file
2. Run `task-master next` to find next unblocked task
3. Run `task-master show <id>` for full task details
4. If the task involves a new feature: `/speckit.specify` first
5. Implement following Ralph Loop: implement → verify build → test → commit
6. `task-master set-status --id=<id> --status=done`
7. Update this file's CURRENT STATE section before ending session

---

## COMMIT FORMAT

```
feat: <description> (task <id>)
fix: <description> (task <id>)
chore: <description>
```

---

## PARALLEL EXECUTION STRATEGY

Maximum parallelism: run independent task chains simultaneously.

**Chain A** (AI Core): Tasks 2 → 3 → 11 → 9 → 10
**Chain B** (Infrastructure): Tasks 4 → 5 → 6 → 7 → 12
**Chain C** (Editor Polish): Tasks 8 → 18 → 20
**Chain D** (UI/UX): Tasks 14, 15, 21, 22

Chains A, B, C, D can all run in parallel terminals.

---

*Last updated: 2026-02-07 | Session 10 - Chain B: Task 4 (Clerk Auth) DONE, moving to Task 5 (Convex)*

## Active Technologies
- TypeScript 5.x (React 18 + Vite) + Fabric.js 6.x, Mermaid.js (rendering), Anthropic SDK (new), OpenAI SDK (existing) (001-wire-agent-ai)
- localStorage (conversation persistence), Zustand (state management) (001-wire-agent-ai)
- TypeScript 5.x (strict mode) + convex (SDK), @clerk/clerk-react (auth, already installed), convex/react-clerk (auth bridge), React 18, Zustand (state) (003-convex-cloud-saving)
- Convex (real-time database + file storage for thumbnails) (003-convex-cloud-saving)

## Recent Changes
- 001-wire-agent-ai: Added TypeScript 5.x (React 18 + Vite) + Fabric.js 6.x, Mermaid.js (rendering), Anthropic SDK (new), OpenAI SDK (existing)

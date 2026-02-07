# SESSION HANDOFF - Read This to Resume

## Quick Start for New Session
```
Read CLAUDE.md, then task-master next, then git log --oneline -10 && git status
```

## What Is This Project
FINNISH - Scientific illustration app. AI generates diagrams, user edits them, exports for publication. Killing BioRender. Built with React + Vite + TypeScript + Fabric.js. Target: July 2026 medical conference demo.

## Methodology Stack
1. **SpecKit** - Define features before coding: /speckit.specify → /speckit.clarify → /speckit.plan → /speckit.tasks → /speckit.implement
2. **Task Master** - 28 tasks in .taskmaster/tasks/tasks.json with dependencies
3. **Ralph Wiggum Loop** - Iterate: implement → verify build → test → commit → next task
4. **Playwright** - E2E browser testing for verification

## Key Files
- `CLAUDE.md` - Central directive (AGENTS.md), auto-loaded every session
- `.taskmaster/tasks/tasks.json` - All tasks and status
- `.taskmaster/docs/prd.txt` - Product requirements (from founder interview)
- `specs/constitution.md` - Project principles and tech stack
- `INTERVIEW.md` - Full founder interview (2,965 lines, source of truth for vision)
- `specs/*/` - Per-feature SpecKit artifacts (spec.md, plan.md, tasks.md)

## Tech Stack (Locked)
React 18 + Vite + TypeScript | Fabric.js 6.x | Clerk (auth) | Convex (database) | Vercel (hosting) | Lemon Squeezy (payments) | Claude Sonnet (AI primary) | GPT-4o mini/Gemini Flash (AI secondary) | DeepSeek (AI fallback) | fal.ai FLUX (image gen)

## Build Commands
```bash
npx tsc --noEmit                                    # TypeScript check
NODE_OPTIONS="--max-old-space-size=8192" npm run build  # Full build
npm run dev                                          # Dev server
```

## Parallel Chains (4 independent work streams)
- **Chain A** (AI Core): Tasks 2 → 3 → 11 → 9 → 10 → 26
- **Chain B** (Infrastructure): Tasks 4 → 5 → 6 → 7 → 12
- **Chain C** (Editor Polish): Tasks 8 → 18 → 20 → 27
- **Chain D** (UI/UX): Tasks 14, 15, 21, 22

## Decisions Made (Do Not Revisit)
1. fal.ai image gen = V1 (not deferred)
2. LLM = tiered: Claude Sonnet + GPT-4o mini/Gemini Flash + DeepSeek
3. PDF/PPTX = V1 (code exists, fix if broken)
4. Database = Convex (not Supabase)
5. Payments = Lemon Squeezy (not Stripe)
6. No OpenRouter
7. Users own all content
8. Mobile: Agent Mode works, Editor Mode = desktop only

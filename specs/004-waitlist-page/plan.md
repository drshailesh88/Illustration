# Implementation Plan: Waitlist Landing Page

**Branch**: `004-waitlist-page` | **Date**: 2026-02-07 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/004-waitlist-page/spec.md`

## Summary

Build a single-page waitlist landing page at `/waitlist` that collects email signups from scientists and medical professionals before the July 2026 conference launch. The page displays a compelling headline, 3-4 feature highlights with icons, social proof messaging, a live signup count, and an email form. Signups are stored in the existing Convex database with duplicate prevention. Referral source tracking via URL parameters. Mobile-first responsive design using the existing FINNISH dark theme CSS variables.

## Technical Context

**Language/Version**: TypeScript 5.x (React 18 + Vite)
**Primary Dependencies**: React, Convex (already installed), existing CSS variable system
**Storage**: Convex — new `waitlist` table in existing schema
**Testing**: Manual browser testing + build verification (`tsc --noEmit && vite build`)
**Target Platform**: Web (modern browsers, mobile and desktop)
**Project Type**: Web application (existing React SPA)
**Performance Goals**: Page loads and becomes interactive within 2 seconds
**Constraints**: Must match existing dark theme, publicly accessible (no auth required), mobile-first (320px+)
**Scale/Scope**: Single page, 1 new Convex table, 2 Convex functions, 1 React component + CSS

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| The Combination IS the Product | N/A | Waitlist is pre-launch marketing, not product feature |
| Verified Accuracy Over Speed | N/A | No scientific content on waitlist page |
| Users Own Everything | N/A | Just email collection, no user-generated content |
| Cost Discipline from Day One | PASS | No AI calls, minimal Convex usage, zero cost feature |
| Simplicity Over Features | PASS | Single page, minimal scope, no over-engineering |
| No code without specs | PASS | Spec written first (spec.md) |
| Test before done | PASS | Build verification planned |
| Medical accuracy | N/A | No medical content |
| Frontend Design Standard | PASS | Will use existing CSS variables / dark theme system |
| Performance (<2s load) | PASS | Static content + single query, well under 2s |

**Gate Result**: PASS — No violations. Proceeding.

## Project Structure

### Documentation (this feature)

```text
specs/004-waitlist-page/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Phase 0 research
├── data-model.md        # Waitlist data model
├── quickstart.md        # Integration test scenarios
├── contracts/           # Convex function contracts
│   └── convex-contracts.md
└── tasks.md             # Task breakdown (created by /speckit.tasks)
```

### Source Code (repository root)

```text
convex/
├── schema.ts            # MODIFY — add waitlist table
└── waitlist.ts          # NEW — joinWaitlist mutation + getWaitlistCount query

src/
├── App.tsx              # MODIFY — add /waitlist route
└── pages/
    └── WaitlistPage/
        ├── WaitlistPage.tsx    # NEW — main waitlist page component
        └── WaitlistPage.css    # NEW — responsive styles
```

**Structure Decision**: Minimal footprint — 1 new Convex file, 1 new page component with CSS, 2 modified files (schema, router). No new hooks needed — Convex `useMutation` and `useQuery` used directly in the page component.

## Implementation Steps

1. Add `waitlist` table to `convex/schema.ts` with email (unique index), signupDate, referralSource fields
2. Create `convex/waitlist.ts` with `joinWaitlist` mutation (duplicate check, stores signup) and `getWaitlistCount` query (returns total count)
3. Create `src/pages/WaitlistPage/WaitlistPage.tsx` — single-page component with hero headline, feature highlights grid, social proof, email form, live count
4. Create `src/pages/WaitlistPage/WaitlistPage.css` — mobile-first responsive styles using existing CSS variables
5. Update `src/App.tsx` — add `/waitlist` public route (no auth required)
6. Verify build passes: `tsc --noEmit && vite build`

## Complexity Tracking

No constitution violations — this table is empty (no complexity justifications needed).

# Tasks: Clerk Authentication

**Input**: Design documents from `/specs/002-clerk-auth/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: Not explicitly requested in spec. Manual browser testing only.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install Clerk SDK and configure environment

- [x] T001 Install @clerk/clerk-react dependency via `npm install @clerk/clerk-react`
- [x] T002 Create `.env.local` with `VITE_CLERK_PUBLISHABLE_KEY=pk_test_placeholder` at project root
- [x] T003 Add VITE_CLERK_PUBLISHABLE_KEY type declaration in `src/vite-env.d.ts`
- [x] T004 Add `SubscriptionTier` type (`'free' | 'pro' | 'team'`) and `SubscriptionInfo` interface to `src/types/index.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: ClerkProvider wrapper and core auth hook that ALL user stories depend on

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Wrap `<App />` with `<ClerkProvider publishableKey={...}>` in `src/main.tsx` — read publishable key from `import.meta.env.VITE_CLERK_PUBLISHABLE_KEY`, throw error if missing, set `afterSignOutUrl="/"`
- [x] T006 Create `useSubscription()` hook in `src/hooks/useSubscription.ts` — wraps Clerk `useUser()`, reads `user.publicMetadata.subscriptionTier`, returns `{ tier, isLoaded, isPro, isFree, isTeam, canAccessAgentMode, canExportFullRes, canAccessFullIcons }` per contracts/auth-contracts.md
- [x] T007 Verify TypeScript build passes: `npx tsc --noEmit`

**Checkpoint**: Foundation ready — ClerkProvider active, useSubscription hook available

---

## Phase 3: User Story 1 — Sign Up and Sign In (Priority: P1) MVP

**Goal**: Users can create accounts via email/password or Google OAuth, sign in, and be redirected to Editor Mode

**Independent Test**: Visit /sign-up, create account, verify redirect to /editor. Sign out, sign back in via /sign-in, verify redirect works.

### Implementation for User Story 1

- [x] T008 [P] [US1] Create `src/components/Auth/ProtectedLayout.tsx` — uses `useAuth()` from Clerk, shows loading spinner while `!isLoaded`, redirects to `/sign-in` with return URL via `<Navigate to="/sign-in" state={{ from: location }} />` when `!isSignedIn`, renders `<Outlet />` when authenticated
- [x] T009 [P] [US1] Create sign-in page route: add `<Route path="/sign-in/*" element={<SignInPage />} />` in `src/App.tsx` — render Clerk `<SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" fallbackRedirectUrl="/editor" />` centered on page
- [x] T010 [P] [US1] Create sign-up page route: add `<Route path="/sign-up/*" element={<SignUpPage />} />` in `src/App.tsx` — render Clerk `<SignUp routing="path" path="/sign-up" signInUrl="/sign-in" fallbackRedirectUrl="/editor" />` centered on page
- [x] T011 [US1] Update route structure in `src/App.tsx` — wrap `/agent`, `/editor`, `/editor/:id` routes inside `<Route element={<ProtectedLayout />}>` layout route; keep `/`, `/credits`, `/sign-in/*`, `/sign-up/*` public; keep `/*` fallback to Welcome
- [x] T012 [US1] Verify build passes and sign-in/sign-up routes render: `npx tsc --noEmit && NODE_OPTIONS="--max-old-space-size=8192" npm run build`

**Checkpoint**: Users can sign up (email/password + Google), sign in, access protected routes, and get redirected properly

---

## Phase 4: User Story 2 — Tier-Based Access Control (Priority: P1)

**Goal**: Free users are blocked from Agent Mode with upgrade CTA. Pro users have full access. Export gating prepared.

**Independent Test**: Sign in as Free user → navigate to /agent → see upgrade CTA. Set publicMetadata to `pro` in Clerk Dashboard → refresh → access /agent fully.

### Implementation for User Story 2

- [x] T013 [P] [US2] Create `src/components/Auth/UpgradeCTA.tsx` — accepts `feature: string` and optional `description: string` props; renders styled card with feature name, description of Pro benefits (Agent Mode, full icons, all export formats, no watermark), and "Upgrade to Pro" button (links to `/pricing` or shows placeholder); uses existing CSS variable system (`--bg-secondary`, `--text-primary`, `--accent-primary`)
- [x] T014 [P] [US2] Create `src/components/Auth/ProGate.tsx` — accepts `children` and optional `fallback` props; uses `useSubscription()` hook; if `isPro` render children, if `isFree` render fallback (defaults to `<UpgradeCTA feature="this feature" />`); show nothing while `!isLoaded`
- [x] T015 [US2] Gate Agent Mode in `src/App.tsx` — wrap the `/agent` route element with `<ProGate fallback={<UpgradeCTA feature="Agent Mode" description="AI-powered diagram generation requires a Pro subscription." />}>` so Free users see upgrade prompt instead of AgentMode
- [x] T016 [US2] Verify build passes: `npx tsc --noEmit`

**Checkpoint**: Free users see upgrade CTA on /agent. Pro users access Agent Mode. Tier gating works end-to-end.

---

## Phase 5: User Story 3 — Auth-Aware Navigation (Priority: P2)

**Goal**: Welcome page shows auth-appropriate CTAs. Authenticated pages show user avatar with sign-out dropdown.

**Independent Test**: Visit / unauthenticated → see Sign In/Sign Up buttons. Sign in → see avatar/UserButton on Welcome and Editor pages. Click sign out → return to /.

### Implementation for User Story 3

- [x] T017 [US3] Update `src/pages/Welcome/Welcome.tsx` header — import `SignedIn`, `SignedOut`, `UserButton`, `SignInButton`, `SignUpButton` from `@clerk/clerk-react`; in header section add: `<SignedOut>` with "Sign In" and "Sign Up" buttons (use `<SignInButton>` and `<SignUpButton>` with `mode="redirect"`); `<SignedIn>` with `<UserButton afterSignOutUrl="/" />` showing avatar
- [x] T018 [US3] Verify all redirects work correctly: unauthenticated visit to /agent → /sign-in → after auth → /agent (if Pro) or upgrade CTA (if Free); unauthenticated visit to /editor → /sign-in → after auth → /editor
- [x] T019 [US3] Verify build passes: `npx tsc --noEmit`

**Checkpoint**: Navigation adapts to auth state. Welcome page has auth CTAs. Protected routes redirect correctly.

---

## Phase 6: User Story 4 — User Profile and Session Management (Priority: P3)

**Goal**: Authenticated users see profile info, tier badge, and can sign out. Sessions persist across browser restarts.

**Independent Test**: Sign in → click avatar → see name, email, tier. Close browser → reopen → still signed in. Click Sign Out → redirected to /.

### Implementation for User Story 4

- [x] T020 [US4] Enhance `<UserButton>` usage in `src/pages/Welcome/Welcome.tsx` — add `showName` prop to display user name next to avatar; set `userProfileMode="navigation"` for full profile management
- [x] T021 [US4] Verify session persistence: sign in, close browser tab, reopen app — should remain authenticated (Clerk handles this by default, just verify)
- [x] T022 [US4] Verify build passes: `npx tsc --noEmit`

**Checkpoint**: Profile display, session persistence, and sign-out all working

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final verification, edge cases, and cleanup

- [x] T023 Add `.env.local` to `.gitignore` if not already present (ensure Clerk keys never committed)
- [x] T024 Full build verification: `npx tsc --noEmit && NODE_OPTIONS="--max-old-space-size=8192" npm run build`
- [x] T025 Manual end-to-end smoke test: complete flow from Welcome → Sign Up → Editor → /agent (upgrade CTA for Free) → Sign Out → Sign In → repeat with Pro metadata set in Clerk Dashboard

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational — BLOCKS US3 (navigation needs auth routes)
- **User Story 2 (Phase 4)**: Depends on Foundational — can run PARALLEL with US1 (different files)
- **User Story 3 (Phase 5)**: Depends on US1 (needs sign-in routes to exist) and US2 (needs ProGate)
- **User Story 4 (Phase 6)**: Depends on US3 (needs UserButton in header)
- **Polish (Phase 7)**: Depends on all user stories complete

### Within Each User Story

- Tasks marked [P] within a phase can run in parallel
- Non-[P] tasks must run sequentially
- Build verification is always the last task in each phase

### Parallel Opportunities

```
Phase 1 (Setup): T001 → T002, T003, T004 [parallel]
Phase 2 (Foundation): T005 → T006 → T007
Phase 3 (US1) + Phase 4 (US2): Can run in PARALLEL
  US1: T008, T009, T010 [parallel] → T011 → T012
  US2: T013, T014 [parallel] → T015 → T016
Phase 5 (US3): T017 → T018 → T019
Phase 6 (US4): T020 → T021 → T022
Phase 7 (Polish): T023, T024 [parallel] → T025
```

---

## Parallel Example: Phase 3 + Phase 4

```bash
# US1 and US2 can run in parallel since they touch different files:

# US1 tasks (auth routes + protected layout):
Task: "Create ProtectedLayout.tsx"          # src/components/Auth/ProtectedLayout.tsx
Task: "Create sign-in page route"           # src/App.tsx (sign-in route)
Task: "Create sign-up page route"           # src/App.tsx (sign-up route)

# US2 tasks (tier gating components):
Task: "Create UpgradeCTA.tsx"               # src/components/Auth/UpgradeCTA.tsx
Task: "Create ProGate.tsx"                  # src/components/Auth/ProGate.tsx

# Then sequentially: T011 (App.tsx route restructure) and T015 (Agent Mode gating)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T004)
2. Complete Phase 2: Foundational (T005-T007)
3. Complete Phase 3: User Story 1 (T008-T012)
4. **STOP and VALIDATE**: Sign up, sign in, protected routes work
5. This alone proves auth is functional

### Incremental Delivery

1. Setup + Foundational → Clerk active in app
2. Add US1 → Sign in/up works → MVP!
3. Add US2 → Tier gating works → Business model enforceable
4. Add US3 → Navigation adapts → User experience complete
5. Add US4 → Profile management → Professional polish
6. Polish → Edge cases handled → Ship ready

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- No test tasks generated (not requested in spec — manual testing via quickstart.md)
- Clerk handles email verification, password reset, Google OAuth flows built-in
- Subscription tier set manually via Clerk Dashboard for testing until Task 12 (Lemon Squeezy)
- All new components use existing CSS variable system (no new styling infrastructure)
- Commit after each phase checkpoint

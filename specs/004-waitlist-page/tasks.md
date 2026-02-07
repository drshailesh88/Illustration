# Tasks: Waitlist Landing Page

**Input**: Design documents from `/specs/004-waitlist-page/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/convex-contracts.md

**Tests**: Not explicitly requested in spec. Manual browser testing + build verification only.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Add waitlist table to Convex schema and update generated stubs

- [x] T001 Add `waitlist` table to `convex/schema.ts` — define table with fields: email (v.string()), signupDate (v.number()), referralSource (v.string()); add indexes: `by_email` on `[email]`, `by_signupDate` on `[signupDate]` per data-model.md
- [x] T002 Update `convex/_generated/api.d.ts` — add `waitlist` namespace with `joinWaitlist` (FunctionReference<"mutation">) and `getWaitlistCount` (FunctionReference<"query">) type stubs so TypeScript build passes without running `npx convex dev`

---

## Phase 2: User Story 1 + 2 — Email Signup & Page Content (Priority: P1) MVP

**Goal**: Visitors can see the waitlist page with compelling content and sign up with their email. Duplicate prevention works. Success/error states display correctly.

**Independent Test**: Navigate to `/waitlist`, verify headline, feature highlights, social proof, and email form render. Enter email, submit, verify success message. Enter same email again, verify "already on the list" message.

### Implementation for User Story 1 + 2

- [x] T003 [P] [US1] Create `convex/waitlist.ts` — implement `joinWaitlist` mutation (public, no auth): normalize email (trim + lowercase), validate format (contains @ and . after @), query `by_email` index for duplicates, insert if new with `{ email, signupDate: Date.now(), referralSource: args.referralSource ?? "" }`, return `{ status: "success" | "already_exists", message: string }` per contracts/convex-contracts.md
- [x] T004 [P] [US2] Create `src/pages/WaitlistPage/WaitlistPage.css` — mobile-first responsive styles: full-page dark theme layout using CSS variables (--bg-primary, --text-primary, --accent-primary); hero section centered; feature highlights grid (1 col mobile, 2 col tablet, 4 col desktop at breakpoints 640px, 1024px); email form with full-width input + button on mobile; success/error message styles; social proof section
- [x] T005 [US1+US2] Create `src/pages/WaitlistPage/WaitlistPage.tsx` — single-page component with: hero section (headline "One app that solves every illustration problem for the scientific community", subtitle), 4 feature highlights with SVG icons (AI Generation, Manual Editing, Export Anywhere, Verified Icons), social proof ("Built by a doctor, for doctors"), email signup form (controlled input, `useMutation(api.waitlist.joinWaitlist)`, submit handler with try/catch, success/error/already-exists result states), form validation (HTML5 type="email" + required attribute); uses existing CSS variable system; import WaitlistPage.css
- [x] T006 [US1+US2] Update `src/App.tsx` — add `/waitlist` route as a PUBLIC route (outside ProtectedLayout): `<Route path="/waitlist" element={<WaitlistPage />} />`; import WaitlistPage
- [x] T007 [US1+US2] Verify build passes: `npx tsc --noEmit`

**Checkpoint**: Waitlist page renders with all content. Email signup works with duplicate prevention. Page is publicly accessible at /waitlist.

---

## Phase 3: User Story 3 — Live Signup Count (Priority: P2)

**Goal**: Visitors see a real-time count of waitlist signups displayed prominently on the page.

**Independent Test**: Load `/waitlist`, verify count displays. Submit a new email, verify count increments in real-time.

### Implementation for User Story 3

- [x] T008 [US3] Add `getWaitlistCount` query to `convex/waitlist.ts` — public query (no auth), collects all documents in waitlist table, returns count as number per contracts/convex-contracts.md
- [x] T009 [US3] Update `src/pages/WaitlistPage/WaitlistPage.tsx` — add `useQuery(api.waitlist.getWaitlistCount)` to fetch live count; display "Join {count} scientists on the waitlist" when count > 0, "Be the first to join" when count === 0, hide section while loading (count === undefined); position count near the email form
- [x] T010 [US3] Verify build passes: `npx tsc --noEmit`

**Checkpoint**: Live signup count displays and updates reactively. Zero-state handled.

---

## Phase 4: User Story 4 — Referral Source Tracking (Priority: P3)

**Goal**: System captures referral source from URL parameters (e.g., ?ref=twitter) and stores with signup.

**Independent Test**: Navigate to `/waitlist?ref=twitter`, submit email, verify referral source stored. Navigate to `/waitlist` (no ref), submit email, verify empty referral source.

### Implementation for User Story 4

- [x] T011 [US4] Update `src/pages/WaitlistPage/WaitlistPage.tsx` — add `useSearchParams()` from react-router-dom to read `ref` URL parameter; pass `referralSource: searchParams.get("ref") ?? undefined` to `joinWaitlist` mutation call
- [x] T012 [US4] Verify build passes: `npx tsc --noEmit`

**Checkpoint**: Referral source captured from URL and stored with signup records.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final verification, error handling, and build validation

- [ ] T013 Full build verification: `npx tsc --noEmit && NODE_OPTIONS="--max-old-space-size=8192" npm run build`
- [ ] T014 Manual end-to-end smoke test: complete flow from visiting /waitlist → read content → enter email → submit → see success → try duplicate → see friendly message → check mobile layout → verify count

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **US1+US2 (Phase 2)**: Depends on Setup — core page and email signup
- **US3 (Phase 3)**: Depends on US1+US2 (adds count to existing page component)
- **US4 (Phase 4)**: Depends on US1+US2 (adds referral param to existing form handler)
- **Polish (Phase 5)**: Depends on all user stories complete

### Within Each Phase

- Tasks marked [P] can run in parallel
- Non-[P] tasks must run sequentially
- Build verification is always the last task in each phase

### Parallel Opportunities

```
Phase 1 (Setup): T001 → T002
Phase 2 (US1+US2): T003, T004 [parallel] → T005 → T006 → T007
Phase 3 (US3): T008 → T009 → T010
Phase 4 (US4): T011 → T012
Phase 5 (Polish): T013 → T014
```

Note: US3 and US4 could run in parallel since they modify different parts of WaitlistPage.tsx, but to avoid merge conflicts they're sequenced.

---

## Implementation Strategy

### MVP First (User Story 1 + 2)

1. Complete Phase 1: Setup (T001-T002)
2. Complete Phase 2: US1+US2 (T003-T007) — Page renders, email signup works
3. **STOP and VALIDATE**: Visit /waitlist, sign up, verify success, try duplicate
4. This alone is a functional waitlist page ready for sharing

### Incremental Delivery

1. Setup → Schema ready
2. Add US1+US2 → Core waitlist page functional → MVP!
3. Add US3 → Live count adds social proof
4. Add US4 → Referral tracking for marketing
5. Polish → Full build verification → Production ready

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- No test tasks generated (not requested in spec — manual testing via quickstart.md)
- US1 and US2 are combined into one phase because they share the same component (WaitlistPage.tsx) — cannot be implemented independently
- The `joinWaitlist` mutation is PUBLIC (no ctx.auth check) since visitors are unauthenticated
- Convex `_generated` stubs must be updated for new waitlist functions (T002)
- Total: 14 tasks across 5 phases

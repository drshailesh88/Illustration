# Tasks: Convex Database and Cloud Saving

**Input**: Design documents from `/specs/003-convex-cloud-saving/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/convex-contracts.md

**Tests**: Not explicitly requested in spec. Manual browser testing + build verification only.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4, US5)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install Convex SDK and configure environment

- [x] T001 Install `convex` dependency via `npm install convex`
- [x] T002 Run `npx convex dev` to initialize Convex project — creates `convex/` directory, `convex/_generated/`, and adds `CONVEX_DEPLOYMENT` + `VITE_CONVEX_URL` to `.env.local`
- [x] T003 Add `VITE_CONVEX_URL` type declaration in `src/vite-env.d.ts` — add `readonly VITE_CONVEX_URL: string;` to ImportMetaEnv interface
- [x] T004 [P] Create `convex/auth.config.ts` — export default config with Clerk provider: `{ providers: [{ domain: process.env.CLERK_JWT_ISSUER_DOMAIN, applicationID: "convex" }] }`
- [x] T005 [P] Create `convex/schema.ts` — define schema with `projects` table (userId, title, diagramData, thumbnailId, createdAt, updatedAt, version) and `users` table (tokenIdentifier, email, subscriptionTier, aiGenerationsUsed, aiGenerationsLimit, exportCount, createdAt, updatedAt) with indexes per data-model.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Wire ConvexProviderWithClerk and implement user record sync — ALL user stories depend on this

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Update `src/main.tsx` — replace plain App render with `ConvexProviderWithClerk`: import `ConvexReactClient` from `convex/react`, `ConvexProviderWithClerk` from `convex/react-clerk`, `useAuth` from `@clerk/clerk-react`; create `const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL)` and wrap App: `<ClerkProvider><ConvexProviderWithClerk client={convex} useAuth={useAuth}><App /></ConvexProviderWithClerk></ClerkProvider>`
- [x] T007 [P] Create `convex/users.ts` — implement `getOrCreateUser` mutation (lazy user creation from ctx.auth.getUserIdentity, returns user _id) and `getUser` query (returns current user record or null) per contracts/convex-contracts.md
- [x] T008 [P] Create `src/hooks/useCurrentUser.ts` — hook that calls `getOrCreateUser` mutation on mount and queries `getUser` for current state; returns `{ user, isLoading }`
- [x] T009 Verify TypeScript build passes: `npx tsc --noEmit`

**Checkpoint**: Foundation ready — Convex connected, user records created on auth, all hooks can use Convex queries/mutations

---

## Phase 3: User Story 1 — Save and Load Diagrams to the Cloud (Priority: P1) MVP

**Goal**: Authenticated users can save diagrams to cloud and reload them with all content intact

**Independent Test**: Sign in, create diagram in Editor, click Save, refresh page, verify diagram reloads from cloud. Sign in from incognito window and verify same diagram accessible.

### Implementation for User Story 1

- [x] T010 [P] [US1] Create `convex/projects.ts` — implement `saveProject` mutation (validates auth, enforces Free tier 10-project limit, inserts with version=1), `updateProject` mutation (validates ownership, patches fields, increments version), `deleteProject` mutation (validates ownership, deletes thumbnail from storage, deletes document), `getProject` query (validates ownership, resolves thumbnailUrl) per contracts/convex-contracts.md
- [x] T011 [P] [US1] Create `convex/storage.ts` — implement `generateUploadUrl` mutation (validates auth, returns ctx.storage.generateUploadUrl()) per contracts/convex-contracts.md
- [x] T012 [P] [US1] Create `src/hooks/useProject.ts` — hook wrapping Convex queries/mutations: `useProject(projectId?)` returns `{ project, isLoading, save, update, remove, saveStatus }` with save status tracking ("idle" | "saving" | "saved" | "error")
- [x] T013 [US1] Create `src/components/SaveButton/SaveButton.tsx` — save button component with status indicator (shows "Save" when idle, spinner when saving, checkmark when saved, error icon on failure); accepts `onSave` callback and `saveStatus` prop; uses existing CSS variable system
- [x] T014 [US1] Update `src/pages/EditorMode/EditorMode.tsx` — integrate cloud save/load: on mount with URL param `:id`, load project from Convex via `useProject(id)`; add SaveButton to toolbar; on save, call `canvas.toJSON()` → JSON.stringify → save mutation; generate thumbnail via `canvas.toDataURL({ format: 'png', multiplier: 0.25 })` → convert to Blob → upload to Convex file storage → include storageId in save
- [x] T015 [US1] Update `src/App.tsx` — update `handleSendToEditor` to save Agent Mode diagrams to Convex instead of localStorage; navigate to `/editor/:convexProjectId` after save
- [x] T016 [US1] Verify build passes: `npx tsc --noEmit`

**Checkpoint**: Users can save diagrams to cloud and reload them. Agent → Editor flow uses Convex. Save button shows status.

---

## Phase 4: User Story 2 — My Projects Dashboard (Priority: P1)

**Goal**: Authenticated users see all their saved diagrams in a grid with thumbnails, can open or delete projects

**Independent Test**: Save 3 diagrams with different titles, navigate to My Projects, verify all 3 appear with correct thumbnails and titles. Delete one, verify it disappears. Click one to open it in Editor.

### Implementation for User Story 2

- [x] T017 [P] [US2] Add `getProjects` paginated query to `convex/projects.ts` — uses `paginationOptsValidator`, queries with `by_userId_updatedAt` index, orders descending, resolves thumbnailUrl for each project per contracts/convex-contracts.md
- [x] T018 [P] [US2] Create `src/hooks/useProjects.ts` — hook using `usePaginatedQuery` with `getProjects`, returns `{ projects, status, loadMore, isLoading }` per contracts/convex-contracts.md
- [x] T019 [P] [US2] Create `src/pages/ProjectsPage/ProjectCard.tsx` — project card component displaying thumbnail image, title, last-modified date (relative time format e.g., "2 hours ago"), and delete button; uses existing CSS variable system; click navigates to `/editor/:id`
- [x] T020 [P] [US2] Create `src/pages/ProjectsPage/ProjectsPage.css` — styles for projects grid (responsive CSS grid, 3 columns desktop / 2 tablet / 1 mobile), card hover effects, empty state styling
- [x] T021 [US2] Create `src/pages/ProjectsPage/ProjectsPage.tsx` — My Projects page with header ("My Projects"), project grid using ProjectCard components, empty state ("No projects yet — create your first diagram!") with CTA button to /editor, delete confirmation dialog (simple confirm/cancel modal), "Load More" button when more projects available
- [x] T022 [US2] Update `src/App.tsx` — add `/projects` route inside `<ProtectedLayout>` wrapper: `<Route path="/projects" element={<ProjectsPage />} />`; add navigation link to My Projects in relevant places
- [x] T023 [US2] Update `src/pages/Welcome/Welcome.tsx` — add "My Projects" navigation link for signed-in users (inside `<SignedIn>` block alongside UserButton)
- [x] T024 [US2] Verify build passes: `npx tsc --noEmit`

**Checkpoint**: My Projects dashboard shows all user projects with thumbnails. Users can open and delete projects.

---

## Phase 5: User Story 3 — Auto-Save and Thumbnail Generation (Priority: P2)

**Goal**: System auto-saves every 30 seconds after changes. Thumbnails are generated on each save for dashboard display.

**Independent Test**: Open a saved diagram, make changes, wait 30+ seconds without saving, close tab, reopen — verify changes auto-saved. Check My Projects, verify thumbnail reflects latest state.

### Implementation for User Story 3

- [x] T025 [US3] Create `src/hooks/useAutoSave.ts` — hook accepting `projectId` (string | null) and `getCanvasState` callback; uses 30-second debounce timer that resets on canvas changes; only active for already-saved projects; calls updateProject mutation with canvas state + new thumbnail; returns `{ saveStatus, lastSavedAt }`; does NOT interrupt editing (async, no blocking)
- [x] T026 [US3] Update `src/pages/EditorMode/EditorMode.tsx` — integrate `useAutoSave` hook: pass current project ID and canvas state getter; show save status indicator in editor header (auto-save icon with "Saving...", "Saved", "Error" states); wire canvas change events to trigger auto-save timer reset
- [x] T027 [US3] Add save status indicator styling — small indicator in editor toolbar showing save state with appropriate icons (cloud icon for saved, spinner for saving, warning for error); uses existing CSS variable system and toast notifications for errors
- [x] T028 [US3] Verify build passes: `npx tsc --noEmit`

**Checkpoint**: Auto-save works silently. Thumbnails update on every save. Save status visible in editor.

---

## Phase 6: User Story 4 — Authenticated User Record Sync (Priority: P2)

**Goal**: User records auto-created in Convex on first auth, store subscription tier and usage counts

**Independent Test**: Sign up as new user, verify user record created in Convex with Free tier defaults. Sign in again, verify record found (not duplicated).

### Implementation for User Story 4

- [x] T029 [US4] Add `updateUser` mutation to `convex/users.ts` — accepts optional subscriptionTier, aiGenerationsUsed, aiGenerationsLimit, exportCount; patches user record with provided fields + updated updatedAt per contracts/convex-contracts.md
- [x] T030 [US4] Integrate `useCurrentUser` hook into `src/components/Auth/ProtectedLayout.tsx` — call `useCurrentUser()` inside ProtectedLayout so user record is created/synced on every authenticated page load; store user data in context or pass down as needed
- [x] T031 [US4] Update `src/hooks/useSubscription.ts` — optionally read subscription tier from Convex user record (in addition to Clerk publicMetadata) for consistency; Convex record serves as source of truth for usage counts
- [x] T032 [US4] Verify build passes: `npx tsc --noEmit`

**Checkpoint**: User records sync from Clerk to Convex automatically. Usage counts tracked in database.

---

## Phase 7: User Story 5 — Local Storage Migration (Priority: P3)

**Goal**: Detect localStorage diagrams and offer one-time migration to cloud

**Independent Test**: Create diagrams in localStorage, then sign in, verify migration prompt appears. Accept, verify diagrams appear in My Projects. Verify localStorage cleaned up.

### Implementation for User Story 5

- [x] T033 [P] [US5] Create `src/hooks/useMigration.ts` — hook that scans localStorage for `finnish-diagram-*` keys, checks `finnish-migration-offered` flag, returns `{ hasDiagrams, showPrompt, migrate, dismiss }`; `migrate()` iterates localStorage diagrams, creates Convex projects via saveProject mutation, cleans up localStorage keys; `dismiss()` sets flag to prevent re-prompting
- [x] T034 [P] [US5] Create `src/components/MigrationPrompt/MigrationPrompt.tsx` — dialog component showing "We found X diagrams saved in your browser. Would you like to move them to the cloud?" with Accept and Decline buttons; shows progress during migration (X of Y migrated); uses existing CSS variable system and Toast for success/error notifications
- [x] T035 [US5] Integrate migration prompt into `src/components/Auth/ProtectedLayout.tsx` — render MigrationPrompt conditionally when `useMigration().showPrompt` is true; place after the Outlet so it appears as an overlay on any authenticated page
- [x] T036 [US5] Verify build passes: `npx tsc --noEmit`

**Checkpoint**: localStorage migration works end-to-end. Old browser diagrams can move to cloud.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final verification, edge cases, error handling, and cleanup

- [x] T037 Add retry logic to save operations — wrap Convex mutation calls with try/catch in useProject hook; on failure, show error toast and retry up to 3 times with exponential backoff; show "Save failed - retrying" notification per FR-014
- [x] T038 Add `.env.local` entries to `.gitignore` if not already present — verify `CONVEX_DEPLOYMENT` and `VITE_CONVEX_URL` are not committed
- [x] T039 Full build verification: `npx tsc --noEmit && NODE_OPTIONS="--max-old-space-size=8192" npm run build`
- [x] T040 Manual end-to-end smoke test: complete flow from Welcome → Sign In → Editor → Save → My Projects → Open Project → Edit → Auto-Save → Delete → Sign Out

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational — BLOCKS US2 (dashboard needs saved projects)
- **User Story 2 (Phase 4)**: Depends on US1 (needs save/load infrastructure + getProjects query)
- **User Story 3 (Phase 5)**: Depends on US1 (needs project save infrastructure to auto-save)
- **User Story 4 (Phase 6)**: Depends on Foundational — can run PARALLEL with US1/US2
- **User Story 5 (Phase 7)**: Depends on US1 (needs saveProject mutation for migration)
- **Polish (Phase 8)**: Depends on all user stories complete

### Within Each User Story

- Tasks marked [P] within a phase can run in parallel
- Non-[P] tasks must run sequentially
- Build verification is always the last task in each phase

### Parallel Opportunities

```
Phase 1 (Setup): T001 → T002 → T003, T004, T005 [parallel]
Phase 2 (Foundation): T006 → T007, T008 [parallel] → T009
Phase 3 (US1): T010, T011, T012 [parallel] → T013 → T014 → T015 → T016
Phase 4 (US2): T017, T018, T019, T020 [parallel] → T021 → T022 → T023 → T024
Phase 5 (US3): T025 → T026 → T027 → T028
Phase 6 (US4): T029 → T030 → T031 → T032  (can run parallel with US1/US2)
Phase 7 (US5): T033, T034 [parallel] → T035 → T036
Phase 8 (Polish): T037, T038 [parallel] → T039 → T040
```

---

## Implementation Strategy

### MVP First (User Story 1 + 2)

1. Complete Phase 1: Setup (T001-T005)
2. Complete Phase 2: Foundational (T006-T009)
3. Complete Phase 3: User Story 1 (T010-T016) — Save/Load works
4. Complete Phase 4: User Story 2 (T017-T024) — My Projects dashboard works
5. **STOP and VALIDATE**: Save diagrams, reload, browse My Projects, delete
6. This alone proves cloud saving is functional

### Incremental Delivery

1. Setup + Foundational → Convex active, user records sync
2. Add US1 → Save/Load works → Core MVP!
3. Add US2 → My Projects dashboard → User can manage work
4. Add US3 → Auto-save → Data loss prevention
5. Add US4 → User records fully synced → Usage tracking ready
6. Add US5 → Migration → Existing users retained
7. Polish → Error handling, retry logic → Production ready

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- No test tasks generated (not requested in spec — manual testing via quickstart.md)
- Convex `npx convex dev` must be running during development alongside Vite dev server
- Clerk JWT template "convex" must be configured in Clerk Dashboard before T006
- CLERK_JWT_ISSUER_DOMAIN must be set in Convex Dashboard environment variables before T006
- All Convex backend functions in convex/ directory auto-deploy when `npx convex dev` is running
- Canvas JSON serialization via Fabric.js toJSON() is the storage format — stored as string in Convex
- Thumbnail generation is client-side: canvas.toDataURL() → Blob → Convex file storage
- Commit after each phase checkpoint

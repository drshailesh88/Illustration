# Feature Specification: Convex Database and Cloud Saving

**Feature Branch**: `003-convex-cloud-saving`
**Created**: 2026-02-07
**Status**: Draft
**Input**: User description: "Convex Database and Cloud Saving for FINNISH app. Install and configure Convex as the database and file storage layer. Implement diagram saving, loading, and My Projects dashboard."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Save and Load Diagrams to the Cloud (Priority: P1)

An authenticated user creates a diagram in the Editor or generates one in Agent Mode. When they click "Save", the diagram data (including the full canvas state) is persisted to cloud storage tied to their account. When they return later — even from a different device — they can open the same diagram and continue editing exactly where they left off.

**Why this priority**: Without cloud persistence, all user work is lost when they clear their browser. This is the single most important infrastructure feature after authentication — it makes FINNISH a real product instead of a disposable toy.

**Independent Test**: Sign in, create a diagram in Editor, click Save, refresh the page, verify the diagram reloads from the cloud. Sign in from an incognito window and verify the same diagram is accessible.

**Acceptance Scenarios**:

1. **Given** an authenticated user with an open diagram, **When** they click "Save", **Then** the diagram data is persisted to the cloud and a success confirmation appears.
2. **Given** a user who previously saved a diagram, **When** they navigate to that diagram's URL or open it from their projects list, **Then** the diagram loads with all objects, layers, and settings intact.
3. **Given** a user editing a diagram, **When** they make changes and click "Save" again, **Then** the existing project is updated (not duplicated) and the version number increments.
4. **Given** a user who has never saved the current diagram, **When** they click "Save", **Then** a new project is created with a default title based on the diagram content or "Untitled Diagram".

---

### User Story 2 - My Projects Dashboard (Priority: P1)

An authenticated user wants to see all their saved diagrams in one place. They navigate to a "My Projects" view that shows a grid of their projects with thumbnail previews, titles, and last-modified dates. They can open any project to continue editing, or delete projects they no longer need.

**Why this priority**: Without a projects dashboard, users have no way to find and manage their saved work. This is essential for the save/load flow to be useful.

**Independent Test**: Save 3 diagrams with different titles, navigate to My Projects, verify all 3 appear with correct thumbnails and titles. Delete one, verify it disappears. Click one to open it in Editor.

**Acceptance Scenarios**:

1. **Given** an authenticated user with saved projects, **When** they navigate to the My Projects page, **Then** they see a grid of project cards showing thumbnail, title, and last-modified date, sorted by most recently modified.
2. **Given** an authenticated user viewing My Projects, **When** they click a project card, **Then** the diagram opens in Editor Mode with all content loaded.
3. **Given** an authenticated user viewing My Projects, **When** they delete a project, **Then** a confirmation dialog appears, and upon confirming, the project is permanently removed.
4. **Given** an authenticated user with no saved projects, **When** they visit My Projects, **Then** they see an empty state with a prompt to create their first diagram.

---

### User Story 3 - Auto-Save and Thumbnail Generation (Priority: P2)

While a user is editing a diagram, the system periodically auto-saves their work to prevent data loss. Each save also generates a small thumbnail image of the current canvas state, which is stored alongside the project for display in the My Projects dashboard.

**Why this priority**: Auto-save prevents data loss from accidental tab closes or browser crashes. Thumbnails make the My Projects dashboard visually useful. Both are important but the core save/load must work first.

**Independent Test**: Open a saved diagram, make changes, wait 30 seconds without manually saving, close the tab, reopen the diagram — verify the changes were auto-saved. Check My Projects and verify the thumbnail reflects the latest state.

**Acceptance Scenarios**:

1. **Given** an authenticated user editing a diagram, **When** 30 seconds pass since the last change, **Then** the system auto-saves the current state without interrupting the user.
2. **Given** a diagram being saved (manually or auto), **When** the save completes, **Then** a small thumbnail image of the canvas is generated and stored with the project.
3. **Given** an auto-save in progress, **When** the user continues editing, **Then** the editing experience is not interrupted or slowed down.
4. **Given** a network interruption during auto-save, **When** connectivity is restored, **Then** the system retries the save and the user sees a brief notification about the save status.

---

### User Story 4 - Authenticated User Record Sync (Priority: P2)

When a user signs up or signs in via Clerk, their user record is automatically created or updated in the database. This record stores their subscription tier, usage counts, and links to their projects. The system never requires users to manually create a database profile.

**Why this priority**: The user record is the foundation for linking projects to users and enforcing usage limits. It must be created seamlessly during authentication.

**Independent Test**: Sign up as a new user, verify a user record is created in the database with Free tier defaults. Sign in again, verify the record is found (not duplicated).

**Acceptance Scenarios**:

1. **Given** a new user who just signed up via Clerk, **When** they first access any authenticated page, **Then** a user record is automatically created in the database with Free tier defaults and zero usage counts.
2. **Given** an existing user who signs in, **When** they access an authenticated page, **Then** the system finds their existing record (no duplicate creation).
3. **Given** a user record exists, **When** the user's subscription tier changes (via admin or payment webhook), **Then** the database record reflects the updated tier.

---

### User Story 5 - Local Storage Migration (Priority: P3)

Users who have been using FINNISH before cloud saving was added have diagrams stored in their browser's localStorage. When they sign in for the first time after the cloud saving feature launches, the system detects any localStorage diagrams and offers to migrate them to the cloud.

**Why this priority**: Important for user retention during the transition, but only relevant for existing users during a brief window.

**Independent Test**: Create diagrams in localStorage (without auth), then sign in, verify the system offers to import them. Accept the import, verify they appear in My Projects. Verify localStorage entries are cleaned up after migration.

**Acceptance Scenarios**:

1. **Given** a user with diagrams in localStorage who signs in for the first time, **When** the system detects localStorage diagrams, **Then** a prompt appears offering to migrate them to the cloud.
2. **Given** a user who accepts the migration prompt, **When** migration runs, **Then** all localStorage diagrams are saved as cloud projects and appear in My Projects.
3. **Given** a user who declines migration, **When** they dismiss the prompt, **Then** localStorage diagrams remain untouched and the prompt does not appear again (stored as a user preference).
4. **Given** a successful migration, **When** all diagrams are confirmed saved to the cloud, **Then** the localStorage entries are removed to free browser storage.

---

### Edge Cases

- What happens when a user tries to save a very large diagram (e.g., 50+ objects, complex paths)? The system handles diagrams up to 5MB of serialized data. Diagrams exceeding this limit show a warning suggesting the user simplify or split the diagram.
- What happens when two browser tabs edit the same diagram simultaneously? The last save wins. A future version may add conflict detection, but V1 uses last-write-wins.
- What happens when a user deletes their account? All their projects and associated files are permanently deleted (handled by Clerk webhook triggering database cleanup in a future task).
- What happens when the database is temporarily unreachable? The system shows a "Save failed - retrying" notification and retries up to 3 times. The user can continue editing locally.
- What happens when a user's storage quota is exceeded? Free users are limited to 10 projects. Pro users have unlimited projects. When the limit is reached, the user sees a prompt to upgrade or delete existing projects.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST persist diagram data to cloud storage tied to the authenticated user's account
- **FR-002**: System MUST load saved diagrams from cloud storage with all canvas objects, layers, and settings intact
- **FR-003**: System MUST support creating new projects and updating existing projects (upsert pattern)
- **FR-004**: System MUST support deleting projects with a confirmation step
- **FR-005**: System MUST display a My Projects dashboard showing all user projects with thumbnails, titles, and last-modified dates
- **FR-006**: System MUST sort projects by most recently modified by default
- **FR-007**: System MUST generate a thumbnail image of the canvas on each save
- **FR-008**: System MUST auto-save the diagram every 30 seconds after the last change
- **FR-009**: System MUST show a save status indicator (saving, saved, error) in the editor
- **FR-010**: System MUST create a user record in the database when a new user first authenticates (on-demand, not via webhook)
- **FR-011**: System MUST store subscription tier, AI generation usage counts, and export usage counts in the user record
- **FR-012**: System MUST enforce project limits: Free tier = 10 projects max, Pro/Team = unlimited
- **FR-013**: System MUST detect localStorage diagrams and offer one-time migration to cloud
- **FR-014**: System MUST handle save failures gracefully with retry logic and user notification
- **FR-015**: System MUST scope all data access to the authenticated user (users cannot see or modify other users' projects)
- **FR-016**: System MUST add a route for My Projects at /projects accessible to authenticated users
- **FR-017**: System MUST store project data as structured JSON, not raw binary
- **FR-018**: System MUST store thumbnail images as files in cloud storage, linked to the project record

### Key Entities

- **Project**: A saved diagram. Key attributes: unique ID, owner (user reference), title, diagram data (serialized canvas state as JSON), thumbnail (file reference), creation date, last-modified date, version number.
- **User Record**: Database representation of a Clerk user. Key attributes: unique ID, external auth provider ID, email, subscription tier (free/pro/team), AI generations used this month, AI generation limit, export count this month.
- **Thumbnail**: A small PNG image (~200x150px) of the current canvas state, stored in cloud file storage and referenced by the project record.

## Assumptions

- Convex is the chosen database (per project constitution - locked decision).
- Clerk authentication is already implemented (Task 4 - done). The database layer receives the authenticated user identity from the auth provider.
- Diagram data is serialized as JSON (Fabric.js canvas state via `canvas.toJSON()`). No binary blob storage is needed for diagram data itself.
- Thumbnails are generated client-side by rendering the canvas to a small PNG data URL, then uploaded to file storage.
- Auto-save interval of 30 seconds is a reasonable default. This can be adjusted later without architectural changes.
- The My Projects dashboard is a new page at `/projects`, accessible to all authenticated users.
- Project limits (10 for Free, unlimited for Pro/Team) are enforced at save time, not retroactively.
- Last-write-wins is acceptable for V1 concurrent editing scenarios.
- The users table syncs from Clerk on first access (lazy creation), not via Clerk webhooks. Webhooks may be added in a future task.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can save a diagram and reload it within 3 seconds on a standard connection
- **SC-002**: My Projects dashboard loads all project cards (up to 50) with thumbnails in under 2 seconds
- **SC-003**: Auto-save triggers within 30 seconds of the last edit with zero visible interruption to the editing experience
- **SC-004**: 100% of saved diagrams can be fully restored with all objects, layers, and settings intact
- **SC-005**: Free users are prevented from saving more than 10 projects (shown upgrade prompt at limit)
- **SC-006**: User records are created on first access with 100% reliability (no orphaned auth users without database records)
- **SC-007**: localStorage migration successfully imports all existing diagrams when accepted by the user
- **SC-008**: Save failures show a user-visible error notification within 5 seconds and retry automatically

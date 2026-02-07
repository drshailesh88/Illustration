# API Contracts: Convex Database and Cloud Saving

**Feature**: 003-convex-cloud-saving
**Date**: 2026-02-07

## Backend Functions (Convex)

All functions live in the `convex/` directory. All mutations and queries that access user data require authentication via `ctx.auth.getUserIdentity()`.

---

### Users Functions (`convex/users.ts`)

#### `getOrCreateUser` (mutation)

Creates a user record on first access, or returns existing one.

**Arguments**: None (uses auth identity from context)

**Returns**: `Id<"users">`

**Behavior**:
1. Get identity from `ctx.auth.getUserIdentity()`
2. If not authenticated: throw error
3. Query users table with `by_tokenIdentifier` index
4. If found: return existing `_id`
5. If not found: insert new record with Free tier defaults, return `_id`

**Error Cases**:
- Not authenticated → `"Not authenticated"`

---

#### `getUser` (query)

Returns the current user's record.

**Arguments**: None (uses auth identity from context)

**Returns**: `User | null`

**Behavior**:
1. Get identity from `ctx.auth.getUserIdentity()`
2. If not authenticated: return null
3. Query users table with `by_tokenIdentifier` index
4. Return user record or null

---

#### `updateUser` (mutation)

Updates specific fields on the user record (e.g., subscription tier change).

**Arguments**:
- `subscriptionTier`: optional string ("free" | "pro" | "team")
- `aiGenerationsUsed`: optional number
- `aiGenerationsLimit`: optional number
- `exportCount`: optional number

**Returns**: void

**Behavior**:
1. Get identity, find user by tokenIdentifier
2. Patch user record with provided fields + updated `updatedAt`

**Error Cases**:
- Not authenticated → `"Not authenticated"`
- User not found → `"User not found"`

---

### Projects Functions (`convex/projects.ts`)

#### `saveProject` (mutation)

Creates a new project for the authenticated user.

**Arguments**:
- `title`: string (required)
- `diagramData`: string (required — JSON stringified canvas state)
- `thumbnailId`: optional Id<"_storage">

**Returns**: `Id<"projects">`

**Behavior**:
1. Get identity, verify authenticated
2. If user subscription is "free": count existing projects
   - If count >= 10: throw `"FREE_TIER_LIMIT_REACHED"`
3. Insert new project with version=1, createdAt=now, updatedAt=now
4. Return project ID

**Error Cases**:
- Not authenticated → `"Not authenticated"`
- Free tier limit → `"FREE_TIER_LIMIT_REACHED"`

---

#### `updateProject` (mutation)

Updates an existing project (title, diagram data, thumbnail).

**Arguments**:
- `projectId`: Id<"projects"> (required)
- `title`: optional string
- `diagramData`: optional string
- `thumbnailId`: optional Id<"_storage">

**Returns**: void

**Behavior**:
1. Get identity, verify authenticated
2. Get project by ID, verify it belongs to the authenticated user
3. Patch project with provided fields + increment version + update updatedAt

**Error Cases**:
- Not authenticated → `"Not authenticated"`
- Project not found → `"Project not found"`
- Not owner → `"Not authorized"`

---

#### `deleteProject` (mutation)

Permanently deletes a project and its thumbnail.

**Arguments**:
- `projectId`: Id<"projects"> (required)

**Returns**: void

**Behavior**:
1. Get identity, verify authenticated
2. Get project by ID, verify it belongs to the authenticated user
3. If project has thumbnailId: delete the file from storage
4. Delete the project document

**Error Cases**:
- Not authenticated → `"Not authenticated"`
- Project not found → `"Project not found"`
- Not owner → `"Not authorized"`

---

#### `getProject` (query)

Returns a single project with its thumbnail URL.

**Arguments**:
- `projectId`: Id<"projects"> (required)

**Returns**: `Project & { thumbnailUrl: string | null } | null`

**Behavior**:
1. Get identity, verify authenticated
2. Get project by ID
3. Verify it belongs to the authenticated user
4. If project has thumbnailId: get serving URL from storage
5. Return project with thumbnailUrl

**Error Cases**:
- Not authenticated → return null
- Not owner → return null

---

#### `getProjects` (query)

Returns paginated list of the authenticated user's projects, sorted by most recently modified.

**Arguments**:
- `paginationOpts`: PaginationOptions (from convex/server)

**Returns**: `PaginationResult<Project & { thumbnailUrl: string | null }>`

**Behavior**:
1. Get identity, verify authenticated
2. Query projects with `by_userId_updatedAt` index, filter by userId
3. Order descending (most recent first)
4. Paginate with provided options
5. For each project: resolve thumbnail URL if thumbnailId exists
6. Return paginated result

**Error Cases**:
- Not authenticated → return empty paginated result

---

### Storage Functions (`convex/storage.ts`)

#### `generateUploadUrl` (mutation)

Generates a temporary upload URL for uploading a thumbnail file.

**Arguments**: None

**Returns**: `string` (upload URL)

**Behavior**:
1. Get identity, verify authenticated
2. Call `ctx.storage.generateUploadUrl()`
3. Return URL (valid for 1 hour)

**Error Cases**:
- Not authenticated → `"Not authenticated"`

---

## Frontend Hooks

### `useCurrentUser()`

**Purpose**: Ensure user record exists in Convex on every authenticated page load.

**Returns**: `{ user: User | null, isLoading: boolean }`

**Implementation**:
- On mount: call `getOrCreateUser` mutation
- Query `getUser` for current state
- Return user data and loading state

---

### `useProject(projectId?: string)`

**Purpose**: Load and manage a single project.

**Returns**: `{ project, isLoading, save, update, remove, saveStatus }`

**Implementation**:
- If projectId provided: query `getProject`
- `save(title, diagramData, thumbnailId?)` → calls `saveProject` or `updateProject`
- `remove()` → calls `deleteProject`
- Tracks save status: "idle" | "saving" | "saved" | "error"

---

### `useProjects()`

**Purpose**: Paginated list of user's projects for My Projects dashboard.

**Returns**: `{ projects, status, loadMore, isLoading }`

**Implementation**:
- Uses `usePaginatedQuery` with `getProjects`
- Initial page size: 20 projects
- `loadMore()` loads next 10
- Status: "LoadingFirstPage" | "CanLoadMore" | "LoadingMore" | "Exhausted"

---

### `useAutoSave(projectId: string | null, getCanvasState: () => string)`

**Purpose**: Auto-save with 30-second debounce after changes.

**Returns**: `{ saveStatus, lastSavedAt }`

**Implementation**:
- Only active when projectId is non-null (project already saved once)
- On canvas change: reset 30-second timer
- When timer fires: call `updateProject` with current canvas state + thumbnail
- Track and expose save status

---

### `useMigration()`

**Purpose**: Detect and offer localStorage diagram migration.

**Returns**: `{ hasDiagrams, showPrompt, migrate, dismiss }`

**Implementation**:
- Check for `finnish-diagram-*` keys in localStorage
- Check for `finnish-migration-offered` flag
- `migrate()`: iterate keys, save each to Convex, clean up localStorage
- `dismiss()`: set flag, hide prompt

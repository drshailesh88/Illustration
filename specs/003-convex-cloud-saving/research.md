# Research: Convex Database and Cloud Saving

**Feature**: 003-convex-cloud-saving
**Date**: 2026-02-07

## Decision 1: Convex Provider Setup with Clerk

**Decision**: Use `ConvexProviderWithClerk` from `convex/react-clerk` instead of plain `ConvexProvider`.

**Rationale**: The app already uses Clerk for authentication. `ConvexProviderWithClerk` bridges Clerk's JWT tokens to Convex backend, enabling `ctx.auth.getUserIdentity()` in server functions. This is the official integration pattern.

**Pattern**:
```tsx
// main.tsx
<ClerkProvider publishableKey={clerkKey} afterSignOutUrl="/">
  <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
    <App />
  </ConvexProviderWithClerk>
</ClerkProvider>
```

**Alternatives Considered**:
- Plain ConvexProvider + custom auth: Would require manual JWT handling. Rejected — more code, no benefit.
- Convex Auth (built-in): Convex has its own auth system but we already use Clerk. Rejected — unnecessary migration.

## Decision 2: Clerk JWT Template for Convex

**Decision**: Create a JWT template named exactly `"convex"` in the Clerk Dashboard.

**Rationale**: Convex requires a specific JWT template name. The Clerk Dashboard has a pre-built Convex template. Additionally, set `CLERK_JWT_ISSUER_DOMAIN` as a Convex environment variable (in the Convex Dashboard, not in `.env.local`).

**Configuration**:
- Clerk Dashboard → JWT Templates → New → Select "Convex"
- Name must be exactly `"convex"`
- Convex Dashboard → Settings → Environment Variables → Add `CLERK_JWT_ISSUER_DOMAIN`

**Alternatives Considered**:
- Custom JWT claims: Unnecessary complexity. The default Convex template includes all needed fields.
- Clerk webhooks for user sync: Too complex for V1. Lazy creation on first access is simpler.

## Decision 3: Schema Design — Projects Table

**Decision**: Store diagram data as `v.string()` (JSON stringified), not as nested `v.object()`.

**Rationale**: Fabric.js canvas JSON is deeply nested and varies by object type. Defining a complete Convex validator for all Fabric.js object types would be impractical and brittle. Storing as a string gives flexibility and avoids schema changes when Fabric.js updates its serialization format.

**Schema**:
```ts
projects: defineTable({
  userId: v.string(),
  title: v.string(),
  diagramData: v.string(),        // JSON.stringify(canvas.toJSON())
  thumbnailId: v.optional(v.id("_storage")),
  createdAt: v.number(),
  updatedAt: v.number(),
  version: v.number(),
})
  .index("by_userId", ["userId"])
  .index("by_userId_updatedAt", ["userId", "updatedAt"])
```

**Alternatives Considered**:
- `v.any()` for diagramData: Loses type safety hints and allows truly arbitrary data. Rejected.
- `v.object()` with full Fabric schema: Impractical — Fabric.js has hundreds of object properties. Rejected.
- Separate table for canvas objects: Over-engineering for V1. Rejected.

## Decision 4: User Identity Key

**Decision**: Use `identity.tokenIdentifier` from `ctx.auth.getUserIdentity()` as the user key in the projects table.

**Rationale**: `tokenIdentifier` is a stable, unique identifier combining subject and issuer. It's the recommended approach from Convex docs for multi-provider auth systems.

**Alternatives Considered**:
- `identity.subject` (Clerk user ID): Works but less portable if we ever add another auth provider. Rejected.
- Store Clerk `userId` from frontend: Security risk — client-provided IDs can be spoofed. Rejected.

## Decision 5: User Record Sync Strategy

**Decision**: Lazy creation — create user record in Convex on first authenticated access, not via Clerk webhook.

**Rationale**: Simpler implementation. The `getOrCreateUser` mutation checks if a user record exists for the current `tokenIdentifier`. If not, creates one with Free tier defaults. This runs on every authenticated page load (fast — single index lookup).

**Pattern**:
```ts
// convex/users.ts
export const getOrCreateUser = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", q => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    if (existing) return existing._id;

    return await ctx.db.insert("users", {
      tokenIdentifier: identity.tokenIdentifier,
      email: identity.email ?? "",
      subscriptionTier: "free",
      aiGenerationsUsed: 0,
      aiGenerationsLimit: 10,
      exportCount: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});
```

**Alternatives Considered**:
- Clerk webhooks: More complex (needs HTTP endpoint, webhook verification, handling retries). Better for production but overkill for V1. May add later.
- Client-side user creation: Security risk — user could set arbitrary tier. Rejected.

## Decision 6: Thumbnail Generation and Storage

**Decision**: Generate thumbnails client-side using `canvas.toDataURL()`, convert to Blob, upload to Convex file storage via `generateUploadUrl`.

**Rationale**: Client-side generation avoids server-side rendering complexity. The canvas is already rendered in the browser. Scale down to ~200x150px for thumbnails to keep file size small (~10-30KB per thumbnail).

**Flow**:
1. Client calls `canvas.toDataURL({ format: 'png', multiplier: 0.25 })` (scaled down)
2. Convert data URL to Blob
3. Call `generateUploadUrl` mutation to get upload URL
4. POST blob to upload URL
5. Receive `storageId`
6. Include `storageId` in the project save/update mutation

**Alternatives Considered**:
- Server-side rendering with Puppeteer: Too complex, requires headless browser on server. Rejected.
- Store thumbnail as base64 in document: Inflates document size, slow to load in grid. Rejected.
- No thumbnails: Dashboard would be text-only, poor UX. Rejected.

## Decision 7: Auto-Save Implementation

**Decision**: Use a 30-second debounce timer that resets on each canvas change. Auto-save runs only for already-saved projects (not new unsaved canvases).

**Rationale**: Debounce prevents excessive saves during active editing. 30 seconds matches the spec requirement. Only auto-saving existing projects avoids creating unwanted cloud records for scratch canvases.

**Pattern**:
```ts
// useAutoSave hook
useEffect(() => {
  if (!projectId || !hasUnsavedChanges) return;
  const timer = setTimeout(() => {
    saveProject(projectId, canvasState);
  }, 30000);
  return () => clearTimeout(timer);
}, [projectId, canvasState, hasUnsavedChanges]);
```

**Alternatives Considered**:
- Interval-based (save every 30s regardless): Wasteful if no changes. Rejected.
- Operational transforms (CRDT): Over-engineering for V1 single-user editing. Rejected.
- Save on every change: Too many mutations, would hit rate limits. Rejected.

## Decision 8: localStorage Migration Strategy

**Decision**: One-time migration prompt shown after first sign-in when localStorage diagrams are detected. Uses a localStorage flag `finnish-migration-offered` to prevent re-prompting.

**Rationale**: Non-intrusive — user chooses whether to migrate. Flag stored in localStorage (not Convex) since it's relevant to the specific browser.

**Detection**: Scan localStorage for keys matching `finnish-diagram-*` pattern.

**Migration Flow**:
1. On authenticated page load, check for `finnish-diagram-*` keys and `finnish-migration-offered` flag
2. If diagrams found and migration not yet offered: show MigrationPrompt
3. On accept: iterate keys, parse each, create Convex project via saveProject mutation, remove localStorage keys
4. On decline: set `finnish-migration-offered = true`, dismiss
5. After successful migration: set flag, show success toast

**Alternatives Considered**:
- Automatic migration (no prompt): Could confuse users who share a browser. Rejected.
- Background migration without notification: User wouldn't know their data moved. Rejected.
- Keep localStorage as fallback: Adds complexity maintaining two storage layers. Rejected.

## Decision 9: Project Limits Enforcement

**Decision**: Enforce Free tier 10-project limit at save time in the Convex mutation, not client-side.

**Rationale**: Server-side enforcement cannot be bypassed. The saveProject mutation counts existing projects for the user and rejects if at limit.

**Pattern**:
```ts
// In saveProject mutation
const user = await getUserHelper(ctx, identity.tokenIdentifier);
if (user.subscriptionTier === "free") {
  const projectCount = await ctx.db
    .query("projects")
    .withIndex("by_userId", q => q.eq("userId", identity.tokenIdentifier))
    .collect();
  if (projectCount.length >= 10) {
    throw new Error("FREE_TIER_LIMIT_REACHED");
  }
}
```

**Alternatives Considered**:
- Client-side only check: Bypassable. Rejected.
- Soft limit (warning only): Doesn't enforce business model. Rejected.

## Decision 10: Convex Package Version

**Decision**: Install the latest `convex` npm package (latest stable).

**Rationale**: Convex is under active development. Latest version includes improved TypeScript types, better Clerk integration, and file storage improvements.

**Note**: As of research, Convex uses `ctx.db.patch(id, fields)` syntax (not the newer 3-arg syntax mentioned in some docs for v1.31+). Verify the actual installed version's API.

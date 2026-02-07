# Data Model: Convex Database and Cloud Saving

**Feature**: 003-convex-cloud-saving
**Date**: 2026-02-07

## Entities

### 1. Projects Table

Stores saved diagrams linked to authenticated users.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| _id | Id<"projects"> | Auto | Convex document ID |
| _creationTime | number | Auto | Convex auto-generated timestamp |
| userId | string | Yes | User's tokenIdentifier from Clerk/Convex auth |
| title | string | Yes | Project title (default: "Untitled Diagram") |
| diagramData | string | Yes | JSON.stringify of Fabric.js canvas.toJSON() |
| thumbnailId | Id<"_storage"> | No | Reference to thumbnail PNG in Convex file storage |
| createdAt | number | Yes | Unix timestamp (ms) when first created |
| updatedAt | number | Yes | Unix timestamp (ms) of last modification |
| version | number | Yes | Incremented on each save (starts at 1) |

**Indexes**:
- `by_userId` — `["userId"]` — Lookup all projects for a user
- `by_userId_updatedAt` — `["userId", "updatedAt"]` — List projects sorted by last modified

**Size Estimate**: Typical project document is 100KB-1MB (dominated by diagramData). Convex 1MB document limit applies. Diagrams exceeding 5MB of serialized data show a warning per spec edge case.

### 2. Users Table

Database representation of a Clerk user. Created lazily on first authenticated access.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| _id | Id<"users"> | Auto | Convex document ID |
| _creationTime | number | Auto | Convex auto-generated timestamp |
| tokenIdentifier | string | Yes | Stable user identifier from ctx.auth.getUserIdentity() |
| email | string | Yes | User's email from Clerk identity |
| subscriptionTier | string | Yes | "free", "pro", or "team" |
| aiGenerationsUsed | number | Yes | AI generations used this billing period |
| aiGenerationsLimit | number | Yes | Max AI generations allowed (default: 10 for free) |
| exportCount | number | Yes | Exports this billing period |
| createdAt | number | Yes | Unix timestamp (ms) when record created |
| updatedAt | number | Yes | Unix timestamp (ms) of last modification |

**Indexes**:
- `by_tokenIdentifier` — `["tokenIdentifier"]` — Lookup user by auth identity (unique)

### 3. Thumbnails (File Storage)

Not a table — uses Convex's built-in `_storage` system. Referenced by `Id<"_storage">` in the projects table.

| Property | Value |
|----------|-------|
| Format | PNG |
| Target Size | ~200x150 pixels |
| Typical File Size | 10-30 KB |
| Access | Via `ctx.storage.getUrl(storageId)` |
| Lifecycle | Deleted when parent project is deleted |

## Relationships

```
Users (1) ──── (many) Projects
  │
  └── tokenIdentifier links to userId field in Projects

Projects (1) ──── (0..1) Thumbnail (in _storage)
  │
  └── thumbnailId references a file in Convex file storage
```

## Schema Definition (Convex)

```typescript
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    userId: v.string(),
    title: v.string(),
    diagramData: v.string(),
    thumbnailId: v.optional(v.id("_storage")),
    createdAt: v.number(),
    updatedAt: v.number(),
    version: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_updatedAt", ["userId", "updatedAt"]),

  users: defineTable({
    tokenIdentifier: v.string(),
    email: v.string(),
    subscriptionTier: v.string(),
    aiGenerationsUsed: v.number(),
    aiGenerationsLimit: v.number(),
    exportCount: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_tokenIdentifier", ["tokenIdentifier"]),
});
```

## Validation Rules

### Projects
- `title`: Non-empty string, max 200 characters
- `diagramData`: Must be valid JSON string, max ~5MB (enforced in mutation)
- `version`: Starts at 1, increments by 1 on each save
- `userId`: Must match the authenticated user's tokenIdentifier (enforced in all mutations)

### Users
- `tokenIdentifier`: Must match ctx.auth.getUserIdentity().tokenIdentifier
- `subscriptionTier`: Must be one of "free", "pro", "team"
- `aiGenerationsUsed`: Non-negative integer
- `aiGenerationsLimit`: Positive integer (default 10 for free, 100 for pro, 500 for team)
- `exportCount`: Non-negative integer

## State Transitions

### Project Lifecycle
```
[New Canvas] → saveProject → [Saved Project v1]
                                    │
                              updateProject → [Saved Project v2]
                                    │
                              updateProject → [Saved Project v3]
                                    │
                              deleteProject → [Deleted]
```

### User Record Lifecycle
```
[Clerk Sign Up] → first authenticated page load → getOrCreateUser → [User Record (free)]
                                                                          │
                                                                    subscription change → [User Record (pro/team)]
```

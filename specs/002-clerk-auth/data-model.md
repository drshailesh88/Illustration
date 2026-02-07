# Data Model: Clerk Authentication

**Date**: 2026-02-07
**Feature**: 002-clerk-auth

## Entities

### User (Clerk-managed)

Clerk manages the core user entity. We extend it via metadata.

| Field | Type | Source | Description |
|-------|------|--------|-------------|
| id | string | Clerk | Unique Clerk user ID (e.g., `user_2abc...`) |
| firstName | string | Clerk | User's first name |
| lastName | string | Clerk | User's last name |
| fullName | string | Clerk (computed) | `${firstName} ${lastName}` |
| emailAddress | string | Clerk | Primary email |
| imageUrl | string | Clerk | Profile avatar URL |
| createdAt | Date | Clerk | Account creation timestamp |
| updatedAt | Date | Clerk | Last profile update |

### User Public Metadata (custom, backend-writable only)

Stored in `user.publicMetadata`. Readable on frontend, writable only from backend/dashboard.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| subscriptionTier | `'free' \| 'pro' \| 'team'` | `'free'` | User's subscription level |
| aiGenerationsUsed | number | 0 | Total AI diagram generations used |
| aiGenerationsLimit | number | 0 (free) / 100 (pro) / 500 (team) | Monthly generation limit |
| exportsUsed | number | 0 | Total exports performed this month |
| exportsLimit | number | 5 (free) / unlimited (pro/team) | Monthly export limit |
| subscriptionExpiresAt | string (ISO) | null | When current subscription period ends |

### Subscription Tier (enum)

| Value | Agent Mode | Editor Mode | Icons | Export Formats | Watermark | AI Quota |
|-------|-----------|------------|-------|---------------|-----------|----------|
| `free` | No | Yes | Limited | PNG (low-res) | Yes (corner) | 0 |
| `pro` | Yes | Yes | Full | PNG, SVG, PDF, PPTX | No | 100/month |
| `team` | Yes | Yes | Full | PNG, SVG, PDF, PPTX | No | 500/month |

### Session (Clerk-managed)

| Field | Type | Description |
|-------|------|-------------|
| sessionId | string | Unique session identifier |
| userId | string | Associated user ID |
| status | `'active' \| 'expired' \| 'revoked'` | Session state |
| lastActiveAt | Date | Last activity timestamp |
| expireAt | Date | Session expiration (Clerk default: 7 days) |

## Relationships

```
User (1) ──── (N) Session
User (1) ──── (1) PublicMetadata (embedded)
User (1) ──── (1) SubscriptionTier (via metadata)
```

## State Transitions

### Authentication State

```
Unauthenticated → SigningIn → Authenticated → SigningOut → Unauthenticated
                                    ↓
                              SessionExpired → Unauthenticated
```

### Subscription Tier Transitions

```
free → pro (via Lemon Squeezy payment - Task 12)
free → team (via Lemon Squeezy payment - Task 12)
pro → free (subscription lapse)
pro → team (upgrade)
team → pro (downgrade)
team → free (subscription lapse)
```

Note: Tier transitions are out of scope for this task. Only the data model and read logic are implemented here.

## Validation Rules

- `subscriptionTier` must be one of: `'free'`, `'pro'`, `'team'`
- `aiGenerationsUsed` must be >= 0
- `exportsUsed` must be >= 0
- `subscriptionExpiresAt` must be a valid ISO 8601 date string or null
- All metadata fields combined must be under 8KB (Clerk limit)

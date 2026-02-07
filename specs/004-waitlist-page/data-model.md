# Data Model: Waitlist Landing Page

**Feature**: 004-waitlist-page
**Date**: 2026-02-07

## Entities

### Waitlist Signup

Represents a single email registration from a potential user.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | Email address of the signup (lowercase, trimmed) |
| signupDate | number | Yes | Unix timestamp (milliseconds) of when the signup occurred |
| referralSource | string | No | Source of the signup (e.g., "twitter", "conference", "colleague"). Empty string if direct visit. |

**Indexes**:
- `by_email` on `[email]` — enables duplicate detection and lookup by email
- `by_signupDate` on `[signupDate]` — enables chronological listing (for future admin needs)

**Validation Rules**:
- Email must contain `@` and at least one `.` after `@`
- Email is stored lowercase and trimmed (normalized before insert)
- One record per unique email address (enforced by query-before-insert check)

**Relationships**:
- None. Waitlist signups are standalone records with no relation to user accounts, projects, or other entities.

## Aggregate Values

### Signup Count

Not stored as a separate entity. Computed on-demand via a Convex query that counts all documents in the waitlist table. Convex's reactive queries ensure the count updates in real-time for all connected clients.

# Convex Function Contracts: Waitlist Landing Page

**Feature**: 004-waitlist-page
**Date**: 2026-02-07

## Backend Functions

### 1. `joinWaitlist` — Mutation (Public)

**Purpose**: Accept an email signup for the waitlist. Prevents duplicates.

**File**: `convex/waitlist.ts`

**Auth**: None required (public mutation)

**Arguments**:
```typescript
{
  email: v.string(),           // Email address to register
  referralSource: v.optional(v.string()),  // Optional referral source (e.g., "twitter")
}
```

**Returns**:
```typescript
{
  status: "success" | "already_exists",  // Whether signup was new or duplicate
  message: string,                        // User-facing message
}
```

**Behavior**:
1. Normalize email: trim whitespace, convert to lowercase
2. Validate email format (contains `@` and `.` after `@`)
3. Query `waitlist` table by `by_email` index for existing entry
4. If email exists: return `{ status: "already_exists", message: "You're already on the waitlist!" }`
5. If email is new: insert record with `{ email, signupDate: Date.now(), referralSource: referralSource ?? "" }`
6. Return `{ status: "success", message: "You're on the list!" }`

**Error Handling**:
- Invalid email format: throw `ConvexError("Please enter a valid email address")`
- Database errors: bubble up naturally (Convex handles retries)

---

### 2. `getWaitlistCount` — Query (Public)

**Purpose**: Return the total number of waitlist signups for the live counter.

**File**: `convex/waitlist.ts`

**Auth**: None required (public query)

**Arguments**: None

**Returns**:
```typescript
number  // Total count of waitlist signups
```

**Behavior**:
1. Query all documents in the `waitlist` table
2. Count and return the total

**Performance Note**: For small-to-medium waitlists (<100k signups), collecting and counting is fine. If scale becomes an issue, a counter document pattern could be used instead.

---

## Frontend Usage

### WaitlistPage Component

**File**: `src/pages/WaitlistPage/WaitlistPage.tsx`

**Convex Hooks Used**:
- `useMutation(api.waitlist.joinWaitlist)` — for form submission
- `useQuery(api.waitlist.getWaitlistCount)` — for live signup counter

**Form State**:
```typescript
{
  email: string,           // Controlled input value
  isSubmitting: boolean,   // Disables form during mutation
  result: {                // After submission
    status: "success" | "already_exists" | "error",
    message: string,
  } | null,
}
```

**Referral Source**: Read from `useSearchParams()` — `searchParams.get("ref")` — passed to `joinWaitlist` mutation.

**Signup Count Display**:
- Show "Join {count} scientists on the waitlist" when count > 0
- Show "Be the first to join" when count === 0
- Show nothing while count is loading (undefined)

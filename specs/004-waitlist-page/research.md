# Research: Waitlist Landing Page

**Feature**: 004-waitlist-page
**Date**: 2026-02-07

## Decisions

### 1. Convex Table for Waitlist (vs. External Service)

**Decision**: Store waitlist signups in a new `waitlist` table in the existing Convex database.
**Rationale**: Convex is already installed and configured. Adding a table is trivial. Real-time queries give us the live signup count for free. No external service signup or API keys needed.
**Alternatives considered**:
- Google Sheets API: Requires OAuth setup, API key management, no real-time count capability
- Airtable: Requires paid plan for API access at scale, adds external dependency
- Mailchimp/ConvertKit: Overkill for simple email collection, adds cost and complexity

### 2. Public Mutation (No Auth Required)

**Decision**: The `joinWaitlist` mutation does NOT require authentication. It's a public-facing function.
**Rationale**: The waitlist page targets visitors who haven't created accounts yet. Requiring auth would eliminate the purpose of the page. Convex supports public mutations (no `ctx.auth` check).
**Alternatives considered**:
- Rate limiting via IP: Not natively supported in Convex, would need middleware. Overkill for email collection with duplicate prevention.

### 3. Duplicate Prevention Strategy

**Decision**: Check for existing email via unique index query before inserting. Return a distinct status ("already_exists") rather than throwing an error.
**Rationale**: Graceful UX — user sees "You're already on the list!" rather than an error. Server-side check is authoritative (client-side check alone could be bypassed).
**Alternatives considered**:
- Unique constraint at DB level: Convex doesn't have native unique constraints, so we use query-before-insert pattern
- Client-side dedup with localStorage: Not reliable across devices, supplements but doesn't replace server check

### 4. Email Validation Approach

**Decision**: Client-side HTML5 `type="email"` validation + basic regex check. No server-side deep validation (MX record lookup, etc.).
**Rationale**: HTML5 email validation catches the vast majority of typos. Deep validation would require external services and adds complexity for a pre-launch waitlist. The goal is low-friction signup.
**Alternatives considered**:
- Server-side regex: Adds marginal value over HTML5 validation, increases round-trip time
- Email verification service (e.g., Kickbox): Adds cost and latency, overkill for waitlist

### 5. Referral Source Capture

**Decision**: Read `ref` URL parameter (e.g., `/waitlist?ref=twitter`) and store it with the signup. If absent, store empty string.
**Rationale**: Simple, zero-friction tracking. No additional user input needed. Marketing team can create trackable links for each channel.
**Alternatives considered**:
- UTM parameters (utm_source, utm_medium, utm_campaign): More comprehensive but overkill for pre-launch. Can add later.
- Dropdown asking "How did you hear about us?": Adds friction to signup form, reduces conversion

### 6. Page Styling Approach

**Decision**: Use existing CSS variables (`--bg-primary`, `--text-primary`, `--accent-primary`, etc.) with a dedicated CSS file for layout/responsive styles.
**Rationale**: Maintains visual consistency with the existing FINNISH application. CSS variables are already defined and used throughout the app.
**Alternatives considered**:
- Tailwind CSS: Constitution mentions progressive Tailwind migration, but existing pages use CSS variables. Consistency with current codebase takes priority for this simple page.
- Inline styles: Used in some existing components (MigrationPrompt, SaveButton) but a dedicated CSS file is cleaner for a full page layout.

### 7. Signup Count Display

**Decision**: Use a Convex `useQuery` to fetch the count reactively. Count updates in real-time as new signups occur.
**Rationale**: Convex queries are reactive by default — the count auto-updates without polling. Zero additional infrastructure needed.
**Alternatives considered**:
- Polling (fetch count every N seconds): Unnecessary complexity when Convex provides real-time updates natively
- Cached count with manual refresh: Adds staleness, defeats the purpose of "live" count

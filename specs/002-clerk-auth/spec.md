# Feature Specification: Clerk Authentication

**Feature Branch**: `002-clerk-auth`
**Created**: 2026-02-07
**Status**: Draft
**Input**: User description: "Clerk Authentication for FINNISH app. Implement user authentication using Clerk. Support Google sign-in and email/password. Three tiers with auth-aware routing."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Sign Up and Sign In (Priority: P1)

A new user visits FINNISH and wants to create an account. They can sign up using their email and password, or use Google sign-in for a faster flow. After signing up, they are automatically signed in and redirected to the page they were trying to access. Returning users can sign in using the same methods.

**Why this priority**: Without authentication, no other user-specific features (projects, subscriptions, usage tracking) can work. This is the foundation for the entire Chain B infrastructure.

**Independent Test**: Can be fully tested by visiting /sign-up, creating an account with email/password or Google, verifying redirect to intended destination, signing out, and signing back in.

**Acceptance Scenarios**:

1. **Given** an unauthenticated user on the Welcome page, **When** they click "Sign Up" and complete email/password registration, **Then** they are authenticated, assigned the Free tier, and redirected to the Editor Mode.
2. **Given** an unauthenticated user on the Sign Up page, **When** they click "Continue with Google" and authorize, **Then** they are authenticated, assigned the Free tier, and redirected to the Editor Mode.
3. **Given** a returning user on the Sign In page, **When** they enter valid credentials, **Then** they are authenticated and redirected to their last visited page or Editor Mode.
4. **Given** a user entering invalid credentials, **When** they submit the form, **Then** they see a clear error message and can retry.

---

### User Story 2 - Tier-Based Access Control (Priority: P1)

Authenticated users have different access levels based on their subscription tier. Free users can access the Editor Mode with limited features (limited icon set, low-resolution PNG export with watermark). Pro users have full access to both Agent Mode and Editor Mode with all features. Team/Lab users get everything Pro gets plus shared team capabilities.

**Why this priority**: Access control is the core business model. Without it, there's no distinction between free and paying users, and no path to monetization.

**Independent Test**: Can be tested by signing in as a Free user and verifying Agent Mode is gated, then signing in as a Pro user and verifying full access.

**Acceptance Scenarios**:

1. **Given** a Free tier user, **When** they navigate to Agent Mode (/agent), **Then** they see an upgrade prompt explaining that Agent Mode requires a Pro subscription, with a clear CTA to upgrade.
2. **Given** a Pro tier user, **When** they navigate to Agent Mode, **Then** they have full access to AI diagram generation.
3. **Given** a Free tier user in Editor Mode, **When** they attempt to export, **Then** they can only export low-resolution PNG with a subtle corner watermark.
4. **Given** a Pro tier user in Editor Mode, **When** they attempt to export, **Then** they can export in all formats (PNG, SVG, PDF, PPTX) at full resolution without watermark.

---

### User Story 3 - Auth-Aware Navigation (Priority: P2)

The application adapts its navigation and UI based on the user's authentication state. Unauthenticated users see the Welcome page with sign-up CTAs. Authenticated users see their profile avatar and a way to sign out. Protected routes redirect unauthenticated users to sign-in.

**Why this priority**: Good auth UX prevents confusion and guides users toward creating accounts, driving conversion.

**Independent Test**: Can be tested by visiting various routes while unauthenticated and authenticated, verifying correct behavior at each.

**Acceptance Scenarios**:

1. **Given** an unauthenticated user, **When** they try to access /agent, **Then** they are redirected to /sign-in with a return URL so they come back after authenticating.
2. **Given** an unauthenticated user, **When** they try to access /editor, **Then** they are redirected to /sign-in with a return URL.
3. **Given** an authenticated user, **When** they view any page, **Then** they see their profile avatar/name in the header with a dropdown to sign out.
4. **Given** an unauthenticated user, **When** they visit the Welcome page, **Then** they see prominent "Sign Up" and "Sign In" buttons.

---

### User Story 4 - User Profile and Session Management (Priority: P3)

Authenticated users can view their profile information, see their current subscription tier, and manage their session. They can sign out from any page. Their subscription tier and usage metadata persist across sessions.

**Why this priority**: Profile management is important for user confidence but isn't blocking core functionality.

**Independent Test**: Can be tested by signing in, viewing profile info, verifying tier display, and signing out.

**Acceptance Scenarios**:

1. **Given** an authenticated user, **When** they click their avatar, **Then** they see a dropdown showing their name, email, subscription tier, and a sign-out option.
2. **Given** an authenticated user, **When** they click "Sign Out", **Then** they are signed out and redirected to the Welcome page.
3. **Given** a user who was signed in previously, **When** they return to the app, **Then** their session is automatically restored if still valid.

---

### Edge Cases

- What happens when a user's session expires while they are editing a diagram? The app preserves their local work and prompts them to re-authenticate to save.
- What happens when Google OAuth fails or is cancelled? The user is returned to the sign-in page with an appropriate error message.
- What happens when a Pro user's subscription lapses? They are downgraded to Free tier and see a notice explaining their reduced access, but existing saved projects remain accessible (read-only for Pro-only features).
- What happens when a user tries to access a direct URL (e.g., /editor/abc123) while unauthenticated? They are redirected to sign-in with the original URL preserved as the return destination.
- What happens when a Team/Lab member is removed from the team? They revert to their individual tier (Free or Pro) and lose access to shared team assets.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST support user registration via email/password
- **FR-002**: System MUST support user registration and sign-in via Google OAuth
- **FR-003**: System MUST assign the Free tier to all newly registered users by default
- **FR-004**: System MUST store subscription tier (free, pro, team) in user metadata
- **FR-005**: System MUST store usage counts (AI generations used, exports performed) in user metadata
- **FR-006**: System MUST protect Agent Mode (/agent) behind authentication + Pro or Team tier
- **FR-007**: System MUST protect Editor Mode (/editor, /editor/:id) behind authentication (any tier)
- **FR-008**: System MUST keep the Welcome page (/) and Credits page (/credits) publicly accessible
- **FR-009**: System MUST provide sign-in at /sign-in and sign-up at /sign-up routes
- **FR-010**: System MUST redirect unauthenticated users to /sign-in when they attempt to access protected routes, preserving the intended destination as a return URL
- **FR-011**: System MUST display the user's profile information (name, email, avatar) when authenticated
- **FR-012**: System MUST provide a sign-out mechanism accessible from any authenticated page
- **FR-013**: System MUST show an upgrade CTA when a Free user attempts to access Pro-only features (Agent Mode, full-res exports, full icon library)
- **FR-014**: System MUST persist authentication state across browser sessions (remember me)
- **FR-015**: System MUST wrap the entire application in an authentication provider so auth state is available on every page

### Key Entities

- **User**: Represents an authenticated person. Key attributes: unique ID, email, display name, avatar URL, subscription tier (free/pro/team), usage counts (AI generations, exports), creation date, last sign-in date.
- **Subscription Tier**: Defines the user's access level. Three values: Free (Editor only, limited features), Pro (full access), Team/Lab (Pro features + shared team capabilities for up to 5 seats).
- **Session**: Represents an active user login. Managed by the auth provider. Persists across browser restarts. Expires based on provider defaults.

## Assumptions

- Clerk is the chosen authentication provider (per project constitution - locked decision).
- Google is the only social OAuth provider needed for V1. Additional providers (GitHub, Apple, etc.) are not in scope.
- Subscription tier changes will be handled by the payments feature (Task 12 - Lemon Squeezy) and are out of scope for this auth feature. For now, tier is stored in user metadata and can be manually set for testing.
- The Team/Lab tier's shared seat management is out of scope for this task. Only the tier value is stored; team management will come later.
- Email verification is handled by Clerk's built-in flow and does not need custom implementation.
- Password reset is handled by Clerk's built-in flow and does not need custom implementation.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can complete account creation (email/password or Google) in under 60 seconds
- **SC-002**: Sign-in flow completes in under 10 seconds from landing on sign-in page to reaching the authenticated destination
- **SC-003**: 100% of unauthenticated access attempts to protected routes result in redirect to sign-in with correct return URL
- **SC-004**: Free users attempting Agent Mode see an upgrade prompt 100% of the time (never accidentally gain access)
- **SC-005**: Pro users can access all features without any access-denied errors
- **SC-006**: Session persistence works across browser restarts - users remain signed in for at least 7 days without re-authentication
- **SC-007**: Authentication adds no more than 500ms to initial page load time

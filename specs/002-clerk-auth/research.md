# Research: Clerk Authentication for FINNISH

**Date**: 2026-02-07
**Feature**: 002-clerk-auth

## Decision 1: Clerk React SDK Version & Package

**Decision**: Use `@clerk/clerk-react` (latest v5.x / Core 2 architecture)
**Rationale**: This is the standard React SDK. No need for `@clerk/react-router` since FINNISH uses BrowserRouter (declarative mode), not React Router v7 framework mode.
**Alternatives considered**:
- `@clerk/react-router` - Only needed for React Router framework mode with `rootAuthLoader`. Not applicable.
- `@clerk/nextjs` - Next.js specific. Not applicable.

## Decision 2: ClerkProvider Placement

**Decision**: Wrap `<App />` with `<ClerkProvider>` in `main.tsx`, outside BrowserRouter
**Rationale**: ClerkProvider must be at the root of the component tree so auth state is available everywhere. It goes outside BrowserRouter (which is inside App.tsx). This follows Clerk's official pattern for React + react-router-dom.
**Alternatives considered**:
- Wrapping inside App.tsx around BrowserRouter - Would work but is less clean. main.tsx is the standard placement.

## Decision 3: Protected Routes Strategy

**Decision**: Use a `ProtectedLayout` component with `useAuth()` hook and React Router's `<Outlet />` pattern
**Rationale**: This is cleaner than wrapping each route individually with `<SignedIn>`/`<SignedOut>`. A single layout component guards a group of routes. For tier-specific gating (Pro-only Agent Mode), use an additional `ProGate` wrapper.
**Alternatives considered**:
- Inline `<SignedIn>`/`<SignedOut>`/`<RedirectToSignIn>` per page - More verbose, harder to maintain.
- Higher-order component (HOC) wrapping - Outdated pattern for React 18.

## Decision 4: User Metadata for Subscription Tier

**Decision**: Use Clerk's `publicMetadata` for subscription tier
**Rationale**: `publicMetadata` is readable on the frontend but only writable from the backend/dashboard. This prevents users from modifying their own tier. The tier value (`'free'` | `'pro'` | `'team'`) is stored in `user.publicMetadata.subscriptionTier`.
**Alternatives considered**:
- `unsafeMetadata` - Writable by frontend. Security risk for tier data.
- `privateMetadata` - Not readable on frontend. Can't gate UI features.
- Custom database (Convex) - Will be added in Task 5, but Clerk metadata is sufficient for V1 auth gating.

## Decision 5: Auth State Management

**Decision**: Use Clerk's hooks directly (`useAuth()`, `useUser()`) instead of a separate Zustand auth store
**Rationale**: Clerk already manages auth state with its own React context. Creating a duplicate Zustand store would cause sync issues. A thin `useSubscription()` custom hook can wrap `useUser()` to extract tier info cleanly.
**Alternatives considered**:
- Zustand auth store synced with Clerk - Unnecessary duplication. Clerk hooks are already reactive.
- React Context wrapper - Clerk already provides context via ClerkProvider.

## Decision 6: SignIn/SignUp Routing

**Decision**: Use `routing="path"` with dedicated routes at `/sign-in/*` and `/sign-up/*`
**Rationale**: Path-based routing gives clean URLs (vs hash-based default). The `/*` wildcard is required because Clerk uses sub-routes internally (SSO callback, factor-two verification, etc.).
**Alternatives considered**:
- Hash routing (default) - Ugly URLs with `#` fragments.
- Modal-based auth - Good for optional sign-in but not for required auth flows with redirects.

## Decision 7: Environment Variables

**Decision**: Use `VITE_CLERK_PUBLISHABLE_KEY` in `.env.local` (gitignored)
**Rationale**: Vite only exposes env vars with `VITE_` prefix to client code. The publishable key is safe for client-side use. Secret key stays server-side only.
**Alternatives considered**: None - this is the only correct pattern for Vite.

## Decision 8: Deprecated API Awareness

**Decision**: Use `fallbackRedirectUrl` instead of deprecated `afterSignInUrl`/`afterSignUpUrl`
**Rationale**: Clerk v5 deprecated `afterSignInUrl` and `afterSignUpUrl`. The new pattern uses `fallbackRedirectUrl` (redirect if no explicit redirect_url in URL params) and `forceRedirectUrl` (always redirect here).
**Alternatives considered**: None - must use current API.

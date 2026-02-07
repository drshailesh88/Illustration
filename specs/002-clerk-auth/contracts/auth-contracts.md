# Auth Contracts: Clerk Authentication

**Date**: 2026-02-07
**Feature**: 002-clerk-auth

## Frontend Contracts (React Hooks & Components)

### useSubscription() Hook

Custom hook wrapping Clerk's `useUser()` to extract tier info.

```typescript
interface SubscriptionInfo {
  tier: 'free' | 'pro' | 'team';
  isLoaded: boolean;
  isPro: boolean;        // tier === 'pro' || tier === 'team'
  isFree: boolean;       // tier === 'free'
  isTeam: boolean;       // tier === 'team'
  canAccessAgentMode: boolean;  // isPro
  canExportFullRes: boolean;    // isPro
  canAccessFullIcons: boolean;  // isPro
}

function useSubscription(): SubscriptionInfo
```

### ProtectedRoute Component

Layout component that wraps protected route groups.

```typescript
interface ProtectedRouteProps {
  children?: React.ReactNode;
  // If true, uses Outlet pattern for nested routes
}

// Behavior:
// - If auth not loaded: show loading spinner
// - If not signed in: redirect to /sign-in with return URL
// - If signed in: render children/Outlet
```

### ProGate Component

Component that gates content behind Pro subscription.

```typescript
interface ProGateProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;  // Shown to free users (default: upgrade CTA)
}

// Behavior:
// - If tier is 'pro' or 'team': render children
// - If tier is 'free': render fallback (upgrade prompt)
```

### UpgradeCTA Component

Reusable upgrade prompt shown to free users.

```typescript
interface UpgradeCTAProps {
  feature: string;  // e.g., "Agent Mode", "SVG Export"
  description?: string;
}

// Renders: Feature name, description of what Pro includes, CTA button
```

## Route Contracts

| Route | Auth Required | Tier Required | Behavior |
|-------|:---:|:---:|----------|
| `/` | No | - | Welcome page, show sign-in/up CTAs |
| `/credits` | No | - | Credits page, public |
| `/sign-in/*` | No | - | Clerk SignIn component |
| `/sign-up/*` | No | - | Clerk SignUp component |
| `/agent` | Yes | Pro/Team | AI diagram generation |
| `/editor` | Yes | Any | Canvas editor (limited features for Free) |
| `/editor/:id` | Yes | Any | Canvas editor with loaded diagram |

## Environment Variables

| Variable | Required | Client-side | Description |
|----------|:---:|:---:|-------------|
| `VITE_CLERK_PUBLISHABLE_KEY` | Yes | Yes | Clerk publishable key (pk_test_... or pk_live_...) |

## Component Hierarchy

```
main.tsx
  └── ClerkProvider (publishableKey)
        └── App.tsx
              └── ErrorBoundary
                    └── ToastProvider
                          └── BrowserRouter
                                └── Routes
                                      ├── "/" → Welcome (public)
                                      ├── "/credits" → CreditsPage (public)
                                      ├── "/sign-in/*" → SignInPage
                                      ├── "/sign-up/*" → SignUpPage
                                      └── ProtectedLayout (useAuth guard)
                                            ├── "/agent" → ProGate → AgentMode
                                            ├── "/editor" → EditorMode
                                            └── "/editor/:id" → EditorMode
```

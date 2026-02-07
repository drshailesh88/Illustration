# Quickstart: Clerk Authentication

**Date**: 2026-02-07
**Feature**: 002-clerk-auth

## Prerequisites

1. Node.js >= 18
2. A Clerk account at https://dashboard.clerk.com
3. A Clerk application created with:
   - Email/password authentication enabled
   - Google OAuth social connection enabled

## Setup Steps

### 1. Install Clerk

```bash
cd "/Users/shaileshsingh/the academic illustrator app"
npm install @clerk/clerk-react
```

### 2. Configure Environment

Create `.env.local` at project root (gitignored):

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

Get your publishable key from: Clerk Dashboard > Configure > API Keys

### 3. Configure Clerk Dashboard

1. **Email/Password**: Configure > Email, phone, username > Enable Email + Password
2. **Google OAuth**: Configure > SSO connections > Add Google
   - Development: Uses Clerk's shared credentials (no setup needed)
   - Production: Requires Google Cloud Console OAuth client ID

### 4. Verify Build

```bash
npx tsc --noEmit
NODE_OPTIONS="--max-old-space-size=8192" npm run build
```

### 5. Test Locally

```bash
npm run dev
```

Visit http://localhost:5173 and verify:
- Welcome page loads (public)
- /agent redirects to /sign-in
- /editor redirects to /sign-in
- Sign up with email/password works
- Sign in with Google works
- After auth, /editor is accessible
- Free user sees upgrade CTA on /agent
- Sign out returns to Welcome page

## File Changes Summary

| File | Change |
|------|--------|
| `package.json` | Add `@clerk/clerk-react` dependency |
| `.env.local` | New file with `VITE_CLERK_PUBLISHABLE_KEY` |
| `src/vite-env.d.ts` | Add `VITE_CLERK_PUBLISHABLE_KEY` type |
| `src/main.tsx` | Wrap `<App />` with `<ClerkProvider>` |
| `src/App.tsx` | Add auth routes, protected layout, sign-in/up pages |
| `src/hooks/useSubscription.ts` | New hook for tier-based access |
| `src/components/Auth/ProtectedLayout.tsx` | New route guard component |
| `src/components/Auth/ProGate.tsx` | New Pro-tier gating component |
| `src/components/Auth/UpgradeCTA.tsx` | New upgrade prompt component |
| `src/pages/Welcome/Welcome.tsx` | Add auth buttons to header |
| `src/pages/AgentMode/AgentMode.tsx` | Wrap with ProGate |

## Testing Subscription Tiers

To test Pro tier access without Lemon Squeezy (Task 12):

1. Go to Clerk Dashboard > Users > select user
2. Click "Edit metadata" under Public metadata
3. Set: `{ "subscriptionTier": "pro" }`
4. Save and refresh your app

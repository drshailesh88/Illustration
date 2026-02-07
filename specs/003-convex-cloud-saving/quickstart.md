# Quickstart: Convex Database and Cloud Saving

**Feature**: 003-convex-cloud-saving
**Date**: 2026-02-07

## Prerequisites

1. Clerk authentication is already implemented (Task 4 — done)
2. Clerk Dashboard: JWT template named "convex" created
3. Convex account created and CLI installed
4. `.env.local` has `VITE_CLERK_PUBLISHABLE_KEY` set

## Setup Steps

### 1. Install Convex

```bash
npm install convex
```

### 2. Initialize Convex Project

```bash
npx convex dev
```

This will:
- Prompt you to log in (GitHub)
- Create a new Convex project
- Create `convex/` directory with `_generated/` types
- Add `CONVEX_DEPLOYMENT` and `VITE_CONVEX_URL` to `.env.local`

### 3. Configure Clerk JWT for Convex

In the **Clerk Dashboard**:
1. Go to **JWT Templates**
2. Click **New Template** → Select **Convex**
3. Keep the template name as `"convex"` (do NOT rename)
4. Copy your Clerk **Frontend API URL** (e.g., `https://your-instance.clerk.accounts.dev`)

In the **Convex Dashboard**:
1. Go to **Settings → Environment Variables**
2. Add: `CLERK_JWT_ISSUER_DOMAIN` = your Clerk Frontend API URL

### 4. Verify the Build

```bash
npx tsc --noEmit && NODE_OPTIONS="--max-old-space-size=8192" npm run build
```

## Integration Test Scenarios

### Scenario 1: Save a New Diagram
1. Sign in as any user
2. Open Editor Mode at `/editor`
3. Draw something on the canvas
4. Click "Save" button
5. **Expected**: Project created in Convex, success toast shown, URL updates to `/editor/<projectId>`

### Scenario 2: Load a Saved Diagram
1. Sign in, navigate to My Projects at `/projects`
2. Click on a previously saved project
3. **Expected**: Editor opens with all canvas objects restored, title shown

### Scenario 3: Auto-Save
1. Open a saved project in Editor
2. Make changes (add/move objects)
3. Wait 30+ seconds without manually saving
4. Close the tab, reopen the same project
5. **Expected**: Changes from step 2 are preserved

### Scenario 4: My Projects Dashboard
1. Sign in as a user with 3+ saved projects
2. Navigate to `/projects`
3. **Expected**: Grid of project cards with thumbnails, titles, "last modified" dates, sorted by most recent

### Scenario 5: Delete a Project
1. On My Projects dashboard, click delete on a project
2. **Expected**: Confirmation dialog appears
3. Confirm deletion
4. **Expected**: Project removed from grid, thumbnail file cleaned up

### Scenario 6: User Record Creation
1. Sign up as a brand new user
2. Navigate to any authenticated page
3. **Expected**: User record created in Convex with Free tier, 0 usage counts

### Scenario 7: Free Tier Project Limit
1. Sign in as a Free user with 10 existing projects
2. Try to save an 11th project
3. **Expected**: Error message showing "Upgrade to Pro" prompt, project not saved

### Scenario 8: localStorage Migration
1. Create diagrams in localStorage (use the app without saving to cloud)
2. Sign in for the first time
3. **Expected**: Migration prompt appears offering to import localStorage diagrams
4. Accept migration
5. **Expected**: All diagrams appear in My Projects, localStorage cleaned up

### Scenario 9: Cross-Device Access
1. Sign in on Device A, save a diagram
2. Sign in with same account on Device B (or incognito window)
3. Navigate to My Projects
4. **Expected**: Same diagram visible, opens correctly in Editor

### Scenario 10: Network Error Handling
1. Open a saved project in Editor
2. Disconnect internet
3. Make changes, click Save
4. **Expected**: "Save failed" notification appears
5. Reconnect internet
6. **Expected**: Retry succeeds, "Saved" status restored

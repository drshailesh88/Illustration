# Quickstart: Waitlist Landing Page

**Feature**: 004-waitlist-page
**Date**: 2026-02-07

## Prerequisites

- `npm run dev` running (Vite dev server)
- `npx convex dev` running (Convex backend — for live testing only)
- Note: Build verification (`tsc --noEmit`) works without Convex dev server

## Integration Test Scenarios

### Scenario 1: Page Loads Correctly
1. Navigate to `/waitlist`
2. Verify headline "One app that solves every illustration problem for the scientific community" is visible
3. Verify 3-4 feature highlights with icons are displayed
4. Verify social proof text "Built by a doctor, for doctors" is visible
5. Verify email input field and submit button are present
6. Verify signup count area is visible

### Scenario 2: Successful Email Signup
1. Navigate to `/waitlist`
2. Enter a valid email (e.g., "test@university.edu")
3. Click "Join the Waitlist"
4. Verify success message appears ("You're on the list!")
5. Verify the signup count increments by 1

### Scenario 3: Duplicate Email Prevention
1. Sign up with "test@university.edu" (should succeed)
2. Enter the same email again
3. Click "Join the Waitlist"
4. Verify friendly message: "You're already on the waitlist!"
5. Verify the signup count does NOT increment

### Scenario 4: Email Validation
1. Enter an invalid email (e.g., "notanemail")
2. Attempt to submit
3. Verify validation error appears (form does not submit)
4. Enter another invalid email (e.g., "missing@")
5. Verify validation error appears
6. Enter a valid email, verify form submits successfully

### Scenario 5: Referral Source Tracking
1. Navigate to `/waitlist?ref=twitter`
2. Enter an email and submit
3. Verify signup is stored with referralSource = "twitter" (check Convex dashboard)
4. Navigate to `/waitlist` (no ref parameter)
5. Enter a different email and submit
6. Verify signup is stored with empty referralSource

### Scenario 6: Mobile Responsiveness
1. Open `/waitlist` on a mobile viewport (375px wide)
2. Verify all content fits without horizontal scrolling
3. Verify email input and button are full-width and easy to tap
4. Verify feature highlights stack vertically
5. Verify text is readable (no overflow or truncation)

### Scenario 7: Desktop Layout
1. Open `/waitlist` on a desktop viewport (1440px wide)
2. Verify feature highlights display in a multi-column grid
3. Verify page content is centered and appropriately max-width constrained
4. Verify dark theme is applied consistently

### Scenario 8: Empty State (Zero Signups)
1. When the waitlist table is empty
2. Navigate to `/waitlist`
3. Verify count area shows "Be the first to join" or similar (not "Join 0 scientists")

### Scenario 9: Error Handling
1. With Convex backend stopped (simulate network failure)
2. Enter a valid email and submit
3. Verify an error message appears ("Something went wrong, please try again")
4. Verify the form remains usable (can retry)

### Scenario 10: Page Performance
1. Load `/waitlist` with browser DevTools Network tab open
2. Verify page becomes interactive within 2 seconds
3. Verify no unnecessary large assets are loaded

# Feature Specification: Waitlist Landing Page

**Feature Branch**: `004-waitlist-page`
**Created**: 2026-02-07
**Status**: Draft
**Input**: User description: "Build Waitlist Landing Page for FINNISH app. Create a compelling, mobile-responsive waitlist page to collect email signups before the July 2026 conference launch."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Email Signup (Priority: P1)

A scientist discovers FINNISH through social media, a colleague's recommendation, or a conference mention. They visit the waitlist page and see a compelling headline explaining what FINNISH does. They enter their email address, submit the form, and receive immediate visual confirmation that they've been added to the waitlist. They can see how many other scientists have already signed up, providing social proof.

**Why this priority**: This is the core purpose of the waitlist page. Without email collection, the page serves no business function. Every other feature depends on this working correctly.

**Independent Test**: Can be fully tested by visiting the waitlist URL, entering a valid email, clicking submit, and verifying the confirmation message appears. Delivers the core value of capturing interested user emails.

**Acceptance Scenarios**:

1. **Given** a visitor on the waitlist page, **When** they enter a valid email and click "Join the Waitlist", **Then** the system stores their email and shows a success confirmation message.
2. **Given** a visitor on the waitlist page, **When** they enter an invalid email (e.g., missing @, no domain), **Then** the form shows a validation error and does not submit.
3. **Given** a visitor who has already signed up, **When** they enter the same email again, **Then** the system shows a friendly message indicating they're already on the list (no duplicate entry created).

---

### User Story 2 - Compelling Page Content (Priority: P1)

A visitor lands on the waitlist page and immediately understands what FINNISH is and why they should care. The page displays a clear headline ("One app that solves every illustration problem for the scientific community"), 3-4 feature highlights with descriptive icons, and social proof messaging ("Built by a doctor, for doctors"). The page matches the existing FINNISH dark theme and feels professional and trustworthy.

**Why this priority**: The content and visual presentation directly determine conversion rate. A confusing or unappealing page will result in visitors leaving without signing up, making the email form useless.

**Independent Test**: Can be tested by loading the page and verifying all content sections render correctly: headline, feature highlights (3-4 items with icons), social proof text, and signup form. Visual inspection confirms dark theme consistency.

**Acceptance Scenarios**:

1. **Given** a visitor loads the waitlist page, **When** the page renders, **Then** they see a headline, feature highlights section, social proof messaging, and email signup form — all within a single scrollable page.
2. **Given** a visitor on a mobile device, **When** they load the waitlist page, **Then** all content is readable and properly laid out without horizontal scrolling or overlapping elements.
3. **Given** a visitor on a desktop browser, **When** they load the waitlist page, **Then** feature highlights display in a multi-column grid layout appropriate for the screen width.

---

### User Story 3 - Live Signup Count (Priority: P2)

Visitors see a real-time count of how many scientists have already joined the waitlist. This number updates as new signups occur and serves as social proof to encourage additional signups. The count is displayed prominently near the signup form.

**Why this priority**: Social proof increases conversion rates but the page is still functional without it. This enhances the signup experience but is not required for the core email collection flow.

**Independent Test**: Can be tested by checking that the signup count displays a number, then submitting a new email and verifying the count increments.

**Acceptance Scenarios**:

1. **Given** a visitor on the waitlist page, **When** the page loads, **Then** they see a signup count message (e.g., "Join 147 scientists on the waitlist").
2. **Given** a visitor on the waitlist page, **When** another person signs up (or they sign up themselves), **Then** the displayed count reflects the updated total.

---

### User Story 4 - Referral Source Tracking (Priority: P3)

The system captures where each signup came from (e.g., Twitter, conference, colleague referral) via URL parameters. This data helps the marketing team understand which channels drive the most interest. No additional user input is required — the source is captured automatically from the URL.

**Why this priority**: Analytics data is valuable for marketing but does not affect user experience. The page works perfectly without tracking referral sources.

**Independent Test**: Can be tested by visiting the waitlist URL with a source parameter (e.g., /waitlist?ref=twitter), submitting an email, and verifying the referral source is stored alongside the signup record.

**Acceptance Scenarios**:

1. **Given** a visitor arrives via a link with a referral parameter (e.g., ?ref=twitter), **When** they sign up, **Then** the referral source "twitter" is stored with their signup record.
2. **Given** a visitor arrives via a direct link with no referral parameter, **When** they sign up, **Then** the referral source is stored as "direct" or left empty.

---

### Edge Cases

- What happens when the visitor submits the form with an empty email field? The form shows a required field validation message.
- What happens when the visitor submits the same email from a different device? The system recognizes the duplicate and shows "You're already on the list."
- What happens when the signup storage is temporarily unavailable? The form shows a generic error ("Something went wrong, please try again") and allows the visitor to retry.
- What happens when the page loads with no internet connection? The page content renders from cache if available; the form submission fails gracefully with an error message.
- What happens when the signup count is zero (brand new launch)? The count section is hidden or shows alternative text (e.g., "Be the first to join").

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a single-page waitlist with a headline, feature highlights, social proof, and email signup form
- **FR-002**: System MUST validate email format before submission (must contain @ symbol and valid domain structure)
- **FR-003**: System MUST store each signup with the email address and the date/time of signup
- **FR-004**: System MUST prevent duplicate email signups and show a friendly message when a duplicate is detected
- **FR-005**: System MUST display a success confirmation after a successful signup (inline on the same page, no redirect)
- **FR-006**: System MUST display a live count of total signups on the page
- **FR-007**: System MUST render correctly on mobile devices (320px width and above) without horizontal scrolling
- **FR-008**: System MUST render correctly on desktop screens (up to 1920px width) with appropriate multi-column layouts
- **FR-009**: System MUST match the existing FINNISH application dark theme and visual style
- **FR-010**: System MUST capture referral source from URL parameters when present (e.g., ?ref=twitter)
- **FR-011**: System MUST display 3-4 feature highlights with descriptive icons summarizing FINNISH's key capabilities
- **FR-012**: System MUST display social proof messaging including "Built by a doctor, for doctors"
- **FR-013**: System MUST be accessible at the /waitlist route within the application
- **FR-014**: System MUST show appropriate error messages when form submission fails due to network or server issues

### Key Entities

- **Waitlist Signup**: Represents a single email registration. Key attributes: email address (unique), signup timestamp, referral source (optional). One signup per unique email.
- **Signup Count**: An aggregate value representing the total number of unique signups. Displayed to visitors as social proof.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The waitlist page loads and becomes interactive within 2 seconds on a standard broadband connection
- **SC-002**: 90% of visitors who begin entering their email successfully complete the signup process
- **SC-003**: The system correctly prevents 100% of duplicate email submissions
- **SC-004**: The page renders without layout issues on screens from 320px to 1920px wide
- **SC-005**: The signup count updates within 5 seconds of a new signup occurring
- **SC-006**: All form validation errors are displayed inline within 500 milliseconds of submission attempt

## Scope

### In Scope

- Single-page waitlist with email collection
- Feature highlights with icons
- Social proof messaging and live signup count
- Referral source tracking via URL parameters
- Mobile-first responsive design
- Dark theme matching existing FINNISH application
- Success/error states for form submission

### Out of Scope

- Email verification or confirmation emails (just collect the address)
- User accounts or authentication for waitlist visitors
- Admin dashboard for viewing signups (use database directly)
- A/B testing of page content
- Analytics integration beyond referral source capture
- Custom domain or subdomain configuration (uses existing app routing)

## Assumptions

- The existing FINNISH application CSS variable system (dark theme) is available and can be reused for consistent styling
- The application's existing database infrastructure is available for storing signups
- No email verification flow is needed — raw email collection is sufficient for pre-launch
- The waitlist page is publicly accessible (no authentication required)
- Feature highlight icons will use the existing icon libraries available in the application
- The waitlist page coexists with the main application — it's a route within the same app, not a separate deployment
- Signup count starts at 0 and counts up organically (no artificial inflation)

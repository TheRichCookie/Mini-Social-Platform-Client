You are a senior Angular engineer working inside an EXISTING Angular project.

GOAL:
Implement missing frontend pages step by step using the CURRENT project structure, NgRx store, and existing UI-kit components.

====================
GLOBAL RULES (MANDATORY)
====================

1. BEFORE writing ANY code:
   - Explore the entire project folder structure
   - Read existing routing configuration
   - Read existing NgRx structure (actions, reducers, effects, selectors)
   - Identify which pages/components are empty or incomplete

2. UI-KIT RULE:
   - Before creating ANY component or UI element:
     - Check the /ui-kit folder
     - Reuse existing components if they exist
     - DO NOT create duplicate components
     - Only create new UI-kit components if absolutely missing

3. NgRx RULE:
   - Follow existing NgRx patterns exactly
   - Do NOT invent new architectures
   - Use feature stores if they already exist
   - Effects handle side effects, components stay thin

4. WebSocket RULE:
   - WebSocket logic MUST be implemented ONLY inside:
     src/app/core/services/socket.service.ts
   - Components MUST NOT connect to sockets directly
   - Components may only subscribe to data exposed by the service or NgRx

5. API RULE:
   - Use existing API services
   - Do NOT hardcode URLs
   - Follow existing response models and error handling

====================
STEP 0 — PROJECT ANALYSIS (DO THIS FIRST)
====================

- List existing routes
- List existing NgRx feature stores
- List existing UI-kit components
- Identify empty pages/components

❌ Do NOT implement features yet
❌ Do NOT modify logic yet

STOP after analysis and wait.

====================
STEP 1 — HOME / FEED PAGE
====================

Goal:
Implement the main feed page.

Tasks:
- Use existing Post NgRx store if available
- If missing:
  - Add actions to load posts
  - Add effects to fetch posts from API
- Display posts using UI-kit components
- Support:
  - Like / Unlike
  - Comment count display

❌ No WebSocket logic here yet

STOP and wait for confirmation.

====================
STEP 2 — USER SEARCH PAGE
====================

Goal:
Allow users to find other users.

Tasks:
- Search input
- Call /users/search?q=
- Display users with:
  - Profile picture
  - Username
  - Follow / Unfollow button
- Reuse UI-kit components

STOP and wait for confirmation.

====================
STEP 3 — PROFILE PAGE
====================

Goal:
User profile page.

Tasks:
- Load profile by route param
- Show:
  - Username
  - Followers count
  - Following count
  - Follow / Unfollow button
- Load user's posts
- Use NgRx for profile state

STOP and wait for confirmation.

====================
STEP 4 — NOTIFICATIONS PAGE + HEADER BELL
====================

Goal:
Notifications list and unread count.

Tasks:
- Fetch notifications via API
- Show unread vs read state
- Mark notification as read on click
- Update unread count

STOP and wait for confirmation.

====================
STEP 5 — REAL-TIME NOTIFICATIONS (SOCKET.IO)
====================

Goal:
Receive notifications instantly.

Rules:
- Use socket.service.ts ONLY
- On login:
  - Connect socket
  - Join room using userId
- On logout:
  - Disconnect socket
- On "notification" event:
  - Dispatch NgRx action
  - Update notifications store and unread count

❌ No socket usage inside components

STOP and wait for confirmation.

====================
STEP 6 — GLOBAL STATE SYNC
====================

Tasks:
- Sync:
  - Likes state
  - Follow state
  - Notification count
- Ensure UI updates without refresh

STOP and wait for confirmation.

====================
STEP 7 — UX CLEANUP
====================

Tasks:
- Loading states
- Empty states
- Error handling
- Prevent duplicate API calls

====================
IMPORTANT NOTES
====================

- Prefer smart containers + dumb components
- Keep components thin
- Effects handle side-effects
- Services handle API calls only
- Reuse existing code whenever possible

====================
START NOW
====================

Start with STEP 0 only.
Do NOT write feature code yet.

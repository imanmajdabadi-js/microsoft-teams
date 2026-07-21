# Van Arsdel Launch Control

A responsive launch-control workspace for tracking workstreams, assigned tasks, deadlines, blockers, and team decisions.

The project keeps the visual familiarity of a Microsoft Teams-inspired shell, but it is intentionally focused on one product flow instead of pretending to recreate the full platform.

> This is an independent portfolio project and is not affiliated with Microsoft.

## Why this project exists

Launch work often becomes difficult to follow when tasks, owners, deadlines, and decisions are spread across separate conversations. This workspace brings the most important launch information into one clear flow so a team member can answer:

- What needs attention now?
- Which workstream owns the task?
- What am I responsible for?
- Which blocker still needs a decision?
- What outcome was agreed on?

## Main workflow

1. Review launch progress and priority work on the overview.
2. Filter or search tasks by status, owner, or workstream.
3. Open a workstream and continue into nested task details.
4. Update a task status and keep the change on the current device.
5. Review personal work and upcoming deadlines.
6. Record decision outcomes without automatically closing the linked task.

## Features

- Responsive overview for desktop and mobile
- Search and status filters
- Nested workstream and task routes
- Personal `Assigned to me` queue with URL-backed filters
- Timeline grouped by upcoming deadlines
- Persistent task-status updates
- Decision log linked to blocked tasks
- Helpful empty, missing-route, and missing-task states
- Compatibility redirect for the original misspelled workspace route

## Tech stack

- React 18
- TypeScript 4.9
- React Router 6
- Tailwind CSS 3
- Create React App with CRACO
- React Testing Library and Jest

## Code structure

```text
src/
  assets/                 Product icons used by the current interface
  components/             Shared shell and UI components
  hooks/                  Responsive device helper
  pages/
    vanArsdel/
      components/         Workspace navigation and status UI
      context/            Shared work and decision state
      data/               Typed mock workspace data
      pages/              Overview, timeline, decisions, and workstreams
```

`WorkspaceProvider` owns the small amount of state shared across workspace pages. Task statuses and decision outcomes are stored in `localStorage`; filters that should survive sharing or refreshes stay in the URL. No external state library was added because the current product flow does not need one.

## Important decisions

- **Focused product boundary:** unfinished top-level Teams pages were removed instead of being presented as working features.
- **Simple state ownership:** one small context is enough for the current shared state.
- **Honest decision flow:** recording an outcome does not mark its related task as completed.
- **Backward-compatible cleanup:** the corrected `/van-arsdel` route keeps a redirect from the original `/van-ardsel` path.
- **Measured asset cleanup:** embedded avatar images and an unused icon package were replaced with lightweight UI elements. In the local production build, the main JavaScript bundle dropped from about 633 kB to 69 kB after gzip.

## Project evolution

The first version was created in September 2024 to practise dashboard UI and nested routing. In 2026, I returned to the repository and improved it incrementally while preserving the original Git history.

The revival focused on fixing routing issues, turning placeholders into one coherent launch workflow, adding proportional tests, removing unsupported navigation, improving responsive behaviour, and documenting the remaining limitations.

## Run locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

For a clean install that follows the lock file:

```bash
npm ci
```

## Quality checks

```bash
npm run typecheck
npm run lint
npm run test:ci
npm run build
```

The tests cover the main filters, nested routing, task persistence, decision persistence, and route recovery.

## Current limitations

- Workspace data is local mock data; there is no backend or authentication.
- Changes are stored per browser and are not shared between users.
- Due dates are relative sample values rather than calendar dates from an API.
- The project still uses the older Create React App toolchain, which reports known maintenance warnings during tests and builds.

## Possible next steps

- Add a small API boundary when a real backend is available.
- Add authentication and permissions only if the product becomes multi-user.
- Migrate the build tool when deployment or maintenance provides a concrete reason.

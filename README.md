# Van Arsdel Launch Control

A responsive workspace for tracking launch workstreams, assigned tasks, deadlines, blockers, and team decisions.

The interface keeps some visual familiarity from Microsoft Teams, but the product is intentionally limited to one clear workflow. It is not a Microsoft Teams clone.

> This is an independent portfolio project and is not affiliated with Microsoft.

## Why I built it

I first created this project in September 2024 to practise dashboard UI, responsive layouts, and nested routes in React.

The original version had a useful visual shell, but some routes were broken, several pages were placeholders, and there was no complete product flow.

In 2026, I returned to the repository and improved it incrementally instead of rebuilding it from scratch. I preserved the original Git history, kept the useful parts, and turned the unfinished dashboard into a focused launch-control workspace.

## Product problem

Launch information becomes difficult to follow when tasks, owners, deadlines, blockers, and decisions are spread across different conversations.

This workspace helps a small launch team answer:

- What needs attention now?
- Which workstream owns the task?
- What am I responsible for?
- Which deadlines are close?
- Which blocker still needs a decision?
- What outcome was agreed on?

The project is currently a single-browser demonstration. It does not provide real team accounts or shared server data.

## Main workflow

1. Review progress and priority work on the overview.
2. Filter tasks or search by title, owner, and workstream.
3. Open a workstream and continue into a nested task route.
4. Review the task owner, timing, priority, and blocker.
5. Update the task status and keep the change on the current device.
6. Review personal work and upcoming deadlines.
7. Record a decision outcome and return to the linked task.

Recording a decision does not automatically complete its task. A decision provides direction; finishing the work is a separate action.

## Features

- Responsive overview for desktop and mobile
- Search and status filters
- Typed workstream, task, and decision data
- Nested workstream and task routes
- Personal `Assigned to me` queue with URL-backed filters
- Timeline grouped by upcoming deadlines
- Persistent task-status updates and decision outcomes
- Decision records linked to blocked tasks
- Empty, missing-task, and unknown-route states
- Redirect support for the original misspelled workspace route

## How it works

### Routing

React Router defines the workspace routes:

```text
/van-arsdel/home
/van-arsdel/timeline
/van-arsdel/assigned-to-me
/van-arsdel/decisions
/van-arsdel/workstreams/:workstreamId
/van-arsdel/workstreams/:workstreamId/tasks/:taskId
```

The nested URL shows the relationship between a workstream and its tasks. Task details also verify that the requested task belongs to the requested workstream.

The corrected `/van-arsdel` path keeps a compatibility redirect from the original `/van-ardsel` spelling.

### State

State is kept close to its owner:

- `WorkspaceProvider` owns task statuses and decision outcomes shared across pages.
- `localStorage` keeps changed values on the current device.
- URL search parameters keep the selected personal-work filter after refresh.
- Home search and filters stay as local UI state.
- Progress and summary counts are derived from the current work items.

Saved data is validated before it is used. Invalid or unavailable storage falls back to the initial mock data.

No external state library was added because the shared client state is small. React Query was also unnecessary because the project does not have remote server state.

### Styling

Repeated colours, widths, typography values, and grid definitions live in the Tailwind theme with semantic names. Components use those shared tokens instead of scattered raw values or arbitrary Tailwind classes.

The progress bar uses one dynamic inline width because its percentage is calculated at runtime.

## Technical decisions

- **Focused scope:** unfinished top-level Teams pages were removed instead of being shown as working features.
- **Simple state ownership:** Context is enough for the current shared state.
- **Honest task flow:** recording a decision does not falsely complete its related task.
- **Backward compatibility:** old misspelled links still reach the corrected workspace.
- **Proportional testing:** tests cover important user behaviour rather than CSS details.
- **Incremental revival:** useful historical work was preserved instead of replacing the repository with an unrelated rewrite.

## Tech stack

- React 18
- TypeScript 4.9
- React Router 6
- Tailwind CSS 3
- Create React App with CRACO
- React Testing Library
- Jest

## Project structure

```text
src/
  assets/                 Product icons
  components/             Shared shell and UI components
  hooks/                  Responsive device helper
  pages/
    vanArsdel/
      components/         Workspace navigation and status UI
      context/            Shared work and decision state
      data/               Typed mock workspace data
      pages/              Product pages and nested task views
```

## What I practised

- Breaking a dashboard into one clear product flow
- Designing nested routes and recovery states
- Separating local, URL, shared, and derived state
- Using TypeScript unions and focused domain types
- Validating data read from browser storage
- Building responsive mobile and desktop layouts
- Writing interaction tests for important behaviour
- Improving an old repository without hiding its history

## Performance cleanup

The older project included large embedded avatar assets and an icon dependency that was no longer needed.

After removing unused code and replacing those assets, the main JavaScript bundle in the local production build decreased from about `633 kB` to `69 kB` after gzip.

This is a build-size comparison, not a Lighthouse or Core Web Vitals claim.

## Run locally

Requirements:

- Node.js
- npm

Install the locked dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run lint
npm run typecheck
npm run test:ci
npm run build
```

At the final portfolio check, ESLint passed with zero warnings, TypeScript passed, all 11 tests passed, and the production build completed successfully.

The tests cover routing, filters, nested tasks, local persistence, decisions, and route recovery.

## Current limitations

- Workspace data is local mock data.
- There is no backend, API, database, authentication, or authorization.
- Changes are stored per browser and are not shared between users.
- Due dates are relative sample values instead of real calendar dates.
- End-to-end browser tests and a complete accessibility audit are not included.
- The older Create React App toolchain reports maintenance warnings.
- A public live demo has not been published yet.

## Possible next steps

1. Publish a live demo and add its link to this README.
2. Place mock data behind a small service layer.
3. Connect a real API with loading, error, and empty states.
4. Replace relative due values with real dates and timezone-aware formatting.
5. Add authentication and role-based permissions if the product becomes multi-user.
6. Add one end-to-end test for the main overview-to-decision flow.
7. Migrate from Create React App when continued maintenance justifies it.

## Repository evolution

- **2024:** initial dashboard and routing practice
- **2026:** connected workflows, tests, responsive improvements, performance cleanup, and documentation

The project is presented as improved older work, not as a recently built production platform.

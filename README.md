# StudyMate

StudyMate is a responsive student study planner built with React and Vite. It has a landing page and a working planner dashboard for study tasks, weekly sessions, and goals.

## Run the project

Open a terminal in this project folder and run:

```powershell
npm.cmd install
npm.cmd run dev
```

Open the local address printed by Vite (usually `http://localhost:5173/`). The planner dashboard is at `/dashboard`.

To check the code and create a production build:

```powershell
npm.cmd run lint
npm.cmd run build
```

## Planner features

- Create, edit, complete, filter, and delete study tasks.
- Add subject, description, due date, and priority to tasks.
- See overdue task counts and filter overdue items.
- Plan, edit, and delete study sessions in a week view.
- Navigate to previous and following weeks.
- Set measurable goals and track their progress.
- Review a summary of tasks and today's study sessions.

## Data and privacy

This version intentionally has no authentication, admin dashboard, or server database. Planner entries are saved in the current browser's `localStorage` under the key `studymate-planner-v1`. They are not uploaded or shared, and they do not sync to another browser or device. Clearing this browser's site data removes the planner.

Google Analytics and Supabase are not configured. No visitor or student statistics are collected. This is a local planner, not a multi-user hosted service.

## Project structure

- `src/App.jsx` — React Router routes.
- `src/components/LandingPage.jsx` — StudyMate landing page.
- `src/components/Features.jsx` — landing page features section.
- `src/components/Planner.jsx` — landing page weekly planner preview.
- `src/components/About.jsx` — landing page closing/about section.
- `src/components/Overview.jsx` — dashboard overview and task summary.
- `src/components/MyTask.jsx` — dashboard task list and filters.
- `src/components/Timetable.jsx` — dashboard study timetable and daily sessions.
- `src/components/Goal.jsx` — dashboard goals and progress.
- `src/components/DashboardPage.jsx` — dashboard UI, planner state, forms, filters, and browser persistence.
- `src/App.css` — landing page and dashboard styles.
- `src/index.css` — global styles and accessible focus states.
- `index.html` — page title and description used by Vite.

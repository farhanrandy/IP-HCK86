# Job Finder + AI Resume Helper (Frontend)

React + Vite + Tailwind + React Router + Redux Toolkit + Axios + Google OAuth.

## Setup

```bash
npm i
cp .env.example .env
# edit VITE_API_URL and VITE_GOOGLE_CLIENT_ID
npm run dev
```

Routes:
- `/login` — Google Login (sends `idToken` to `POST /auth/google`).
- `/jobs` — Search jobs from backend `/jobs/search` and save to `/saved`.
- `/saved` — List & delete saved jobs.
- `/resumes` — CRUD `/resumes`.
- `/ai` — Generate cover letter via `POST /ai/cover-letter`.
```

Styling: Tailwind, simple professional look.

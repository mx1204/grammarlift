# GrammarLift

![Demo placeholder](https://img.shields.io/badge/demo-online-lightgrey) ![Vercel](https://img.shields.io/badge/deploy-vercel-black) ![License](https://img.shields.io/badge/license-ADD--LICENSE-yellow)

GrammarLift is an AI-driven web app that helps English learners improve grammar across CEFR levels (A1–C2). It offers an adaptive placement quiz, real-world writing feedback, and a searchable grammar library.

**Key features**
- **Adaptive placement quiz** for quick level detection.
- **Free-writing feedback** with level-aware corrections and explanations.
- **CEFR-structured library** with practice items and explanations.
- **SEO-friendly Next.js app** using the App Router and server components.

## Live demo

If deployed, include a live demo URL here. To add a screenshot or GIF, place the asset in `public/` and replace the image URL below.

![App screenshot](public/screenshot-placeholder.png)

## Quick start

Requirements: Node.js 18+ (recommended), npm/pnpm/yarn.

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build and start:

```bash
npm run build
npm run start
```

Run linter:

```bash
npm run lint
```

## Usage examples

Open the app and try the placement quiz from the homepage. To add a new page, create a route under `src/app` and export a React component as the default.

Create a simple page example:

```tsx
// src/app/hello/page.tsx
export default function Page() {
	return <h1>Hello from GrammarLift</h1>
}
```

## Project structure

- `src/app` — Next.js routes and layouts (entry: [src/app/page.tsx](src/app/page.tsx#L1-L200), layout: [src/app/layout.tsx](src/app/layout.tsx#L1-L200)).
- `src/components` — Reusable UI: `Navbar`, `AppButton`, `GlassCard`, etc.
- `src/lib` — Static domain data and helpers: `grammar-data.ts`, `quiz-data.ts`, `exercise-data.ts`.

## Tech stack

- Next.js 16 (App Router)
- React 19
- TypeScript

## Analytics & environment

- Google Tag Manager is injected in `src/app/layout.tsx`. Replace the GTM id there for your analytics.
- Store secrets or API keys in environment variables and reference them via `process.env` or Next.js runtime config.

## Contributing & roadmap

Want to help? Suggested small tasks for a hackathon-ready portfolio:

- Add a comprehensive demo GIF and short walkthrough in this README.
- Add unit tests for key data modules in `src/lib`.
- Create CI workflow (GitHub Actions) that runs lint and build on PRs.

If you'd like, I can create a `CONTRIBUTING.md` and a basic GitHub Actions workflow.

## Contact

For questions or collaboration, email grammarlift@gmail.com or open an issue on the repo.

---

If you want, I will:
- add real badges (GitHub Actions, Vercel) and a screenshot,
- create `CONTRIBUTING.md` and `LICENSE`,
- or add a basic CI workflow (lint + build) for the repo.

Tell me which of these you'd like me to do next.
---

If you want, I can now:
- add badges and a short contributor guide,
- or expand the README with code examples for common tasks (adding a page, creating a quiz),
- or open/help create `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`.

Edited by an automated README enhancement step — tell me which of the next steps you'd like me to take.

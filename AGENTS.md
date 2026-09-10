# Unrot D1 Retention — repository guide

## Purpose

This repository curates a product-internship case prototype for improving Unrot's strict calendar-day D1 retention. The immediate hypothesis is that an eligible lesson can lead to a small optional Build Mode artifact worth returning to improve the next day. It is not an official Unrot production feature.

## Source of truth

- `unrot-v4-clean-deploy/index.html`, `styles.css`, `app.js`, and `core.mjs` are the deployable static prototype.
- `core.mjs` contains deterministic product logic; `app.js` renders and coordinates browser state.
- `docs/agent-tasks/current.md` is the required live handoff. Read it before continuing work, including after an `nxt` request.

## Product and architecture boundaries

- Preserve the core lesson → optional guided/challenge route → choose build → configure → test → achievement/proof → tomorrow upgrade flow.
- Keep the prototype small and static. Do not add a backend, database, authentication, live model, analytics vendor, notification provider, marketplace, or other infrastructure unless an existing requirement makes it necessary.
- AI output, reminders, rewards, ranking/leaderboard, and achievement/credential authority are simulated unless an implementation demonstrably changes that fact. Keep user-visible labels truthful. Never claim accredited certification or measured retention outcomes.
- Avoid scope creep and broad rewrites. Make targeted changes only when they improve product fidelity, accessibility, correctness, maintainability, or recruiter readability.

## Quality, security, and documentation

- Never read, print, commit, or hardcode secrets. Keep `.env*` excluded.
- Preserve keyboard access, visible focus, semantic controls, responsive behavior, and reduced-motion support when changing UI.
- Add or update deterministic tests for changed pure logic; run relevant tests, Node syntax checks, and `git diff --check` before claiming work is complete.
- Keep README and product documentation concise, factual, and clear about prototype behavior versus proposed production implementation.

## Git and Vercel guardrails

- Use meaningful commits; never rewrite history, force-push, or delete unrelated user files.
- The only Vercel project for this work is `unrot-build-challenge`. Never create another project.
- Do not deploy casually. Before any deployment, verify local linkage to that project, run checks, and verify the resulting public deployment. Do not change domains, environment variables, deployment protection, or unrelated project settings.

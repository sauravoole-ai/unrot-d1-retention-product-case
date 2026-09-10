# Unrot D1 Retention — live handoff

## Current objective

Prepare the existing validated static Unrot D1 Retention prototype for a credible public repository while preserving its bounded product mechanism and deployed-project linkage.

## Current phase

Slice 3 is blocked before Git initialization and publication.

## Completed work

- Audited the complete workspace structure, static deployment source, ZIP source, safe configuration metadata, and generated/temp-file indicators.
- Confirmed the deployable source is `unrot-v4-clean-deploy/` with `index.html`, `styles.css`, `app.js`, and `core.mjs`; the ZIP contains the same four files.
- Confirmed no existing repository instructions, package manifest, test suite, README, or Git repository are present.
- Confirmed the source folder has local Vercel link metadata (identifiers inspected but not recorded here) for the established `unrot-build-challenge` project.
- Added `AGENTS.md` and this durable handoff.
- Hardened localStorage restoration so a valid-but-incomplete persisted state retains the default builder fields needed by later screens.
- Added visible keyboard focus styling and a reduced-motion override without changing the prototype's visual system or flow.
- Added a minimal Node-standard-library regression test for state restoration.
- Added a root `.gitignore`, Node-standard-library package scripts, a concise recruiter-facing README, and a product-case document.
- Expanded deterministic coverage for quiz scoring, prompt strength, malformed proof handling, and share-link construction.

## Baseline checks

- `node --check unrot-v4-clean-deploy/app.js` — pass.
- `node --check unrot-v4-clean-deploy/core.mjs` — pass.
- Likely-secret filename/content-pattern scan excluding `.env*` and `.vercel/` — no matches reported.
- Generated/temp-file scan — no matches reported.
- `npm.cmd test` — 6 passing tests.
- `npm.cmd run check` — app and core syntax checks plus all 6 tests pass.
- Local static HTTP smoke check — `index.html`, `styles.css`, `app.js`, and `core.mjs` each returned HTTP 200.
- Browser automation is unavailable on this machine (`agent-browser` command not found), so no browser-console or viewport audit was run.

## Audit summary

### Strong already

- Focused static architecture with deterministic pure product helpers in `core.mjs`.
- Clear product flow and bounded Build Mode mechanism.
- Prominent truthfulness labels for simulated model output, reminders, rewards, ranking, and credential authority.
- Existing responsive CSS and semantic baseline (`main`, `nav`, `fieldset`, labels, module script).
- Production project linkage already exists; the current reviewer-facing deployment was verified in the preceding release work.

### Concrete gaps

- No Git repository, remote, branch, commits, or public GitHub repository yet.
- Prototype accessibility, responsive behavior, browser error state, URL-proof handling, share fallback, and state-transition edge cases need further targeted review.
- Metadata and recruiter-facing repository explanation need deliberate improvement in later slices.

## Phased plan

1. **Slice 1 — product + code hardening:** complete. It added a tested localStorage-state normalization boundary and CSS focus/reduced-motion safeguards.
2. **Slice 2 — tests, documentation, and portfolio polish:** complete. It added lightweight deterministic verification, package scripts, root exclusions, README, and product-case documentation.
3. **Slice 3 — GitHub publication:** initialize and curate Git history; inspect GitHub authentication and existing remotes before creating or publishing only the intended repository.
4. **Slice 4 — final release verification:** conduct reviewer-style audit; deploy only if changed code is verified and still linked to `unrot-build-challenge`; verify the public site afterward.

## Exact next slice

Resume Slice 3 after re-authenticating GitHub CLI. Then inspect whether `sauravoole-ai/unrot-d1-retention-product-case` already exists before initializing Git or creating anything.

## Files changed

- `AGENTS.md` — created.
- `docs/agent-tasks/current.md` — created.
- `unrot-v4-clean-deploy/core.mjs` — added `restorePrototypeState`.
- `unrot-v4-clean-deploy/app.js` — restores persisted state through the normalization helper.
- `unrot-v4-clean-deploy/styles.css` — added visible focus and reduced-motion styles.
- `tests/core.test.mjs` — created.
- `.gitignore` — created with secret, Vercel metadata, dependency, and local ZIP exclusions.
- `package.json` — created with dependency-free `test` and `check` scripts.
- `README.md` — created.
- `docs/product-case.md` — created.

## Known risks and blockers

- The workspace is not a Git repository, so there is still no branch, HEAD SHA, remote, or working-tree state yet.
- GitHub CLI is installed, but its active `sauravoole-ai` token is invalid. Required user action: `gh auth login -h github.com`.
- Browser automation is unavailable locally; use source and local HTTP checks until browser tooling is available.
- The project source is a Vercel-linked subdirectory; keep repository documentation outside it unless deployment inclusion is explicitly considered.

## Deployment state

- Existing project: `unrot-build-challenge` (linked from `unrot-v4-clean-deploy/.vercel/project.json`).
- The preceding release work verified the reviewer-facing production URL serves the clean staged deployment. Bootstrap made no Vercel changes or deployment.

## GitHub/repository state

- Git is not initialized in `Unrot_PM`; no remote, branch, HEAD SHA, or commit history exists.
- `gh` version 2.98.0 is installed, but authentication for `sauravoole-ai` failed because the active token is invalid. No intended-repository existence check, repository creation, or push was attempted.

## DO NOT REDO

- Do not extract or overwrite `unrot-v4-clean-deploy` from `unrot-v4-redeploy.zip`; the four source files were previously verified byte-for-byte against it.
- Do not open `.env.local` or other `.env*` files.
- Do not recreate, relink, or deploy a different Vercel project.
- Do not treat simulated prototype functionality as a production backend capability.
- Do not replace the tested state-restoration boundary with shallow localStorage parsing; it prevents incomplete saved builder data from breaking later screens.
- Do not move README, tests, or product documentation into `unrot-v4-clean-deploy/`; the dry-run deployment manifest is intentionally limited to the four application files.

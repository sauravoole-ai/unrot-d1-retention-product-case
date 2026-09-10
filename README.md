# Unrot D1 Retention — Product Case

A working product prototype exploring whether an applied Build Mode and same-artifact Day-1 continuation can improve early retention in Unrot's short-form AI learning experience.

This is an independent product-internship assignment prototype and concept, not an official Unrot production feature.

## Live prototype

https://unrot-build-challenge.vercel.app

## Product problem

The assignment is to improve strict calendar-day D1 retention: the percentage of new users who return on the calendar day after their first session. The stated baseline is 16%; the reference target is 22%.

The product question is not simply how to add rewards. It is whether a user has a useful, bounded artifact they began today and a concrete reason to return tomorrow to improve it.

## Hypothesis and experience

For new users who complete a build-compatible, application-oriented lesson:

1. Complete a short lesson.
2. Optionally take the guided path or Builder Challenge.
3. Configure and try a small applied assistant.
4. Keep a shareable prototype achievement record.
5. Return the next calendar day to improve the same artifact.

Build Mode remains optional and is attached only where a small applied build makes sense; the learning habit stays close to five minutes.

## What the prototype demonstrates

- A lesson-to-build continuation loop.
- Guided and challenge routes with deterministic quiz scoring and builder tiers.
- A configurable assistant with simulated example output.
- Local browser persistence, URL-encoded proof viewing, share-link construction, and replay/reset behavior.
- A next-day upgrade prompt tied to the user's existing artifact.

## What is simulated

The prototype deliberately has no backend. AI/model output, reminders, rewards, leaderboard/ranking, and achievement authority are simulated and labeled in the interface. Browser `localStorage` is prototype persistence, not a production user-data architecture. The achievement record is not an accredited or cryptographically signed credential.

## MVP versus roadmap

The four-week MVP is limited to the applied Build Mode loop for the initial cohort. Rich sharing, challenges, leaderboards, partner rewards, builder profiles, and credential infrastructure are roadmap concepts, not shipping MVP commitments.

## Measurement approach

The primary metric is strict calendar D1 for eligible new users. A production experiment would compare the eligible cohort's return rate against the 16% baseline toward the 22% reference, while monitoring lesson completion, Build Mode adoption, build completion, next-day artifact continuation, and negative signals such as session friction or drop-off.

No retention result, usage result, testimonial, partnership, or revenue impact is claimed by this prototype. See [the product case](docs/product-case.md) for the operating hypothesis, guardrails, and four-week plan.

## Project structure

```text
unrot-v4-clean-deploy/  deployable static prototype
  index.html            document shell and metadata
  styles.css            responsive visual and accessibility styles
  app.js                browser rendering and interaction flow
  core.mjs              deterministic product logic
tests/core.test.mjs     Node standard-library regression checks
docs/product-case.md    concise product and experiment rationale
```

## Local setup and verification

No dependency installation is required. Use Node.js 18 or newer.

```bash
npm test
npm run check
python -m http.server 4173 --directory unrot-v4-clean-deploy
```

Then open `http://127.0.0.1:4173` in a browser.

## Deployment

The existing Vercel project is `unrot-build-challenge`. Deployment is intentionally guarded: only verified changes may be deployed to that existing project, and this repository does not create another Vercel project.

## Limitations

This prototype demonstrates a product mechanism; it does not establish a causal D1 improvement. A production implementation would need authenticated user identity, persistence, eligibility instrumentation, experiment assignment, consent-aware notification handling, and measurement validation.

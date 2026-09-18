# Unrot D1 Retention — Product Case

A working product prototype exploring whether an applied Build Mode and same-artifact Day-1 continuation can improve early retention in Unrot's short-form AI learning experience.

This is an independent portfolio case based on a time-boxed product-management exercise. It is not an official Unrot production feature and is not affiliated with or endorsed by Unrot or Build Fast With AI.

## Live prototype

https://unrot-build-challenge.vercel.app

## Product problem

The product question is whether a learner has a useful, bounded artifact they began today and a concrete reason to return the next calendar day to improve it.

The case focuses on early next-day retention without publishing private hiring-assignment metrics or internal business constraints.

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

The MVP is limited to the applied Build Mode loop for an initial cohort within a short delivery window. Rich sharing, challenges, leaderboards, partner rewards, builder profiles, and credential infrastructure are roadmap concepts, not shipping MVP commitments.

## Measurement approach

The primary metric is strict calendar-day D1 for eligible new users. A production experiment would compare an eligible treatment cohort with an appropriate control while monitoring lesson completion, Build Mode adoption, build completion, next-day artifact continuation, and negative signals such as session friction or drop-off.

No retention result, usage result, testimonial, partnership, or revenue impact is claimed by this prototype. See [the product case](docs/product-case.md) for the operating hypothesis, guardrails, and delivery approach.

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

The prototype is deployed on Vercel. This repository contains the verified static source used for the public demonstration.

## Limitations

This prototype demonstrates a product mechanism; it does not establish a causal D1 improvement. A production implementation would need authenticated user identity, persistence, eligibility instrumentation, experiment assignment, consent-aware notification handling, and measurement validation.

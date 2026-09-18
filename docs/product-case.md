# Product case: applied artifact continuation for D1

## Decision

Test a narrow Build Mode continuation loop rather than a broad rewards or social system. The proposed mechanism is: eligible lesson completion → small applied build → user keeps the artifact → return the next calendar day → improve that artifact.

## Target cohort and assumptions

Start with new users completing build-compatible, application-oriented lessons. The proposed experience must remain optional, bounded, and compatible with Unrot's short-form learning habit. Assume a small cross-functional team and a short delivery window rather than publishing private hiring-assignment metrics or internal resource constraints.

Before shipping, diagnose the real funnel: eligible lesson completion, Build Mode entry, configuration completion, first useful output, proof creation, reminder-intent selection, and next-calendar-day return. Segment by lesson, route, and acquisition source; do not infer a cause from aggregate retention alone.

## MVP and non-goals

**MVP:** entry after eligible lessons, a guided or challenge route, one small assistant configuration, an explicit simulated output, an artifact/proof, and a next-day improvement prompt.

**Not MVP:** live model calls, real reminders, rewards, leaderboard scoring, partner offers, public profiles, credentialing, a backend, authentication, or a marketplace.

## Experiment design

Randomize eligible new users between the existing lesson-completion experience and the optional Build Mode invitation. The primary metric is strict calendar-day D1: a user returns on the calendar day after their first session. Use an agreed timezone definition before analysis.

Supporting metrics: eligibility rate, invitation acceptance, build completion, proof creation, next-day artifact continuation, and time to completion. Guardrails: lesson completion, first-session duration, error rate, and abandonment before lesson completion.

## Decision rules

Advance only if the treatment shows a practically meaningful D1 improvement with no material guardrail regression and enough sample for the team's pre-agreed confidence threshold. Pause or redesign if Build Mode increases friction, users do not perceive artifact value, or the return prompt produces no next-day continuation signal. Do not declare success from prototype usage or qualitative anecdotes alone.

## Delivery approach

| Phase | Focus | Output |
| --- | --- | --- |
| 1 | Instrument funnel and validate eligible lessons | event plan, cohort definition, prototype review |
| 2 | Build the bounded experience and QA flows | controlled MVP behind an experiment flag |
| 3 | Run experiment and monitor guardrails | quality review, no premature readout |
| 4 | Analyze D1 and continuation evidence | decision: iterate, scale, or stop |

## Prototype boundary

The local prototype uses browser `localStorage` and deterministic simulated content to communicate the product flow. Production persistence, notifications, rankings, credentials, and analytics would require separate technical and policy design.

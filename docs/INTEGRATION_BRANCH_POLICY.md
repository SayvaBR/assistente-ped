# Android 1.0 Integration Branch Policy

## Purpose

`integration/android-1.0` is the temporary integration trunk for the Android 1.0 milestone.

It exists to stop new work from accumulating on historical PR stacks and to provide one healthy parent for small feature branches.

## Authority

For Git workflow during Android 1.0, this document supersedes older instructions that required continuing development directly on historical branches such as `codex/1-import-baseline`, `codex/design-identity-v2` or `codex/5-v2-clean-room`.

Product/security/privacy/design authorities remain unchanged.

## Rules

1. Do not develop directly on `main`.
2. Do not start new product work from historical PR branches.
3. New feature/fix branches start from the latest `integration/android-1.0`.
4. New PRs target `integration/android-1.0` and should be small enough to review independently.
5. Shared/high-conflict files have one owner per active round.
6. A visual PR includes inspectable screenshots for meaningful visual changes.
7. CI/checks appropriate to risk must be green before merge into integration.
8. No automatic merge into `main`.
9. Periodically, validated integration is proposed to `main` through a dedicated consolidation/release PR.
10. Historical PRs remain references only after the migration checkpoint; do not continue adding features to them.

## Branch naming

Preferred examples:

- `feat/onboarding-v2`
- `feat/billing-hardening`
- `feat/files-v2`
- `fix/planning-next-lesson`
- `fix/android-safe-area`
- `qa/poco-release-candidate`

## Check cadence

During micro-iterations:

- Vite/HMR;
- targeted tests;
- `pnpm run check:fast` when applicable.

At candidate/PR checkpoint:

- `pnpm run check:candidate` when applicable;
- relevant unit/E2E suites;
- build;
- screenshots for UI;
- Android validation according to risk.

At integration -> main checkpoint:

- full V2 validation;
- Android sync/build/APK QA;
- critical end-to-end journeys;
- billing/entitlement checks when touched;
- privacy/security/data integrity review;
- current migration/release notes.

## Current migration

`integration/android-1.0` was created from the current V2 development head so no implemented product work is discarded.

Before treating it as merge-ready to `main`, reconcile the two commits by which `main` has diverged, resolve conflicts deliberately, run CI on the exact reconciled head and update the integration PR with the results.

Until that reconciliation is completed, the integration branch is the new development parent but not a release candidate.

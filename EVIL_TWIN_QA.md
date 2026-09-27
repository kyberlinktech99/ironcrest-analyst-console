# Evil Twin experience redesign — QA

Validated 2026-09-27 in the Codex browser against the local development build.

## Scope and recovery

- Development base: evil-twin-experience-development at 32839412d33916a30f0548eb06881b521abf0612 (evil2 remains recoverable in history).
- Preview base: v2.1-development at 8d3ad86877a74793076caf66fda64b94e8261dcf.
- Deployment files: preview-evil-twin/index.html, preview-evil-twin/js/app.js, preview-evil-twin/css/mission.css only.
- Case engine after intelContent and case markup are unchanged. js/cases.js and css/ironcrest.css are unchanged.
- main, root site, preview-v3 and preview-attack are outside deployment scope.

## Checks passed

- JavaScript syntax validation for app.js and cases.js.
- Seven-stage progression with required checkpoints and contextual actions.
- Incorrect baseline answer blocks progression; correct answer unlocks it.
- All three network choices produce contextual feedback. Approved selection is accepted; the fixed fictional scenario explicitly follows the near-match connection afterward.
- Portal fields are read-only; submission is simulated locally without a network request. Exposure checkpoint remains disabled before submission.
- Overclaims about exposure, portal submission and login causation block progression.
- SOC source filter returns three identity records; LOGIN_SUCCESS search returns one. Empty search gives clear feedback; clearing restores eight records.
- Replay has no employee or attacker DOM. Both attack classification and evidence-gap check are required. An incorrect replacement answer re-locks the handoff.
- Successful handoff opens U1-002 Signal Lost; accepting loads 26 records and six evidence cards.
- Restart returns to step one and restores gates.
- Browser visual inspection across all stages, at desktop (1366px) and phone (390px) widths. No document horizontal overflow in tested layouts; terminal table scrolls within its container on narrow screens.
- Instructional task text is 20px; terminal data is 14px; body text is 16px. Persistent desktop Mission Control and compact mobile task strip.
- No browser JavaScript warnings or errors recorded during the walkthrough.

## Implementation notes

The exercise is an in-memory guided simulation; reload restarts it. Existing investigation local-storage behavior is unchanged. Fictional telemetry uses reserved example domains and documentation addresses. No wireless commands or operational attack tooling are included.

Browser interaction was verified with keyboard activation because viewport emulation made pointer targeting unreliable in the test browser. This is not a cross-browser certification.

# Ironcrest Study Center — Unit 1

## Files
- `study/index.html` — student-facing study center UI and review/print tools.
- `study/unit1-data.js` — the curriculum content and original practice question bank.

## Content model
`window.IRONCREST_STUDY_DATA.topics` contains one record per College Board Unit 1 topic (1.1–1.5):
- `id`, `title`, `status` (ready or foundation)
- `cisco` — relevant Cisco lesson/module mapping; do not invent a module number
- `objectives` — [official learning objective ID, official objective wording, student-friendly explanation]
- `vocab` — [term, definition]
- `flash` — [question, answer]
- `questions` — original practice questions as {q, a: [four options], c: correct zero-based index, e: explanation}

`actorVocab` and `actorQuestions` hold the Cisco Topic 1.3 Adversaries quiz supplement, which is not identical to the full AP 1.3 scope.

## Update workflow
1. Verify College Board objective/essential-knowledge language against the 2026 CED.
2. Check Cisco lesson and scope-and-sequence mapping separately.
3. Update only the relevant record in `unit1-data.js`. Add original practice questions; never add live graded quiz questions or teacher-only answer keys.
4. Change `status` from `foundation` to `ready` only after content and classroom coverage have been reviewed.
5. Test reference, flashcards, practice answer feedback, Build My Review, shareable links and Print → Save as PDF.
6. Update the query-string version on `unit1-data.js` in `index.html` after content changes to prevent stale Chromebook caches.

## Student review links
- Entire Unit 1: `/study/?topics=1.1,1.2,1.3,1.4,1.5#builder`
- Topics 1.3 + 1.4: `/study/?topics=1.3,1.4#builder`
- Cisco threat actors: `/study/?topics=1.3&actors=1#builder`

Browser Print → Save as PDF generates the export locally. No student account or backend is required. Progress is not synchronized between devices.

## Source basis
- 2026 College Board AP Cybersecurity CED, Unit 1 (1.1–1.5)
- Cisco AP Cybersecurity 1.0 Scope and Sequence, Unit 1 lesson-plan mapping
- Cisco Topic 1.1–1.3 lesson plans; Cisco threat-actor quiz reviewed for supplement alignment

This page is in the `v2.1-development` branch. Confirm GitHub Pages deployment and school-network access before relying on it as the sole student resource.

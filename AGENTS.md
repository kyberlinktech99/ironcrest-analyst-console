# Ironcrest development conventions

- Use `window.IRONCREST_CONFIG.teams` for every current and future case: Team Alpha, Team Bravo, Team Charlie. Do not introduce case-specific team labels. Preserve student work when migrating saved labels.
- Render AP Lens screens through `IRONCREST_LEARNING.lens`; retain the common concept heading, curriculum objective mapping, Observed / Supports / Does Not Prove / Need / Protection cards, and terminology reference.
- Verify curriculum mappings against official provider sources. Label enrichment matches as editorial topic matches, not official equivalencies. Never invent authenticated lesson URLs.
- Keep enrichment after final FRQ recording. Retain the existing draft and teacher-review workflow.
- Keep releases in the development branches and `/preview-evil-twin/` unless the user expands scope. Do not alter production or other previews.

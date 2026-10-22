# Shopify theme publication status

Current two-theme workflow, explicitly requested on 2026-10-21 and verified on 2026-10-22:
- `codex-edits`, ID `189489545329`: currently MAIN.
- `codex-edits2`, ID `189518545009`: currently UNPUBLISHED; formerly named codex-catalogue-navigation.
- Use these two existing themes only. Do not create or duplicate more themes.
- Keep the same authorised code changes queued for both. Query roles before each deployment because the merchant switches which theme is published. Apply changes to the unpublished target, then catch up the other target once it becomes unpublished. Do not publish or switch roles automatically.
- Connector safety blocks live theme file writes. Do not claim the live target is synced when it is deferred. A role switch alone does not run an automatic background sync; re-check and sync during active work.
- After the merchant's latest role switch, the three pending compact-navigation files were applied to unpublished codex-edits2. API read-back on 2026-10-22 confirms all thirteen combined UX/catalogue batch files are byte-identical across both themes; no batch files remain pending. See docs/THEME_SYNC_STATE.json and docs/COMPACT_NAVIGATION.md. Preserve merchant settings and newer remote edits when reconciling changes.

Historical publication on 2026-10-20 through Shopify Admin:
- Then-LIVE theme: `codex-sample-sections`, ID `189504290929`.
- Previous theme retained UNPUBLISHED: `codex-edits`, ID `189489545329`.
- Store: `3djevx-mu.myshopify.com`.

The two-theme workflow above supersedes the earlier instruction to edit codex-catalogue-navigation only. Theme IDs are authoritative; names and roles can change. All other themes are out of scope.

The sample catalogue and policy/shipping limitations documented in docs/ORDERING_POLISH.md remain. Publication does not resolve them. `_backup_original` remains untouched.

CLI targets: environments codex-edits and codex-edits2. The older catalogue alias points to codex-edits2's same ID; prefer the explicit new alias.

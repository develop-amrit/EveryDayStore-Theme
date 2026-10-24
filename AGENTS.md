# EverydayStore theme workflow

Target: everydayyplus-8ksmkrmq.myshopify.com. Source of truth: private GitHub develop-amrit/EveryDayStore-Theme. Connected main deploys immediately to live theme 191136825619.

- Pull main before new work; work on a feature/fix branch. Never commit or push to main, force-push, merge, publish or switch theme roles. Push the review branch and open a PR; the owner merges.
- Theme changes go through GitHub. Do not edit the connected live theme through CLI, Admin code editor or theme editor. Shopify editor saves are committed back to main.
- Use shopify theme dev with the explicit new-store domain and storefront password only for the authorized development preview. Never target 191136825619 or use --allow-live.
- Old store 3djevx-mu.myshopify.com and all its themes are read-only references. Never deploy or mutate data there.
- Store-data writes require the existing Shopify connection to the new store, a dry-run report, and the owner's exact approve reply. Stop a refused-permission step; never obtain or route around it with another token.
- Reports, exported data, QA artifacts and changes.log stay outside the repo in ../ep-reports/. Never commit credentials. Do not change prices, inventory, product titles, descriptions or tags.

# Department routing correction

Store: everydayyplus-8ksmkrmq.myshopify.com
Theme: EveryDayStore-Theme/main, 191136825619 (GitHub-connected main)

The previous visibility fix pointed every department at `all` because the new
store had no migrated collections. That populated the page but repeated the same
catalogue under unrelated department headings. The source also mislabeled five
children's diaper/bed-mat products as adult hygiene or hair-removal products.

The correction restores the original department handles and links while retaining
the sold-out catalogue display setting. A pinned local migration assigns
`catalogue:<handle>` tags to each product's actual leaf and ancestors, creates
25 automated category collections, and publishes those collections to Online
Store. The two chocolate products are also classified under Gifting. The
`everyday-catalogue` menu is owned by this migration; the merchant's main menu is
preserved.

Source classification: 477 Baby products, 9 Grocery products; Gifting overlaps
with the 2 chocolates. Draft products stay draft. Empty departments retain neutral
empty imagery or hide their product rails; they never borrow another department's
products. A one-product category can display its rail. Sibling-category and
unfiltered vendor-image fallbacks are removed. Old-store product picker handles
are cleared or replaced with matching current-store handles.

Local migration and snapshots:
`C:/Users/Amrit Gupta/amazon_ae_scraper/organise_catalogue.py` and
`catalogue_organisation/` (plan, before/after, checkpoint, membership verification).
The script is pinned to this store, checkpoints mutations, and never writes
product status, publication, price, inventory, or images.

Validation: generated Admin GraphQL passed schema validation against 2026-07;
14 local Liquid/controller integration checks passed, including category isolation,
empty-category behavior, vendor image isolation, disabled sold-out buttons, and
preserved stock filters. Official Theme Check: 0 errors, 15 existing warnings.
The bundled Liquid validator cannot start because its theme-check dependency is
missing; official Theme Check is the executable verification.

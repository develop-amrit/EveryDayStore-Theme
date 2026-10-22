# Dubai delivery zones and checkout validation spec

## Format and authority

Theme setting qc_zones is a JSON array: [{"id":"dubai-marina","label":"Dubai Marina","city":"Dubai","country":"AE","active":true}]. This is a merchant-confirmed service list, not a geocoder. Empty [] means no confirmed list. Header area preference lives on the device; checkout address remains authoritative. Do not equate an emirate-wide rate named Dubai with enforcement for selected neighbourhoods. UAE postal codes are not a reliable neighbourhood boundary.

Backend zone config extends each record with allow-listed address rules or approved geographic polygons, normalization aliases, policy version and active dates. Geocoding/address validation belongs in an approved app/backend; the theme contains no geocoding credentials. Do not block supported addresses using invented mandatory Dubai postal codes.

## Function/app specification (not generated/deployed)

1. Read actual shipping destination from the supported cart/checkout validation input: country must be AE, city/emirate Dubai, then validated service zone. Browser delivery_zone is only a hint.
2. Normalize case/spacing and documented aliases. Reject unsupported/ambiguous addresses with a clear address error; allow correction. A delivery customization can hide ineligible delivery methods, but validation must cover paths with no applicable rate and accelerated checkouts.
3. Validate signed reservation if a preferred slot is selected or booking is mandatory; match address zone, date, cart fingerprint, policy version and valid expiry. Reject mock, forged, expired or full/invalid leases.
4. Require the published terms version and accepted flag through the app's supported consent UI/validation mechanism. Never trust a theme-only disabled button.
5. A Function has no general-purpose network access. Choose a compatible public app on Basic; a merchant-specific custom Function requires Plus. Checkout UI extensions at the information/shipping/payment steps also require Plus. Read-only customer-account extensions have separate target eligibility.
6. Test guest/accounts, accelerated checkout, changed addresses/cart contents, COD, gateway retries, no rates, slot expiry, and simultaneous booking. Log decision IDs without storing unnecessary full addresses in logs.

## Admin

Settings > Shipping and delivery > Delivery profiles: keep one Dubai fulfilment location, restrict delivery services using the actual supported zone/rate/app mechanism, remove unintended international/general rates from every applicable profile. Configure all location/profile products, including mixed carts. A UAE country zone alone does NOT enforce Dubai-only delivery. A compatible public validation/local-delivery app is needed for neighbourhood rules on the current non-Plus store.


# Privacy and policy handoff

Theme consent UI calls Shopify.loadFeatures with consent-tracking-api version 0.2 and uses Shopify.customerPrivacy.currentVisitorConsent(), shouldShowBanner() and setTrackingConsent(). It does not simulate consent with localStorage. Accept, reject and manage set analytics/marketing/preferences/sale_of_data categories. No optional scripts are started by this theme. An API failure is shown rather than claiming a choice was recorded. Existing Shopify platform scripts in content_for_header remain platform managed; third-party apps must independently respect Customer Privacy API permissions. The legacy custom StandardEvents pageview module was removed from layout/theme.liquid; no new tracking was added.

Settings > Customer privacy: configure regions and use ONE banner mechanism to avoid competing Shopify/app/theme banners. Test consent in each configured region. Footer Manage cookies reopens the custom preferences dialog. Optional recently-viewed/preference storage should follow the customer's preferences decision; cart storage required to fulfil a purchase is separate. No order identifiers, contact data, chat, OTP or private evidence is written to localStorage.

Create policy Page records and assign page.privacy-policy, page.terms-conditions, page.refund-policy, page.shipping-policy for working draft previews. They are visibly FINAL WORDING REQUIRED, not legal advice or final policies. Before launch, publish approved wording under Settings > Policies; footer/cart link to Shopify's policy URLs when present and only fall back to draft pages otherwise. Configure the theme Terms version after final publication. Policies, cookies, gateway disclosures, VAT and support/notification consent need merchant/legal confirmation.

Customer Privacy API source checked 2026-10-20: https://shopify.dev/docs/api/customer-privacy . No browser/API consent flow could be exercised here because a Shopify preview was unavailable.


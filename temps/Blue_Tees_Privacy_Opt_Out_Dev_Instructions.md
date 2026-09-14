# Blue Tees Golf — Privacy Opt-Out & Pixel Compliance Implementation Brief

## Objective
Implement a working **Do Not Sell or Share My Personal Information** opt-out on the Blue Tees Golf Shopify storefront and ensure the preference is respected by all advertising, analytics, attribution, and custom tracking technologies.

The opt-out must do more than change the page UI. It must actually change the visitor's privacy state and prevent or restrict data sharing where required.

---

## 1. Source of Truth
Use **Shopify Customer Privacy API** as the storefront source of truth for privacy preferences.

The opt-out button should set:

```javascript
window.Shopify.customerPrivacy.setTrackingConsent(
  { sale_of_data: false },
  function () {
    // Display success state
  }
);
```

After the action succeeds, replace the button with a clear confirmation:

**✓ You’re opted out**

Supporting text:

> Your privacy preference has been saved. We will not sell or share your personal information for cross-context behavioral advertising.

Do not require the visitor to:
- Log in
- Enter an email address
- Submit a form
- Contact customer support

---

## 2. Keep These Privacy Actions Separate

### A. Do Not Sell or Share
Button:
**OPT OUT OF SALE OR SHARING**

Behavior:
- Immediately set `sale_of_data: false`
- Display successful confirmation
- Ensure applicable advertising/data-sharing integrations respect this setting

### B. Manage Cookie & Advertising Preferences
Button:
**MANAGE COOKIE PREFERENCES**

Behavior:
- Open the existing cookie/consent preference manager
- Allow visitors to control applicable analytics, marketing, and other optional cookie categories

### C. Other Privacy Requests
Access, correction, account deletion, or data deletion requests should remain a separate privacy-request process and should not be combined with the cookie manager.

---

## 3. Pixel / Tracking Audit
Audit every technology that can transmit visitor or customer data.

At minimum review:

- Meta Pixel
- Meta Conversions API / server-side events
- Google Ads
- GA4
- Google Tag Manager
- TikTok Pixel
- Triple Whale
- Shopify Audiences
- Klaviyo
- Shopify App Pixels
- Shopify Custom Pixels
- Any attribution platforms
- Any affiliate tracking
- Any session-recording or behavioral analytics tools
- Any scripts installed directly in `theme.liquid`
- Any scripts injected by Shopify apps

For every integration, document:

1. Where it is installed
2. Whether Shopify controls it automatically
3. What data it sends
4. Whether it is used for analytics, marketing, sale/sharing, or multiple purposes
5. What happens when `saleOfDataAllowed()` returns `false`
6. What happens when marketing consent is denied
7. What happens when analytics consent is denied

---

## 4. Shopify Pixel Privacy Configuration
Where possible, move tracking into Shopify's **Web Pixels / Customer Events framework** rather than loading advertising scripts directly in theme code.

For app/custom pixels that involve sale or sharing, configure the appropriate Shopify privacy requirements.

Example configuration:

```toml
[customer_privacy]
analytics = true
marketing = true
preferences = false
sale_of_data = "enabled"
```

Pixels categorized as sale/sharing must not transmit prohibited behavioral-advertising data after the visitor opts out.

---

## 5. Custom Script Requirements
Any custom tracking code outside Shopify's native privacy controls must explicitly check the current privacy state before transmitting applicable data.

Example:

```javascript
if (window.Shopify.customerPrivacy.saleOfDataAllowed()) {
  // Behavioral advertising / applicable third-party data sharing
}
```

Also respect the corresponding Shopify consent states for marketing and analytics when applicable.

Do **not** use a single blanket “disable all tracking” rule unless technically required. Analytics, marketing consent, and sale/sharing are separate privacy states and should be handled appropriately.

---

## 6. Consent Changes Must Apply Without Refresh
Listen for privacy preference changes so tracking behavior updates immediately when the visitor opts out.

Use Shopify's customer privacy consent-change event / `visitorConsentCollected` functionality where applicable.

Expected behavior:

1. Visitor lands on site
2. Applicable pixels operate according to current privacy state
3. Visitor clicks **Opt Out of Sale or Sharing**
4. Shopify privacy state changes
5. Applicable sale/sharing tracking stops or moves into the required restricted mode
6. No page refresh is required

---

## 7. Global Privacy Control (GPC)
Confirm Shopify Customer Privacy settings are configured so qualifying **Global Privacy Control** signals are honored in applicable regions.

QA must include testing with GPC enabled.

A visitor with a recognized GPC signal should receive the appropriate sale/sharing opt-out treatment without needing to click the page button.

---

## 8. Special Attention: Server-Side Tracking
Do not limit this audit to browser pixels.

Review server-side data flows including:

- Meta CAPI
- Server-side Google events
- Triple Whale server-side attribution
- Shopify/app server events
- Any webhook or backend event forwarding containing customer identifiers

A browser-side opt-out is not sufficient if the same event continues being transmitted server-side for a prohibited purpose.

Each server-side integration must either:
- Receive the Shopify privacy state and suppress applicable events, or
- Use the platform's compliant restricted/limited-data-processing mode where appropriate

---

## 9. Avoid Duplicate or Uncontrolled Pixels
Identify and remove duplicate implementations.

Common examples:
- Meta installed through Shopify **and** GTM
- GA4 installed through Shopify **and** hard-coded theme script
- TikTok app pixel plus manual pixel
- Attribution apps plus custom duplicate events

There should be one clearly documented implementation path for each platform wherever possible.

---

## 10. QA / Acceptance Criteria

The work is not complete until the team verifies actual network behavior.

### Test 1 — Default State
Verify:
- Current consent state is readable
- Pixels fire only as permitted for the visitor/region

### Test 2 — Manual Sale/Sharing Opt-Out
Click:

**OPT OUT OF SALE OR SHARING**

Verify:
- `sale_of_data` becomes `false`
- Success message appears
- Preference persists appropriately
- Applicable sale/sharing data transmission stops or switches to the required restricted mode

### Test 3 — Network Inspection
Using Chrome DevTools / Network tab, verify behavior for:
- Meta
- Google
- TikTok
- Triple Whale
- Any additional advertising endpoints

Do not rely solely on the visual confirmation message.

### Test 4 — Page Navigation
After opting out:
- Navigate to another page
- Reload the site
- Confirm the preference remains respected

### Test 5 — GPC
Enable Global Privacy Control and verify the site honors the signal.

### Test 6 — Cookie Manager
Confirm that the separate **Manage Cookie Preferences** experience still works and does not overwrite the Do Not Sell/Share preference incorrectly.

### Test 7 — Logged-In vs. Logged-Out
Test:
- Anonymous visitor
- Logged-in customer

Ensure privacy behavior is appropriate in both cases.

### Test 8 — Mobile
Repeat the opt-out flow on mobile browsers.

---

## 11. Required Developer Deliverable
Before marking this ticket complete, provide:

1. List of every pixel/tracking integration currently installed
2. Installation location for each
3. Privacy classification for each
4. Explanation of how each respects Shopify consent
5. Screenshots or screen recording showing the opt-out functioning
6. Network-level QA demonstrating applicable data is no longer transmitted after opt-out
7. Confirmation that GPC was tested
8. List of any integrations that cannot technically respect the Shopify privacy state and need replacement, configuration changes, or legal review

---

## Definition of Done
This project is complete when:

- The Blue Tees privacy page has a functional one-click **Do Not Sell or Share** action
- Shopify records `sale_of_data: false`
- The visitor receives an immediate confirmation
- Shopify-managed pixels are configured with the proper privacy requirements
- Custom and theme-level scripts respect Shopify privacy states
- Server-side integrations are included in the audit
- GPC is honored where applicable
- The cookie manager remains a separate control
- Network testing verifies that the opt-out changes actual tracking/data-sharing behavior

**Do not consider the project complete simply because the button visually changes state.**

# Accessibility Issues Summary

## Issue 1: Cookies Screen
**Description:** Checkbox is announced as "blank" by screen readers: During testing, the "Analytics and Statistics" checkbox was intermittently announced as "blank" by screen readers instead of consistently exposing its accessible name, role, and state. This inconsistent behavior may prevent screen reader users from reliably identifying the purpose of the checkbox or understanding its current state.

Because the control is not announced consistently, users may be uncertain whether the checkbox has received focus or what option they are interacting with, making it more difficult to review and configure cookie preferences.

**Recommendation:** Ensure the checkbox consistently exposes its accessible name, role, and state to assistive technologies whenever it receives focus. Verify that:

Focus is always placed on the native checkbox control rather than any decorative or non-semantic elements.
The accessible name is consistently associated with the checkbox and remains available after dynamic updates.
Custom JavaScript or styling does not interfere with the accessibility tree or the announcement of the control.
The checkbox is tested across supported browsers and screen readers to confirm it is consistently announced as "Analytics and Statistics, checkbox, checked/not checked" (or equivalent).

---

## Issue 2: Cookies Screen
**Description:** Missing heading mark-up: The 'Choose Type of Cookies You Accept Using' text constitute as heading but not marke as such.

**Recommendation:** Use a heading tag <h2> for the mentioned text.

Example code:
<h2 id="cookie_settings_header" class="g8ou8RWNXT5RO4rxjjWc cookie-settings-header isense-cookie-settings-header" style="width: 100%; text-align: left;">Choose Type of Cookies You Accept Using</h2>

Resources:
Organizing a page using headings:
https://www.w3.org/WAI/WCAG21/Techniques/general/G141

---

## Issue 3: Cookies Screen
**Description:** Insufficient color contrast for non-text content: The contrast ratio between the foreground color of the checkbox with its background color is less than 3:1.

 Foreground colour: #272D3D
 Background colour: #000000
 Contrast ratio: 1.5:1

**Recommendation:** Ensure that the contrast ratio between the element and its background is of at least 3.0:1. 

Resources:
Non-text contrast:
https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html

Contrast (Minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

Color contrast analyser:
https://www.tpgi.com/color-contrast-checker/

---

## Issue 4: Header
**Description:** Insufficient color contrast for text: The contrast ratio between the foreground color of the gray text with its background color is below the required 4.5:1 ratio.

 Foreground colour:#646975
 Background colour: #000000
 Contrast ratio: 3.8:1

**Recommendation:** Make sure that the contrast ratio between the element and its background is of at least 4.5:1.

For color compliant options:
https://contrast-finder.tanaguru.com/
http://colorsafe.co/

Resources:
Understanding contrast (minimum):
https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html

Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text):
https://www.w3.org/TR/WCAG20-TECHS/G18.html

Contrast (minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

---

## Issue 5: Header
**Description:** Homepage logo link does not provide a descriptive accessible name: The website logo in the header functions as a link to the homepage; however, its accessible name is exposed only as "Blue Tees Logo". The accessible name does not communicate the link's purpose or destination, making it less clear to screen reader users that activating the logo will navigate to the homepage.

Providing only the logo name may require users to infer the link's purpose, whereas a more descriptive accessible name clearly conveys the navigation target.

**Recommendation:** Provide an accessible name that identifies both the brand and the destination of the link. For example:

aria-label="Blue Tees logo Home"
aria-label="Blue Tees logo Homepage"

Ensure the accessible name accurately describes the purpose of the link and is consistently exposed to assistive technologies.

Example code:
<a href="/">
        <picture>
          <source srcset="https://cdn.shopify.com/s/files/1/0057/8958/1381/files/bluetees-logo-full-new.svg?v=1767964501" media="(min-width:992px)">
          <source srcset="https://cdn.shopify.com/s/files/1/0057/8958/1381/files/bluetees-logo-full-new.svg?v=1767964501" media="(max-width:991px)">
          <img src="https://cdn.shopify.com/s/files/1/0057/8958/1381/files/bluetees-logo-full-new.svg?v=1767964501" alt="Blue Tees logo Homepage" height="100%" width="100%">
        </picture>
      </a>

---

## Issue 6: Header
**Description:** Expandable navigation menu does not communicate its expanded or collapsed state to assistive technologies: The "PRODUCTS", "APPS" and "COMMUNITY" navigation item expands a mega menu when it receives keyboard focus or pointer hover. However, the interactive control that triggers this behavior does not expose its expandable nature or current state programmatically.

Keyboard users can tab to the navigation item and the submenu expands automatically, but screen reader users are not informed that:

the control has expandable content,
the submenu has been expanded,
the submenu can be interacted with, or
focus has caused a change in page content.
Expanded section does not gets collapse and focus does not go back to triggering element when try to close using esc key

Additionally, the same navigation item appears to serve dual functionality—it behaves as a navigation link while also acting as a disclosure control that expands a mega menu. Because these two functions are combined into a single control without appropriate semantics, users of assistive technologies may not understand whether activating the element will navigate to another page or reveal additional navigation options.

As a result, screen reader users may only hear  "PRODUCTS", "APPS" and "COMMUNITY", link" even though focusing the control automatically expands a large submenu. Since no programmatic state (such as expanded/collapsed) is conveyed, users may remain unaware that new content has become available, leading to confusion, missed navigation options, and an inconsistent experience compared to sighted users.

**Recommendation:** Implement the menu trigger as an accessible disclosure/menu button pattern.

If the primary purpose is to expand or collapse the mega menu, use a button element instead of a link.
If both navigation and menu expansion are required, separate these into two distinct controls (e.g., one link for navigation and one button for expanding/collapsing the submenu).
Ensure the expandable control exposes:
aria-expanded="false" when collapsed.
aria-expanded="true" when expanded.
aria-haspopup="menu" (or another appropriate value based on the submenu implementation).
aria-controls referencing the submenu container.
Update the aria-expanded value dynamically whenever the submenu opens or closes.
Activating Esc key should close expanded section and make sure focus go back to triggering element when activating Esc key
If the submenu opens automatically on keyboard focus, ensure assistive technologies are notified of the state change through the updated ARIA attributes and maintain a logical keyboard interaction model.
Follow the WAI-ARIA Disclosure or Menubar Authoring Practices so that both keyboard and screen reader users receive equivalent information and interaction.

---

## Issue 7: Header
**Description:** Insufficient color contrast for text: The contrast ratio between the foreground color of the gray text with its background color is below the required 4.5:1 ratio.

 Foreground colour: #BABABA
 Background colour: #FFFFFF
 Contrast ratio: 1.9:1

**Recommendation:** Make sure that the contrast ratio between the element and its background is of at least 4.5:1.

For color compliant options:
https://contrast-finder.tanaguru.com/
http://colorsafe.co/

Resources:
Understanding contrast (minimum):
https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html

Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text):
https://www.w3.org/TR/WCAG20-TECHS/G18.html

Contrast (minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

---

## Issue 8: Header
**Description:** Missing heading mark-up: The below mentioned text are constitute as heading but not marke as such.
- RANGEFINDERS
- GPS SPEAKERS
- ACCESSORIES
- Handhelds & Wearables
- LAUNCH MONITORS
- EXTRAS

**Recommendation:** Use a heading tag <h2> for the mentioned text.

Example code:
<h2 class="site_megaMenu_title mega-title-wrapper" bis_skin_checked="1">
                          <a href="/collections/rangefinders" data-img="https://cdn.shopify.com/s/files/1/0057/8958/1381/files/Rangefinders_hover_state.png?v=1771475917" class="site_megaMenu__item site_megaMenu__Title mega-title-link hover_enable--item" bis_skin_checked="1">
                            RANGEFINDERS
                          </a>
                          <span class="dropdown_opener mega-toggle" data-toggle-dropdown="">
                            <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                             (...)
                            </svg>
                          </span>
                        </h2>
(..)
<h2 class="site_megaMenu_title mega-title-wrapper" bis_skin_checked="1">
                          <a href="/collections/extras" class="site_megaMenu__item site_megaMenu__Title mega-title-link hover_enable--item" data-img="https://cdn.shopify.com/s/files/1/0057/8958/1381/files/Extras_hover_state_US.png?v=1772169732" bis_skin_checked="1">EXTRAS</a>
                          <span class="dropdown_opener mega-toggle" data-toggle-dropdown="">
                            <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                             (...)
                            </svg>
                          </span>
                        </h2>

Resources:
Organizing a page using headings:
https://www.w3.org/WAI/WCAG21/Techniques/general/G141

---

## Issue 9: Header
**Description:** Category headings are not marked up as headings and related items are not structured as lists: The mega menu contains category labels such as RANGEFINDERS, GPS SPEAKERS, ACCESSORIES, Handhelds & Wearables, LAUNCH MONITORS, and EXTRAS, which visually function as section headings for groups of related navigation links. However, these labels are implemented as standard links rather than semantic headings. Additionally, the related product links beneath each category are not grouped using semantic list markup.

As a result, screen reader users cannot efficiently understand the structure of the mega menu or navigate between sections using heading navigation. Likewise, assistive technologies are not informed that the links belong to a related group, making the navigation more difficult to understand and traverse.

**Recommendation:** Mark each category title (e.g., RANGEFINDERS, GPS SPEAKERS, ACCESSORIES, Handhelds & Wearables, LAUNCH MONITORS, and EXTRAS) as an appropriate heading (e.g., <h2>). If the heading also functions as a link, wrap the link within the heading element (e.g., <h3><a href="...">RANGEFINDERS</a></h3>).
Group the related product links beneath each heading using semantic list markup (<ul>) with each navigation item contained in an <li> element.
Ensure the heading hierarchy is logical and does not skip heading levels.

---

## Issue 10: Header
**Description:** Accessible name does not match the visible text: The App Store and Google Play download buttons display recognizable text within their images (e.g., "Download on the App Store" and "Get it on Google Play"). However, the accessible names exposed to assistive technologies are defined using aria-label values such as "Download Blue Tees Game app from Apple App Store" and "Download Blue Tees Game app from Google Play Store."

Because the accessible names do not begin with or closely match the visible labels, speech recognition users who rely on the visible text to activate controls using voice commands may be unable to successfully interact with these buttons. Additionally, screen reader users may hear an announcement that differs from what is visually presented, resulting in an inconsistent user experience.

**Recommendation:** Ensure the accessible name includes the visible text exactly as it appears on the button image, preferably at the beginning of the accessible name.

For example:
"Download on the App Store – Blue Tees Game app"
"Get it on Google Play – Blue Tees Game app"

Avoid replacing the visible label with different wording in the aria-label. The accessible name should contain the complete visible label while additional descriptive information may be appended if needed.

---

## Issue 11: Header
**Description:** Non-descriptive link text does not identify the link purpose: The link is presented with the visible text "Read More", which does not independently describe its purpose or destination. Screen reader users often navigate webpages by listing links out of context. When announced in isolation, generic link text such as "Read More" does not provide sufficient information about the content or page the link leads to.

As a result, users of assistive technologies may need to navigate to surrounding content to determine the link's purpose, making navigation less efficient and increasing cognitive effort.

**Recommendation:** Use descriptive link text that clearly identifies the destination or purpose of the link without relying on surrounding context.

Examples include:
Read more about Game App 1.15.2 Update
Learn more about AI-powered guidance and course visualization
View Game App 1.15.2 release notes

If retaining the visible text "Read More" for visual design purposes, provide an accessible name that includes the topic (e.g., using aria-label or visually hidden text), such as "Read more about Game App 1.15.2 Update."

---

## Issue 12: Header
**Description:** Insufficient color contrast for text: The contrast ratio between the foreground color of the red text with its background color is below the required 4.5:1 ratio.

 Foreground colour: #E50000
 Background colour: #070709
 Contrast ratio: 4.2:1

**Recommendation:** Make sure that the contrast ratio between the element and its background is of at least 4.5:1.

For color compliant options:
https://contrast-finder.tanaguru.com/
http://colorsafe.co/

Resources:
Understanding contrast (minimum):
https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html

Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text):
https://www.w3.org/TR/WCAG20-TECHS/G18.html

Contrast (minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

---

## Issue 13: Header
**Description:** Incorrect semantic role used for control that opens the cart drawer: The cart control is implemented as a link (<a href="/cart">) even though it primarily functions as a button that opens the cart drawer/dialog (CartDrawer) without immediately navigating to a new page. As a result, assistive technologies announce it as a "link" instead of a "button," creating a mismatch between the control's role and its actual behavior. This can confuse screen reader users and users relying on voice control, as they expect a link to navigate to another page rather than open an interactive panel.

**Recommendation:** Use a native <button> element for the control if its primary purpose is to open the cart drawer. When opening the cart drawer, update the control with aria-expanded, maintain a valid aria-controls reference, move keyboard focus into the drawer, and return focus to the triggering control when the drawer is closed.

---

## Issue 14: Cart Screen
**Description:** Cart drawer dialog is not announced correctly to assistive technologies: When the cart drawer opens, keyboard focus moves to the drawer container, causing screen readers to announce the entire contents of the cart in one go. The panel is not programmatically identified as a dialog, users are not informed that a modal has opened, and they must navigate through all content to understand where they are. This creates a confusing and overwhelming experience for screen reader users.

**Recommendation:** Implement the cart drawer as a proper modal dialog using role="dialog" (or alertdialog if appropriate), aria-modal="true", and an accessible name using aria-labelledby or aria-label. Move keyboard focus to the dialog heading or first interactive element when it opens so screen readers announce the dialog title rather than all of its contents.

Trap keyboard focus within the dialog while it is open. Tabbing should cycle only through elements inside the cart drawer, and pressing Escape should close the dialog and return focus to the control that opened it.

---

## Issue 15: Cart Screen
**Description:** Multiple focusable elements perform the same action: Several product cards contain multiple keyboard-focusable elements that navigate to the same destination (for example, product image and product title). This creates unnecessary tab stops, making keyboard navigation longer and less efficient, particularly for users navigating through multiple recommended products.

**Recommendation:** Reduce redundant keyboard focus by ensuring only necessary interactive elements receive focus. Where appropriate, combine links pointing to the same destination or remove duplicate tab stops while maintaining functionality.

---

## Issue 16: Cart Screen
**Description:** Quantity changes are not announced correctly to screen reader users: When users activate the Increase or Decrease quantity buttons, the updated quantity and revised cart information or are announced inaccurately. Screen reader users may not know whether the quantity change was successful or what the current quantity is.

Additionally, focus not remain on same element instead it moves to related another element on ineteraction.

**Recommendation:** After the quantity changes keep focus on same element, announce the updated quantity and any related subtotal changes using an appropriate aria-live region (polite). Ensure announcements accurately reflect the new quantity and product affected (e.g., "Captain Pro Connected GPS Rangefinder quantity increased to 7.").

---

## Issue 17: Cart Screen
**Description:** Quantity input lacks sufficient accessible context: The quantity input is labelled only as "Quantity." When multiple products exist in the cart, screen reader users cannot determine which product the quantity field belongs to because every quantity field has the same accessible label.

**Recommendation:** Associate each quantity input with the corresponding product name using aria-labelledby or aria-describedby so it is announced as, for example, "Quantity for Captain Pro Connected GPS Rangefinder."

---

## Issue 18: Cart Screen
**Description:** Cart updates are not communicated as status messages: Updates such as subtotal changes, item removal, or cart modifications occur visually but are not automatically announced to assistive technology users. Screen reader users may not know whether their action completed successfully.

**Recommendation:** Announce cart updates using an aria-live="polite" region or another appropriate status message mechanism so users receive confirmation of changes without needing to manually navigate the interface.

---

## Issue 19: Cart Screen
**Description:** Missing Heading Markup: The visual title "Cart" is styled using a <div> with the class h2 instead of a semantic heading element (e.g., <h2>). As a result, screen reader users cannot identify the beginning of the cart drawer content or navigate directly to its heading using heading navigation shortcuts.

**Recommendation:** se a semantic heading element such as <h2> (or another heading level appropriate to the page hierarchy) for the cart drawer title instead of a generic <div>.

---

## Issue 20: Cart Screen
**Description:** Decorative icon contains unnecessary alternative text.: The cart icon is decorative and displayed alongside the visible "Cart" text. However, it includes the alternative text alt="offer_tag", causing screen readers to announce irrelevant information that does not convey meaningful content or functionality.

**Recommendation:** Since the icon is purely decorative, provide an empty alt attribute (alt="") or apply aria-hidden="true" to prevent it from being announced by assistive technologies.

---

## Issue 21: Rainmaker | Portable Golf?Launch Monitor
**Description:** Insufficient color contrast for text: The contrast ratio between the foreground color of the white text with its irregular background color is below the required 4.5:1 ratio.

 Foreground colour: #FFFFFF
 Background colour: #EDBD51
 Contrast ratio: 1.8:1

**Recommendation:** Make sure that the contrast ratio between the element and its background is of at least 4.5:1.

For color compliant options:
https://contrast-finder.tanaguru.com/
http://colorsafe.co/

Resources:
Understanding contrast (minimum):
https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html

Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text):
https://www.w3.org/TR/WCAG20-TECHS/G18.html

Contrast (minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

---

## Issue 22: Rainmaker | Portable Golf?Launch Monitor
**Description:** Missing list mark-up: Missing list mark-up for the elements present wihtin '20+ Performance Metrics Tracked' section.

**Recommendation:** 1. Wrap each list item inside a <li> tag. 
2. Wrap the full list inside a <ul> or <ol> tag.
3. Provide the desired visual style using CSS.

Resources:
Page structure, Lists:
https://www.w3.org/WAI/tutorials/page-structure/content/#lists

---

## Issue 23: RINGER GOLF GPS w/ Color Screen | 40K Pre-loaded Courses
**Description:** Redundant keyboard focus stops provided for the same product link: Each product card contains multiple keyboard-focusable links (such as the product image, product title, and "Shop Now" button) that all navigate to the same product details page. As a result, keyboard and assistive technology users must tab through multiple focusable elements with the same destination, creating redundant navigation and increasing the number of unnecessary keystrokes required to browse the product listing.

**Recommendation:** Ensure that each product card provides only one primary keyboard-focusable control for navigating to the product details page. If multiple visual elements (image, title, button) are intended to activate the same destination, either:

Wrap them within a single interactive link, or
Remove redundant links from the keyboard focus order while maintaining the visual design.

This reduces unnecessary keyboard stops and provides a more efficient navigation experience.

---

## Issue 24: RINGER GOLF GPS w/ Color Screen | 40K Pre-loaded Courses
**Description:** Visual product information is not programmatically conveyed to assistive technologies: The product card displays important visual information, including the "Sold Out" status and the product price (Rs. 19,300.00). However, this information is not consistently included in the accessible names of the interactive elements (e.g., "View Series 3 Max+" and "Shop Series 3 Max+"). Screen reader users are only informed of the product name and are not made aware that the item is sold out or its displayed price when navigating the product links. As a result, users of assistive technologies receive incomplete information compared to sighted users.

**Recommendation:** Ensure that all essential product information presented visually, including the availability status (e.g., "Sold Out") and price, is programmatically associated with the corresponding interactive elements. This can be achieved by:

Including the product status and price within the accessible name or accessible description using aria-labelledby or aria-describedby.
Ensuring that screen readers announce information such as "Series 3 Max+, Sold Out, Rs. 19,300, View Product" when users navigate to the product links.

---

## Issue 25: PlayMaker+ GPS Golf Watch
**Description:** Content is only available through swipe/scroll interaction and is not accessible to keyboard users: The feature carousel/content section relies on swipe/scroll-based interaction to reveal additional feature information (e.g., "Advanced Course View," "Front/Center/Back Distances," "Green Compass," etc.). Keyboard-only users cannot access or navigate to the remaining content because no keyboard-operable controls (such as Previous/Next buttons, tabs, or other focusable navigation) are provided. As a result, only the initially displayed content is available, while the remaining information is inaccessible.

Additionally:
The content updates dynamically without being programmatically exposed to keyboard users.
The associated watch and background images also change visually but these updates are not conveyed to assistive technology users.
The interaction depends on scrolling/swiping, which is not an accessible input method for many users.

**Recommendation:** Provide keyboard-accessible controls (e.g., Previous/Next buttons, tabs, or carousel navigation) to allow users to access all feature content without relying on swipe or scroll gestures. Ensure each control is keyboard operable, has an appropriate accessible name, and updates the active content programmatically. Any dynamically displayed content should be exposed to assistive technologies and, where appropriate, announced when it changes. Ensure all functionality available through gestures is also available using a keyboard.

---

## Issue 26: PlayMaker+ GPS Golf Watch
**Description:** Expanded/collapsed state is not announced to screen reader users: When the expand/collapse button is activated, the associated content is visually expanded or collapsed. However, the change in state is not programmatically conveyed to assistive technologies. The button does not expose its expanded/collapsed state (e.g., via aria-expanded) or identify the controlled content (e.g., via aria-controls). As a result, screen reader users are not informed whether the content has been expanded or collapsed.

**Recommendation:** Ensure the expand/collapse button exposes its current state using aria-expanded and references the controlled content using aria-controls. Update the value of aria-expanded dynamically whenever the content is expanded or collapsed so assistive technology users receive the correct state information.

---

## Issue 27: PlayMaker+ GPS Golf Watch
**Description:** Incorrect heading level: Incorrect heading level <h5> provided for heading text present within 'SWING-FRIENDLY FIT.
GAME-CHANGING PERFORMANCE.' section instead of <h3>.

**Recommendation:** Make sure heading levels are structured in a hierarchical manner. This makes navigation much faster for screen reader and keyboard users.

In this case, replace <h5> tag with <h3> element.

Example code:
<h3>
                  LOW-PROFILE <br>
                  ACTION BUTTON
                </h3>
(...)
<h3>
                  ULTRALIGHT <br>
                  SWING-READY FIT
                </h3>

Resources
HeadingsMap extension:
https://chrome.google.com/webstore/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi

Headings and page structure:
https://www.w3.org/WAI/tutorials/page-structure/headings/

---

## Issue 28: No.1 AI-Powered Golf GPS & Stats Tracking App
**Description:** Incorrect heading level: Incorrect heading level <h2> provided for 'AI POWERED
GPS GOLF APP' instead of <h1>.

**Recommendation:** Make sure heading levels are structured in a hierarchical manner. This makes navigation much faster for screen reader and keyboard users.

In this case, replace <h2> tag with <h1> element.

Example code:
<h1 class="section_heading">
            <span class="custom_heading outline">AI POWERED</span>
            GPS GOLF APP
          </h1>

Resources
HeadingsMap extension:
https://chrome.google.com/webstore/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi

Headings and page structure:
https://www.w3.org/WAI/tutorials/page-structure/headings/

---

## Issue 29: No.1 AI-Powered Golf GPS & Stats Tracking App
**Description:** Rating information is not available to assistive technology users: The star rating is conveyed only through decorative SVG star icons and is not exposed programmatically to assistive technologies. Screen reader users cannot determine the product or review rating because no accessible text or semantic information (e.g., "5 out of 5 stars") is provided.

**Recommendation:** Provide the rating in a programmatically determinable format. Include accessible text such as "5 out of 5 stars" using visible text or visually hidden content, or expose the rating using appropriate ARIA attributes so screen reader users receive the same information as sighted users. Mark decorative star icons with aria-hidden="true" if they are accompanied by accessible text.

---

## Issue 30: No.1 AI-Powered Golf GPS & Stats Tracking App
**Description:** Insufficient color contrast for text: The contrast ratio between the foreground color of the 'Karen Bordeleau' gray text with its background color is below the required 4.5:1 ratio.

 Foreground colour: #7B7B7B
 Background colour: #252525
 Contrast ratio: 3.6:1

**Recommendation:** Make sure that the contrast ratio between the element and its background is of at least 4.5:1.

For color compliant options:
https://contrast-finder.tanaguru.com/
http://colorsafe.co/

Resources:
Understanding contrast (minimum):
https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html

Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text):
https://www.w3.org/TR/WCAG20-TECHS/G18.html

Contrast (minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

---

## Issue 31: No.1 AI-Powered Golf GPS & Stats Tracking App
**Description:** Incorrect heading level: Incorrect heading level <h4> provided for 'Edit scheduled inspection' text instead of <h1>.

**Recommendation:** Make sure heading levels are structured in a hierarchical manner. This makes navigation much faster for screen reader and keyboard users.

In this case, replace <h3> tag with <h2> element.

Example code:
<h2>
            BECOME A BLUE TEES MEMBER TO UNLOCK <br>
            THE COMPLETE GAME EXPERIENCE
          </h2>
     

Resources
HeadingsMap extension:
https://chrome.google.com/webstore/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi

Headings and page structure:
https://www.w3.org/WAI/tutorials/page-structure/headings/

---

## Issue 32: No.1 AI-Powered Golf GPS & Stats Tracking App
**Description:** Multiple links have the same accessible name but different destinations: Multiple links on the page use the same accessible name, "Start now," but navigate to different destinations or perform different actions. Because the accessible name does not distinguish their purpose, screen reader users cannot determine which link corresponds to which content when navigating through the list of links.

**Recommendation:** Ensure each link has a unique and descriptive accessible name that clearly identifies its purpose or destination. For example, include the associated plan or product name in the visible text or accessible name (e.g., "Start now – Premium Plan", "Start now – Free Membership").

---

## Issue 33: No.1 AI-Powered Golf GPS & Stats Tracking App
**Description:** Missing table semantics and accessible names for SVG status icons: The comparison table is not programmatically identified as a data table, making it difficult for screen reader users to understand the relationships between features and membership types. Additionally, the SVG icons used to indicate feature availability (e.g., checkmarks) do not provide accessible names or text alternatives, so users of assistive technologies cannot determine whether a feature is available for Blue Tees Member or Guest. As a result, the visual information conveyed by the icons is not communicated non-visually.

**Recommendation:** Implement proper HTML table semantics using <table>, <caption> (if appropriate), <thead>, <tbody>, <tr>, <th>, and <td>, ensuring row and column headers are programmatically associated. Provide accessible text for the status icons, such as "Available", "Included", or "Not available", either through visible text, visually hidden text, or appropriate ARIA attributes. Decorative SVGs should be hidden from assistive technologies using aria-hidden="true".

---

## Issue 34: No.1 AI-Powered Golf GPS & Stats Tracking App
**Description:** Insufficient color contrast for text: The contrast ratio between the foreground color of the white text with its gray background color is below the required 4.5:1 ratio.

 Foreground colour: #FFFFFF
 Background colour: #B0B0B0
 Contrast ratio: 2.2:1

**Recommendation:** Make sure that the contrast ratio between the element and its background is of at least 4.5:1.

For color compliant options:
https://contrast-finder.tanaguru.com/
http://colorsafe.co/

Resources:
Understanding contrast (minimum):
https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html

Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text):
https://www.w3.org/TR/WCAG20-TECHS/G18.html

Contrast (minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

---

## Issue 35: No.1 AI-Powered Golf GPS & Stats Tracking App
**Description:** Insufficient color contrast for text: The contrast ratio between the foreground color of the white text with its background color is below the required 4.5:1 ratio.

 Foreground colour: #FFFFFF
 Background colour: #ACA398
 Contrast ratio: 2.5:1

**Recommendation:** Make sure that the contrast ratio between the element and its background is of at least 4.5:1.

For color compliant options:
https://contrast-finder.tanaguru.com/
http://colorsafe.co/

Resources:
Understanding contrast (minimum):
https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html

Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text):
https://www.w3.org/TR/WCAG20-TECHS/G18.html

Contrast (minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

---

## Issue 36: No.1 AI-Powered Golf GPS & Stats Tracking App
**Description:** Incorrect heading level: The section uses two separate <h4> elements for the item number ("01") and the corresponding title ("Put players first"). This creates an incorrect heading structure and results in screen readers announcing them as separate headings, making the content less meaningful and harder to navigate. The number and title represent a single heading and should be programmatically associated.

**Recommendation:** Combine the item number and title into a single heading, for example, <h3>01. Put players first</h3>, and use an <h3> if it is the appropriate level within the page's heading hierarchy. Ensure headings follow a logical, sequential order without skipping levels.

Example code:
<h3>01- Put players first</h3>

---

## Issue 37: Careers at Blue Tees Golf
**Description:** Missing visible labels for form fields: The form fields rely on placeholder text as the visible label, while the associated <label> elements are visually hidden using a screen-reader-only class. As a result, sighted users do not have persistent labels once they begin entering information, which can make it difficult to identify the purpose of each field. Placeholders are not a substitute for visible labels because they disappear during data entry and do not provide a consistent visual reference.

**Recommendation:** Provide persistent, visible labels for all form fields (e.g., First Name, Last Name, Email, Phone Number, Portfolio URL, LinkedIn, and Message) and ensure each label is programmatically associated with its corresponding form control using the for attribute on the <label> element and the matching id on the input. Placeholders may be retained as examples or hints but should not replace visible labels.

---

## Issue 38: Careers at Blue Tees Golf
**Description:** Missing alternative text for informative image: The image is missing an alt attribute. As a result, screen reader users may receive no meaningful information about the image or may hear the image file name or URL instead. If the image conveys content or supports the surrounding information, its purpose is not communicated to users who cannot see it.

**Recommendation:** Provide appropriate alternative text using the alt attribute that describes the image's purpose or the information it conveys. If the image is purely decorative and does not convey meaningful content, use an empty alt="" and ensure it is ignored by assistive technologies.

---

## Issue 39: Careers at Blue Tees Golf
**Description:** Invalid list structure: The <ul> element contains child elements other than <li>, <script>, or <template>. Invalid list markup can prevent assistive technologies from correctly identifying the list and its items, resulting in an inaccurate or confusing experience for screen reader users.

**Recommendation:** Ensure the <ul> contains only <li> elements as its direct children. Wrap each list item within an <li> element, and move any non-list content outside the list or nest it appropriately within an <li>.

---

## Issue 40: Careers at Blue Tees Golf
**Description:** Missing heading level 1 on the page: The html heading mark-up- H1 is missing on the webpage.

**Recommendation:** Add an <h1> tag to identify the main title of the page.

This allows users to quickly identify the beginning of the main content.

Resources:
HeadingsMap extension:
https://chrome.google.com/webstore/detail/headingsmap/

Headings and page structure:
https://www.w3.org/WAI/tutorials/page-structure/headings/

---

## Issue 41: Sale Page BFCM
**Description:** Missing accessible names and state information for carousel pagination controls: The carousel pagination buttons do not have accessible names, so screen reader users cannot determine the purpose of each control. Additionally, the currently active pagination button is indicated only visually through styling and its selected/current state is not programmatically conveyed. As a result, users of assistive technologies cannot identify which slide is currently displayed or navigate the carousel effectively.

**Recommendation:** Provide meaningful accessible names for each pagination button (e.g., "Go to slide 1", "Go to slide 2"). Also expose the current slide state programmatically by using an appropriate attribute such as aria-current="true" or aria-selected="true" (with the appropriate widget pattern), and ensure the active state is updated as the carousel changes.

---

## Issue 42: Sale Page BFCM
**Description:** Carousel pagination controls missing accessible names, state information, and slide change announcements: The carousel pagination buttons do not have accessible names, making it impossible for screen reader users to identify the purpose of each control (e.g., which slide each button navigates to). The currently active pagination button is indicated only visually and its selected/current state is not programmatically exposed. Additionally, when a pagination button is activated and the displayed image changes, the updated slide content is not announced to screen reader users. As a result, users of assistive technologies may be unaware that the carousel content has changed.

**Recommendation:** Provide meaningful accessible names for each pagination button (e.g., "Go to slide 1", "Go to slide 2"). Programmatically expose the currently active slide using appropriate ARIA attributes such as aria-current="true" or aria-selected="true" (depending on the widget pattern), and update these attributes as the active slide changes. Ensure slide changes are communicated to assistive technologies by updating the carousel content within an appropriate live region (e.g., aria-live="polite"), or by managing focus according to the carousel design pattern so screen reader users are informed when new content is displayed.

---

## Issue 43: Sale Page BFCM
**Description:** Insufficient color contrast for non-text content: The contrast ratio between the foreground color of the carousel pagination buttons with its background color is less than 3:1.

 Foreground colour: #D9D9D9
 Background colour: #FFFCFC
 Contrast ratio: 1.4:1

**Recommendation:** Ensure that the contrast ratio between the element and its background is of at least 3.0:1. 

Resources:
Non-text contrast:
https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html

Contrast (Minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

Color contrast analyser:
https://www.tpgi.com/color-contrast-checker/

---

## Issue 44: Sale Page BFCM
**Description:** Multiple links with the same accessible name: Multiple "SHOP NOW" links are present on the page with the same accessible name, even though each link navigates to a different product. Screen reader users rely on accessible names to identify links, and identical names for different destinations make it difficult to distinguish between products, particularly when using a links list or other assistive technology navigation features.

**Recommendation:** Provide a unique, descriptive accessible name for each link that includes the associated product name, such as "Shop now – PlayMaker Watch", "Shop now – Series 3 Max+", etc. This can be achieved by updating the visible link text or by using an appropriate aria-label or aria-labelledby while ensuring the accessible name accurately reflects the destination.

---

## Issue 45: Sale Page BFCM
**Description:** Missing keyboard support and incorrect role for video dialog trigger: The "SEE IT IN ACTION" control is implemented using an anchor (<a>) without a valid href and is used to trigger a video dialog. As a result, the control does not expose the correct semantic role and may not be consistently operable using the keyboard. Users relying on keyboard navigation or assistive technologies may be unable to identify it as an interactive button or activate it using standard keyboard interactions (Enter and Space). This creates a barrier to opening the video dialog.

**Recommendation:** Implement the control as a native <button> element. If a custom element must be used, assign role="button", make it keyboard focusable (tabindex="0"), and ensure it supports activation using both Enter and Space keys. Also provide appropriate dialog semantics, such as aria-haspopup="dialog", and ensure keyboard focus moves to the dialog when it opens and returns to the trigger when it closes.

---

## Issue 46: Sale Page BFCM
**Description:** Insufficient color contrast for text: The contrast ratio between the foreground color of the white text and its orange background color is below the required 4.5:1 ratio on hover state.

 Foreground colour: #FFFFFF
 Background colour: #FF9900
 Contrast ratio: 2.1:1

**Recommendation:** Make sure that the contrast ratio between the element and its background is of at least 4.5:1.

For color compliant options:
https://contrast-finder.tanaguru.com/
http://colorsafe.co/

Resources:
Understanding contrast (minimum):
https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html

Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text):
https://www.w3.org/TR/WCAG20-TECHS/G18.html

Contrast (minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

---

## Issue 47: Sale Page BFCM
**Description:** Color alone used to indicate the active carousel slide: The carousel pagination indicators (dots) rely solely on color to distinguish the currently active slide from inactive slides. No additional visual cue (such as a different shape, size, border, icon, or text) or programmatically exposed state is provided. As a result, users with color vision deficiencies or screen reader users may be unable to identify which slide is currently active.

**Recommendation:** Do not rely on color alone to indicate the active slide. Provide an additional visual indicator, such as an outline, increased size, or different shape, and expose the current state programmatically by using aria-current="true" or aria-selected="true" (where appropriate). Ensure each pagination control also has a meaningful accessible name (e.g., "Go to slide 2") and that the active state is conveyed to assistive technologies.

---

## Issue 48: Sale Page BFCM
**Description:** Missing accessible names for carousel navigation controls: The carousel previous and next navigation controls do not have accessible names. The buttons are implemented with role="presentation" and contain only decorative images without alternative text, preventing screen readers from identifying their purpose. As a result, assistive technology users cannot determine whether the controls navigate to the previous or next slide.

**Recommendation:** Use native <button> elements without role="presentation" and provide meaningful accessible names such as "Previous slide" and "Next slide" using visible text, aria-label, or aria-labelledby. Mark the arrow images as decorative (alt="" and aria-hidden="true") if they do not convey additional information beyond the button label.

---

## Issue 49: Home
**Description:** Decorative icon is unnecessarily exposed to assistive technologies: The login link includes a decorative profile icon with the alternative text "Profile Icon". Since the adjacent visible text "LOGIN" already identifies the purpose of the link, the image does not convey any additional information and is purely decorative.

As a result, screen reader users may hear an announcement such as "Profile Icon, LOGIN, link," which introduces redundant information and creates unnecessary verbosity during navigation.

**Recommendation:** The profile icon is purely decorative, hide it from assistive technologies by:

Using an empty alt attribute (alt="") on the <img> element, or
Applying aria-hidden="true" to the decorative icon where appropriate.

Ensure the accessible name of the link is derived from the visible text "LOGIN", avoiding redundant announcements from decorative imagery.

Example code:
<a class="site__header-profileIcon" href="/account/login" style="" bis_skin_checked="1">
      <img src="//blueteesgolf.com/cdn/shop/t/145/assets/profile-icon-neew-header.svg?v=156315121216936018401782819867" alt="">
      <span>LOGIN</span>
    </a>

---

## Issue 50: Home
**Description:** Carousel is not programmatically identified: The homepage banner functions as a carousel containing multiple rotating promotional slides. However, the carousel and its slides are not programmatically identified with appropriate roles, labels, or state information.

Without semantic information, screen reader users may not understand that they are interacting with a carousel, how many slides are available, or which slide is currently displayed. This makes navigation more difficult and reduces awareness of dynamic content.

**Recommendation:** Implement appropriate carousel semantics in accordance with the WAI-ARIA Authoring Practices.

At a minimum:
Identify the carousel using role="region" (or another suitable landmark).
Provide an accessible name using aria-label or aria-labelledby.
Use aria-roledescription="carousel" where appropriate.
Identify each slide programmatically.
Indicate the currently displayed slide using an appropriate state (such as aria-current where applicable).
Ensure assistive technologies can determine slide position (for example, "Slide 2 of 5").

---

## Issue 51: Home
**Description:** Homepage hero carousel automatically rotates without accessible controls: The homepage contains a hero banner carousel that automatically rotates between promotional slides after a fixed interval. Each slide includes different headings, promotional content, videos, and "Shop Now" links, but the carousel does not provide accessible controls to pause, stop, or manually navigate through the slides using the keyboard or assistive technologies.

Additionally:
Slides change automatically without user initiation.
Autoplaying video backgrounds continue looping.
The currently active slide is only indicated visually using CSS classes (e.g., .active).
The slide changes are not programmatically communicated to screen readers.
The navigation items displayed at the bottom (e.g., "Rainmaker", "Captain Pro") are non-semantic <div> elements rather than interactive controls, making them difficult or impossible for keyboard and assistive technology users to operate.

As a result, users with cognitive disabilities, low vision, screen reader users, and keyboard-only users may lose context when content changes automatically or may be unable to access promotional content presented in other slides.

**Recommendation:** Update the hero carousel to conform to the WAI-ARIA Carousel Design Pattern and WCAG requirements by:

Provide visible and keyboard-accessible Pause/Play controls that allow users to stop automatic slide rotation.
Ensure automatic rotation does not resume unless explicitly requested by the user.
Provide accessible Previous and Next buttons using native <button> elements.
Convert slide indicators into keyboard-operable controls (such as buttons or tabs) with appropriate accessible names.
Programmatically identify the active slide using appropriate ARIA attributes (for example, aria-current, aria-selected, or the Tabs/Carousel pattern as appropriate).
Notify assistive technologies when slide content changes using an appropriate live region only when necessary, ensuring announcements are not excessive.
Prevent keyboard focus from moving unexpectedly when slides rotate.
Ensure autoplaying background videos do not interfere with users' ability to read or interact with the slide content.
Follow the WAI-ARIA Authoring Practices for accessible carousels to provide consistent keyboard interaction and screen reader support.

---

## Issue 52: Home
**Description:** Keyboard focus moves to visually hidden "Shop Now" link in inactive carousel slides: The homepage hero carousel contains multiple promotional slides, but only the active slide is visually displayed. When navigating using the keyboard, focus can move to the "Shop Now" link within an inactive slide that is visually hidden from sighted users. As a result, the keyboard focus indicator is not visible, making it appear as though focus has been lost.

This occurs because interactive elements within hidden carousel slides remain keyboard focusable even though their parent slide is not currently visible. Keyboard-only users may unknowingly tab to controls they cannot see, making it difficult to understand their current location on the page or continue navigating effectively.

**Recommendation:** Ensure that interactive elements within inactive carousel slides are removed from the keyboard focus order until their respective slide becomes visible.

Specifically:
Remove hidden slides from the sequential keyboard navigation by applying inert, tabindex="-1" (to focusable descendants), or otherwise preventing focus while the slide is inactive.
Alternatively, hide inactive slides from both visual users and assistive technologies using appropriate techniques (e.g., hidden or aria-hidden="true" where appropriate), ensuring focusable elements are not exposed.
When a slide becomes active, restore keyboard accessibility to its interactive elements.
Ensure the keyboard focus indicator is always visible on the currently active slide and never lands on hidden content.

---

## Issue 53: Home
**Description:** Product card hover image is not available to keyboard users: The product card displays an alternate product image when users hover over the card with a mouse. However, this visual change is not triggered when navigating the page using the keyboard. As a result, keyboard-only users do not receive the same visual feedback that is available to mouse users.

Users who rely on keyboard navigation may miss important product information or alternate product views that are intended to assist purchasing decisions, resulting in an inconsistent user experience.

**Recommendation:** Ensure that any visual effect available on mouse hover is also available when the product card or its interactive element receives keyboard focus.

Specifically:

Apply the same styling used for the :hover state to the :focus and/or :focus-visible state.
If the product card itself is not focusable, ensure the hover effect is triggered when the focusable link or button within the card receives keyboard focus.
Verify that keyboard users receive the same product preview and visual feedback as mouse users.

---

## Issue 54: Home
**Description:** Unnecessary use of heading: The text such as 'Rainmaker', 'CAPTAIN AIR' marked with heading tag, but it does not function as a title or subtitle.

**Recommendation:** Content that doesn't function as a title or subtitle should not be tagged as a heading. 
Instead of using a heading tag, use <span> or <div> tags and use CSS to maintain the visual effect.

A properly structured heading hierarchy helps screen reader users navigate the page.

Resource:
Organizing a page using headings:
https://www.w3.org/WAI/WCAG21/Techniques/general/G141

---

## Issue 55: Home
**Description:** Incorrect heading level: Incorrect heading level <h6> provided instead of <h2> for the below mentioned text:
- Overall Inspection Score
- APPA Score
- Flagged Inspections
- Inspections
- Tickets Inbox
- Tickets Resolved
- Paint Inspections

**Recommendation:** Make sure heading levels are structured in a hierarchical manner. This makes navigation much faster for screen reader and keyboard users.

In this case, replace <h2> tag with <h3> element.

Example code:
<h3 class="product-card__product-name">PLAYER PRO</h3>

Resources
HeadingsMap extension:
https://chrome.google.com/webstore/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi

Headings and page structure:
https://www.w3.org/WAI/tutorials/page-structure/headings/

---

## Issue 56: Home
**Description:** No screen reader feedback for carousel section: When keyboard users activate the Previous slide or Next slide buttons within the carousel, the visible carousel content changes; however, no status update or announcement is provided to assistive technologies. As a result, screen reader users receive no confirmation that the slide has changed or which slide is currently displayed.

This lack of feedback makes it difficult for users who rely on screen readers to understand whether their action was successful or to track their position within the carousel.

**Recommendation:** When keyboard users activate the Previous slide or Next slide buttons within the carousel, the visible carousel content changes; however, no status update or announcement is provided to assistive technologies. As a result, screen reader users receive no confirmation that the slide has changed or which slide is currently displayed.

This lack of feedback makes it difficult for users who rely on screen readers to understand whether their action was successful or to track their position within the carousel.

---

## Issue 57: Home
**Description:** Missing list mark-up: Missing list mark-up for the following elements:
- FREE SHIPPING OVER $50
- Extended two-year warranty
- 100 DAY RISK-FREE RETURNS

**Recommendation:** 1. Wrap each list item inside a <li> tag. 
2. Wrap the full list inside a <ul> or <ol> tag.
3. Provide the desired visual style using CSS.

Resources:
Page structure, Lists:
https://www.w3.org/WAI/tutorials/page-structure/content/#lists

---

## Issue 58: Home
**Description:** Video play control not accessible to keyboard and screen Reader users: The video play control is implemented using non-interactive <div> and <img> elements instead of a native interactive control. As a result, the play control cannot receive keyboard focus or be activated using the keyboard, making the video inaccessible to keyboard-only users. Additionally, screen readers do not identify the control as an actionable button or announce its purpose, preventing users from understanding how to play the video.

**Recommendation:** Implement the play control using a native <button> element or assign an appropriate interactive role (role="button"), keyboard support, and an accessible name (e.g., "Play video: Learn Why from Sean Foley, PGA Tour Coach"). Ensure the control is keyboard focusable, operable using Enter and Space, and exposed correctly to assistive technologies.

---

## Issue 59: Home
**Description:** Video lacks captions and audio description: The video content does not provide synchronized captions for spoken dialogue and other meaningful audio information. Additionally, no audio description (or equivalent alternative) is available for important visual information that is not conveyed through the video's existing audio. As a result, users who are deaf or hard of hearing may miss audio content, while users who are blind or have low vision may be unable to perceive essential visual information needed to understand the video.

**Recommendation:** Provide synchronized closed captions for all spoken dialogue and relevant non-speech audio. Additionally, ensure that important visual information is conveyed through an audio description track or is fully described within the existing narration so that users who cannot see the video can access all meaningful content.

---

## Issue 60: Home
**Description:** Missing heading mark-up: The 'ALSO FEATURED BY' text constitute as heading but not marke as such.

**Recommendation:** Use a heading tag <h3> for the mentioned text.

Example code:
<h3 class="ticker-heading__text">ALSO FEATURED BY</h3>

Resources:
Organizing a page using headings:
https://www.w3.org/WAI/WCAG21/Techniques/general/G141

---

## Issue 61: Home
**Description:** Identical alternative text provided for distinct logo images: Multiple logo images are assigned the same alternative text, "You Are Seeing logos In Which Blue Tees Golf Featured", even though each image represents a different publication or organization. As a result, screen reader users cannot distinguish between the individual logos or identify the specific brands being displayed. Repetitive, non-descriptive alternative text reduces the usefulness of the content for users of assistive technologies.

**Recommendation:** Provide unique, descriptive alternative text for each logo using the name of the publication or organization it represents (e.g., "Golf Digest logo", "Forbes logo", etc.). If the logos are purely decorative or the surrounding text already conveys the same information, use an empty alt="" attribute instead.

Example code:
<img src="golf-digest.png" alt="Golf Digest logo">
<img src="forbes.png" alt="Forbes logo">
<img src="golfweek.png" alt="Golfweek logo">
<img src="golf-com.png" alt="GOLF.com logo">

---

## Issue 62: Home
**Description:** Missing play/pause control for automatically moving logo carousel: The "Also Featured By" logo carousel scrolls automatically but does not provide a mechanism for users to pause or stop the movement. Users with cognitive disabilities, low vision, or those using screen magnifiers may have difficulty reading or interacting with the continuously moving content. Additionally, keyboard and screen reader users are unable to control the animation because no accessible play/pause control is provided.

**Recommendation:** Provide an accessible Play/Pause button that allows users to stop and restart the automatic scrolling. The control should:

Be keyboard accessible.
Have an accessible name that updates based on the current state (e.g., "Pause logo carousel" / "Play logo carousel").
Update the aria-pressed state to indicate whether the animation is paused.
Stop the animation when activated and resume it when activated again.

---

## Issue 63: Home
**Description:** Incorrect heading level: Incorrect heading level <h3> provided for 'STAY IN THE LOOPn' text instead of <h1>.

**Recommendation:** Make sure heading levels are structured in a hierarchical manner. This makes navigation much faster for screen reader and keyboard users.

In this case, replace <h3> tag with <h2> element.

Example code:
<h2>STAY IN THE LOOP</h2>
     

Resources
HeadingsMap extension:
https://chrome.google.com/webstore/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi

Headings and page structure:
https://www.w3.org/WAI/tutorials/page-structure/headings/

---

## Issue 64: Home
**Description:** Email input field does not have an accessible name: The email input field relies solely on placeholder text ("Enter your email") to communicate its purpose. Placeholders are not a sufficient replacement for an accessible label because they may not be consistently announced by assistive technologies and disappear when users begin entering text. As a result, screen reader users may not be able to determine the purpose of the field.

**Recommendation:** Provide a visible label associated with the input field using the for and id attributes. If a visible label is not desired, provide an accessible name using aria-label or aria-labelledby.

Exmple code:
<input
  type="email"
  id="Email-"
  name="contact[email]"
  aria-label="Email address"
  placeholder="Enter your email"
  class="footer-signup-input"
  autocorrect="off"
  autocomplete="email"
  autocapitalize="off">

---

## Issue 65: Home
**Description:** Email input field is missing the autocomplete attribute: The email input field does not include the autocomplete attribute. Without an appropriate autocomplete value, browsers and assistive technologies may be unable to identify the expected input purpose and offer autofill functionality.

This can make completing the form more difficult, particularly for users with cognitive disabilities, motor impairments, or those who rely on browser autofill to reduce typing.

**Recommendation:** Add the appropriate autocomplete attribute to identify the expected input purpose. For an email address field, use autocomplete="email".

Example code:
<label for="Email-" class="visually-hidden">Email address</label>

<input
  type="email"
  id="Email-"
  name="contact[email]"
  placeholder="Enter your email"
  autocomplete="email"
  autocorrect="off"
  autocapitalize="off">

Or 

<input
  type="email"
  id="Email-"
  name="contact[email]"
  aria-label="Email address"
  placeholder="Enter your email"
  class="footer-signup-input"
  autocorrect="off"
  autocomplete="email"
  autocapitalize="off">

---

## Issue 66: Home
**Description:** Form validation errors cause the page to reload instead of being announced: When the newsletter form is submitted without entering an email address, the page reloads to display the validation error ("Email can't be blank.") instead of dynamically announcing the error to assistive technologies.

Reloading the page interrupts the user's workflow and may cause keyboard and screen reader users to lose their place within the form. Additionally, the error message is not exposed through a live region or associated with the invalid input, making it difficult for users of assistive technologies to identify and correct the error.

**Recommendation:** Validate the form without reloading the page whenever possible. When validation fails:

Display the error message dynamically.
Announce the error using a live region (role="alert" or aria-live="assertive").
Set aria-invalid="true" on the invalid field.
Associate the error message with the input using aria-describedby.
Move keyboard focus to the first invalid field or the error summary after submission.

---

## Issue 67: Home
**Description:** Success message is not announced to assistive technologies: After successfully subscribing to the newsletter, the confirmation message ("Thanks for subscribing") is displayed visually but is not programmatically announced to screen reader users.

Because the success message is added dynamically without using a live region or an appropriate status role, users of assistive technologies may not be aware that their submission was successful.

**Recommendation:** Ensure that dynamically displayed success messages are announced by assistive technologies. Apply either role="status" or aria-live="polite" to the container displaying the confirmation message. The message should be inserted or updated dynamically after a successful submission without requiring users to move focus.

Correct code example
<div
  id="newsletter-success"
  class="note note--success"
  role="status"
  aria-live="polite">
  Thanks for subscribing.
</div>

---

## Issue 68: Home
**Description:** Insufficient color contrast for text: The contrast ratio between the foreground color of the green text with its background color is below the required 4.5:1 ratio.

 Foreground colour: #56AD6A
 Background colour: #ECFEF0
 Contrast ratio: 2.6:1

**Recommendation:** Make sure that the contrast ratio between the element and its background is of at least 4.5:1.

For color compliant options:
https://contrast-finder.tanaguru.com/
http://colorsafe.co/

Resources:
Understanding contrast (minimum):
https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html

Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text):
https://www.w3.org/TR/WCAG20-TECHS/G18.html

Contrast (minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

---

## Issue 69: Home
**Description:** Insufficient color contrast for text: The contrast ratio between the foreground color of the placeholder text with its background color is below the required 4.5:1 ratio.

 Foreground colour: #CFCFCF
 Background colour: #FFFFFF
 Contrast ratio: 1.6:1

**Recommendation:** Make sure that the contrast ratio between the element and its background is of at least 4.5:1.

For color compliant options:
https://contrast-finder.tanaguru.com/
http://colorsafe.co/

Resources:
Understanding contrast (minimum):
https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html

Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text):
https://www.w3.org/TR/WCAG20-TECHS/G18.html

Contrast (minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

---

## Issue 70: Footer
**Description:** Incorrect heading level: Incorrect heading level <h3> provided for below mentioned text instead of <h2>.
- PRODUCTS
- APPS
- COMMUNITY
- SUPPORT
- FOLLOW US
- GET THE LATEST
DEALS, DROPS, & more.
- DOWNLOAD the official blue tees golf game™ APP

**Recommendation:** Make sure heading levels are structured in a hierarchical manner. This makes navigation much faster for screen reader and keyboard users.

In this case, replace <h3> tag with <h2> element.

Example code:
<h2>STAY IN THE LOOP</h2>
     

Resources
HeadingsMap extension:
https://chrome.google.com/webstore/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi

Headings and page structure:
https://www.w3.org/WAI/tutorials/page-structure/headings/

---

## Issue 71: Footer
**Description:** Informative image is missing alternative text: The image is rendered with an empty alt attribute (alt="") even though it appears to convey meaningful information (e.g., a brand, partner, certification, or promotional logo). As a result, screen reader users are not informed of the image's purpose or content because it is treated as decorative and ignored by assistive technologies.

**Recommendation:** Provide concise and meaningful alternative text that describes the purpose or content of the image. The alternative text should convey the same information available visually e.g., "Play Different".

---

## Issue 72: Footer
**Description:** Insufficient color contrast for non-text content: The contrast ratio between the foreground color of the focus indicator with its background color is less than 3:1.

 Foreground colour: #004DF5
 Background colour: #272933
 Contrast ratio: 2.3:1

**Recommendation:** Ensure that the contrast ratio between the element and its background is of at least 3.0:1. 

Resources:
Non-text contrast:
https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html

Contrast (Minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

Color contrast analyser:
https://www.tpgi.com/color-contrast-checker/

---

## Issue 73: All Blue Tees Golf Products
**Description:** Incorrect heading level: Incorrect heading level <h3> provided for 'BLUE TEES ONLINE EXCLUSIVE' text instead of <h2>.

**Recommendation:** Make sure heading levels are structured in a hierarchical manner. This makes navigation much faster for screen reader and keyboard users.

In this case, replace <h3> tag with <h2> element.

Example code:
<h2 class="tees_heading-text">BLUE TEES<br> ONLINE EXCLUSIVE</h2>

Resources
HeadingsMap extension:
https://chrome.google.com/webstore/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi

Headings and page structure:
https://www.w3.org/WAI/tutorials/page-structure/headings/

---

## Issue 74: All Blue Tees Golf Products
**Description:** Redundant links to the same destination increase keyboard navigation effort: The product card contains multiple keyboard-focusable links that navigate to the same product details page (e.g., the product image and the "SHOP NOW" button). While both links have meaningful accessible names and perform the same action, they create additional tab stops without providing any additional functionality.

Keyboard users must navigate through multiple controls to reach subsequent interactive elements, and screen reader users may hear repetitive link announcements for the same destination. This can increase navigation time and reduce efficiency, particularly on pages containing many product cards.

**Recommendation:** Where appropriate, reduce redundant interactive elements by:

Making the entire product card a single interactive link; or
Retaining only one primary link to the product details page while ensuring all relevant information remains accessible.

---

## Issue 75: All Blue Tees Golf Products
**Description:** Image link receives keyboard focus twice: The product image link receives keyboard focus twice during sequential keyboard navigation, even though it represents a single interactive element. As a result, keyboard users encounter duplicate focus stops before moving to the next interactive control.

This creates an inefficient and confusing keyboard navigation experience, requiring users to tab through the same control multiple times. Screen reader users may also hear the same link announced repeatedly, increasing cognitive load and making navigation more time-consuming.

Note: This issue was observed only on product cards that include the color swatch (quick-add) options. Product cards without the quick-add-swatches fieldset did not exhibit this behavior. This suggests the duplicate keyboard focus may be introduced by the quick-add swatch implementation or its associated scripting.

**Recommendation:** Ensure that the product image link is exposed as a single keyboard-focusable element. Review the implementation to identify and remove any duplicate focusable elements, overlapping links, cloned nodes, or JavaScript behavior causing the same link to receive focus multiple times.

Verify that each interactive element receives keyboard focus only once in the intended tab order.

---

## Issue 76: All Blue Tees Golf Products
**Description:** Color swatches are not keyboard accessible: The color swatches within the product cards are not operable using the keyboard. Keyboard users are unable to navigate to the individual swatch options using the Tab key or interact with them to select different product variants.

As a result, users who rely on a keyboard cannot access or select available color options before activating the "Shop Now" button. This creates a barrier for keyboard-only and screen reader users and may prevent them from purchasing their preferred product variant independently.

Note: This issue was observed on product cards that include the quick-add color swatches.

**Recommendation:** Ensure that each color swatch is fully keyboard accessible. Users should be able to:

Navigate to the swatch group using the keyboard.
Move between individual swatches using the Arrow keys, as expected for radio button groups.
Select a swatch using Space (or Enter, where appropriate).
Receive a visible keyboard focus indicator on the currently focused swatch.
Have the selected and focused state programmatically conveyed to assistive technologies.

If native radio buttons are visually hidden, ensure they remain keyboard focusable and are not removed from the accessibility tree or tab order.

---

## Issue 77: All Blue Tees Golf Products
**Description:** Insufficient color contrast for text: The contrast ratio between the foreground color of the white text with its red background color is below the required 4.5:1 ratio.

 Foreground colour: #FFFFFF
 Background colour: #FFFFFF
 Contrast ratio: 4:1

**Recommendation:** Make sure that the contrast ratio between the element and its background is of at least 4.5:1.

For color compliant options:
https://contrast-finder.tanaguru.com/
http://colorsafe.co/

Resources:
Understanding contrast (minimum):
https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html

Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text):
https://www.w3.org/TR/WCAG20-TECHS/G18.html

Contrast (minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

---

## Issue 78: All Blue Tees Golf Products
**Description:** Insufficient color contrast for text: The contrast ratio between the foreground color of the white text with its blue background color is below the required 4.5:1 ratio.

 Foreground colour: #FFFEFE
 Background colour: #7FA5F9
 Contrast ratio: 2.4:1

**Recommendation:** Make sure that the contrast ratio between the element and its background is of at least 4.5:1.

For color compliant options:
https://contrast-finder.tanaguru.com/
http://colorsafe.co/

Resources:
Understanding contrast (minimum):
https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html

Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text):
https://www.w3.org/TR/WCAG20-TECHS/G18.html

Contrast (minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

---

## Issue 79: All Blue Tees Golf Products
**Description:** Insufficient color contrast for text: The contrast ratio between the foreground color of the gray text with its blue background color is below the required 4.5:1 ratio.

 Foreground colour: #C1BFBF
 Background colour: #FFFCFC
 Contrast ratio: 1.8:1

**Recommendation:** Make sure that the contrast ratio between the element and its background is of at least 4.5:1.

For color compliant options:
https://contrast-finder.tanaguru.com/
http://colorsafe.co/

Resources:
Understanding contrast (minimum):
https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html

Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text):
https://www.w3.org/TR/WCAG20-TECHS/G18.html

Contrast (minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

---

## Issue 80: All Blue Tees Golf Products
**Description:** Insufficient color contrast for non-text content: The contrast ratio between the foreground color of the focus indicator with its background color is less than 3:1.

 Foreground colour: #7FA5F9
 Background colour: #FFFCFC
 Contrast ratio: 2.4:1

**Recommendation:** Ensure that the contrast ratio between the element and its background is of at least 3.0:1. 

Resources:
Non-text contrast:
https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html

Contrast (Minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

Color contrast analyser:
https://www.tpgi.com/color-contrast-checker/

---

## Issue 81: Captain Pro Golf Rangefinder
**Description:** Visible promotional information in the image is not conveyed through the text alternative: The promotional badge is implemented as an image that conveys meaningful information to sighted users. However, the image's alternative text (alt="Offer Bug for captain pro connected gps rangefinder") does not communicate the visible promotional information displayed within the image.

As a result, screen reader users are informed only that an "offer bug" is present but are not provided with the actual promotional message (for example, "100-Day Guarantee" or similar text displayed visually). This creates an information mismatch where meaningful content available visually is not made available to users of assistive technologies.

If the promotional badge communicates information that influences a purchasing decision or provides additional product information, an equivalent text alternative must convey the same information.

**Recommendation:** Provide alternative text that communicates the same meaningful information presented visually within the promotional badge. The alternative text should describe the promotional message rather than the presence of the image itself.

For example, if the badge displays "100-Day Guarantee", the alternative text should communicate that information.

Example include:
<span class="product__offer-bug">
    <img
        src="100_DAY_PDP_BUG.svg"
        alt="100-Day Money Back +Free shipping">
</span>

---

## Issue 82: Captain Pro Golf Rangefinder
**Description:** Feature names and descriptions should use description list markup: The feature names and their corresponding descriptions are currently marked up using heading elements (<h3> and <h5>). Although this is valid HTML, the content represents a series of terms and their associated descriptions rather than a document heading hierarchy.

Using heading elements for this type of content does not programmatically convey the relationship between each feature and its description. Screen reader users navigating by headings may also encounter unnecessary heading stops that do not represent distinct sections of the page.

A description list (<dl>, <dt>, and <dd>) is the more semantically appropriate markup for presenting feature names and their corresponding descriptions, allowing assistive technologies to correctly identify and announce the relationship between each term and its description.

**Recommendation:** Use a semantic description list (<dl>, <dt>, and <dd>) to represent the feature names and their corresponding descriptions, as this most accurately reflects the relationship between the content.

Alternatively, if the intention is to present this content using headings rather than a description list, ensure that the headings follow a logical hierarchy. For example, use an <h2> for the section heading elements for each individual feature title. The descriptive text should be marked up as paragraph content (<p>) instead of additional heading elements.

---

## Issue 83: Captain Pro Golf Rangefinder
**Description:** Strikethrough formatting used to indicate the original price is not conveyed to assistive technologies: The original product price is visually presented using strikethrough formatting to indicate that it is no longer the current price. However, this visual relationship is not programmatically conveyed to assistive technology users.

Screen readers typically announce only the text content (for example, "$39.50") and do not convey that the value is visually struck through or represents the previous/original price. As a result, users of assistive technologies may not understand that the displayed amount is the original price rather than the current selling price.

When visual styling is used to communicate meaningful information, an equivalent programmatic indication should also be provided.

**Recommendation:** Ensure the original price is programmatically identified as the previous or compare-at price rather than relying solely on visual strikethrough styling.

Provide descriptive text that is available to assistive technologies, such as "Original price" or "Was," before the compare-at price. If appropriate, the visual label may be hidden visually while remaining available to screen readers.

Example code:
<p class="price">

    <span class="visually-hidden">Original price:</span>
    <del aria-hidden="true">$39.50</del>
    <span class="visually-hidden">$39.50</span>

    <span class="visually-hidden">Current price:</span>
    <span>$29.50</span>

</p>

---

## Issue 84: Captain Pro Golf Rangefinder
**Description:** Meaningful information presented in the image is not conveyed through the text alternative: The product feature image contains multiple icons and accompanying text that communicate important product capabilities, including GPS distance measurements, brightness control, waterproof rating, shot tracking, rechargeable battery, Bluetooth connectivity, display features, and other specifications.

The alternative text identifies only the company logo and does not communicate the meaningful information presented within the image. As a result, screen reader users cannot access the same product feature information that is available visually to sighted users.

**Recommendation:** The image is intended to communicate product features, provide an equivalent text alternative that conveys the same information.

Because this image contains numerous feature descriptions, it should be treated as a complex informational image. Rather than placing all of the content within the alt attribute, provide:

a concise alt attribute identifying the image, and
an accessible HTML equivalent adjacent to the image or referenced using aria-describedby.

The accessible content should include all information presented within the image, including:

Front, Center, Back GPS Distances
Vibrant Brightness Control for all Conditions
IP67 Dust + Waterproof
"Find My" Rangefinder
Shot Tracking for Post Game Round Analysis
Rechargeable USB-C Battery
Flag Lock with Vibration
1200-Yard Range
Bluetooth Connected with GAME App Compatibility
Multi-Color OLED Display
Tour-Ready Slope Button
7X Magnification
Heavy-Duty Magnetic Strip

---

## Issue 85: Captain Pro Golf Rangefinder
**Description:** Informative image does not provide an alternative text: The informative image is implemented with an empty alternative text (alt=""), causing it to be ignored by assistive technologies.

Because the image conveys meaningful information, an empty alt attribute prevents screen reader users from accessing the information available to sighted users. As a result, users of assistive technologies may miss important content communicated by the image.

**Recommendation:** Provide meaningful alternative text that communicates the same purpose or information conveyed by the image.

The alternative text should describe the image's purpose or the information it communicates rather than its visual appearance. If the image contains complex information, provide a concise alt attribute and make the complete information available as accessible HTML adjacent to the image or by using an associated description (for example, aria-describedby).

Only use an empty alt attribute (alt="") when the image is purely decorative and does not convey information or functionality.

Example code:
<img
    src="Group_1410105141_1.png"
    alt="Captain Pro your secret to smarter golf">

---

## Issue 86: Captain Pro Golf Rangefinder
**Description:** Alternative text does not convey the meaningful information presented in the image: The hero image contains meaningful visual content and text that is available to sighted users. However, the image is provided with generic alternative text (alt="Hero Image"), which does not communicate the information presented within the image.

Generic alternative text such as "Hero Image" identifies only the presence of an image and does not provide an equivalent text alternative for the meaningful content it conveys. As a result, screen reader users are unable to access the same information that is available visually.

**Recommendation:** Replace the generic alternative text with text that accurately communicates the purpose and meaningful information presented in the image.

If the image contains a significant amount of text or complex promotional content, provide a concise alt attribute that identifies the image and make the complete content available as accessible HTML adjacent to the image or by using aria-describedby.

The alternative text should describe the purpose and information conveyed by the image rather than simply identifying it as a hero image.

---

## Issue 87: Captain Pro Golf Rangefinder
**Description:** Interactive rating filters are implemented within a data table: The review rating filters are implemented as interactive buttons (role="button") inside a table used for layout rather than for tabular data. Since the table does not represent a data relationship between rows and columns, screen reader users may incorrectly interpret the content as tabular information instead of a group of interactive filter controls. This can make the interface confusing and reduce navigation efficiency.

**Recommendation:** The content is intended to function as a set of filter controls rather than tabular data, replace the table markup with a semantically appropriate structure such as a list (<ul>/<li>) or a group of buttons contained within a <div> or <fieldset>. Reserve table markup only for genuine tabular data.

---

## Issue 88: Captain Pro Golf Rangefinder
**Description:** Insufficient color contrast for non-text content: The contrast ratio between the foreground color of the rating indicator with its background color is less than 3:1.

 Foreground colour: #FFFFFF
 Background colour: #F5F5F5
 Contrast ratio: 1.1:1

**Recommendation:** Ensure that the contrast ratio between the element and its background is of at least 3.0:1. 

Resources:
Non-text contrast:
https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html

Contrast (Minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

Color contrast analyser:
https://www.tpgi.com/color-contrast-checker/

---

## Issue 89: Captain Pro Golf Rangefinder
**Description:** Color alone used to indicate focus indicator: A change in color is used to visually convey the fcous indicator, and the contrast difference between the states is less than 3:1.

Contrast Details
Focus indicator color: #E8E8E8
Default Element color: #FFFFFF
Contrast Ratio: 1.2:1

**Recommendation:** Any information conveyed by color MUST be accompanied by a visible alternative (text, image, adequate contrast, etc.) that does not depend on color for meaning.

Fix this issue by doing the following:
1. Increase the contrast between the background colors of the different states to be at least 3.0 to 1.
2. Provide an additional visual indication of the change in state such as: a box around the control; an underline; an icon; change in text size, weight or font, etc. Ensure the additional indicator has contrast of at least 3.0 to 1 with its adjacent colors to also pass 1.4.11. Non-text Contrast.

Resources:
Using a contrast ratio of 3:1 with surrounding text and providing additional visual cues on focus for links or controls where colour alone is used to identify them:
https://www.w3.org/WAI/WCAG21/Techniques/general/G183

Failure due to creating links that are not visually evident without colour vision:
https://www.w3.org/TR/WCAG20-TECHS/F73.html

---

## Issue 90: Captain Pro Golf Rangefinder
**Description:** Review cards are focusable without an appropriate role or descriptive accessible name: Each review card is keyboard focusable (tabindex="0"), but it does not expose an appropriate interactive role or a descriptive accessible name. When the review card receives focus, screen readers announce the content in a non-descriptive manner, making it unclear that the element is interactive and activates a dialog containing the full review. Users relying on assistive technologies may not understand the purpose of the element or the action that will occur upon activation.

Additionally, activating the review card opens a dialog, but the triggering element does not programmatically indicate this behavior (e.g., using aria-haspopup="dialog"), resulting in an unexpected context change for screen reader users.

**Recommendation:** Use a native <button> element (or an element with role="button") for the interactive review card instead of a generic focusable <div>.
Provide a meaningful accessible name that clearly identifies the action, for example: "Open review by Tyler, rated 5 out of 5 stars, submitted on July 2, 2026."
Indicate that activating the control opens a dialog by exposing aria-haspopup="dialog".
Ensure the dialog itself implements role="dialog" (or alertdialog where appropriate), has an accessible name (aria-labelledby or aria-label), properly manages keyboard focus, and returns focus to the triggering review card when closed.

---

## Issue 91: Captain Pro Golf Rangefinder
**Description:** Review filter is not fully keyboard accessible due to container-level focus: The review rating distribution is implemented as a focusable container (role="region" with tabindex="0"), causing keyboard focus to land on the entire section before users can access the individual rating filter buttons. This creates an unnecessary focus stop and makes navigation less efficient. Additionally, the rating filter options are not implemented as a proper grouped control (for example, a radio group or list of buttons), preventing assistive technology users from understanding that these controls belong to the same filter set and allowing inefficient navigation between options.

Keyboard-only users must tab through an additional non-interactive container before reaching the actual controls, while screen reader users are not provided with a clear semantic relationship between the filter options or an indication that they form a single rating filter group.

**Recommendation:** Remove the unnecessary tabindex="0" from the container unless the region itself is intended to be interactive. Ensure keyboard focus lands directly on the individual rating filter controls.

Group the rating options using an appropriate semantic structure, such as:

A radiogroup containing radio buttons if only one rating can be selected at a time, or
A semantically grouped list of buttons if multiple selections are supported.

Ensure each option exposes its current selected state programmatically (aria-checked or aria-pressed, as appropriate) and that users can efficiently navigate between the options using standard keyboard interaction patterns.

---

## Issue 92: Captain Pro Golf Rangefinder
**Description:** Sort menu button does not convey expanded/collapsed state to assistive technologies: The sort reviews button opens a menu containing sorting options; however, it does not programmatically expose its current state (expanded or collapsed) to assistive technologies. The button only provides an accessible name ("Sort reviews by menu") and lacks attributes such as aria-expanded and aria-controls.

As a result, screen reader users cannot determine whether the sort menu is currently open or closed after activating the button. This creates uncertainty when interacting with the control and may lead users to believe their action was unsuccessful.

**Recommendation:** Ensure the button exposes its current state programmatically by:

Adding aria-expanded="false" when the menu is collapsed and updating it to aria-expanded="true" when the menu is expanded.
Using aria-controls to reference the associated menu container.
Ensuring the menu is implemented using appropriate menu/listbox semantics and that focus is managed correctly when the menu opens and closes.

---

## Issue 93: Captain Pro Golf Rangefinder
**Description:** Write a review button does not identify that it opens a dialog: The "Write a review" button opens a modal dialog; however, it does not programmatically indicate that it triggers a dialog. The button is missing the aria-haspopup="dialog" attribute, which informs assistive technologies that activating the control will open a dialog.

As a result, screen reader users are not provided with advance notice that a context change will occur, making the interaction less predictable.

**Recommendation:** Ensure the button identifies that it opens a dialog by adding aria-haspopup="dialog". Additionally, associate the button with the dialog using aria-controls (where applicable), move keyboard focus to the dialog when it opens, trap focus within the dialog while it is displayed, and return focus to the triggering button when the dialog is closed.

---

## Issue 94: Captain Pro Golf Rangefinder
**Description:** FAQ accordion is not implemented as an accessible expandable control: The FAQ accordion headers are implemented using non-semantic <div> elements that are visually interactive but are not exposed as interactive controls to assistive technologies. The accordion items are not keyboard accessible and do not provide the required semantic information, including their role and expanded/collapsed state. Additionally, the relationship between each accordion header and its associated content panel is not programmatically defined.

As a result, keyboard users cannot operate the accordion using standard keyboard interactions, and screen reader users are unable to identify the elements as expandable controls or determine whether an item is expanded or collapsed.

**Recommendation:** Implement each FAQ header as a native <button> element or an element with role="button" that supports keyboard interaction (Enter and Space). Expose the current state using aria-expanded, associate the header with its content panel using aria-controls, and ensure the content panel references its controlling header using aria-labelledby. The accordion should follow the WAI-ARIA Accordion Authoring Pattern to provide a consistent and accessible experience.

---

## Issue 95: Captain Pro Golf Rangefinder
**Description:** Missing table caption describing the purpose of the comparison table: The product comparison table does not include a programmatically associated <caption> element describing the purpose of the table. As a result, screen reader users are not informed about what the table represents before navigating through its rows and columns. They must explore multiple headers and cells to determine that the table compares features across different products, increasing cognitive effort and reducing efficiency.

**Recommendation:** Add a descriptive <caption> element as the first child of the <table> to clearly identify the purpose of the table (e.g., "Comparison of Series 3 Max+, Captain Air, and Captain Pro features"). Ensure the caption is programmatically associated with the table and accurately describes its content. If a visible caption is not desired, it may be visually hidden while remaining available to assistive technologies.

---

## Issue 96: Captain Pro Golf Rangefinder
**Description:** Custom checkbox is not fully keyboard and screen reader accessible: The custom checkbox is not fully accessible to keyboard and assistive technology users. During testing, the checkbox could not be reliably operated using the keyboard, and its checked/unchecked state was not consistently conveyed to screen readers. As a result, users who rely on keyboard navigation or assistive technologies may be unable to select or deselect the option, preventing them from enabling the associated membership offer.

**Recommendation:** Implement the checkbox using the native HTML <input type="checkbox"> without interfering with its default keyboard behavior. Ensure the checkbox:

Is reachable using the Tab key.
Can be toggled using the Spacebar.
Exposes its checked and unchecked state programmatically to assistive technologies.
Has an accessible name that includes the associated label text.
If a custom checkbox implementation is used, apply the appropriate ARIA semantics (e.g., role="checkbox" and dynamically update aria-checked) while preserving full keyboard operability.

---

## Issue 97: Captain Pro Golf Rangefinder
**Description:** Thumbnail gallery does not expose the currently selected image: The thumbnail navigation visually indicates the active image using the is-active class, but this state is not conveyed programmatically. Users of assistive technologies cannot determine which thumbnail corresponds to the currently displayed product image.

**Recommendation:** Expose the selected thumbnail using aria-current="true" or aria-selected="true" and update the state whenever a different image is selected.

---

## Issue 98: Captain Pro Golf Rangefinder
**Description:** Inactive carousel slides remain in the accessibility tree: Inactive slides remain present in the DOM and only use aria-hidden="true". If focusable elements within hidden slides are not removed from the tab order or otherwise managed, assistive technologies and keyboard users may encounter hidden or inactive content.

**Recommendation:** Ensure that only the active slide is exposed to assistive technologies. Remove focusability from interactive elements within inactive slides (e.g., using tabindex="-1" or the inert attribute where supported), and update the accessibility tree dynamically as the active slide changes.

---

## Issue 99: Captain Pro Golf Rangefinder
**Description:** Product image carousel is not announced as a carousel: The product image gallery is implemented as a carousel; however, it is not programmatically identified as one. The carousel container does not expose an accessible name, role, or instructions indicating that it contains multiple product images. Screen reader users may not understand that they are interacting with an image carousel or how to navigate through the available images.

**Recommendation:** Programmatically identify the carousel using an appropriate landmark or grouping (e.g., role="region" or role="group") and provide a descriptive accessible name such as "Product image gallery" using aria-label or aria-labelledby. If keyboard interaction is supported, provide concise instructions for navigating the carousel.

---

## Issue 100: Captain Pro Golf Rangefinder
**Description:** Insufficient color contrast for text: The contrast ratio between the foreground color of the gray text with its blue background color is below the required 4.5:1 ratio.

 Foreground colour: #505050
 Background colour: #000000
 Contrast ratio: 2.6:1

**Recommendation:** Make sure that the contrast ratio between the element and its background is of at least 4.5:1.

For color compliant options:
https://contrast-finder.tanaguru.com/
http://colorsafe.co/

Resources:
Understanding contrast (minimum):
https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html

Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text):
https://www.w3.org/TR/WCAG20-TECHS/G18.html

Contrast (minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

---

## Issue 101: Captain Pro Golf Rangefinder
**Description:** Video does not provide play and pause controls: The promotional video starts playing automatically in a continuous loop (autoplay and loop) and does not provide visible controls to play, pause, or stop the playback. Users, particularly keyboard-only users and users with cognitive, attention, or vestibular disabilities, cannot pause or stop the moving content, which may be distracting and interfere with reading or interacting with other page content.

**Recommendation:** Provide accessible playback controls that allow users to play, pause, and stop the video using both keyboard and assistive technologies. Ensure the controls are keyboard operable, have descriptive accessible names, and receive visible keyboard focus. If the video plays automatically, provide a pause control that is available immediately when the video begins playing.

---

## Issue 102: Captain Pro Golf Rangefinder
**Description:** Incorrect heading level: Incorrect heading level <h4> provided for 'CAPTAIN PRO CONNECTED GPS RANGEFINDER' instead of <h2>.

**Recommendation:** Make sure heading levels are structured in a hierarchical manner. This makes navigation much faster for screen reader and keyboard users.

In this case, replace <h4> tag with <h2> element.

Example code:
<h2>CAPTAIN PRO CONNECTED GPS RANGEFINDER</h2>

Resources
HeadingsMap extension:
https://chrome.google.com/webstore/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi

Headings and page structure:
https://www.w3.org/WAI/tutorials/page-structure/headings/

---

## Issue 103: Captain Pro Golf Rangefinder
**Description:** Add to Cart button does not provide a descriptive accessible name: The "Add to Cart" button uses the accessible name "ADD TO CART PRODUCTS", which is generic and does not identify the specific product being added to the cart. When multiple "Add to Cart" buttons are present across the website (e.g., product listings, recommendations, or related products), screen reader users cannot determine which product each button is associated with.

**Recommendation:** Ensure the button's accessible name clearly identifies the associated product. Include the product name within the accessible name, for example, "Add Captain Pro Connected Rangefinder to cart". This can be achieved using aria-label, aria-labelledby, or by programmatically associating the button with the corresponding product title.

---

## Issue 104: Captain Pro Golf Rangefinder
**Description:** Keyboard focus is not moved to the dialog and the dialog is not announced when opened: When the "Add to Cart" button is activated, a modal dialog is displayed visually; however, keyboard focus remains on the underlying page instead of moving into the dialog. Additionally, the appearance of the dialog is not announced by screen readers, preventing users from being informed that new content requiring interaction has opened. As a result, keyboard and screen reader users may continue interacting with the background content without realizing that a modal dialog is active.

**Recommendation:** When the dialog opens:

Programmatically move keyboard focus to the dialog, preferably to the dialog heading or the first interactive element.
Ensure the dialog has an accessible name using aria-labelledby or aria-label.
Trap keyboard focus within the dialog until it is dismissed.
Return keyboard focus to the "Add to Cart" button (or the element that opened the dialog) when the dialog is closed.
Ensure assistive technologies announce the dialog upon opening by correctly implementing the modal dialog pattern (role="dialog" with aria-modal="true" and proper focus management).

---

## Issue 105: Captain Pro Golf Rangefinder
**Description:** Insufficient color contrast for non-text content: The contrast ratio between the foreground color of the 'X' close icon with its background color is less than 3:1.

 Foreground colour: #B2B2B2
 Background colour: #FFFFFF
 Contrast ratio: 2.1:1

**Recommendation:** Ensure that the contrast ratio between the element and its background is of at least 3.0:1. 

Resources:
Non-text contrast:
https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html

Contrast (Minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

Color contrast analyser:
https://www.tpgi.com/color-contrast-checker/

---

## Issue 106: About Blue Tees Golf
**Description:** Insufficient color contrast for non-text content: The contrast ratio between the foreground color of the timeline navigation indicator with its background color is less than 3:1.

 Foreground colour: #D9D9D9
 Background colour: #FFFCFC
 Contrast ratio: 1.4:1

**Recommendation:** Ensure that the contrast ratio between the element and its background is of at least 3.0:1. 

Resources:
Non-text contrast:
https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html

Contrast (Minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

Color contrast analyser:
https://www.tpgi.com/color-contrast-checker/

---

## Issue 107: About Blue Tees Golf
**Description:** Insufficient color contrast for text: The contrast ratio between the foreground color of the gray text with its background color is below the required 4.5:1 ratio.

 Foreground colour: #C5C5C5
 Background colour: #FFFCFC
 Contrast ratio: 1.7:1

**Recommendation:** Make sure that the contrast ratio between the element and its background is of at least 4.5:1.

For color compliant options:
https://contrast-finder.tanaguru.com/
http://colorsafe.co/

Resources:
Understanding contrast (minimum):
https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html

Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text):
https://www.w3.org/TR/WCAG20-TECHS/G18.html

Contrast (minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

---

## Issue 108: About Blue Tees Golf
**Description:** Decorative images use identical non-descriptive alternative text: Multiple decorative or illustrative images on the page use the identical alternative text "Pros Card Image", which does not describe the image's content, purpose, or distinguish it from other images. If these images are purely decorative, exposing them to assistive technologies creates unnecessary verbosity and increases the amount of irrelevant information announced by screen readers. If the images convey meaningful information, the repeated generic alternative text fails to communicate their unique content or purpose.

**Recommendation:** Review the purpose of each image and provide appropriate alternative text:

If an image is decorative and conveys no information, use an empty alt="" (or implement it as a CSS background image) so it is ignored by assistive technologies.
If an image is informative, provide concise, unique, and descriptive alternative text that conveys the image's content or purpose within the page context.
Avoid using generic or repeated alternative text such as "Image," "Photo," or "Pros Card Image" for multiple images unless they truly represent the same content.

---

## Issue 109: About Blue Tees Golf
**Description:** Insufficient color contrast for text: The contrast ratio between the foreground color of the 'OUR MISSION' link text and its background color is below the required 4.5:1 ratio.

 Foreground colour: #80B2FF
 Background colour: #1159F4
 Contrast ratio: 2.6:1

**Recommendation:** Make sure that the contrast ratio between the element and its background is of at least 4.5:1.

For color compliant options:
https://contrast-finder.tanaguru.com/
http://colorsafe.co/

Resources:
Understanding contrast (minimum):
https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html

Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text):
https://www.w3.org/TR/WCAG20-TECHS/G18.html

Contrast (minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

---

## Issue 110: About Blue Tees Golf
**Description:** Missing heading mark-up: The 'THE Rules we play by...' text constitute as heading but not marke as such.

**Recommendation:** Use a heading tag <h2> for the mentioned text.

Example code:
<h2 class="font-large custom_heading">
          THE Rules <br>
          we play by...
        </h2>

Resources:
Organizing a page using headings:
https://www.w3.org/WAI/WCAG21/Techniques/general/G141

---

## Issue 111: About Blue Tees Golf
**Description:** Carousel navigation does not communicate slide position: The Previous and Next controls do not communicate the currently displayed slide or the total number of slides to assistive technology users. Consequently, screen reader users cannot determine their current position within the carousel or understand how many slides are available.

**Recommendation:** Update the accessible name or associated status message after each navigation to announce the current slide position (e.g., "Slide 2 of 5"). Ensure this information is available programmatically and announced when the displayed slide changes.

---

## Issue 112: About Blue Tees Golf
**Description:** Active timeline item is indicated visually only: The currently active timeline item is identified only through visual styling (such as color, highlighting, or font changes) and is not programmatically conveyed to assistive technologies. As a result, screen reader users cannot determine which timeline item is currently active or selected.

**Recommendation:** Programmatically expose the active state using the appropriate ARIA attribute based on the widget pattern, such as aria-current="step" or aria-selected="true". Ensure only the active timeline item exposes the current or selected state so assistive technology users receive the same information available visually.

---

## Issue 113: About Blue Tees Golf
**Description:** Carousel lacks semantic structure: The carousel is not exposed as a recognizable carousel component to assistive technologies. It lacks appropriate semantic structure, including a programmatic region, descriptive accessible name, and carousel role description. As a result, screen reader users may not recognize the component as a carousel or understand its purpose and boundaries.

**Recommendation:** Implement the carousel using appropriate semantics. Wrap the carousel in a landmark or region (<section> with aria-label or role="region"), provide a meaningful accessible name, and include aria-roledescription="carousel" where appropriate. Ensure the carousel structure follows the WAI-ARIA Authoring Practices for carousel widgets.

---

## Issue 114: About Blue Tees Golf
**Description:** Carousel slide changes are not announced to screen readers: When the carousel automatically advances or users navigate between slides using the carousel controls, the updated slide content is not announced by screen readers. As a result, screen reader users may not be aware that new content has been displayed, causing them to miss important information presented within the carousel.

**Recommendation:** Implement an appropriate ARIA live region (e.g., aria-live="polite" or role="status") to announce slide changes without shifting keyboard focus. Ensure only the newly displayed slide is announced and avoid repetitive or excessive announcements. If the carousel auto-rotates, provide controls to pause, stop, and resume the rotation.

---

## Issue 115: About Blue Tees Golf
**Description:** Timeline navigation items are not keyboard accessible and lack semantic roles: The timeline navigation is implemented using interactive <div> elements instead of native interactive elements such as <button>. These elements are not keyboard focusable, do not expose their interactive role to assistive technologies, and cannot be operated using standard keyboard commands.

As a result, keyboard-only users cannot navigate between timeline milestones, and screen reader users are not informed that these elements are interactive controls for changing the displayed slide.

**Recommendation:** Implement each timeline item as a native <button> (preferred) or an <a> element if it performs navigation.

Ensure that:
Each timeline item is keyboard focusable.
Users can activate a timeline item using Enter and Space.
The currently selected timeline item is programmatically identified using aria-current, aria-selected, or aria-pressed as appropriate.
If the timeline controls a carousel, expose the appropriate relationship using ARIA where needed and ensure the active slide is updated for assistive technologies.
Avoid using non-semantic <div> elements for interactive functionality.

---

## Issue 116: About Blue Tees Golf
**Description:** Unnecessary use of heading: The below mentioned text marked with heading tag, but it does not function as a title or subtitle.
- Performance-first. Player-priced. Blue Tees puts pro-level tech in
every player’s hands—minus the premium price tag.
- paragraph text pesent within 'BUILT BY GOLFERS WHO REFUSED TO SETTLE' section.
- The best gear shouldn’t be reserved for tour players
-  Golf is already hard. Your gear shouldn’t be. 
- We obsess over how it looks, feels, and performs. 
- It’s the point. And we’re here to bring it back. 
- TO EQUIP GOLFERS EVERYWHERE WITH THE TOOLS THEY NEED TO SHOW UP WITH CONFIDENCE, SWING WITH CLARITY & PLAY WITHOUT COMPROMISE.
- From tour veterans to weekend warriors, our ambassadors represent every level
of the game—and they’re all helping shape what comes next. 
- Premium gear. Real performance. Powered by a community
that’s rewriting the rules. Come play the game your way.

**Recommendation:** Content that doesn't function as a title or subtitle should not be tagged as a heading. 
Instead of using a heading tag, use <span> or <div> tags and use CSS to maintain the visual effect.

A properly structured heading hierarchy helps screen reader users navigate the page.

Resource:
Organizing a page using headings:
https://www.w3.org/WAI/WCAG21/Techniques/general/G141

---

## Issue 117: Sign in to your account
**Description:** Page is missing a main landmark: The page does not include a main landmark (<main> element or role="main"), preventing assistive technology users from identifying the primary content area. Without a main landmark, screen reader users cannot use landmark navigation to quickly skip repetitive content (such as headers and navigation) and move directly to the main content.

Each page should contain a single, programmatically identifiable main landmark that represents the primary content of the page.

**Recommendation:** Add a single <main> element (preferred) or apply role="main" to the container that wraps the primary page content.

Ensure that:

Only one main landmark is present on the page.
The main landmark contains the page's primary content and excludes repeated content such as headers, navigation menus, sidebars, and footers.
The landmark remains present and correctly identifies the main content across all page states.

---

## Issue 118: Sign in to your account
**Description:** Validation error message is not announced to screen readers: When the phone number field is submitted without a value, the validation message "Phone number is required" is displayed visually; however, it is not announced by screen readers. As a result, screen reader users may not be aware that a validation error has occurred or understand why the form submission failed.

Error messages must be programmatically associated with the corresponding form field and automatically announced when they appear so users receive immediate feedback.

**Recommendation:** Ensure that validation errors are exposed to assistive technologies by:

Associating the error message with the phone number input using aria-describedby.
Setting aria-invalid="true" on the input when validation fails.
Announcing dynamically displayed error messages using an appropriate live region (e.g., role="alert" or aria-live="assertive").
Ensuring focus remains on, or is moved to, the invalid field so users can easily identify and correct the error.

---

## Issue 119: Sign in to your account
**Description:** Country list items are not keyboard accessible: When the country code picker is opened, the country list items are not operable using the keyboard. Keyboard users are unable to navigate through the available countries using the Up/Down Arrow keys, move focus to a desired option, or select a country using the Enter or Space key. As a result, the country selection can only be completed using a pointing device.

This creates a significant accessibility barrier for users who rely on a keyboard, including people with motor disabilities and screen reader users. An accessible combobox/listbox must support keyboard navigation and selection in accordance with the expected interaction pattern.

**Recommendation:** Implement the country picker as an accessible combobox with a listbox popup following the WAI-ARIA Authoring Practices.

Ensure that:
Users can open the country list using Enter, Space, or Alt + Down Arrow.
Focus moves into the listbox (or remains on the combobox while using aria-activedescendant).
Users can navigate between country options using the Up and Down Arrow keys.
Home and End keys move to the first and last options where applicable.
Users can select the focused country using Enter or Space.
Escape closes the listbox and returns focus to the triggering control.
Every country option is keyboard focusable (directly or via aria-activedescendant) and exposes the correct role="option" with its selected state (aria-selected).

---

## Issue 120: Sign in to your account
**Description:** Search field does not have an accessible name: The Search Country Code input field does not have a programmatically associated accessible name. Although placeholder text is present, placeholders do not serve as reliable accessible names and are not a substitute for a visible or programmatically associated label. As a result, screen reader users may not be informed of the purpose of the input or may receive inconsistent announcements depending on the assistive technology and browser being used.

This makes it difficult for users of assistive technologies to understand the purpose of the field and search for a country code efficiently.

**Recommendation:** Provide a programmatically associated accessible name for the search field by:

Associating a visible <label> element with the input using the for and id attributes.
If a visible label cannot be provided, use aria-label="Search country code" or aria-labelledby to reference an existing descriptive label.
Do not rely solely on placeholder text to identify the purpose of the input, as placeholders disappear when users begin typing and are not consistently announced as accessible names.

---

## Issue 121: Sign in to your account
**Description:** Country code selector dialog is not keyboard accessible and lacks screen reader support: The Country Code input functions as a control that opens a country selection dialog; however, it is not fully accessible to keyboard and screen reader users. The control is presented as a read-only text input and does not expose its interactive behavior or dialog relationship through appropriate semantics. When activated, the country selection dialog cannot be operated effectively using only the keyboard, preventing users from selecting a country code without a mouse.

Additionally, assistive technologies are not informed that activating the control opens a dialog. Focus management is not implemented correctly when the dialog opens, making it difficult or impossible for keyboard and screen reader users to perceive, navigate, and interact with the available country options.

This creates a significant barrier for users who rely on keyboard navigation or assistive technologies to complete the phone number field.

**Recommendation:** Update the country code selector to follow the WAI-ARIA Authoring Practices for a dialog or combobox, as appropriate.

Use an interactive element (such as a <button> or properly implemented combobox) instead of a read-only text input.
Expose the control with appropriate semantics, such as aria-haspopup="dialog".
Ensure the control has a clear, user-friendly accessible name (e.g., "Select country code").
When the dialog opens:
Move keyboard focus into the dialog.
Ensure all interactive elements within the dialog are keyboard accessible.
Support keyboard navigation (Tab, Shift+Tab, Arrow keys where applicable, Enter/Space, and Escape).
Trap focus within the dialog while it is open.
Return focus to the triggering control when the dialog closes.
Ensure screen readers announce the dialog opening, its title, and the available options.
Provide appropriate roles and properties (e.g., role="dialog" with an accessible name) so assistive technologies can correctly identify and interact with the component.

---

## Issue 122: Sign in to your account
**Description:** Insufficient color contrast for text: The contrast ratio between the foreground color of the placeholder text with its background color is below the required 4.5:1 ratio.

 Foreground colour: #5B5B5B
 Background colour: #000000
 Contrast ratio: 3.1:1

**Recommendation:** Make sure that the contrast ratio between the element and its background is of at least 4.5:1.

For color compliant options:
https://contrast-finder.tanaguru.com/
http://colorsafe.co/

Resources:
Understanding contrast (minimum):
https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html

Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text):
https://www.w3.org/TR/WCAG20-TECHS/G18.html

Contrast (minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

---

## Issue 123: Sign in to your account
**Description:** Country code field uses an unclear accessible name: The country code input uses aria-label="country_code", which is announced by screen readers as "country underscore code" or similar. This technical identifier is not meaningful to users and does not clearly communicate the purpose of the field.

**Recommendation:** Replace the technical accessible name with a user-friendly label, such as "Country code", and ensure it matches the visible label.

---

## Issue 124: Sign in to your account
**Description:** Phone number fields do not have visible labels: The country code field and phone number input rely on aria-label ("country_code" and "phone") and a placeholder ("Phone") instead of visible labels. As a result, sighted users, including those with cognitive disabilities, may have difficulty understanding the purpose of each field once the placeholder disappears after input.

Additionally, the country code field is labeled as "country_code", which is not user-friendly and may be announced literally by assistive technologies, reducing clarity.

**Recommendation:** Provide persistent, visible <label> elements for both the Country Code and Phone Number fields.
Associate each label with its corresponding input using the for and id attributes.
Do not rely on placeholders as the primary means of identifying form fields.
Replace the accessible name "country_code" with a meaningful label such as "Country code".

---

## Issue 125: Sign in to your account
**Description:** Missing visual focus indicator: The "Send Code", and "Create Account" control lacks visual focus indicator.

**Recommendation:** It is necessary to provide a clearly visible keyboard focus indicator for active elements (choose a color that will not merge with the background).
 
A keyboard focus indicator should be visible on all the interactive elements. Having a visual reference as to where the user is positioned on the page is important to make navigation easier for keyboard-only users and people with cognitive disabilities or attention disorders.

Provide a visible border/outline on each interactive element using CSS.

The focus outline should have a minimum contrast of 3:1 

Resources:
https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-focus-visible.html
 
Using CSS to change the presentation of a user interface component when it receives focus:
https://www.w3.org/TR/2016/NOTE-WCAG20-TECHS-20161007/C15

---

## Issue 126: Sign in to your account
**Description:** Missing heading mark-up: The 'Sign in to your account' text image constitute as heading but not marke as such.

**Recommendation:** Use a heading tag <h1> for the mentioned text.

Example code:
<h1><img _ngcontent-ng-c2681746120="" src="./assets/images/SigninAccount.svg" alt="Sign in to your account"></h1>

Resources:
Organizing a page using headings:
https://www.w3.org/WAI/WCAG21/Techniques/general/G141

---

## Issue 127: Latest Top Golf News, Product Updates, and Tips
**Description:** Insufficient color contrast for text: The contrast ratio between the foreground color of the current page gray text with its background color is below the required 4.5:1 ratio.

 Foreground colour: #B2B0B0
 Background colour: #FFFCFC
 Contrast ratio: 2.1:1

**Recommendation:** Make sure that the contrast ratio between the element and its background is of at least 4.5:1.

For color compliant options:
https://contrast-finder.tanaguru.com/
http://colorsafe.co/

Resources:
Understanding contrast (minimum):
https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html

Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text):
https://www.w3.org/TR/WCAG20-TECHS/G18.html

Contrast (minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

---

## Issue 128: Latest Top Golf News, Product Updates, and Tips
**Description:** Pagination navigation lacks semantic structure and descriptive accessible names: The pagination component is not fully accessible because it lacks the semantic markup and descriptive accessible names needed for assistive technology users.

The pagination is not contained within a semantic navigation landmark (e.g., <nav>), making it difficult for screen reader users to identify it as a pagination control.
The navigation landmark does not provide an accessible name (e.g., aria-label="Pagination"), preventing users from distinguishing it from other navigation regions on the page.
Individual page links are announced only as numbers (e.g., "2", "3"), which do not clearly convey their purpose when navigating by links.
The current page is not programmatically identified using aria-current="page", making it difficult for screen reader users to determine which page is currently active.

As a result, screen reader users may have difficulty understanding the purpose of the control, identifying the current page, and navigating efficiently between pages.

**Recommendation:** Implement the pagination using semantic HTML and appropriate ARIA attributes. Specifically:

Wrap the pagination in a <nav> element with a descriptive accessible name, for example:

<nav aria-label="Pagination">
Mark the active page with aria-current="page".
Provide descriptive accessible names for page links, such as:
"Go to page 2"
"Go to page 3"
"Next page"
"Previous page"
Ensure the Next and Previous controls have descriptive accessible names that clearly communicate their function.
Use semantic list markup (<ul> and <li>) to represent the pagination items where appropriate, improving the structural relationship between controls.

---

## Issue 129: PRODUCT MANUALS
**Description:** Redundant links create unnecessary keyboard focus stops: Each article card contains multiple focusable links (e.g., the featured image and the article title) that have the same accessible name and navigate to the same destination. As a result, keyboard users must tab through multiple links that perform the identical action before reaching the next interactive element.

While this implementation does not prevent users from accessing the content, it creates unnecessary keyboard focus stops and increases the effort required to navigate the page. Users of screen readers and keyboard-only navigation may perceive the repeated links as redundant, making browsing less efficient, particularly on pages containing numerous article cards.

**Recommendation:** Reduce redundant focusable elements by ensuring each article card exposes only one primary interactive link where feasible. Consider one of the following approaches:

Make the entire article card a single clickable link.
Remove one of the duplicate links if it provides no additional functionality.
If separate visual links are retained for design purposes, ensure only one is keyboard-focusable while preserving the intended visual presentation.

This reduces unnecessary tab stops and improves the efficiency of keyboard navigation without affecting functionality.

---

## Issue 130: PRODUCT MANUALS
**Description:** Incorrect heading level: Incorrect heading level <h3> provided instead of <h4> for the 'Best for:' text.

**Recommendation:** Make sure heading levels are structured in a hierarchical manner. This makes navigation much faster for screen reader and keyboard users.

In this case, replace <h6> tag with <h2> element.

Example code:
<h2 class="dashboard-metric__name">Overall Inspection Score</h2>
(...)
<h2 class="dashboard-metric__name">Paint Inspections</h2>

Resources
HeadingsMap extension:
https://chrome.google.com/webstore/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi

Headings and page structure:
https://www.w3.org/WAI/tutorials/page-structure/headings/

---

## Issue 131: PRODUCT MANUALS
**Description:** Multiple links with the same accessible name lead to different destinations: Multiple links on the page use the identical accessible name, "DOWNLOAD MANUAL", but point to different PDF documents depending on the associated product.

Screen reader users navigating by links hear multiple instances of "DOWNLOAD MANUAL" without any indication of which product each link belongs to. This makes it difficult to determine the correct link to activate without reading the surrounding context.

**Recommendation:** Provide each link with a unique and descriptive accessible name that identifies the associated product. For example:

Download Captain Pro Manual (PDF)
Download Player+ Manual (PDF)
Download Series 3 Max Manual (PDF)

If the visible text must remain "DOWNLOAD MANUAL", use an accessible name (e.g., aria-label or visually hidden text) that includes the product name while preserving the visual design.

---

## Issue 132: Terms And Conditions
**Description:** Hidden empty links receive keyboard focus: Multiple empty anchor (<a>) elements are present across the page and receive keyboard focus despite containing no accessible name or visible content. 

When keyboard users navigate using the Tab key, focus lands on these empty links. Screen readers announce them as "blank" or "link" without any descriptive text, making it impossible for users to determine their purpose or destination. This creates unnecessary tab stops and degrades the keyboard navigation experience.

**Recommendation:** Remove empty links that do not provide any functionality.
If the link is intended to be interactive, provide a meaningful accessible name using visible text or an appropriate aria-label.
Ensure decorative or hidden elements do not receive keyboard focus.
Verify that only functional, perceivable interactive elements are included in the page's tab order.

---

## Issue 133: Terms And Conditions
**Description:** Multiple blank lines are announced by screen readers due to excessive line break elements: The page uses multiple <br> elements to create visual spacing between content. When navigating with a screen reader, these line breaks are announced as "blank" multiple times, resulting in unnecessary verbosity and interrupting the reading flow.

This creates a poor user experience, as users must listen to repeated "blank" announcements before reaching the next meaningful content.

**Recommendation:** Avoid using multiple <br> elements solely for visual spacing.
Use CSS properties such as margin or padding to create spacing between elements.
Structure content using appropriate semantic elements (e.g., headings, paragraphs, lists) instead of repeated line breaks.
Ensure that only meaningful content is exposed to assistive technologies.

---

## Issue 134: Terms And Conditions
**Description:** Insufficient color contrast for non-text content: The contrast ratio between the foreground color of the active link underline with its background color is less than 3:1.

 Foreground colour: #D9D6D6
 Background colour: #FFFCFC
 Contrast ratio: 1.4:1

**Recommendation:** Ensure that the contrast ratio between the element and its background is of at least 3.0:1. 

Resources:
Non-text contrast:
https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html

Contrast (Minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

Color contrast analyser:
https://www.tpgi.com/color-contrast-checker/

---

## Issue 135: Terms And Conditions
**Description:** Color alone used to indicate link: The blue link text is visually indistinguishable from the surrounding text.

 Foreground colour: #3030F1
 Background colour: #595959
 Contrast ratio: 1.1:1

**Recommendation:** Ensure that links in their default state are visually distinguishable using additional cues such as underline, bold text, or increased contrast to differentiate them from surrounding text. 

Refer to WCAG 2.2 – 1.4.1 (Use of Color) for guidance:
https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html

---

## Issue 136: Terms And Conditions
**Description:** Missing list mark-up: Missing list mark-up for the following links:
1. OUR SERVICES
2. INTELLECTUAL PROPERTY RIGHTS
3. USER REPRESENTATIONS
4. USER REGISTRATION 
 5. PRODUCTS 
 6. PURCHASES AND PAYMENT
7. RETURN/REFUNDS POLICY
8. PROHIBITED ACTIVITIES 
9. USER GENERATED CONTRIBUTIONS 
10. CONTRIBUTION LICENSE 
 11. GUIDELINES FOR REVIEWS 
 12. SOCIAL MEDIA 
 13. THIRD-PARTY WEBSITES AND CONTENT 
 14. ADVERTISERS 
15. SERVICES MANAGEMENT 
 16. PRIVACY POLICY
 17. DIGITAL MILLENNIUM COPYRIGHT ACT (DMCA) NOTICE AND POLICY
18. TERM AND TERMINATION 
19. MODIFICATIONS AND INTERRUPTIONS 
20. GOVERNING LAW 
21. DISPUTE RESOLUTION 
22. CORRECTIONS 
23. DISCLAIMER 
24. LIMITATIONS OF LIABILITY 
25. INDEMNIFICATION 
26. USER DATA 
27. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES 
 28. CALIFORNIA USERS AND RESIDENTS 
29. MISCELLANEOUS 
30. CONTACT US

**Recommendation:** 1. Wrap each list item inside a <li> tag. 
2. Wrap the full list inside a <ol> tag.
3. Provide the desired visual style using CSS.

Resources:
Page structure, Lists:
https://www.w3.org/WAI/tutorials/page-structure/content/#lists

---

## Issue 137: Terms And Conditions
**Description:** Missing heading mark-up: The below mentioned text are constitute as heading but not marke as such.
- Our intellectual property
- Your use of our Services
- Your submissions and contributions
- Copyright infringement
- Notifications
- Counter Notification
- Informal Negotiations
- Binding Arbitration
- Restrictions
- Exceptions to Informal Negotiations and Arbitration

**Recommendation:** Use a heading tag <h3> for the mentioned text.

Resources:
Organizing a page using headings:
https://www.w3.org/WAI/WCAG21/Techniques/general/G141

---

## Issue 138: Terms And Conditions
**Description:** Missing heading mark-up: The below mentioned text are constitute as heading but not marke as such.
- AGREEMENT TO OUR LEGAL TERMS
- TABLE OF CONTENTS
- 1. OUR SERVICES
- 2. INTELLECTUAL PROPERTY RIGHTS
- 3. USER REPRESENTATIONS
- (...)
- 30. CONTACT US

**Recommendation:** Use a heading tag <h2> for the mentioned text.

Resources:
Organizing a page using headings:
https://www.w3.org/WAI/WCAG21/Techniques/general/G141

---

## Issue 139: Register
**Description:** Success message is not announced to screen reader users after form submission: After the user successfully submits the form, a success message ("Thank you for submitting your warranty application!" and "Check your email for a confirmation message.") is displayed visually. However, the message is not automatically announced by screen readers because it is not exposed as a live region or focus is not moved to the newly displayed content.

As a result, screen reader users may be unaware that the form submission was successful and may assume that the form is still processing or that the submission failed.

**Recommendation:** Ensure the success message is programmatically announced when it appears by implementing one of the following approaches:

Add role="status" or aria-live="polite" to the container displaying the success message so it is announced automatically without interrupting the user.
Alternatively, move keyboard focus to the success message (or its heading) after successful submission, ensuring the message is focusable (e.g., tabindex="-1").
Ensure the success message is inserted into the live region dynamically so assistive technologies detect and announce the update.

---

## Issue 140: Register
**Description:** Color alone used to indicate link: The 'Privacy Policy' and 'Terms' link text is visually indistinguishable from the surrounding text.

**Recommendation:** Ensure that links in their default state are visually distinguishable using additional cues such as underline, bold text, or increased contrast to differentiate them from surrounding text. 

Refer to WCAG 2.2 – 1.4.1 (Use of Color) for guidance:
https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html

---

## Issue 141: Register
**Description:** Missing Asterisk Indication for Required Fields: The form fields do not include an asterisk (*) or any other visual indicator to show that they are required. Additionally, there is no programmatic indication (such as aria-required="true") to inform screen reader users about the required nature of these fields.

**Recommendation:** Clearly indicate required fields with an asterisk and provide a note explaining that fields marked with * are required.

---

## Issue 142: Register
**Description:** Pressing Escape closes the entire dialog instead of collapsing the expanded combobox: When keyboard users expand the combobox (e.g., Your Product or Search Countries) and press the Escape (Esc) key, the entire dialog closes instead of first collapsing the expanded combobox/listbox. This prevents users from dismissing the currently expanded control without exiting the dialog, resulting in unexpected behavior and potential loss of context.

For users of screen readers and keyboard-only navigation, Esc is commonly expected to close only the active popup (such as a listbox or combobox popup). Closing the parent dialog instead interrupts the interaction and forces users to reopen the dialog and navigate back to their previous position.

**Recommendation:** Ensure the Escape key follows the expected interaction hierarchy:

When a combobox or listbox popup is expanded, pressing Esc should close only the popup and return focus to the associated combobox.
The parent dialog should remain open while any child popup is being dismissed.
Only when no child popup is open should pressing Esc close the dialog (if closing the dialog with Esc is supported).
Manage keyboard events so that the expanded combobox consumes the Escape key event before it reaches the dialog.

This behavior aligns with the expected interaction pattern for ARIA comboboxes and modal dialogs, providing a predictable and consistent experience for keyboard and assistive technology users.

---

## Issue 143: Register
**Description:** Country search combobox announces "blank" instead of the active country option: When keyboard and screen reader users expand the Search Countries combobox and navigate through the list of countries using the arrow keys, the screen reader announces "blank" instead of the currently focused country option. This occurs because the combobox input (role="combobox") has an empty aria-label (aria-label="") and does not expose the active option to assistive technologies using aria-activedescendant.

As a result, users who rely on screen readers cannot identify which country is currently focused within the listbox, making it difficult or impossible to select the desired country.

**Recommendation:** Ensure the combobox follows the WAI-ARIA Combobox/Listbox Authoring Pattern by:

Providing a meaningful accessible name through a visible <label>, aria-labelledby, or a non-empty aria-label.
Updating the aria-activedescendant attribute on the combobox whenever the highlighted option changes so screen readers announce the active country.
Ensuring each option has a proper accessible name that includes the country name (and, if appropriate, the country code).
Verify with screen readers that navigating with the Up and Down Arrow keys announces the focused country rather than "blank."

---

## Issue 144: Register
**Description:** Insufficient color contrast for text: The contrast ratio between the foreground color of the placeholder text with its black background color is below the required 4.5:1 ratio.

 Foreground colour: #BABABA
 Background colour: #FFFFFF
 Contrast ratio: 1.9:1

**Recommendation:** Make sure that the contrast ratio between the element and its background is of at least 4.5:1.

For color compliant options:
https://contrast-finder.tanaguru.com/
http://colorsafe.co/

Resources:
Understanding contrast (minimum):
https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html

Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text):
https://www.w3.org/TR/WCAG20-TECHS/G18.html

Contrast (minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

---

## Issue 145: Register
**Description:** Form fields rely on placeholder text instead of visible labels: Multiple form fields throughout the Activate Your Warranty form do not have persistent visible labels. Instead, the fields rely solely on placeholder text (e.g., "First Name", "Last Name", "Email", "Purchase Location", "Your Product", "Phone Number", and "Date Purchased") and aria-label attributes to identify the inputs.

Although the fields have accessible names for screen readers through aria-label, the lack of visible labels creates usability and accessibility issues. Placeholder text disappears or becomes less prominent once users begin entering information, making it difficult for users to remember the purpose of each field. This particularly impacts users with cognitive disabilities, memory impairments, low vision, and those using screen magnification.

**Recommendation:** Provide a persistent, visible <label> element for every form field.
Associate each label with its corresponding form control using the for attribute and the input's id.
Do not rely on placeholder text as the primary means of identifying form fields.
Placeholders may be used to provide examples or formatting guidance, but they should not replace visible labels.
Ensure custom controls, such as comboboxes and date fields, also have visible labels.

Example code:
<label for="first_name">First Name</label>
<input
    id="first_name"
    type="text"
    placeholder="Enter your first name">

---

## Issue 146: Register
**Description:** Missing heading mark-up: The 'Activate Your Warranty' text constitute as heading but not marke as such.

**Recommendation:** Use a heading tag <h2> for the mentioned text.

Example code:
<h2 class="ql-font-nunito-sans" style="font-size: 36px; color: #373f47; font-family: Nunito-Sans-Klaviyo-Hosted, Arial, 'Helvetica Neue', Helvetica, sans-serif; font-weight: bold;">Activate Your Warranty</h2>

Resources:
Organizing a page using headings:
https://www.w3.org/WAI/WCAG21/Techniques/general/G141

---

## Issue 147: Register
**Description:** Interactive control lacks keyboard support and appropriate semantic role: The "REGISTER NOW" control is implemented using an anchor (<a>) element with an onclick event but without an href attribute. Since it performs an action (opening a registration form) rather than navigating to another page, it is not semantically a link.

Without an href, the element may not be keyboard focusable or operable in all browsers and assistive technologies. Additionally, screen readers may not identify it as an interactive button, resulting in inconsistent behavior and making it difficult for keyboard and assistive technology users to activate the control.

**Recommendation:** Replace the anchor element with a native <button type="button">, as the control performs an action rather than navigation.
Ensure the control is fully operable using the keyboard, including activation with both Enter and Space keys.
If a native button cannot be used, add role="button", tabindex="0", and implement keyboard event handlers for both Enter and Space. However, using a native <button> is the recommended approach.
Ensure the control has an accessible name that clearly describes its purpose.

---

## Issue 148: Register
**Description:** Incorrect heading level: Incorrect heading level <h2> provided for 'REGISTER
YOUR PRODUCTS' text instead of <h1>.

**Recommendation:** Make sure heading levels are structured in a hierarchical manner. This makes navigation much faster for screen reader and keyboard users.

In this case, replace <h2> tag with <h1> element.

Example code:
<h1 class="register-title">
REGISTER <br>
YOUR PRODUCTS
</h1>

Resources
HeadingsMap extension:
https://chrome.google.com/webstore/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi

Headings and page structure:
https://www.w3.org/WAI/tutorials/page-structure/headings/

---

## Issue 149: Request Subscription Login Link
**Description:** Page title does not accurately describe the page content: The page title is "Blue Tees Golf", which does not accurately identify the purpose of the current page. The page is used to Request Subscription Login Link, but this information is not reflected in the document title.

A meaningful and descriptive page title helps users, particularly screen reader users, identify the purpose of the page when navigating between browser tabs, bookmarks, or page history. Generic or inaccurate page titles make it difficult to distinguish between pages and understand their purpose.

**Recommendation:** Update the page title to accurately describe the page's purpose and include the website name where appropriate.
Ensure each page across the website has a unique, descriptive title that reflects its primary content or functionality.

Example:
<title>Request Subscription Login Link | Blue Tees Golf</title>

---

## Issue 150: Request Subscription Login Link
**Description:** Validation error message is not announced to assistive technologies: When an invalid email address is entered, the validation message "Invalid email" is displayed visually; however, it is not programmatically announced to screen reader users when it appears.

Because the error message is not exposed as a live region or otherwise communicated to assistive technologies, users who are blind or have low vision may not be aware that a validation error has occurred. This makes it difficult to identify and correct the invalid input.

**Recommendation:** Ensure validation error messages are announced automatically when they appear by using role="alert" or an appropriate live region such as aria-live="assertive".
Associate the error message with the corresponding form field using aria-describedby.
Set aria-invalid="true" on the input field when validation fails.
Ensure the error message is updated dynamically so assistive technologies announce changes without requiring the user to move focus.

---

## Issue 151: Request Subscription Login Link
**Description:** Insufficient color contrast for non-text content: The contrast ratio between the foreground color of the input fields's border with its background color is less than 3:1.

 Foreground colour: #D9D9D9
 Background colour: #FFFFFF
 Contrast ratio: 1.4:1

**Recommendation:** Ensure that the contrast ratio between the element and its background is of at least 3.0:1. 

Resources:
Non-text contrast:
https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html

Contrast (Minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

Color contrast analyser:
https://www.tpgi.com/color-contrast-checker/

---

## Issue 152: Request Subscription Login Link
**Description:** Missing heading mark-up: The 'Request Subscription Login Link' text constitute as heading but not marke as such.

**Recommendation:** Use a heading tag <h1> for the mentioned text.

Example code:
<h1 class="loop-h2" bis_skin_checked="1">Request Subscription Login Link</h1>

Resources:
Organizing a page using headings:
https://www.w3.org/WAI/WCAG21/Techniques/general/G141

---

## Issue 153: Custom Golf Gear & Branded Golf Accessories
**Description:** Missing heading level 1 on the page: The html heading mark-up- H1 is missing on the webpage.

**Recommendation:** Add an <h1> tag to identify the main title of the page.

This allows users to quickly identify the beginning of the main content.

Resources:
HeadingsMap extension:
https://chrome.google.com/webstore/detail/headingsmap/

Headings and page structure:
https://www.w3.org/WAI/tutorials/page-structure/headings/

---

## Issue 154: Custom Golf Gear & Branded Golf Accessories
**Description:** Auto-rotating image carousel does not provide pause and play controls: The website includes an automatically rotating image carousel that continuously scrolls through images without providing users with a mechanism to pause, stop, or restart the animation.

Because the carousel moves automatically for more than five seconds, users cannot control the moving content. This can make it difficult for users with cognitive disabilities, attention-related disabilities, vestibular disorders, or low vision to read surrounding content or focus on specific images. Keyboard and screen reader users also lack a mechanism to control the carousel's movement.

Additionally, the carousel contains multiple informative images whose alternative text should accurately describe the visual content rather than using generic or incorrect descriptions.

**Recommendation:** Provide visible Pause and Play controls that allow users to stop and restart the automatic rotation.
Ensure the controls are:
Keyboard accessible.
Operable by screen reader users.
Clearly labeled (e.g., Pause carousel and Play carousel).
Stop the automatic rotation when:
The keyboard focus enters the carousel.
The user's pointer hovers over the carousel (recommended best practice).
Ensure users can manually navigate between slides using accessible Previous and Next controls, where applicable.
Provide accurate alternative text for informative carousel images. Decorative images should use alt="".

---

## Issue 155: Custom Golf Gear & Branded Golf Accessories
**Description:** Insufficient color contrast for text: The contrast ratio between the foreground color of the blue text with its black background color is below the required 4.5:1 ratio.

 Foreground colour: #004DF5
 Background colour: #000000
 Contrast ratio: 3.4:1

**Recommendation:** Make sure that the contrast ratio between the element and its background is of at least 4.5:1.

For color compliant options:
https://contrast-finder.tanaguru.com/
http://colorsafe.co/

Resources:
Understanding contrast (minimum):
https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html

Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text):
https://www.w3.org/TR/WCAG20-TECHS/G18.html

Contrast (minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

---

## Issue 156: Custom Golf Gear & Branded Golf Accessories
**Description:** Multiple "Learn more" links have the same accessible name but different destinations: Across the website, multiple "Learn more" links are provided with the same accessible name (aria-label="Learn more about Customize Your Golf Gear with 30-Day Turnaround – By Blue Tees Golf"), even though they navigate to different destinations.

Screen reader users often navigate pages by listing links. When several links have the same accessible name but lead to different pages or products, users cannot determine which link corresponds to which destination without additional context. This creates ambiguity and makes navigation less efficient.

In the provided example, all three links expose the same accessible name while linking to different resources, including different product pages and an external website.

**Recommendation:** Ensure each link has a unique and descriptive accessible name that clearly identifies its destination or purpose.
Include the associated product or content name within the visible link text or the accessible name.
Avoid reusing the same aria-label for links that navigate to different pages.
If the visible text remains "Learn more," update the accessible name to include the specific product or content, for example:
"Learn more about Player GPS Speaker"
"Learn more about Series 4 Ultra Rangefinder"
"Learn more about Transit Backpack Review"

---

## Issue 157: Custom Golf Gear & Branded Golf Accessories
**Description:** Dialog trigger is incorrectly implemented as a link and lacks required accessibility attributes: Multiple controls that open a dialog are implemented as links (<a>) instead of buttons, even though they perform an action rather than navigate to another page. For example, the "CONTACT FOR PRICING" control opens a modal dialog but is exposed to assistive technologies as a link.

Additionally, these dialog triggers do not communicate that they open a dialog because required ARIA attributes such as aria-haspopup="dialog" are missing. 

As a result, screen reader users may incorrectly expect navigation instead of a dialog opening, making the interaction confusing and inconsistent with user expectations.

**Recommendation:** Replace link elements that trigger dialogs with native <button> elements.
If a button cannot be used, ensure the custom control has role="button" and is fully keyboard accessible (although a native <button> is the preferred approach).
Add aria-haspopup="dialog" to indicate that activating the control opens a dialog.
Update aria-expanded dynamically (when applicable) to reflect whether the dialog is open or closed.
Associate the trigger with the dialog using aria-controls (when appropriate).
Ensure the dialog follows the WAI-ARIA Dialog Pattern, including proper focus management and returning focus to the triggering control when the dialog is closed.

---

## Issue 158: Custom Golf Gear & Branded Golf Accessories
**Description:** Incorrect heading level: Incorrect heading level <h4> provided for 'Perform an Inspection' instead of <h1>.

**Recommendation:** Make sure heading levels are structured in a hierarchical manner. This makes navigation much faster for screen reader and keyboard users.

In this case, replace <h4> tag with <h3> element.

Example code:
<h3 class="product-name">Player+</h3>
(..)
<h3 class="product-name">TIPS Medium Backpack</h3>

Resources
HeadingsMap extension:
https://chrome.google.com/webstore/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi

Headings and page structure:
https://www.w3.org/WAI/tutorials/page-structure/headings/

---

## Issue 159: Custom Golf Gear & Branded Golf Accessories
**Description:** Tab interface does not have proper tab structure and semantics: The tab component is not implemented using the required semantic tab structure. The tabs are created using a list (<ul>, <li>) and links (<a>), but they do not include the necessary ARIA roles, states, and relationships required for an accessible tab interface.

The current implementation does not identify the elements as tabs, does not expose the selected state programmatically, and does not establish a relationship between each tab and its associated tab panel.

Screen reader users may not understand that these elements function as tabs, which tab is currently selected, or how to navigate between available tab options. Keyboard users may also not receive the expected tab interaction behavior.

**Recommendation:** Implement the component using the proper ARIA tab pattern:
Add role="tablist" to the container element.
Add role="tab" to each tab element.
Use aria-selected="true" for the currently active tab and aria-selected="false" for inactive tabs.
Add a unique id to each tab.
Associate each tab with its corresponding content panel using aria-controls.
Add role="tabpanel" to each tab content section.
Use aria-labelledby on each tab panel to reference the related tab.
Ensure keyboard interaction follows the expected tab pattern:
Arrow Left / Arrow Right keys move between tabs.
Enter or Space activates a tab if manual activation is used.
Tab moves focus into the active tab panel.
Ensure focus indication is visible for keyboard users.

Example code:
<div role="tablist" aria-label="Product categories">
  <button id="popular-tab"
          role="tab"
          aria-selected="true"
          aria-controls="popular-panel">
    MOST POPULAR
  </button>

  <button id="products-tab"
          role="tab"
          aria-selected="false"
          aria-controls="products-panel">
    ALL PRODUCTS
  </button>
</div>

<div id="popular-panel"
     role="tabpanel"
     aria-labelledby="popular-tab">
  ...
</div>

<div id="products-panel"
     role="tabpanel"
     aria-labelledby="products-tab"
     hidden>
  ...
</div>

---

## Issue 160: Custom Golf Gear & Branded Golf Accessories
**Description:** Missing heading mark-up: Images used within section headings contain meaningful visual information, but their alternative text does not accurately represent the content presented visually. The current alt text is either missing, generic, inaccurate, or does not provide an equivalent description of the information displayed in the image.

Since these images are associated with section headings, they provide important context and help users understand the purpose of the section. Screen reader users may not receive the same information available to sighted users if the image alternative text does not accurately describe the visual content.

**Recommendation:** Use a heading tag <h2> for the mentioned text.

Resources:
Organizing a page using headings:
https://www.w3.org/WAI/WCAG21/Techniques/general/G141

---

## Issue 161: Custom Golf Gear & Branded Golf Accessories
**Description:** Video does not provide an accessible alternative or user controls for prerecorded content: The video element (<video>) is set to autoplay, muted, and loop continuously, but it does not provide visible playback controls or an accessible alternative such as captions, audio description, transcript, or a mechanism to pause/stop the motion.

Users who are sensitive to motion, users with cognitive disabilities, and users who rely on assistive technologies may not have a way to control or understand the continuously playing content. Additionally, users who are deaf or hard of hearing may not receive equivalent information if the video contains meaningful visual information without captions or a transcript.

The absence of controls prevents keyboard and screen reader users from pausing or stopping the moving content, which may create accessibility barriers.

**Recommendation:** Provide accessible video controls (controls attribute or custom accessible controls) that allow users to:
Pause and play the video.
Stop or restart playback.
Adjust volume where applicable.
Ensure controls are fully keyboard accessible and exposed correctly to assistive technologies.
Provide synchronized captions if the video contains spoken audio.
Provide an audio description or descriptive transcript if important visual information is not conveyed through audio.
Avoid automatically playing videos unless necessary. If autoplay is required:
Ensure the video is muted.
Provide a visible pause/stop mechanism.
Allow users to disable or control motion.
If the video is purely decorative, mark it appropriately so assistive technologies ignore it (for example, using appropriate labeling techniques and avoiding unnecessary announcement).

---

## Issue 162: Custom Golf Gear & Branded Golf Accessories
**Description:** Multiple images across the website do not provide accurate alternative text for visual information: Across the website, multiple images contain meaningful visual information, but their alternative text (alt attribute) is either inaccurate, incomplete, generic, does not describe the visible content, or is incorrectly left empty.

In several instances, images that convey important information to users, such as product details, promotional visuals, or contextual content, do not have equivalent text alternatives. Additionally, some images use empty alternative text (alt="") despite providing meaningful information, causing screen reader users to miss important content available to sighted users.

Incorrect or missing alternative text prevents users who are blind or have low vision from understanding the purpose and information conveyed by images. Screen reader users may receive unclear, misleading, or no information about the visual content.

**Recommendation:** Review all images across the website and categorize them as either informative or decorative.
For informative images:
Provide concise and accurate alternative text that describes the purpose and relevant visual details.
Ensure the description conveys the same information available to sighted users.
Avoid generic text such as "image," "photo," "graphic," or marketing phrases that do not describe the visual content.
For decorative images:
Use an empty alt="" attribute so assistive technologies can ignore them.
Avoid leaving meaningful images without alternative text.
Establish image content guidelines to ensure future images include appropriate alternative text during content creation and publishing.

---

## Issue 163: Get Instant Quote Screen
**Description:** Dialog does not manage keyboard focus in accordance with accessible dialog requirements: When the dialog is displayed, keyboard focus does not move to the dialog or its first interactive element. As a result, keyboard and screen reader users are not informed that a dialog has opened and may continue interacting with content behind the dialog.

Additionally, keyboard focus is not trapped within the active dialog, allowing users to tab to interactive elements in the background while the modal is open. The dialog also cannot be dismissed using the Escape (Esc) key, and when the dialog is closed using the Close button, keyboard focus is not returned to the element that triggered the dialog.

These issues make the dialog difficult to perceive, operate, and navigate for users who rely on keyboards and assistive technologies.

**Recommendation:** When the dialog opens, move keyboard focus to:
The dialog container (if appropriate), or
The first meaningful interactive element within the dialog.
Ensure screen readers are notified that a modal dialog has opened by implementing the dialog according to the WAI-ARIA Dialog Pattern.
Trap keyboard focus within the dialog while it is open so that Tab and Shift + Tab cycle only through interactive elements inside the dialog.
Prevent keyboard users from accessing background content until the dialog is dismissed.
Allow users to close the dialog using the Escape (Esc) key.
When the dialog is closed, return keyboard focus to the element that opened the dialog.
Ensure all interactive controls within the dialog, including the Close button, are keyboard accessible and have an appropriate accessible name.

---

## Issue 164: Get Instant Quote Screen
**Description:** Insufficient color contrast for text: The contrast ratio between the foreground color of the red error text with its background color is below the required 4.5:1 ratio.

 Foreground colour: #F2545B
 Background colour: #FFFFFF
 Contrast ratio: 3.4:1

**Recommendation:** Make sure that the contrast ratio between the element and its background is of at least 4.5:1.

For color compliant options:
https://contrast-finder.tanaguru.com/
http://colorsafe.co/

Resources:
Understanding contrast (minimum):
https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html

Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text):
https://www.w3.org/TR/WCAG20-TECHS/G18.html

Contrast (minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

---

## Issue 165: Get Instant Quote Screen
**Description:** Missing instruction for "*" mandatory fields: The form present provided with asterisk for the required fields but it does not have a instructive text stating "* indicates required fields".

**Recommendation:** Clearly indicate required fields with an asterisk and provide a note explaining that fields marked with * are required.

---

## Issue 166: Get Instant Quote Screen
**Description:** Insufficient color contrast for non-text content: The contrast ratio between the foreground color of the input fields's border with its background color is less than 3:1.

 Foreground colour: #CBD6E2
 Background colour: #F5F8FA
 Contrast ratio: 1.4:1

**Recommendation:** Ensure that the contrast ratio between the element and its background is of at least 3.0:1. 

Resources:
Non-text contrast:
https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html

Contrast (Minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

Color contrast analyser:
https://www.tpgi.com/color-contrast-checker/

---

## Issue 167: Get Instant Quote Screen
**Description:** Form validation errors are not announced and focus is not moved to the first field in error: When users activate the Submit button without completing the required fields, a validation error message is displayed; however, it is not announced to screen reader users. Additionally, keyboard focus remains on the Submit button instead of moving to the first form field that contains an error.

As a result, users of assistive technologies may not realize that form submission has failed or understand which fields require correction. Keyboard users must manually search for the invalid fields, making the form more difficult to complete.

**Recommendation:** Move keyboard focus to the first form field that contains a validation error after an unsuccessful form submission.
Ensure validation error messages are programmatically associated with their corresponding form fields using aria-describedby.
Mark invalid fields using aria-invalid="true".
Announce validation errors to screen reader users by using an appropriate live region (e.g., aria-live="assertive" or role="alert"), or ensure the error message receives focus when appropriate.
Provide clear, descriptive error messages that explain the issue and how to correct it.
Ensure both the error summary (if provided) and inline field-specific errors are accessible to assistive technologies.

---

## Issue 168: Get Instant Quote Screen
**Description:** Insufficient color contrast for text: The contrast ratio between the foreground color of the white text with its background color is below the required 4.5:1 ratio.

 Foreground colour: #FFFFFF
 Background colour: #FF7A59
 Contrast ratio: 2.6:1

**Recommendation:** Make sure that the contrast ratio between the element and its background is of at least 4.5:1.

For color compliant options:
https://contrast-finder.tanaguru.com/
http://colorsafe.co/

Resources:
Understanding contrast (minimum):
https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html

Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text):
https://www.w3.org/TR/WCAG20-TECHS/G18.html

Contrast (minimum):
https://www.w3.org/WAI/GL/low-vision-a11y-tf/wiki/Contrast_(Minimum)

---

## Issue 169: Get Instant Quote Screen
**Description:** Single validation error is incorrectly marked up as a list: When a validation error occurs, a single error message is presented using a list structure (<ul> and <li>), even though only one error is displayed.

Using list markup for a single item introduces unnecessary semantics that may cause screen readers to announce "list with one item" before the actual error message. This creates additional verbosity without providing meaningful structural information and may reduce the clarity of the validation feedback.

**Recommendation:** Do not use list markup when only a single validation error is presented.
Use a simple text element such as a <p>, <div>, or <span> with role="alert" or an appropriate aria-live region to announce the error.
Reserve <ul> and <ol> elements for scenarios where multiple validation errors are presented.
Ensure the error message is programmatically associated with the corresponding form field using aria-describedby and that the invalid field is identified with aria-invalid="true".

---

## Issue 170: Get Instant Quote Screen
**Description:** Inappropriate ARIA role applied to list element: The validation error container is implemented as a list (<ul>) but is assigned role="alert". While the intent is to announce the validation message, applying an alert role directly to a list is not an appropriate use of ARIA semantics.

The alert role is intended for status or message containers rather than list elements. Using an inappropriate ARIA role can result in inconsistent announcements across assistive technologies and may cause screen readers to interpret the content unexpectedly.

**Recommendation:** Apply role="alert" (or an appropriate aria-live attribute) to a dedicated container such as a <div> or <p> that contains the error message, rather than to the <ul> element.
If only a single validation error is displayed, avoid using list markup altogether and present the error within a semantic text container.
Use list markup only when multiple validation errors need to be presented as a list.
Ensure the error message is programmatically associated with the corresponding form field using aria-describedby and mark the invalid field with aria-invalid="true".

Example code:
<div id="email-error" role="alert">
  Please complete this required field.
</div>

---

## Issue 171: Get Instant Quote Screen
**Description:** Close button has an inaccurate accessible name: The dialog's close control is provided with the accessible name "Close Video", even though it closes the entire dialog rather than a video.

An inaccurate accessible name can mislead screen reader users about the purpose of the control. Accessible names should clearly and accurately describe the action performed by the control. In this case, users may expect the button to stop or close only a video instead of dismissing the dialog.

**Recommendation:** Update the accessible name to accurately describe the control's function.
Use a generic label such as "Close", unless the dialog has a more specific purpose that should be conveyed.
Ensure the accessible name matches the visible behavior of the control.

Example code:
<button type="button"
        class="closePop"
        aria-label="Close">
</button>

---

## Issue 172: Get Instant Quote Screen
**Description:** Dialog has an inaccurate accessible name: The modal dialog is exposed with the accessible name "Contact Us Video Popup", even though it contains a Contact Us form rather than a video.

An inaccurate accessible name can mislead screen reader users about the purpose of the dialog. When the dialog opens, assistive technologies announce its accessible name. Because the announced name does not match the dialog's actual content, users may expect video-related content instead of a form, causing confusion and making navigation less predictable.

**Recommendation:** Update the dialog's accessible name to accurately reflect its purpose and content.
Use an appropriate aria-label or reference a visible dialog heading using aria-labelledby.
Ensure the accessible name clearly identifies the dialog as a contact form.

---

## Issue 173: Header
**Description:** Menu toggle control does not provide an accessible name, semantic role, or expanded/collapsed state: The menu toggle is implemented using a non-semantic <div> element, making it inaccessible as an interactive control. Because it is not exposed as a button, assistive technologies do not identify it as an actionable element. Additionally, the control does not provide a meaningful accessible name or communicate whether the navigation menu is currently expanded or collapsed. As a result, screen reader users may not understand the control's purpose or current state, and keyboard users may be unable to operate it using standard keyboard interactions.

**Recommendation:** Implement the menu toggle using a native <button> element. Provide a descriptive accessible name such as "Open menu" or "Close menu", or a persistent name such as "Menu", depending on the implementation. Expose the current state using aria-expanded="true" or aria-expanded="false" and associate the button with the controlled navigation region using aria-controls where appropriate. Ensure the control is fully keyboard accessible and follows the expected button interaction pattern.

---

## Issue 174: Global
**Description:** Content gets cut off or overlaps when text spacing is adjusted: When users apply custom text spacing (such as increased line height, paragraph spacing, letter spacing, or word spacing), portions of the content become truncated, overlap adjacent content, or are no longer fully visible across the website. This can make text difficult or impossible to read for users with low vision, cognitive disabilities, dyslexia, or those who rely on custom stylesheet settings to improve readability.

**Recommendation:** Ensure that content reflows correctly when users apply text spacing values specified in WCAG without requiring horizontal scrolling or causing clipping, overlap, or loss of content. Avoid using fixed heights or containers that restrict text expansion, and allow sufficient space for content to resize naturally.

---

## Issue 175: Sale Page BFCM
**Description:** Carousel pagination controls do not provide sufficient target size: The carousel pagination controls provide a target size that is smaller than the minimum recommended size for pointer input. Users with limited dexterity, tremors, or those using touch devices may find it difficult to accurately activate the intended control, increasing the likelihood of accidental activation or failed interactions.

**Recommendation:** Ensure each carousel pagination control provides a minimum interactive target size of 24 × 24 CSS pixels, or otherwise meets one of the exceptions defined in WCAG 2.5.8 (Target Size (Minimum)). Where increasing the visible size is not practical, enlarge the interactive area using padding or spacing while maintaining the existing visual appearance.

---


/* ==========================================================================
   BLUE TEES GOLF — PRIVACY OPT-OUT & UNIVERSAL CONSENT MANAGEMENT
   - Source of Truth: Shopify Customer Privacy API
   - Do Not Sell/Share Opt-Out on /pages/your-privacy-choices
   - Global Privacy Control (GPC) Detection & Confirmation Display
   - Independent Cookie Preference Management (Consentmo Integration)
   - Real-Time Third-Party Tracking Suppression (Meta, Google, Bing, Opensend)
   - Dynamic Script Unblocking for Gated Scripts (Clarity, Hotjar, Meta, etc.)
   ========================================================================== */

(function () {
  'use strict';

  var STORAGE_KEY_OPT_OUT = 'btg_sale_of_data_opted_out';

  // Helper: Ensure dataLayer and gtag are initialized
  window.dataLayer = window.dataLayer || [];
  function ensureGtag() {
    if (typeof window.gtag !== 'function') {
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
    }
  }
  ensureGtag();

  // Helper: Safely access or load Shopify Customer Privacy API
  function getCustomerPrivacy(callback) {
    if (window.Shopify && window.Shopify.customerPrivacy) {
      callback(window.Shopify.customerPrivacy);
      return;
    }
    if (window.Shopify && typeof window.Shopify.loadFeatures === 'function') {
      window.Shopify.loadFeatures(
        [{ name: 'consent-tracking-api', version: '0.1' }],
        function (error) {
          if (!error && window.Shopify && window.Shopify.customerPrivacy) {
            callback(window.Shopify.customerPrivacy);
          } else {
            callback(null);
          }
        }
      );
      return;
    }
    // Polling fallback (up to 3 seconds)
    var attempts = 0;
    var interval = setInterval(function () {
      attempts++;
      if (window.Shopify && window.Shopify.customerPrivacy) {
        clearInterval(interval);
        callback(window.Shopify.customerPrivacy);
      } else if (attempts >= 30) {
        clearInterval(interval);
        callback(null);
      }
    }, 100);
  }

  // Detect GPC Signal
  function isGPCActive() {
    return !!(
      navigator.globalPrivacyControl ||
      window.globalPrivacyControl ||
      (window.Shopify &&
        window.Shopify.customerPrivacy &&
        typeof window.Shopify.customerPrivacy.saleOfDataAllowed === 'function' &&
        !window.Shopify.customerPrivacy.saleOfDataAllowed() &&
        navigator.userAgent &&
        navigator.userAgent.indexOf('GPC') !== -1)
    );
  }

  // Detect if User is Already Opted Out of Sale/Sharing
  function isUserOptedOut(customerPrivacy) {
    if (isGPCActive()) return true;
    try {
      if (localStorage.getItem(STORAGE_KEY_OPT_OUT) === 'true') return true;
    } catch (e) {}

    if (customerPrivacy) {
      if (typeof customerPrivacy.saleOfDataAllowed === 'function') {
        try {
          if (!customerPrivacy.saleOfDataAllowed()) return true;
        } catch (e) {}
      }
      if (typeof customerPrivacy.currentVisitorConsent === 'function') {
        try {
          var consent = customerPrivacy.currentVisitorConsent();
          if (consent && consent.sale_of_data === 'no') return true;
        } catch (e) {}
      }
    }
    return false;
  }

  // Inject Scoped Styles for Privacy UI
  function injectPrivacyStyles() {
    if (document.getElementById('btg-privacy-custom-styles')) return;
    var style = document.createElement('style');
    style.id = 'btg-privacy-custom-styles';
    style.textContent = [
      '.btg-privacy-status { display: block; margin: 18px 0 24px; padding: 18px 22px; background: #F0FDF4; border: 1.5px solid #86EFAC; border-radius: 8px; box-sizing: border-box; text-align: left; animation: btgFadeIn 0.35s ease; }',
      '.btg-privacy-status.btg-gpc-status { background: #EFF6FF; border-color: #93C5FD; }',
      '.btg-privacy-badge { display: inline-flex; align-items: center; gap: 10px; color: #166534; font-size: 17px; font-weight: 700; letter-spacing: 0.02em; margin-bottom: 6px; }',
      '.btg-gpc-status .btg-privacy-badge { color: #1E40AF; }',
      '.btg-privacy-icon { width: 22px; height: 22px; flex-shrink: 0; fill: currentColor; }',
      '.btg-privacy-status-desc { margin: 0; font-size: 14.5px; line-height: 1.55; color: #374151; }',
      '.btn.btg-optout-btn-loading { opacity: 0.7; pointer-events: none; cursor: wait; }',
      '@keyframes btgFadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }'
    ].join(' ');
    document.head.appendChild(style);
  }

  // Apply Real-Time Third-Party Tracking Restrictions
  function applyTrackingRestrictions(isSaleAllowed) {
    if (isSaleAllowed) return;

    // 1. Meta Pixel (Limited Data Processing & Consent Revocation)
    if (window.fbq) {
      try {
        window.fbq('dataProcessingOptions', ['LDP'], 0, 0);
        window.fbq('consent', 'revoke');
      } catch (err) {
        console.warn('Meta Pixel privacy update:', err);
      }
    }

    // 2. Google Ads & Google Consent Mode (Restricted Data Processing & Ad Personalization Denied)
    if (typeof window.gtag === 'function') {
      try {
        window.gtag('set', 'restricted_data_processing', true);
        window.gtag('consent', 'update', {
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied'
        });
      } catch (err) {
        console.warn('Google Ads privacy update:', err);
      }
    }

    // 3. Google Tag Manager / dataLayer Notification
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'privacy_consent_update',
        sale_of_data: false,
        gpc_active: isGPCActive()
      });
    } catch (err) {}

    // 4. Microsoft Bing Ads (UET)
    try {
      window.uetq = window.uetq || [];
      window.uetq.push('consent', 'update', { 'ad_storage': 'denied' });
    } catch (err) {}

    // 5. Opensend Identity Resolution Suppression
    try {
      window.__opensend_optout = true;
      if (window.opensend) {
        window.opensend.disabled = true;
      }
    } catch (err) {}
  }

  // Helper: Dynamically activate gated text/plain scripts for a category
  function unblockScriptsByCategory(category) {
    var selector =
      'script[data-btg-category="' + category + '"][type="text/plain"], ' +
      'script[data-consentmo-category="' + category + '"][type="text/plain"]';
    var scripts = document.querySelectorAll(selector);
    for (var i = 0; i < scripts.length; i++) {
      var oldScript = scripts[i];
      var newScript = document.createElement('script');
      for (var j = 0; j < oldScript.attributes.length; j++) {
        var attr = oldScript.attributes[j];
        if (attr.name !== 'type') {
          newScript.setAttribute(attr.name, attr.value);
        }
      }
      newScript.type = 'text/javascript';
      if (oldScript.src) {
        newScript.src = oldScript.src;
      } else {
        newScript.textContent = oldScript.textContent;
      }
      oldScript.parentNode.replaceChild(newScript, oldScript);
    }
  }

  // Apply Real-Time Marketing / Analytics Acceptance (Upon Consentmo Accept)
  function applyConsentAcceptance(categories) {
    if (!categories) return;

    var isMarketing =
      categories.marketing === true ||
      categories.marketing === 'yes' ||
      categories.acceptedAll === true ||
      categories.all === true ||
      categories.status === 'accepted';

    var isAnalytics =
      categories.analytics === true ||
      categories.analytics === 'yes' ||
      categories.statistics === true ||
      categories.stats === true ||
      categories.acceptedAll === true ||
      categories.all === true ||
      categories.status === 'accepted';

    // Marketing acceptance
    if (isMarketing) {
      if (typeof window.gtag === 'function') {
        try {
          window.gtag('consent', 'update', {
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted'
          });
        } catch (e) {}
      }
      if (window.fbq) {
        try {
          window.fbq('consent', 'grant');
        } catch (e) {}
      }
      if (window.uetq) {
        try {
          window.uetq.push('consent', 'update', { 'ad_storage': 'granted' });
        } catch (e) {}
      }
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'consent_granted_marketing' });
      unblockScriptsByCategory('marketing');
    }

    // Analytics acceptance
    if (isAnalytics) {
      if (typeof window.gtag === 'function') {
        try {
          window.gtag('consent', 'update', {
            'analytics_storage': 'granted'
          });
        } catch (e) {}
      }
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'consent_granted_analytics' });
      unblockScriptsByCategory('analytics');
    }

    // Sale of data check
    if (categories.sale_of_data === false || categories.sale_of_data === 'no') {
      applyTrackingRestrictions(false);
    }
  }

  // Render Opt-Out Confirmation Element
  function createConfirmationElement() {
    var container = document.createElement('div');
    container.className = 'btg-privacy-status btg-privacy-status--opted-out';
    container.setAttribute('role', 'status');
    container.setAttribute('aria-live', 'polite');
    container.innerHTML = [
      '<div class="btg-privacy-badge">',
      '  <svg class="btg-privacy-icon" viewBox="0 0 20 20" fill="currentColor">',
      '    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>',
      '  </svg>',
      '  <span>You’re opted out</span>',
      '</div>',
      '<p class="btg-privacy-status-desc">',
      '  Your privacy preference has been saved. We will not sell or share your personal information for cross-context behavioral advertising.',
      '</p>'
    ].join('');
    return container;
  }

  // Render GPC Banner Element
  function createGPCElement() {
    var container = document.createElement('div');
    container.className = 'btg-privacy-status btg-gpc-status';
    container.setAttribute('role', 'status');
    container.setAttribute('aria-live', 'polite');
    container.innerHTML = [
      '<div class="btg-privacy-badge">',
      '  <svg class="btg-privacy-icon" viewBox="0 0 20 20" fill="currentColor">',
      '    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>',
      '  </svg>',
      '  <span>Global Privacy Control (GPC) Signal Detected &amp; Honoured</span>',
      '</div>',
      '<p class="btg-privacy-status-desc">',
      '  Your browser is broadcasting a Global Privacy Control signal. Your opt-out preference is active, and we will not sell or share your personal information.',
      '</p>'
    ].join('');
    return container;
  }

  // Controller for /pages/your-privacy-choices
  function initPrivacyChoicesPage(customerPrivacy) {
    injectPrivacyStyles();

    // 1. Locate the Opt-Out Button
    var allButtons = document.querySelectorAll('button');
    var optOutBtn = null;

    for (var i = 0; i < allButtons.length; i++) {
      var btn = allButtons[i];
      var text = (btn.textContent || '').trim().toUpperCase();
      if (
        text.indexOf('OPT OUT OF THE SALE OR SHARING') !== -1 ||
        text.indexOf('OPT OUT OF SALE OR SHARING') !== -1
      ) {
        optOutBtn = btn;
        break;
      }
    }

    // 2. Handle GPC Display under Global Privacy Control Section
    if (isGPCActive()) {
      var allH3 = document.querySelectorAll('h3');
      for (var j = 0; j < allH3.length; j++) {
        var h3 = allH3[j];
        if ((h3.textContent || '').indexOf('Global Privacy Control') !== -1) {
          if (!h3.parentNode.querySelector('.btg-gpc-status')) {
            var gpcBanner = createGPCElement();
            h3.insertAdjacentElement('afterend', gpcBanner);
          }
          break;
        }
      }
    }

    // 3. Handle Opt-Out Button State & Actions
    if (optOutBtn) {
      var userOptedOut = isUserOptedOut(customerPrivacy);

      if (userOptedOut) {
        var confirmationEl = createConfirmationElement();
        optOutBtn.replaceWith(confirmationEl);
      } else {
        optOutBtn.addEventListener('click', function (e) {
          e.preventDefault();
          optOutBtn.classList.add('btg-optout-btn-loading');
          optOutBtn.setAttribute('disabled', 'disabled');
          optOutBtn.textContent = 'Saving preference...';

          function handleOptOutComplete() {
            try {
              localStorage.setItem(STORAGE_KEY_OPT_OUT, 'true');
            } catch (err) {}
            applyTrackingRestrictions(false);
            var confirmation = createConfirmationElement();
            optOutBtn.replaceWith(confirmation);
          }

          if (customerPrivacy && typeof customerPrivacy.setTrackingConsent === 'function') {
            customerPrivacy.setTrackingConsent({ sale_of_data: false }, function () {
              handleOptOutComplete();
            });
          } else {
            getCustomerPrivacy(function (cp) {
              if (cp && typeof cp.setTrackingConsent === 'function') {
                cp.setTrackingConsent({ sale_of_data: false }, function () {
                  handleOptOutComplete();
                });
              } else {
                handleOptOutComplete();
              }
            });
          }
        });
      }
    }

    // 4. Handle Manage Cookie Preferences Button (Delegation to Consentmo / CMP)
    document.addEventListener('click', function (e) {
      var cookieBtn = e.target.closest('.btg-custom-open-cookie-preferences');
      if (!cookieBtn) return;
      e.preventDefault();

      if (window.Consentmo && typeof window.Consentmo.openDialog === 'function') {
        window.Consentmo.openDialog('preferences');
      } else if (
        window.Shopify &&
        window.Shopify.customerPrivacy &&
        typeof window.Shopify.customerPrivacy.openCookiePreferences === 'function'
      ) {
        window.Shopify.customerPrivacy.openCookiePreferences();
      } else {
        console.warn('Cookie preference dialog is currently loading.');
      }
    });
  }

  // Helper: Check if visitor previously gave explicit consent
  function hasExplicitConsent(category, cp) {
    // 1. Check Shopify Customer Privacy API explicit consent
    try {
      var consentApi = cp || (window.Shopify && window.Shopify.customerPrivacy);
      if (consentApi && typeof consentApi.currentVisitorConsent === 'function') {
        var consent = consentApi.currentVisitorConsent();
        if (consent && (consent[category] === 'yes' || consent[category] === true)) {
          return true;
        }
      }
    } catch (e) {}

    // 2. Check Consentmo stored consent
    try {
      if (window.Consentmo && typeof window.Consentmo.hasConsent === 'function') {
        if (window.Consentmo.hasConsent(category) === true) return true;
      }
      var cookies = document.cookie || '';
      if (cookies.indexOf('consentmo') !== -1 || cookies.indexOf('gdpr') !== -1) {
        var match = cookies.match(/consentmo[a-zA-Z0-9_]*=([^;]+)/);
        if (match && match[1]) {
          var val = decodeURIComponent(match[1]);
          if (val.indexOf('"' + category + '":true') !== -1 || val.indexOf(category + ':1') !== -1) {
            return true;
          }
        }
      }
    } catch (e) {}

    return false;
  }

  // Initialize Privacy & Tracking Engine
  function initBTGPrivacyManager() {
    getCustomerPrivacy(function (cp) {
      // 1. If GPC or already opted out, immediately enforce restrictions
      if (isUserOptedOut(cp)) {
        applyTrackingRestrictions(false);
      }

      // 2. ONLY unblock if visitor previously EXPLICITLY accepted (never default-unblock)
      if (hasExplicitConsent('analytics', cp)) {
        unblockScriptsByCategory('analytics');
      }
      if (hasExplicitConsent('marketing', cp)) {
        unblockScriptsByCategory('marketing');
      }

      // 3. If visitor is on /pages/your-privacy-choices, initialize page UI
      var isPrivacyPage =
        window.location.pathname.indexOf('/your-privacy-choices') !== -1 ||
        document.querySelector('button.btg-custom-open-cookie-preferences') !== null;

      if (isPrivacyPage) {
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', function () {
            initPrivacyChoicesPage(cp);
          });
        } else {
          initPrivacyChoicesPage(cp);
        }
      }
    });

    // 4. Listen for Shopify native Customer Privacy consent changes
    document.addEventListener('visitorConsentCollected', function (event) {
      if (!event || !event.detail) return;
      var consent = event.detail;
      if (consent.sale_of_data === false || consent.sale_of_data === 'no') {
        try {
          localStorage.setItem(STORAGE_KEY_OPT_OUT, 'true');
        } catch (e) {}
        applyTrackingRestrictions(false);
      } else if (
        consent.marketing === true ||
        consent.marketing === 'yes' ||
        consent.analytics === true ||
        consent.analytics === 'yes'
      ) {
        applyConsentAcceptance(consent);
      }
    });

    // 5. Listen for Consentmo custom consent events
    window.addEventListener('consentmo_user_consented', function (event) {
      if (!event || !event.detail) return;
      applyConsentAcceptance(event.detail);
    });
    window.addEventListener('Consentmo:consentUpdated', function (event) {
      if (!event || !event.detail) return;
      applyConsentAcceptance(event.detail);
    });

    // 6. Delegated listener for Consentmo / CMP accept buttons for immediate real-time unblock
    document.addEventListener('click', function (e) {
      var acceptBtn = e.target.closest(
        '#btn-accept-all, .btn-accept-all, .consentmo-btn-accept-all, .consentmo-accept-all, [data-action="accept-all"], [data-action="accept"], .consentmo-accept-btn'
      );
      if (acceptBtn) {
        applyConsentAcceptance({ acceptedAll: true });
      }
    });
  }

  // Launch Privacy Manager
  initBTGPrivacyManager();
})();

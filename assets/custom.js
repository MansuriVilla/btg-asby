
function ArrowHandler() {
  const arrowHover = document.querySelectorAll(".Hover__arrow");

  arrowHover.forEach((arrow) => {
    arrow.addEventListener("mouseover", () => {
      arrow.classList.add("Arrow_hovering");
    });
    arrow.addEventListener("mouseout", () => {
      arrow.classList.remove("Arrow_hovering");
    });
  });
}
ArrowHandler();

document.addEventListener("DOMContentLoaded", function () {


  function collectionCardVariantHandler(){


    // ────────────────────────────────────────────────
    // 1. Hide loader on ALL products (single-variant + multi-variant)
    // ────────────────────────────────────────────────
    function hideInitialLoader(imageContainer) {
      const loader = imageContainer.querySelector('.variant-loader');
      if (loader) loader.classList.remove('active');
    }

    document.querySelectorAll('.grid-product__image-mask, .grid-product__image-mockup').forEach(imageContainer => {
      const img = imageContainer.querySelector('img');

      if (img && img.complete && img.naturalWidth > 0) {
        hideInitialLoader(imageContainer);
        return;
      }

      // Listen for load events (works with lazysizes + native lazy)
      const onReady = () => hideInitialLoader(imageContainer);

      if (img) {
        img.addEventListener('load', onReady, { once: true });
        img.addEventListener('error', onReady, { once: true });
        img.addEventListener('lazyloaded', onReady, { once: true });
      }

      // Safety net – never show infinite spinner
      setTimeout(() => hideInitialLoader(imageContainer), 8000);
    });

    // ────────────────────────────────────────────────
    // 2. Only for products that have color swatches → handle variant image swap
    // ────────────────────────────────────────────────
    document.querySelectorAll('[data-quick-add-swatches]').forEach(card => {
      const contentContainer = card.closest('.grid-product__content');
      if (!contentContainer) return;

      const shopNowLinks = contentContainer.querySelectorAll('a[data-shop-now-link]');
      const imageContainer = contentContainer.querySelector('.grid-product__image-mask, .grid-product__image-mockup');
      if (!imageContainer) return;

      let mainImage = imageContainer.querySelector('img');
      if (!mainImage) return;

      const originalImageSrc = mainImage.dataset.src || mainImage.src || null;

      function showLoader() {
        const loader = imageContainer.querySelector('.variant-loader');
        if (loader) loader.classList.add('active');
      }

      function hideLoader() {
        const loader = imageContainer.querySelector('.variant-loader');
        if (loader) loader.classList.remove('active');
      }

      card.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
          if (!e.target.checked) return;

          const variantId = e.target.value;
          const swatchContainer = e.target.closest('.single-color');
          const variantImage = swatchContainer?.dataset.variantImage;
          const isAvailable = swatchContainer?.dataset.variantAvailable === 'true';

          // Update links
          shopNowLinks.forEach(link => {
            try {
              const url = new URL(link.href);
              url.searchParams.set('variant', variantId);
              link.href = url.toString();

              if (link.classList.contains('content-cta') || link.classList.contains('item-cta__button')) {
                link.textContent = isAvailable ? 'SHOP NOW' : 'SOLD OUT';
                link.classList.toggle('product-sold_cta', !isAvailable);
              }
            } catch (err) {
              console.error(err);
            }
          });

          // Update image
          if (variantImage && variantImage.trim() !== '' && variantImage !== 'null') {
            showLoader();

            const newImg = document.createElement('img');
            newImg.className = mainImage.className;
            newImg.alt = mainImage.alt || '';
            newImg.dataset.src = variantImage;
            newImg.src = variantImage;
            newImg.dataset.widths = mainImage.dataset.widths || '[360,540,720,900,1080]';
            newImg.dataset.sizes = mainImage.dataset.sizes || 'auto';
            newImg.dataset.aspectratio = mainImage.dataset.aspectratio || '1';
            newImg.classList.add('lazyload');

            newImg.addEventListener('load', hideLoader, { once: true });
            newImg.addEventListener('error', hideLoader, { once: true });

            mainImage.replaceWith(newImg);
            mainImage = newImg;
          } else if (originalImageSrc) {
            showLoader();

            const newImg = document.createElement('img');
            newImg.className = mainImage.className;
            newImg.alt = mainImage.alt || '';
            newImg.dataset.src = originalImageSrc;
            newImg.src = originalImageSrc;
            newImg.dataset.widths = mainImage.dataset.widths;
            newImg.dataset.sizes = mainImage.dataset.sizes || 'auto';
            newImg.dataset.aspectratio = mainImage.dataset.aspectratio;

            newImg.addEventListener('load', hideLoader, { once: true });
            newImg.addEventListener('error', hideLoader, { once: true });

            mainImage.replaceWith(newImg);
            mainImage = newImg;
          }
        });
      });

      // Trigger initial selected swatch (only for multi-variant)
      const checkedRadio = card.querySelector('input[type="radio"]:checked');
      if (checkedRadio) {
        checkedRadio.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  }
  collectionCardVariantHandler();


  function addToCartForDropdown(){
    // Sync dropdown selection to hidden input
    document.querySelectorAll('[data-quick-add-select]').forEach(select => {
      // console.log('Found dropdown:', select.id); // Confirm dropdown found
      select.addEventListener('change', function() {
        console.log('Dropdown changed to:', this.value); // Confirm change event
        const form = this.closest('.quick-add-variant-dropdown')?.querySelector('.quick-add-form');
        if (!form) {
          console.error('No form found near dropdown!');
          return;
        }

        const hiddenInput = form.querySelector('[data-quick-add-id]');
        if (hiddenInput) {
          hiddenInput.value = this.value;
          // console.log('Hidden input updated to:', hiddenInput.value); // Confirm update
        }

        // Update button state
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          const selectedOption = this.options[this.selectedIndex];
          const isAvailable = selectedOption.dataset.available === 'true';
          // console.log('Selected variant available?', isAvailable); // Confirm availability

          submitBtn.disabled = !isAvailable;
          submitBtn.classList.toggle('product-sold_cta', !isAvailable);
          submitBtn.textContent = isAvailable 
            ? (submitBtn.dataset.addToCartText || 'ADD TO CART')
            : (submitBtn.dataset.soldText || 'SOLD OUT');
        }
      });
    });

    // Handle AJAX add to cart
    document.querySelectorAll('.quick-add-form').forEach(form => {
      // console.log('Found quick-add form:', form); // Confirm form found
      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        // console.log('Form submit triggered!'); // Confirm submit event

        const submitBtn = form.querySelector('button[type="submit"]');
        if (!submitBtn || submitBtn.disabled) {
          // console.log('Button disabled or missing');
          return;
        }

        const variantId = form.querySelector('input[name="id"]').value;
        // console.log('Adding variant ID to cart:', variantId); // Confirm ID

        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = submitBtn.dataset.addingText || 'ADDING...';

        try {
          const formData = new FormData(form);
          // console.log('Sending FormData:', Object.fromEntries(formData)); // Log payload

          const response = await fetch('/cart/add.js', {
            method: 'POST',
            body: formData
          });

          // console.log('Response status:', response.status); // Log status

          if (response.ok) {
            const cart = await response.json();
            // console.log('Success! Cart updated:', cart);
            // alert('Added to cart!'); // Replace with your cart UI
            document.dispatchEvent(new CustomEvent('cart:updated', { detail: cart }));
          } else {
            const error = await response.json();
            console.error('Add error:', error);
            alert(error.description || 'Could not add to cart');
          }
        } catch (err) {
          console.error('Fetch error:', err);
          alert('Something went wrong. Please try again.');
        } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      });
    });
  }
  addToCartForDropdown();


  
  function ticker() {
    gsap.registerEffect({
      name: "ticker",
      effect(targets, config) {
        buildTickers({
          targets: targets,
          clone:
            config.clone ||
            ((el) => {
              let clone = el.children[0].cloneNode(true);
              el.insertBefore(clone, el.children[0]);
              return clone;
            }),
        });
        function buildTickers(config, originals) {
          let tickers;
          if (originals && originals.clones) {
            originals.clones.forEach(
              (el) => el && el.parentNode && el.parentNode.removeChild(el)
            );
            originals.forEach((el, i) =>
              originals.inlineWidths[i]
                ? (el.style.width = originals.inlineWidths[i])
                : el.style.removeProperty("width")
            );
            tickers = originals;
          } else {
            tickers = config.targets;
          }
          const clones = (tickers.clones = []),
            inlineWidths = (tickers.inlineWidths = []);
          tickers.forEach((el, index) => {
            inlineWidths[index] = el.style.width;
            el.style.width = "10000px";
            el.children[0].style.display = "inline-block";
            let width = el.children[0].offsetWidth,
              cloneCount = Math.ceil(window.innerWidth / width),
              right = el.dataset.direction === "right",
              i;
            el.style.width = width * (cloneCount + 1) + "px";
            for (i = 0; i < cloneCount; i++) {
              clones.push(config.clone(el));
            }
            gsap.fromTo(
              el,
              {
                x: right ? -width : 0,
              },
              {
                x: right ? 0 : -width,
                duration: width / 100 / parseFloat(el.dataset.speed || 1),
                repeat: -1,
                overwrite: "auto",
                ease: "none",
              }
            );
          });
          originals ||
            window.addEventListener("resize", () =>
              buildTickers(config, tickers)
            );
        }
      },
    });

    gsap.effects.ticker(".hero__ticker-init");
  }
  ticker();

  //----------------------------------
  // Site Header Function
  //--------------------

  

  function siteMainHeader() {
    const siteHeaders = document.querySelectorAll(".site-header");
    const megaMenuBackface = document.querySelector(".megaMenu_backface");
    const menuToggles = document.querySelectorAll(".menu-toggle");
    const menus = document.querySelectorAll(".menu_custom");
    const megaMenus = document.querySelectorAll(".site__megaMenu_container");
    const backButtons = document.querySelectorAll(".back-button");

    function isMobile() {
        return window.innerWidth < 992;
    }

    // ─── Helper: get elements in current visual (CSS order) sequence ───
    function getSortedChildren(container, selector) {
        const children = Array.from(container.querySelectorAll(selector));
        return children.sort((a, b) => {
            const orderA = parseInt(getComputedStyle(a).order) || 0;
            const orderB = parseInt(getComputedStyle(b).order) || 0;
            return orderA - orderB;
        });
    }

    function closeAllMenus(currentItem) {
        document.querySelectorAll(".site_headerContains__megaMenu").forEach(item => {
            if (item === currentItem) return;

            const menu = item.querySelector(".site__megaMenu_container");
            const link = item.querySelector(".item_has--dropdown");

            if (!menu) return;

            menu.classList.remove("site_megaMenu__Active");
            link?.classList.remove("site_megaMenu__Active");
            link?.setAttribute("aria-expanded", "false");

            gsap.to(menu, { height: 0, duration: 0.3, ease: "power2.out" });

            getSortedChildren(menu, ".site_megaMenu_left-ul").forEach(col => {
                gsap.to(col.querySelectorAll("li, .site_megaMenu_ul-inner"), {
                    opacity: 0,
                    y: 20,
                    duration: 0.02,
                    ease: "power2.out"
                });
            });

            getSortedChildren(menu, ".site__megaMenu_right").forEach(col => {
                gsap.to(col.querySelectorAll("li"), {
                    opacity: 0,
                    y: 20,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
        });
    }

    function resetMegaMenus() {
        document.querySelectorAll(".site__megaMenu_container").forEach(menu => {
            menu.classList.remove("active", "site_megaMenu__Active");
            gsap.set(menu, { height: 0 });

            getSortedChildren(menu, ".site_megaMenu_left-ul").forEach(col => {
                gsap.set(col.querySelectorAll("li, .site_megaMenu_ul-inner"), { opacity: 0, y: 20 });
            });

            getSortedChildren(menu, ".site__megaMenu_right").forEach(col => {
                gsap.set(col.querySelectorAll("li"), { opacity: 0, y: 20 });
            });
        });

        document.querySelectorAll(".item_has--dropdown").forEach(link => {
            link.classList.remove("site_megaMenu__Active");
            link.setAttribute("aria-expanded", "false");
        });

        toggleMenu(false);
    }

    function toggleMenu(state) {
        siteHeaders.forEach(header => {
            header.classList.toggle("site-header--megamenu-active", state);
        });

        megaMenuBackface?.classList.toggle("megaMenu_backface--active", state);
        toggleBodyScroll(state);
    }

    function toggleBodyScroll(state) {
        const isAnyHeaderActive = Array.from(siteHeaders).some(header =>
            header.classList.contains("active")
        );

        if (isAnyHeaderActive || state) {
            // const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.classList.add("no-scroll");
            document.body.style.overflow = "hidden";
            // document.body.style.paddingRight = scrollBarWidth + "px";
        } else {
            document.body.classList.remove("no-scroll");
            document.body.style.overflow = "";
            // document.body.style.paddingRight = "";
        }
    }

    function animateToAutoHeight(element) {
        const curHeight = element.offsetHeight;
        element.style.height = "auto";
        const autoHeight = element.offsetHeight;
        element.style.height = curHeight + "px";

        gsap.to(element, {
            height: autoHeight,
            duration: 0.32,
            ease: "power2.out",
            onComplete: () => element.style.height = "auto"
        });
    }

    // ─── Animate content crossfade with pure smooth opacity fade ───
    function transitionContent(outgoingContainer, incomingContainer, isSwitching = false) {
        const easeOut = "power2.inOut";
        const easeIn = "cubic-bezier(0.16, 1, 0.3, 1)";
        const durationOut = isSwitching ? 0.16 : 0.2;
        const durationIn = isSwitching ? 0.3 : 0.35;

        // Outgoing content pure fade out
        if (outgoingContainer) {
            const outgoingInner = outgoingContainer.querySelector(".site__megaMenu_content__inner");
            if (outgoingInner) {
                gsap.killTweensOf(outgoingInner);
                gsap.to(outgoingInner, {
                    opacity: 0,
                    duration: durationOut,
                    ease: easeOut
                });
            }
        }

        // Incoming content pure fade in
        if (incomingContainer) {
            const incomingInner = incomingContainer.querySelector(".site__megaMenu_content__inner");
            if (incomingInner) {
                gsap.killTweensOf(incomingInner);
                gsap.fromTo(incomingInner,
                    { opacity: 0 },
                    { 
                        opacity: 1, 
                        duration: durationIn, 
                        ease: easeIn,
                        delay: isSwitching ? 0.04 : 0
                    }
                );
            }

            // Staggered text items pure fade in
            const items = incomingContainer.querySelectorAll("li, .site_megaMenu_ul-inner");
            gsap.killTweensOf(items);
            gsap.fromTo(items,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: durationIn,
                    ease: easeIn,
                    stagger: isMobile() ? 0 : (isSwitching ? 0.012 : 0.025),
                    delay: isSwitching ? 0.05 : 0
                }
            );
        }
    }

    function animateColumns(container, opening = true) {
        if (!container) return;
        const duration = opening ? 0.35 : 0.2;
        const ease = opening ? "power3.out" : "power2.in";
        const contentInner = container.querySelector(".site__megaMenu_content__inner");

        if (!opening && contentInner) {
            gsap.killTweensOf(contentInner);
            gsap.to(contentInner, { opacity: 0, duration, ease });
        }
    }

    // ─── Apple-Style Desktop Navigation Logic ──────────────────────────────────────
    let activeNavContainer = null;
    let activeNavHeaderItem = null;

    document.querySelectorAll(".site_headerContains__megaMenu").forEach(item => {
        const megaMenu = item.querySelector(".site__megaMenu_container");
        const navLink = item.querySelector(".item_has--dropdown");
        const isMenuDisabled = item.getAttribute("data-disable-menu") === "true";

        if (!megaMenu) return;

        // initial hidden state
        gsap.set(megaMenu, { height: 0 });

        if (isMenuDisabled) {
            megaMenu.classList.add("site_megaMenu__Active");
            navLink?.classList.add("site_megaMenu__Active");
            navLink?.setAttribute("aria-expanded", "true");
            gsap.set(megaMenu, { height: "auto" });
            transitionContent(null, megaMenu, false);
            toggleMenu(true);
            return;
        }

        if (isMobile()) return; // mobile handled separately

        item.addEventListener("mouseenter", () => {
            if (activeNavHeaderItem === item) return; // Prevent re-triggering if already inside active menu

            const isSwitching = activeNavHeaderItem && activeNavHeaderItem !== item;
            const prevContainer = activeNavContainer;
            const prevHeaderItem = activeNavHeaderItem;

            activeNavHeaderItem = item;
            activeNavContainer = megaMenu;

            let startHeight = 0;
            if (isSwitching && prevContainer) {
                startHeight = prevContainer.getBoundingClientRect().height || prevContainer.offsetHeight || 0;
                
                // Animate outgoing content smooth fade out
                transitionContent(prevContainer, null, true);

                setTimeout(() => {
                    if (activeNavContainer !== prevContainer) {
                        prevContainer.classList.remove("site_megaMenu__Active");
                        const prevLink = prevHeaderItem?.querySelector(".item_has--dropdown");
                        prevLink?.classList.remove("site_megaMenu__Active");
                        prevLink?.setAttribute("aria-expanded", "false");
                        gsap.killTweensOf(prevContainer);
                        gsap.set(prevContainer, { height: 0 });
                    }
                }, 150);
            }

            megaMenu.classList.add("site_megaMenu__Active");
            navLink?.classList.add("site_megaMenu__Active");
            navLink?.setAttribute("aria-expanded", "true");

            megaMenu.style.height = "auto";
            const targetHeight = megaMenu.getBoundingClientRect().height || megaMenu.offsetHeight;
            megaMenu.style.height = startHeight + "px";

            gsap.killTweensOf(megaMenu);
            gsap.to(megaMenu, {
                height: targetHeight,
                duration: isSwitching ? 0.32 : 0.38,
                ease: "cubic-bezier(0.16, 1, 0.3, 1)",
                onComplete: () => {
                    if (activeNavContainer === megaMenu) {
                        megaMenu.style.height = "auto";
                    }
                }
            });

            transitionContent(null, megaMenu, isSwitching);
            toggleMenu(true);
        });

        item.addEventListener("mouseleave", () => {
            setTimeout(() => {
                const stillHovered = document.querySelector(".site_headerContains__megaMenu:hover");
                if (!stillHovered) {
                    activeNavHeaderItem = null;
                    activeNavContainer = null;
                    gsap.killTweensOf(megaMenu);
                    gsap.to(megaMenu, { 
                        height: 0, 
                        duration: 0.28, 
                        ease: "power2.inOut",
                        onComplete: () => {
                            megaMenu.classList.remove("site_megaMenu__Active");
                        }
                    });
                    navLink?.classList.remove("site_megaMenu__Active");
                    navLink?.setAttribute("aria-expanded", "false");
                    animateColumns(megaMenu, false);
                    toggleMenu(false);
                }
            }, 15);
        });

        item.addEventListener("focusin", () => {
            if (activeNavHeaderItem === item) return; // Prevent re-triggering animation when tabbing through links inside the active menu

            const isSwitching = activeNavHeaderItem && activeNavHeaderItem !== item;
            const prevContainer = activeNavContainer;
            const prevHeaderItem = activeNavHeaderItem;

            activeNavHeaderItem = item;
            activeNavContainer = megaMenu;

            let startHeight = 0;
            if (isSwitching && prevContainer) {
                startHeight = prevContainer.getBoundingClientRect().height || prevContainer.offsetHeight || 0;
                transitionContent(prevContainer, null, true);

                setTimeout(() => {
                    if (activeNavContainer !== prevContainer) {
                        prevContainer.classList.remove("site_megaMenu__Active");
                        const prevLink = prevHeaderItem?.querySelector(".item_has--dropdown");
                        prevLink?.classList.remove("site_megaMenu__Active");
                        prevLink?.setAttribute("aria-expanded", "false");
                        gsap.killTweensOf(prevContainer);
                        gsap.set(prevContainer, { height: 0 });
                    }
                }, 150);
            }

            megaMenu.classList.add("site_megaMenu__Active");
            navLink?.classList.add("site_megaMenu__Active");
            navLink?.setAttribute("aria-expanded", "true");

            megaMenu.style.height = "auto";
            const targetHeight = megaMenu.getBoundingClientRect().height || megaMenu.offsetHeight;
            megaMenu.style.height = startHeight + "px";

            gsap.killTweensOf(megaMenu);
            gsap.to(megaMenu, {
                height: targetHeight,
                duration: 0.35,
                ease: "cubic-bezier(0.16, 1, 0.3, 1)",
                onComplete: () => { megaMenu.style.height = "auto"; }
            });
            transitionContent(null, megaMenu, isSwitching);
            toggleMenu(true);
        });

        item.addEventListener("focusout", (e) => {
            if (!item.contains(e.relatedTarget)) {
                setTimeout(() => {
                    const stillFocused = document.querySelector(".site_headerContains__megaMenu:focus-within");
                    if (!stillFocused) {
                        activeNavHeaderItem = null;
                        activeNavContainer = null;
                        gsap.killTweensOf(megaMenu);
                        gsap.to(megaMenu, { height: 0, duration: 0.28, ease: "power2.inOut" });
                        navLink?.classList.remove("site_megaMenu__Active");
                        navLink?.setAttribute("aria-expanded", "false");
                        animateColumns(megaMenu, false);
                        toggleMenu(false);
                    }
                }, 15);
            }
        });
    });

    // ─── Mobile mega menu open ──────────────────────────────────────────────────────
    if (isMobile()) {
        megaMenus.forEach(megaMenu => {
            const parentLi = megaMenu.closest("li");
            const navLink = parentLi?.querySelector(".nav_link, .item_has--dropdown");

            if (!navLink) return;

            navLink.addEventListener("click", e => {
                e.preventDefault();
                megaMenu.classList.add("active");
                
                // Ensure inner elements are fully visible on mobile when opened
                const contentInner = megaMenu.querySelector(".site__megaMenu_content__inner");
                if (contentInner) {
                    gsap.killTweensOf(contentInner);
                    gsap.set(contentInner, { opacity: 1, x: 0, y: 0 });
                }
                const items = megaMenu.querySelectorAll("li, .site_megaMenu_ul-inner");
                gsap.killTweensOf(items);
                gsap.set(items, { opacity: 1, x: 0, y: 0 });
            });
        });

        backButtons.forEach(btn => {
            btn.addEventListener("click", function () {
                const megaMenu = this.closest(".site__megaMenu_container");
                if (!megaMenu) return;
                megaMenu.classList.remove("active");
                
                // Reset inner elements opacity so next open is clean
                const contentInner = megaMenu.querySelector(".site__megaMenu_content__inner");
                if (contentInner) {
                    gsap.set(contentInner, { opacity: 1, x: 0, y: 0 });
                }
                const items = megaMenu.querySelectorAll("li, .site_megaMenu_ul-inner");
                gsap.set(items, { opacity: 1, x: 0, y: 0 });
            });
        });
    }

    // ─── Hamburger toggle ───────────────────────────────────────────────────────────
    menuToggles.forEach(toggle => {
        toggle.addEventListener("click", () => {
            siteHeaders.forEach(h => h.classList.toggle("active"));
            menus.forEach(m => m.classList.toggle("active"));
            toggleBodyScroll(true);

            // Update aria-expanded and aria-label for accessibility (Issue 145)
            const isOpen = Array.from(siteHeaders).some(h => h.classList.contains("active"));
            toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
            toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

            if (!isOpen) {
                resetMegaMenus();
            }
        });
    });

  }
  siteMainHeader();


  //-----------------------------
  // HEADER PRODUCT ACCORDIAN
  //------------------
    function headerProductDropdown() {
      const parents = document.querySelectorAll('.mega-dropdown-parent');
      const toggles = document.querySelectorAll('[data-toggle-dropdown]');

      // console.log(`Found ${parents.length} dropdown parents`);
      // console.log(`Found ${toggles.length} toggles`);

      function getContent(parent) {
        return parent.querySelector('.mega-dropdown-content');
      }

      function closeOthers(targetParent) {
        parents.forEach((p) => {
          if (p !== targetParent && p.classList.contains('mega-dropdown-open')) {
            animateClose(p);
          }
        });
      }

      function animateOpen(parent) {
        const content = getContent(parent);
        if (!content) return;

        const items = content.querySelectorAll('.site_megaMenu__item');

        gsap.set(items, {
          y: 15,
          opacity: 0,
          overwrite: 'auto',
        });

        gsap.set(content, {
          height: 'auto',
          display: 'block',
          visibility: 'visible',
        });

        // Force a tiny reflow before measuring
        content.offsetHeight; // ← browser reflow trigger

        const fullHeight = content.scrollHeight + 'px';

        gsap.set(content, {
          height: 0,
          overflow: 'hidden',
        });

        const tl = gsap.timeline({ defaults: { overwrite: 'auto' } });

        tl.to(content, {
          height: fullHeight,
          duration: 0.55,
          ease: 'power3.out',
        }).to(
          items,
          {
            y: 0,
            opacity: 1,
            duration: 0.42,
            stagger: 0.07,
            ease: 'power2.out',
          },
          '-=0.35'
        );

        parent.classList.add('mega-dropdown-open');
      }

      function animateClose(parent) {
        const content = getContent(parent);
        if (!content) return;

        const items = content.querySelectorAll('.site_megaMenu__item');

        gsap.to(items, {
          y: -10,
          opacity: 0,
          duration: 0.32,
          stagger: 0.06,
          ease: 'power2.in',
        });

        gsap.to(content, {
          height: 0,
          duration: 0.45,
          ease: 'power2.in',
          delay: 0.1,
          onComplete: () => {
            parent.classList.remove('mega-dropdown-open');
            gsap.set(items, { clearProps: 'all' });
          },
        });
      }

      // Toggle logic (unchanged)
      toggles.forEach((toggle) => {
        toggle.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();

          const parent = this.closest('.mega-dropdown-parent');
          if (!parent) return;

          if (parent.classList.contains('mega-dropdown-open')) {
            animateClose(parent);
          } else {
            closeOthers(parent);
            animateOpen(parent);
          }
        });
      });

      // Close outside click (unchanged)
      document.addEventListener('click', function (e) {
        if (!e.target.closest('.mega-dropdown-parent')) {
          parents.forEach((p) => {
            if (p.classList.contains('mega-dropdown-open')) {
              animateClose(p);
            }
          });
        }
      });
    }
    headerProductDropdown();

  //-----------------------------
  // SLIDER SCRIPT START BANNERS
  //-----------------------


  function sliderLogic() {
    const images = document.querySelectorAll(
      ".am-main_slider-img .am-slide_item"
    );
    const texts = document.querySelectorAll(".am-main_slider-text");
    const progressBars = document.querySelectorAll(
      ".progress_bar-slider .blue"
    );
    let currentSlide = 0;
    let slideInterval;
    let isTransitioning = false;

    // Assign unique IDs to slides
    function assignSlideIDs() {
      const allSlides = document.querySelectorAll(
        ".am-main_slider-img .am-slide_item"
      );
      let highestId = 0;

      allSlides.forEach((img) => {
        const id = img.id;
        if (id) {
          const match = id.match(/am-slide_item-(\d+)/);
          if (match && match[1]) {
            highestId = Math.max(highestId, parseInt(match[1], 10));
          }
        }
      });

      allSlides.forEach((img) => {
        if (!img.id) {
          highestId += 1;
          img.id = `am-slide_item-${highestId}`;
        }
      });
    }

    // Assign data-slide-index attributes
    function assignSlideIndexes() {
      const allSlides = document.querySelectorAll(
        ".am-main_slider-img .am-slide_item"
      );
      const allTexts = document.querySelectorAll(".am-main_slider-text");

      allSlides.forEach((slide, index) => {
        if (!slide.hasAttribute("data-slide-index")) {
          slide.setAttribute("data-slide-index", index);
        }
      });

      allTexts.forEach((text, index) => {
        if (!text.hasAttribute("data-slide-index")) {
          text.setAttribute("data-slide-index", index);
        }
      });
    }

    // Hide slides with data-slide-none="true"
    function hideExcludedSlides() {
      const excludedSlides = document.querySelectorAll(
        '.am-slide_item[data-slide-none="true"], .am-main_slider-text[data-slide-none="true"]'
      );
      excludedSlides.forEach((element) => {
        element.style.display = "none";
      });
    }

    // Center active item on mobile
    function centerActiveItem() {
      if (window.innerWidth <= 860) {
        const activeText = document.querySelector(".am-main_slider-text.active");
        const container = document.querySelector(".am-slider_content-inner");
        
        if (activeText && container) {
          const containerWidth = container.offsetWidth;
          const itemLeft = activeText.offsetLeft;
          const itemWidth = activeText.offsetWidth;
          
          // Calculate scroll position to center the item
          const scrollPosition = itemLeft - (containerWidth / 2) + (itemWidth / 2);
          
          container.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
          });
        }
      }
    }

    assignSlideIDs();
    assignSlideIndexes();
    hideExcludedSlides();

    // Get sorted slides, excluding those with data-slide-none="true"
    function getSortedSlides() {
      const allSlides = Array.from(
        document.querySelectorAll(".am-main_slider-img .am-slide_item")
      );
      return allSlides
        .filter((slide) => slide.getAttribute("data-slide-none") !== "true")
        .sort((a, b) => {
          const indexA = parseInt(
            a.getAttribute("data-slide-index") || "9999",
            10
          );
          const indexB = parseInt(
            b.getAttribute("data-slide-index") || "9999",
            10
          );
          return indexA - indexB;
        });
    }

    // Set initial active slide
    const sortedSlides = getSortedSlides();
    if (sortedSlides.length > 0) {
      sortedSlides[0].classList.add("active");
      const firstIndex = parseInt(
        sortedSlides[0].getAttribute("data-slide-index") || "0",
        10
      );
      const firstText = Array.from(texts).find(
        (txt) =>
          parseInt(txt.getAttribute("data-slide-index") || "9999", 10) ===
          firstIndex
      );
      if (firstText) firstText.classList.add("active");
    }

    // Reset progress bars instantly
    function resetBarsInstantly(bars) {
      bars.forEach((bar) => {
        bar.style.transition = "none";
        bar.style.width = "0";
      });
      void document.body.offsetWidth;
    }

    // Start progress bar for active slide
    let isPaused = false;
    let liveRegion = null;
    let pauseBtn = null;

    // Create a live region for announcements
    const sliderContainer = document.querySelector(".am-main_slider-container");
    if (sliderContainer) {
      liveRegion = document.createElement("div");
      liveRegion.className = "sr-only";
      liveRegion.setAttribute("aria-live", "polite");
      liveRegion.setAttribute("aria-atomic", "true");
      liveRegion.style.cssText = "position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0;";
      sliderContainer.appendChild(liveRegion);

      // Pause slide rotation when keyboard focus enters the slideshow (A11Y requirement)
      // Pause slide rotation when keyboard focus enters the slideshow (A11Y requirement)
      sliderContainer.addEventListener("focusin", (e) => {
        // Ignore if focus is on the navigation controls themselves
        if (e.target.closest('.am-slider-play-pause, .am_slide--previous, .am_slide--next')) return;
        
        if (!isPaused) {
          isPaused = true;
          clearTimeout(slideInterval);
          if (pauseBtn) {
            const pauseIcon = pauseBtn.querySelector(".pause-icon");
            const playIcon = pauseBtn.querySelector(".play-icon");
            if (pauseIcon) pauseIcon.style.display = "none";
            if (playIcon) playIcon.style.display = "flex";
            pauseBtn.setAttribute("aria-label", "Play slideshow");
          }
        }
      });
    }

    function startProgressBar() {
      const activeText = document.querySelector(".am-main_slider-text.active");
      if (!activeText) return;
      const activeBar = activeText.querySelector(".progress_bar-slider .blue");
      if (!activeBar) return;

      resetBarsInstantly(progressBars);

      if (isPaused) {
        progressBars.forEach((bar) => {
          bar.style.transition = "none";
          bar.style.width = bar === activeBar ? "100%" : "0";
        });
      } else {
        progressBars.forEach((bar) => {
          bar.style.transition = bar === activeBar ? "width 5s linear" : "none";
          bar.style.width = bar === activeBar ? "100%" : "0";
        });
      }

      clearTimeout(slideInterval);
      if (!isPaused) {
        slideInterval = setTimeout(() => {
          nextSlide();
        }, 5000);
      }
    }

    // Show a specific slide
    function showSlide(slideIndex) {
      if (isTransitioning) return;
      isTransitioning = true;
      clearTimeout(slideInterval);

      images.forEach((img) => {
        const imgIndex = parseInt(
          img.getAttribute("data-slide-index") || "9999",
          10
        );
        const isExcluded = img.getAttribute("data-slide-none") === "true";
        const isActive = imgIndex === slideIndex && !isExcluded;
        img.classList.toggle("active", isActive);
        img.setAttribute("aria-hidden", isActive ? "false" : "true");
        if (isExcluded) {
          img.style.display = "none";
        }
      });

      texts.forEach((txt) => {
        const txtIndex = parseInt(
          txt.getAttribute("data-slide-index") || "9999",
          10
        );
        const isExcluded = txt.getAttribute("data-slide-none") === "true";
        const isActive = txtIndex === slideIndex && !isExcluded;
        txt.classList.toggle("active", isActive);
        txt.setAttribute("aria-current", isActive ? "true" : "false");
        if (isExcluded) {
          txt.style.display = "none";
        }
      });

      // Announce slide change to assistive technologies
      const activeText = Array.from(texts).find(
        (txt) => parseInt(txt.getAttribute("data-slide-index") || "9999", 10) === slideIndex
      );
      if (liveRegion && activeText) {
        const titleText = activeText.querySelector(".slider_text")?.textContent.trim() || "slide";
        liveRegion.textContent = `Showing slide: ${titleText}`;
      }

      startProgressBar();
      currentSlide = slideIndex;

      // Center the active item on mobile
      setTimeout(() => {
        centerActiveItem();
      }, 50);

      setTimeout(() => {
        isTransitioning = false;
      }, 300);
    }

    // Move to the next slide
    function nextSlide() {
      const sortedIndexes = getSortedSlides().map((slide) =>
        parseInt(slide.getAttribute("data-slide-index") || "9999", 10)
      );
      if (sortedIndexes.length === 0) return;
      const currentIndex = sortedIndexes.indexOf(currentSlide);
      const newIndex = sortedIndexes[(currentIndex + 1) % sortedIndexes.length];
      showSlide(newIndex);
    }

    // Move to the previous slide
    function prevSlide() {
      const sortedIndexes = getSortedSlides().map((slide) =>
        parseInt(slide.getAttribute("data-slide-index") || "9999", 10)
      );
      if (sortedIndexes.length === 0) return;
      const currentIndex = sortedIndexes.indexOf(currentSlide);
      const newIndex =
        sortedIndexes[
          (currentIndex - 1 + sortedIndexes.length) % sortedIndexes.length
        ];
      showSlide(newIndex);
    }

    // Create navigation controls dynamically
    function createNavigationButtons() {
      const navContainer = document.querySelector(".am-main_slider-content");
      if (!navContainer) return;

      // 1. Create Play/Pause Button
      pauseBtn = document.createElement("button");
      pauseBtn.className = "am-slider-play-pause";
      pauseBtn.setAttribute("type", "button");
      pauseBtn.setAttribute("aria-label", "Pause slideshow");
      pauseBtn.style.cssText = `
        background: rgba(0,0,0,0.65);
        border: 2px solid #fff;
        border-radius: 50%;
        width: clamp(30px,2vw,36px) !important;
        height: clamp(30px,2vw,36px) !important;
        color: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        pointer-events: auto;
        z-index: 10;
        margin-left: 10px;
        flex-shrink: 0;
      `;
      pauseBtn.innerHTML = `
        <span class="pause-icon" style="display: flex;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
  <rect x="6" y="5" width="4" height="14" rx="1" />
  <rect x="14" y="5" width="4" height="14" rx="1" />
</svg>
</span>
        <span class="play-icon" style="display: none;"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" height="24" width="24">
  <g id="Play-Arrow">
    <path id="Union" d="M7.51855 4.12297c0.3199 -0.17556 0.71069 -0.16266 1.01856 0.0332L19.5371 11.1562c0.2883 0.1835 0.4628 0.502 0.4629 0.8437 0 0.3419 -0.1746 0.6602 -0.4629 0.8438l-10.99999 7c-0.30792 0.1959 -0.69861 0.2088 -1.01856 0.0332C7.19869 19.7012 7 19.3649 7 18.9999V4.99992c0.00008 -0.36488 0.1987 -0.70135 0.51855 -0.87695M9 17.1777l8.1367 -5.1778L9 6.82121z" stroke-width="1"></path>
  </g>
</svg></span>
      `;
      
      pauseBtn.addEventListener("click", () => {
        isPaused = !isPaused;
        const pauseIcon = pauseBtn.querySelector(".pause-icon");
        const playIcon = pauseBtn.querySelector(".play-icon");
        if (isPaused) {
          clearTimeout(slideInterval);
          startProgressBar();
          if (pauseIcon) pauseIcon.style.display = "none";
          if (playIcon) playIcon.style.display = "flex";
          pauseBtn.setAttribute("aria-label", "Play slideshow");
        } else {
          if (pauseIcon) pauseIcon.style.display = "flex";
          if (playIcon) playIcon.style.display = "none";
          pauseBtn.setAttribute("aria-label", "Pause slideshow");
          startProgressBar();
        }
      });

      // 2. Create Previous Arrow Button
      const prevArrow = document.createElement("button");
      prevArrow.className = "am_slide--previous";
      prevArrow.setAttribute("type", "button");
      prevArrow.setAttribute("aria-label", "Previous slide");
      prevArrow.style.cssText = `
        background: rgba(0,0,0,0.65);
        border: 2px solid #fff;
        border-radius: 50%;
        width: clamp(30px,2vw,36px) !important;
        height: clamp(30px,2vw,36px) !important;
        color: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        pointer-events: auto;
        z-index: 10;
        margin-right: 10px;
        flex-shrink: 0;
      `;
      prevArrow.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M9.98862 19.1867L3.3245 12.5226C3.25565 12.4538 3.20104 12.3722 3.16377 12.2823C3.12651 12.1924 3.10733 12.096 3.10733 11.9987C3.10733 11.9014 3.12651 11.8051 3.16377 11.7152C3.20104 11.6253 3.25565 11.5436 3.3245 11.4749L9.98862 4.81074C10.1276 4.6718 10.316 4.59375 10.5125 4.59375C10.709 4.59375 10.8974 4.6718 11.0364 4.81074C11.1753 4.94968 11.2534 5.13813 11.2534 5.33462C11.2534 5.53111 11.1753 5.71955 11.0364 5.85849L5.63565 11.2583L20.1384 11.2583C20.3348 11.2583 20.5232 11.3363 20.662 11.4752C20.8009 11.614 20.8789 11.8024 20.8789 11.9987C20.8789 12.1951 20.8009 12.3835 20.662 12.5223C20.5232 12.6612 20.3348 12.7392 20.1384 12.7392L5.63565 12.7392L11.0364 18.139C11.1753 18.2779 11.2534 18.4664 11.2534 18.6629C11.2534 18.8594 11.1753 19.0478 11.0364 19.1867C10.8974 19.3257 10.709 19.4037 10.5125 19.4037C10.316 19.4037 10.1276 19.3257 9.98862 19.1867Z" fill="currentColor"></path>
					</svg>`;
      prevArrow.addEventListener("click", prevSlide);

      // 3. Create Next Arrow Button
      const nextArrow = document.createElement("button");
      nextArrow.className = "am_slide--next";
      nextArrow.setAttribute("type", "button");
      nextArrow.setAttribute("aria-label", "Next slide");
      nextArrow.style.cssText = `
        background: rgba(0,0,0,0.65);
        border: 2px solid #fff;
        border-radius: 50%;
        width: clamp(30px,2vw,36px)!important;
        height: clamp(30px,2vw,36px) !important;
        color: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        pointer-events: auto;
        z-index: 10;
        flex-shrink: 0;
      `;
      nextArrow.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M14.0133 4.80545L20.6775 11.4696C20.7463 11.5383 20.8009 11.62 20.8382 11.7099C20.8754 11.7998 20.8946 11.8961 20.8946 11.9934C20.8946 12.0908 20.8754 12.1871 20.8382 12.277C20.8009 12.3669 20.7463 12.4486 20.6775 12.5173L14.0133 19.1814C13.8744 19.3204 13.686 19.3984 13.4895 19.3984C13.293 19.3984 13.1045 19.3204 12.9656 19.1814C12.8266 19.0425 12.7486 18.8541 12.7486 18.6576C12.7486 18.4611 12.8266 18.2726 12.9656 18.1337L18.3663 12.7339L3.8635 12.7339C3.66712 12.7339 3.47879 12.6559 3.33992 12.517C3.20106 12.3782 3.12305 12.1898 3.12305 11.9934C3.12305 11.7971 3.20106 11.6087 3.33992 11.4699C3.47879 11.331 3.66712 11.253 3.8635 11.253L18.3663 11.253L12.9656 5.8532C12.8266 5.71426 12.7486 5.52581 12.7486 5.32932C12.7486 5.13283 12.8266 4.94439 12.9656 4.80545C13.1045 4.66651 13.293 4.58845 13.4895 4.58845C13.686 4.58845 13.8744 4.66651 14.0133 4.80545Z" fill="currentColor"></path>
					</svg>`;
      nextArrow.addEventListener("click", nextSlide);

      // Create controls wrapper
      const controlsWrapper = document.createElement("div");
      controlsWrapper.className = "am-slider-controls-wrapper";
      controlsWrapper.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 2;
      `;
      
      // Remove specific margins to let flex gap handle it
      prevArrow.style.marginRight = "0";
      pauseBtn.style.marginLeft = "0";

      controlsWrapper.appendChild(prevArrow);
      controlsWrapper.appendChild(nextArrow);
      controlsWrapper.appendChild(pauseBtn);

      navContainer.appendChild(controlsWrapper);
    }

    // Initialize the slider
    function initializeSlider() {
      hideExcludedSlides();
      
      // Make text indicators accessible controls (Issue requirement)
      texts.forEach((text) => {
        text.setAttribute("tabindex", "0");
        text.setAttribute("role", "button");
        const titleText = text.querySelector(".slider_text")?.textContent.trim() || "slide";
        text.setAttribute("aria-label", `Show slide: ${titleText}`);

        // Click trigger
        text.addEventListener("click", () => {
          const slideIndex = parseInt(text.getAttribute("data-slide-index") || "0", 10);
          if (getSortedSlides().some(slide => parseInt(slide.getAttribute("data-slide-index"), 10) === slideIndex)) {
            showSlide(slideIndex);
          }
        });

        // Keyboard trigger (Enter / Space)
        text.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            text.click();
          }
        });
      });

      const firstSlideIndex =
        sortedSlides.length > 0
          ? parseInt(
              sortedSlides[0].getAttribute("data-slide-index") || "0",
              10
            )
          : 0;
      showSlide(firstSlideIndex);
      createNavigationButtons();
      
      // Center on initial load for mobile
      setTimeout(() => {
        centerActiveItem();
      }, 100);
       // Remove skeleton loading state
      if (sliderContainer) {
        sliderContainer.classList.add("slider-loaded");
      }
    }

    
    initializeSlider();

    // Re-center on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        centerActiveItem();
      }, 250);
    });
  }
  sliderLogic();

  //----------------------------
  // Function to handle video
  // playback on scroll on if it's in view
  //----------------------

  function videoInViewPlayback() {
    const videos = document.querySelectorAll(".video-is__inView");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;

          if (!video.dataset.hasPlayed && entry.isIntersecting) {
            video.play();

            video.addEventListener(
              "ended",
              () => {
                video.dataset.hasPlayed = "true";
                video.currentTime = video.duration;
              },
              { once: true }
            );
          }

          if (video.dataset.hasPlayed && !entry.isIntersecting) {
            video.pause();
            video.currentTime = video.duration;
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    videos.forEach((video) => {
      video.loop = false;
      observer.observe(video);
    });
  }
  videoInViewPlayback();

  //----------------------------------------
  // Function to change image
  // on scroll using canvas
  //----------------------------

  function changeImageOnScroll() {
    const canvas = document.getElementById("animation-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const imagePath = canvas.dataset.imagePath;
    const totalImages = parseInt(canvas.dataset.totalImages, 10);
    const imageExtension = canvas.dataset.imageExtension || ".webp";
    const prefixLength = parseInt(canvas.dataset.imagePrefixLength || "3", 10);
    const triggerSelector =
      canvas.dataset.canvasTrigger || ".sticky__elements--section4";

    const images = [];
    let loadedImages = 0;
    let lastFrame = -1;

    const imageAspectRatio = 1920 / 1080;

    // Retina display fix
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;

    canvas.style.width = displayWidth + "px";
    canvas.style.height = displayHeight + "px";

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;

    let imageWidth = displayWidth;
    let imageHeight = displayWidth / imageAspectRatio;

    if (imageHeight > displayHeight) {
      imageHeight = displayHeight;
      imageWidth = displayHeight * imageAspectRatio;
    }

    const offsetX = Math.floor((displayWidth - imageWidth) / 2);
    const offsetY = Math.floor((displayHeight - imageHeight) / 2);

    let scrollProgress = 0;
    let currentFrameFloat = 0;

    function renderLoop() {
      const targetFrame = scrollProgress * (totalImages - 1);
      currentFrameFloat += (targetFrame - currentFrameFloat) * 0.1;
      const frame = Math.round(currentFrameFloat);

      if (frame !== lastFrame && images[frame]) {
        lastFrame = frame;
        ctx.clearRect(0, 0, displayWidth, displayHeight);
        ctx.drawImage(images[frame], offsetX, offsetY, imageWidth, imageHeight);
      }
      requestAnimationFrame(renderLoop);
    }

    function startAnimation() {
      ScrollTrigger.create({
        trigger: triggerSelector,
        start: "top top",
        end: "+=" + window.innerHeight * 5,
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          scrollProgress = self.progress;
        },
      });
      renderLoop();
    }

    // Load images
    for (let i = 0; i < totalImages; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(prefixLength, "0");
      img.src = `${imagePath}${paddedIndex}${imageExtension}`;

      img.onload = () => {
        loadedImages++;
        if (loadedImages === 1) {
          ctx.clearRect(0, 0, displayWidth, displayHeight);
          ctx.drawImage(img, offsetX, offsetY, imageWidth, imageHeight);
        }
        if (loadedImages === totalImages) {
          startAnimation();
        }
      };

      img.onerror = () => {
        console.error(`Failed to load image: ${img.src}`);
      };

      images.push(img);
    }
  }

  if (window.innerWidth > 820) {
    changeImageOnScroll();
  }

  //----------------------------------------
  // Function to Replace Text Across Sites
  //----------------------------

  function replaceTextAcrossSites() {
    if (".right__top") {
      return;
    }

    const replacements = [
      { pattern: /Game App/gi, replacement: "GAME APP" },
      { pattern: /Game/gi, replacement: "GAME" },
    ];

    function replaceText(node) {
      if (
        node.nodeType === Node.ELEMENT_NODE &&
        (node.tagName === "STYLE" || node.tagName === "SCRIPT")
      ) {
        return;
      }

      if (node.nodeType === Node.TEXT_NODE) {
        let text = node.textContent;
        replacements.forEach(({ pattern, replacement }) => {
          text = text.replace(pattern, replacement);
        });
        node.textContent = text;
      } else {
        node.childNodes.forEach(replaceText);
      }
    }

    document.body.childNodes.forEach(replaceText);
    }
  replaceTextAcrossSites();

  function changeLinkTextColor(selector, textColor) {
    const headerItem = document.querySelector(selector);

    if (headerItem) {
      const link = headerItem.querySelector('a[href="/pages/offer"]');

      if (link) {
        link.style.color = textColor;
      }
    }
  }

  const textColor = "#D80027";
  changeLinkTextColor(".header-item.header-item--split-right", textColor);
  changeLinkTextColor(".mobile-main-menu", textColor);

  function replaceText2(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const updatedText = node.nodeValue.replace(
        /TRAVIS MATHEW/g,
        "<span>TRAVISMATHEW</span>"
      );
      if (updatedText !== node.nodeValue) {
        const span = document.createElement("span");
        span.innerHTML = updatedText;
        node.parentNode.replaceChild(span, node);
      }
    } else {
      node.childNodes.forEach(replaceText2);
    }
  }

  replaceText2(document.body);

  function replaceText(node, replacements) {
    if (node.nodeType === Node.TEXT_NODE) {
      let updatedText = node.nodeValue;

      // Loop through all replacements and apply them
      replacements.forEach(({ pattern, replacement }) => {
        updatedText = updatedText.replace(pattern, replacement);
      });

      if (updatedText !== node.nodeValue) {
        node.nodeValue = updatedText;
      }
    } else if (
      node.nodeType === Node.ELEMENT_NODE &&
      !["SCRIPT", "STYLE", "NOSCRIPT"].includes(node.tagName)
    ) {
      node.childNodes.forEach((childNode) =>
        replaceText(childNode, replacements)
      );
    }
  }

  const textReplacements = [
    {
      pattern: /love it or your money back \| 60 day hassle-free returns/gi,
      replacement: "Love it or your money back | 100 day hassle-free returns",
    },
    {
      pattern: /60 day hassle-free returns/gi,
      replacement: "100 day hassle-free returns",
    },
    { pattern: /60 day returns/gi, replacement: "100 day returns" },
    { pattern: /60 days/gi, replacement: "100 DAYS" },
  ];

  replaceText(document.body, textReplacements);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) =>
        replaceText(node, textReplacements)
      );
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  function replaceTextTwo(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      node.nodeValue = node.nodeValue.replace(/SELECT Color:/g, "COLOR:");
    } else {
      node.childNodes.forEach(replaceTextTwo);
    }
  }
  replaceTextTwo(document.body);

  const spanElement = document.querySelector(
    ".ctm_success_message .cart_buttons span"
  );

  if (spanElement) {
    spanElement.classList.add("offer-msg");
  }

  function toggleOffer() {
    const offerMsg = document.querySelector(".offer-msg");
    if (offerMsg) {
      offerMsg.classList.toggle("show");
    }
  }

  const offerBtn = document.querySelector(".cart_buttons");
  if (offerBtn) {
    offerBtn.addEventListener("click", toggleOffer);
  }

  document.addEventListener("click", function (event) {
    const offerMsg = document.querySelector(".offer-msg");
    const offerBtn = document.querySelector(".cart_buttons");
    if (
      offerMsg &&
      offerBtn &&
      !offerMsg.contains(event.target) &&
      !offerBtn.contains(event.target)
    ) {
      offerMsg.classList.remove("show");
    }
  });

  const button = document.getElementById("myButton");
  if (button) {
    button.addEventListener("click", function () {
      document
        .querySelector(".additional-checkout-buttons")
        .classList.toggle("open-descrption");
    });
  } else {
    console.warn("Element with ID 'myButton' not found.");
  }

  $(".same-page-scroll").click(function () {
    window.location.reload();
  });

  //----------------------------
  // Function to handle
  // opening and closing modals
  //---------------

  function openingPopUp() {
    var learnMoreLinks = document.querySelectorAll(
      ".learn-more-link, .has__popup"
    );
    var closeBtns = document.querySelectorAll(".close, [data-close-popup]");

    learnMoreLinks.forEach(function (learnMoreLink) {
      learnMoreLink.onclick = function (event) {
        event.preventDefault();

        var modalId = learnMoreLink.getAttribute("data-target");
        var modal = document.getElementById(modalId);

        if (modal) {
          modal.style.display = "block";
        }
      };
    });

    closeBtns.forEach(function (closeBtn) {
      closeBtn.onclick = function () {
        var modal = closeBtn.closest(".modal");
        if (modal) {
          modal.style.display = "none";
        }
      };
    });

    window.addEventListener("click", function (event) {
      document.querySelectorAll(".modal").forEach(function (modal) {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        document.querySelectorAll(".modal").forEach(function (modal) {
          modal.style.display = "none";
        });
      }
    });
  }
  openingPopUp();

  // --------------------------------
  // Function to handle
  // sticky header and sticky areas
  // ----------------

  function stickyHeaderFromTop() {
    let lastScrollTop = 0;
    const scrollDownThreshold = 20;
    const scrollUpThreshold = 0;
    const header = document.querySelector(".site-header");
    const stickyAreas = document.querySelectorAll(
      ".tow_content--sticky-area, .playmaker_header-custom"
    );

    function updateStickyAreaPositions() {
      if (header) {
        const headerHeight = header.offsetHeight;

        stickyAreas.forEach((stickyArea) => {
          stickyArea.style.top = `${headerHeight}px`;
        });
      }
    }

    window.addEventListener("resize", updateStickyAreaPositions);

    window.addEventListener("scroll", function () {
      let currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll > scrollDownThreshold) {
        header.classList.add("fixed");

        if (
          currentScroll > lastScrollTop &&
          currentScroll > scrollDownThreshold + 10
        ) {
          header.classList.add("hidden");

          stickyAreas.forEach((stickyArea) => {
            stickyArea.style.top = "0";
          });
        } else if (lastScrollTop - currentScroll > scrollUpThreshold) {
          header.classList.remove("hidden");
          updateStickyAreaPositions();
        }
      } else {
        header.classList.remove("fixed");
        header.classList.remove("hidden");
        updateStickyAreaPositions();
      }

      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

    updateStickyAreaPositions();
  }
  stickyHeaderFromTop();

  //--------------------------------
  // Function to handle
  // mute button functionality
  //------------------

  function HandlingTheMuteBtn() {
    const video = document.getElementById("myVideo");
    const volumeToggle = document.getElementById("volumeToggle");
    const muteIcon = document.querySelector(".mute-icon");
    const unmuteIcon = document.querySelector(".unmute-icon");

    // Check if all required elements exist
    if (!video || !volumeToggle || !muteIcon || !unmuteIcon) {
      console.warn(
        "One or more elements (video, volumeToggle, muteIcon, unmuteIcon) not found."
      );
      return; // Exit if any element is missing
    }

    // Ensure the video is muted initially
    video.muted = true;

    // Toggle button functionality
    volumeToggle.addEventListener("click", function () {
      video.muted = !video.muted;

      if (video.muted) {
        muteIcon.style.display = "inline";
        unmuteIcon.style.display = "none";
      } else {
        muteIcon.style.display = "none";
        unmuteIcon.style.display = "inline";
      }
    });
  }

  HandlingTheMuteBtn();

  //------------------------------
  // Function to control
  // video playback and mute state
  //-----------------

  function videoControling() {
    const videos = document.querySelectorAll(".myVideo");
    const controlIcons = document.querySelectorAll(".videoControlIcon");

    videos.forEach((video, index) => {
      const icon = controlIcons[index];

      // Play video on icon click
      icon.addEventListener("click", function () {
        if (video.paused) {
          video.play();
          video.muted = false;
          icon.style.display = "none";
        }
      });

      // Pause video on click
      video.addEventListener("click", function () {
        if (!video.paused) {
          video.pause();
          video.muted = true;
          icon.style.display = "block";
        }
      });

      // Handle video end
      video.addEventListener("ended", function () {
        video.currentTime = 0;
        video.muted = true;
        icon.style.display = "block";
      });
    });
  }

  videoControling();

  //--------------------------------
  // Function to handle FAQ blocks
  // and search functionality
  // For CS TEAM FAQ PAGE
  //-----------------

  function appFaqBlocksHandling() {
    const faqBlocks = document.querySelectorAll('[id*="app_faq_blocks"]');
    const searchInput = document.querySelector("#faqSearch");
    const noResults = document.querySelector(".faq-no-results");
    if (!searchInput || !faqBlocks || !noResults) return;

    // Store original content to restore when clearing search
    faqBlocks.forEach((block) => {
      const productId = block.dataset.productId;
      const overlay = document.querySelector(
        `.faq_overlay[data-product-id="${productId}"]`
      );
      const title = block.querySelector(".faq_block--left h3");
      const faqItems = overlay ? overlay.querySelectorAll(".faq-item") : [];

      if (title) {
        title.dataset.original = title.innerHTML;
      }

      faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        question.dataset.original = question.innerHTML;
        answer.dataset.original = answer.innerHTML;
      });
    });

    // Toggle FAQ items (unchanged, but query all once)
    const faqItemsAll = document.querySelectorAll(".faq-item");
    faqItemsAll.forEach((item) => {
      const question = item.querySelector(".faq-question");
      question.addEventListener("click", () => {
        const answer = item.querySelector(".faq-answer");
        const isOpen = answer.style.display === "block";

        if (isOpen) {
          answer.style.display = "none";
          item.classList.remove("active");
          question.querySelector(".toggle-icon").textContent = "+";
        } else {
          answer.style.display = "block";
          item.classList.add("active");
          question.querySelector(".toggle-icon").textContent = "−";
        }
      });
    });

    // Search and highlight functionality, now filtering at product/block level

    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.trim().toLowerCase();
      let visibleBlocksCount = 0;

      faqBlocks.forEach((block) => {
        const productId = block.dataset.productId;
        const overlay = document.querySelector(
          `.faq_overlay[data-product-id="${productId}"]`
        );
        const title = block.querySelector(".faq_block--left h3");
        const faqItems = overlay ? overlay.querySelectorAll(".faq-item") : [];
        let blockMatches = false;

        // Restore original content for title and items
        if (title) {
          title.innerHTML = title.dataset.original;
        }
        faqItems.forEach((item) => {
          const question = item.querySelector(".faq-question");
          const answer = item.querySelector(".faq-answer");
          question.innerHTML = question.dataset.original;
          answer.innerHTML = answer.dataset.original;
          // Close item by default during search
          answer.style.display = "none";
          item.classList.remove("active");
          question.querySelector(".toggle-icon").textContent = "+";
        });

        if (searchTerm) {
          const titleText = title ? title.textContent.toLowerCase() : "";

          // Check title for match
          if (titleText.includes(searchTerm)) {
            blockMatches = true;
            // Highlight in title
            const regex = new RegExp(`(${searchTerm})`, "gi");
            title.innerHTML = title.textContent.replace(
              regex,
              "<mark>$1</mark>"
            );
          }

          // Check each FAQ item for matches
          faqItems.forEach((item) => {
            const question = item.querySelector(".faq-question");
            const answer = item.querySelector(".faq-answer");
            const questionText = question.textContent.toLowerCase();
            const answerText = answer.textContent.toLowerCase();
            let itemMatches = false;

            if (questionText.includes(searchTerm)) {
              blockMatches = true;
              itemMatches = true;
              const regex = new RegExp(`(${searchTerm})`, "gi");
              const questionContent = question.textContent.replace(
                regex,
                "<mark>$1</mark>"
              );
              question.innerHTML =
                questionContent +
                question.querySelector(".toggle-icon").outerHTML;
            }

            if (answerText.includes(searchTerm)) {
              blockMatches = true;
              itemMatches = true;
              const regex = new RegExp(`(${searchTerm})`, "gi");
              answer.innerHTML = answer.innerHTML.replace(
                regex,
                "<mark>$1</mark>"
              );
            }

            // Optionally auto-open matching items (when overlay is opened later)
            if (itemMatches) {
              // Note: Since overlay is hidden, we don't open here; user will click block to see overlay
            }

            // Always show all items within a matching block's overlay (no hiding individual items)
            item.style.display = "inline-block";
          });
        } else {
          // No search term: show all blocks and items, closed
          blockMatches = true;
          faqItems.forEach((item) => {
            item.style.display = "inline-block";
          });
        }

        // Show/hide the entire block based on matches
        block.style.display = blockMatches ? "inline-block" : "none";
        // Also hide/show the associated overlay (though it's probably already hidden via CSS)
        if (overlay) {
          overlay.style.display = blockMatches ? "inline-block" : "none";
        }
        if (blockMatches) {
          visibleBlocksCount++;
        }
      });

      // Show/hide no results message
      noResults.style.display =
        visibleBlocksCount === 0 && searchTerm ? "block" : "none";
    });
  }
  appFaqBlocksHandling();

  function openingFaqBackFace() {
    const faqBlocks = document.querySelectorAll(".faq__block");
    const faqOverlays = document.querySelectorAll(".faq_overlay");

    function openOverlay(overlay) {
      document.body.classList.add("no-scroll_faq");
      overlay.style.display = "block";
      gsap.to(overlay, {
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    }

    function closeOverlay(overlay) {
      gsap.to(overlay, {
        y: "100vh",
        duration: 0.6,
        ease: "power2.in",
        onComplete: () => {
          overlay.style.display = "none";
          document.body.classList.remove("no-scroll_faq");
        },
      });
    }

    faqBlocks.forEach((block) => {
      block.addEventListener("click", () => {
        const productId = block.getAttribute("data-product-id");
        const targetOverlay = document.querySelector(
          `.faq_overlay[data-product-id="${productId}"]`
        );
        if (targetOverlay) {
          openOverlay(targetOverlay);
        }
      });
    });

    faqOverlays.forEach((overlay) => {
      const closeIcon = overlay.querySelector(".close-icon");
      const overlayContent = overlay.querySelector(".overlay__content");

      closeIcon.addEventListener("click", () => {
        closeOverlay(overlay);
      });

      overlay.addEventListener("click", (e) => {
        if (!overlayContent.contains(e.target)) {
          closeOverlay(overlay);
        }
      });
    });
  }
  openingFaqBackFace();

  /*-------------------------------
    Parallex
  -----------------*/

  function parallexHero() {
    const videoRefs = document.querySelectorAll(".has_parallex");

    if (!videoRefs.length) {
      console.warn("No elements found: .has_parallex");
      return;
    }

    const throttle = (func, limit) => {
      let inThrottle;
      return (...args) => {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    };

    const handleScroll = throttle(() => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      videoRefs.forEach((videoRef, index) => {
        const rect = videoRef.getBoundingClientRect();
        const elementTop = rect.top + scrollPosition;
        const elementBottom = elementTop + rect.height;

        const startScroll = elementTop - windowHeight * 0.5;
        const endScroll = elementBottom - windowHeight * 0.1;

        let progress =
          (scrollPosition - startScroll) / (endScroll - startScroll);
        progress = Math.max(0, Math.min(1, progress));

        const translateY = progress * 100 * (index + 1);
        videoRef.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${translateY}, 0, 1)`;
      });
    }, 1);

    const handleResize = throttle(() => {
      handleScroll();
    }, 100);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }

  parallexHero();

  // /*----------------------------
  //   VIDEO PREVIEW LOGIC  
  // ----------------*/

  // function handleVideoPreview() {
  //   const videoPreviews = document.querySelectorAll(".video-preview");
  //   const specialCase =   window.location.pathname === "/pages/careers";
  //   const startTime = specialCase ? 11 : 0;
  //   const endTime = specialCase ? 16 : 5;


  //   const videoInstances = [];

  //   videoPreviews.forEach((preview, index) => {
  //     // ────────────────────────────────────────────────
  //     // Core elements
  //     const previewVideo     = preview.querySelector(".preview-video");
  //     const playButtonContent = preview.querySelector(".video_overlay-content, .video_overlay-holder");
  //     const loader           = preview.querySelector("[id*='loader-'], .loader, .video-loader");

  //     if (!previewVideo || !playButtonContent) {
  //       console.warn(`Video block ${index + 1} missing core elements`);
  //       return;
  //     }

  //     // Make play button keyboard focusable and accessible (Issue 30)
  //     if (playButtonContent.tagName !== "BUTTON" && playButtonContent.tagName !== "A") {
  //       playButtonContent.setAttribute("role", "button");
  //       playButtonContent.setAttribute("tabindex", "0");
  //       if (!playButtonContent.getAttribute("aria-label")) {
  //         playButtonContent.setAttribute("aria-label", "Play video");
  //       }
  //       playButtonContent.addEventListener("keydown", e => {
  //         if (e.key === "Enter" || e.key === " ") {
  //           e.preventDefault();
  //           playButtonContent.click();
  //         }
  //       });
  //     }

  //     const hideLoader = () => {
  //       if (loader) loader.style.display = "none";
  //       preview.classList.add("dialog-video__loading");
  //     };

  //     // ────────────────────────────────────────────────
  //     // Popup elements (only relevant in popup mode)
  //     const videoPopup   = document.getElementById("[id*='dialog-video__']");
  //     const popupContent = document.getElementById("[id*='dialog-content__']");
  //     const fullVideo    = document.getElementById("[id*='dialog-full__video-']");
  //     const closeButton  = document.getElementById("[id*='dialog-close__btn-']");

  //     const hasPopupElements = videoPopup && popupContent && fullVideo && closeButton;

  //     // Playback mode decision
  //     const playInPlaceAttr = preview.dataset.playInPlace;
  //     let playInPlace = playInPlaceAttr === "true" ? true :
  //                       playInPlaceAttr === "false" ? false :
  //                       !hasPopupElements;

  //     if (playInPlaceAttr === "false" && !hasPopupElements) {
  //       console.warn(`Block ${index + 1} forced popup but no popup elements → fallback to in-place`);
  //       playInPlace = true;
  //     }

  //     // ────────────────────────────────────────────────
  //     // Video source & type detection
  //     const videoUrl = preview.dataset.videoUrl || previewVideo.src || "";
  //     const isVimeo  = videoUrl.includes("vimeo.com") || videoUrl.includes("player.vimeo.com");
  //     const isIframe = previewVideo.tagName === "IFRAME" || isVimeo;

  //     if (!isIframe) {
  //       previewVideo.src = videoUrl;
  //       if (!playInPlace && fullVideo) fullVideo.src = videoUrl;
  //     }

  //     // ────────────────────────────────────────────────
  //     let vimeoPlayer   = null;
  //     let isPreviewMode = true;
  //     let isPlayingFull = false;

  //     const videoInstance = {
  //       index,
  //       previewVideo,
  //       playButtonContent,
  //       isIframe,
  //       isVimeo,
  //       vimeoPlayer: null,
  //       playInPlace,
  //       stopFullPlayback: () => {
  //         if (!isPlayingFull) return;

  //         if (isVimeo && vimeoPlayer) {
  //           vimeoPlayer.pause();
  //           vimeoPlayer.setCurrentTime(startTime);
  //           vimeoPlayer.setLoop(true);
  //           vimeoPlayer.play().catch(() => {});
  //         } else {
  //           previewVideo.pause();
  //           previewVideo.currentTime = startTime;
  //           previewVideo.loop = true;
  //           previewVideo.muted = true;
  //           previewVideo.play().catch(() => {});
  //         }

  //         playButtonContent.style.opacity = "1";
  //         playButtonContent.style.pointerEvents = "auto";
  //         isPreviewMode = true;
  //         isPlayingFull = false;
  //       }
  //     };
  //     videoInstances.push(videoInstance);

  //     // ────────────────────────────────────────────────
  //     // Reliable loader hiding
  //     const safeHideLoader = () => {
  //       hideLoader();
  //       // console.log(`Loader hidden - block ${index + 1}`);
  //     };

  //     if (isVimeo) {
  //       try {
  //         vimeoPlayer = new Vimeo.Player(previewVideo);
  //         videoInstance.vimeoPlayer = vimeoPlayer;

  //         vimeoPlayer.on("playing", safeHideLoader);
  //         vimeoPlayer.on("play", safeHideLoader);

  //         vimeoPlayer.on("loaded", () => {
  //           vimeoPlayer.setCurrentTime(startTime).then(() => {
  //             vimeoPlayer.play().catch(err => {
  //               console.log(`Vimeo autoplay blocked ${index + 1}:`, err);
  //               safeHideLoader();
  //             });
  //           });
  //         });

  //         vimeoPlayer.on("timeupdate", data => {
  //           if (isPreviewMode && data.seconds >= endTime) {
  //             vimeoPlayer.setCurrentTime(startTime);
  //           }
  //         });

  //         vimeoPlayer.on("error", err => {
  //           console.error(`Vimeo error ${index + 1}:`, err);
  //           safeHideLoader();
  //         });

  //         setTimeout(safeHideLoader, 6000);

  //       } catch (err) {
  //         console.error(`Vimeo init failed ${index + 1}:`, err);
  //         safeHideLoader();
  //       }
  //     } else {
  //       // HTML5 <video>
  //       previewVideo.addEventListener("loadedmetadata", () => {
  //         previewVideo.currentTime = startTime;
  //         previewVideo.muted = true;
  //         previewVideo.loop = true;
  //         previewVideo.play().catch(err => {
  //           console.log(`HTML5 autoplay blocked ${index + 1}:`, err);
  //           safeHideLoader();
  //         });
  //         safeHideLoader();
  //       });

  //       previewVideo.addEventListener("canplay", safeHideLoader);
  //       previewVideo.addEventListener("timeupdate", () => {
  //         if (isPreviewMode && previewVideo.currentTime >= endTime) {
  //           previewVideo.currentTime = startTime;
  //         }
  //       });

  //       previewVideo.addEventListener("error", () => {
  //         console.error(`HTML5 error ${index + 1}`);
  //         safeHideLoader();
  //       });

  //       setTimeout(safeHideLoader, 6000);
  //     }

  //     // ────────────────────────────────────────────────
  //     // Play button → start full playback
  //     playButtonContent.addEventListener("click", e => {
  //       e.stopPropagation();

  //       // Stop other in-place videos
  //       videoInstances.forEach(inst => {
  //         if (inst.index !== index && inst.playInPlace) {
  //           inst.stopFullPlayback();
  //         }
  //       });

  //       isPreviewMode = false;
  //       isPlayingFull = true;
  //       playButtonContent.style.opacity = "0";
  //       playButtonContent.style.pointerEvents = "none";

  //       if (playInPlace) {
  //         // In-place full playback
  //         if (isVimeo && vimeoPlayer) {
  //           vimeoPlayer.setCurrentTime(0)
  //             .then(() => {
  //               vimeoPlayer.setLoop(false);
  //               vimeoPlayer.play();
  //             })
  //             .catch(err => {
  //               console.error(`Vimeo full play error ${index + 1}:`, err);
  //               playButtonContent.style.opacity = "1";
  //               playButtonContent.style.pointerEvents = "auto";
  //               isPreviewMode = true;
  //               isPlayingFull = false;
  //             });

  //           vimeoPlayer.off("ended"); // clean previous listeners
  //           vimeoPlayer.on("ended", () => {
  //             playButtonContent.style.opacity = "1";
  //             playButtonContent.style.pointerEvents = "auto";
  //             isPreviewMode = true;
  //             isPlayingFull = false;
  //             vimeoPlayer.setCurrentTime(startTime);
  //             vimeoPlayer.setLoop(true);
  //             vimeoPlayer.play();
  //           });
  //         } else {
  //           // HTML5 full
  //           previewVideo.currentTime = 0;
  //           previewVideo.loop = false;
  //           previewVideo.muted = false;

  //           previewVideo.play().catch(err => {
  //             console.error(`HTML5 full play error ${index + 1}:`, err);
  //             playButtonContent.style.opacity = "1";
  //             playButtonContent.style.pointerEvents = "auto";
  //             isPreviewMode = true;
  //             isPlayingFull = false;
  //             previewVideo.muted = true;
  //           });

  //           const onEnd = () => {
  //             playButtonContent.style.opacity = "1";
  //             playButtonContent.style.pointerEvents = "auto";
  //             isPreviewMode = true;
  //             isPlayingFull = false;
  //             previewVideo.currentTime = startTime;
  //             previewVideo.loop = true;
  //             previewVideo.muted = true;
  //             previewVideo.play().catch(() => {});
  //             previewVideo.removeEventListener("ended", onEnd);
  //           };
  //           previewVideo.addEventListener("ended", onEnd);
  //         }
  //       } else if (hasPopupElements) {
  //         // Popup mode
  //         if (isVimeo && vimeoPlayer) vimeoPlayer.pause();

  //         document.body.classList.add("dialog-box__open");

  //         gsap.to(videoPopup, {
  //           opacity: 1,
  //           duration: 0.2,
  //           ease: "power2.out",
  //           onStart: () => {
  //             videoPopup.style.display = "flex";
  //             videoPopup.style.pointerEvents = "auto";
  //           }
  //         });

  //         gsap.to(popupContent, {
  //           opacity: 1,
  //           duration: 0.5,
  //           delay: 0.2,
  //           ease: "power2.out",
  //           onComplete: () => {
  //             if (isVimeo) {
  //               new Vimeo.Player(fullVideo).play();
  //             } else {
  //               fullVideo.play();
  //             }
  //           }
  //         });
  //       }
  //     });

  //     // ────────────────────────────────────────────────
  //     // NEW: Click anywhere on preview area to exit full playback (playInPlace only)
  //     if (playInPlace) {
  //       const exitFullOnClick = e => {
  //         // Ignore clicks on the play button overlay
  //         if (playButtonContent.contains(e.target)) return;

  //         if (isPlayingFull) {
  //           e.preventDefault();
  //           e.stopPropagation();

  //           if (isVimeo && vimeoPlayer) {
  //             vimeoPlayer.pause();
  //             vimeoPlayer.setCurrentTime(startTime);
  //             vimeoPlayer.setLoop(true);
  //             vimeoPlayer.play().catch(() => {});
  //           } else {
  //             previewVideo.pause();
  //             previewVideo.currentTime = startTime;
  //             previewVideo.loop = true;
  //             previewVideo.muted = true;
  //             previewVideo.play().catch(() => {});
  //           }

  //           playButtonContent.style.opacity = "1";
  //           playButtonContent.style.pointerEvents = "auto";
  //           isPreviewMode = true;
  //           isPlayingFull = false;
  //         }
  //       };

  //       preview.addEventListener("click", exitFullOnClick);
  //       // Optional: more precise → only on video/iframe
  //       // previewVideo.addEventListener("click", exitFullOnClick);
  //     }

  //     // ────────────────────────────────────────────────
  //     // Popup close (only popup mode)
  //     if (!playInPlace && closeButton) {
  //       closeButton.addEventListener("click", () => {
  //         gsap.to(popupContent, {
  //           opacity: 0,
  //           duration: 0.5,
  //           ease: "power2.in",
  //           onStart: () => {
  //             if (isVimeo) {
  //               const fp = new Vimeo.Player(fullVideo);
  //               fp.pause();
  //               if (fullVideo.dataset.videoBehavior === "restart") fp.setCurrentTime(0);
  //             } else {
  //               fullVideo.pause();
  //               if (fullVideo.dataset.videoBehavior === "restart") fullVideo.currentTime = 0;
  //             }
  //           }
  //         });

  //         gsap.to(videoPopup, {
  //           opacity: 0,
  //           duration: 0.2,
  //           delay: 0.5,
  //           ease: "power2.in",
  //           onComplete: () => {
  //             videoPopup.style.display = "none";
  //             videoPopup.style.pointerEvents = "none";
  //             document.body.classList.remove("dialog-box__open");

  //             if (isVimeo && vimeoPlayer) vimeoPlayer.play().catch(() => {});
  //             else previewVideo.play().catch(() => {});
  //           }
  //         });
  //       });

  //       document.addEventListener("keydown", e => {
  //         if (e.key === "Escape" && videoPopup.style.display !== "none") {
  //           closeButton.click();
  //         }
  //       });
  //     }
  //   });
  // }

  // handleVideoPreview();

    /*----------------------------
    VIDEO PREVIEW LOGIC  
  ----------------*/

  function handleVideoPreview() {
    const videoPreviews = document.querySelectorAll(".video-preview");
    const specialCase = window.location.pathname === "/pages/careers";
    const startTime = specialCase ? 11 : 0;
    const endTime = specialCase ? 16 : 5;

    const videoInstances = [];

    videoPreviews.forEach((preview, index) => {
      // ────────────────────────────────────────────────
      // Core elements
      const previewVideo = preview.querySelector(".preview-video");
      const playButtonContent = preview.querySelector(
        ".video_overlay-content, .video_overlay-holder",
      );
      const loader = preview.querySelector(
        "[id*='loader-'], .loader, .video-loader",
      );

      if (!previewVideo || !playButtonContent) {
        console.warn(`Video block ${index + 1} missing core elements`);
        return;
      }

      // Make play button keyboard focusable and accessible (Issue 30)
      if (
        playButtonContent.tagName !== "BUTTON" &&
        playButtonContent.tagName !== "A"
      ) {
        playButtonContent.setAttribute("role", "button");
        playButtonContent.setAttribute("tabindex", "0");
        if (!playButtonContent.getAttribute("aria-label")) {
          playButtonContent.setAttribute("aria-label", "Play video");
        }
        playButtonContent.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            playButtonContent.click();
          }
        });
      }

      const hideLoader = () => {
        if (loader) loader.style.display = "none";
        preview.classList.add("dialog-video__loading");
      };

      // ────────────────────────────────────────────────
      // Popup elements (only relevant in popup mode)
      const videoPopup = document.getElementById("[id*='dialog-video__']");
      const popupContent = document.getElementById("[id*='dialog-content__']");
      const fullVideo = document.getElementById("[id*='dialog-full__video-']");
      const closeButton = document.getElementById("[id*='dialog-close__btn-']");

      const hasPopupElements =
        videoPopup && popupContent && fullVideo && closeButton;

      // Playback mode decision
      const playInPlaceAttr = preview.dataset.playInPlace;
      let playInPlace =
        playInPlaceAttr === "true"
          ? true
          : playInPlaceAttr === "false"
            ? false
            : !hasPopupElements;

      if (playInPlaceAttr === "false" && !hasPopupElements) {
        console.warn(
          `Block ${index + 1} forced popup but no popup elements → fallback to in-place`,
        );
        playInPlace = true;
      }

      // ────────────────────────────────────────────────
      // Video source & type detection
      const videoUrl = preview.dataset.videoUrl || previewVideo.src || "";
      const isVimeo =
        videoUrl.includes("vimeo.com") || videoUrl.includes("player.vimeo.com");
      const isIframe = previewVideo.tagName === "IFRAME" || isVimeo;

      if (!isIframe) {
        previewVideo.src = videoUrl;
        if (!playInPlace && fullVideo) fullVideo.src = videoUrl;
      }

      // ────────────────────────────────────────────────
      let vimeoPlayer = null;
      let isPreviewMode = true;
      let isPlayingFull = false;

      const videoInstance = {
        index,
        previewVideo,
        playButtonContent,
        isIframe,
        isVimeo,
        vimeoPlayer: null,
        playInPlace,
        stopFullPlayback: () => {
          if (!isPlayingFull) return;

          if (isVimeo && vimeoPlayer) {
            vimeoPlayer.pause();
            vimeoPlayer.setCurrentTime(startTime);
            vimeoPlayer.setLoop(true);
            vimeoPlayer.play().catch(() => {});
          } else {
            previewVideo.removeAttribute("controls");
            previewVideo.pause();
            previewVideo.currentTime = startTime;
            previewVideo.loop = true;
            previewVideo.muted = true;
            previewVideo.play().catch(() => {});
          }

          playButtonContent.style.opacity = "1";
          playButtonContent.style.pointerEvents = "auto";
          isPreviewMode = true;
          isPlayingFull = false;
        },
      };
      videoInstances.push(videoInstance);

      // ────────────────────────────────────────────────
      // Reliable loader hiding
      const safeHideLoader = () => {
        hideLoader();
      };

      if (isVimeo) {
        try {
          vimeoPlayer = new Vimeo.Player(previewVideo);
          videoInstance.vimeoPlayer = vimeoPlayer;

          vimeoPlayer.on("playing", safeHideLoader);
          vimeoPlayer.on("play", safeHideLoader);

          vimeoPlayer.on("loaded", () => {
            vimeoPlayer.setCurrentTime(startTime).then(() => {
              vimeoPlayer.play().catch((err) => {
                console.log(`Vimeo autoplay blocked ${index + 1}:`, err);
                safeHideLoader();
              });
            });
          });

          vimeoPlayer.on("timeupdate", (data) => {
            if (isPreviewMode && data.seconds >= endTime) {
              vimeoPlayer.setCurrentTime(startTime);
            }
          });

          vimeoPlayer.on("error", (err) => {
            console.error(`Vimeo error ${index + 1}:`, err);
            safeHideLoader();
          });

          setTimeout(safeHideLoader, 6000);
        } catch (err) {
          console.error(`Vimeo init failed ${index + 1}:`, err);
          safeHideLoader();
        }
      } else {
        // HTML5 <video>
        previewVideo.addEventListener("loadedmetadata", () => {
          previewVideo.currentTime = startTime;
          previewVideo.muted = true;
          previewVideo.loop = true;
          previewVideo.play().catch((err) => {
            console.log(`HTML5 autoplay blocked ${index + 1}:`, err);
            safeHideLoader();
          });
          safeHideLoader();
        });

        previewVideo.addEventListener("canplay", safeHideLoader);
        previewVideo.addEventListener("timeupdate", () => {
          if (isPreviewMode && previewVideo.currentTime >= endTime) {
            previewVideo.currentTime = startTime;
          }
        });

        previewVideo.addEventListener("error", () => {
          console.error(`HTML5 error ${index + 1}`);
          safeHideLoader();
        });

        setTimeout(safeHideLoader, 6000);
      }

      // ────────────────────────────────────────────────
      // Play button → start full playback
      playButtonContent.addEventListener("click", (e) => {
        e.stopPropagation();

        // Stop other in-place videos
        videoInstances.forEach((inst) => {
          if (inst.index !== index && inst.playInPlace) {
            inst.stopFullPlayback();
          }
        });

        isPreviewMode = false;
        isPlayingFull = true;
        playButtonContent.style.opacity = "0";
        playButtonContent.style.pointerEvents = "none";

        if (playInPlace) {
          // In-place full playback
          if (isVimeo && vimeoPlayer) {
            vimeoPlayer
              .setCurrentTime(0)
              .then(() => {
                vimeoPlayer.setLoop(false);
                vimeoPlayer.play();
              })
              .catch((err) => {
                console.error(`Vimeo full play error ${index + 1}:`, err);
                playButtonContent.style.opacity = "1";
                playButtonContent.style.pointerEvents = "auto";
                isPreviewMode = true;
                isPlayingFull = false;
              });

            vimeoPlayer.off("ended"); // clean previous listeners
            vimeoPlayer.on("ended", () => {
              playButtonContent.style.opacity = "1";
              playButtonContent.style.pointerEvents = "auto";
              isPreviewMode = true;
              isPlayingFull = false;
              vimeoPlayer.setCurrentTime(startTime);
              vimeoPlayer.setLoop(true);
              vimeoPlayer.play();
            });
          } else {
            // HTML5 full - enable video controls without download option
            previewVideo.setAttribute("controls", "true");
            previewVideo.setAttribute("controlsList", "nodownload");
            previewVideo.currentTime = 0;
            previewVideo.loop = false;
            previewVideo.muted = false;

            previewVideo.play().catch((err) => {
              console.error(`HTML5 full play error ${index + 1}:`, err);
              previewVideo.removeAttribute("controls");
              previewVideo.removeAttribute("controlsList");
              playButtonContent.style.opacity = "1";
              playButtonContent.style.pointerEvents = "auto";
              isPreviewMode = true;
              isPlayingFull = false;
              previewVideo.muted = true;
            });

            const onEnd = () => {
              previewVideo.removeAttribute("controls");
              previewVideo.removeAttribute("controlsList");
              playButtonContent.style.opacity = "1";
              playButtonContent.style.pointerEvents = "auto";
              isPreviewMode = true;
              isPlayingFull = false;
              previewVideo.currentTime = startTime;
              previewVideo.loop = true;
              previewVideo.muted = true;
              previewVideo.play().catch(() => {});
              previewVideo.removeEventListener("ended", onEnd);
            };
            previewVideo.addEventListener("ended", onEnd);
          }
        } else if (hasPopupElements) {
          // Popup mode
          if (isVimeo && vimeoPlayer) vimeoPlayer.pause();

          document.body.classList.add("dialog-box__open");

          gsap.to(videoPopup, {
            opacity: 1,
            duration: 0.2,
            ease: "power2.out",
            onStart: () => {
              videoPopup.style.display = "flex";
              videoPopup.style.pointerEvents = "auto";
            },
          });

          gsap.to(popupContent, {
            opacity: 1,
            duration: 0.5,
            delay: 0.2,
            ease: "power2.out",
            onComplete: () => {
              if (isVimeo) {
                new Vimeo.Player(fullVideo).play();
              } else {
                fullVideo.setAttribute("controls", "true");
                fullVideo.setAttribute("controlsList", "nodownload");
                fullVideo.play();
              }
            },
          });
        }
      });

      // ────────────────────────────────────────────────
      // Exit full playback on click (playInPlace only)
      if (playInPlace) {
        const exitFullOnClick = (e) => {
          // Ignore clicks on the play button overlay
          if (playButtonContent.contains(e.target)) return;

          if (isPlayingFull) {
            e.preventDefault();
            e.stopPropagation();

            if (isVimeo && vimeoPlayer) {
              vimeoPlayer.pause();
              vimeoPlayer.setCurrentTime(startTime);
              vimeoPlayer.setLoop(true);
              vimeoPlayer.play().catch(() => {});
            } else {
              previewVideo.removeAttribute("controls");
              previewVideo.removeAttribute("controlsList");
              previewVideo.pause();
              previewVideo.currentTime = startTime;
              previewVideo.loop = true;
              previewVideo.muted = true;
              previewVideo.play().catch(() => {});
            }

            playButtonContent.style.opacity = "1";
            playButtonContent.style.pointerEvents = "auto";
            isPreviewMode = true;
            isPlayingFull = false;
          }
        };

        preview.addEventListener("click", exitFullOnClick);
      }

      // ────────────────────────────────────────────────
      // Popup close (only popup mode)
      if (!playInPlace && closeButton) {
        closeButton.addEventListener("click", () => {
          gsap.to(popupContent, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            onStart: () => {
              if (isVimeo) {
                const fp = new Vimeo.Player(fullVideo);
                fp.pause();
                if (fullVideo.dataset.videoBehavior === "restart")
                  fp.setCurrentTime(0);
              } else {
                fullVideo.removeAttribute("controls");
                fullVideo.pause();
                if (fullVideo.dataset.videoBehavior === "restart")
                  fullVideo.currentTime = 0;
              }
            },
          });

          gsap.to(videoPopup, {
            opacity: 0,
            duration: 0.2,
            delay: 0.5,
            ease: "power2.in",
            onComplete: () => {
              videoPopup.style.display = "none";
              videoPopup.style.pointerEvents = "none";
              document.body.classList.remove("dialog-box__open");

              if (isVimeo && vimeoPlayer) vimeoPlayer.play().catch(() => {});
              else previewVideo.play().catch(() => {});
            },
          });
        });

        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape" && videoPopup.style.display !== "none") {
            closeButton.click();
          }
        });
      }
    });
  }

  handleVideoPreview();

  /*----------------------------
    MOBILE DROPDOWN LOGIC  
  ----------------*/

  function initMobileDropdowns() {
    if (!window.matchMedia("(max-width: 860px)").matches) return;

    const cards = document.querySelectorAll(
      ".ringer-card[data-dropdown-card-open]"
    );

    cards.forEach((card) => {
      const dropdown = card.querySelector("[data-dropdown-card]");
      if (!dropdown) return;

      dropdown.style.height = "0px";

      const getHeight = () => {
        dropdown.style.height = "auto";
        const h = dropdown.scrollHeight + "px";
        dropdown.style.height = "0px";
        return h;
      };

      card.addEventListener("click", function (e) {
        const isOpen = card.classList.contains("is-open");

        document
          .querySelectorAll(".ringer-card.is-open")
          .forEach((openCard) => {
            if (openCard !== card) {
              openCard.classList.remove("is-open");
              const otherDrop = openCard.querySelector("[data-dropdown-card]");
              if (otherDrop) otherDrop.style.height = "0px";
            }
          });

        if (isOpen) {
          card.classList.remove("is-open");
          dropdown.style.height = "0px";
        } else {
          const target = getHeight();
          card.classList.add("is-open");
          dropdown.style.height = target;

          const onEnd = () => {
            dropdown.style.height = "0";
            dropdown.removeEventListener("transitionend", onEnd);
          };
          dropdown.addEventListener("transitionend", onEnd);
        }
      });
    });
  }

  initMobileDropdowns();


  /*----------------------------
    Revealing Variant In Collection Pages
  ----------------*/

  function collectionVariantReveal(){
    const triggers = document.querySelectorAll('.swatch-more');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const container = this.closest('.quick-add-swatches');
            if (!container) return;

            const hiddenSwatches = container.querySelectorAll('.swatch-hidden');
            const wrapper = this.closest('.more-trigger-wrapper');

            // Animate trigger out
            gsap.to(wrapper, {
                duration: 0.3, 
                opacity: 0, 
                scale: 0.5, 
                ease: "back.in(1.7)",
                onComplete: () => {
                    wrapper.style.display = 'none';
                }
            });

            // Reveal swatches
            // Make them visible first so they take up space/can be animated
            hiddenSwatches.forEach(el => {
                el.style.display = 'block';
                // Reset opacity/transform for animation source
                gsap.set(el, { opacity: 0, y: 10, scale: 0.8 });
            });

            gsap.to(hiddenSwatches, {
                duration: 0.5,
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.1,
                ease: "back.out(1.7)",
                delay: 0.1 // Slight delay after trigger starts disappearing
            });
        });
    });
  }
  collectionVariantReveal();



  function manualDropdown(){
   if (window.innerWidth >= 991) return;

    document.querySelectorAll('.product-manuals-main').forEach(section => {
      const header = section.querySelector('.mobile_accordion-title');
      const content = section.querySelector('.manuals-lists');

      if (!header || !content) return;

      let isOpen = false;
      let openTl = gsap.timeline({ paused: true });

      openTl.fromTo(section.querySelectorAll('.manual-list__item'), 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: "power2.out" }
      );

      header.addEventListener('click', function (e) {
        e.stopImmediatePropagation();

        if (isOpen) {
          closeAccordion();
        } else {
          openAccordion();
        }
      });

      function openAccordion() {
        isOpen = true;
        header.classList.add('active');
        content.classList.add('active');        // Show the container

        const height = content.scrollHeight || 800;

        content.style.maxHeight = '0px';

        gsap.to(content, {
          maxHeight: height + "px",
          duration: 0.65,
          ease: "power2.inOut",
          onComplete: () => {
            content.style.maxHeight = 'none';
            openTl.restart();
          }
        });
      }

      function closeAccordion() {
        isOpen = false;
        header.classList.remove('active');

        gsap.to(section.querySelectorAll('.manual-list__item'), {
          y: -40,
          opacity: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.in",
          onComplete: () => {
            gsap.to(content, {
              maxHeight: 0,
              duration: 0.55,
              ease: "power2.inOut",
              onComplete: () => {
                content.classList.remove('active');   // Hide again (display:none)
              }
            });
          }
        });
      }
    });
  }
  manualDropdown();
});



//-------------------------------
// Function to handle
// video scaling animation
//-----------------

function videoScalingAnimation() {
  const isPlayMakerPage =
    window.location.pathname === "/pages/play-maker-plus-landing-page";
  const mediaQueryBreakpoint = isPlayMakerPage ? 820 : 768;

  document
    .querySelectorAll(".video_scale_animation-main")
    .forEach((videoContainer, index) => {
      const videoId =
        videoContainer.querySelector("video").id || `myVideo-${index}`;
      const volumeToggleId =
        videoContainer.querySelector(".volume-btn").id ||
        `volumeToggle-${index}`;
      const video = document.getElementById(videoId);
      const loader = videoContainer.querySelector(".loader");

      // Add event listeners for video loading state
      if (video && loader) {
        video.addEventListener("waiting", () => {
          loader.style.display = "block"; // Show loader when buffering
        });
        video.addEventListener("playing", () => {
          loader.style.display = "none"; // Hide loader when playing
        });
        video.addEventListener("canplay", () => {
          loader.style.display = "none"; // Hide loader when video is ready to play
        });
      }

      gsap.timeline({
        scrollTrigger: {
          trigger: videoContainer,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
          markers: false,
          invalidateOnRefresh: true,
          onEnter: function () {
            if (video && !video.hasAttribute("autoplay")) {
              video.setAttribute("autoplay", "true");
            }
            video.play();
          },
        },
      });

      const isAnimationDisabled = videoContainer.dataset.isDisable === "true";

      if (window.innerWidth > mediaQueryBreakpoint && !isAnimationDisabled) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: videoContainer,
              start: "top top",
              end: "+=" + window.innerHeight * 2,
              scrub: 0.2,
              markers: false,
              pin: true,
            },
          })
          .from(
            videoContainer.querySelector(
              ".video_scale_animation .has_video_scale"
            ),
            {
              scale: 0.7,
              borderRadius: "20px",
            }
          )
          .to(
            videoContainer.querySelector(
              ".video_scale_animation .has_video_scale"
            ),
            {
              scale: 1,
              borderRadius: "0px",
            }
          );
      }
    });
}
videoScalingAnimation();

/*---------------------------
  Changing Image 
  Based On Varient
  --------------*/

function changeImageOnVarient() {
  /*--------------------------
    How To Use: Just goto the PDP and navigate to this line of code "{%- when 'tab' -%}",  
    in page you found two with this you have to   add a div with the class "tab_area". To the first one,
    Now this is gonna work as you wanted [class*="content-collapsibles-box-of-"].
    --------------*/

  /*------------------------------
    Product Configurations

    "defaultImageUrl" --  Default Image when user land on the page.
    "variantConfigs" --  prodive the variant id to change image on:
    "imageUrl" -- this is gonna hold the url for the different variant.
    "newTagSelector" --  if you have any label e.g "NEW" which needs to be displayed on for a specifce variant.
    "productImageSelector" --  this is for the tab selection which we're using to target image which is gonna be change on variant, Right now it's properly configured, By using css prifix "[class*="content-collapsibles-box-of-"].".
    
    ------------*/

  const productConfigs = {
    "/products/series-4-ultra-rangefinder": {
      defaultImageUrl:
        "https://cdn.shopify.com/s/files/1/0057/8958/1381/files/Group_1000012418754.png?v=1745401143",
      variantConfigs: {
        44682629578949: {
          imageUrl:
            "https://cdn.shopify.com/s/files/1/0057/8958/1381/files/Group_1000012411.png?v=1745401143",
          showNewTag: false,
        },
      },
      newTagSelector: "#new-tag",
      productImageSelector:
        '.tab_area .product-block.product-block--tab:nth-child(3) [class*="content-collapsibles-box-of-"] img',
    },

    "/products/ringer": {
      defaultImageUrl:
        "https://cdn.shopify.com/s/files/1/0057/8958/1381/files/Frame_1000012491.png?v=1753344261",
      variantConfigs: {
        42373188485317: {
          imageUrl:
            "https://cdn.shopify.com/s/files/1/0057/8958/1381/files/icons-ringer-pdp-inbox.png?v=1753340484",
          showNewTag: false,
        },
      },
      newTagSelector: "#new-tag",
      productImageSelector:
        '.tab_area .product-block.product-block--tab:nth-child(3) [class*="content-collapsibles-box-of-"] img',
    },

    "/products/player-gps-speaker": {
      defaultImageUrl:
        "https://cdn.shopify.com/s/files/1/0057/8958/1381/files/Frame_1000012501.png?v=1758178054",
      variantConfigs: {
        42266534019269: {
          imageUrl:
            "https://cdn.shopify.com/s/files/1/0057/8958/1381/files/Frame_1000012485.png?v=1758178054",
          showNewTag: false,
        },
      },
      newTagSelector: "#new-tag",
      productImageSelector:
        '.tab_area .product-block.product-block--tab:nth-child(3) [class*="content-collapsibles-box-of-"] img',
    },

    "/products/series-3-max-golf-rangefinder-with-slope": {
      defaultImageUrl:
        "https://cdn.shopify.com/s/files/1/0057/8958/1381/files/ContentArea-1_61678f64-d1b8-4917-a8fc-d03d5a416137.png?v=1772609249",
      variantConfigs: {
        43348096450757: {
          imageUrl:
            "https://cdn.shopify.com/s/files/1/0057/8958/1381/files/Frame_1171277769.png?v=1773291446",
          showNewTag: false,
        },
        43368679080133: {
          imageUrl:
            "https://cdn.shopify.com/s/files/1/0057/8958/1381/files/Frame_1171277769.png?v=1773291446",
          showNewTag: false,
        },
      },
      newTagSelector: "#new-tag",
      productImageSelector:
        '.tab_area .product-block.product-block--tab:nth-child(2) [class*="content-collapsibles-box-of-"] img',
    },

    "/products/rangefinder-series-2-pro": {
      defaultImageUrl:
        "https://cdn.shopify.com/s/files/1/0057/8958/1381/files/icons-2pro-pdp-inbox.png?v=1752134771",
      variantConfigs: {
        41389169508549: {
          imageUrl:
            "https://cdn.shopify.com/s/files/1/0057/8958/1381/files/Frame_1000012495.png?v=1753347401",
          showNewTag: false,
        },
      },
      newTagSelector: "#new-tag",
      productImageSelector:
        '.tab_area .product-block.product-block--tab:nth-child(3) [class*="content-collapsibles-box-of-"] img',
    },

    "/products/magnetic-golf-speaker": {
      defaultImageUrl:
        "https://cdn.shopify.com/s/files/1/0057/8958/1381/files/icons-pgo-pdp-inbox.png?v=1752134770",
      variantConfigs: {
        42817543569605: {
          imageUrl:
            "https://cdn.shopify.com/s/files/1/0057/8958/1381/files/Frame_1000012496.png?v=1753350340",
          showNewTag: false,
        },
      },
      newTagSelector: "#new-tag",
      productImageSelector:
        '.tab_area .product-block.product-block--tab:nth-child(3) [class*="content-collapsibles-box-of-"] img',
    },
  };

  /*------------------------------
    Main Function For Image Change On Variant

    (DO NOT TOUCH THIS FUNCTION, THANK YOU..!)
    ---------------*/

  function setupVariantHandler(config) {
    const {
      defaultImageUrl,
      variantConfigs,
      newTagSelector,
      productImageSelector,
    } = config;

    const newTag = document.querySelector(newTagSelector);
    const productImage = document.querySelector(productImageSelector);

    const updateVariantContent = () => {
      const variantSelector = document.querySelector(
        'select[name="id"], input[name="id"]:checked'
      );
      const selectedVariantId = variantSelector ? variantSelector.value : null;

      const variantConfig = variantConfigs[selectedVariantId] || {};
      const { imageUrl = defaultImageUrl, showNewTag = false } = variantConfig;

      if (newTag) {
        newTag.style.display = showNewTag ? "flex" : "none";
      }
      if (productImage) {
        productImage.src = imageUrl;
      }
    };

    updateVariantContent();

    const variantInputs = document.querySelectorAll(
      'select[name="id"], input[name="id"]'
    );
    variantInputs.forEach((input) => {
      input.addEventListener("change", updateVariantContent);
    });

    document.addEventListener("variant:change", updateVariantContent, {
      passive: true,
    });
  }

  const currentPath = window.location.pathname;
  const config = productConfigs[currentPath];
  if (config) {
    setupVariantHandler(config);
  } else {
    // ONLY ENABLE THIS IF NEED FOR DEBUGING
    console.warn("No configuration found for the current URL:", currentPath);
  }
}
changeImageOnVarient();



/* === GLOBAL ACCESSIBILITY IMPROVEMENTS (A11Y) === */
(function() {
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Prefers-reduced-motion (A11Y-03)
    const handleVideos = () => {
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      document.querySelectorAll('video').forEach(video => {
        if (isReduced) {
          if (video.autoplay) {
            video.pause();
          }
          if (!video.controls) {
            video.controls = true;
          }
        }
      });
    };
    handleVideos();
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', handleVideos);

    // 2. Escape key modal close handler (A11Y-04)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const closeSelectors = ['.closePop', '.closePop img', '[class*="close-modal"]', '[class*="modal__close"]', '.pop-close', '.pop-close a', '[class*="pop-close"]'];
        closeSelectors.forEach(selector => {
          document.querySelectorAll(selector).forEach(btn => {
            if (btn.offsetWidth > 0 || btn.offsetHeight > 0) {
              btn.click();
            }
          });
        });
        // Also close any custom popups directly
        document.querySelectorAll('.pop-upbox').forEach(popup => {
          if (popup.offsetWidth > 0 || popup.offsetHeight > 0) {
            if (window.jQuery) {
              window.jQuery(popup).fadeOut();
            } else {
              popup.style.display = 'none';
            }
          }
        });
      }
    });

    // 2b. Click-outside to close popup handler
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('pop-upbox')) {
        const closeBtn = e.target.querySelector('.closePop, .pop-close, .pop-close a, [class*="close-modal"]');
        if (closeBtn) {
          closeBtn.click();
        } else {
          if (window.jQuery) {
            window.jQuery(e.target).fadeOut();
          } else {
            e.target.style.display = 'none';
          }
        }
      }
    });

    // 3. Dynamic Live Announcements for Cart (A11Y-06)
    const liveRegion = document.getElementById('a11y-live-region');
    const announceToLive = (message) => {
      if (liveRegion) {
        liveRegion.textContent = '';
        setTimeout(() => {
          liveRegion.textContent = message;
        }, 100);
      }
    };
    document.addEventListener('ajaxProduct:added', (e) => {
      if (e.detail && (e.detail.product?.title || e.detail.title)) {
        let itemName = e.detail.product?.title || e.detail.title;
        announceToLive(`${itemName} added to cart`);
      } else {
        fetch(window.Shopify.routes ? window.Shopify.routes.root + 'cart.js' : '/cart.js')
          .then(response => response.json())
          .then(cart => {
            let itemName = 'Item';
            if (cart.items && cart.items.length > 0) {
              itemName = cart.items[0].product_title || cart.items[0].title || 'Item';
            }
            announceToLive(`${itemName} added to cart`);
          })
          .catch(() => {
            announceToLive('Item added to cart');
          });
      }
    });

    // 4. Loop Subscription Widget Accessibility Enhancements (A11Y-06)
    const fixLoopWidget = () => {
      const loopContainers = document.querySelectorAll('[class*="loop-subscription"], [class*="loop-widget"], #loop-subscription-widget, .loop-container');
      loopContainers.forEach(container => {
        // Radio inputs / custom swatches
        container.querySelectorAll('input:not([aria-label])').forEach(input => {
          if (input.id) {
            const associatedLabel = container.querySelector(`label[for="${input.id}"]`);
            if (associatedLabel && associatedLabel.textContent.trim()) {
              input.setAttribute('aria-label', associatedLabel.textContent.trim());
              return;
            }
          }
          const parentLabel = input.closest('label');
          if (parentLabel && parentLabel.textContent.trim()) {
            input.setAttribute('aria-label', parentLabel.textContent.trim());
          } else {
            input.setAttribute('aria-label', input.value || 'Subscription option');
          }
        });

        // Select dropdowns
        container.querySelectorAll('select:not([aria-label])').forEach(select => {
          select.setAttribute('aria-label', 'Select subscription frequency');
        });
      });
    };

    // 5. Global Custom Pop-upbox Accessibility Fixes (Issues 135, 143, 144)
    let lastActiveElement = null;

    const fixAllCustomPopups = () => {
      document.querySelectorAll('.pop-upbox').forEach(popup => {
        if (!popup.getAttribute('role')) {
          popup.setAttribute('role', 'dialog');
        }
        if (!popup.getAttribute('aria-modal')) {
          popup.setAttribute('aria-modal', 'true');
        }
        
        // Correct inaccurate accessible name for the Get Instant Quote modal (Issue 144)
        if (popup.id === 'contact-us') {
          popup.setAttribute('aria-label', 'Get Instant Quote Contact Form');
        } else if (!popup.getAttribute('aria-label') || popup.getAttribute('aria-label') === 'Contact Us Video Popup') {
          const titleText = popup.id 
            ? popup.id.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) 
            : 'Dialog Popup';
          popup.setAttribute('aria-label', titleText);
        }

        popup.querySelectorAll('.closePop').forEach(closeLink => {
          // Correct inaccurate accessible name for the close button (Issue 135/143)
          if (popup.id === 'contact-us') {
            closeLink.setAttribute('aria-label', 'Close contact form');
          } else if (!closeLink.getAttribute('aria-label') || closeLink.getAttribute('aria-label') === 'Close Video') {
            closeLink.setAttribute('aria-label', 'Close dialog');
          }
          closeLink.querySelectorAll('img').forEach(img => {
            if (img.alt === 'close lose' || !img.alt) {
              img.alt = 'Close';
            }
          });
        });
      });

      // Correct trigger link elements to function as accessible buttons (Issue 129)
      document.querySelectorAll('.poptrigger').forEach(trigger => {
        if (!trigger.getAttribute('role')) {
          trigger.setAttribute('role', 'button');
        }
        if (!trigger.getAttribute('aria-haspopup')) {
          trigger.setAttribute('aria-haspopup', 'dialog');
        }
      });
    };

    // Track triggering element and move focus to popup close button (Issue 135)
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('.poptrigger');
      if (trigger) {
        lastActiveElement = trigger;
        const popID = trigger.getAttribute('data-rel');
        const popup = document.getElementById(popID);
        if (popup) {
          setTimeout(() => {
            popup.setAttribute('tabindex', '-1');
            const closeBtn = popup.querySelector('.closePop');
            if (closeBtn) {
              closeBtn.focus();
            } else {
              popup.focus();
            }
          }, 300);
        }
      }

      // Handle restoring focus when Close button is clicked
      const closeBtn = e.target.closest('.closePop, #fade');
      if (closeBtn) {
        if (lastActiveElement) {
          setTimeout(() => {
            lastActiveElement.focus();
            lastActiveElement = null;
          }, 100);
        }
      }
    });

    // Keyboard Dialog Manager: Escape to close and Tab Focus Trap (Issue 135)
    document.addEventListener('keydown', (e) => {
      const openPopup = Array.from(document.querySelectorAll('.pop-upbox')).find(
        popup => popup.offsetWidth > 0 || popup.offsetHeight > 0
      );
      if (!openPopup) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        const closeBtn = openPopup.querySelector('.closePop');
        if (closeBtn) {
          closeBtn.click();
        } else {
          if (window.jQuery) {
            window.jQuery(openPopup).fadeOut();
          } else {
            openPopup.style.display = 'none';
          }
          if (lastActiveElement) {
            lastActiveElement.focus();
            lastActiveElement = null;
          }
        }
        return;
      }

      if (e.key === 'Tab') {
        // Query elements inside the popup that are focusable
        const focusableElements = openPopup.querySelectorAll(
          'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    });

    // 6. Generic CTA accessible naming (A11Y-01)
    const fixGenericCTAs = () => {
      document.querySelectorAll('a, button').forEach(el => {
        const text = el.textContent.trim().toUpperCase();
        if (text === 'SHOP NOW' || text === 'ADD TO CART' || text === 'LEARN MORE' || text === 'READ MORE' || text === 'SHOP THE COLLECTION' || text === 'ADD TO BAG' || text === 'ADD TO CART!' || text === 'CLAIM FREE TRIAL') {
          if (!el.getAttribute('aria-label')) {
            // Check if there is an associated modal/popup context
            const parentModal = el.closest('.pop-upbox, .upsell_popup--new, .modal, .modal-content');
            if (parentModal) {
              const titleEl = parentModal.querySelector('h1, h2, h3, .popup-title, #six_month_popup-title');
              if (titleEl && titleEl.textContent.trim()) {
                const modalTitle = titleEl.textContent.trim().replace(/\s+/g, ' ');
                el.setAttribute('aria-label', `${text === 'CLAIM FREE TRIAL' ? 'Claim Free Trial' : text}: ${modalTitle}`);
                return;
              }
            }
            // Check if there is an associated product card context
            const parentProduct = el.closest('.grid-product, [data-prod-id], .product-grid-item, .ctm_upsell_product_list > div, .upshell-exclusive, .exclusive__inner');
            if (parentProduct) {
              const titleEl = parentProduct.querySelector('.grid-product__title, .product-item-title, .h4, [data-product-title], p');
              if (titleEl && titleEl.textContent.trim()) {
                const productName = titleEl.textContent.trim();
                if (text.includes('ADD')) {
                  el.setAttribute('aria-label', `Add ${productName} to cart`);
                } else {
                  el.setAttribute('aria-label', `Shop ${productName}`);
                }
                return;
              }
            }
            // Fallback: use the section heading/slide context
            const section = el.closest('section, .shopify-section, .slideshow__slide, .slider-slide, .hero__slide, .hero, .banner');
            if (section) {
              const headingEl = section.querySelector('h1, h2, h3, .h1, .h2, .h3, .hero__title, .section-header__title');
              if (headingEl && headingEl.textContent.trim()) {
                const sectionName = headingEl.textContent.trim();
                el.setAttribute('aria-label', `${text === 'SHOP NOW' ? 'Shop' : text === 'LEARN MORE' ? 'Learn more about' : text} ${sectionName}`);
                return;
              }
            }
          }
        }
      });
    };

    // 7. Blank App Store links naming (A11Y-06)
    const fixAppStoreLinks = () => {
      document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href') || '';
        if (href.includes('play.google.com')) {
          link.setAttribute('aria-label', 'Download Blue Tees Game app from Google Play Store');
        } else if (href.includes('apps.apple.com')) {
          link.setAttribute('aria-label', 'Download Blue Tees Game app from Apple App Store');
        }
      });
    };

    // Watch for dynamic widget and popup injection
    const observer = new MutationObserver(() => {
      fixLoopWidget();
      fixAllCustomPopups();
      fixGenericCTAs();
      fixAppStoreLinks();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    // Run once initially
    fixLoopWidget();
    fixAllCustomPopups();
    fixGenericCTAs();
    fixAppStoreLinks();
  });
})();

/* ===================================================
   AJAX Cart Remove — no page redirect
   Uses the same /cart/change.js + ajaxProduct:added
   pattern that the theme's QtySelector uses.
=================================================== */
(function () {
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.cart__remove-btn');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    var key = btn.getAttribute('data-key');
    if (!key) return;

    // Show spinner — hide text, block re-clicks
    btn.classList.add('is-loading');

    // Optimistically fade the row out while the request is in flight
    var cartItem = btn.closest('.cart__item');
    if (cartItem) {
      cartItem.style.transition    = 'opacity 0.25s ease';
      cartItem.style.opacity       = '0.4';
      cartItem.style.pointerEvents = 'none';
    }

    var FREE_GIFTS_BY_VARIANT = {
      42266534052037: "42279859028165",
      42266534019269: "42279859028165",

      44599654088901: "42279859028165",

      42373188452549: "42279859028165",
      42373188485317: "42279859028165",
      42373188485317: "46056795209925",

      44119278551237: "42279859028165",
      44119278584005: "42279859028165",

      45724258697413: "45793869299909",
      45724258468037: "46056776990917",
      45724250669253: "46056776990917",
      45724259942597: "46056776990917",

      42817543536837: "46056795209925",
      46039346413765: "46056795209925",
      41354208280773: "46056795209925",
      41354207166661: "46056795209925",
      42924526043333: "46056795209925",
      42924529811653: "46056795209925",
      45110734618821: "46056795209925",
      42935689937093: "46056795209925",
      45859460120773: "46056795209925",
    };

    function removeFreeGiftIfPresentByVariant(qualifyingVariantId) {
      var freeVariantId = FREE_GIFTS_BY_VARIANT[String(qualifyingVariantId)];
      if (!freeVariantId) return Promise.resolve();

      return fetch("/cart.js", { headers: { Accept: "application/json" } })
        .then((res) => res.json())
        .then((cart) => {
          var freeItem = cart.items.find(
            (item) => String(item.variant_id) === String(freeVariantId)
          );

          if (!freeItem) return;

          return fetch("/cart/change.js", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              id: freeItem.key,
              quantity: 0,
            }),
          });
        })
        .catch((err) => console.error("Error removing free gift:", err));
    }

    var variantId = key.split(":")[0];
    var hasFreeGift = variantId && FREE_GIFTS_BY_VARIANT.hasOwnProperty(String(variantId));

    fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept':       'application/json'
      },
      body: JSON.stringify({ id: key, quantity: 0 })
    })
      .then(function (res) { return res.json(); })
      .then(function () {
        if (hasFreeGift) {
          return removeFreeGiftIfPresentByVariant(variantId);
        }
      })
      .then(function () {
        // Refresh the mini-cart drawer exactly as the theme's QtySelector does
        document.dispatchEvent(new CustomEvent('ajaxProduct:added', { detail: {} }));
      })
      .catch(function (err) {
        console.error('Cart remove error:', err);
        // Restore button and row if the request failed
        btn.classList.remove('is-loading');
        if (cartItem) {
          cartItem.style.opacity       = '';
          cartItem.style.pointerEvents = '';
        }
      });
  });
})();

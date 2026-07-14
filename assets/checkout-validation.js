/* 
|=======================================================================
|   Check-Out Validation
|=======================================================================
| This js verify the customer has already purchase a free ptoduct or not
*/

document.addEventListener("DOMContentLoaded", async () => {
  (function ($) {
    let cart = {};
    // Check the premium-player product is available or not
    function validatePremiumProduct() {
      return new Promise(async (resolve) => {
        const cartReq = await fetch(`/cart.json`);
        const cartReqRes = await cartReq.json();
        cart = cartReqRes;
        const verifiedProduct = cartReqRes.items.filter(item => item.handle == '1yr-player-premium' || item.handle == '3yr-player-premium' || item.handle == '1yr-ringer-premium' || item.handle == '3yr-ringer-premium' || item.handle == '1yr-membership-premium' || item.handle == '3yr-membership-premium');

        const validationObj = {
          isExist: verifiedProduct.length > 0,
          isMultipleProductsLength: verifiedProduct.length,
          isValidQty: verifiedProduct.every(product=> product.quantity == 1)
        }
        resolve(validationObj); // true : Premium product exist in checkout || false : premium product is not exist in checkout
      });
    }
 
    document.addEventListener("checkout-validation", async () => {
      appendDynamicCheckoutBox();
      const verifyProductValidation = await validatePremiumProduct();
      //const checkIsValidPageAttribute = await pageValidAttribute();

      if (verifyProductValidation.isExist) {
        if(verifyProductValidation.isMultipleProductsLength == 1 && verifyProductValidation.isValidQty){
          // if(Shopify.Checkout.step == "contact_information"){
          //   showEmailBox();  
          // }
        }else{
          showAlertMessageBox();
          disabledCheckOut();
        }   
      }else{
        document.querySelector("#checkout-validation").classList.add('hidden');
        enabledCheckOut();
      }
    });

    function pageValidAttribute(){
      const attributes = cart.attributes;
      return attributes.hasOwnProperty("gift-email")
    }

    function appendDynamicCheckoutBox() {
      let html = `
        <div class="dynamic-checkout" id="checkout-validation">
          <div class="checkout-validation-error-wrapper hidden">
            <h2 class="dynamic-checkout__title">
              Multiple Subscription error
            </h2>
            <div class="notice-board__wrapper">
              <div class="notice notice--warning default-background validation-box" data-banner="true" role="status"
                tabindex="-1" aria-atomic="true" aria-live="polite">
                <svg class="icon-svg icon-svg--size-24 notice__icon" aria-hidden="true" focusable="false">
                  <use xlink:href="#warning"></use>
                </svg>
                <div class="notice__content">
                  <p class="notice__text">
                    Only one subscription product per order. please remove one and then checkout.
                  </p>
                </div>
                <button name="button" type="button" class="notice__controls" aria-label="Remove discount"
                  data-banner-dismiss="true" style="display: none;"><svg class="icon-svg icon-svg--size-14 icon-svg--block"
                    aria-hidden="true" focusable="false">
                    <use xlink:href="#close"></use>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>`;

      if (!document.querySelector(".step .step__sections .dynamic-checkout")) {
        document.querySelector(".step .step__sections").insertAdjacentHTML('afterbegin',html);
      }
      //loadToggleEvent();
    }   

    function disabledCheckOut() {
      $("#continue_button")
        .attr("disabled", true)
        .attr("type", "button")
        .addClass("checkout-error");
    }

    function enabledCheckOut() {
      $("#continue_button")
        .attr("type", "submit")
        .removeAttr("disabled")
        .removeClass("checkout-error");
    }

    function showAlertMessageBox(){
      document.querySelector(".step__sections  #checkout-validation .checkout-validation-error-wrapper").classList.remove("hidden")
    }

    function showEmailBox(){
      document.querySelector(".step__sections  #checkout-validation .validation-email-box").classList.remove("hidden");
    }

    function hideEmailBox(){
       document.querySelector(".step__sections  #checkout-validation .validation-email-box").classList.add("hidden");
    }

    function hideAlertMessageBox() {
      document.querySelector(".step__sections  #checkout-validation .checkout-validation-error-wrapper").classList.add("hidden")
    }

    function loadToggleEvent(){
      document.querySelector(".dynamic-checkout input[name='checkout-validation-mail']").addEventListener('change',(evt)=>{
        if(evt.target.checked){
          let inputBox = `
            <div class="checkout-validation-email">
              <div class="fieldset">
                <div data-checkout-validation-pay-email-flow="true" class="field field--required">
                  <div class="field__input-wrapper">
                    <label class="field__label field__label--visible" for="checkout_validation_email">Gift Subscription
                      Email</label>
                    <input placeholder="Email" class="field__input" type="email" id="checkout_validation_email">
                  </div>
                </div>
              </div>
            </div>`;
          document.querySelector(".step__sections  #checkout-validation .validation-email-box").insertAdjacentHTML("beforeend",inputBox);
          handleInputEvent()
        }else{
          document.querySelector(".step__sections  #checkout-validation .checkout-validation-email").remove();
        }
         // $(".step__sections  #checkout-validation .checkout-validation-email").toggleClass("hidden")
      });  
    }

    $(document).on("page:load page:change", function() {
      document.dispatchEvent(new CustomEvent("checkout-validation"));
    });

    function handleInputEvent(){
      document.querySelector("input#checkout_validation_email").addEventListener('focusout', (evt)=>{
        // document.dispatchEvent(new CustomEvent("checkout-validation"));
        if(evt.currentTarget.value != ""){
          evt.currentTarget.setAttribute("name","checkout[attributes][gift-email]")
        }else{
          evt.currentTarget.removeAttribute("name");
        }
      })
    }

    document.dispatchEvent(new CustomEvent("checkout-validation"));

  })(Checkout.$);
});

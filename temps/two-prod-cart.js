$(document).ready(function() {

  $(document).on('click', '[data-add-to-cart-reminder]', function(e) {
    const atcButton = $(this);
    const form = atcButton.closest('form');

    e.preventDefault();
    e.stopPropagation();

    const mainVariantId = form.find('input[name="id"]').val() || form.find('select[name="id"]').val();
    const caseCheckbox = $('#player-pro-hard-case-upsell');

    atcButton.addClass('btn--loading');

    const items = [];

    if (mainVariantId) {
      items.push({ id: parseInt(mainVariantId), quantity: 1 });
    }

    function sendCartRequest() {
      fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: items })
      })
      .then(function(response) {
        if (!response.ok) {
          return response.json().then(function(err) {
            throw new Error(err.description || 'Cart error');
          });
        }
        return response.json();
      })
      .then(function(data) {
        atcButton.removeClass('btn--loading');
        document.dispatchEvent(new CustomEvent('ajaxProduct:added', { detail: {} }));
      })
      .catch(function(error) {
        atcButton.removeClass('btn--loading');
        alert('There was an issue adding to the cart: ' + error.message);
      });
    }

    if (caseCheckbox.length && caseCheckbox.is(':checked')) {
      let caseVariantId = caseCheckbox.val() || caseCheckbox.attr('data-variant-id');
      if (caseVariantId && !isNaN(parseInt(caseVariantId))) {
        items.push({ id: parseInt(caseVariantId), quantity: 1 });
        sendCartRequest();
      } else {
        fetch('/products/player-hard-shell-carrying-case.js')
          .then(function(res) {
            return res.json();
          })
          .then(function(pData) {
            if (pData && pData.variants && pData.variants.length) {
              items.push({ id: parseInt(pData.variants[0].id), quantity: 1 });
            }
            sendCartRequest();
          })
          .catch(function(err) {
            sendCartRequest();
          });
      }
    } else {
      sendCartRequest();
    }

    return false;
  });

});

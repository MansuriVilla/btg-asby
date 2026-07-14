(function() {
  const poweredByButton = document.querySelector('#try-with-nok-powered-by');
  const backdrop = document.querySelector('#try-with-nok-modal--backdrop');
  const closeButton = document.querySelector('#try-with-nok-modal-close');
  const bodyElement = document.querySelector('body');
  poweredByButton.addEventListener('click', function(e) {
    e.preventDefault();
    const modal = document.querySelector('#try-with-nok-modal');
    modal.classList.add('try-with-nok__modal--open');
    bodyElement.classList.add('try-with-nok__modal--open');
    function closeModal(e) {
      e.preventDefault();
      modal.classList.remove('try-with-nok__modal--open');  
	  bodyElement.classList.remove('try-with-nok__modal--open');
      backdrop.removeEventListener('click', closeModal);
      closeButton.removeEventListener('click', closeModal);
    }
    backdrop.addEventListener('click',  closeModal);
    closeButton.addEventListener('click',  closeModal);
  })
  
})()
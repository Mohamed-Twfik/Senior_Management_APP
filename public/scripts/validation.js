// Create entity
document.querySelector(`.create-${PAGE_TYPE}`).addEventListener('click', (e) => {
  const form = document.querySelector(`#create-${PAGE_TYPE}-form`);
  let isValid = Validation(form);
  if (isValid) {
    form.submit();
  }
});

// Update entity
document.querySelectorAll(`.update-${PAGE_TYPE}`).forEach(button => {
  button.addEventListener('click', (e) => {
    const entityId = button.getAttribute('dataItemId');
    const form = document.querySelector(`#update-${PAGE_TYPE}-form-${entityId}`);
    let isUpdate = true;
    let isValid = Validation(form, isUpdate);
    if (isValid) {
      let query = getFilterUrl(document.querySelector('#filter-form')).split('?')[1];
      let pageNumberSpan = document.querySelector('#page-number');
      let pageNumber = pageNumberSpan ? pageNumberSpan.textContent : 1;
      form.setAttribute('action', `${form.getAttribute('action')}?${query}&page=${pageNumber}`);
      form.submit();
    }
    Validation(`#update-${PAGE_TYPE}-form-${entityId}`);
  });
});
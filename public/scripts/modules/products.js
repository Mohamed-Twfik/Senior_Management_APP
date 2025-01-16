/**
 * Product Form Validation
 * Used to validate product form data before submitting it to the server
 * @param {string} formSelector The form selector to get the form element
 */
const Validation = (formSelector) => {
  const form = document.querySelector(formSelector);
  const name = form.querySelector('input[name="name"]').value;
  const nameError = form.querySelector('.text-danger-name');
  nameError.style.display = 'none';

  const nameRegex = /^[\s\S]{3,}$/;
  if (!name || !nameRegex.test(name)) {
    nameError.textContent = 'الإسم يجب أن يحتوي على 3 أحرف على الأقل';
    nameError.style.display = 'block';
  } else form.submit();
};

// Create entity
document.querySelector(`.create-${PAGE_TYPE}`).addEventListener('click', (e) => {
  Validation(`#create-${PAGE_TYPE}-form`);
});

// Update entity
document.querySelectorAll(`.update-${PAGE_TYPE}`).forEach(button => {
  button.addEventListener('click', (e) => {
    const entityId = button.getAttribute('dataItemId');
    Validation(`#update-${PAGE_TYPE}-form-${entityId}`);
  });
});
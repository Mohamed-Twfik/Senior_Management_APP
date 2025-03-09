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

  const category = form.querySelector('select[name="category"]').value;
  const categoryError = form.querySelector('.text-danger-category');
  categoryError.style.display = 'none';

  let isValid = true;

  const nameRegex = /^[\s\S]{3,}$/;
  if (!name || !nameRegex.test(name)) {
    nameError.textContent = 'الإسم يجب أن يحتوي على 3 أحرف على الأقل';
    nameError.style.display = 'block';
    isValid = false;
  }
  
  if(!category) {
    categoryError.textContent = 'يجب إختيار المنتج';
    categoryError.style.display = 'block';
    isValid = false;
  }

  if (isValid) form.submit();
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
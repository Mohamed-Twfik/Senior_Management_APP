/**
 * Product Form Validation
 * Used to validate product form data before submitting it to the server
 * @param form The form element
 */
const Validation = (form) => {
  const name = form.querySelector('input[name="name"]').value;
  const nameError = form.querySelector('.text-danger-name');
  nameError.style.display = 'none';

  const category = form.querySelector('select[name="category"]').value;
  const categoryError = form.querySelector('.text-danger-category');
  categoryError.style.display = 'none';

  const priceType = form.querySelector('select[name="priceType"]').value;
  const priceTypeError = form.querySelector('.text-danger-priceType');
  priceTypeError.style.display = 'none';

  let isValid = true;

  const nameRegex = /^[\s\S]{3,}$/;
  if (!name || !nameRegex.test(name)) {
    nameError.textContent = 'الإسم يجب أن يحتوي على 3 أحرف على الأقل';
    nameError.style.display = 'block';
    isValid = false;
  }
  
  if(!category) {
    categoryError.textContent = 'يجب إختيار التصنيف';
    categoryError.style.display = 'block';
    isValid = false;
  }

  if(!priceType) {
    priceTypeError.textContent = 'يجب إختيار الفئة السعرية';
    priceTypeError.style.display = 'block';
    isValid = false;
  }

  return isValid;
};
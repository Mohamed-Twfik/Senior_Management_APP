/**
 * Product category Form Validation
 * Used to validate product category form data before submitting it to the server
 * @param form The form element
 */
const Validation = (form) => {
  const name = form.querySelector('input[name="name"]').value;
  const nameError = form.querySelector('.text-danger-name');
  nameError.style.display = 'none';

  let isValid = true;

  const nameRegex = /^[\s\S]{3,}$/;
  if (!name || !nameRegex.test(name)) {
    nameError.textContent = 'الإسم يجب أن يحتوي على 3 أحرف على الأقل';
    nameError.style.display = 'block';
    isValid = false;
  }
  
  return isValid;
};
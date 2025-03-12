/**
 * Price type form Validation
 * Validate the Price type form data before submitting it to the server
 * @param {string} formSelector The form selector to get the form data
 */
const Validation = (form) => {
  let isValid = true;

  const name = form.querySelector('input[name="name"]').value;
  const nameError = form.querySelector('.text-danger-name');
  nameError.style.display = 'none';

  const nameRegex = /^[\s\S]{3,}$/;
  if (!name || !nameRegex.test(name)) {
    nameError.textContent = 'الإسم يجب أن يحتوي على 3 أحرف على الأقل';
    nameError.style.display = 'block';
    isValid = false;
  }

  const inputGroups = form.querySelectorAll('.input-group.department-price');
  const inputGroupsError = form.querySelector('.text-danger-department-price');
  inputGroupsError.style.display = 'none';
  let inputGroupsValid = false
  for (let i = 0; i < inputGroups.length; i++) {
    const departmentPrice = inputGroups[i].querySelector(`input[name="departmentsPrice[${i}][price]"]`).value;
    if (!isNaN(departmentPrice) && departmentPrice > 0) {
      inputGroupsValid = true;
      break;
    }
  }
  if (!inputGroupsValid) {
    inputGroupsError.textContent = 'يجب إضافة سعر واحد على الأقل';
    inputGroupsError.style.display = 'block';
    isValid = false;
  }
  
  return isValid;
};
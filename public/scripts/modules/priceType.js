/**
 * Price type form Validation
 * Validate the Price type form data before submitting it to the server
 * @param {string} formSelector The form selector to get the form data
 */
const Validation = (formSelector) => {
  const form = document.querySelector(formSelector);
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
    console.log(inputGroups[i]);
    const departmentPrice = inputGroups[i].querySelector(`input[name="departmentsPrice[${i}][price]"]`).value;
    console.log(departmentPrice);
    console.log((departmentPrice)? true : false);
    console.log(isNaN(departmentPrice));
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
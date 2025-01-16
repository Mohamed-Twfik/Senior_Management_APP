/**
 * Worker Form Validation
 * Used to validate worker form data before submitting it to the server
 * @param {string} formSelector The form selector to get the form element
 */
const Validation = (formSelector) => {
  const form = document.querySelector(formSelector);
  let isValid = true;

  const name = form.querySelector('input[name="name"]').value;
  const nameError = form.querySelector('.text-danger');
  nameError.style.display = 'none';
  const nameRegex = /^[\s\S]{3,}$/;
  if (!name || !nameRegex.test(name)) {
    nameError.textContent = 'الإسم يجب أن يحتوي على 3 أحرف على الأقل';
    nameError.style.display = 'block';
    isValid = false;
  }

  const department = form.querySelector('select[name="department"]').value;
  const departmentError = form.querySelector('.text-danger-department');
  departmentError.style.display = 'none';
  if (!department) {
    departmentError.textContent = 'يجب إختيار القسم';
    departmentError.style.display = 'block';
    isValid = false;
  }

  const type = form.querySelector('select[name="type"]').value;
  const typeError = form.querySelector('.text-danger-type');
  typeError.style.display = 'none';
  
  if (!type) {
    typeError.textContent = 'يجب إختيار نوع العامل';
    typeError.style.display = 'block';
    isValid = false;
  } else if(type === 'أسبوعي') {
    const salaryElement = form.querySelector('input[name="salary"]');
    const salary = parseInt(salaryElement.value);
    const salaryError = form.querySelector('.text-danger-salary');
    salaryError.style.display = 'none';
    if (!salary || isNaN(salary)) {
      salaryError.textContent = 'يجب إدخال الراتب';
      salaryError.style.display = 'block';
      isValid = false;
    }
  }

  if(isValid) form.submit();
};

const toggleSalaryDisabled = (typeSelect, salaryInput) => {
  if (typeSelect.value === 'أسبوعي') {
    salaryInput.removeAttribute('disabled');
    salaryInput.removeAttribute('placeholder');
    salaryInput.setAttribute("name", "salary")
  } else {
    salaryInput.setAttribute('disabled', 'disabled');
    salaryInput.setAttribute('value', '');
    salaryInput.setAttribute('placeholder', 'لإدخال الراتب يجب وضع نوع العامل "أسبوعي" أولاً');
    salaryInput.removeAttribute('name');
  }
}

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

// Disable salary input when worker type is not 'أسبوعي'
document.querySelectorAll('form:not(#filter-form)').forEach((form, index) => {
  const typeSelect = form.querySelector('select[name="type"]');
  const salaryInput = form.querySelector('input[name="salary"]');

  toggleSalaryDisabled(typeSelect, salaryInput);
  typeSelect.addEventListener('change', (e) => {
    toggleSalaryDisabled(e.target, salaryInput);
  });
});
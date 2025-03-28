const workerTypes = {
  Production: 'إنتاج',
  Weekly: 'أسبوعي',
  Hybrid: 'مختلط',
};

/**
 * Worker Form Validation
 * Used to validate worker form data before submitting it to the server
 * @param form The form element
 */
const Validation = (form) => {
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
  } else if(type === workerTypes.Weekly || type === workerTypes.Hybrid) {
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

  return isValid;
};

const toggleSalaryDisabled = (typeSelect, salaryInput) => {
  if (typeSelect.value === workerTypes.Weekly || typeSelect.value === workerTypes.Hybrid) {
    salaryInput.removeAttribute('disabled');
    salaryInput.removeAttribute('placeholder');
    salaryInput.setAttribute("name", "salary")
  } else {
    salaryInput.setAttribute('disabled', 'disabled');
    salaryInput.setAttribute('value', '');
    salaryInput.setAttribute('placeholder', `لإدخال الراتب يجب وضع نوع العامل '${workerTypes.Weekly}' أو '${workerTypes.Hybrid}' أولاً`);
    salaryInput.removeAttribute('name');
  }
}

// Disable salary input when worker type is not workerTypes.Weekly
document.querySelectorAll('form:not(#filter-form):not(#salary-form)').forEach((form, index) => {
  const typeSelect = form.querySelector('select[name="type"]');
  const salaryInput = form.querySelector('input[name="salary"]');
  toggleSalaryDisabled(typeSelect, salaryInput);
  typeSelect.addEventListener('change', (e) => {
    toggleSalaryDisabled(e.target, salaryInput);
  });
});
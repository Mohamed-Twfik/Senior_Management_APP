/**
 * Bonus form validation
 * Validate the bonus form data before submitting it to the server
 * @param {string} formSelector The form selector to get form data and validate it
 */
const Validation = (formSelector) => {
  const form = document.querySelector(formSelector);
  const from = form.querySelector('input[name="from"]').value;
  const to = form.querySelector('input[name="to"]').value;
  const department = form.querySelector('select[name="department"').value;
  const percentage = form.querySelector('input[name="percentage"]').value;
  const percentageError = form.querySelector('.text-danger-percentage');
  const fromError = form.querySelector('.text-danger-from');
  const departmentError = form.querySelector('.text-danger-department');
  percentageError.style.display = 'none';
  fromError.style.display = 'none';
  departmentError.style.display = 'none';

  let isValid = true;

  if (parseInt(from) >= parseInt(to)) {
    fromError.innerText = 'الحد الأدنى يجب أن يكون أقل من الحد الأعلى';
    fromError.style.display = 'block';
    isValid = false;
  }

  if (!percentage || isNaN(percentage)) {
    percentageError.innerText = 'يجب إدخال النسبة المئوية';
    percentageError.style.display = 'block';
    isValid = false;
  }

  if (!department) {
    departmentError.innerText = 'يجب إختيار القسم';
    departmentError.style.display = 'block';
    isValid = false;
  }
  
  if (isValid) form.submit();
};

const createFormId = `create-${PAGE_TYPE}-form`;
const updateFormId = `update-${PAGE_TYPE}-form`;

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

// Set the range input min and max values
document.querySelectorAll("input[name='percentage']").forEach(input => {
  input.setAttribute('max', 100);
  input.setAttribute('min', 1);
});

document.querySelectorAll("form input[name='from'], form input[name='to']").forEach(input => {
  input.setAttribute('placeholder', 0);
});
/**
 * Production form Validation
 * Validate the Production form data before submitting it to the server
 * @param {string} formSelector The form selector to get the form data
 */
const Validation = (formSelector) => {
  const form = document.querySelector(formSelector);

  const product = form.querySelector('select[name="product"]').value;
  const productError = form.querySelector('.text-danger-product');
  productError.style.display = 'none';

  const department = form.querySelector('select[name="department"');

  const worker = form.querySelector('select[name="worker"]').value;
  const workerError = form.querySelector('.text-danger-worker');
  workerError.style.display = 'none';

  const date = form.querySelector('input[name="date"]').value;
  const dateError = form.querySelector('.text-danger-date');
  dateError.style.display = 'none';

  const quantity = form.querySelector('input[name="quantity"]').value;
  const quantityError = form.querySelector('.text-danger-quantity');
  quantityError.style.display = 'none';

  let isValid = true;

  if (!product) {
    productError.textContent = 'يجب إختيار المنتج';
    productError.style.display = 'block';
    isValid = false;
  }

  if (!department.value) {
    department.removeAttribute('name');
  }

  if (!worker) {
    workerError.textContent = 'يجب إختيار العامل';
    workerError.style.display = 'block';
    isValid = false;
  }

  if (!quantity || isNaN(quantity)) {
    quantityError.textContent = 'يجب إدخال كمية الإنتاج';
    quantityError.style.display = 'block';
    isValid = false;
  }

  if (!date) {
    dateError.textContent = 'يجب إدخال تاريخ الإنتاج';
    dateError.style.display = 'block';
    isValid = false;
  }

  if (isValid) form.submit();
};

/**
 * Salary form Validation
 * Validate the salary form data before submitting it to the server
 */
const salaryValidation = () => {
  const form = document.querySelector('#salary-form');

  const from = form.querySelector('input[name="from"]').value;
  const fromError = form.querySelector('.text-danger-from');
  fromError.style.display = 'none';

  const to = form.querySelector('input[name="to"]').value;
  const toError = form.querySelector('.text-danger-to');
  toError.style.display = 'none';

  let isValid = true;

  if (!from) {
    fromError.textContent = 'يجب إدخال تاريخ البداية';
    fromError.style.display = 'block';
    isValid = false;
  }

  if (!to) {
    toError.textContent = 'يجب إدخال تاريخ النهاية';
    toError.style.display = 'block';
    isValid = false;
  }

  const fromObject = new Date(from);
  const toObject = new Date(to);
  if (fromObject >= toObject) {
    fromError.textContent = 'تاريخ البداية يجب أن يكون قبل تاريخ النهاية';
    fromError.style.display = 'block';
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

// Get Salary form
document.querySelector('.get-salary').addEventListener('click', (e) => {
  salaryValidation();
});
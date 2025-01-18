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
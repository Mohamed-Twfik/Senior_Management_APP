/**
 * Product Price form Validation
 * Validate the product price form data before submitting it to the server
 * @param {string} formSelector The form selector to get the form data
 */
const Validation = (formSelector) => {
  const form = document.querySelector(formSelector);

  const product = form.querySelector('select[name="product"]').value;
  const productError = form.querySelector('.text-danger-product');
  productError.style.display = 'none';

  const department = form.querySelector('select[name="department"').value;
  const departmentError = form.querySelector('.text-danger-department');
  departmentError.style.display = 'none';

  const price = form.querySelector('input[name="price"]').value;
  const priceError = form.querySelector('.text-danger-price');
  priceError.style.display = 'none';

  let isValid = true;

  if(!product) {
    productError.textContent = 'يجب إختيار المنتج';
    productError.style.display = 'block';
    isValid = false;
  }

  if (!department) {
    departmentError.textContent = 'يجب إختيار القسم';
    departmentError.style.display = 'block';
    isValid = false;
  }

  if (!price || isNaN(price)) {
    priceError.textContent = 'يجب إدخال السعر';
    priceError.style.display = 'block';
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
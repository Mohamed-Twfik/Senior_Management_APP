/**
 * Production form Validation
 * Validate the Production form data before submitting it to the server
 * @param form The form element
 */
const Validation = (form) => {
  const worker = form.querySelector('select[name="worker"]').value;
  const workerError = form.querySelector('.text-danger-worker');
  workerError.style.display = 'none';

  const date = form.querySelector('input[name="date"]').value;
  const dateError = form.querySelector('.text-danger-date');
  dateError.style.display = 'none';

  let isValid = true;

  if (!worker) {
    workerError.textContent = 'يجب إختيار العامل';
    workerError.style.display = 'block';
    isValid = false;
  }

  if (!date) {
    dateError.textContent = 'يجب إدخال تاريخ الإنتاج';
    dateError.style.display = 'block';
    isValid = false;
  }

  return isValid;
};

// Create entity
// document.querySelector(`.create-${PAGE_TYPE}`).addEventListener('click', (e) => {
//   Validation(`#create-${PAGE_TYPE}-form`);
// });

// // Update entity
// document.querySelectorAll(`.update-${PAGE_TYPE}`).forEach(button => {
//   button.addEventListener('click', (e) => {
//     const entityId = button.getAttribute('dataItemId');
//     Validation(`#update-${PAGE_TYPE}-form-${entityId}`);
//   });
// });
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

const salaryForm = document.querySelector('#salary-form');
const today = new Date();
const lastSaturday = new Date(today);
lastSaturday.setDate(today.getDate() - (today.getDay() + 1) % 7);

salaryForm.querySelector("input[name='from']").value = lastSaturday.toISOString().split('T')[0];
salaryForm.querySelector("input[name='to']").value = today.toISOString().split('T')[0];

// Get Salary form
document.querySelector('.get-salary').addEventListener('click', (e) => {
  salaryValidation();
});
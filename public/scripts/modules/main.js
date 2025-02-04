const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const weekSalaryForm = document.querySelector('#week-salary-form');

const today = new Date();
const lastSaturday = new Date(today);
lastSaturday.setDate(today.getDate() - (today.getDay() + 1) % 7);

weekSalaryForm.querySelector('#week-from').value = formatDate(lastSaturday);
weekSalaryForm.querySelector('#week-to').value = formatDate(today);
weekSalaryForm.querySelector('input[type="submit"]').addEventListener('click', (event) => {
  weekSalaryForm.submit();
});
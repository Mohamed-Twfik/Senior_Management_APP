/**
 * Users Form Validation
 * Used to validate user form data before submitting it to the server
 * @param {string} formSelector The form selector to get the form data
 * @param {boolean} isUpdate 
 */
const Validation = (formSelector, isUpdate = false) => {
  const form = document.querySelector(formSelector);
  const username = form.querySelector('input[name="username"]').value;
  const password = form.querySelector('input[name="password"]').value;

  const usernameError = form.querySelector('.text-danger-username');
  const passwordError = form.querySelector('.text-danger-password');

  usernameError.style.display = 'none';
  passwordError.style.display = 'none';

  let isValid = true;

  const usernameRegex = /^[\s\S]{3,}$/;
  if (!username || !usernameRegex.test(username)) {
    usernameError.textContent = 'إسم المستخدم يجب أن يحتوي على 3 أحرف على الأقل';
    usernameError.style.display = 'block';
    isValid = false;
  }

  const passwordRegex = /^(?=.*[ء-يa-z])(?=.*\d)[ء-يa-z\d]{6,}$/;
  if (!isUpdate) {
    if (!password || !passwordRegex.test(password)) {
      passwordError.textContent = 'كلمة المرور يجب أن تحتوي على حرف ورقم وتحتوي على 6 أحرف على الأقل';
      passwordError.style.display = 'block';
      isValid = false;
    }
  } else {
    if (password && !passwordRegex.test(password)) {
      passwordError.textContent = 'يجب أن تكون كلمة المرور مكونة من 6 أحرف على الأقل، وتحتوي على رقم واحد على الأقل، وحرف واحد على الأقل، وأن تتكون من أحرف وأرقام فقط.';
      passwordError.style.display = 'block';
      isValid = false;
    } else if (!password && isValid) {
      form.querySelector('input[name="password"]').removeAttribute('name');
    }
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
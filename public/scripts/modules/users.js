/**
 * Users Form Validation
 * Used to validate user form data before submitting it to the server
 * @param form The form element
 * @param {boolean} isUpdate 
 */
const Validation = (form, isUpdate = false) => {
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

  return isValid;
};

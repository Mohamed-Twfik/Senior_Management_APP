const initializeChoices = (select) => {
  new Choices(select, {
    searchEnabled: true,
    removeItemButton: false,
    searchResultLimit: -1,
    noResultsText: 'لا يوجد نتائج مطابقة',
    noChoicesText: 'لا يوجد خيارات للعرض',
    itemSelectText: '',
    position: 'bottom',
  });
};


const firstProductionInputGroup = document.querySelector(`#create-${PAGE_TYPE}-form .production-details .production-input-group`);
const productionInputGroup = firstProductionInputGroup.cloneNode(true);
firstProductionInputGroup.querySelector('.btn-close').addEventListener('click', (e) => {
  e.target.closest('.production-input-group').remove();
});
firstProductionInputGroup.querySelectorAll("select").forEach((select) => {
  initializeChoices(select);
});

document.querySelector('#add-production-input').addEventListener("click", (e) => {
  const length = e.target.getAttribute('data-length');

  const form = document.querySelector(`#create-${PAGE_TYPE}-form`);
  const productionDetails = form.querySelector('.production-details');
  const productionInputGroupClone = productionInputGroup.cloneNode(true);

  productionInputGroupClone.querySelectorAll('select, input').forEach(input => {
    if (input.name.startsWith('productionDetails')) {
      input.name = input.name.replace(/\d+/, length);
      input.value = '';
    }
  });

  productionInputGroupClone.querySelector('.btn-close').addEventListener('click', (e) => {
    e.target.closest('.production-input-group').remove();
  });

  productionDetails.appendChild(productionInputGroupClone);

  productionInputGroupClone.querySelectorAll("select").forEach((select) => {
    initializeChoices(select);
  });

  e.target.setAttribute('data-length', parseInt(length) + 1);
});


/**
 * Production form Validation
 * Validate the Production form data before submitting it to the server
 * @param {string} formSelector The form selector to get the form data
 */
const Validation = (form) => {
  let isValid = true;

  const date = form.querySelector('input[name="date"]').value;
  const dateError = form.querySelector('.text-danger-date');
  dateError.style.display = 'none';
  if (!date) {
    dateError.textContent = 'يجب إدخال تاريخ الإنتاج';
    dateError.style.display = 'block';
    isValid = false;
  }

  const worker = form.querySelector('select[name="worker"]').value;
  const workerError = form.querySelector('.text-danger-worker');
  workerError.style.display = 'none';
  if (!worker) {
    workerError.textContent = 'يجب إختيار العامل';
    workerError.style.display = 'block';
    isValid = false;
  }
  
  const productExist = {};
  const productionInputGroups = form.querySelectorAll('.production-input-group');
  const productionDetailsError = form.querySelector('.text-danger.production-details');
  productionDetailsError.style.display = 'none';
  if (productionInputGroups.length === 0) {
    productionDetailsError.textContent = 'يجب إضافة منتج واحد على الأقل';
    productionDetailsError.style.display = 'block';
    isValid = false;
  } else {
    productionInputGroups.forEach((productionInputGroup, index) => {
      const error = productionInputGroup.querySelector('.text-danger');
      error.style.display = 'none';
      
      const department = productionInputGroup.querySelector('select.department');
      if (!department.value) department.removeAttribute('name');
      else department.setAttribute('name', `productionDetails[${index}][department]`);
  
      const product = productionInputGroup.querySelector('select.product').value;
      const quantity = productionInputGroup.querySelector('input.quantity').value;
      if (!product) {
        error.textContent = 'يجب إختيار المنتج';
        error.style.display = 'block';
        isValid = false;
      } else {
        if (productExist[product] === department.value) {
          error.textContent = 'لا يمكن إضافة نفس المنتج أكثر من مرة';
          error.style.display = 'block';
          isValid = false;
        } else {
          productExist[product] = department.value;
        }
      }
  
      if (!quantity || isNaN(quantity)) {
        error.textContent = 'يجب إدخال كمية الإنتاج';
        error.style.display = 'block';
        isValid = false;
      }
    });
  }

  return isValid;
};
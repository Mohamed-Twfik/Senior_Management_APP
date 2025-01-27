/**
 * Get filter form data
 * Used to get filter form data and convert it to a FormData object
 * And apply some modifications to the data before sending it to the server
 * 
 * @param {Element} filterForm The filter form element
 * @returns {string} The filter form url
 */
const getFilterUrl = (filterForm) => {
  for (const element of filterForm.elements) {
    if (element.value) {
      if (element.getAttribute('type') === 'text') element.value = `search:` + element.value;
      if (element.getAttribute('type') === 'number' && element.getAttribute('name') !== 'pageSize') {
        element.setAttribute('type', 'text');
        element.value = `${element.previousElementSibling.value}${element.value}`;
      }
    } else {
      element.removeAttribute("name");
    }
  }

  const filterFormData = new FormData(filterForm);
  if (filterFormData.get('sort-type')) filterFormData.set('sort', `-${filterFormData.get('sort')}`);
  filterFormData.delete('sort-type');

  if (filterFormData.get('date-range') && filterFormData.get('date-range-from') && filterFormData.get('date-range-to')) {
    let from = new Date(filterFormData.get('date-range-from'));
    let to = new Date(filterFormData.get('date-range-to'));

    let value;
    if (from > to) value = `daterange:${filterFormData.get('date-range-to')},${filterFormData.get('date-range-from')}`
    else value = `daterange:${filterFormData.get('date-range-from')},${filterFormData.get('date-range-to')}`

    filterFormData.set('date', value);
  }
  filterFormData.delete('date-range');
  filterFormData.delete('date-range-from');
  filterFormData.delete('date-range-to');

  const action = filterForm.getAttribute('action');
  const url = `${action}?${new URLSearchParams(filterFormData).toString()}`;
  // console.log(url);
  return url;
}

// Used to filter data when submitting filter form
document.querySelector('#filter-form').addEventListener('submit', function (e) {
  e.preventDefault();
  // getFilterUrl(e.target);
  window.location.href = getFilterUrl(e.target);
});

// Update page links href attribute and add filter form data to it
// Used to apply filter form data with pagination links
document.querySelectorAll('.page-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = `${getFilterUrl(document.querySelector('#filter-form'))}&page=${link.getAttribute('page')}`;
  });
});

const PAGE_TYPE = document.querySelector('body').getAttribute('page-type');
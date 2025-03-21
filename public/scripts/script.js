// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(icon => {
  icon.addEventListener('click', (e) => {
    const passwordElement = icon.previousElementSibling;
    if (passwordElement.getAttribute('type') === 'password') {
      passwordElement.setAttribute('type', 'text');
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    } else {
      passwordElement.setAttribute('type', 'password');
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    }
  });
});

// Prevent form submission
document.querySelectorAll('form:not(#login-form)').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });
});

// Search in select fields
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('select.modify').forEach(select => {
    new Choices(select, {
      searchEnabled: true,
      removeItemButton: (select.hasAttribute('multiple')),
      searchResultLimit: -1,
      noResultsText: 'لا يوجد نتائج مطابقة',
      noChoicesText: 'لا يوجد خيارات للعرض',
      itemSelectText: '',
      position: 'bottom',
    });
  });

  document.querySelectorAll('select[form="filter-form"][name="worker"], select[form="filter-form"][name="product"]').forEach(select => {
    const instance = new Choices(select, {
      searchEnabled: true,
      removeItemButton: false,
      searchResultLimit: -1,
      noResultsText: 'لا يوجد نتائج مطابقة',
      noChoicesText: 'لا يوجد خيارات للعرض',
      itemSelectText: '',
      position: 'bottom',
    });

    const adjustWidth = () => {
      // Find the longest option in the select
      const options = Array.from(select.options);
      const longestOption = options.reduce((longest, option) => {
          return option.text.length > longest.text.length ? option : longest;
      }, { text: '' });

      // Create a temporary span to calculate width
      const span = document.createElement('span');
      span.style.visibility = 'hidden';
      span.style.position = 'absolute';
      span.style.whiteSpace = 'nowrap';
      span.textContent = longestOption.text;
      document.body.appendChild(span);

      // Set the width of the container
      const width = span.offsetWidth + 40; // Add padding
      document.body.removeChild(span);

      // Apply the calculated width to the Choices container
      instance.containerOuter.element.style.width = `${width}px`;
    };

    // Adjust width initially and on window resize
    adjustWidth();
    window.addEventListener('resize', adjustWidth);
  });
});

document.querySelectorAll(".delete-item").forEach(deleteLinks => {
  deleteLinks.addEventListener("click", (e) => {
    e.preventDefault();
    const query = getFilterUrl(document.querySelector('#filter-form')).split('?')[1];
    window.location.href = `${e.target.href}?${query}`;
  });
});
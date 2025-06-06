function toggleMenu() {
  const menuBtn = document.querySelector('.menu-btn');
  const menuDropdown = document.getElementById('menuDropdown');
  const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
  
  menuBtn.setAttribute('aria-expanded', !isExpanded);
  menuDropdown.classList.toggle('show-dropdown');

  // Close menu when clicking outside
  if (!isExpanded) {
    document.addEventListener('click', closeMenuOnClickOutside);
  } else {
    document.removeEventListener('click', closeMenuOnClickOutside);
  }
}

function closeMenuOnClickOutside(event) {
  const menuBtn = document.querySelector('.menu-btn');
  const menuDropdown = document.getElementById('menuDropdown');
  
  if (!menuBtn.contains(event.target) && !menuDropdown.contains(event.target)) {
    menuBtn.setAttribute('aria-expanded', 'false');
    menuDropdown.classList.remove('show-dropdown');
    document.removeEventListener('click', closeMenuOnClickOutside);
  }
}

// Close menu on ESC key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    const menuBtn = document.querySelector('.menu-btn');
    const menuDropdown = document.getElementById('menuDropdown');
    
    menuBtn.setAttribute('aria-expanded', 'false');
    menuDropdown.classList.remove('show-dropdown');
    document.removeEventListener('click', closeMenuOnClickOutside);
  }
}); 
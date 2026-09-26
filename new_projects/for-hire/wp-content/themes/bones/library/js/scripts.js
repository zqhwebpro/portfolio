/**
 * Bones Scripts
 * Author: Eddie Machado & Zach Heindel
 */

document.addEventListener('DOMContentLoaded', function () {
  console.log('Bones Theme Loaded with WooCommerce Integration.');

  // Responsive Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function (e) {
      e.preventDefault();
      mainNav.classList.toggle('nav-open');
    });
  }
});

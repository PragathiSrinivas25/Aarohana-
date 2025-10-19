
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile Menu Toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuBtn.innerHTML = navLinks.classList.contains('active') ?
    '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Mobile dropdown functionality
document.addEventListener('DOMContentLoaded', function () {
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        const dropdown = this.parentElement;
        dropdown.classList.toggle('active');

        // Close other dropdowns when opening a new one
        document.querySelectorAll('.dropdown').forEach(item => {
          if (item !== dropdown) {
            item.classList.remove('active');
          }
        });
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function (e) {
    if (window.innerWidth <= 992 && !e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown').forEach(item => {
        item.classList.remove('active');
      });
    }
  });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Close mobile menu if open
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    }
  });
});


// Animated Counter for Stats
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.hero-stat-number');
  counters.forEach(counter => {
    const icon = counter.querySelector('i');
    const target = parseInt(counter.textContent.replace(/\D/g, ''));
    let count = 0;
    const increment = Math.ceil(target / 200);
    const update = () => {
      count += increment;
      if (count > target) count = target;
      counter.innerHTML = icon.outerHTML + count;
      if (count < target) requestAnimationFrame(update);
    };
    update();
  });
});

// Project filter functionality (if needed)
const filterBtns = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-card');

if (filterBtns.length > 0 && projects.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.textContent.toLowerCase();
      projects.forEach(project => {
        if (category === 'all' || project.querySelector('.project-category').textContent.toLowerCase() === category) {
          project.style.display = 'block';
        } else {
          project.style.display = 'none';
        }
      });
    });
  });
}

function openModal(type) {
  document.getElementById(`${type}-modal`).style.display = 'flex';
}

function closeModal(type) {
  document.getElementById(`${type}-modal`).style.display = 'none';
}

// Close modal when clicking outside content
window.onclick = function (event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
}

// Mobile menu functionality
document.querySelector('.mobile-menu-btn').addEventListener('click', function () {
  const navLinks = document.querySelector('.nav-links');
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for header height
        behavior: 'smooth'
      });
    }
  });
});

let submitted = false;

function handleFormSubmit() {
  submitted = true;
  // Show loading state
  const submitBtn = document.querySelector('.contact-form .btn');
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;
}

function showSuccessMessage() {
  const successMessage = document.getElementById('success-message');
  const errorMessage = document.getElementById('error-message');
  const submitBtn = document.querySelector('.contact-form .btn');
  const form = document.querySelector('.contact-form form');

  successMessage.style.display = 'block';
  errorMessage.style.display = 'none';

  // Reset button
  submitBtn.innerHTML = 'Send Message';
  submitBtn.disabled = false;

  // Reset form after a delay
  setTimeout(() => {
    form.reset();
  }, 1000);

  // Hide success message after 5 seconds
  setTimeout(() => {
    successMessage.style.display = 'none';
  }, 5000);

  submitted = false;
}

function showErrorMessage() {
  const successMessage = document.getElementById('success-message');
  const errorMessage = document.getElementById('error-message');
  const submitBtn = document.querySelector('.contact-form .btn');

  errorMessage.style.display = 'block';
  successMessage.style.display = 'none';

  // Reset button
  submitBtn.innerHTML = 'Send Message';
  submitBtn.disabled = false;

  submitted = false;
}

// Fallback: if iframe doesn't load, show error after 10 seconds
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.contact-form form');
  form.addEventListener('submit', function () {
    setTimeout(function () {
      if (submitted) {
        showErrorMessage();
      }
    }, 10000);
  });
});

function openGoogleForm() {
  window.open('https://docs.google.com/forms/d/e/1FAIpQLSd0FJdyMFRyx4W597WiBmonL6nijzqnvXKBZ9_U6ygqfG526A/viewform', '_blank');
}

function openMaps() {
  const address = "No. 122/16, Unit No F-5, Monarch Chambers, Infantry Road, Bengaluru - 560 001";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  window.open(mapsUrl, '_blank');
}
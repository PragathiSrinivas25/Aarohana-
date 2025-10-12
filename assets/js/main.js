
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
    document.addEventListener('DOMContentLoaded', function() {
      const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
      
      dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
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
      document.addEventListener('click', function(e) {
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
    window.onclick = function(event) {
      if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
      }
    }

    // Mobile menu functionality
    document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
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

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxYz.../exec'; // <-- replace with your Apps Script URL
  
  function submitForm(type, fields) {
    const data = { type };
  
    fields.forEach(id => {
      const el = document.getElementById(id);
      if (el) data[id.replace(/-.*/, '')] = el.value;
    });
  
    fetch(scriptURL, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }).then(() => {
      alert("✅ Your response has been recorded successfully!");
      fields.forEach(id => document.getElementById(id).value = '');
    }).catch(err => alert("❌ Submission failed: " + err));
  }
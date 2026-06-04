// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
  
  // Mobile Navigation Menu Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinksContainer = document.querySelector('.nav-links');

  if (navToggle && navLinksContainer) {
    navToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('mobile-open');
      const icon = navToggle.querySelector('i');
      if (icon) {
        if (navLinksContainer.classList.contains('mobile-open')) {
          icon.className = 'fa-solid fa-xmark';
        } else {
          icon.className = 'fa-solid fa-bars';
        }
      }
    });

    // Close mobile menu when clicking a nav link
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('mobile-open');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.className = 'fa-solid fa-bars';
        }
      });
    });
  }

  // Active Navigation Link Highlight on Scroll
  const sections = document.querySelectorAll('section[id], #about');
  const navLinks = document.querySelectorAll('.nav-link');

  const options = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the middle portion of the screen
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, options);

  sections.forEach(section => {
    observer.observe(section);
  });

  // Sticky Navbar background opacity adjustment on scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.style.padding = '10px 0';
        navbar.style.backgroundColor = 'rgba(9, 14, 26, 0.95)';
        navbar.style.boxShadow = '0 10px 30px -10px rgba(2, 6, 23, 0.3)';
      } else {
        navbar.style.padding = '0';
        navbar.style.backgroundColor = 'rgba(9, 14, 26, 0.85)';
        navbar.style.boxShadow = 'none';
      }
    });
  }
});

// CSS Injection for mobile menu slide out helper in pure CSS
// Since styling is handled in styles.css, let's add mobile-open rule there if missing.
// We can also inject it dynamically here to be 100% sure it works:
const style = document.createElement('style');
style.innerHTML = `
  @media (max-width: 600px) {
    .nav-links {
      display: none;
      flex-direction: column;
      position: absolute;
      top: 70px;
      left: 0;
      width: 100%;
      background-color: var(--bg-secondary);
      border-bottom: 1px solid var(--border-color);
      padding: 24px;
      gap: 20px;
      align-items: flex-start;
      z-index: 99;
      box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    }
    .nav-links.mobile-open {
      display: flex;
    }
    .nav-link {
      width: 100%;
      padding: 8px 0;
    }
  }
`;
document.head.appendChild(style);

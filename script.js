/* ============================================
   OLÉ GOURMET — INTERACTIONS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar scroll effect ----
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ---- Mobile menu toggle ----
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu on link click
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Close on click outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- Intersection Observer for reveals ----
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ---- Active nav link highlight ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link:not(.nav-link--cta)');

  const highlightNav = () => {
    const scrollY = window.scrollY + 150;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + id) {
            link.style.color = '#fff';
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

  // ---- Contact form handling ----
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btnSpan = submitBtn.querySelector('span');
    const original = btnSpan.textContent;
    btnSpan.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    // Simulate send (replace with real endpoint)
    setTimeout(() => {
      btnSpan.textContent = '✓ Enquiry Sent!';
      submitBtn.style.background = '#4A7C59';
      submitBtn.style.opacity = '1';
      form.reset();

      setTimeout(() => {
        btnSpan.textContent = original;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3000);
    }, 1200);
  });

  // ---- Parallax on hero (subtle) ----
  const heroBg = document.querySelector('.hero-bg-img');
  if (heroBg && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `scale(${1.05 + scrolled * 0.0001}) translateY(${scrolled * 0.15}px)`;
      }
    }, { passive: true });
  }

});

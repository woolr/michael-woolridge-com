/* ============================================
   MICHAEL WOOLRIDGE — PORTFOLIO SCRIPTS
   Lightweight vanilla JS for interactivity
   ============================================ */

(function () {
  'use strict';

  // --- Scroll-triggered reveal animations ---
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
  });

  // --- Navigation scroll effect ---
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // --- Mobile menu toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu when clicking a link
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: top,
          behavior: 'smooth',
        });
      }
    });
  });

  // --- Subtle parallax on hero image ---
  const heroImage = document.querySelector('.hero-image-wrapper');

  if (heroImage && window.matchMedia('(min-width: 769px)').matches) {
    window.addEventListener(
      'scroll',
      () => {
        const scrollY = window.scrollY;
        const rate = scrollY * 0.08;

        if (scrollY < window.innerHeight) {
          heroImage.style.transform = `translateY(${rate}px)`;
        }
      },
      { passive: true }
    );
  }

  // --- Active nav link highlighting ---
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navAnchors.forEach((a) => {
            a.style.color = '';
            if (a.getAttribute('href') === `#${id}`) {
              a.style.color = 'var(--text-primary)';
            }
          });
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: '-80px 0px -50% 0px',
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
})();

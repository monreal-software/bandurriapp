/* ═══════════════════════════════════════════════════════
   LAS BANDURRIAS - Main Navigation & Utilities
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── Navbar Scroll Effect ───
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const navLinks = document.querySelectorAll('.navbar__link');
  const mobileLinks = document.querySelectorAll('.navbar__mobile-link');
  const sections = document.querySelectorAll('section[id]');

  let lastScroll = 0;
  let lastFocusedElement = null;

  function handleNavbarScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  // ─── Scroll Spy ───
  function updateScrollSpy() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ─── Mobile Menu ───
  const FOCUSABLE_SELECTORS = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function toggleMobileMenu() {
    const isActive = hamburger.classList.contains('active');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', !isActive);

    if (!isActive) {
      lastFocusedElement = document.activeElement;
      mobileOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      var focusable = mobileOverlay.querySelectorAll(FOCUSABLE_SELECTORS);
      if (focusable.length) focusable[0].focus();
    } else {
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
      if (lastFocusedElement) lastFocusedElement.focus();
    }
  }

  function closeMobileMenu() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (lastFocusedElement) {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  // Focus trap for mobile menu
  if (mobileOverlay) {
    mobileOverlay.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || !hamburger.classList.contains('active')) return;
      var focusable = mobileOverlay.querySelectorAll(FOCUSABLE_SELECTORS);
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  // ─── Smooth Scroll ───
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')) || 72;
        const top = target.offsetTop - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ─── Hero Particles ───
  function createParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;

    var particleCount = window.innerWidth < 768 ? 15 : 30;

    for (var i = 0; i < particleCount; i++) {
      var particle = document.createElement('div');
      particle.className = 'hero__particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (8 + Math.random() * 12) + 's';
      particle.style.animationDelay = (Math.random() * 10) + 's';
      particle.style.width = (1 + Math.random() * 3) + 'px';
      particle.style.height = particle.style.width;
      container.appendChild(particle);
    }
  }

  // ─── Footer Year ───
  function setFooterYear() {
    var yearEl = document.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // ─── Video Cards ───
  function initVideoCards() {
    var videoCards = document.querySelectorAll('.video-card__thumb');
    var modal = document.getElementById('video-modal');
    var modalContent = document.getElementById('video-modal-content');
    var modalClose = document.getElementById('video-modal-close');

    if (!modal) return;

    videoCards.forEach(function (card) {
      card.addEventListener('click', function () {
        lastFocusedElement = this;
        var videoId = this.getAttribute('data-video-id');
        if (videoId) {
          modalContent.innerHTML = '<iframe src="https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
          modal.classList.add('active');
          modal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    function closeVideoModal() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      modalContent.innerHTML = '';
      document.body.style.overflow = '';
      if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
      }
    }

    if (modalClose) {
      modalClose.addEventListener('click', closeVideoModal);
    }

    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeVideoModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeVideoModal();
      }
    });
  }

  // ─── Contact Form ───
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var isValid = true;

      // Reset errors
      form.querySelectorAll('.form__error').forEach(function (el) { el.textContent = ''; });
      form.querySelectorAll('.form__input').forEach(function (el) { el.classList.remove('error'); });

      // Validate name
      var name = document.getElementById('form-name');
      if (!name.value.trim()) {
        document.getElementById('form-name-error').textContent = 'Por favor ingresa tu nombre';
        name.classList.add('error');
        isValid = false;
      }

      // Validate email
      var email = document.getElementById('form-email');
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value)) {
        document.getElementById('form-email-error').textContent = 'Ingresa un correo válido';
        email.classList.add('error');
        isValid = false;
      }

      // Validate event type
      var eventType = document.getElementById('form-event-type');
      if (!eventType.value) {
        document.getElementById('form-event-error').textContent = 'Selecciona un tipo de evento';
        eventType.classList.add('error');
        isValid = false;
      }

      // Validate message
      var message = document.getElementById('form-message');
      if (!message.value.trim()) {
        document.getElementById('form-message-error').textContent = 'Por favor escribe tu mensaje';
        message.classList.add('error');
        isValid = false;
      }

      if (isValid) {
        var submitBtn = document.getElementById('form-submit');
        var btnText = submitBtn.querySelector('.btn__text');
        var btnLoading = submitBtn.querySelector('.btn__loading');

        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;

        // Simulate submission
        setTimeout(function () {
          form.style.display = 'none';
          document.getElementById('form-success').style.display = 'block';
        }, 1500);
      }
    });

    // Live validation on blur
    form.querySelectorAll('.form__input[required]').forEach(function (input) {
      input.addEventListener('blur', function () {
        if (!this.value.trim()) {
          this.classList.add('error');
        } else {
          this.classList.remove('error');
        }
      });

      input.addEventListener('input', function () {
        if (this.value.trim()) {
          this.classList.remove('error');
          var errorEl = this.parentElement.querySelector('.form__error');
          if (errorEl) errorEl.textContent = '';
        }
      });
    });
  }

  // ─── Event Listeners ───
  window.addEventListener('scroll', function () {
    handleNavbarScroll();
    updateScrollSpy();
  }, { passive: true });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });

  // ─── Init ───
  document.addEventListener('DOMContentLoaded', function () {
    createParticles();
    setFooterYear();
    initVideoCards();
    initContactForm();
    handleNavbarScroll();
    updateScrollSpy();
  });

})();
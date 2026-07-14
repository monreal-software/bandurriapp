/* ═══════════════════════════════════════════════════════
   LAS BANDURRIAS - Animations (GSAP + ScrollTrigger)
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var initialized = false;

  function initAnimations() {
    if (initialized) return;
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      initFallbackAnimations();
      return;
    }

    initialized = true;

    document.body.classList.add('gsap-active');
    gsap.registerPlugin(ScrollTrigger);

    // ─── Hero Entrance ───
    var heroTl = gsap.timeline({ delay: 0.3 });

    heroTl
      .fromTo('.hero__subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo('.hero__title',
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo('.hero__tagline',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo('.hero__cta .btn',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo('.hero__scroll-indicator',
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.2'
      );

    // ─── Hero Parallax ───
    gsap.to('.hero__bg', {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      y: 150,
      scale: 1.1,
      ease: 'none'
    });

    gsap.to('.hero__content', {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      y: -80,
      opacity: 0,
      ease: 'none'
    });

    // ─── Section Headers ───
    gsap.utils.toArray('.section__header').forEach(function (header) {
      gsap.fromTo(header.children,
        { opacity: 0, y: 40 },
        {
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out'
        }
      );
    });

    // ─── Historia Blocks ───
    gsap.fromTo('.historia__image-frame',
      { opacity: 0, x: -60 },
      {
        scrollTrigger: {
          trigger: '.historia__grid',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out'
      }
    );

    gsap.fromTo('.historia__block',
      { opacity: 0, y: 30 },
      {
        scrollTrigger: {
          trigger: '.historia__content',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power2.out'
      }
    );

    // ─── Integrantes Cards ───
    gsap.fromTo('.integrante-card',
      { opacity: 0, y: 50, scale: 0.95 },
      {
        scrollTrigger: {
          trigger: '.integrantes__grid',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out'
      }
    );

    // ─── Player ───
    gsap.fromTo('.player',
      { opacity: 0, y: 40 },
      {
        scrollTrigger: {
          trigger: '.player',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }
    );

    gsap.fromTo('.playlist',
      { opacity: 0, y: 30 },
      {
        scrollTrigger: {
          trigger: '.playlist',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out'
      }
    );

    // ─── Evento Cards ───
    gsap.fromTo('.evento-card',
      { opacity: 0, x: -40 },
      {
        scrollTrigger: {
          trigger: '.eventos__list',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        x: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out'
      }
    );

    // ─── Galería ───
    gsap.fromTo('.galeria__filter',
      { opacity: 0, y: 20 },
      {
        scrollTrigger: {
          trigger: '.galeria__filters',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power2.out'
      }
    );

    gsap.fromTo('.galeria__item',
      { opacity: 0, scale: 0.9 },
      {
        scrollTrigger: {
          trigger: '.galeria__grid',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        scale: 1,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out'
      }
    );

    // ─── Video Cards ───
    gsap.fromTo('.video-card',
      { opacity: 0, y: 40 },
      {
        scrollTrigger: {
          trigger: '.videos__grid',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out'
      }
    );

    // ─── Contact Section ───
    gsap.fromTo('.contacto__info',
      { opacity: 0, x: -40 },
      {
        scrollTrigger: {
          trigger: '.contacto__grid',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out'
      }
    );

    gsap.fromTo('.contacto__form',
      { opacity: 0, x: 40 },
      {
        scrollTrigger: {
          trigger: '.contacto__grid',
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
      }
    );

    // ─── Footer ───
    gsap.fromTo('.footer__grid > *',
      { opacity: 0, y: 30 },
      {
        scrollTrigger: {
          trigger: '.footer__grid',
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out'
      }
    );

    // ─── Section Dividers ───
    gsap.utils.toArray('.section__divider').forEach(function (divider) {
      gsap.fromTo(divider,
        { width: 0 },
        {
          scrollTrigger: {
            trigger: divider,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          width: 80,
          duration: 0.8,
          ease: 'power2.inOut'
        }
      );
    });

    // ─── Smooth Section Transitions ───
    gsap.utils.toArray('.section').forEach(function (section) {
      gsap.fromTo(section,
        { opacity: 0.7 },
        {
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            end: 'top 30%',
            scrub: 1
          },
          opacity: 1,
          ease: 'none'
        }
      );
    });
  }

  // ─── Fallback Animations (no GSAP) ───
  function initFallbackAnimations() {
    initialized = true;

    var heroEls = document.querySelectorAll('.hero__subtitle, .hero__title, .hero__tagline, .hero__cta, .hero__scroll-indicator');
    var sectionEls = document.querySelectorAll(
      '.section__header, .section__divider, .historia__image-frame, .historia__block, ' +
      '.integrante-card, .player, .playlist, .evento-card, .galeria__filter, .galeria__item, ' +
      '.video-card, .contacto__info, .contacto__form, .footer__grid > *'
    );

    // Hero elements: always fade in immediately
    heroEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    requestAnimationFrame(function () {
      heroEls.forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });

    // Safety: force hero visible after 300ms even if RAF fails
    setTimeout(function () {
      heroEls.forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    }, 300);

    // Section elements: fade in on scroll
    if ('IntersectionObserver' in window && sectionEls.length > 0) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      sectionEls.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
      });
    } else {
      sectionEls.forEach(function (el) {
        el.style.opacity = '1';
      });
    }

    // Navbar scroll
    window.addEventListener('scroll', function () {
      var navbar = document.getElementById('navbar');
      if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
      }
    }, { passive: true });
  }

  // ─── Init ───
  function boot() {
    if (initialized) return;
    setTimeout(initAnimations, 100);
  }

  document.addEventListener('DOMContentLoaded', boot);

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    boot();
  }

})();
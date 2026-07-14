/* ═══════════════════════════════════════════════════════
   LAS BANDURRIAS - Gallery & Lightbox
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var galleryItems = document.querySelectorAll('.galeria__item');
  var filterBtns = document.querySelectorAll('.galeria__filter');
  var lightbox = document.getElementById('lightbox');
  var lightboxContent = document.getElementById('lightbox-content');
  var lightboxCaption = document.getElementById('lightbox-caption');
  var lightboxClose = document.getElementById('lightbox-close');
  var lightboxPrev = document.getElementById('lightbox-prev');
  var lightboxNext = document.getElementById('lightbox-next');

  var currentFilter = 'all';
  var currentLightboxIndex = 0;
  var visibleItems = [];

  // ─── Gallery Data ───
  var galleryData = [];

  galleryItems.forEach(function (item) {
    var placeholder = item.querySelector('.galeria__placeholder');
    var caption = placeholder ? placeholder.querySelector('p') : null;
    galleryData.push({
      element: item,
      category: item.getAttribute('data-category'),
      caption: caption ? caption.textContent : '',
      index: parseInt(item.getAttribute('data-index'))
    });
  });

  // ─── Filter ───
  function filterGallery(category) {
    currentFilter = category;
    visibleItems = [];

    filterBtns.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === category);
    });

    galleryItems.forEach(function (item) {
      var itemCat = item.getAttribute('data-category');
      var show = category === 'all' || itemCat === category;

      if (show) {
        item.style.display = '';
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        visibleItems.push(item);

        setTimeout(function () {
          item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 50);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        setTimeout(function () {
          item.style.display = 'none';
        }, 300);
      }
    });
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = this.getAttribute('data-filter');
      filterGallery(filter);
    });
  });

  // ─── Lightbox ───
  function openLightbox(index) {
    visibleItems = [];
    galleryItems.forEach(function (item) {
      if (item.style.display !== 'none') {
        visibleItems.push(item);
      }
    });

    // Find the index in visibleItems
    var visibleIndex = 0;
    for (var i = 0; i < visibleItems.length; i++) {
      if (visibleItems[i].getAttribute('data-index') === String(index)) {
        visibleIndex = i;
        break;
      }
    }

    currentLightboxIndex = visibleIndex;
    showLightboxImage();
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function showLightboxImage() {
    if (visibleItems.length === 0) return;

    var item = visibleItems[currentLightboxIndex];
    var placeholder = item.querySelector('.galeria__placeholder');
    var captionText = placeholder ? (placeholder.querySelector('p') ? placeholder.querySelector('p').textContent : '') : '';

    // Clone the placeholder content
    var clonedPlaceholder = placeholder.cloneNode(true);
    clonedPlaceholder.style.cssText = 'width:80vw;max-width:800px;height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:var(--color-bg-card);border-radius:var(--radius-md);border:1px solid var(--color-border);color:var(--color-gold);opacity:0.6;';

    lightboxContent.innerHTML = '';
    lightboxContent.appendChild(clonedPlaceholder);
    lightboxCaption.textContent = captionText;
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function prevImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + visibleItems.length) % visibleItems.length;
    showLightboxImage();
  }

  function nextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % visibleItems.length;
    showLightboxImage();
  }

  // ─── Event Listeners ───
  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      var index = parseInt(this.getAttribute('data-index'));
      openLightbox(index);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);
  if (lightboxNext) lightboxNext.addEventListener('click', nextImage);

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (!lightbox || !lightbox.classList.contains('active')) return;

    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        prevImage();
        break;
      case 'ArrowRight':
        nextImage();
        break;
    }
  });

  // ─── Init ───
  document.addEventListener('DOMContentLoaded', function () {
    visibleItems = Array.from(galleryItems);
  });

})();
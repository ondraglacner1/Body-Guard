/* ═══════════════════════════════
   SKIP-TO-MAIN — WCAG 2.2 AA
═══════════════════════════════ */
function initSkipToMain() {
  const skipLink = document.querySelector('.skip-to-main');
  if (!skipLink) return;

  skipLink.addEventListener('click', (e) => {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    // Zajisti, že hlavní obsah je fokusovatelný
    if (!mainContent.hasAttribute('tabindex')) {
      mainContent.setAttribute('tabindex', '-1');
    }

    // ✅ Přesunout fokus na main element
    setTimeout(() => {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  });
}

/* ═══════════════════════════════
   HAMBURGER MENU  
═══════════════════════════════ */  
function initHamburger() {  
  const btn = document.getElementById('hamburger');  
  const nav = document.getElementById('siteNav');  
  if (!btn || !nav) return;  

  // Otevři/zavři menu
  btn.addEventListener('click', () => {  
    const isOpen = nav.classList.toggle('open');  
    btn.classList.toggle('open', isOpen);  
    btn.setAttribute('aria-expanded', isOpen);  
  });  

  // Zavři menu když klikneš na odkaz
  nav.querySelectorAll('.site-nav__link').forEach(link => {  
    link.addEventListener('click', () => {  
      nav.classList.remove('open');  
      btn.classList.remove('open');  
      btn.setAttribute('aria-expanded', 'false');  
    });  
  });  

  // Oprava animace při resize okna
  let resizeTimer;  
  window.addEventListener('resize', () => {  
    nav.classList.add('no-transition');  
    clearTimeout(resizeTimer);  
    resizeTimer = setTimeout(() => {  
      nav.classList.remove('no-transition');  
    }, 150);  
  }, { passive: true });  
}  

/* ═══════════════════════════════
   LAZY LOADING OBRÁZKŮ
═══════════════════════════════ */
function initLazyImages() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  if (!images.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
          }
          
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '100px' });

    images.forEach(img => observer.observe(img));
  }
}

/* ═══════════════════════════════
   LAZY LOADING PRO VIDEA / IFRAMY
═══════════════════════════════ */
function initLazyMedia() {
  const iframes = document.querySelectorAll('iframe[data-src]');
  if (!iframes.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const iframe = entry.target;
        iframe.src = iframe.dataset.src;
        iframe.classList.add('loaded');
        observer.unobserve(iframe);
      }
    });
  }, { rootMargin: '200px' });

  iframes.forEach(iframe => observer.observe(iframe));
}

/* ═══════════════════════════════
   PLOVOUCÍ ČÁSTICE (lazy loading)
═══════════════════════════════ */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        createParticles(container);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(container);
}

function createParticles(container) {
  const colors = ['#FF6B35', '#FF4500', '#FFD700', '#FF2244', '#FF8C60'];

  for (let i = 0; i < 25; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    p.setAttribute('aria-hidden', 'true');
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (8 + Math.random() * 12) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    const size = (2 + Math.random() * 3) + 'px';
    p.style.width = size;
    p.style.height = size;
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    container.appendChild(p);
  }
}

/* ═══════════════════════════════
   SCROLL REVEAL
═══════════════════════════════ */
function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ═══════════════════════════════
   PROGRESS BAR ANIMACE
═══════════════════════════════ */
function initProgressBars() {
  const bars = document.querySelectorAll('.progress-bar__fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        setTimeout(() => {
          bar.style.width = bar.dataset.width + '%';
        }, 200);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

/* ═══════════════════════════════
   NAVBAR SCROLL EFEKT
═══════════════════════════════ */
function initNavbarScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (scrollTimeout) return;
    
    scrollTimeout = setTimeout(() => {
      const inner = header.querySelector('.site-header__inner');
      if (window.scrollY > 50) {
        inner.style.padding = '0.7rem 2rem';
        header.style.background = 'rgba(13, 0, 5, 0.97)';
      } else {
        inner.style.padding = '1rem 2rem';
        header.style.background = 'rgba(13, 0, 5, 0.85)';
      }
      scrollTimeout = null;
    }, 100);
  }, { passive: true });
}

/* ═══════════════════════════════
   AKTIVNÍ ODKAZ V NAVIGACI
═══════════════════════════════ */
function initActiveNav() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  
  document.querySelectorAll('.site-nav__link').forEach(link => {
    link.classList.remove('site-nav__link--active');
    link.removeAttribute('aria-current');
  });
  
  document.querySelectorAll('.site-nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (href === 'index.html' && current === '')) {
      link.classList.add('site-nav__link--active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ═══════════════════════════════
   MEDIA GALERIE — LIGHTBOX (WCAG)
═══════════════════════════════ */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxLabel = document.getElementById('lightboxLabel');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryImages = document.querySelectorAll('.media-grid img');

  // ✅ Kontrola, zda lightbox na aktuální stránce vůbec existuje (např. na indexu nebude)
  if (!lightbox || !galleryImages.length) return;

  let currentIdx = 0;

  // Pole pro uložení cest k velkým obrázkům a popiskům
  const imagesData = Array.from(galleryImages).map(img => ({
    src: img.src,
    alt: img.alt,
    label: img.closest('.media-item')?.getAttribute('data-label') || ''
  }));

  function openLightbox(idx) {
    currentIdx = idx;
    lightboxImg.src = imagesData[currentIdx].src;
    lightboxImg.alt = imagesData[currentIdx].alt;
    lightboxLabel.textContent = imagesData[currentIdx].label;
    lightbox.style.display = 'flex';
    lightboxImg.focus(); // Přesunutí focusu pro přístupnost
    document.body.style.overflow = 'hidden'; // Zamezení scrollování na pozadí
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
    // Vrátíme focus na původní kliknutý obrázek
    galleryImages[currentIdx].focus();
  }

  function nextImage() {
    currentIdx = (currentIdx + 1) % imagesData.length;
    openLightbox(currentIdx);
  }

  function prevImage() {
    currentIdx = (currentIdx - 1 + imagesData.length) % imagesData.length;
    openLightbox(currentIdx);
  }

  // Kliknutí na obrázky v galerii
  galleryImages.forEach((img, index) => {
    // Aby šlo na obrázky klikat i tabulátorem přes klávesnici
    img.setAttribute('tabindex', '0');
    
    img.addEventListener('click', () => openLightbox(index));
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') openLightbox(index);
    });
  });

  // Zavírací akce
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Ovládání klávesnicí uvnitř Lightboxu (Esc, Šipky)
  window.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    }
  });
}

/* ═══════════════════════════════
   INIT — VŠECHNY FUNKCE
═══════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initSkipToMain();
  initHamburger();
  initParticles();
  initLazyImages();
  initLazyMedia();
  initReveal();
  initProgressBars();
  initNavbarScroll();
  initActiveNav();
  initLightbox(); // ✅ NOVĚ: Inicializace lightboxu pro galerii
});
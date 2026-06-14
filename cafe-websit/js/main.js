/* ═══════════════════════════════════════════════════
   MAIN.JS — Nav, Menu Tabs, Form, Back-to-Top, Mobile, Ripple
   ═══════════════════════════════════════════════════ */

// ── NAVBAR SCROLL BEHAVIOR ─────────────────────────
(function initNav() {
  const nav = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  let lastY = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;

    // Scrolled class
    if (y > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Back to top visibility
    if (y > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Hide nav on scroll down, show on scroll up
    if (y > lastY && y > 200) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }
    lastY = y;
  }, { passive: true });
})();


// ── MOBILE MENU ────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';

  // Animate hamburger to X
  const spans = hamburger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

function closeMobile() {
  menuOpen = false;
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
  const spans = hamburger.querySelectorAll('span');
  spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}

// Close mobile menu on overlay click
mobileMenu.addEventListener('click', (e) => {
  if (e.target === mobileMenu) closeMobile();
});


// ── MENU TABS ──────────────────────────────────────
(function initMenuTabs() {
  const tabs = document.querySelectorAll('.menu-tab');
  const cards = document.querySelectorAll('.menu-card');
  const grid = document.getElementById('menuGrid');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.dataset.tab;

      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Filter cards with animation
      cards.forEach(card => {
        const match = card.dataset.category === category;
        if (match) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.classList.add('hidden');
          card.style.opacity = '';
          card.style.transform = '';
          card.style.transition = '';
        }
      });
    });
  });
})();


// ── SMOOTH SCROLL FOR NAV LINKS ────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


// ── RIPPLE EFFECT ON BUTTONS ───────────────────────
document.querySelectorAll('.btn').forEach(btn => {
  btn.classList.add('ripple-btn');
  btn.addEventListener('click', (e) => {
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
    `;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});


// ── PARALLAX ON HERO TEXT ──────────────────────────
(function initParallax() {
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero__content');
  if (!hero || !heroContent) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (y < hero.offsetHeight) {
        heroContent.style.transform = `translateY(${y * 0.3}px)`;
        heroContent.style.opacity = `${1 - y / (hero.offsetHeight * 0.7)}`;
      }
      ticking = false;
    });
    ticking = true;
  }, { passive: true });
})();


// ── GALLERY LIGHTBOX (simple) ──────────────────────
(function initGallery() {
  const items = document.querySelectorAll('.gallery__item img');
  if (!items.length) return;

  // Create lightbox
  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.style.cssText = `
    position: fixed; inset: 0; background: rgba(26,15,10,0.96);
    z-index: 9998; display: none; align-items: center; justify-content: center;
    cursor: zoom-out; backdrop-filter: blur(12px);
  `;
  const lbImg = document.createElement('img');
  lbImg.style.cssText = `
    max-width: 90vw; max-height: 88vh; border-radius: 12px;
    box-shadow: 0 30px 80px rgba(0,0,0,0.5);
    animation: scaleIn 0.3s ease forwards;
  `;
  lb.appendChild(lbImg);
  document.body.appendChild(lb);

  items.forEach(img => {
    img.parentElement.style.cursor = 'zoom-in';
    img.parentElement.addEventListener('click', () => {
      lbImg.src = img.src;
      lb.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  lb.addEventListener('click', () => {
    lb.style.display = 'none';
    document.body.style.overflow = '';
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { lb.style.display = 'none'; document.body.style.overflow = ''; }
  });
})();


// ── FORM SUBMISSION (demo) ─────────────────────────
function submitForm(btn) {
  const original = btn.textContent;
  btn.textContent = 'Sending…';
  btn.style.opacity = '0.7';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = '✓ Reservation Sent!';
    btn.style.opacity = '1';
    btn.style.background = '#4CAF50';

    // Reset form inputs
    btn.closest('.contact__form').querySelectorAll('input, textarea, select').forEach(el => {
      el.value = '';
    });

    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }, 1500);
}


// ── ACTIVE NAV LINK HIGHLIGHT ──────────────────────
(function initActiveLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.style.color = '');
        const active = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
        if (active) active.style.color = 'var(--gold)';
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => observer.observe(s));
})();
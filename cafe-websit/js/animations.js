/* ═══════════════════════════════════════════════════
   ANIMATIONS.JS — Canvas Steam, Particles, Scroll Reveals, Counter
   ═══════════════════════════════════════════════════ */

// ── PAGE LOAD OVERLAY ──────────────────────────────
(function createLoader() {
  const overlay = document.createElement('div');
  overlay.className = 'page-load-overlay';
  overlay.id = 'pageLoader';
  overlay.innerHTML = `
    <div class="loader-cup">☕</div>
    <div class="loader-text">Brewing your experience…</div>
    <div class="loader-bar"><div class="loader-bar-fill"></div></div>
  `;
  document.body.prepend(overlay);

  window.addEventListener('load', () => {
    setTimeout(() => {
      overlay.classList.add('exit');
      setTimeout(() => overlay.remove(), 700);
    }, 1800);
  });
})();


// ── STEAM CANVAS ANIMATION ─────────────────────────
(function initSteam() {
  const canvas = document.getElementById('steamCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class SteamParticle {
    constructor() { this.reset(); }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + 20;
      this.radius = Math.random() * 40 + 20;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = -(Math.random() * 1.2 + 0.4);
      this.opacity = 0;
      this.maxOpacity = Math.random() * 0.12 + 0.04;
      this.growing = true;
      this.life = 0;
      this.maxLife = Math.random() * 200 + 120;
      this.wander = Math.random() * Math.PI * 2;
      this.wanderSpeed = (Math.random() - 0.5) * 0.03;
    }

    update() {
      this.life++;
      this.wander += this.wanderSpeed;
      this.x += this.vx + Math.sin(this.wander) * 0.3;
      this.y += this.vy;
      this.radius += 0.15;

      const progress = this.life / this.maxLife;
      if (progress < 0.2) {
        this.opacity = (progress / 0.2) * this.maxOpacity;
      } else if (progress > 0.7) {
        this.opacity = ((1 - progress) / 0.3) * this.maxOpacity;
      } else {
        this.opacity = this.maxOpacity;
      }

      if (this.life >= this.maxLife) this.reset();
    }

    draw() {
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.radius
      );
      gradient.addColorStop(0, `rgba(201,168,76,${this.opacity})`);
      gradient.addColorStop(0.5, `rgba(245,237,214,${this.opacity * 0.5})`);
      gradient.addColorStop(1, 'rgba(201,168,76,0)');

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }

  const particles = Array.from({ length: 18 }, () => {
    const p = new SteamParticle();
    p.life = Math.floor(Math.random() * p.maxLife); // stagger start
    return p;
  });

  function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateCanvas);
  }
  animateCanvas();
})();


// ── FLOATING PARTICLES ─────────────────────────────
(function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const symbols = ['✦', '·', '◦', '⋆', '∘'];
  const count = 18;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.cssText = `
      position: absolute;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      font-size: ${Math.random() * 10 + 6}px;
      color: rgba(201,168,76,${Math.random() * 0.25 + 0.05});
      pointer-events: none;
      --drift: ${(Math.random() - 0.5) * 80}px;
      animation: particleDrift ${Math.random() * 12 + 8}s linear ${Math.random() * -15}s infinite;
    `;
    container.appendChild(el);
  }
})();


// ── SCROLL REVEAL (IntersectionObserver) ──────────
(function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.reveal-up, .reveal-fade, .reveal-left, .reveal-right, .reveal-scale, ' +
    '.menu-card, .stat-card, .exp-card, .testimonial-card, .feature, ' +
    '.contact__item, .gallery__item'
  );

  // Add reveal-up to cards that don't already have a reveal class
  targets.forEach(el => {
    const hasReveal = [...el.classList].some(c => c.startsWith('reveal-'));
    if (!hasReveal) {
      el.classList.add('reveal-up');
    }
  });

  const allReveal = document.querySelectorAll(
    '.reveal-up, .reveal-fade, .reveal-left, .reveal-right, .reveal-scale'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger children if parent has .stagger
        const parent = entry.target.parentElement;
        if (parent && parent.classList.contains('stagger')) {
          const siblings = [...parent.children];
          const idx = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${idx * 0.1}s`;
        }
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  allReveal.forEach(el => observer.observe(el));

  // Also observe cards
  const cards = document.querySelectorAll(
    '.menu-card:not(.hidden), .stat-card, .exp-card, .testimonial-card, .feature, .contact__item, .gallery__item'
  );
  cards.forEach((el, i) => {
    if (!el.classList.contains('reveal-up')) {
      el.classList.add('reveal-up');
      el.style.transitionDelay = `${(i % 4) * 0.08}s`;
      observer.observe(el);
    }
  });
})();


// ── ANIMATED COUNTERS ──────────────────────────────
(function initCounters() {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 1800;
      const startTime = performance.now();

      function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

      function tick(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutQuart(progress);
        const current = Math.round(eased * target);
        el.textContent = current.toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString() + (target === 100 ? '%' : target > 1000 ? '+' : '');
      }

      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    counterObserver.observe(el);
  });
})();
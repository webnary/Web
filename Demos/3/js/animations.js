// ============================================================
// ADAM REEVES COACH — animations.js
// Intersection Observer for scroll reveals + counter animations.
// All animations respect prefers-reduced-motion.
// ============================================================

'use strict';

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── SCROLL REVEAL ──
function initScrollReveal() {
  if (REDUCED_MOTION) {
    // Just make everything visible immediately
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  // Observe existing elements + re-observe after renderFromConfig adds dynamic els
  const observe = () => {
    document.querySelectorAll('.reveal:not(.revealed)').forEach(el => observer.observe(el));
  };

  observe();

  // Re-run after DOM renders (renderFromConfig runs async on DOMContentLoaded)
  setTimeout(observe, 100);
  setTimeout(observe, 400);
}

// ── COUNTER ANIMATION ──
function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const isDecimal = el.dataset.decimal === '1';
  const duration = REDUCED_MOTION ? 0 : 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutQuart(progress);
    const current = eased * target;

    el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = prefix + (isDecimal ? target.toFixed(1) : target) + suffix;
    }
  }

  if (duration === 0) {
    el.textContent = prefix + (isDecimal ? target.toFixed(1) : target) + suffix;
  } else {
    requestAnimationFrame(update);
  }
}

function initCounters() {
  const counters = document.querySelectorAll('.counter-value');
  if (!counters.length) {
    // Counters may not be in DOM yet — retry after render
    setTimeout(initCounters, 300);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

// ── NAV ACTIVE STATE on scroll ──
function initNavActiveState() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#nav-links a');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'nav-link--active',
            link.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => observer.observe(section));
}

// ── STAGGERED CHILD REVEAL ──
// Adds incremental delays to sibling .reveal elements in a container
function initStaggeredReveal() {
  if (REDUCED_MOTION) return;

  const staggerContainers = document.querySelectorAll('[data-stagger]');
  staggerContainers.forEach(container => {
    const children = container.querySelectorAll('.reveal');
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * 100}ms`;
    });
  });
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initStaggeredReveal();

  // Counters and nav depend on renderFromConfig having run
  setTimeout(() => {
    initCounters();
    initNavActiveState();
  }, 150);
});

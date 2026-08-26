// ============================================================
// Corner Coffee Shop — ANIMATIONS.JS
// Scroll reveals, intersection observer, motion preferences
// ============================================================

(function initAnimations() {

  // Respect prefers-reduced-motion
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ─── Scroll Reveal ───────────────────────────────────────────
  function initScrollReveal() {
    if (prefersReduced) {
      // Still need to make elements visible
      document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right").forEach(el => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -60px 0px"
    });

    document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right").forEach(el => {
      observer.observe(el);
    });
  }

  // ─── Active Nav Link on Scroll ───────────────────────────────
  function initActiveNav() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    if (!sections.length || !navLinks.length) return;

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(a => {
            a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`);
          });
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(s => sectionObserver.observe(s));
  }

  // ─── Hero word stagger animation ─────────────────────────────
  function initHeroAnimation() {
    if (prefersReduced) return;
    const words = document.querySelectorAll(".hero-word");
    words.forEach((word, i) => {
      word.style.animationDelay = `${0.3 + i * 0.15}s`;
      word.classList.add("will-animate");
    });
  }

  // ─── Sticky nav progress ─────────────────────────────────────
  function initScrollProgress() {
    const bar = document.querySelector(".scroll-progress");
    if (!bar) return;
    window.addEventListener("scroll", () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const pct = (window.scrollY / total) * 100;
      bar.style.width = `${pct}%`;
    }, { passive: true });
  }

  // ─── Parallax on hero ────────────────────────────────────────
  function initHeroParallax() {
    if (prefersReduced) return;
    const bgText = document.querySelector(".hero-bg-text");
    if (!bgText) return;
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        bgText.style.transform = `translateY(${y * 0.3}px)`;
      }
    }, { passive: true });
  }

  // ─── Counter animation for stats ─────────────────────────────
  function initStatCounters() {
    if (prefersReduced) return;
    const stats = document.querySelectorAll(".stat-num");
    if (!stats.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.textContent, 10);
        if (isNaN(target)) return;
        let current = 0;
        const step = target > 10 ? Math.ceil(target / 20) : 1;
        const interval = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current;
          if (current >= target) clearInterval(interval);
        }, 50);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    stats.forEach(s => observer.observe(s));
  }

  // ─── Gallery bento hover effects ─────────────────────────────
  function initBentoHover() {
    if (prefersReduced) return;
    // Handled via CSS, just ensure items are keyboard accessible
    document.querySelectorAll(".bento-item").forEach(item => {
      item.addEventListener("focus", () => item.classList.add("is-focused"));
      item.addEventListener("blur", () => item.classList.remove("is-focused"));
    });
  }

  // ─── Smooth scroll for anchor links ──────────────────────────
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener("click", (e) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        const navHeight = document.querySelector(".site-nav")?.offsetHeight || 70;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: prefersReduced ? "auto" : "smooth" });
      });
    });
  }

  // ─── Boot all ────────────────────────────────────────────────
  // Run after main.js has rendered content
  document.addEventListener("DOMContentLoaded", () => {
    // Short delay to let DOM render
    requestAnimationFrame(() => {
      initScrollReveal();
      initActiveNav();
      initHeroAnimation();
      initScrollProgress();
      initHeroParallax();
      initStatCounters();
      initBentoHover();
      initSmoothScroll();
    });
  });

})();

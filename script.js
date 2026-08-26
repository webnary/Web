/* ==========================================================
   Webnary Studio — site scripts
   Extracted from inline <script> blocks in index.html, plus a
   small addition (mobile nav toggle) documented below.
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Lucide icons ---------- */
  // Initialize Lucide Icons
  lucide.createIcons();

  /* ---------- Scroll-reveal animation ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ---------- Segmented WhatsApp picker ----------
     Opens a small menu of pre-filled intents instead of sending
     everyone the same generic message. */
  function closeAllPickers(except) {
    document.querySelectorAll('.wa-picker.open').forEach(p => {
      if (p === except) return;
      p.classList.remove('open');
      const t = p.querySelector('.wa-picker-trigger');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  }
  document.querySelectorAll('.wa-picker-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const picker = trigger.closest('.wa-picker');
      const isOpen = picker.classList.contains('open');
      closeAllPickers();
      if (!isOpen) {
        picker.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      } else {
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });
  document.addEventListener('click', () => closeAllPickers());
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAllPickers(); });

  /* ---------- "Aperçus" carousel (position-class rotation) ---------- */
  const trackCards = Array.from(document.querySelectorAll('.carousel-card'));
  if (trackCards.length > 0) {
    // The 5 possible slots
    let classPositions = ['card-pos-0', 'card-pos-1', 'card-pos-2', 'card-pos-3', 'card-pos-4'];
    let carouselTimer = null;

    function moveCarouselNext() {
      // Move the last slot to the front to shift everything right
      classPositions.unshift(classPositions.pop());
      // Re-apply the slot classes to each card (CSS handles the animation)
      trackCards.forEach((card, index) => {
        card.className = `carousel-card ${classPositions[index]}`;
      });
    }

    function startCarousel() {
      if (carouselTimer) return; // already running
      carouselTimer = setInterval(moveCarouselNext, 3500);
    }
    function stopCarousel() {
      clearInterval(carouselTimer);
      carouselTimer = null;
    }

    // Auto-advance every 3.5s
    startCarousel();

    // Pause the rotation while the pointer is over any card, so the
    // hovered one can grow (see .card-pos-*:hover in styles.css)
    // without the layout shifting under the cursor. Resumes on leave.
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
      carouselTrack.addEventListener('mouseenter', stopCarousel);
      carouselTrack.addEventListener('mouseleave', startCarousel);
    }
  }

  /* ---------- Mobile nav toggle (new) ----------
     .nav-links has no visible trigger below the 860px breakpoint,
     so section anchors (#offres, #etapes, #avis, #faq) were
     unreachable from the header on phones. This wires up the
     hamburger button added in the header markup, reusing the same
     open/close + outside-click + Escape pattern as the WhatsApp
     picker above for consistency. */
  const navToggle = document.getElementById('navToggle');
  const navEl = document.querySelector('.nav');
  if (navToggle && navEl) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navEl.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    document.addEventListener('click', (e) => {
      if (!navEl.contains(e.target)) {
        navEl.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        navEl.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
    // Close the menu once a section link is tapped
    navEl.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navEl.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

});
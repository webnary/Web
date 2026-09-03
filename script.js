/* ==========================================================
   Webnary Studio — site scripts
   Extracted from inline <script> blocks in index.html, plus a
   small addition (mobile nav toggle) documented below.
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Non-blocking Google Fonts swap ----------
     index.html now loads the Google Fonts CSS as <link rel="preload"
     as="style"> instead of a blocking <link rel="stylesheet">, so it
     no longer holds up first paint. Flipping rel to "stylesheet" here
     applies it — this reuses the same request the preload already
     started (same URL, same browser cache entry), it doesn't trigger
     a second fetch. */
  document.querySelectorAll('link[rel="preload"][as="style"]').forEach(link => {
    link.rel = 'stylesheet';
  });

  /* ---------- Lucide icons ---------- */
  // Initialize Lucide Icons
  lucide.createIcons();

  /* ---------- Scroll-reveal animation ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ---------- "Aperçus" carousel (position-class rotation) ----------
     Was auto-rotate only: no arrows, no drag/swipe, no keyboard way
     to move it on demand. Added below: prev/next buttons, pointer
     drag (mouse + touch via Pointer Events), ArrowLeft/ArrowRight,
     and the expand button now actually opens the centered demo. */
  const trackCards = Array.from(document.querySelectorAll('.carousel-card'));
  if (trackCards.length > 0) {
    // The 5 possible slots
    let classPositions = ['card-pos-0', 'card-pos-1', 'card-pos-2', 'card-pos-3', 'card-pos-4'];
    let carouselTimer = null;

    function applyPositions() {
      trackCards.forEach((card, index) => {
        card.className = `carousel-card ${classPositions[index]}`;
      });
    }

    function moveCarouselNext() {
      // Move the last slot to the front to shift everything right
      classPositions.unshift(classPositions.pop());
      applyPositions();
    }

    function moveCarouselPrev() {
      // Mirror of moveCarouselNext: move the first slot to the back
      // to shift everything left.
      classPositions.push(classPositions.shift());
      applyPositions();
    }

    function startCarousel() {
      if (carouselTimer) return; // already running
      carouselTimer = setInterval(moveCarouselNext, 3500);
    }
    function stopCarousel() {
      clearInterval(carouselTimer);
      carouselTimer = null;
    }
    // Used after a manual prev/next/drag so auto-rotate doesn't fire
    // right on top of what the visitor just did.
    function restartCarousel() {
      stopCarousel();
      startCarousel();
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

    // ---- Prev / next buttons ----
    const prevBtn = document.querySelector('.carousel-nav-prev');
    const nextBtn = document.querySelector('.carousel-nav-next');
    if (prevBtn) prevBtn.addEventListener('click', () => { moveCarouselPrev(); restartCarousel(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { moveCarouselNext(); restartCarousel(); });

    // ---- Keyboard: ArrowLeft/ArrowRight while the track is focused ----
    if (carouselTrack) {
      carouselTrack.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); moveCarouselPrev(); restartCarousel(); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); moveCarouselNext(); restartCarousel(); }
      });
    }

    // ---- Drag / swipe (mouse + touch, via Pointer Events) ----
    if (carouselTrack) {
      let dragging = false;
      let dragged = false; // true once movement passes the click threshold
      let startX = 0;

      carouselTrack.addEventListener('pointerdown', (e) => {
        // Drag-to-swipe is now touch/pen only. On mouse, this whole
        // block was fighting with plain link clicks (see the pointerup
        // comment below) — simplest fix is to just not engage the
        // custom drag machinery for mouse input at all. Mouse users
        // get native clicks + the prev/next buttons + arrow keys;
        // touch users keep the swipe gesture.
        if (e.pointerType === 'mouse') return;
        dragging = true;
        dragged = false;
        startX = e.clientX;
        stopCarousel();
        carouselTrack.setPointerCapture(e.pointerId);
      });

      carouselTrack.addEventListener('pointerup', (e) => {
        if (!dragging) return;
        dragging = false;
        // Previously flipped `dragged` true on any single pointermove sample
        // past 6px and never reset it — so ordinary mouse hand-tremor during
        // a click (frequent, granular pointermove reports) permanently
        // marked the gesture as a drag even if the cursor settled back near
        // the start before release, silently killing the click. Net
        // displacement is judged once, here, at pointerup, instead.
        const delta = e.clientX - startX;
        const SWIPE_THRESHOLD = 40;   // px before it counts as an intentional swipe
        const CLICK_THRESHOLD = 10;   // px of net movement before a click gets suppressed
        dragged = Math.abs(delta) > CLICK_THRESHOLD;
        if (delta > SWIPE_THRESHOLD) moveCarouselPrev();      // dragged right -> show previous
        else if (delta < -SWIPE_THRESHOLD) moveCarouselNext(); // dragged left -> show next
        restartCarousel();
      });

      carouselTrack.addEventListener('pointercancel', () => { dragging = false; restartCarousel(); });

      // Images are draggable by default in every browser. On desktop,
      // a mouse click almost always has a tiny bit of movement, which
      // was triggering the browser's native "drag this image" gesture
      // instead of a click — and a native drag silently swallows the
      // click event that follows, so the demo link never opened.
      // Blocking dragstart on the track fixes this without touching
      // the custom pointer-based swipe logic above.
      carouselTrack.addEventListener('dragstart', (e) => { e.preventDefault(); });

      // A drag ending on top of a card link would otherwise trigger
      // navigation to that demo. Swallow the click only when the
      // pointer actually moved past the threshold.
      carouselTrack.addEventListener('click', (e) => {
        if (dragged) {
          e.preventDefault();
          e.stopPropagation();
          dragged = false;
        }
      }, true);
    }

    // ---- Expand button: open the currently centered demo ----
    // Was a bare, unwired <div> before; now a real <button> (see
    // index.html) that resolves whichever card is in the "active"
    // center slot (card-pos-2) and follows its link.
    const expandBtn = document.querySelector('.expand-btn');
    if (expandBtn) {
      expandBtn.addEventListener('click', () => {
        const centerCard = document.querySelector('.carousel-card.card-pos-2 .carousel-card-link');
        if (centerCard && centerCard.href) {
          window.location.href = centerCard.href;
        }
      });
    }
  }

  /* ---------- Mobile nav toggle ----------
     .nav-links has no visible trigger below the 860px breakpoint,
     so section anchors (#etapes, #avis, #faq) were unreachable
     from the header on phones. This wires up the hamburger button
     added in the header markup: open/close + outside-click +
     Escape, same as any dropdown. */
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
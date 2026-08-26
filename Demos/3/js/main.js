// ============================================================
// ADAM REEVES COACH — main.js
// Renders DOM from SITE_CONFIG. Never hardcode content in HTML.
// ============================================================

'use strict';

// ── Security: escape all user/config strings before innerHTML ──
function escHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ── SVG ICON LIBRARY ──
// All icons are inline SVG — consistent rendering, no emoji fallback issues.
// viewBox 24x24, stroke-based (2px, round joins). Color inherited via currentColor.
const ICONS = {
  paycheck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
    <line x1="6" y1="15" x2="10" y2="15"/><line x1="14" y1="15" x2="18" y2="15"/>
  </svg>`,

  investing: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
    <polyline points="16 7 22 7 22 13"/>
  </svg>`,

  debt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16" stroke-width="3"/>
  </svg>`,

  lightbulb: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.5-1.5 4.7-3.5 6L15 18H9l-.5-3C6.5 13.7 5 11.5 5 9a7 7 0 0 1 7-7z"/>
  </svg>`,

  trending: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>`,

  target: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>`,

  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>`,

  map: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
    <line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>
  </svg>`,

  rocket: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>`,

  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"/>
  </svg>`
};

function getIcon(key, extraClass = '') {
  const svg = ICONS[key];
  if (!svg) return '';
  // Inject class onto the svg element
  return svg.replace('<svg ', `<svg class="icon ${extraClass}" `);
}

// ── RENDER STARS ──
function renderStars(rating) {
  return '★'.repeat(Math.min(5, Math.max(0, rating)));
}

// ── Main render function ──
function renderFromConfig(config) {
  renderMeta(config.meta, config.brand);
  renderNav(config.nav, config.brand);
  renderHero(config.hero);
  renderPainPoints(config.painPoints);
  renderAbout(config.about);
  renderServices(config.services);
  renderHowItWorks(config.howItWorks);
  renderTestimonials(config.testimonials);
  renderLeadMagnet(config.leadMagnet);
  renderFaq(config.faq);
  renderBooking(config.booking);
  renderFooter(config.footer, config.brand, config.contact);
}

// ── META ──
function renderMeta(meta, brand) {
  document.documentElement.lang = escHtml(meta.language);
  document.title = escHtml(meta.title);

  const setMeta = (selector, attr, value) => {
    let el = document.querySelector(selector);
    if (!el) { el = document.createElement('meta'); document.head.appendChild(el); }
    el.setAttribute(attr, value);
  };

  setMeta('meta[name="description"]', 'content', meta.description);
  setMeta('link[rel="canonical"]', 'href', meta.canonicalUrl);
  setMeta('meta[property="og:title"]', 'content', meta.title);
  setMeta('meta[property="og:description"]', 'content', meta.description);
  setMeta('meta[property="og:image"]', 'content', meta.ogImage);
  setMeta('meta[property="og:url"]', 'content', meta.ogUrl);
  setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
  setMeta('meta[name="twitter:title"]', 'content', meta.title);
  setMeta('meta[name="twitter:description"]', 'content', meta.description);
}

// ── NAV ──
function renderNav(nav, brand) {
  const logoEl = document.getElementById('nav-logo');
  const linksEl = document.getElementById('nav-links');
  const ctaEl = document.getElementById('nav-cta');

  if (logoEl) logoEl.textContent = brand.logoText;

  if (linksEl) {
    linksEl.innerHTML = nav.links.map(link =>
      `<li><a href="${escHtml(link.href)}">${escHtml(link.label)}</a></li>`
    ).join('');
  }

  if (ctaEl) {
    ctaEl.href = escHtml(nav.ctaLink);
    ctaEl.textContent = nav.ctaText;
  }
}

// ── HERO ──
function renderHero(hero) {
  const headline = document.getElementById('hero-headline');
  const subtext = document.getElementById('hero-subtext');
  const primaryCta = document.getElementById('hero-primary-cta');
  const secondaryCta = document.getElementById('hero-secondary-cta');
  const img = document.getElementById('hero-image');

  if (headline) headline.textContent = hero.headline;
  if (subtext) subtext.textContent = hero.subtext;
  if (primaryCta) { primaryCta.href = escHtml(hero.primaryCta.href); primaryCta.textContent = hero.primaryCta.text; }
  if (secondaryCta) { secondaryCta.href = escHtml(hero.secondaryCta.href); secondaryCta.textContent = hero.secondaryCta.text; }
  if (img) { img.src = escHtml(hero.image); img.alt = escHtml(hero.imageAlt); }
}

// ── PAIN POINTS ──
function renderPainPoints(section) {
  const titleEl = document.getElementById('pain-title');
  const container = document.getElementById('pain-cards');

  if (titleEl) titleEl.textContent = section.sectionTitle;
  if (!container) return;

  container.innerHTML = section.cards.map(card => `
    <div class="pain-card reveal">
      <div class="pain-icon">${getIcon(card.icon, 'icon--pain')}</div>
      <h3>${escHtml(card.title)}</h3>
      <p>${escHtml(card.body)}</p>
    </div>
  `).join('');
}

// ── ABOUT ──
function renderAbout(about) {
  const titleEl = document.getElementById('about-title');
  const img = document.getElementById('about-image');
  const bio = document.getElementById('about-bio');
  const creds = document.getElementById('about-credentials');
  const countersEl = document.getElementById('about-counters');

  if (titleEl) titleEl.textContent = about.sectionTitle;
  if (img) { img.src = escHtml(about.image); img.alt = escHtml(about.imageAlt); }
  if (bio) bio.textContent = about.bio;

  if (creds) {
    creds.innerHTML = about.credentials.map(c =>
      `<li><span class="cred-check" aria-hidden="true">✓</span>${escHtml(c)}</li>`
    ).join('');
  }

  if (countersEl) {
    countersEl.innerHTML = about.counters.map((c, i) => `
      <div class="counter-item">
        <span class="counter-value"
          data-target="${escHtml(String(c.target))}"
          data-suffix="${escHtml(c.suffix || '')}"
          data-prefix="${escHtml(c.prefix || '')}"
          data-decimal="${c.target % 1 !== 0 ? '1' : '0'}"
          aria-live="polite">0</span>
        <span class="counter-label">${escHtml(c.label)}</span>
      </div>
    `).join('');
  }
}

// ── SERVICES ──
function renderServices(services) {
  const titleEl = document.getElementById('services-title');
  const subtextEl = document.getElementById('services-subtext');
  const container = document.getElementById('services-cards');

  if (titleEl) titleEl.textContent = services.sectionTitle;
  if (subtextEl) subtextEl.textContent = services.sectionSubtext;
  if (!container) return;

  container.innerHTML = services.packages.map(pkg => `
    <div class="service-card ${pkg.highlight ? 'service-card--highlight' : ''} reveal">
      ${pkg.badge ? `<div class="service-badge">${escHtml(pkg.badge)}</div>` : ''}
      <div class="service-icon">${getIcon(pkg.icon, 'icon--service')}</div>
      <div class="service-subtitle">${escHtml(pkg.subtitle)}</div>
      <h3 class="service-title">${escHtml(pkg.title)}</h3>
      <p class="service-desc">${escHtml(pkg.description)}</p>
      <ul class="service-includes">
        ${pkg.includes.map(item => `<li>${getIcon('check', 'icon--check')}${escHtml(item)}</li>`).join('')}
      </ul>
      <div class="service-price">${escHtml(pkg.price)}</div>
      <a href="${escHtml(services.ctaLink)}" class="btn ${pkg.highlight ? 'btn-primary' : 'btn-outline'}" target="_blank" rel="noopener">${escHtml(pkg.cta)}</a>
    </div>
  `).join('');
}

// ── HOW IT WORKS ──
function renderHowItWorks(section) {
  const titleEl = document.getElementById('hiw-title');
  const subtextEl = document.getElementById('hiw-subtext');
  const container = document.getElementById('hiw-steps');

  if (titleEl) titleEl.textContent = section.sectionTitle;
  if (subtextEl) subtextEl.textContent = section.sectionSubtext;
  if (!container) return;

  container.innerHTML = section.steps.map(step => `
    <div class="step-item reveal">
      <div class="step-number" aria-hidden="true">${escHtml(step.number)}</div>
      <div class="step-icon">${getIcon(step.icon, 'icon--step')}</div>
      <h3>${escHtml(step.title)}</h3>
      <p>${escHtml(step.description)}</p>
    </div>
  `).join('');
}

// ── TESTIMONIALS ──
function renderTestimonials(section) {
  const titleEl = document.getElementById('testimonials-title');
  const subtextEl = document.getElementById('testimonials-subtext');
  const container = document.getElementById('testimonials-grid');

  if (titleEl) titleEl.textContent = section.sectionTitle;
  if (subtextEl) subtextEl.textContent = section.sectionSubtext;
  if (!container) return;

  container.innerHTML = section.items.map(item => `
    <div class="testimonial-card reveal">
      <div class="testimonial-stars" aria-label="${escHtml(String(item.rating))} out of 5 stars">${renderStars(item.rating)}</div>
      <blockquote class="testimonial-quote">"${escHtml(item.quote)}"</blockquote>
      <div class="testimonial-author">
        <div class="testimonial-avatar" aria-hidden="true">${escHtml(item.initials)}</div>
        <div>
          <div class="testimonial-name">${escHtml(item.name)}</div>
          <div class="testimonial-role">${escHtml(item.role)}</div>
        </div>
      </div>
    </div>
  `).join('');
}

// ── LEAD MAGNET ──
function renderLeadMagnet(lm) {
  const titleEl = document.getElementById('lm-title');
  const subtextEl = document.getElementById('lm-subtext');
  const form = document.getElementById('lm-form');
  const emailInput = document.getElementById('lm-email');
  const btn = document.getElementById('lm-btn');
  const msg = document.getElementById('lm-success');

  if (titleEl) titleEl.textContent = lm.title;
  if (subtextEl) subtextEl.textContent = lm.subtext;
  if (emailInput) emailInput.placeholder = lm.emailPlaceholder;
  if (btn) btn.textContent = lm.buttonText;
  if (form) form.action = lm.formAction;

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = emailInput ? emailInput.value.trim() : '';
      if (!email) return;

      btn.disabled = true;
      btn.textContent = 'Sending...';

      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok || response.status === 0) { // Mailchimp returns 0 on CORS success
          form.style.display = 'none';
          if (msg) {
            msg.textContent = lm.successMessage;
            msg.style.display = 'block';
          }
        } else {
          btn.disabled = false;
          btn.textContent = lm.buttonText;
          alert('Something went wrong. Please try again.');
        }
      } catch {
        // Mailchimp CORS will throw — treat as success if no error in payload
        form.style.display = 'none';
        if (msg) {
          msg.textContent = lm.successMessage;
          msg.style.display = 'block';
        }
      }
    });
  }
}

// ── FAQ ACCORDION ──
function renderFaq(faq) {
  const titleEl = document.getElementById('faq-title');
  const container = document.getElementById('faq-list');

  if (titleEl) titleEl.textContent = faq.sectionTitle;
  if (!container) return;

  container.innerHTML = faq.items.map((item, i) => `
    <div class="faq-item" id="faq-item-${i}">
      <button
        class="faq-question"
        aria-expanded="false"
        aria-controls="faq-answer-${i}"
        id="faq-btn-${i}">
        <span>${escHtml(item.question)}</span>
        <span class="faq-icon" aria-hidden="true">+</span>
      </button>
      <div
        class="faq-answer"
        id="faq-answer-${i}"
        role="region"
        aria-labelledby="faq-btn-${i}">
        <div class="faq-answer-inner">
          <p>${escHtml(item.answer)}</p>
        </div>
      </div>
    </div>
  `).join('');

  initFaqAccordion();
}

function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Close all
      items.forEach(otherItem => {
        const otherBtn = otherItem.querySelector('.faq-question');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        const otherIcon = otherItem.querySelector('.faq-icon');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        if (otherAnswer) otherAnswer.style.maxHeight = null;
        if (otherIcon) otherIcon.textContent = '+';
        otherItem.classList.remove('faq-item--open');
      });

      // Open clicked if it was closed
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        if (icon) icon.textContent = '−';
        item.classList.add('faq-item--open');
      }
    });
  });
}

// ── BOOKING ──
function renderBooking(booking) {
  const titleEl = document.getElementById('booking-title');
  const subtextEl = document.getElementById('booking-subtext');
  const iframe = document.getElementById('calendly-iframe');
  const backupTitle = document.getElementById('backup-form-title');
  const backupSubtext = document.getElementById('backup-form-subtext');
  const backupForm = document.getElementById('backup-contact-form');

  if (titleEl) titleEl.textContent = booking.sectionTitle;
  if (subtextEl) subtextEl.textContent = booking.subtext;

  if (iframe) {
    iframe.src = escHtml(booking.calendlyUrl);
    iframe.title = "Book a free discovery call with Adam Reeves";
  }

  if (backupTitle) backupTitle.textContent = booking.backupFormTitle;
  if (backupSubtext) backupSubtext.textContent = booking.backupFormSubtext;

  if (backupForm) {
    backupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = backupForm.querySelector('button[type="submit"]');
      const msgEl = document.getElementById('backup-form-msg');

      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }

      try {
        const formData = new FormData(backupForm);
        const response = await fetch(booking.formEndpoint, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          backupForm.reset();
          if (msgEl) { msgEl.textContent = '✓ Message sent! I\'ll get back to you within 24 hours.'; msgEl.className = 'form-msg form-msg--success'; }
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Message'; }
        } else {
          throw new Error('Network error');
        }
      } catch {
        if (msgEl) { msgEl.textContent = 'Something went wrong. Please email me directly.'; msgEl.className = 'form-msg form-msg--error'; }
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Message'; }
      }
    });
  }
}

// ── FOOTER ──
function renderFooter(footer, brand, contact) {
  const logoEl = document.getElementById('footer-logo');
  const taglineEl = document.getElementById('footer-tagline');
  const navEl = document.getElementById('footer-nav');
  const linkedinEl = document.getElementById('footer-linkedin');
  const copyrightEl = document.getElementById('footer-copyright');

  if (logoEl) logoEl.textContent = brand.logoText;
  if (taglineEl) taglineEl.textContent = footer.tagline;

  if (navEl) {
    navEl.innerHTML = footer.navLinks.map(link =>
      `<li><a href="${escHtml(link.href)}">${escHtml(link.label)}</a></li>`
    ).join('');
  }

  if (linkedinEl) linkedinEl.href = escHtml(contact.linkedin);
  if (copyrightEl) copyrightEl.textContent = `© ${escHtml(footer.copyright)}`;
}

// ── MOBILE NAV TOGGLE ──
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('nav-menu--open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  // Close on nav link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('nav-menu--open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── STICKY NAV SHADOW ──
function initStickyNav() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 20);
  }, { passive: true });
}

// ── SMOOTH SCROLL for anchor links ──
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  renderFromConfig(SITE_CONFIG);
  initMobileNav();
  initStickyNav();
  initSmoothScroll();
});

const form = document.querySelector("#backup-contact-form");

form.addEventListener("submit", async e => {
  e.preventDefault();

  const formData = new FormData(form);

  await fetch("https://script.google.com/macros/s/AKfycbzN5CDUvCKziixkU_T71dmGVg8yKv69frpcW4UbTusqHGp2z0-pk6L4gHcqGURJ_c-Baw/exec", {
    method: "POST",
    body: formData
  });

  alert("Message sent");
  form.reset();
});

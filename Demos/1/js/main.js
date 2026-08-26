// ============================================================
// Corner Coffee Shop — MAIN.JS
// renderFromConfig() orchestrates all section builds
// ============================================================

// ─── Security ────────────────────────────────────────────────
const escHtml = (str) => {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// ─── Stars Helper ─────────────────────────────────────────────
const renderStars = (count) => "★".repeat(count);

// ─── Main Render ──────────────────────────────────────────────
function renderFromConfig() {
  buildNav();
  buildHero();
  buildTicker();
  buildAbout();
  buildMenu();
  buildProcess();
  buildGallery();
  buildHours();
  buildTestimonials();
  buildContact();
  buildFooter();
  buildWhatsAppFloat();
}

// ─── NAV ──────────────────────────────────────────────────────
function buildNav() {
  const nav = document.getElementById("main-nav");
  if (!nav) return;
  nav.innerHTML = `
    <a href="#" class="nav-logo" aria-label="Home">${escHtml(SITE_CONFIG.brand.name)}</a>
    <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav-links" role="list">
      <li><a href="#about">About</a></li>
      <li><a href="#menu">Menu</a></li>
      <li><a href="#gallery">Gallery</a></li>
      <li><a href="#hours">Hours</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <a href="${escHtml(SITE_CONFIG.brand.whatsapp)}" class="nav-cta" target="_blank" rel="noopener">Order Now</a>
  `;

  // Toggle mobile menu
  const toggle = nav.querySelector(".nav-toggle");
  const links = nav.querySelector(".nav-links");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", !open);
    links.classList.toggle("is-open");
    toggle.classList.toggle("is-open");
  });

  // Sticky on scroll
  window.addEventListener("scroll", () => {
    document.querySelector(".site-nav").classList.toggle("is-scrolled", window.scrollY > 80);
  }, { passive: true });

  // Close on link click (mobile)
  links.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.classList.remove("is-open");
    });
  });
}

// ─── HERO ─────────────────────────────────────────────────────
function buildHero() {
  const el = document.getElementById("hero");
  if (!el) return;
  const { eyebrow, headline, subline, cta1, cta2 } = SITE_CONFIG.hero;

  el.innerHTML = `
    <div class="hero-bg-text" aria-hidden="true">COFFEE</div>
    <div class="hero-content">
      <p class="hero-eyebrow">${escHtml(eyebrow)}</p>
      <h1 class="hero-headline" aria-label="${headline.join(" ")}">
        ${headline.map((w, i) => `<span class="hero-word" style="--i:${i}">${escHtml(w)}</span>`).join("")}
      </h1>
      <p class="hero-sub">${escHtml(subline)}</p>
      <div class="hero-ctas">
        <a href="${escHtml(cta1.href)}" class="btn btn-fill">${escHtml(cta1.text)}</a>
        <a href="${escHtml(cta2.href)}" class="btn btn-outline">${escHtml(cta2.text)}</a>
      </div>
    </div>
    <div class="hero-scroll-hint" aria-hidden="true">
      <span>Scroll</span>
      <div class="hero-scroll-line"></div>
    </div>
  `;
}

// ─── TICKER ───────────────────────────────────────────────────
function buildTicker() {
  const el = document.getElementById("ticker");
  if (!el) return;
  const items = SITE_CONFIG.ticker.items;
  // Duplicate for seamless loop
  const tickerHtml = [...items, ...items, ...items]
    .map(item => `<span class="ticker-item">${escHtml(item)}</span>`)
    .join('<span class="ticker-sep" aria-hidden="true">·</span>');

  el.innerHTML = `
    <div class="ticker-track" aria-label="Ticker: ${items.join(', ')}">
      <div class="ticker-inner" aria-hidden="true">${tickerHtml}</div>
      <div class="ticker-inner" aria-hidden="true">${tickerHtml}</div>
    </div>
  `;
}

// ─── ABOUT ────────────────────────────────────────────────────
function buildAbout() {
  const el = document.getElementById("about");
  if (!el) return;
  const { sectionNum, title, body, stats, badge, photo } = SITE_CONFIG.about;

  el.innerHTML = `
    <div class="about-left reveal-left">
      <span class="section-num" aria-hidden="true">${escHtml(sectionNum)}</span>
      <h2 class="section-title">${escHtml(title).replace("\n", "<br>")}</h2>
      <div class="about-body">
        ${body.map(p => `<p>${escHtml(p)}</p>`).join("")}
      </div>
      <div class="about-stats">
        ${stats.map(s => `
          <div class="stat-block">
            <span class="stat-num">${escHtml(s.number)}</span>
            <span class="stat-label">${escHtml(s.label)}</span>
          </div>
        `).join("")}
      </div>
    </div>
    <div class="about-right reveal-right">
      <img 
        src="${escHtml(photo)}" 
        alt="Atmospheric coffee shop interior" 
        class="about-photo"
        loading="lazy"
      />
      <div class="about-badge" aria-label="${escHtml(badge)}">${escHtml(badge).replace("\n", "<br>")}</div>
    </div>
  `;
}

// ─── MENU ─────────────────────────────────────────────────────
function buildMenu() {
  const el = document.getElementById("menu");
  if (!el) return;
  const { sectionNum, title, categories } = SITE_CONFIG.menu;
  const firstCat = categories[0].id;

  const sidebarItems = categories
    .map(cat => `<li><button class="menu-cat-btn ${cat.id === firstCat ? 'is-active' : ''}" data-cat="${escHtml(cat.id)}">${escHtml(cat.label)}</button></li>`)
    .join("");

  const panels = categories.map(cat => `
    <div class="menu-panel ${cat.id === firstCat ? 'is-active' : ''}" id="panel-${escHtml(cat.id)}" role="tabpanel" aria-labelledby="tab-${escHtml(cat.id)}">
      ${cat.items.map(item => `
        <div class="menu-row ${item.staffPick ? 'is-staff-pick' : ''}">
          <div class="menu-row-left">
            ${item.staffPick ? '<span class="staff-star" aria-label="Staff Pick">★</span>' : ''}
            <span class="menu-item-name">${escHtml(item.name)}</span>
          </div>
          <div class="menu-dots" aria-hidden="true"></div>
          <div class="menu-row-right">
            <span class="menu-item-desc">${escHtml(item.desc)}</span>
            <span class="menu-item-price">${escHtml(item.price)} MAD</span>
          </div>
        </div>
      `).join("")}
    </div>
  `).join("");

  // Mobile tabs
  const mobileTabs = categories
    .map(cat => `<button class="menu-tab ${cat.id === firstCat ? 'is-active' : ''}" data-cat="${escHtml(cat.id)}" role="tab" aria-selected="${cat.id === firstCat}" id="tab-${escHtml(cat.id)}">${escHtml(cat.label)}</button>`)
    .join("");

  el.innerHTML = `
    <div class="menu-header reveal-up">
      <span class="section-num">${escHtml(sectionNum)}</span>
      <h2 class="section-title">${escHtml(title)}</h2>
    </div>
    <div class="menu-mobile-tabs" role="tablist">${mobileTabs}</div>
    <div class="menu-layout">
      <aside class="menu-sidebar" aria-label="Menu categories">
        <ul role="tablist" class="menu-cat-list">${sidebarItems}</ul>
      </aside>
      <div class="menu-content">
        ${panels}
      </div>
    </div>
  `;

  // Tab switching logic (works for both sidebar and mobile tabs)
  el.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cat]");
    if (!btn) return;
    const cat = btn.dataset.cat;

    // Update all buttons
    el.querySelectorAll("[data-cat]").forEach(b => {
      b.classList.toggle("is-active", b.dataset.cat === cat);
      if (b.getAttribute("role") === "tab") b.setAttribute("aria-selected", b.dataset.cat === cat);
    });

    // Show correct panel
    el.querySelectorAll(".menu-panel").forEach(p => p.classList.toggle("is-active", p.id === `panel-${cat}`));
  });
}

// ─── PROCESS ──────────────────────────────────────────────────
function buildProcess() {
  const el = document.getElementById("process");
  if (!el) return;
  const { sectionNum, title, steps } = SITE_CONFIG.process;

  el.innerHTML = `
    <div class="process-header reveal-up">
      <span class="section-num">${escHtml(sectionNum)}</span>
      <h2 class="section-title">${escHtml(title)}</h2>
    </div>
    <div class="process-steps">
      ${steps.map((step, i) => `
        <div class="process-step reveal-up" style="--delay:${i * 0.15}s">
          <span class="process-num" aria-hidden="true">${escHtml(step.num)}</span>
          <h3 class="process-title">${escHtml(step.title)}</h3>
          ${step.lines.map(l => `<p>${escHtml(l)}</p>`).join("")}
          ${i < steps.length - 1 ? '<div class="process-connector" aria-hidden="true"></div>' : ''}
        </div>
      `).join("")}
    </div>
  `;
}

// ─── GALLERY ──────────────────────────────────────────────────
function buildGallery() {
  const el = document.getElementById("gallery");
  if (!el) return;
  const { sectionNum, title, photos } = SITE_CONFIG.gallery;

  el.innerHTML = `
    <div class="gallery-header reveal-up">
      <span class="section-num">${escHtml(sectionNum)}</span>
      <h2 class="section-title">${escHtml(title)}</h2>
    </div>
    <div class="gallery-bento">
      ${photos.map((photo, i) => `
        <div class="bento-item ${photo.tall ? 'bento-tall' : ''} ${photo.wide ? 'bento-wide' : ''} ${i === 0 ? 'bento-hero' : ''}" 
             data-index="${i}" 
             tabindex="0" 
             role="button" 
             aria-label="View ${escHtml(photo.label)} photo">
          <img src="${escHtml(photo.src)}" alt="${escHtml(photo.label)}" loading="lazy" />
          <div class="bento-overlay">
            <span class="bento-label">${escHtml(photo.label)}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
          </div>
        </div>
      `).join("")}
    </div>
    <div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" hidden>
      <div class="lightbox-backdrop"></div>
      <div class="lightbox-content">
        <button class="lightbox-close" aria-label="Close">&times;</button>
        <button class="lightbox-prev" aria-label="Previous photo">&#8592;</button>
        <img class="lightbox-img" src="" alt="" />
        <div class="lightbox-caption"></div>
        <button class="lightbox-next" aria-label="Next photo">&#8594;</button>
      </div>
    </div>
  `;

  // Lightbox logic
  const lightbox = el.querySelector("#lightbox");
  const lbImg = lightbox.querySelector(".lightbox-img");
  const lbCaption = lightbox.querySelector(".lightbox-caption");
  let currentIndex = 0;

  const openLightbox = (index) => {
    currentIndex = index;
    const photo = photos[currentIndex];
    lbImg.src = photo.src;
    lbImg.alt = photo.label;
    lbCaption.textContent = photo.label;
    lightbox.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
    lightbox.querySelector(".lightbox-close").focus();
  };

  const closeLightbox = () => {
    lightbox.setAttribute("hidden", "");
    document.body.style.overflow = "";
  };

  const prevPhoto = () => {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    openLightbox(currentIndex);
  };

  const nextPhoto = () => {
    currentIndex = (currentIndex + 1) % photos.length;
    openLightbox(currentIndex);
  };

  el.querySelectorAll(".bento-item").forEach(item => {
    item.addEventListener("click", () => openLightbox(parseInt(item.dataset.index)));
    item.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") openLightbox(parseInt(item.dataset.index)); });
  });

  lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  lightbox.querySelector(".lightbox-backdrop").addEventListener("click", closeLightbox);
  lightbox.querySelector(".lightbox-prev").addEventListener("click", prevPhoto);
  lightbox.querySelector(".lightbox-next").addEventListener("click", nextPhoto);

  document.addEventListener("keydown", (e) => {
    if (lightbox.hasAttribute("hidden")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") prevPhoto();
    if (e.key === "ArrowRight") nextPhoto();
  });

  // Touch swipe for lightbox
  let touchStartX = 0;
  lightbox.addEventListener("touchstart", e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  lightbox.addEventListener("touchend", e => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) diff > 0 ? nextPhoto() : prevPhoto();
  });
}

// ─── HOURS ────────────────────────────────────────────────────
function buildHours() {
  const el = document.getElementById("hours");
  if (!el) return;
  const { sectionNum, title, schedule } = SITE_CONFIG.hours;
  const { mapsEmbed, address, whatsapp } = SITE_CONFIG.brand;

  // Determine today
  const today = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date().getDay()];

  el.innerHTML = `
    <div class="hours-left reveal-left">
      <span class="section-num">${escHtml(sectionNum)}</span>
      <h2 class="section-title">${escHtml(title)}</h2>
      <div class="hours-list">
        ${schedule.map(row => `
          <div class="hours-row ${row.day === today ? 'is-today' : ''}">
            <span class="hours-day">${escHtml(row.day)}${row.day === today ? ' <em>(today)</em>' : ''}</span>
            <span class="hours-time">${escHtml(row.time)}</span>
          </div>
        `).join("")}
      </div>
    </div>
    <div class="hours-right reveal-right">
      <div class="map-frame">
        <iframe 
          src="${escHtml(mapsEmbed)}" 
          width="100%" 
          height="350" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade"
          title="Corner Coffee Shop location on Google Maps"
        ></iframe>
      </div>
      <div class="hours-address">
        <p class="address-text">${escHtml(address)}</p>
        <a href="${escHtml(whatsapp)}" target="_blank" rel="noopener" class="btn btn-fill whatsapp-cta">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp Us
        </a>
      </div>
    </div>
  `;
}

// ─── TESTIMONIALS ─────────────────────────────────────────────
function buildTestimonials() {
  const el = document.getElementById("testimonials");
  if (!el) return;
  const { sectionNum, title, reviews } = SITE_CONFIG.testimonials;

  el.innerHTML = `
    <div class="testimonials-header reveal-up">
      <span class="section-num">${escHtml(sectionNum)}</span>
      <h2 class="section-title">${escHtml(title)}</h2>
    </div>
    <div class="carousel-wrapper">
      <div class="carousel-track" id="testimonials-track">
        ${reviews.map((r, i) => `
          <div class="review-card" role="article">
            <span class="review-quote" aria-hidden="true">"</span>
            <p class="review-text">${escHtml(r.quote)}</p>
            <div class="review-meta">
              <span class="review-stars" aria-label="${r.stars} stars">${renderStars(r.stars)}</span>
              <span class="review-name">— ${escHtml(r.name)}</span>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
    <div class="carousel-dots" role="group" aria-label="Carousel navigation">
      ${reviews.map((_, i) => `<button class="dot ${i === 0 ? 'is-active' : ''}" data-index="${i}" aria-label="Go to review ${i + 1}"></button>`).join("")}
    </div>
  `;

  initCarousel(el, reviews.length);
}

function initCarousel(el, count) {
  const track = el.querySelector(".carousel-track");
  const dots = el.querySelectorAll(".dot");
  let current = 0;
  let autoplay;
  let isDragging = false;
  let startX = 0;

  const goTo = (index) => {
    current = (index + count) % count;
    const cardWidth = track.querySelector(".review-card").offsetWidth + 32; // gap
    track.style.transform = `translateX(-${current * cardWidth}px)`;
    dots.forEach((d, i) => d.classList.toggle("is-active", i === current));
  };

  const startAutoplay = () => {
    autoplay = setInterval(() => goTo(current + 1), 4000);
  };
  const stopAutoplay = () => clearInterval(autoplay);

  dots.forEach(dot => dot.addEventListener("click", () => {
    goTo(parseInt(dot.dataset.index));
    stopAutoplay(); startAutoplay();
  }));

  // Mouse drag
  track.addEventListener("mousedown", e => { isDragging = true; startX = e.clientX; stopAutoplay(); });
  document.addEventListener("mouseup", e => {
    if (!isDragging) return;
    isDragging = false;
    const diff = startX - e.clientX;
    if (Math.abs(diff) > 60) goTo(current + (diff > 0 ? 1 : -1));
    startAutoplay();
  });

  // Touch
  track.addEventListener("touchstart", e => { startX = e.touches[0].clientX; stopAutoplay(); }, { passive: true });
  track.addEventListener("touchend", e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
    startAutoplay();
  }, { passive: true });

  // Pause on hover
  track.addEventListener("mouseenter", stopAutoplay);
  track.addEventListener("mouseleave", startAutoplay);

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) startAutoplay();
}

// ─── CONTACT ──────────────────────────────────────────────────
function buildContact() {
  const el = document.getElementById("contact");
  if (!el) return;
  const { sectionNum, title, formFields } = SITE_CONFIG.contact;
  const { email, phone, whatsapp, whatsappNumber, instagram, facebook } = SITE_CONFIG.brand;

  const contactLinks = [
    { icon: "✉", label: "Email", value: email, href: `mailto:${email}` },
    { icon: "☎", label: "Phone", value: phone, href: `tel:${phone.replace(/\s/g,'')}` },
    { icon: "💬", label: "WhatsApp", value: whatsappNumber, href: whatsapp },
    { icon: "📸", label: "Instagram", value: "@cornerbrew", href: instagram },
    { icon: "f", label: "Facebook", value: "/cornerbrew", href: facebook },
  ];

  const formInputs = formFields.map(field => {
    if (field.type === "textarea") {
      return `
        <div class="form-group">
          <textarea name="${escHtml(field.name)}" id="field-${escHtml(field.name)}" 
            class="form-field" placeholder=" " rows="5" ${field.required ? 'required' : ''}></textarea>
          <label class="form-label" for="field-${escHtml(field.name)}">${escHtml(field.label)}</label>
        </div>
      `;
    }
    return `
      <div class="form-group">
        <input type="${escHtml(field.type)}" name="${escHtml(field.name)}" id="field-${escHtml(field.name)}" 
          class="form-field" placeholder=" " ${field.required ? 'required' : ''} />
        <label class="form-label" for="field-${escHtml(field.name)}">${escHtml(field.label)}</label>
      </div>
    `;
  }).join("");

  el.innerHTML = `
    <div class="contact-left reveal-left">
      <span class="section-num">${escHtml(sectionNum)}</span>
      <h2 class="section-title">${escHtml(title)}</h2>
      <div class="contact-links">
        ${contactLinks.map(link => `
          <a href="${escHtml(link.href)}" class="contact-link-row" target="${link.href.startsWith('http') ? '_blank' : '_self'}" rel="${link.href.startsWith('http') ? 'noopener' : ''}">
            <span class="contact-icon" aria-hidden="true">${link.icon}</span>
            <div class="contact-link-text">
              <span class="contact-link-label">${escHtml(link.label)}</span>
              <span class="contact-link-value">${escHtml(link.value)}</span>
            </div>
            <span class="contact-link-arrow" aria-hidden="true">→</span>
          </a>
        `).join("")}
      </div>
    </div>
    <div class="contact-right reveal-right">
      <form class="contact-form" id="contact-form" novalidate>
        ${formInputs}
        <button type="submit" class="btn btn-fill btn-full">Send Message</button>
        <p class="form-status" id="form-status" role="status" aria-live="polite"></p>
      </form>
    </div>
  `;

  initContactForm();
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = form.querySelector("button[type=submit]");
    btn.textContent = "Sending…";
    btn.disabled = true;
    status.textContent = "";

    const data = new FormData(form);

    try {
      await fetch(SITE_CONFIG.brand.googleSheetAction, {
        method: "POST",
        body: data,
        mode: "no-cors"
      });
      status.textContent = "✓ Message sent! We'll be in touch shortly.";
      status.className = "form-status is-success";
      form.reset();
    } catch (err) {
      status.textContent = "Something went wrong. Please try WhatsApp instead.";
      status.className = "form-status is-error";
    } finally {
      btn.textContent = "Send Message";
      btn.disabled = false;
    }
  });
}

// ─── FOOTER ───────────────────────────────────────────────────
function buildFooter() {
  const el = document.getElementById("site-footer");
  if (!el) return;
  const { links, copyright } = SITE_CONFIG.footer;
  const { name, tagline, instagram, facebook } = SITE_CONFIG.brand;

  el.innerHTML = `
    <div class="footer-main">
      <div class="footer-brand">
        <a href="#" class="footer-logo">${escHtml(name)}</a>
        <p class="footer-tagline">${escHtml(tagline)}</p>
      </div>
      <nav class="footer-links" aria-label="Footer navigation">
        ${links.map(l => `<a href="${escHtml(l.href)}">${escHtml(l.label)}</a>`).join("")}
      </nav>
      <div class="footer-socials">
        <a href="${escHtml(instagram)}" target="_blank" rel="noopener" aria-label="Instagram">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        </a>
        <a href="${escHtml(facebook)}" target="_blank" rel="noopener" aria-label="Facebook">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
        </a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>${escHtml(copyright)}</p>
    </div>
  `;
}

// ─── WHATSAPP FLOAT ───────────────────────────────────────────
function buildWhatsAppFloat() {
  const btn = document.getElementById("whatsapp-float");
  if (!btn) return;
  btn.href = SITE_CONFIG.brand.whatsapp;
}

// ─── BOOT ─────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", renderFromConfig);

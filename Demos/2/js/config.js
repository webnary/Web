/**
 * ============================================================
 *  SARA BENALI PHOTOGRAPHY — SITE CONFIG
 *  js/config.js
 * ============================================================
 *  This is the single source of truth for every piece of
 *  content on the site. To update text, prices, images, or
 *  contact info — change it HERE, nowhere else.
 *
 *  HOW IT WORKS:
 *  main.js calls renderFromConfig() on DOMContentLoaded,
 *  which walks this object and stamps each value into the DOM
 *  using data-config attributes on HTML elements.
 *
 *  EXAMPLE:
 *    Config:  photographer.name = "Sara Benali"
 *    HTML:    <span data-config="photographer.name"></span>
 *    Result:  <span>Sara Benali</span>
 * ============================================================
 */

const SiteConfig = {

    // ──────────────────────────────────────────────────────
    // PHOTOGRAPHER — identity, contact, social
    // ──────────────────────────────────────────────────────
    photographer: {
        name:          "Sara Benali",
        tagline:       "Wedding & Portrait Photography · Casablanca & Beyond",
        bio1:          "For over 8 years, I've had the privilege of documenting life's most precious moments through my lens. What started as a passion has grown into a career I deeply love — telling authentic stories through photography.",
        bio2:          "My approach is simple: I believe in capturing genuine emotions, not posed perfection. Whether it's the nervous excitement before a wedding ceremony, the quiet joy of a family gathering, or the confident energy of a corporate event, I'm there to preserve those fleeting moments that matter most.",
        bio3:          "Based in Morocco, I work with clients locally and internationally, bringing warmth, creativity, and professionalism to every project.",
        yearsExp:      "8+",
        location:      "Casablanca, Morocco",
        availability:  "Spring 2026",

        // ── Contact ──
        email:         "rabihsenhajianas03@gmail.com",
        whatsapp:      "212600000000",           // No + or spaces — used in wa.me links
        whatsappDisplay: "+212 600 000 000",     // Human-readable version
        instagram:     "sarabenali.photo",       // Without @
        facebook:      "sarabenaliphoto",

        // ── Stats ──
        stats: {
            weddings:  "200+",
            portraits: "500+",
            events:    "100+"
        },

        // ── About Image ──
        aboutImage: {
            src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&auto=format&fit=crop&q=80",
            srcset: [
                { url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=75", w: 400 },
                { url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&auto=format&fit=crop&q=80", w: 700 },
                { url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1000&auto=format&fit=crop&q=85", w: 1000 }
            ],
            alt: "Sara Benali, professional photographer, holding a camera",
            width: 700,
            height: 933
        }
    },

    // ──────────────────────────────────────────────────────
    // HERO
    // ──────────────────────────────────────────────────────
    hero: {
        eyebrow:   "Wedding & Portrait Photography · Casablanca & Beyond",
        titleLine1: "Your story,",
        titleLine2: "beautifully told",   // wrapped in <em> automatically
        tagline:   "Sara Benali — documenting love, family, and the moments between",
        ctaPrimary: "Book a Session",
        ctaSecondary: "View Portfolio",

        // ── Background image ──
        backgroundImage: "https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2022/08/image-0592.jpg"
    },

    // ──────────────────────────────────────────────────────
    // SERVICES
    // ──────────────────────────────────────────────────────
    services: [
        {
            id:       "wedding",
            index:    "01",
            name:     "Wedding Photography",
            tagline:  "Full-day storytelling — from veil to vows to dancing.",
            price:    "$2,500",
            featured: false,
            badge:    "",
            features: [
                "Pre-wedding consultation",
                "8–10 hours coverage",
                "300+ edited photos",
                "Private online gallery"
            ],
            previewImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=260&fit=crop&q=80"
        },
        {
            id:       "portrait",
            index:    "02",
            name:     "Portrait Sessions",
            tagline:  "Headshots, families, and personal brand imagery.",
            price:    "$350",
            featured: true,
            badge:    "Most Popular",
            features: [
                "1–2 hour session",
                "Multiple locations",
                "30+ edited photos",
                "Wardrobe consultation"
            ],
            previewImage: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=260&fit=crop&q=80"
        },
        {
            id:       "event",
            index:    "03",
            name:     "Events & Corporate",
            tagline:  "Conferences, galas, and special occasions covered with precision.",
            price:    "$800",
            featured: false,
            badge:    "",
            features: [
                "Customised packages",
                "Candid & posed shots",
                "Fast turnaround",
                "Brand-aligned editing"
            ],
            previewImage: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400&h=260&fit=crop&q=80"
        }
    ],

    // ──────────────────────────────────────────────────────
    // PORTFOLIO
    // ──────────────────────────────────────────────────────
    portfolio: [
        {
            id:       "summer-romance",
            title:    "Summer Romance",
            category: "wedding",
            layout:   "tall",
            alt:      "Bride and groom sharing a tender moment in golden afternoon light",
            src:      "https://images.unsplash.com/photo-1519741497674-611481863552?w=700&h=1050&fit=crop&q=80",
            srcset: [
                { url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=600&fit=crop&q=75", w: 400 },
                { url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=700&h=1050&fit=crop&q=80", w: 700 }
            ]
        },
        {
            id:       "executive-headshot",
            title:    "Executive Headshot",
            category: "portrait",
            layout:   "normal",
            alt:      "Professional executive headshot with clean neutral background",
            src:      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=450&fit=crop&q=80",
            srcset: [
                { url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=300&fit=crop&q=75", w: 400 },
                { url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=450&fit=crop&q=80", w: 600 }
            ]
        },
        {
            id:       "garden-ceremony",
            title:    "Garden Ceremony",
            category: "wedding",
            layout:   "normal",
            alt:      "Couple exchanging vows in a sunlit garden ceremony",
            src:      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=450&fit=crop&q=80",
            srcset: [
                { url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop&q=75", w: 400 },
                { url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=450&fit=crop&q=80", w: 600 }
            ]
        },
        {
            id:       "engagement-shoot",
            title:    "Engagement Shoot",
            category: "portrait",
            layout:   "wide",
            alt:      "Engaged couple embracing during a romantic outdoor shoot",
            src:      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&h=600&fit=crop&q=80",
            srcset: [
                { url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=300&fit=crop&q=75", w: 600 },
                { url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&h=600&fit=crop&q=80", w: 1200 }
            ]
        },
        {
            id:       "corporate-gala",
            title:    "Corporate Gala",
            category: "event",
            layout:   "normal",
            alt:      "Elegantly dressed guests at a corporate gala dinner",
            src:      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&h=450&fit=crop&q=80",
            srcset: [
                { url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400&h=300&fit=crop&q=75", w: 400 },
                { url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&h=450&fit=crop&q=80", w: 600 }
            ]
        },
        {
            id:       "golden-hour",
            title:    "Golden Hour",
            category: "portrait",
            layout:   "normal",
            alt:      "Portrait bathed in warm golden hour sunlight",
            src:      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=450&fit=crop&q=80",
            srcset: [
                { url: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop&q=75", w: 400 },
                { url: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=450&fit=crop&q=80", w: 600 }
            ]
        },
        {
            id:       "reception-moments",
            title:    "Reception Moments",
            category: "wedding",
            layout:   "normal",
            alt:      "Guests dancing and celebrating at a wedding reception",
            src:      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=450&fit=crop&q=80",
            srcset: [
                { url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&h=300&fit=crop&q=75", w: 400 },
                { url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=450&fit=crop&q=80", w: 600 }
            ]
        },
        {
            id:       "conference-2024",
            title:    "Conference 2024",
            category: "event",
            layout:   "normal",
            alt:      "Keynote speaker presenting at a professional conference",
            src:      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&h=450&fit=crop&q=80",
            srcset: [
                { url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=400&h=300&fit=crop&q=75", w: 400 },
                { url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&h=450&fit=crop&q=80", w: 600 }
            ]
        },
        {
            id:       "family-session",
            title:    "Family Session",
            category: "portrait",
            layout:   "normal",
            alt:      "Family laughing together during an outdoor portrait session",
            src:      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=450&fit=crop&q=80",
            srcset: [
                { url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=300&fit=crop&q=75", w: 400 },
                { url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=450&fit=crop&q=80", w: 600 }
            ]
        }
    ],

    // ──────────────────────────────────────────────────────
    // TESTIMONIALS
    // ──────────────────────────────────────────────────────
    testimonials: [
        {
            stars:   5,
            quote:   "Sara captured our wedding day beautifully. Every photo tells a story and brings back the emotions we felt. She was professional, creative, and made us feel comfortable throughout the entire day.",
            name:    "Amina & Youssef",
            event:   "Wedding Photography",
            initial: "A"
        },
        {
            stars:   5,
            quote:   "The family portraits Sara took are absolutely stunning. She has an incredible eye for detail and knows exactly how to capture genuine moments. We'll treasure these photos forever.",
            name:    "Laila Mansouri",
            event:   "Family Portrait Session",
            initial: "L"
        },
        {
            stars:   5,
            quote:   "Sara photographed our company's annual conference and the results exceeded our expectations. Her professionalism and ability to capture key moments made our event memorable. Highly recommended!",
            name:    "Hassan Alaoui",
            event:   "Corporate Event",
            initial: "H"
        }
    ],

    // ──────────────────────────────────────────────────────
    // CONTACT FORM
    // ──────────────────────────────────────────────────────
    contact: {
        formHeading: "Let's make something beautiful.",
        formIntro: "Tell me about your vision — I'll get back to you within 24 hours.",
        availability: "Currently booking for Spring 2026",
        
        links: [
            {
                label: "Email",
                value: "sara.benali@example.com",
                href: "mailto:sara.benali@example.com",
                type: "email"
            },
            {
                label: "WhatsApp",
                value: "+212 600 000 000",
                href: "https://wa.me/212600000000",
                type: "whatsapp"
            },
            {
                label: "Instagram",
                value: "@sarabenali.photo",
                href: "https://instagram.com/sarabenali.photo",
                type: "instagram"
            }
        ]
    },

    // ──────────────────────────────────────────────────────
    // FORM CONFIGURATION
    // ──────────────────────────────────────────────────────
    form: {
        endpoint: "https://script.google.com/macros/s/AKfycbzlisemvR4AV93Ldimo6BcYMrwq-UAt9cFloUuXb7ZjR3oVqq1U9l8q5QEZbo6lQFdWYg/exec",
        successMessage: "Message sent! I'll get back to you within 24 hours.",
        errorMessage:   "Something went wrong. Please email me directly or try again.",
        networkError:   "Network error. Check your connection and try again."
    },

    // ──────────────────────────────────────────────────────
    // SEO / META
    // ──────────────────────────────────────────────────────
    seo: {
        title:       "Sara Benali Photography | Wedding & Portrait Photographer — Casablanca",
        description: "Sara Benali — Professional photographer specializing in weddings, portraits, and events in Casablanca, Morocco. Capturing genuine emotion with elegance and artistry.",
        ogImage:     "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200&h=630&fit=crop"
    },

    // ──────────────────────────────────────────────────────
    // FOOTER
    // ──────────────────────────────────────────────────────
    footer: {
        tagline:   "Capturing moments, creating memories.",
        copyright: "2026 Sara Benali Photography. All rights reserved.",
        madeWith:  "Crafted with ❤️ for capturing beautiful moments"
    }
};


// ============================================================
//  CONFIG RENDERER
//  Reads SiteConfig and stamps values into the DOM.
//  Called once from main.js inside init().
// ============================================================

function renderFromConfig() {
    const cfg = SiteConfig;

    // ── 1. Simple data-config text bindings ──────────────────
    document.querySelectorAll('[data-config]').forEach(el => {
        const path  = el.getAttribute('data-config');
        const value = resolvePath(cfg, path);
        if (value !== undefined && value !== null) {
            el.textContent = value;
        }
    });

    // ── 2. Hero background ───────────────────────────────────
    const heroBg = document.getElementById('heroBg');
    if (heroBg && cfg.hero.backgroundImage) {
        heroBg.style.backgroundImage = `url('${cfg.hero.backgroundImage}')`;
    }

    // ── 3. About image ───────────────────────────────────────
    renderAboutImage(cfg.photographer.aboutImage);

    // ── 4. Form endpoint ─────────────────────────────────────
    const form = document.getElementById('contactForm');
    if (form && cfg.form.endpoint) {
        form.action = cfg.form.endpoint;
    }

    // ── 5. WhatsApp links ────────────────────────────────────
    const waMsg = encodeURIComponent(`Hi ${cfg.photographer.name}! I saw your work and I'm interested in booking a session.`);
    const waUrl = `https://wa.me/${cfg.photographer.whatsapp}?text=${waMsg}`;
    document.querySelectorAll('[data-wa-link]').forEach(el => {
        el.href = waUrl;
    });

    // ── 6. Render contact links ──────────────────────────────
    renderContactLinks(cfg.contact.links);

    // ── 7. Render services list ──────────────────────────────
    renderServices(cfg.services);

    // ── 8. Render portfolio grid ─────────────────────────────
    renderPortfolio(cfg.portfolio);

    // ── 9. Render testimonials ───────────────────────────────
    renderTestimonials(cfg.testimonials);

    // ── 10. Page meta ────────────────────────────────────────
    document.title = cfg.seo.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = cfg.seo.description;

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = cfg.seo.title;

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = cfg.seo.description;

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.content = cfg.seo.ogImage;
}


// ──────────────────────────────────────────
//  ABOUT IMAGE RENDERER
// ──────────────────────────────────────────
function renderAboutImage(imgData) {
    const imgEl = document.querySelector('.about-image .image-frame img');
    if (!imgEl || !imgData) return;

    const srcsetStr = imgData.srcset
        .map(s => `${s.url} ${s.w}w`)
        .join(', ');

    imgEl.srcset = srcsetStr;
    imgEl.src = imgData.src;
    imgEl.alt = imgData.alt;
    imgEl.width = imgData.width;
    imgEl.height = imgData.height;
}


// ──────────────────────────────────────────
//  CONTACT LINKS RENDERER
// ──────────────────────────────────────────
function renderContactLinks(links) {
    const container = document.querySelector('.ctc-links');
    if (!container || !links) return;
    
    container.innerHTML = '';
    
    links.forEach(link => {
        const target = link.type === 'whatsapp' || link.type === 'instagram' ? 'target="_blank" rel="noopener noreferrer"' : '';
        
        container.insertAdjacentHTML('beforeend', `
            <div class="ctc-link-item" role="listitem">
                <span class="ctc-link-label">${escHtml(link.label)}</span>
                <a href="${escHtml(link.href)}" class="ctc-link-value" ${target}>
                    ${escHtml(link.value)}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </a>
            </div>
        `);
    });
}


// ──────────────────────────────────────────
//  SERVICES RENDERER
// ──────────────────────────────────────────
function renderServices(services) {
    const list = document.querySelector('.svc-list');
    if (!list) return;
    list.innerHTML = '';

    services.forEach(svc => {
        const featuredClass = svc.featured ? 'svc-featured' : '';
        const badgeHTML = svc.badge
            ? `<span class="svc-badge">${escHtml(svc.badge)}</span>`
            : '';

        const featuresHTML = svc.features
            .map(f => `<li>${escHtml(f)}</li>`)
            .join('');

        list.insertAdjacentHTML('beforeend', `
            <div class="svc-item ${featuredClass}" role="listitem" data-index="${escHtml(svc.index)}">
                <div class="svc-item-inner">
                    <div class="svc-item-left">
                        <span class="svc-num" aria-hidden="true">${escHtml(svc.index)}</span>
                        <div class="svc-text">
                            <h3 class="svc-name">
                                ${escHtml(svc.name)}
                                ${badgeHTML}
                            </h3>
                            <p class="svc-tagline">${escHtml(svc.tagline)}</p>
                        </div>
                    </div>
                    <div class="svc-item-right">
                        <span class="svc-price">from <strong>${escHtml(svc.price)}</strong></span>
                        <a href="#contact" class="svc-cta" aria-label="Book ${escHtml(svc.name)}">
                            Book
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </a>
                    </div>
                </div>
                <div class="svc-detail" aria-hidden="true">
                    <ul class="svc-features">${featuresHTML}</ul>
                    <div class="svc-preview">
                        <img src="${escHtml(svc.previewImage)}" alt="" aria-hidden="true"
                             loading="lazy" width="400" height="260">
                    </div>
                </div>
            </div>
        `);
    });

    // Re-init the detail panel wrappers after dynamic render
    if (typeof initServicesPanel === 'function') initServicesPanel();
}


// ──────────────────────────────────────────
//  PORTFOLIO RENDERER
// ──────────────────────────────────────────
function renderPortfolio(items) {
    const grid = document.getElementById('portfolioGrid');
    if (!grid) return;
    grid.innerHTML = '';

    items.forEach(item => {
        const layoutClass = item.layout === 'tall'  ? 'port-item--tall'
                          : item.layout === 'wide'  ? 'port-item--wide'
                          : '';

        const srcsetStr = item.srcset
            .map(s => `${s.url} ${s.w}w`)
            .join(', ');

        const sizes = item.layout === 'wide'
            ? '(max-width: 768px) 100vw, 60vw'
            : item.layout === 'tall'
            ? '(max-width: 768px) 100vw, 40vw'
            : '(max-width: 768px) 100vw, 30vw';

        const catLabel = item.category.charAt(0).toUpperCase() + item.category.slice(1);

        grid.insertAdjacentHTML('beforeend', `
            <div class="port-item ${layoutClass}"
                 data-category="${escHtml(item.category)}"
                 role="listitem"
                 tabindex="0"
                 aria-label="View ${escHtml(item.title)} — ${catLabel} photography">
                <div class="port-img-wrap">
                    <img srcset="${escHtml(srcsetStr)}"
                         sizes="${sizes}"
                         src="${escHtml(item.src)}"
                         alt="${escHtml(item.alt)}"
                         loading="lazy">
                    <div class="port-overlay" aria-hidden="true">
                        <div class="port-overlay-content">
                            <span class="port-cat">${catLabel}</span>
                            <h3 class="port-name">${escHtml(item.title)}</h3>
                            <span class="port-view-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        `);
    });

    // Re-init portfolio entrance animations after dynamic render
    if (typeof initPortfolioEntrance === 'function') initPortfolioEntrance();
}


// ──────────────────────────────────────────
//  TESTIMONIALS RENDERER
// ──────────────────────────────────────────
function renderTestimonials(testimonials) {
    const grid = document.querySelector('.testimonials-grid');
    if (!grid) return;
    grid.innerHTML = '';

    testimonials.forEach(t => {
        const stars = '★'.repeat(t.stars);
        grid.insertAdjacentHTML('beforeend', `
            <article class="testimonial-card">
                <div class="testimonial-stars" aria-label="${t.stars} out of 5 stars">${stars}</div>
                <blockquote>
                    <p class="testimonial-quote">"${escHtml(t.quote)}"</p>
                </blockquote>
                <div class="testimonial-author">
                    <div class="author-avatar" aria-hidden="true">${escHtml(t.initial)}</div>
                    <div class="author-info">
                        <p class="author-name">${escHtml(t.name)}</p>
                        <p class="author-event">${escHtml(t.event)}</p>
                    </div>
                </div>
            </article>
        `);
    });
}


// ──────────────────────────────────────────
//  HELPERS
// ──────────────────────────────────────────

// Resolve a dot-notation path on an object: "photographer.name" → value
function resolvePath(obj, path) {
    return path.split('.').reduce((acc, key) => {
        return (acc !== null && acc !== undefined) ? acc[key] : undefined;
    }, obj);
}

// Escape HTML to prevent XSS when injecting into innerHTML
function escHtml(str) {
    if (typeof str !== 'string') return String(str ?? '');
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}


// ──────────────────────────────────────────
//  EXPORT (for testing)
// ──────────────────────────────────────────
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SiteConfig, renderFromConfig, resolvePath };
}
// ==================== GLOBAL STATE ====================
const state = {
    scrollY: 0,
    isMenuOpen: false,
    currentFilter: 'all',
    lightboxActive: false
};

// ==================== DOM ELEMENTS ====================
const elements = {
    navbar:        document.getElementById('navbar'),
    hamburger:     document.getElementById('hamburger'),
    lightbox:      document.getElementById('lightbox'),
    lightboxImage: document.getElementById('lightboxImage'),
    lightboxClose: document.getElementById('lightboxClose'),
    contactForm:   document.getElementById('contactForm'),
    sections:      document.querySelectorAll('.section')
};

// ==================== NAVBAR SCROLL ====================
function handleNavbarScroll() {
    const scrollY = window.scrollY;
    elements.navbar.classList.toggle('scrolled', scrollY > 100);
    state.scrollY = scrollY;
}

// RAF-throttled — one handler covers all scroll work
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleNavbarScroll();
            updateActiveNavLink();
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// ==================== MOBILE MENU ====================
function toggleMobileMenu() {
    state.isMenuOpen = !state.isMenuOpen;
    elements.hamburger.classList.toggle('open');
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) mobileNav.classList.toggle('open');
    elements.hamburger.setAttribute('aria-expanded', String(state.isMenuOpen));
    document.body.style.overflow = state.isMenuOpen ? 'hidden' : '';
}

if (elements.hamburger) {
    elements.hamburger.addEventListener('click', toggleMobileMenu);
}

// Single delegated handler — closes menu when a mobile link is tapped
document.addEventListener('click', (e) => {
    if (e.target.matches('.mobile-link')) {
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav) {
            mobileNav.classList.remove('open');
            elements.hamburger.classList.remove('open');
            elements.hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            state.isMenuOpen = false;
        }
    }
});

// ==================== ACTIVE NAV LINK ====================
// Cache once at boot — never re-query the DOM on scroll
const cachedNavSections = Array.from(document.querySelectorAll('section[id]'));
const cachedNavLinks    = {};
cachedNavSections.forEach(section => {
    const id   = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) cachedNavLinks[id] = link;
});

function updateActiveNavLink() {
    const scrollY = window.scrollY;
    for (const section of cachedNavSections) {
        const top    = section.offsetTop - 100;
        const height = section.offsetHeight;
        const id     = section.getAttribute('id');
        const link   = cachedNavLinks[id];
        if (link && scrollY >= top && scrollY < top + height) {
            Object.values(cachedNavLinks).forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            break;
        }
    }
}

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') { e.preventDefault(); return; }
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
    });
});

// ==================== PORTFOLIO FILTER (Masonry) ====================
function filterPortfolio(category) {
    state.currentFilter = category;
    const items = Array.from(document.querySelectorAll('.port-item'));

    // Phase 1: animate out non-matching items
    items.forEach(item => {
        const matches = category === 'all' || item.getAttribute('data-category') === category;
        if (!matches) {
            item.style.opacity    = '0';
            item.style.transform  = 'scale(0.95)';
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            setTimeout(() => {
                item.classList.add('port-hidden');
                item.setAttribute('aria-hidden', 'true');
                item.style.opacity    = '';
                item.style.transform  = '';
                item.style.transition = '';
            }, 300);
        }
    });

    // Phase 2: stagger-reveal matching items after hidden ones are gone
    setTimeout(() => {
        items
            .filter(item => category === 'all' || item.getAttribute('data-category') === category)
            .forEach((item, index) => {
                item.classList.remove('port-hidden');
                item.removeAttribute('aria-hidden');
                item.style.opacity    = '0';
                item.style.transform  = 'scale(0.96) translateY(8px)';
                setTimeout(() => {
                    item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    item.style.opacity    = '1';
                    item.style.transform  = 'scale(1) translateY(0)';
                    setTimeout(() => {
                        item.style.opacity    = '';
                        item.style.transform  = '';
                        item.style.transition = '';
                    }, 400);
                }, index * 60);
            });
    }, 320);

    // Sync filter button aria-pressed states
    document.querySelectorAll('.port-filter').forEach(btn => {
        const isActive = btn.getAttribute('data-filter') === category;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', String(isActive));
    });
}

function initFilters() {
    document.querySelectorAll('.port-filter').forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            if (filter !== state.currentFilter) filterPortfolio(filter);
        });
    });
}

// ==================== PORTFOLIO ENTRANCE ANIMATION ====================
function initPortfolioEntrance() {
    const items = document.querySelectorAll('.port-item');
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el    = entry.target;
                const index = Array.from(items).indexOf(el);
                const delay = (index % 6) * 80;
                setTimeout(() => {
                    el.style.opacity   = '1';
                    el.style.transform = 'translateY(0)';
                }, delay);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    items.forEach(item => {
        item.style.opacity    = '0';
        item.style.transform  = 'translateY(24px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// ==================== LIGHTBOX ====================
let lightboxReturnFocus = null;
let lightboxItems       = []; // all visible (non-hidden) port-items
let lightboxIndex       = 0;  // current index in lightboxItems

function getVisibleItems() {
    // Only items currently visible (not filtered out)
    return Array.from(document.querySelectorAll('.port-item:not(.port-hidden)'));
}

function openLightbox(index) {
    lightboxItems = getVisibleItems();
    if (!lightboxItems.length) return;

    // Clamp index
    lightboxIndex = Math.max(0, Math.min(index, lightboxItems.length - 1));

    const item   = lightboxItems[lightboxIndex];
    const img    = item.querySelector('img');
    const catEl  = item.querySelector('.port-cat');
    const nameEl = item.querySelector('.port-name');

    if (!img) return;

    state.lightboxActive = true;
    lightboxReturnFocus  = lightboxReturnFocus || document.activeElement;

    // Fade image on transition
    elements.lightboxImage.style.opacity = '0';

    elements.lightboxImage.src = img.src;
    elements.lightboxImage.alt = img.alt || 'Portfolio image';

    elements.lightboxImage.onload = () => {
        elements.lightboxImage.style.transition = 'opacity 0.3s ease';
        elements.lightboxImage.style.opacity    = '1';
    };
    // If already cached it won't fire onload
    if (elements.lightboxImage.complete) {
        elements.lightboxImage.style.opacity = '1';
    }

    const category = catEl?.textContent  || '';
    const title    = nameEl?.textContent || '';

    const catEl2   = document.querySelector('.lightbox-category');
    const titleEl  = document.querySelector('.lightbox-title');
    const counterEl = document.getElementById('lightboxCounter');

    if (catEl2)    catEl2.textContent   = category;
    if (titleEl)   titleEl.textContent  = title;
    if (counterEl) counterEl.textContent = `${lightboxIndex + 1} / ${lightboxItems.length}`;

    elements.lightbox.setAttribute('aria-label', title ? `Portfolio image: ${title}` : 'Portfolio image');
    elements.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Update arrow visibility
    updateNavButtons();

    requestAnimationFrame(() => elements.lightboxClose?.focus());
}

function updateNavButtons() {
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    if (prevBtn) prevBtn.style.opacity = lightboxIndex <= 0 ? '0.25' : '1';
    if (nextBtn) nextBtn.style.opacity = lightboxIndex >= lightboxItems.length - 1 ? '0.25' : '1';
}

function lightboxNavigate(dir) {
    const next = lightboxIndex + dir;
    if (next < 0 || next >= lightboxItems.length) return;
    openLightbox(next);
}

function closeLightbox() {
    state.lightboxActive = false;
    elements.lightbox.classList.remove('active');
    document.body.style.overflow = '';
    if (lightboxReturnFocus) {
        lightboxReturnFocus.focus();
        lightboxReturnFocus = null;
    }
}

function initLightbox() {
    elements.lightboxClose?.addEventListener('click', closeLightbox);

    // Click on backdrop closes
    elements.lightbox?.addEventListener('click', (e) => {
        if (e.target === elements.lightbox) closeLightbox();
    });

    // Prev / Next buttons
    document.getElementById('lightboxPrev')?.addEventListener('click', (e) => {
        e.stopPropagation();
        lightboxNavigate(-1);
    });
    document.getElementById('lightboxNext')?.addEventListener('click', (e) => {
        e.stopPropagation();
        lightboxNavigate(1);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!state.lightboxActive) return;
        if (e.key === 'Escape')      closeLightbox();
        if (e.key === 'ArrowLeft')   lightboxNavigate(-1);
        if (e.key === 'ArrowRight')  lightboxNavigate(1);
    });

    // Touch swipe support
    let touchStartX = 0;
    elements.lightbox?.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    elements.lightbox?.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 50) lightboxNavigate(dx < 0 ? 1 : -1);
    }, { passive: true });

    // Click on a portfolio item — find its index among visible items
    function triggerPortfolioItem(el) {
        const item = el.closest('.port-item');
        if (!item) return;
        lightboxReturnFocus = item; // return focus here on close
        const items = getVisibleItems();
        const idx   = items.indexOf(item);
        if (idx !== -1) openLightbox(idx);
    }

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.lightbox')) triggerPortfolioItem(e.target);
    });

    document.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('.port-item')) {
            e.preventDefault();
            triggerPortfolioItem(e.target);
        }
    });
}

// ==================== SERVICES DETAIL PANEL ====================
function initServicesPanel() {
    document.querySelectorAll('.svc-detail').forEach(panel => {
        const children = Array.from(panel.children);
        if (!children.length) return;

        const content = document.createElement('div');
        content.className = 'svc-detail-content';

        const inner = document.createElement('div');
        inner.className = 'svc-detail-inner';

        children.forEach(child => inner.appendChild(child));
        content.appendChild(inner);
        panel.appendChild(content);
    });
}

// ==================== CONTACT FORM ====================
if (elements.contactForm) {
    elements.contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn          = elements.contactForm.querySelector('.ctc-submit, .submit-button');
        const originalHTML = btn.innerHTML;

        elements.contactForm.querySelector('.success-message, .error-message')?.remove();

        btn.disabled  = true;
        btn.innerHTML = '<span class="ctc-submit-text">Sending…</span><span class="ctc-submit-fill" aria-hidden="true"></span>';
        btn.classList.add('loading');

        // Collect form data
        const formData = {
            name:      elements.contactForm.querySelector('#name').value,
            email:     elements.contactForm.querySelector('#email').value,
            eventDate: elements.contactForm.querySelector('#eventDate').value,
            eventType: elements.contactForm.querySelector('#eventType').value,
            message:   elements.contactForm.querySelector('#message').value
        };

        try {
            // FIXED: Send as URL-encoded form data (Google Apps Script prefers this)
            const urlEncoded = new URLSearchParams(formData).toString();
            
            const res = await fetch(elements.contactForm.action, {
                method:  'POST',
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: urlEncoded,
                redirect: 'follow'
            });

            // Check response
            let responseData;
            try {
                const text = await res.text();
                responseData = JSON.parse(text);
            } catch (parseError) {
                console.error('Parse error:', parseError);
                responseData = { success: false };
            }

            const msg = document.createElement('p');
            
            // Check for success (either res.ok OR responseData.success)
            if (res.ok || responseData.success) {
                msg.className   = 'success-message';
                msg.textContent = "Message sent! I'll get back to you within 24 hours.";
                elements.contactForm.reset();
                
                // Reset the select dropdown visual state
                const selectEl = elements.contactForm.querySelector('#eventType');
                if (selectEl) selectEl.classList.remove('has-value');
            } else {
                msg.className   = 'error-message';
                msg.textContent = responseData.error || 'Something went wrong. Please email me directly or try again.';
            }
            
            elements.contactForm.appendChild(msg);
            setTimeout(() => msg.remove(), 8000);

        } catch (err) {
            const msg       = document.createElement('p');
            msg.className   = 'error-message';
            msg.textContent = 'Network error. Check your connection and try again.';
            elements.contactForm.appendChild(msg);
            console.error('Form error:', err);

        } finally {
            btn.disabled  = false;
            btn.innerHTML = originalHTML;
            btn.classList.remove('loading');
        }
    });
}

// ==================== SECTION SCROLL REVEAL ====================
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            sectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

elements.sections.forEach(section => {
    if (section.id !== 'hero') sectionObserver.observe(section);
});

// ==================== IMAGE LAZY LOADING ====================
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const img    = entry.target;
        const parent = img.closest('.portfolio-image, .port-img-wrap, .image-frame');

        if (img.complete && img.naturalHeight !== 0) {
            parent?.classList.add('loaded');
        } else {
            parent?.classList.add('image-loading');
            img.addEventListener('load', () => {
                parent?.classList.remove('image-loading');
                parent?.classList.add('loaded');
            }, { once: true });
            img.addEventListener('error', () => {
                parent?.classList.remove('image-loading');
                parent?.classList.add('image-error');
            }, { once: true });
        }
        imageObserver.unobserve(img);
    });
});

document.querySelectorAll('img[loading="lazy"]').forEach(img => imageObserver.observe(img));

// ==================== HERO KEN BURNS ====================
window.addEventListener('load', () => {
    const heroBg = document.getElementById('heroBg');
    if (heroBg) heroBg.classList.add('loaded');
});

// ==================== SELECT FLOATING LABEL (contact form) ====================
function initSelectFloatLabels() {
    document.querySelectorAll('.ctc-field--select select').forEach(select => {
        const sync = () => select.classList.toggle('has-value', select.value !== '');
        select.addEventListener('change', sync);
        sync();
    });
}

// ==================== INITIALISE ====================
function init() {
    // CRITICAL: Render all content from config FIRST
    if (typeof renderFromConfig === 'function') {
        renderFromConfig();
    } else {
        console.error('renderFromConfig function not found - config.js must load before main.js');
    }

    handleNavbarScroll();
    updateActiveNavLink();

    // Portfolio — masonry grid + filter
    initFilters();
    initPortfolioEntrance();

    // Services — expandable detail panels
    initServicesPanel();

    // Lightbox — works with new .port-item structure
    initLightbox();

    // Set initial aria-pressed on filter buttons
    document.querySelectorAll('.port-filter').forEach(btn => {
        btn.setAttribute('aria-pressed', String(btn.classList.contains('active')));
    });

    initSelectFloatLabels();

    console.log('Sara Benali Photography — Initialized');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ==================== EXPORT FOR TESTING ====================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { state, filterPortfolio, openLightbox, closeLightbox };
}
// ==================== PARALLAX (Hero) ====================
// FIX: Added RAF throttling + disabled on mobile (performance issue)
// function initParallax() {
//     const heroBackground = document.querySelector('.hero-bg');
//     if (!heroBackground) return;

//     // Skip parallax on mobile — it causes jank and isn't noticeable
//     if (window.innerWidth < 768) return;

//     let ticking = false;

//     window.addEventListener('scroll', () => {
//         if (!ticking) {
//             requestAnimationFrame(() => {
//                 const scrolled = window.scrollY;
//                 if (scrolled < window.innerHeight) {
//                     // Subtle 0.4 speed — too fast feels cheap on a photography site
//                     heroBackground.style.transform = `translateY(${scrolled * 0.4}px)`;
//                 }
//                 ticking = false;
//             });
//             ticking = true;
//         }
//     }, { passive: true });
// }

// ==================== STAGGER ANIMATIONS ====================
function initStaggerAnimations() {
    const staggerElements = document.querySelectorAll('.services-grid, .testimonials-grid, .portfolio-grid');

    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const children = Array.from(entry.target.children);
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    staggerElements.forEach(element => {
        Array.from(element.children).forEach(child => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(20px)';
            child.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        staggerObserver.observe(element);
    });
}

// ==================== NUMBER COUNTER ANIMATION ====================
function animateCounter(element, target, duration = 2000) {
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

function initCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                // Parse integer only — strip any non-numeric chars like "+"
                const value = parseInt(target.textContent.replace(/\D/g, ''), 10);
                if (!isNaN(value)) {
                    animateCounter(target, value);
                }
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

// ==================== SCROLL REVEAL ====================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.service-card, .testimonial-card, .about-content > *');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        revealObserver.observe(element);
    });
}

// ==================== SCROLL PROGRESS INDICATOR ====================
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.setAttribute('role', 'progressbar');
    progressBar.setAttribute('aria-hidden', 'true'); // decorative
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 2px;
        background: linear-gradient(90deg, var(--dusty-rose), var(--gold-accent));
        z-index: 9999;
        pointer-events: none;
        transition: width 0.1s linear;
    `;
    document.body.appendChild(progressBar);

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
                if (windowHeight > 0) {
                    const scrolled = (window.scrollY / windowHeight) * 100;
                    progressBar.style.width = Math.min(scrolled, 100) + '%';
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ==================== MAGNETIC BUTTONS ====================
// Desktop only — meaningless (and slightly broken) on touch devices
function initMagneticButtons() {
    if (window.innerWidth < 1024) return;

    const buttons = document.querySelectorAll('.cta-button, .submit-button, .btn-primary, .btn-ghost');

    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// ==================== IMAGE TILT EFFECT ====================
// Desktop only — uses CSS will-change for GPU compositing
function initImageTilt() {
    if (window.innerWidth < 1024) return;

    const images = document.querySelectorAll('.image-frame');

    images.forEach(image => {
        // Hint to browser that transform will change
        image.style.willChange = 'transform';
        image.style.transition = 'transform 0.3s ease';

        image.addEventListener('mousemove', (e) => {
            const rect = image.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * 6; // max 6deg
            const rotateY = ((centerX - x) / centerX) * 6;
            image.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        image.addEventListener('mouseleave', () => {
            image.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
}

// ==================== FLOATING ELEMENTS ====================
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.service-icon, .experience-badge');
    floatingElements.forEach(element => {
        const randomDelay = (Math.random() * 2).toFixed(2);
        element.style.animation = `float 3s ease-in-out ${randomDelay}s infinite`;
    });
}

// ==================== CURSOR FOLLOWER (Desktop only) ====================
function initCursorFollower() {
    if (window.innerWidth < 1024) return;

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 1.5px solid var(--dusty-rose);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        opacity: 0;
        transition: opacity 0.2s ease, transform 0.2s ease;
    `;
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let animating = false;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '1';
        if (!animating) {
            animating = true;
            animateCursor();
        }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = (cursorX - 10) + 'px';
        cursor.style.top = (cursorY - 10) + 'px';

        if (Math.abs(mouseX - cursorX) > 0.1 || Math.abs(mouseY - cursorY) > 0.1) {
            requestAnimationFrame(animateCursor);
        } else {
            animating = false;
        }
    }

    document.querySelectorAll('a, button, .portfolio-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2.5)';
            cursor.style.opacity = '0.4';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.opacity = '1';
        });
    });
}

// ==================== INITIALIZE ALL ANIMATIONS ====================
function initAnimations() {
    // FIX: Removed undefined rotateServiceFeatured() call that was crashing the script

    initParallax();
    initStaggerAnimations();
    initCounters();
    initScrollReveal();
    initFloatingElements();
    initScrollProgress();
    initMagneticButtons();
    initImageTilt();
    // initCursorFollower(); // opt-in — uncomment if desired

    console.log('Animations initialized');
}

// ==================== PERFORMANCE: Reduced motion support ====================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    // Don't initialize heavy animations for users who prefer reduced motion
    console.log('Reduced motion preference detected — skipping animations.');
} else {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnimations);
    } else {
        initAnimations();
    }
}

// Reinitialize desktop-only effects on resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.innerWidth >= 1024) {
            initMagneticButtons();
            initImageTilt();
        }
    }, 250);
});

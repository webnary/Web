/* Each feature runs in its own isolated block. A top-level throw in vanilla JS
   halts every remaining statement in the file — wrapping each feature in its
   own try/catch means one broken block can't silently take the rest down with it. */
function safeInit(label, fn){
  try{ fn(); }
  catch(e){ console.error('[Webnary] "' + label + '" failed to initialize:', e); }
}

/* ---------- WhatsApp message picker ---------- */
safeInit('wa-picker', function(){
  function closeAllPickers(except){
    document.querySelectorAll('.wa-picker.open').forEach(p=>{
      if(p === except) return;
      p.classList.remove('open');
      const t = p.querySelector('.wa-picker-trigger');
      if(t) t.setAttribute('aria-expanded','false');
    });
  }

  document.querySelectorAll('.wa-picker').forEach(picker=>{
    const trigger = picker.querySelector('.wa-picker-trigger');
    if(!trigger) return;
    trigger.addEventListener('click', e=>{
      e.preventDefault();
      const willOpen = !picker.classList.contains('open');
      closeAllPickers();
      picker.classList.toggle('open', willOpen);
      trigger.setAttribute('aria-expanded', String(willOpen));
    });
    // Selecting a message closes the picker (link still opens WhatsApp in a new tab).
    picker.querySelectorAll('.wa-picker-menu a').forEach(a=>{
      a.addEventListener('click', ()=>{
        picker.classList.remove('open');
        trigger.setAttribute('aria-expanded','false');
      });
    });
  });

  document.addEventListener('click', e=>{
    if(!e.target.closest('.wa-picker')) closeAllPickers();
  });
  document.addEventListener('keydown', e=>{
    if(e.key === 'Escape') closeAllPickers();
  });
});

/* ---------- FAQ (accessible disclosure buttons) ---------- */
safeInit('faq-accordion', function(){
  document.querySelectorAll('.faq-q').forEach(q=>{
    q.addEventListener('click',()=>{
      const item = q.parentElement;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i=>{
        i.classList.remove('open');
        i.querySelector('.faq-q').setAttribute('aria-expanded','false');
      });
      if(!wasOpen){
        item.classList.add('open');
        q.setAttribute('aria-expanded','true');
      }
    });
  });
});

/* ---------- Scroll-reveal ---------- */
safeInit('scroll-reveal', function(){
  const reveals = document.querySelectorAll('.reveal');
  if(!reveals.length) return;

  if(!('IntersectionObserver' in window)){
    // No observer support: show everything immediately rather than leaving it at opacity:0 forever.
    reveals.forEach(el=>el.classList.add('in'));
    return;
  }

  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
  },{threshold:0.15});
  reveals.forEach(el=>obs.observe(el));
});

/* ---------- Theme toggle (persisted) ---------- */
safeInit('theme-toggle', function(){
  const themeBtn = document.getElementById('themeToggle');
  if(!themeBtn) return;
  const THEME_KEY = 'webnary-theme';

  // Sync the button's state with whatever the inline head script already applied.
  const isLightOnLoad = document.documentElement.getAttribute('data-theme') === 'light';
  themeBtn.setAttribute('aria-pressed', String(isLightOnLoad));

  themeBtn.addEventListener('click', ()=>{
    const html = document.documentElement;
    const isLight = html.getAttribute('data-theme') === 'light';
    const next = isLight ? 'dark' : 'light';
    if(next === 'light'){
      html.setAttribute('data-theme','light');
    } else {
      html.removeAttribute('data-theme');
    }
    themeBtn.setAttribute('aria-pressed', String(next === 'light'));
    try{ localStorage.setItem(THEME_KEY, next); }catch(e){}
  });
});

/* ---------- Mobile nav menu ---------- */
safeInit('mobile-nav', function(){
  const burger = document.getElementById('navBurger');
  if(!burger) return;
  const navEl = burger.closest('nav');
  const mobilePanel = document.getElementById('navMobilePanel');
  if(!navEl || !mobilePanel) return;

  function closeMenu(){
    navEl.classList.remove('menu-open');
    burger.setAttribute('aria-expanded','false');
    burger.textContent = '☰';
  }
  function openMenu(){
    navEl.classList.add('menu-open');
    burger.setAttribute('aria-expanded','true');
    burger.textContent = '✕';
  }

  burger.addEventListener('click', ()=>{
    const isOpen = navEl.classList.contains('menu-open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close after tapping any link inside the panel.
  mobilePanel.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', closeMenu);
  });

  // Close on Escape.
  document.addEventListener('keydown', e=>{
    if(e.key === 'Escape' && navEl.classList.contains('menu-open')) closeMenu();
  });

  // Close automatically if the viewport is resized past the mobile breakpoint.
  window.addEventListener('resize', ()=>{
    if(window.innerWidth > 980 && navEl.classList.contains('menu-open')) closeMenu();
  });
});

/* ---------- Broken image fallback ---------- */
safeInit('image-fallback', function(){
  document.querySelectorAll('img').forEach(img=>{
    img.addEventListener('error', function handler(){
      img.removeEventListener('error', handler);
      img.style.display = 'none';
      img.setAttribute('data-load-failed', 'true');
    });
  });
});

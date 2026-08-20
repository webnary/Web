/* ---------- WhatsApp message picker ---------- */
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

/* ---------- FAQ (accessible disclosure buttons) ---------- */
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

/* ---------- Scroll-reveal ---------- */
const obs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
},{threshold:0.15});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

/* ---------- Theme toggle (persisted) ---------- */
const themeBtn = document.getElementById('themeToggle');
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

/* ---------- Mobile nav menu ---------- */
const burger = document.getElementById('navBurger');
const navEl = burger.closest('nav');
const mobilePanel = document.getElementById('navMobilePanel');

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

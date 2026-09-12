(function(){
  var started = false;
  function start(){
    if (started) return;
    started = true;

    // Google tag (gtag.js)
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){dataLayer.push(arguments);};
    gtag('js', new Date());
    gtag('config', 'G-N6NECZ186Y');
    
     // Track all WhatsApp button clicks
  document.addEventListener('click', function(event) {
    var target = event.target;
    var link = target && target.closest
      ? target.closest('a[href*="wa.me"]')
      : null;

    if (!link) return;

    gtag('event', 'whatsapp_click', {
      link_text: (link.textContent || '').trim(),
      link_url: link.href,
      cta_class: link.className || '',
      transport_type: 'beacon'
    });
  });
    var gtmScript = document.createElement('script');
    gtmScript.async = true;
    gtmScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-N6NECZ186Y';
    document.head.appendChild(gtmScript);

    // Meta Pixel
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1652232292927046');
    fbq('track', 'PageView');

    // Microsoft Clarity — TEMPORARILY DISABLED 2026-09-10 for a controlled
    // PageSpeed A/B test (isolating its main-thread/TBT impact from gtag/fbq).
    // Re-enable by uncommenting the block below. No CSP change needed either
    // way — script-src already allows clarity.ms and isn't touched here.
    /*
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "y72hvm79s1");
    */
  }

   var isAdClick = /[?&](fbclid|gclid)=/.test(location.search);

  // Ad-click landings still fire immediately — that traffic needs to be
  // attributed correctly and 'complete' already having happened means
  // there's no paint left to protect anyway.
  if (isAdClick) {
    start();
  } else {
    // Everyone else: wait for the page to be idle rather than firing
    // exactly on 'load'. In real-world use these are close to the same
    // moment (visitors often haven't scrolled/clicked yet either), but
    // in Lighthouse's lab test there is no interaction at all, so it
    // always fell through to 'load' — meaning GTM (167 KiB) + Meta Pixel
    // (240 KiB) were parsing/executing squarely inside the same window
    // Lighthouse measures for Total Blocking Time and LCP render delay.
    // requestIdleCallback lets the browser finish painting and settle
    // first; the 4s timeout is a ceiling so slow/busy devices still
    // start tracking within a reasonable window rather than never.
    var schedule = window.requestIdleCallback
      ? function(cb){ requestIdleCallback(cb, { timeout: 4000 }); }
      : function(cb){ setTimeout(cb, 2500); };

    if (document.readyState === 'complete') schedule(start);
    else window.addEventListener('load', function(){ schedule(start); });
  }

  // A real interaction is a strong intent signal regardless of the
  // above — still start immediately the moment a visitor actually
  // does something, same as before.
  ['pointerdown', 'keydown', 'scroll'].forEach(function(evt){
    window.addEventListener(evt, start, { once: true, passive: true });
  });
})();
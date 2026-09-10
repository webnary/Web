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
  if (isAdClick || document.readyState === 'complete') { start(); }
  else { window.addEventListener('load', start); }
  ['pointerdown', 'keydown', 'scroll'].forEach(function(evt){
    window.addEventListener(evt, start, { once: true, passive: true });
  });
})();
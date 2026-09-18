/* Header photo slideshow: cross-fades the .rh-band__slide images inside [data-rh-slides].
   Slides after the first carry data-src and are fetched only once the page has loaded. */
(function () {
  var band = document.querySelector('[data-rh-slides]');
  if (!band) return;
  var slides = band.querySelectorAll('.rh-band__slide');
  if (slides.length < 2) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var INTERVAL = 7000;
  var current = 0;

  function load(img) {
    if (img.getAttribute('data-src')) {
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
    }
  }

  function advance() {
    if (document.hidden) return;
    var next = (current + 1) % slides.length;
    var img = slides[next];
    load(img);
    if (!img.complete || !img.naturalWidth) return; /* not ready yet: try again next tick */
    slides[current].classList.remove('is-active');
    img.classList.add('is-active');
    current = next;
    load(slides[(current + 1) % slides.length]);
  }

  function start() {
    load(slides[1]);
    setInterval(advance, INTERVAL);
  }

  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start);
})();

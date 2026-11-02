/* Maler Vogel – minimales JS für interaktive Teile.
   Die Seite ist ohne JS vollständig lesbar und bedienbar (Fallbacks in CSS). */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------- Footer-Jahr ---------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Header-Schatten ab 8 px Scroll ---------- */
  var header = $('#site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobiles Menü (Focus-Trap, Esc, Body-Scroll-Lock) ---------- */
  var toggle = $('#menu-toggle');
  var mobileNav = $('#mobile-nav');
  if (toggle && mobileNav) {
    var useEl = toggle.querySelector('use');
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
      useEl.setAttribute('href', open ? '#i-x' : '#i-menu');
      mobileNav.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
      if (open) { var first = mobileNav.querySelector('a'); if (first) first.focus(); }
    };
    toggle.addEventListener('click', function () { setOpen(toggle.getAttribute('aria-expanded') !== 'true'); });
    mobileNav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (!mobileNav.classList.contains('is-open')) return;
      if (e.key === 'Escape') { setOpen(false); toggle.focus(); return; }
      if (e.key !== 'Tab') return;
      var focusables = [toggle].concat($$('a, button', mobileNav));
      var first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', function (mq) { if (mq.matches) setOpen(false); });
  }

  /* ---------- Scroll-Spy ---------- */
  var navLinks = $$('.main-nav a[href^="#"]');
  if (navLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    navLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) { a.removeAttribute('aria-current'); });
        var link = byId[entry.target.id];
        if (link) link.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ---------- „Angebot anfragen“: nach dem Scrollen erstes Formularfeld fokussieren ---------- */
  $$('[data-focus-form]').forEach(function (a) {
    a.addEventListener('click', function () {
      var field = $('#f-name');
      if (!field) return;
      setTimeout(function () { field.focus({ preventScroll: true }); }, reduceMotion ? 0 : 600);
    });
  });

  /* ---------- Vorher/Nachher-Slider ---------- */
  $$('[data-ba]').forEach(function (ba) {
    var range = ba.querySelector('.ba__range');
    var update = function () {
      ba.style.setProperty('--pos', range.value + '%');
      range.setAttribute('aria-valuetext', (100 - range.value) + ' Prozent Nachher sichtbar');
    };
    range.addEventListener('input', update);
    range.addEventListener('keydown', function (e) {
      var v = Number(range.value), step = 5;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') v -= step;
      else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') v += step;
      else if (e.key === 'Home') v = 0;
      else if (e.key === 'End') v = 100;
      else return;
      e.preventDefault();
      range.value = Math.max(0, Math.min(100, v));
      update();
    });
    range.addEventListener('pointerdown', function () { ba.classList.add('is-dragging'); });
    window.addEventListener('pointerup', function () { ba.classList.remove('is-dragging'); });
    update();
  });

  /* ---------- Galerie-Lightbox (natives <dialog>) ---------- */
  var lightbox = $('#lightbox');
  var galleryBtns = $$('[data-gallery] .gallery__btn');
  if (lightbox && galleryBtns.length && typeof lightbox.showModal === 'function') {
    var caption = $('#lb-caption');
    var current = 0, opener = null;
    var show = function (i) {
      current = (i + galleryBtns.length) % galleryBtns.length;
      caption.textContent = galleryBtns[current].getAttribute('data-caption') + ' (' + (current + 1) + ' / ' + galleryBtns.length + ')';
    };
    galleryBtns.forEach(function (btn, i) {
      btn.addEventListener('click', function () { opener = btn; show(i); lightbox.showModal(); });
    });
    $('[data-lb-prev]', lightbox).addEventListener('click', function () { show(current - 1); });
    $('[data-lb-next]', lightbox).addEventListener('click', function () { show(current + 1); });
    $('[data-lb-close]', lightbox).addEventListener('click', function () { lightbox.close(); });
    lightbox.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) lightbox.close(); });
    lightbox.addEventListener('close', function () { if (opener) opener.focus(); });
    var touchX = null;
    lightbox.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener('touchend', function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
      touchX = null;
    });
  }

  /* ---------- Mobile Sticky-Aktionsleiste ---------- */
  var bar = $('#action-bar');
  var heroCtas = $('#hero-ctas');
  var contact = $('#kontakt');
  if (bar && heroCtas && contact && 'IntersectionObserver' in window) {
    var heroVisible = true, contactVisible = false;
    var render = function () { bar.classList.toggle('is-visible', !heroVisible && !contactVisible); };
    new IntersectionObserver(function (e) { heroVisible = e[0].isIntersecting; render(); }).observe(heroCtas);
    new IntersectionObserver(function (e) { contactVisible = e[0].isIntersecting; render(); }).observe(contact);
  } else if (bar) {
    bar.classList.add('is-visible');
  }

  /* ---------- Karte: 2-Klick-Lösung (Einwilligung nur für die Session) ---------- */
  var map = $('#map');
  if (map) {
    var loadMap = function () {
      var iframe = document.createElement('iframe');
      iframe.src = map.getAttribute('data-map-src');
      iframe.title = 'Standort Maler Vogel auf Google Maps';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      map.innerHTML = '';
      map.appendChild(iframe);
    };
    var consentKey = 'mv-map-consent';
    try { if (sessionStorage.getItem(consentKey) === '1') loadMap(); } catch (e) { /* Storage gesperrt */ }
    var btn = $('#map-load');
    if (btn) btn.addEventListener('click', function () {
      try { sessionStorage.setItem(consentKey, '1'); } catch (e) { /* ignorieren */ }
      loadMap();
    });
  }

  /* ---------- Kontaktformular: Validierung + Zustände ---------- */
  var form = $('#contact-form');
  if (form) {
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    var rules = {
      'f-name': function (el) { return el.value.trim().length > 0; },
      'f-email': function (el) { return emailRe.test(el.value.trim()); },
      'f-topic': function (el) { return el.value !== ''; },
      'f-msg': function (el) { return el.value.trim().length > 0; },
      'f-consent': function (el) { return el.checked; }
    };
    var touched = {};
    var validate = function (id) {
      var el = document.getElementById(id);
      var ok = rules[id](el);
      el.setAttribute('aria-invalid', ok ? 'false' : 'true');
      document.getElementById(id + '-err').hidden = ok;
      return ok;
    };
    Object.keys(rules).forEach(function (id) {
      var el = document.getElementById(id);
      el.addEventListener('blur', function () { touched[id] = true; validate(id); });
      el.addEventListener(el.type === 'checkbox' || el.tagName === 'SELECT' ? 'change' : 'input', function () {
        if (touched[id]) validate(id);
      });
    });

    var submit = $('#form-submit');
    var summary = $('#form-summary');
    var errorBox = $('#form-error');
    var fields = $$('input, select, textarea', form);
    var setBusy = function (busy) {
      submit.disabled = busy;
      submit.setAttribute('aria-busy', String(busy));
      var icon = submit.querySelector('[data-icon]');
      var spinner = submit.querySelector('.spinner');
      if (busy && !spinner) { icon.style.display = 'none'; spinner = document.createElement('span'); spinner.className = 'spinner'; submit.insertBefore(spinner, icon); }
      if (!busy && spinner) { spinner.remove(); icon.style.display = ''; }
      fields.forEach(function (f) { if (f.name !== 'website') f.disabled = busy; });
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      errorBox.hidden = true;
      var firstInvalid = null;
      Object.keys(rules).forEach(function (id) {
        touched[id] = true;
        if (!validate(id) && !firstInvalid) firstInvalid = document.getElementById(id);
      });
      summary.hidden = !firstInvalid;
      if (firstInvalid) { firstInvalid.focus(); return; }

      var data = new FormData(form);
      setBusy(true);
      fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          var firstName = String(data.get('name') || '').trim().split(/\s+/)[0];
          var title = $('#form-success-title');
          title.textContent = firstName ? 'Danke, ' + firstName + '!' : 'Danke!';
          $('#form-card').hidden = true;
          $('#form-success').hidden = false;
          title.focus();
        })
        .catch(function () {
          setBusy(false);
          errorBox.hidden = false;
        });
    });
  }
})();

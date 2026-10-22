/*! © 2026 Zalezigo · Desarrollo web (zalezigo21@gmail.com). Todos los derechos reservados. Prohibida su copia, reproducción o reutilización sin autorización por escrito. */
/* Grupo Chema Ballester — comportamiento común de las tres webs. Sin dependencias. */
(function () {
  'use strict';
  var nav = document.querySelector('.nav');

  // ?final oculta las marcas de prototipo (fotos provisionales, notas)
  if (/[?&]final\b/.test(location.search)) document.body.classList.add('final');

  // Año del copyright siempre actualizado
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Navbar: transparente sobre la foto, sólido al desplazarse
  function onScroll() { nav.classList.toggle('is-solid', window.scrollY > 24); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Desplegables (Servicios, Grupo)
  var openDrop = null;
  function closeDrop() {
    if (!openDrop) return;
    openDrop.setAttribute('aria-expanded', 'false');
    document.getElementById(openDrop.getAttribute('aria-controls')).classList.remove('is-open');
    openDrop = null;
  }
  document.querySelectorAll('[data-dropdown]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var was = openDrop === btn;
      closeDrop();
      if (!was) {
        btn.setAttribute('aria-expanded', 'true');
        document.getElementById(btn.getAttribute('aria-controls')).classList.add('is-open');
        openDrop = btn;
      }
    });
  });
  document.addEventListener('click', function (e) { if (openDrop && !e.target.closest('.dropdown')) closeDrop(); });

  // Menú móvil
  var toggle = document.querySelector('.nav-toggle');
  function setMenu(open) {
    nav.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  }
  toggle.addEventListener('click', function () { setMenu(!nav.classList.contains('menu-open')); });
  document.querySelectorAll('.mobile-panel a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  window.addEventListener('resize', function () { if (window.innerWidth > 1080) setMenu(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (openDrop) { var b = openDrop; closeDrop(); b.focus(); }
    if (nav.classList.contains('menu-open')) { setMenu(false); toggle.focus(); }
  });

  // Mapas: solo se cargan cuando el usuario los pide (no alargan la página
  // ni cargan Google Maps antes del consentimiento)
  document.querySelectorAll('[data-map]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var box = document.getElementById(btn.getAttribute('aria-controls'));
      var open = !box.classList.contains('is-open');
      if (open && !box.firstChild) {
        var f = document.createElement('iframe');
        f.title = 'Mapa: ' + btn.dataset.name;
        f.loading = 'lazy';
        f.referrerPolicy = 'no-referrer-when-downgrade';
        f.src = 'https://www.google.com/maps?output=embed&q=' + encodeURIComponent(btn.dataset.map);
        box.appendChild(f);
      }
      box.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.querySelector('span').textContent = open ? 'Ocultar mapa' : 'Ver mapa';
    });
  });

  // Configurar cookies. En WordPress se sustituye por la llamada al gestor
  // de consentimiento que ya usa cada web (p. ej. Complianz en RIBU).
  var dlg = document.getElementById('cookie-dialog');
  document.querySelectorAll('[data-cookie-settings]').forEach(function (b) {
    b.addEventListener('click', function () {
      if (typeof window.gcbOpenConsent === 'function') return window.gcbOpenConsent();
      if (dlg && dlg.showModal) dlg.showModal();
    });
  });

  // Lupa: ampliar la foto del producto
  var zoomDlg = document.getElementById('zoom-dialog');
  document.querySelectorAll('[data-zoom]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!zoomDlg || !zoomDlg.showModal) { window.open(btn.getAttribute('data-zoom'), '_blank'); return; }
      zoomDlg.querySelector('img').src = btn.getAttribute('data-zoom');
      zoomDlg.showModal();
    });
  });
  if (zoomDlg) zoomDlg.addEventListener('click', function (e) { if (e.target === zoomDlg) zoomDlg.close(); });

  // Formularios por pasos (Calcula tu precio): cada paso se valida antes de avanzar
  document.querySelectorAll('form[data-steps]').forEach(function (form) {
    var steps = [].slice.call(form.querySelectorAll('fieldset[data-step]'));
    var marks = [].slice.call(form.querySelectorAll('.stepper li'));
    var current = 0;
    function show(n) {
      steps.forEach(function (f, i) { f.hidden = i !== n; });
      marks.forEach(function (m, i) {
        m.classList.toggle('is-active', i === n);
        m.classList.toggle('is-done', i < n);
        if (i === n) m.setAttribute('aria-current', 'step'); else m.removeAttribute('aria-current');
      });
      current = n;
      var first = steps[n].querySelector('input, select, textarea, button');
      if (first) first.focus({preventScroll: true});
    }
    form.addEventListener('click', function (e) {
      if (e.target.closest('[data-next]')) {
        var fields = [].slice.call(steps[current].querySelectorAll('input, select, textarea'));
        for (var i = 0; i < fields.length; i++) { if (!fields[i].checkValidity()) { fields[i].reportValidity(); return; } }
        show(Math.min(current + 1, steps.length - 1));
      } else if (e.target.closest('[data-back]')) {
        show(Math.max(current - 1, 0));
      }
    });
  });

  // Formularios del prototipo: validan pero no envían datos
  document.querySelectorAll('form[data-proto]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = form.querySelector('.form-status');
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      status.classList.remove('error');
      status.textContent = 'Prototipo: datos válidos. En la web real se enviarán con el formulario actual de WordPress.';
    });
  });
})();

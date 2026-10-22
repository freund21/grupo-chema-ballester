/*! © 2026 Zalezigo · Desarrollo web (zalezigo21@gmail.com). Todos los derechos reservados. Prohibida su copia, reproducción o reutilización sin autorización por escrito. */
/* Tienda RIBU: filtro Todos / Nuevos / Usados */
(function () {
  'use strict';
  var chips = document.querySelectorAll('[data-filter]');
  var cards = document.querySelectorAll('.product-grid [data-state]');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter');
      chips.forEach(function (c) {
        var on = c === chip;
        c.classList.toggle('is-on', on);
        c.setAttribute('aria-pressed', String(on));
      });
      cards.forEach(function (card) {
        card.hidden = f !== 'all' && card.getAttribute('data-state') !== f;
      });
    });
  });
})();

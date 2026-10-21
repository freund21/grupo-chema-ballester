/* Distancias kilométricas desde el Puerto de Valencia (Logística Chema Ballester).
   Datos: assets/data/distancias.js → window.GCB_DISTANCIAS = [[población, cp, provincia, km], …] */
(function () {
  'use strict';
  var data = window.GCB_DISTANCIAS || [];
  var input = document.getElementById('dist-q');
  var list = document.getElementById('dist-list');
  var result = document.getElementById('dist-result');
  if (!input || !data.length) return;

  var norm = function (s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim(); };
  var index = data.map(function (r) { return norm(r[0]) + ' ' + r[1]; });
  var maxKm = data.reduce(function (m, r) { return Math.max(m, r[3]); }, 1);
  var matches = [];
  var active = -1;

  function close() {
    list.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
    active = -1;
  }

  function highlight(i) {
    var items = list.children;
    if (active >= 0 && items[active]) items[active].setAttribute('aria-selected', 'false');
    active = i;
    if (items[i]) {
      items[i].setAttribute('aria-selected', 'true');
      input.setAttribute('aria-activedescendant', items[i].id);
      items[i].scrollIntoView({block: 'nearest'});
    }
  }

  function search() {
    var q = norm(input.value);
    var digits = /^\d+$/.test(q);
    if ((digits && q.length < 3) || (!digits && q.length < 2)) { close(); return; }
    var starts = [], contains = [];
    for (var i = 0; i < data.length && starts.length < 8; i++) {
      var name = norm(data[i][0]);
      if (digits ? data[i][1].indexOf(q) === 0 : name.indexOf(q) === 0) starts.push(i);
      else if (!digits && contains.length < 8 && index[i].indexOf(q) > -1) contains.push(i);
    }
    matches = starts.concat(contains).slice(0, 8);
    list.innerHTML = '';
    if (!matches.length) {
      list.innerHTML = '<li class="dist-empty" role="option" aria-disabled="true">Sin resultados. Consulte con el departamento comercial.</li>';
    }
    matches.forEach(function (idx, n) {
      var r = data[idx];
      var li = document.createElement('li');
      li.id = 'dist-opt-' + n;
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', 'false');
      li.innerHTML = '<span></span><small></small>';
      li.firstChild.textContent = r[0];
      li.lastChild.textContent = [r[1], r[2]].filter(Boolean).join(' · ');
      li.addEventListener('mousedown', function (e) { e.preventDefault(); select(idx); });
      list.appendChild(li);
    });
    list.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    active = -1;
  }

  function fmt(n) { return n.toLocaleString('es-ES'); }

  function select(idx) {
    var r = data[idx];
    input.value = r[0] + (r[1] ? ' (' + r[1] + ')' : '');
    close();
    var f = function (k) { return result.querySelector('[data-f="' + k + '"]'); };
    f('km').textContent = fmt(r[3]) + ' km';
    f('dest').textContent = r[0];
    f('poblacion').textContent = r[0];
    f('cp').textContent = r[1] || '—';
    f('provincia').textContent = r[2] || '—';
    result.hidden = false;
    var line = result.querySelector('.route-line');
    line.style.setProperty('--p', '0');
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      line.style.setProperty('--p', String(Math.max(0.08, r[3] / maxKm)));
    }); });
    result.querySelector('.dist-status').textContent = r[0] + ': ' + fmt(r[3]) + ' kilómetros desde el Puerto de Valencia';
  }

  input.addEventListener('input', search);
  input.addEventListener('keydown', function (e) {
    if (list.hidden) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); highlight(Math.min(active + 1, matches.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); highlight(Math.max(active - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); if (matches.length) select(matches[Math.max(active, 0)]); }
    else if (e.key === 'Escape') { close(); }
  });
  input.addEventListener('blur', function () { setTimeout(close, 120); });
})();

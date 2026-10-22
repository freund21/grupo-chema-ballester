/*! © 2026 Zalezigo · Desarrollo web (zalezigo21@gmail.com). Todos los derechos reservados. Prohibida su copia, reproducción o reutilización sin autorización por escrito. */
(() => {
  const panels = document.querySelector('.panels');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let busy = false;
  let timer;
  let destination;
  const reset = () => {
    clearTimeout(timer);
    busy = false;
    destination = null;
    panels?.classList.remove('leaving');
    panels?.removeAttribute('aria-busy');
    document.querySelector('.transition-cover')?.remove();
    const status = document.querySelector('#navigation-status');
    if (status) status.textContent = '';
  };
  const finish = () => { if (destination) location.assign(destination); };
  panels?.addEventListener('click', event => {
    const link = event.target.closest('a.panel');
    if (!link || event.defaultPrevented) return;
    if (busy) { event.preventDefault(); return; }
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank' || motion.matches) return;
    event.preventDefault();
    busy = true;
    destination = link.href;
    const from = link.getBoundingClientRect();
    const to = panels.getBoundingClientRect();
    const cover = document.createElement('div');
    cover.className = `transition-cover ${link.dataset.company}`;
    cover.style.setProperty('--brand', getComputedStyle(link).getPropertyValue('--brand'));
    cover.style.setProperty('--rgb', getComputedStyle(link).getPropertyValue('--rgb'));
    cover.setAttribute('aria-hidden', 'true');
    cover.append(link.querySelector('img').cloneNode(), link.querySelector('.tint').cloneNode());
    Object.assign(cover.style, {left:`${from.left}px`,top:`${from.top}px`,width:`${from.width}px`,height:`${from.height}px`});
    document.body.append(cover);
    panels.classList.add('leaving');
    panels.setAttribute('aria-busy', 'true');
    document.querySelector('#navigation-status').textContent = `Abriendo ${link.dataset.name}`;
    if (cover.animate) cover.animate([
      {left:`${from.left}px`,top:`${from.top}px`,width:`${from.width}px`,height:`${from.height}px`},
      {left:`${to.left}px`,top:`${to.top}px`,width:`${to.width}px`,height:`${to.height}px`}
    ], {duration:500,easing:'cubic-bezier(.65,0,.35,1)',fill:'forwards'});
    timer = setTimeout(finish, 510);
  });
  motion.addEventListener('change', event => { if (event.matches && busy) finish(); });
  addEventListener('pageshow', reset);
})();

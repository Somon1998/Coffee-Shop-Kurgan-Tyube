import { qsa, on } from '../../core/dom.js';
import { createDisposables } from '../../core/disposables.js';

export function initTabs({
  itemSelector,
  itemActiveClass,
  bodyItemSelector,
  bodyActiveClass
} = {}) {
  const items = qsa(itemSelector);
  const bodies = qsa(bodyItemSelector);

  if (!items.length || !bodies.length) return () => {};

  const d = createDisposables();

  const deactivateAll = () => {
    items.forEach(i => i.classList.remove(itemActiveClass));
    bodies.forEach(b => b.classList.remove(bodyActiveClass));
  };

  items.forEach((item) => {
    d.add(on(item, 'click', () => {
      const id = item.getAttribute('data-id');
      if (!id) return;

      const activeBody = document.getElementById(id);
      if (!activeBody) return;

      deactivateAll();
      item.classList.add(itemActiveClass);
      activeBody.classList.add(bodyActiveClass);
    }));
  });

  return () => d.dispose();
}

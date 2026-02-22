import { qs, on, getScrollY, toggleClass, scrollToY } from '../../core/dom.js';
import { createDisposables } from '../../core/disposables.js';

export function initScrollTop({ selector, visibleClass, threshold } = {}) {
  const btn = qs(selector);
  if (!btn) return () => {};

  const d = createDisposables();

  const update = () => {
    toggleClass(btn, visibleClass, getScrollY() >= (threshold ?? 100));
  };

  update();
  d.add(on(window, 'scroll', update, { passive: true }));

  d.add(on(btn, 'click', () => {
    scrollToY(0, { behavior: 'smooth' });
  }));

  return () => d.dispose();
}

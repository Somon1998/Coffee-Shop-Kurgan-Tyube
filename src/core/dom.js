export const qs = (selector, root = document) => root.querySelector(selector);
export const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

export function on(el, event, handler, options) {
  el.addEventListener(event, handler, options);
  return () => el.removeEventListener(event, handler, options);
}

export function toggleClass(el, className, force) {
  el.classList.toggle(className, force);
}

export function isMobile(breakpointPx = 900) {
  return window.matchMedia(`(max-width: ${breakpointPx}px)`).matches;
}

export function scrollToY(y, { behavior = 'smooth' } = {}) {
  window.scrollTo({ top: y, behavior });
}

export function getScrollY() {
  return window.scrollY || document.documentElement.scrollTop || 0;
}

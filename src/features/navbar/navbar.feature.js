import { qs, qsa, on, toggleClass, isMobile, getScrollY, scrollToY } from '../../core/dom.js';
import { createDisposables } from '../../core/disposables.js';

export function initNavbar({
  navSelector,
  navLinksSelector,
  navIconSelector,
  navItemSelector,
  scrolledClass,
  openClass,
  scrollOffset,
  mobileBreakpoint,
  scrolledThreshold
} = {}) {
  const nav = qs(navSelector);
  const navLinks = qs(navLinksSelector);
  const navIcon = qs(navIconSelector);
  const navItems = qsa(navItemSelector);

  if (!nav || !navLinks || !navIcon) return () => {};

  const d = createDisposables();

  const closeMenu = () => navLinks.classList.remove(openClass);
  const toggleMenu = () => navLinks.classList.toggle(openClass);

  // mobile menu open/close
  d.add(on(navIcon, 'click', (e) => {
    e.stopPropagation();
    toggleMenu();
  }));

  // close on outside click
  d.add(on(document, 'click', (e) => {
    const target = e.target;
    const insideMenu = target.closest(navLinksSelector);
    const insideIcon = target.closest(navIconSelector);
    if (!insideMenu && !insideIcon) closeMenu();
  }));

  // close on ESC
  d.add(on(document, 'keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  }));

  // nav scrolled state
  const applyScrolled = () => {
    toggleClass(nav, scrolledClass, getScrollY() > (scrolledThreshold ?? 55));
  };
  applyScrolled();
  d.add(on(window, 'scroll', applyScrolled, { passive: true }));

  // smooth scrolling for anchor links
  if (document.body.classList.contains('website')) {
    navItems.forEach((item) => {
      d.add(on(item, 'click', (e) => {
        const href = item.getAttribute('href') || '';
        if (!href.startsWith('#')) return;

        const targetEl = document.querySelector(href);
        if (!targetEl) return;

        e.preventDefault();

        const y = targetEl.getBoundingClientRect().top + window.pageYOffset - (scrollOffset ?? 0);
        scrollToY(y, { behavior: 'smooth' });

        // update URL without jumping
        history.pushState(null, '', href);

        if (isMobile(mobileBreakpoint)) {
          closeMenu();
        }
      }));
    });
  }

  return () => d.dispose();
}

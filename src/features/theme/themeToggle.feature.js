import { qs, on } from '../../core/dom.js';
import { createLogger } from '../../core/logger.js';

const log = createLogger('theme-toggle');

function getSystemTheme() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

function updateButtonIcon(button, theme) {
  // If current theme is dark -> show sun (switch to light)
  const icon = theme === 'dark'
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';

  button.innerHTML = icon;
  button.setAttribute('aria-pressed', String(theme === 'dark'));
  button.setAttribute('title', theme === 'dark' ? 'Switch to light' : 'Switch to dark');
}

export function initThemeToggle({ selector, storageKey, defaultTheme = 'light' } = {}) {
  const button = qs(selector);
  if (!button) return () => {};

  const saved = localStorage.getItem(storageKey);
  const initial = saved === 'dark' || saved === 'light' ? saved : (defaultTheme || getSystemTheme());

  setTheme(initial);
  updateButtonIcon(button, initial);

  const offClick = on(button, 'click', () => {
    const current = document.documentElement.getAttribute('data-theme') || defaultTheme;
    const next = current === 'dark' ? 'light' : 'dark';

    setTheme(next);
    localStorage.setItem(storageKey, next);
    updateButtonIcon(button, next);
  });

  // optional: sync when OS theme changes (only if user didn't choose manually)
  const media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  const offMedia = media
    ? on(media, 'change', (e) => {
        const savedNow = localStorage.getItem(storageKey);
        if (savedNow) return; // user choice wins
        const next = e.matches ? 'dark' : 'light';
        setTheme(next);
        updateButtonIcon(button, next);
      })
    : () => {};

  log.log('initialized');

  return () => {
    offClick();
    offMedia();
  };
}

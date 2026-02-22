import { qs } from '../../core/dom.js';
import { createLogger } from '../../core/logger.js';

const log = createLogger('review-swiper');

export function initReviewSwiper(cfg) {
  if (typeof window.Swiper !== 'function') {
    log.warn('Swiper is not loaded (CDN). Skipping.');
    return () => {};
  }

  if (!cfg?.selector) return () => {};
  const el = qs(cfg.selector);
  if (!el) return () => {};

  let instance;

  try {
    instance = new window.Swiper(cfg.selector, cfg.options || {});
  } catch (e) {
    log.warn('Failed to init swiper', cfg.selector, e);
    return () => {};
  }

  return () => {
    try { instance?.destroy(true, true); } catch (e) { /* noop */ }
  };
}

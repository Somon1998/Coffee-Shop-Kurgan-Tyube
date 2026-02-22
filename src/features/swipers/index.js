import { createDisposables } from '../../core/disposables.js';
import { initHomeSwiper } from './homeSwiper.feature.js';
import { initReviewSwiper } from './reviewSwiper.feature.js';

export function initSwipers({ home, review } = {}) {
  const d = createDisposables();

  d.add(initHomeSwiper(home));
  d.add(initReviewSwiper(review));

  return () => d.dispose();
}

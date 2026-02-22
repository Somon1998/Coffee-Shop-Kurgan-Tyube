import { createDisposables } from '../core/disposables.js';

import { initNavbar } from '../features/navbar/index.js';
import { initTabs } from '../features/tabs/index.js';
import { initSwipers } from '../features/swipers/index.js';
import { initScrollTop } from '../features/scrollTop/index.js';
import { initThemeToggle } from '../features/theme/index.js';

export function createRuntime({ container, config } = {}) {
  const d = createDisposables();
  let started = false;

  const start = () => {
    if (started) return;
    started = true;

    d.add(initThemeToggle(config?.theme, { container }));
    d.add(initNavbar(config?.navbar, { container }));
    d.add(initTabs(config?.tabs, { container }));
    d.add(initSwipers(config?.swipers, { container }));
    d.add(initScrollTop(config?.scrollTop, { container }));
  };

  const stop = () => {
    d.dispose();
    started = false;
  };

  return { start, stop };
}

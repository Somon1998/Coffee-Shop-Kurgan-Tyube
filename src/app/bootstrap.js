import { config as defaultConfig } from './config.js';
import { createRuntime } from './runtime.js';

import { createContainer } from '../core/container.js';
import { createEventBus } from '../core/eventBus.js';
import { createStorage } from '../core/storage.js';
import { createLogger } from '../core/logger.js';

export function bootstrap(configOverrides = {}) {
  const container = createContainer();

  // core services (optional, but handy as the app grows)
  container.register('bus', createEventBus());
  container.register('storage', createStorage(window.localStorage));
  container.register('log', createLogger('app'));

  const config = {
    ...defaultConfig,
    ...configOverrides,
  };

  container.register('config', config);

  const runtime = createRuntime({ container, config });
  runtime.start();

  window.addEventListener('beforeunload', () => runtime.stop());

  return runtime;
}

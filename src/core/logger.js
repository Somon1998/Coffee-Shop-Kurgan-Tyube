export function createLogger(scope) {
  const enabled = () => Boolean(window.__DEBUG__);
  const prefix = `[${scope}]`;

  return {
    log: (...args) => enabled() && console.log(prefix, ...args),
    warn: (...args) => enabled() && console.warn(prefix, ...args),
    error: (...args) => enabled() && console.error(prefix, ...args),
  };
}

export function createDisposables() {
  const items = new Set();

  return {
    add(disposeFn) {
      if (typeof disposeFn !== 'function') return;
      items.add(disposeFn);
      return disposeFn;
    },
    dispose() {
      items.forEach(fn => {
        try { fn(); } catch (e) { /* noop */ }
      });
      items.clear();
    }
  };
}

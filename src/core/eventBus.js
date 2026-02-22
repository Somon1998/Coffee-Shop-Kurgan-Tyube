export function createEventBus() {
  const listeners = new Map();

  const on = (event, handler) => {
    if (!listeners.has(event)) listeners.set(event, new Set());
    listeners.get(event).add(handler);
    return () => off(event, handler);
  };

  const off = (event, handler) => {
    const set = listeners.get(event);
    if (!set) return;
    set.delete(handler);
    if (set.size === 0) listeners.delete(event);
  };

  const emit = (event, payload) => {
    const set = listeners.get(event);
    if (!set) return;

    // copy to avoid issues if a handler unsubscribes during emit
    [...set].forEach((fn) => {
      try { fn(payload); } catch (e) { /* noop */ }
    });
  };

  return { on, off, emit };
}

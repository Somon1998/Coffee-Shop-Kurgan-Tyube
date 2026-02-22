export function createStore(initialState = {}) {
  let state = { ...initialState };
  const subs = new Set();

  const getState = () => state;

  const setState = (partial) => {
    const next = typeof partial === 'function' ? partial(state) : partial;
    state = { ...state, ...next };
    subs.forEach((fn) => {
      try { fn(state); } catch (e) { /* noop */ }
    });
  };

  const subscribe = (fn) => {
    subs.add(fn);
    return () => subs.delete(fn);
  };

  return { getState, setState, subscribe };
}

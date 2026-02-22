export function createStorage(storage = window.localStorage) {
  const get = (key, fallback = null) => {
    try {
      const raw = storage.getItem(key);
      if (raw == null) return fallback;
      return JSON.parse(raw);
    } catch (e) {
      // if it wasn't JSON
      try {
        const raw = storage.getItem(key);
        return raw == null ? fallback : raw;
      } catch (err) {
        return fallback;
      }
    }
  };

  const set = (key, value) => {
    try {
      storage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // fallback to string
      storage.setItem(key, String(value));
    }
  };

  const remove = (key) => {
    try { storage.removeItem(key); } catch (e) { /* noop */ }
  };

  return { get, set, remove };
}

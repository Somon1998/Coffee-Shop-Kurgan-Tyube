export function createContainer(initial = {}) {
  const map = new Map(Object.entries(initial));

  return {
    register(key, value) {
      map.set(key, value);
      return value;
    },
    get(key) {
      if (!map.has(key)) {
        throw new Error(`Container: service not found: ${String(key)}`);
      }
      return map.get(key);
    },
    has(key) {
      return map.has(key);
    },
    remove(key) {
      map.delete(key);
    },
    entries() {
      return Array.from(map.entries());
    },
  };
}

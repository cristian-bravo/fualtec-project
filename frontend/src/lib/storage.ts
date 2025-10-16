const isBrowser = typeof window !== 'undefined';

type StorageValue = string;

const safeWindowStorage = () => {
  if (!isBrowser) {
    return null;
  }
  return window.localStorage;
};

export const storage = {
  get: (key: string): StorageValue | null => {
    const store = safeWindowStorage();
    if (!store) return null;
    return store.getItem(key);
  },
  set: (key: string, value: StorageValue) => {
    const store = safeWindowStorage();
    if (!store) return;
    store.setItem(key, value);
  },
  remove: (key: string) => {
    const store = safeWindowStorage();
    if (!store) return;
    store.removeItem(key);
  }
};

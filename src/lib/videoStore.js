// IndexedDB blob storage for uploaded videos. localStorage caps out
// around 5 MB, so video files live here instead; only their metadata
// goes through DataContext/localStorage.
const DB_NAME = 'cp-media';
const STORE = 'videos';

function openDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) {
        req.result.createObjectStore(STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function tx(db, mode, fn) {
  return new Promise((resolve, reject) => {
    const t = db.transaction(STORE, mode);
    const store = t.objectStore(STORE);
    const req = fn(store);
    t.oncomplete = () => resolve(req?.result);
    t.onerror = () => reject(t.error);
  });
}

export async function putVideoBlob(id, blob) {
  const db = await openDb();
  return tx(db, 'readwrite', (s) => s.put(blob, id));
}

export async function getVideoBlob(id) {
  const db = await openDb();
  return tx(db, 'readonly', (s) => s.get(id));
}

export async function deleteVideoBlob(id) {
  const db = await openDb();
  return tx(db, 'readwrite', (s) => s.delete(id));
}

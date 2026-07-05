import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { kittens as seedKittens } from '../data/kittens.js';

const DataContext = createContext(null);

function usePersistent(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key));
      return saved === null || saved === undefined ? initial : saved;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

/**
 * Site-wide data store (kittens, orders, inquiries) persisted to
 * localStorage. The static list in data/kittens.js seeds the store on
 * first visit; after that the admin dashboard is the source of truth.
 */
export function DataProvider({ children }) {
  const [kittens, setKittens] = usePersistent('vc-kittens', seedKittens);
  const [orders, setOrders] = usePersistent('vc-orders', []);
  const [inquiries, setInquiries] = usePersistent('vc-inquiries', []);

  const value = useMemo(
    () => ({
      kittens,
      orders,
      inquiries,

      addKitten: (k) => {
        const id = `${k.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString(36)}`;
        setKittens((prev) => [{ ...k, id }, ...prev]);
        return id;
      },
      updateKitten: (id, patch) =>
        setKittens((prev) => prev.map((k) => (k.id === id ? { ...k, ...patch } : k))),
      deleteKitten: (id) => setKittens((prev) => prev.filter((k) => k.id !== id)),

      addOrder: (order) => {
        const id = `VC-${Date.now().toString().slice(-6)}`;
        setOrders((prev) => [
          { ...order, id, status: 'New', date: new Date().toISOString() },
          ...prev,
        ]);
        return id;
      },
      updateOrder: (id, patch) =>
        setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, ...patch } : o))),
      deleteOrder: (id) => setOrders((prev) => prev.filter((o) => o.id !== id)),

      addInquiry: (inq) =>
        setInquiries((prev) => [
          { ...inq, id: `INQ-${Date.now().toString(36)}`, handled: false, date: new Date().toISOString() },
          ...prev,
        ]),
      updateInquiry: (id, patch) =>
        setInquiries((prev) => prev.map((q) => (q.id === id ? { ...q, ...patch } : q))),
      deleteInquiry: (id) => setInquiries((prev) => prev.filter((q) => q.id !== id)),
    }),
    [kittens, orders, inquiries]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}

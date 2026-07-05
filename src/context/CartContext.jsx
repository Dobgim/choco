import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { kittens } from '../data/kittens.js';

const CartContext = createContext(null);
const STORAGE_KEY = 'vc-cart';

export function CartProvider({ children }) {
  const [ids, setIds] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, [ids]);

  const value = useMemo(() => {
    // Each kitten is one-of-a-kind, so the cart holds unique ids (no quantities).
    const items = ids
      .map((id) => kittens.find((k) => k.id === id))
      .filter(Boolean);
    const subtotal = items.reduce((sum, k) => sum + k.price, 0);

    return {
      items,
      count: items.length,
      subtotal,
      inCart: (id) => ids.includes(id),
      add: (id) => setIds((prev) => (prev.includes(id) ? prev : [...prev, id])),
      remove: (id) => setIds((prev) => prev.filter((x) => x !== id)),
      clear: () => setIds([]),
    };
  }, [ids]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

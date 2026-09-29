import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);
const KEY = 'glamour_cart';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
  });

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(items)); }, [items]);

  function add(product) {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) return prev.map((i) => (i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i));
      return [...prev, { productId: product.id, quantity: 1 }];
    });
  }
  function changeQty(productId, delta) {
    setItems((prev) =>
      prev
        .map((i) => (i.productId === productId ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  }
  function clear() { setItems([]); }

  return <CartContext.Provider value={{ items, add, changeQty, clear }}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}

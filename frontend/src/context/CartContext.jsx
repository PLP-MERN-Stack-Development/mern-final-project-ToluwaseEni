// src/context/CartContext.jsx
import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p._id === product._id);
      if (exists)
        return prev.map((p) =>
          p._id === product._id ? { ...p, qty: p.qty + 1 } : p
        );
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((p) => p._id !== id));

  const updateQty = (id, qty) =>
    setCart((prev) =>
      prev.map((p) => (p._id === id ? { ...p, qty } : p))
    );

  const clearCart = () => setCart([]);

  const total = cart.reduce(
    (s, i) => s + Number(i.price) * (i.qty || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,   // ✅ ADDED — needed for Checkout page
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

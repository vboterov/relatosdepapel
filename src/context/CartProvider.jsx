import { useState } from "react";
import { CartContext } from "./CartContext.jsx";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (book) => {
    setItems((prev) => {
      const idx = prev.findIndex((line) => line.bookId === book.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      }
      return [
        ...prev,
        {
          bookId: book.id,
          title: book.title,
          price: book.price,
          quantity: 1,
        },
      ];
    });
    console.log("[CartProvider] addItem –", book.title);
  };

  const removeItem = (bookId) => {
    setItems((prev) => prev.filter((line) => line.bookId !== bookId));
    console.log("[CartProvider] removeItem –", bookId);
  };

  const clearCart = () => {
    setItems([]);
    console.log("[CartProvider] clearCart");
  };

  const totalUnits = items.reduce((acc, line) => acc + line.quantity, 0);
  const totalPrice = items.reduce((acc, line) => acc + line.price * line.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, totalUnits, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

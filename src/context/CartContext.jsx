
import { createContext } from "react";
import { useContext } from "react";

export const CartContext = createContext();

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) {
      throw new Error("useCart debe usarse dentro de CartProvider");
    }
    return ctx;
  }
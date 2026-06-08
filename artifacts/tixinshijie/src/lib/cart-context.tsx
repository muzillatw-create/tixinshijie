import React, { createContext, useContext, useState, useEffect } from 'react';

type CartContextType = {
  quantity: number;
  setQuantity: (q: number) => void;
  increment: () => void;
  decrement: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => Math.max(1, q - 1));

  return (
    <CartContext.Provider value={{ quantity, setQuantity, increment, decrement }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

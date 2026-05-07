import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {

  const [orders, setOrders] = useState([]);

  const createOrder = (cart, user) => {
    const newOrder = {
      id: `PED-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split('T')[0],
      id_user: user.id_user,
      items: [cart.map((item) => item.title)],
      status: "Pendiente",
      total: cart.reduce((sum, item) => sum + item.price, 0)
    };

    setOrders(prev => [...prev, newOrder]);
  };

  return (
    <OrderContext.Provider value={{ orders, createOrder }}>
      {children}
    </OrderContext.Provider>
  );
}


export const useOrders = () => useContext(OrderContext);
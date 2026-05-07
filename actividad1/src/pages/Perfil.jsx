import { useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { getRecentOrdersForUser } from "../data/orders.js";
import { formatCop } from "../utils/formatCop.js";
import { useOrders } from "../context/OrderContext.jsx";

export default function Perfil() {
  const { user, logout } = useAuth();
  let orders = user ? getRecentOrdersForUser(user.id_user, 5) : [];
  orders = orders.concat(useOrders().orders);

  useEffect(() => {
    document.title = user ? `Relatos de Papel | ${user.name}` : "Relatos de Papel | Perfil";
  }, [user]);

  console.log("[Perfil] render");

  return (
    <div className="page">
      <div className="profile-header">
        <div className="profile-header__avatar" aria-hidden>
          👤
        </div>
        <div>
          <h1>{user.name}</h1>
          <p className="profile-header__email">{user.username}</p>
          <p className="profile-header__email">{user.email}</p>
          <p className="profile-header__meta">
            Cliente desde <strong>{user.memberSince}</strong>
          </p>
          <button type="button" className="profile-header__logout" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </div>

      <section className="page__section">
        <h2>Últimos pedidos</h2>

        {orders.length === 0 ? (
          <p className="orders__empty">Todavía no hay pedidos registrados para este usuario.</p>
        ) : (
          <ul className="orders__list">
            {orders.map((order) => (
              <li key={order.id} className="orders__item">
                <div>
                  <strong>{order.id}</strong>
                  <span className="orders__date">{order.date}</span>
                </div>
                <div className="orders__lines">{order.items.join(", ")}</div>
                <div className="orders__footer">
                  <span className={`orders__status orders__status--${order.status === "Entregado" ? "ok" : "pending"}`}>
                    {order.status}
                  </span>
                  <span className="orders__total">{formatCop(order.total)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

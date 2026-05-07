import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { formatCop } from "../../utils/formatCop.js";
import "./CartPanel.css";

export default function CartPanel() {
  const [expanded, setExpanded] = useState(true);
  const { items, removeItem, totalUnits, totalPrice } = useCart();
  const { user } = useAuth();

  console.log("[CartPanel] render – ítems:", totalUnits);

  return (
    <aside className={`cart-panel ${expanded ? "cart-panel--open" : "cart-panel--collapsed"}`}>
      <div className="cart-panel__header-row">
        <h2 className="cart-panel__title">Tu carrito</h2>
        <button
          type="button"
          className="cart-panel__toggle"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-label={expanded ? "Ocultar contenido del carrito" : "Mostrar contenido del carrito"}
        >
          {totalUnits} ítem{totalUnits !== 1 ? "s" : ""} {expanded ? "▼" : "◀"}
        </button>
      </div>

      <div className="cart-panel__body">
        {items.length === 0 ? (
          <div className="cart-panel__empty">
            <p className="cart-panel__empty-title">Tu carrito está vacío</p>
            <p className="cart-panel__hint">Abre el detalle de un libro y usa “Añadir al carrito”.</p>
            <Link to="/tienda" className="cart-panel__empty-link">
              Ver catálogo
            </Link>
          </div>
        ) : (
          <ul className="cart-panel__list">
            {items.map((line) => (
              <li key={line.bookId} className="cart-panel__line">
                <div>
                  <span className="cart-panel__line-title">{line.title}</span>
                  <span className="cart-panel__meta">
                    {line.quantity} × {formatCop(line.price)}
                  </span>
                </div>
                <button
                  type="button"
                  className="cart-panel__remove"
                  onClick={() => removeItem(line.bookId)}
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        )}

        {items.length > 0 && (
          <div className="cart-panel__footer">
            <p className="cart-panel__total">
              Total <strong>{formatCop(totalPrice)}</strong>
            </p>
            {user ? (
              <Link to="/checkout" className="cart-panel__cta">
                Ir al checkout
              </Link>
            ) : (
              <Link to="/login" className="cart-panel__cta cart-panel__cta--muted">
                Inicia sesión para pagar
              </Link>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}

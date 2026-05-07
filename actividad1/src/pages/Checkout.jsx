import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { formatCop } from "../utils/formatCop.js";
import { useOrders } from "../context/OrderContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  console.log("[Checkout] render");
  const { user } = useAuth();
  const { createOrder } = useOrders();

  const handlePay = () => {
    console.log(user.id_user);
    createOrder(items, user.id_user);
    clearCart();
    setIsSuccessModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsSuccessModalOpen(false);
    navigate("/perfil");
  };

  return (
    <div className="page">
      <h1>Checkout</h1>
      <p className="page__intro">Confirma tu selección</p>

      {items.length === 0 ? (
        <div className="checkout__empty">
          <p>No hay libros en el carrito.</p>
          <Link to="/tienda">Volver a la tienda</Link>
        </div>
      ) : (
        <div className="checkout__card">
          <h2>Resumen del pedido</h2>
          <ul className="checkout__list">
            {items.map((line) => (
              <li key={line.bookId}>
                <span>
                  {line.title}{" "}
                  <small>
                    ({line.quantity} × {formatCop(line.price)})
                  </small>
                </span>
                <span>{formatCop(line.quantity * line.price)}</span>
              </li>
            ))}
          </ul>
          <p className="checkout__total">
            Total: <strong>{formatCop(totalPrice)}</strong>
          </p>
          <button type="button" className="checkout__pay" onClick={handlePay}>
            Confirmar pago
          </button>
        </div>
      )}

      {isSuccessModalOpen ? (
        <div className="checkout-modal__overlay" role="presentation">
          <div
            className="checkout-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-success-title"
            aria-describedby="checkout-success-description"
          >
            <h2 id="checkout-success-title">Pedido realizado</h2>
            <p id="checkout-success-description">
              Gracias por comprar en Relatos de Papel. Tu pedido se registró correctamente.
            </p>
            <button type="button" className="checkout-modal__button" onClick={handleCloseModal}>
              Ir a mi perfil
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

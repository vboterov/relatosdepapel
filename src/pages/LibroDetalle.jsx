import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CartPanel from "../components/CartPanel/CartPanel.jsx";
import { getBookById } from "../data/books.js";
import { useCart } from "../context/CartContext.jsx";
import { getGenreEmoji } from "../utils/genreEmoji.js";
import { formatCop } from "../utils/formatCop.js";

export default function LibroDetalle() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const book = getBookById(bookId);

  useEffect(() => {
    document.title = book ? `Relatos de Papel | ${book.title}` : "Relatos de Papel | Libro";
  }, [book]);

  console.log("📘 [LibroDetalle] render – id:", bookId);

  if (!book) {
    return (
      <div className="page">
        <h1>Libro no encontrado</h1>
        <p className="page__intro">El identificador no existe en el catálogo simulado.</p>
        <Link to="/tienda">Volver a la tienda</Link>
      </div>
    );
  }

  const handleAdd = () => {
    if (book.stock <= 0) return;
    addItem(book);
  };

  const inStock = book.stock > 0;

  return (
    <div className="page page--product">
      <button type="button" className="book-detail__back" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <div className="product-layout">
        <article className="book-detail">
          <div className="book-detail__grid">
            <div className="book-detail__media">
              <span className="book-detail__media-placeholder" aria-hidden>
                {getGenreEmoji(book.genre)}
              </span>
              <span
                className={
                  inStock
                    ? "book-detail__availability book-detail__availability--in"
                    : "book-detail__availability book-detail__availability--out"
                }
              >
                {inStock ? "En existencias" : "Agotado"}
              </span>
            </div>
            <div className="book-detail__main">
              <p className="book-detail__imprint">{book.genre}</p>
              <h1 className="book-detail__title">{book.title}</h1>
              <p className="book-detail__author">
                {book.author} · {book.year}
              </p>
              <p className="book-detail__price-line">
                <p className="book-detail__synopsis">{book.synopsis}</p>
                  {inStock && book.stock < 10 ? (
                    <p className="book-detail__stock-warning" role="status">
                     Solo nos quedan {book.stock} unidades, no te quedes sin el tuyo.
                    </p>
                  ) : null}
                <span className="book-detail__price-value">{formatCop(book.price)}</span>
                <span className="book-detail__price-caption">(COP)</span>
              </p>
              <ul className="book-detail__meta">
                <li>
                  <span>Formato</span> {book.format}
                </li>
                <li>
                  <span>Idioma</span> {book.language}
                </li>
                <li>
                  <span>Unidades</span> {inStock ? `${book.stock} disponibles` : "Sin stock"}
                </li>
              </ul>
              
              

              <button
                type="button"
                className="book-detail__add"
                onClick={handleAdd}
                disabled={!inStock}
              >
                {inStock ? "Añadir al carrito" : "No disponible"}
              </button>
            </div>
          </div>
        </article>

        <CartPanel />
      </div>
    </div>
  );
}

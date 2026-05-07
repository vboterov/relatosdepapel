import { Link } from "react-router-dom";
import { getGenreEmoji } from "../../utils/genreEmoji.js";
import { formatCop } from "../../utils/formatCop.js";
import "./BookCard.css";

export default function BookCard({ book, hideEmoji = false, hidePrice = false, rank }) {
  console.log("[BookCard] render –", book.title);

  const ranked = typeof rank === "number" && rank >= 1;

  if (ranked) {
    return (
      <article className="book-card book-card--ranked">
        <Link
          to={`/libros/${book.id}`}
          className="book-card__link"
          aria-label={`${rank}. ${book.title}, ${book.author}`}
        >
          <div className="book-card__body">
            <div className="book-card__rank-row">
              <span className="book-card__rank" aria-hidden>
                {rank}.
              </span>
              <div className="book-card__rank-text">
                <h3 className="book-card__title">{book.title}</h3>
                <p className="book-card__author">{book.author}</p>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  const inStock = book.stock > 0;

  return (
    <article className="book-card">
      <Link to={`/libros/${book.id}`} className="book-card__link">
        {!hideEmoji && (
          <div className="book-card__media" aria-hidden>
            <span className="book-card__media-inner">{getGenreEmoji(book.genre)}</span>
          </div>
        )}
        <div className="book-card__body">
          <span
            className={
              inStock ? "book-card__availability book-card__availability--in" : "book-card__availability book-card__availability--out"
            }
          >
            {inStock ? "En existencias" : "Agotado"}
          </span>
          <p className="book-card__imprint">{book.genre}</p>
          <h3 className="book-card__title">{book.title}</h3>
          <p className="book-card__author">{book.author}</p>
          {!hidePrice && (
            <div className="book-card__price-block">
              <span className="book-card__price">{formatCop(book.price)}</span>
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}

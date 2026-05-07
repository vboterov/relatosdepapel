import BookCard from "../BookCard/BookCard.jsx";

export default function BookGrid({ books, hideEmoji = false, hidePrice = false, numbered = false }) {
  console.log("[BookGrid] render , books.length libros: ", books.length);

  if (books.length === 0) {
    return <p className="book-grid__empty">No hay libros que coincidan con lo buscado.</p>;
  }

  return (
    <div className="book-grid">
      {books.map((book, index) => (
        <BookCard
          key={book.id}
          book={book}
          hideEmoji={hideEmoji}
          hidePrice={hidePrice}
          rank={numbered ? index + 1 : undefined}
        />
      ))}
    </div>
  );
}

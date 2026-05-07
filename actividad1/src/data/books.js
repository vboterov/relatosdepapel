import { libros } from "./booksCatalog.js";

/**
 * Adaptador: el archivo `librosCatalog.js` usa el esquema de la “base de datos”
 * (titulo, genero, precio_cop, …). Aquí lo normalizamos al modelo que consume la UI.
 */
export function libroToBook(libro) {
  return {
    id: String(libro.id),
    title: libro.titulo,
    genre: libro.genero,
    language: libro.idioma,
    synopsis: libro.descripcion,
    author: libro.autor,
    /** Precio en pesos colombianos (entero), tal como viene del catálogo */
    price: libro.precio_cop,
    format: libro.formato,
    stock: libro.stock,
    year: libro.publicacion,
  };
}

export const books = libros.map(libroToBook);

export const bookCategories = [...new Set(books.map((b) => b.genre))].sort((a, b) =>
  a.localeCompare(b, "es")
);

export const bookLanguages = [...new Set(books.map((b) => b.language))].sort((a, b) =>
  a.localeCompare(b, "es")
);

export function getBookById(bookId) {
  return books.find((b) => b.id === String(bookId)) ?? null;
}

/** Top N por stock disponible (simula popularidad con datos mock). */
export function getTopBooks(limit = 3) {
  return [...books]
    .sort((a, b) => {
      if (b.stock !== a.stock) return b.stock - a.stock;
      return a.title.localeCompare(b.title, "es");
    })
    .slice(0, limit);
}

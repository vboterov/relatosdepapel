/** Emoji por género del catálogo `librosCatalog.js` */
const GENRE_EMOJI = {
  Ficción: "📖",
  "Ciencia Ficción": "🚀",
  Fantasía: "🐉",
  "No Ficción": "📚",
  Misterio: "🔍",
  Biografía: "👤",
  Historia: "🏛️",
  Autoayuda: "🌱",
  Narrativa: "📖",
  Ensayo: "📝",
  Poesía: "✒️",
  "Ciencia ficción": "🚀",
  Thriller: "🔦",
  Infantil: "🧸",
};

export function getGenreEmoji(genre) {
  return GENRE_EMOJI[genre] ?? "📚";
}

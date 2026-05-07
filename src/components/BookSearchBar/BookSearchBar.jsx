export default function BookSearchBar({ value, onChange }) {
  console.log("[BookSearchBar] render");

  return (
    <div className="book-search">
      <label htmlFor="book-search-input" className="visually-hidden">
        Buscar por título
      </label>
      <input
        id="book-search-input"
        type="search"
        className="book-search__input"
        placeholder="Buscar por título…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
    </div>
  );
}

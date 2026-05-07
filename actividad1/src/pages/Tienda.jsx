import { useEffect, useMemo, useState } from "react";
import BookSearchBar from "../components/BookSearchBar/BookSearchBar.jsx";
import BookGrid from "../components/BookGrid/BookGrid.jsx";
import CartPanel from "../components/CartPanel/CartPanel.jsx";
import CategoryFilterBar from "../components/CategoryFilterBar/CategoryFilterBar.jsx";
import { books, bookCategories, bookLanguages } from "../data/books.js";

export default function Tienda() {
  const [titleQuery, setTitleQuery] = useState("");
  const [category, setCategory] = useState(null);
  const [language, setLanguage] = useState(null);

  const filtered = useMemo(() => {
    let list = books;
    if (category) {
      list = list.filter((b) => b.genre === category);
    }
    if (language) {
      list = list.filter((b) => b.language === language);
    }
    const q = titleQuery.trim().toLowerCase();
    if (q) {
      list = list.filter((b) => b.title.toLowerCase().includes(q));
    }
    return list;
  }, [titleQuery, category, language]);

  useEffect(() => {
    const q = titleQuery.trim();
    const facets = [category, language].filter(Boolean);
    let title = "Relatos de Papel | Tienda";
    if (facets.length && q) {
      title = `Relatos de Papel | ${facets.join(" · ")} · “${q}”`;
    } else if (facets.length) {
      title = `Relatos de Papel | ${facets.join(" · ")}`;
    } else if (q) {
      title = `Relatos de Papel | Buscar “${q}”`;
    }
    document.title = title;
  }, [titleQuery, category, language]);

  const qVisible = titleQuery.trim();

  console.log("[Tienda] render – filtrados:", filtered.length);

  const resultsTitle =
    qVisible || category || language
      ? [
          qVisible && `“${qVisible}”`,
          category || null,
          language || null,
        ]
          .filter(Boolean)
          .join(" · ")
      : null;

  return (
    <div className="page page--catalog">
      <div className="catalog-layout">
        <aside className="catalog-filters" aria-label="Filtros">
          <p className="catalog-filters__title">Buscar</p>
          <div className="catalog-filters__section">
            <p className="catalog-filters__section-heading">Título del libro</p>
            <BookSearchBar value={titleQuery} onChange={setTitleQuery} />
          </div>
          <div className="catalog-filters__section catalog-filters__section--category">
          <p className="catalog-filters__title">Filtrar</p>
            <CategoryFilterBar
              categories={bookCategories}
              selectedCategory={category}
              onCategoryChange={setCategory}
            />
          </div>
          <div className="catalog-filters__section catalog-filters__section--category">
            <CategoryFilterBar
              categories={bookLanguages}
              selectedCategory={language}
              onCategoryChange={setLanguage}
              sectionLabel="Idioma"
              ariaLabel="Filtrar por idioma"
              allLabel="Todos"
            />
          </div>
        </aside>

        <div className="catalog-main">
          <header className="catalog-results-head">
            <h1 className="catalog-results-head__title">
              {resultsTitle ? `Resultados: ${resultsTitle}` : "Catálogo de libros"}
            </h1>
            <div className="catalog-results-head__toolbar">
              <span className="catalog-results-head__count">{filtered.length} resultados</span>
            </div>
          </header>
          <p className="catalog-results-head__hint">
            Pulsa un libro para ver el detalle. Solo puedes agregarlos al carrito desde la página del libro.
          </p>
          <BookGrid books={filtered} />
        </div>

        <CartPanel />
      </div>
    </div>
  );
}

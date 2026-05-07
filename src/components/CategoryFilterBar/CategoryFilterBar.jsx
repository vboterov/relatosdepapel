import { useId } from "react";

export default function CategoryFilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
  sectionLabel = "Categoría",
  ariaLabel = "Filtrar por categoría",
  allLabel = "Todas",
}) {
  console.log("[CategoryFilterBar] render");

  const labelId = useId();

  return (
    <div className="category-bar category-bar--stacked" role="group" aria-label={ariaLabel}>
      <span className="category-bar__label" id={labelId}>
        {sectionLabel}
      </span>
      <div className="category-bar__chips" aria-labelledby={labelId}>
        <button
          type="button"
          className={`category-bar__chip ${selectedCategory === null ? "category-bar__chip--active" : ""}`}
          onClick={() => onCategoryChange(null)}
        >
          {allLabel}
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`category-bar__chip ${selectedCategory === cat ? "category-bar__chip--active" : ""}`}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

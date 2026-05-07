import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import BookGrid from "../components/BookGrid/BookGrid.jsx";
import { getTopBooks } from "../data/books.js";

export default function Landing() {
  const topBooks = useMemo(() => getTopBooks(3), []);

  useEffect(() => {
    document.title = "Relatos de Papel | Bienvenida";
  }, []);

  console.log("[Landing] render");

  return (
    <div className="landing-page">
      <section className="landing-hero" aria-labelledby="landing-tagline">
        <div className="landing-hero__grid">
          <div className="landing-hero__logo-col">
            <img src="/logo.png" alt="Relatos de Papel" className="landing-hero__logo" decoding="async" />
          </div>
          <div className="landing-hero__content">
            <p id="landing-tagline" className="landing-hero__tagline">
              Tu librería en línea: descubre títulos, guarda favoritos en el carrito y finaliza la compra cuando
              quieras. Vive cada historia como si fuera la primera página.
            </p>
            <div className="landing-hero__actions">
              <Link to="/tienda" className="landing-hero__btn landing-hero__btn--primary">
                <h2>Explora el catálogo</h2>
                <p>En la tienda verás una selección de libros con búsqueda por título</p>
              </Link>
              <Link to="/login" className="landing-hero__btn landing-hero__btn--secondary">
                <h2>¿Ya tienes una cuenta?</h2>
                <p>Inicia sesión o crea una cuenta</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-top" aria-labelledby="landing-top-title">
        <div className="landing-top__head">
          <h2 id="landing-top-title" className="landing-top__title">
            TOP 3 DEL CATÁLOGO
          </h2>
          <p className="landing-top__intro">
            Una muestra de los títulos con mayor disponibilidad.
          </p>
        </div>
        <div className="landing-top__grid">
          <BookGrid books={topBooks} numbered />
        </div>
      </section>
    </div>
  );
}

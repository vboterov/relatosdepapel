import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Navbar.css";

export default function Navbar() {


  const { user, logout,isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  console.log("[Navbar] render – user:", user ? user.name : "null");

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand" aria-label="Relatos de Papel — Inicio">
        <img src="/logo.png" alt="" className="navbar__brand-img" decoding="async" />
      </Link>
      <ul className="navbar__links">
        <li>
          <Link
            to="/"
            className={`navbar__link ${pathname === "/" ? "navbar__link--active" : ""}`}
          >
            Inicio
          </Link>
        </li>
        <li>
          <Link
            to="/tienda"
            className={`navbar__link ${pathname.startsWith("/tienda") || pathname.startsWith("/libros") ? "navbar__link--active" : ""}`}
          >
            Catálogo
          </Link>
        </li>
        {user ? (
          <>
            <li>
              <Link
                to="/checkout"
                className={`navbar__link ${pathname === "/checkout" ? "navbar__link--active" : ""}`}
              >
                Checkout
              </Link>
            </li>
            <li>
              <Link
                to="/perfil"
                className={`navbar__link navbar__link--highlight ${pathname === "/perfil" ? "navbar__link--active" : ""}`}
              >
                {user.name}
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link
              to="/login"
              className={`navbar__link navbar__link--highlight ${pathname === "/login" ? "navbar__link--active" : ""}`}
            >
              Iniciar sesión
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

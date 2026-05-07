import "./Footer.css";

export default function Footer({ year }) {
  console.log("[Footer] render");

  return (
    <footer className="footer">
      <p>
        © {year} <strong>Relatos de Papel</strong> · Todos los derechos reservados
      </p>
      <p className="footer__sub">Librería en línea </p>
    </footer>
  );
}

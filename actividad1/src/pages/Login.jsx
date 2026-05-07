import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user, login } = useAuth();
  const navigate = useNavigate();

  console.log("[Login] render – user:", user ? user.name : "null");

  if (user) {
    return <Navigate to="/perfil" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Usuario y contraseña son obligatorios");
      return;
    }

    const result = login(username, password);

    if (result.success) {
      navigate("/perfil", { replace: true });
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="page">
      <div className="login">
        <div className="login__header">
          <h1>Iniciar sesión</h1>
          <p className="page__intro">Accede con tu usuario y contraseña</p>
        </div>

        <form className="login__form" onSubmit={handleSubmit}>
          {error && <div className="login__error">{error}</div>}

          <div className="login__field">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nombre de usuario"
              autoComplete="username"
            />
          </div>

          <div className="login__field">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="login__button">
            Entrar
          </button>
        </form>

        <div className="login__credentials">
          <h3>Credenciales de prueba</h3>
          <div className="login__credential-item">
            <strong>Valentina:</strong> <code>valenbv</code> / <code>valen123</code>
          </div>
          <div className="login__credential-item">
            <strong>Michael:</strong> <code>michael</code> / <code>michael123</code>
          </div>
        </div>
      </div>
    </div>
  );
}

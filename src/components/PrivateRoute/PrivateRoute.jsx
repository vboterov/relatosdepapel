import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function PrivateRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  console.log(
    "[PrivateRoute] check –",
    user ? "autenticado" : "sin sesión",
    "– ruta:",
    location.pathname
  );

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}
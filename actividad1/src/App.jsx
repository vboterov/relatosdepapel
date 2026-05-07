import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Tienda from "./pages/Tienda.jsx";
import LibroDetalle from "./pages/LibroDetalle.jsx";
import Checkout from "./pages/Checkout.jsx";
import Perfil from "./pages/Perfil.jsx";

export default function App() {
  console.log("[App] render");

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/libros/:bookId" element={<LibroDetalle />} />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}

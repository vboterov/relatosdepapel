import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { credentials } from "../data/credentials.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  console.log("[AuthProvider] render – user:", user?.username ?? "null");

  const login = (username, password) => {
    const found = credentials.find(
      (c) => c.username === username && c.password === password
    );

    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);

      console.log("[AuthContext] login exitoso:", found.username);

      return { success: true };
    }

    console.log("[AuthContext] login fallido");
    return { success: false, error: "Credenciales incorrectas" };
  };

  const logout = () => {
    console.log("[AuthContext] logout");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
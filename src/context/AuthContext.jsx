import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createContext } from "react";
import { credentials } from "../data/credentials.js";

export const AuthContext = createContext();

export function useAuth() {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
  
    const login = (username, password) => {
      const found = credentials.find(
        (c) => c.username === username && c.password === password
      );
  
      if (found) {
        const { password: _, ...userData } = found;
        setUser(userData);
        console.log("🔑 [useAuth] login exitoso – usuario:", found.username);
        return { success: true };
      }
  
      console.log("🔑 [useAuth] login fallido – credenciales incorrectas");
      return { success: false, error: "Credenciales incorrectas" };
    };
  
    const logout = () => {
      console.log("🔑 [useAuth] logout");
      setUser(null);
      navigate("/");
    };
  
    return {
      user,
      isAuthenticated: !!user,
      login,
      logout,
    };
  }
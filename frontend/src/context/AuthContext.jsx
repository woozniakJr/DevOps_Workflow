import { createContext, useContext, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (email, motdepasse) => {
    try {
      const res = await API.post("/login", { email, motdepasse });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      setUser(user);

      // Redirection selon le rôle
      switch (user.role) {
        case "ADMIN":
          navigate("/admin");
          break;
        case "ENSEIGNANT":
          navigate("/enseignant");
          break;
        case "ETUDIANT":
          navigate("/etudiant");
          break;
        case "PARENT":
          navigate("/parent");
          break;
        default:
          navigate("/");
      }
    } catch (error) {
      alert("Échec de connexion");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

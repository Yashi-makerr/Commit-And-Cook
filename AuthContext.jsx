import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loadUser = async () => {
    try {
      const { data } = await axios.get("/auth/me");
      setUser(data);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loadUser();
    }
  }, []);

  const login = async (email, password) => {
    const { data } = await axios.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    await loadUser();
  };

  const register = async (name, email, password) => {
    const { data } = await axios.post("/auth/register", {
      name,
      email,
      password,
    });
    localStorage.setItem("token", data.token);
    await loadUser();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loadUser   // 🔥 IMPORTANT
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const AuthContext = createContext();

// Export as named export
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    (() => {
      try {
        return JSON.parse(localStorage.getItem("user")) || null;
      } catch {
        return null;
      }
    })()
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);

  // Optionally, load /auth/me here if you have that route.
  useEffect(() => {
    // If a token exists but no user, try to fetch /auth/me
    const bootstrap = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      if (user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await API.get("/auth/me");
        if (res?.data?.user) {
          setUser(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        } else {
          setUser(null);
          localStorage.removeItem("user");
        }
      } catch (err) {
        setUser(null);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      const { token: t, user: u } = res.data;
      setUser(u);
      setToken(t);
      localStorage.setItem("user", JSON.stringify(u));
      localStorage.setItem("token", t);
      return { success: true, user: u };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Invalid login details",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Default export (so both import styles work)
export default AuthProvider;

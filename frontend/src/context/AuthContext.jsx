// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useRef } from "react";
import API from "../services/api";

export const AuthContext = createContext();

function mapUserShape(raw = {}) {
  // Normalize backend shapes: support { _id } or { id }
  const id = raw.id || raw._id || null;
  return {
    id,
    name: raw.name || raw.firstName || raw.username || null,
    email: raw.email || null,
    role: raw.role || null,
    // include any other safe fields you rely on here
  };
}

function isValidUserShape(u) {
  // consider user valid if at least id and email or name exist
  return !!(u && (u.id || u.email || u.name));
}

export const AuthProvider = ({ children }) => {
  // load user safely from localStorage
  const [user, setUser] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("user"));
      return stored || null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem("token") || null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  // If we just performed a login, we can skip the immediate /me fetch to avoid races
  const skipNextMeFetch = useRef(false);

  // Make sure API always has Authorization header
  useEffect(() => {
    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete API.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Safe merge helper: prefer remote only for defined values; keep local otherwise
  const safeMergeUser = (local = {}, remote = {}) => {
    const mappedRemote = mapUserShape(remote);
    const mappedLocal = mapUserShape(local);
    const merged = { ...mappedLocal };

    Object.keys(mappedRemote).forEach((k) => {
      const val = mappedRemote[k];
      if (val !== null && val !== undefined && val !== "") {
        merged[k] = val;
      }
    });

    return merged;
  };

  // Fetch /auth/me when token changes (defensive)
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      if (skipNextMeFetch.current) {
        // reset flag and skip this fetch (we already set user on login)
        skipNextMeFetch.current = false;
        return;
      }

      setLoading(true);
      try {
        const res = await API.get("/auth/me");
        const remote = res?.data?.user;

        if (!remote || Object.keys(remote).length === 0) {
          console.warn("AuthContext: /auth/me returned empty user, ignoring.");
          return;
        }

        // normalize and merge without destructive overwrite
        const localStored = JSON.parse(localStorage.getItem("user")) || {};
        const merged = safeMergeUser(localStored, remote);

        if (!isValidUserShape(merged)) {
          console.warn("AuthContext: merged user invalid, skipping setUser", { merged, remote, localStored });
          return;
        }

        setUser(merged);
        localStorage.setItem("user", JSON.stringify(merged));
        console.debug("AuthContext: /auth/me merged user", merged);
      } catch (err) {
        console.error("AuthContext: error fetching /auth/me", err?.response?.data || err);
        // On auth error, clear local user/token
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        delete API.defaults.headers.common["Authorization"];
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // LOGIN
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      const { token: newToken, user: newUserRaw } = res.data || {};

      if (!newToken || !newUserRaw) {
        return { success: false, message: "Malformed login response" };
      }

      const normalized = mapUserShape(newUserRaw);

      if (!isValidUserShape(normalized)) {
        console.warn("AuthContext: login returned user missing expected fields", normalized);
      }

      // Save to state and storage
      setUser(normalized);
      setToken(newToken);

      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(normalized));

      // Make API use token immediately
      API.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

      // Skip immediate /me fetch because we already have fresh data
      skipNextMeFetch.current = true;

      console.debug("AuthContext: login saved user", normalized);
      return { success: true, user: normalized };
    } catch (err) {
      console.error("AuthContext: login error", err?.response?.data || err);
      return {
        success: false,
        message: err.response?.data?.message || "Invalid login credentials",
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
    delete API.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

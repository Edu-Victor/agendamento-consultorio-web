import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { setAuthToken } from "../api/http";
import { decodeJwt } from "./jwt";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [role, setRole] = useState(() => localStorage.getItem("role"));

  useEffect(() => {
    setAuthToken(token);
    if (token) {
      const payload = decodeJwt(token);
      const r = payload?.role || role || "ROLE_USER";
      setRole(r);
      localStorage.setItem("token", token);
      localStorage.setItem("role", r);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
  }, [token]);

  const value = useMemo(() => ({
    token,
    role,
    isAdmin: role === "ROLE_ADMIN",
    login: (t, r) => {
      setToken(t);
      setRole(r);
      localStorage.setItem("token", t);
      localStorage.setItem("role", r);
      setAuthToken(t);
    },
    logout: () => {
      setToken(null);
      setRole(null);
      setAuthToken(null);
    },
  }), [token, role]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
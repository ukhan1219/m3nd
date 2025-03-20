import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      fetch("http://localhost:3000/auth/check", {
        credentials: "include",
      })
        .then((res) => {
          if (res.status === 401) return null;
          return res.json();
        })
        .then((data) => {
          if (data && data.user) {
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
          }
        })
        .catch((err) => {
          console.error("Error when fetching auth:", err);
          setUser(null);
        });
    }
  }, []);

  const logout = () => {
    fetch("http://localhost:3000/logout", {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setUser(null);
          localStorage.removeItem("user");
        }
      })
      .catch((err) => {
        console.error("Logout error:", err);
      });
  };

  const value = { user, setUser, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

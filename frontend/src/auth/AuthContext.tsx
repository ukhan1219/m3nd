import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Add loading state

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/check", {
          credentials: "include",
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
          }
        } else {
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Auth check error:", error);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);  // Mark loading as complete
      }
    };

    // Always check server auth status, even if localStorage exists
    checkAuthStatus();
  }, []);

  const logout = async () => {
    try {
      await fetch("http://localhost:3000/logout", {
        credentials: "include",
      });
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const value = { user, setUser, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}  {/* Wait until auth check completes */}
    </AuthContext.Provider>
  );
}
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Define the shape of the User object (adjust based on actual user data structure)
interface User {
  userId?: string; // Or googleId, depending on auth method
  googleId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  // Add other relevant user properties
}

// Define the shape of the context value
interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => Promise<void>;
  loading: boolean;
}

// Create the context with an initial undefined value or a default structure
// Providing a default helps avoid 'possibly undefined' errors when consuming context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define Props type for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provides authentication state (user, loading status) and actions (logout)
 * to its children components via context.
 * It checks the user's authentication status with the backend on initial load.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Checks the backend authentication status when the component mounts.
   * Updates user state and localStorage based on the response.
   */
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/check", {
          credentials: "include",
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            setUser(data.user as User);
            localStorage.setItem("user", JSON.stringify(data.user));
          } else {
            setUser(null);
            localStorage.removeItem("user");
          }
        } else {
          setUser(null);
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setUser(null);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  /**
   * Logs the user out by calling the backend logout endpoint,
   * clearing user state, and removing user data from localStorage.
   */
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

  const value: AuthContextType = { user, setUser, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : null}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to easily consume the authentication context.
 * Throws an error if used outside of an AuthProvider.
 * @returns The authentication context value (user, setUser, logout, loading).
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
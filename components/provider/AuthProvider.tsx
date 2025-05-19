"use client";

import { AuthContext } from "@/lib/context/AuthContext";
import { ReactNode, useEffect, useState } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch the access token from local storage or an API
    const fetchToken = async () => {
      const token = localStorage.getItem("access");
      if (token) {
        setAccessToken(token);
      }
      setLoading(false);
    };

    fetchToken();
  }, []);

  const login = async (access: string) => {
    localStorage.setItem("access", access);
    setAccessToken(access);
  };

  const logout = () => {
    localStorage.removeItem("access");
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated: Boolean(accessToken),
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

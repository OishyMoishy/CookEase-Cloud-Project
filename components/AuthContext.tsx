"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;   // We will keep this as 'id' for the frontend but map 'userId' to it
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (apiResponse: any) => void; 
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('cookease_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (apiResponse: any) => {
    // MAPPING: Take the 'userId' from the API and save it as 'id'
    const newUser = {
      id: apiResponse.userId.toString(), 
      name: apiResponse.message.replace("Welcome back, ", "").replace("!", ""),
      email: apiResponse.email || "" 
    };
    setUser(newUser);
    localStorage.setItem('cookease_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cookease_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
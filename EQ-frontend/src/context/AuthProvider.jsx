import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("token"));
    if (storedUser) {
      setToken(storedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (userData) => {
    setToken(userData);
    localStorage.setItem("token", JSON.stringify(userData));
    setIsLoggedIn(true);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

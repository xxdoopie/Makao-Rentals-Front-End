import { createContext, useContext, useState } from "react";

// 1. Create the context (this is like a box to store shared data)
const AuthContext = createContext();

// 2. Create a provider component
export function AuthProvider({ children }) {
  // State to keep track of login status and user type
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null); // can be "tenant" or "admin"
  const [user, setUser] = useState(null);

  // Function to log in
  const login = (type, userData) => {
    setIsLoggedIn(true);
    setUserType(type);
    setUser(userData) // e.g. { id: "1", name: "John Doe", ... })
  };

  // Function to log out
const logout = () => {
  setIsLoggedIn(false);
  setUserType(null);
  setUser(null);
};

  // What we want to share with the whole app
const value = {
  isLoggedIn,
  userType,
  user,
  login,
  logout,
};

  // Wrap children with our context provider
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 3. Custom hook to use the auth context (makes it easier to access)
export function useAuth() {
  return useContext(AuthContext);
}

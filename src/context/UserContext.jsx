import React, { useState, useEffect } from "react";
import { handleUserInfo } from "../utility/userInfo";
const AuthContext = React.createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleUser = () => {
    setUser(handleUserInfo());
  };

  useEffect(() => {
    setUser(handleUserInfo());
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, handleUser }}
      children={children}
    />
  );
};
export { AuthProvider, AuthContext };

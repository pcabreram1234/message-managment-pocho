import React, { useState, useEffect } from "react";
import { handleUserInfo } from "../utility/userInfo";
const AuthContext = React.createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(handleUserInfo());
  }, []);

  return <AuthContext.Provider value={{ user, setUser }} children={children} />;
};
export { AuthProvider, AuthContext };

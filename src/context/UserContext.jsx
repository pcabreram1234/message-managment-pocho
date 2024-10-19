import React, { useEffect, useState } from "react";
const AuthContext = React.createContext();
const AuthProvider = ({ children }) => {
  const token = window.localStorage.getItem("token");
  const [user, setUser] = useState(token);

  const handleUser = (tokenDecoded) => {
    setUser(tokenDecoded);
  };

  useEffect(() => {
    handleUser(token);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, handleUser }}
      children={children}
    />
  );
};
export { AuthProvider, AuthContext };

import React, { useEffect, useState } from "react";
const AuthContext = React.createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleUser = (email) => {
    setUser(email);
  };

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, handleUser }}
      children={children}
    />
  );
};
export { AuthProvider, AuthContext };

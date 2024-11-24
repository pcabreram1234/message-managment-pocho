import React, { useEffect, useState } from "react";
import * as jose from "jose";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleUser = (decodedToken) => {
    setUser(decodedToken); // Establecer el usuario con el token decodificado
  };

  useEffect(() => {
    // Cargar el token desde localStorage al iniciar
    const storedToken = window.localStorage.getItem("token");
    if (storedToken) {
      try {
        const decodedToken = jose.decodeJwt(storedToken);
        handleUser(decodedToken); // Actualizar usuario con el token decodificado
      } catch (err) {
        console.error("Error al decodificar el token:", err);
        setUser(null); // Token inválido
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, handleUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

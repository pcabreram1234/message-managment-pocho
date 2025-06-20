import React, { createContext, useContext, useState } from 'react';

// Tipo de acción
const ActionContext = createContext();

export const ActionProvider = ({ children }) => {
  const [lastAction, setLastAction] = useState(null);

  const dispatchAction = (type, target) => {
    setLastAction({
      type,
      target,
      timestamp: Date.now(), // evita problemas de igualdad por objetos iguales
    });
  };

  return (
    <ActionContext.Provider value={{ lastAction, dispatchAction }}>
      {children}
    </ActionContext.Provider>
  );
};

export const useActionContext = () => useContext(ActionContext);

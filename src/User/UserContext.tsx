import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginSave = (userData) => {
    // Lógica para iniciar sesión y establecer el usuario
    setUser(userData);
  };

  const logout = () => {
    // Lógica para cerrar sesión y eliminar el usuario
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loginSave, logout }}>
      {children}
    </UserContext.Provider>
  );
};


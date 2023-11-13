import React, { useState } from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginStatus, setLoginStatus] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setLoginStatus(true);
  };

  const logout = () => {
    setUser(null);
    setLoginStatus(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loginStatus, setLoginStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

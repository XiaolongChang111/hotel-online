import React, { createContext, useContext, useEffect, useState } from 'react';
import http from './http';
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState(null);
  const [reload, setReload] = useState(false);
  const login = (token) => {
    setAuthed(true);
    localStorage.setItem('token', token);
    setReload(!reload);
  };

  const logout = () => {
    setAuthed(false);
  };

  const value = { authed, login, logout, user };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthed(true);
      http.get('/api/users/me')
      .then(response => {
        setUser(response.data);
      })
    }
  }, [reload]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
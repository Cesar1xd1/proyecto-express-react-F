import React from 'react';
import { Navigate } from 'react-router-dom';

const RutaPrivada = ({ children }) => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  return usuario ? children : <Navigate to="/login" />;
};

export default RutaPrivada;

import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem('user'); // Verifica si el usuario está almacenado en localStorage
  
  if (!user) {
    return <Navigate to="/" />; // Si no está autenticado, redirige a la página principal o de login
  }

  return children; // Si está autenticado, muestra el componente hijo
};

export default PrivateRoute;

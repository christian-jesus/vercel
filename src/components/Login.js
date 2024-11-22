import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lógica para hacer la petición al backend para login
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, // Usar 'email' en lugar de 'username'
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Login exitoso, puedes guardar el token o hacer algo más
      console.log('Login exitoso:', data);
      localStorage.setItem('token', data.token); // Guardar el token en localStorage
      onLogin(data.token); // Llamar a la función de onLogin con el token
    } else {
      // Si el login falla, mostrar el error
      setError(data.mensaje || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="login-modal">
      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>} {/* Mostrar error si hay uno */}
          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
        <button className="close-button" onClick={() => onLogin(null)}>Cancelar</button>
      </div>
    </div>
  );
};

export default Login;

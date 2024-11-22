import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Importación correcta
import "./Navbar.css";
import RegisterForm from "./RegisterForm";
import Login from "./Login";
import logo from "./img/logo.png";

const Navbar = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Efecto para verificar si hay un token en localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decodificar el token
        setUser(decodedToken.username || "Usuario"); // Establecer el nombre de usuario desde el token
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []); // Solo se ejecuta cuando el componente se monta

  // Función para manejar el logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar el token
    setUser(null); // Borrar el estado del usuario
    setShowRegisterForm(false); // Cerrar formularios de registro o login si están abiertos
    setShowLoginForm(false);
    navigate("/"); // Redirigir a la página principal
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
          <span>Solo Guitar</span>
        </div>

        <ul className="navbar-links">
          <li><Link to="/tutoriales">Tutoriales</Link></li>
          <li><a href="#comunidad">Comunidad</a></li>
          <li><a href="#academias">Academias afiliadas</a></li>
          <li><a href="#canciones">Canciones</a></li>
          <li><Link to="/preferencias">Preferencias</Link></li>
        </ul>

        <div className="navbar-actions">
          {user ? (
            <>
              <span className="navbar-user">Bienvenido 🎸👋</span> {/* Mensaje fijo */}
              <button className="navbar-button" onClick={handleLogout}>
              Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <button
                className="navbar-button"
                onClick={() => setShowLoginForm(true)}
              >
                Login
              </button>
              <button
                className="navbar-button register-button"
                onClick={() => setShowRegisterForm(true)}
              >
                Register
              </button>
            </>
          )}
        </div>
      </nav>

      {showRegisterForm && (
        <RegisterForm
          onClose={() => setShowRegisterForm(false)}
          onRegister={(username) => {
            setUser(username); // Establecer el nombre de usuario al registrarse
            setShowRegisterForm(false); // Cerrar el formulario de registro
          }}
        />
      )}

      {showLoginForm && (
        <Login
          onLogin={(username) => {
            setUser(username); // Establecer el nombre de usuario al hacer login
            localStorage.setItem("username", username); // Guardar el username en localStorage
            setShowLoginForm(false); // Cerrar el formulario de login
          }}
        />
      )}
    </>
  );
};

export default Navbar;

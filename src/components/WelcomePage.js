import React from "react";
import "./WelcomePage.css"; 
import th from "./img/th.jpg"; // Importa la imagen principal
import logo from "./img/logo.png"; // Importa el logo

const ArvoFont = `
  @import url('https://fonts.googleapis.com/css2?family=Arvo:wght@400;700&display=swap');
`;

// Array con los detalles de las academias
const academies = [
  {
    id: 1,
    title: "Academia Andina",
    image: require('./img/andina.jpeg'), // Imagen de Academia Andina
  },
  {
    id: 2,
    title: "Academia Cultural",
    image: require('./img/cultural.jpeg'), // Imagen de Academia Cultural
  },
];

const WelcomePage = () => {
  return (
    <>
      <style>{ArvoFont}</style>
      <div className="welcome-page">
        {/* Barra de navegación */}
        <nav className="navbar">
          <div className="navbar-logo">
            <img src={logo} alt="Logo" className="logo" /> {/* Agrega el logo aquí */}
            SoloGuitar
          </div>
          <ul className="navbar-links">
            <li><a href="#tutoriales">Tutoriales</a></li>
            <li><a href="#comunidad">Comunidad</a></li>
            <li><a href="#academias">Academias afiliadas</a></li>
            <li><a href="#canciones">Canciones</a></li>
            <li>
            <button className="navbar-button">Iniciar sesión</button>
            </li>
            </ul>
        </nav>

        {/* Contenido principal de la bienvenida */}
        <main className="main-content">
          <div className="welcome-text">
            <h1>¡Bienvenido a SoloGuitar!</h1>
            <p>Explora nuestra plataforma para aprender y mejorar tus habilidades de guitarra.</p>
          </div>

          {/* Imagen publicitaria y texto */}
          <div className="advertisement">
            <img src={th} alt="Publicidad" className="advertisement-image" />
            <div className="advertisement-text">
              <h2>Aprende a tocar guitarra con el método</h2>
              <h3>más fácil, simple y efectivo</h3>
              <p>En poco tiempo estarás tocando tus canciones favoritas con las mejores clases de guitarra online</p>
              <div className="buttons">
                <button>Materiales de aprendizaje</button>
                <button>Registrarse</button>
              </div>
            </div>
          </div>

          {/* Título de academias afiliadas */}
          <h2 className="academies-title">Academias Afiliadas</h2>

          {/* Sección de academias afiliadas */}
          <div className="academies-container">
            {academies.map((academy) => (
              <div key={academy.id} className="academy-card">
                <img src={academy.image} alt={academy.title} className="academy-image" />
                <button className="button">Visitar</button> {/* Cambiado a "Visitar" */}
              </div>
            ))}
          </div>
        </main>

        {/* Pie de página con derechos de autor y políticas */}
        <footer className="footer">
          <div className="footer-links">
            <a href="#terminos">Términos y condiciones</a>
            <a href="#seguridad">Política de seguridad</a>
            <a href="#privacidad">Política de privacidad</a>
          </div>
          <p>Copyright © SoloGuitar 2024 - 2024. Todos los derechos reservados.</p>
        </footer>
      </div>
    </>
  );
};

export default WelcomePage;

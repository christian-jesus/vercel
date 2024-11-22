import React, { useState, useEffect } from "react";
import "./WelcomePage.css";
import th from "./img/th.jpg"; // Imagen de publicidad
import andina from "./img/andina.jpeg"; // Imagen de Academia Andina
import cultural from "./img/cultural.jpeg"; // Imagen de Academia Cultural
import RegisterForm from "./RegisterForm";

// Datos de los tutoriales
const tutoriales = [
  {
    id: 1,
    title: "Tutorial 1",
    video: "https://mis-videos-tutoriales.s3.amazonaws.com/Numb+LINKIN+PARK.mp4",
    tags: ["Rock", "Intermedio"],
  },
  {
    id: 2,
    title: "Tutorial 2",
    video: "https://mis-videos-tutoriales.s3.amazonaws.com/Easy+Blues+Solo).mp4",
    tags: ["Blues", "Básico"],
  },
  {
    id: 3,
    title: "Tutorial 3",
    video: "https://mis-videos-tutoriales.s3.amazonaws.com/jazz-avanzado-acordes.mp4",
    tags: ["Jazz", "Avanzado"],
  },
  {
    id: 4,
    title: "Tutorial 4",
    video: "https://mis-videos-tutoriales.s3.amazonaws.com/SWEET+HOME+ALABAMA.Country.mp4",
    tags: ["Country", "Intermedio"],
  },
  {
    id: 5,
    title: "Tutorial 5",
    video: "https://mis-videos-tutoriales.s3.amazonaws.com/The+Scientist+Guitar-Pop.mp4",
    tags: ["Pop", "Intermedio"],
  },
];

const WelcomePage = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(15); // Estado para el contador de segundos

  // Efecto para cargar las preferencias y recomendación
  useEffect(() => {
    const preferences = JSON.parse(localStorage.getItem("userPreferences"));

    if (preferences) {
      const { experienceLevel, musicPreferences } = preferences;
      const recommended = tutoriales.filter((tutorial) =>
        tutorial.tags.some(tag => musicPreferences.includes(tag) || tag === experienceLevel)
      );

      setRecommendedVideos(recommended);
    } else {
      setRecommendedVideos([]);
    }
  }, []);

  useEffect(() => {
    if (recommendedVideos.length > 0) {
      const interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            // Si llega a 1 segundo, reiniciamos el contador y cambiamos el video
            setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % recommendedVideos.length);
            return 15; // Reseteamos el contador a 15 segundos
          }
          return prev - 1; // Decrementamos el contador
        });
      }, 1000); // Actualizamos cada segundo

      return () => clearInterval(interval); // Limpiamos el intervalo al desmontarse el componente
    }
  }, [recommendedVideos]);

  const handleLogout = () => {
    localStorage.removeItem("userPreferences");
    setRecommendedVideos([]);
  };

  return (
    <div className="welcome-page">
      {showRegisterForm ? (
        <RegisterForm onClose={() => setShowRegisterForm(false)} />
      ) : (
        <main className="main-content">
          <div className="welcome-text">
            <h1>¡Bienvenido a SoloGuitar!</h1>
            <p>Explora nuestra plataforma para aprender y mejorar tus habilidades de guitarra.</p>
          </div>

          <div className="advertisement">
            {recommendedVideos.length > 0 ? (
              <div className="recommended-video-container">
                <video
                  src={recommendedVideos[currentVideoIndex].video}
                  controls
                  className="recommended-video"
                >
                  Your browser does not support the video tag.
                </video>
                <p>{recommendedVideos[currentVideoIndex].title}</p>
                <button onClick={() => window.location.href = `/tutoriales/`} className="button">Ver Video</button>
                <div className="countdown-container">
                  <p>Próximo Video en {secondsRemaining} segundos</p>
                </div>
              </div>
            ) : (
              <img src={th} alt="Publicidad" className="advertisement-image" />
            )}
            <div className="advertisement-text">
              <h2>Aprende a tocar guitarra con el método</h2>
              <h3>más fácil, simple y efectivo</h3>
              <p>En poco tiempo estarás tocando tus canciones favoritas con las mejores clases de guitarra online</p>
            </div>
          </div>

          <div className="academies-container">
            <h2 className="academies-title">Academias Afiliadas</h2>
            <div className="academy-card">
              <img src={andina} alt="Academia Andina" className="academy-image" />
              <button className="button">Academia Andina</button>
            </div>
            <div className="academy-card">
              <img src={cultural} alt="Academia Cultural" className="academy-image" />
              <button className="button">Academia Cultural</button>
            </div>
          </div>

          <button onClick={handleLogout} className="button">Cerrar sesión</button>
        </main>
      )}
      <footer className="footer">
        <p>Copyright © SoloGuitar 2024 - 2024. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default WelcomePage;

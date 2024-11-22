import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate
import "./Tutoriales.css"; // Ruta del CSS para esta página

const Tutoriales = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Estado para el índice actual del tutorial
  const navigate = useNavigate(); // Usa el hook useNavigate

  // Datos de los tutoriales
  const tutoriales = [
    {
      id: 1,
      title: "Tutorial 1",
      video: "https://mis-videos-tutoriales.s3.amazonaws.com/Numb+LINKIN+PARK.mp4", // URL pública del video en S3
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

  // Lógica para manejar las flechas
  const handleArrowClick = (direction) => {
    const newIndex = direction === "left" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex + 3 <= tutoriales.length) {
      setCurrentIndex(newIndex);
    }
  };

  // Función para redirigir al tutorial completo
  const handleVideoClick = (id) => {
    navigate(`/tutoriales/${id}`);
  };

  return (
    <div className="tutoriales-container">
      <h2>Tutoriales</h2>
      <div className="tutoriales-carousel">
        <button onClick={() => handleArrowClick("left")} className="arrow left">←</button>

        <div className="tutorial-cards">
          {tutoriales.slice(currentIndex, currentIndex + 3).map((tutorial) => (
            <div key={tutorial.id} className="tutorial-card">
              <video
                width="100%" // Cambia el tamaño del video
                height="200px" // Cambia la altura del video
                controls
                src={tutorial.video}
                title={tutorial.title}
              >
                Your browser does not support the video tag.
              </video>
              <h3>{tutorial.title}</h3>
              <p>Descripción del tutorial...</p>
              <button onClick={() => handleVideoClick(tutorial.id)}>
                Ver Video
              </button>
              <div className="tags">
                {tutorial.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => handleArrowClick("right")} className="arrow right">→</button>
      </div>
    </div>
  );
};

export default Tutoriales;

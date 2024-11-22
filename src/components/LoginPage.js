import React, { useState, useEffect } from "react";
import "./RecommendationsPage.css";

// Datos de los tutoriales con etiquetas (etiquetas asociadas a los videos)
const tutoriales = [
  {
    id: 1,
    title: "Cómo tocar Numb (Linkin Park)",
    video: "https://mis-videos-tutoriales.s3.amazonaws.com/Numb+LINKIN+PARK.mp4",
    tags: ["Rock", "Intermedio", "Guitarra eléctrica"],
    externalLinks: [
      { url: "https://www.youtube.com/watch?v=abcdef", text: "Ver más en YouTube" },
      { url: "https://www.mipagina.com/tutorials/guitarra", text: "Visita nuestro blog" },
    ],
  },
  {
    id: 2,
    title: "Easy Blues Solo",
    video: "https://mis-videos-tutoriales.s3.amazonaws.com/Easy+Blues+Solo.mp4",
    tags: ["Blues", "Principiante", "Guitarra acústica"],
    externalLinks: [
      { url: "https://www.youtube.com/watch?v=ghijk", text: "Ver más en YouTube" },
    ],
  },
  {
    id: 3,
    title: "Jazz Avanzado - Tercera Parte",
    video: "https://mis-videos-tutoriales.s3.amazonaws.com/Jazz+Avanzado.mp4",
    tags: ["Jazz", "Avanzado", "Guitarra eléctrica"],
    externalLinks: [
      { url: "https://www.mipagina.com/jazz-tutorials", text: "Visita nuestros tutoriales avanzados" },
    ],
  },
  {
    id: 4,
    title: "Técnicas de Pulgar para Guitarra",
    video: "https://mis-videos-tutoriales.s3.amazonaws.com/Técnicas+de+Pulgar.mp4",
    tags: ["Técnicas", "Intermedio", "Guitarra acústica"],
    externalLinks: [
      { url: "https://www.youtube.com/watch?v=lmnop", text: "Ver más en YouTube" },
    ],
  },
  {
    id: 5,
    title: "Intro a la Guitarra Eléctrica",
    video: "https://mis-videos-tutoriales.s3.amazonaws.com/Intro+Guitarra+Eléctrica.mp4",
    tags: ["Principiante", "Guitarra eléctrica"],
    externalLinks: [
      { url: "https://www.mipagina.com/tutorials/guitarra-electrica", text: "Visita más tutoriales" },
    ],
  },
];

const RecommendationsPage = () => {
  const [userHistory, setUserHistory] = useState([]); // Mantiene el historial de visualización del usuario
  const [recommendedVideos, setRecommendedVideos] = useState([]);

  // Función que obtiene videos recomendados según las etiquetas en el historial
  const getRecommendedVideos = () => {
    // Extraer las etiquetas del historial de visualización del usuario
    const allTags = userHistory.flatMap((video) => video.tags);

    // Filtra los videos que coinciden con las etiquetas del historial
    const filteredVideos = tutoriales.filter((video) =>
      video.tags.some((tag) => allTags.includes(tag))
    );

    // Limitar la cantidad de recomendaciones a 2
    const limitedRecommendations = filteredVideos.slice(0, 2);

    // Actualiza las recomendaciones
    setRecommendedVideos(limitedRecommendations);
  };

  // Función que agrega un video al historial de visualización del usuario
  const handleVideoWatched = (video) => {
    setUserHistory((prevHistory) => {
      const updatedHistory = [...prevHistory, video];
      // Recalcular recomendaciones
      getRecommendedVideos();
      return updatedHistory;
    });
  };

  // Este efecto se ejecuta cuando se carga la página y genera recomendaciones iniciales
  useEffect(() => {
    // Inicialmente, no hay videos en el historial, por lo que no se recomiendan hasta ver algo
    if (userHistory.length > 0) {
      getRecommendedVideos();
    }
  }, [userHistory]);

  return (
    <div className="recommendations-page">
      <h1>Recomendaciones de Tutoriales de Guitarra</h1>
      <p>Explora más videos basados en tu historial.</p>

      <div className="video-cards">
        {tutoriales.map((video) => (
          <div key={video.id} className="video-card">
            <h4>{video.title}</h4>
            <video
              src={video.video}
              controls
              className="video-player"
              onClick={() => handleVideoWatched(video)}
            >
              Tu navegador no soporta el video.
            </video>
            <div className="external-links">
              {video.externalLinks.map((link, index) => (
                <a href={link.url} key={index} target="_blank" rel="noopener noreferrer">
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h3>Recomendaciones Basadas en Tu Historial</h3>
      <div className="recommended-videos">
        {recommendedVideos.length > 0 ? (
          recommendedVideos.map((video) => (
            <div key={video.id} className="video-card">
              <h4>{video.title}</h4>
              <video
                src={video.video}
                controls
                className="video-player"
                onClick={() => handleVideoWatched(video)}
              >
                Tu navegador no soporta el video.
              </video>
              <div className="external-links">
                {video.externalLinks.map((link, index) => (
                  <a href={link.url} key={index} target="_blank" rel="noopener noreferrer">
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No hay videos recomendados aún. Comienza viendo algunos videos.</p>
        )}
      </div>
    </div>
  );
};

export default RecommendationsPage;

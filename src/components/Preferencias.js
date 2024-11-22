import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Preferencias.css";

const Preferencias = () => {
  const navigate = useNavigate(); // Hook para redirigir
  const [preferences, setPreferences] = useState({
    experienceLevel: "Básico",
    musicPreferences: [],
  });

  const [step, setStep] = useState(1); // Para controlar los pasos

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setPreferences((prevState) => {
        let updatedPreferences = [...prevState[name]];
        if (updatedPreferences.includes(value)) {
          updatedPreferences = updatedPreferences.filter((pref) => pref !== value);
        } else if (name === "musicPreferences" && updatedPreferences.length < 3) {
          updatedPreferences.push(value);
        }
        return { ...prevState, [name]: updatedPreferences };
      });
    } else {
      setPreferences({ ...preferences, [name]: value });
    }
  };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Guardar las preferencias del usuario en localStorage
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
    console.log("Preferences saved:", preferences);
    navigate("/"); // Redirige a la ruta principal
  };

  return (
    <div className="preferencias-container">
      <h2>Preferencias</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <label>
              Nivel de Experiencia:
              <select
                name="experienceLevel"
                value={preferences.experienceLevel}
                onChange={handleChange}
              >
                <option value="Básico">Básico</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </select>
            </label>
            <button type="button" onClick={handleNextStep}>Siguiente</button>
          </>
        )}

        {step === 2 && (
          <>
            <fieldset>
              <legend>Preferencias Musicales (Máximo 3):</legend>
              <div className="checkbox-group">
                {["Rock", "Pop", "Blues", "Jazz", "Country"].map((genre) => (
                  <label key={genre}>
                    <input
                      type="checkbox"
                      name="musicPreferences"
                      value={genre}
                      checked={preferences.musicPreferences.includes(genre)}
                      onChange={handleChange}
                    />
                    {genre}
                  </label>
                ))}
              </div>
            </fieldset>
            <button type="submit">Guardar Preferencias</button>
          </>
        )}
      </form>
    </div>
  );
};

export default Preferencias;

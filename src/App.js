import React, { useEffect, useState } from "react";
import axios from "axios";
import EstudiantesTable from "./components/EstudianteTable";
import EstudianteForm from "./components/EstudianteForm";

function App() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEstudiantes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:3030/api/estudiantes");
      setEstudiantes(res.data);
    } catch (error) {
      console.error("Error al obtener estudiantes:", error);
      setError("Error al cargar estudiantes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  const agregarEstudiante = async (nuevoEstudiante) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3030/api/estudiantes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoEstudiante),
      });
      if (!response.ok) throw new Error("Error al agregar estudiante");
      const estudianteCreado = await response.json();
      setEstudiantes((prev) => [...prev, estudianteCreado]);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const eliminarEstudiante = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`http://localhost:3030/api/estudiantes/${id}`);
      // Actualiza el estado local filtrando el estudiante eliminado
      setEstudiantes(estudiantes.filter((est) => est.id !== id));
    } catch (error) {
      console.error("Error al eliminar estudiante:", error);
      setError("Error al eliminar estudiante");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Datos Estudiantes</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {loading && <div>Cargando...</div>}
      <EstudianteForm agregarEstudiante={agregarEstudiante} loading={loading} />
      <EstudiantesTable
        estudiantes={estudiantes}
        eliminarEstudiante={eliminarEstudiante}
        loading={loading}
      />
    </div>
  );
}

export default App;

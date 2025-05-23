import React, { useState } from "react";

const EstudianteForm = ({ agregarEstudiante, loading }) => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    semestre: "",
    estudia: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación básica
    if (!form.nombre.trim() || !form.apellido.trim() || !form.edad || !form.semestre) {
      alert("Por favor complete todos los campos requeridos");
      return;
    }
    
    // Convertir edad y semestre a números
    const estudiante = {
      ...form,
      edad: parseInt(form.edad),
      semestre: parseInt(form.semestre)
    };
    
    agregarEstudiante(estudiante);
    setForm({ nombre: "", apellido: "", edad: "", semestre: "", estudia: false });
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px auto", width: "50%" }}>
      <div style={{ marginBottom: '10px' }}>
        <input 
          name="nombre" 
          placeholder="Nombre" 
          value={form.nombre} 
          onChange={handleChange} 
          disabled={loading}
          required 
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input 
          name="apellido" 
          placeholder="Apellido" 
          value={form.apellido} 
          onChange={handleChange} 
          disabled={loading}
          required 
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input 
          name="edad" 
          type="number" 
          placeholder="Edad" 
          value={form.edad} 
          onChange={handleChange} 
          disabled={loading}
          required 
          min="15"
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input 
          name="semestre" 
          type="number" 
          placeholder="Semestre" 
          value={form.semestre} 
          onChange={handleChange} 
          disabled={loading}
          required 
          min="1"
          max="12"
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>
          Estudia: 
          <input 
            name="estudia" 
            type="checkbox" 
            checked={form.estudia} 
            onChange={handleChange} 
            disabled={loading}
          />
        </label>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Agregando...' : 'Agregar'}
      </button>
    </form>
  );
};

export default EstudianteForm;
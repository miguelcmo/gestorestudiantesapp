import React from "react";

const EstudiantesTable = ({ estudiantes, eliminarEstudiante, loading }) => {
  if (estudiantes.length === 0) {
    return <div style={{ margin: '20px' }}>No hay estudiantes registrados</div>;
  }

  return (
    <table border="1" style={{ width: "80%", margin: "20px auto", borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Edad</th>
          <th>Semestre</th>
          <th>Estudia</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {estudiantes.map((e) => (
          <tr key={e.id}>
            <td>{e.id}</td>
            <td>{e.nombre}</td>
            <td>{e.apellido}</td>
            <td>{e.edad}</td>
            <td>{e.semestre}</td>
            <td>{e.estudia ? "Sí" : "No"}</td>
            <td>
              <button 
                onClick={() => eliminarEstudiante(e.id)} 
                disabled={loading}
                style={{ backgroundColor: loading ? '#ccc' : '#ff6b6b', color: 'white' }}
              >
                {loading ? 'Eliminando...' : 'Eliminar'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EstudiantesTable;
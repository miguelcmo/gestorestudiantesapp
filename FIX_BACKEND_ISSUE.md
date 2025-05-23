1 step
Modificar App.js para asegurarnos de que el estudiante se agregue a la tabla solo cuando el backend responda

// ...existing code...
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
// ...existing code...

2 step
Se obtiene el aerror "NetworkError when attempting to fetch resource." esto se debe a que se espera que el backend reponda en el puerto 3030 pero este no se ha inicializado por lo que se debe crear un servidor de backend primero.

Se crea el archivo server.js en la raiz del proyecto.

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3030;

app.use(cors());
app.use(express.json());

let estudiantes = [];
let id = 1;

// Obtener todos los estudiantes
app.get('/api/estudiantes', (req, res) => {
  res.json(estudiantes);
});

// Agregar un estudiante
app.post('/api/estudiantes', (req, res) => {
  const estudiante = { id: id++, ...req.body };
  estudiantes.push(estudiante);
  res.status(201).json(estudiante);
});

// Eliminar un estudiante
app.delete('/api/estudiantes/:id', (req, res) => {
  const estudianteId = parseInt(req.params.id);
  estudiantes = estudiantes.filter(e => e.id !== estudianteId);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});


3 step
instalar cors

npm install express cors

4 step
se debe arrancar el backend y el frontend al tiempo

instalar concurrently

npm install concurrently --save-dev

modificar package.json con:

"scripts": {
  "start": "concurrently \"node server.js\" \"react-scripts start\""
}

y arrancar los servidores

npm start

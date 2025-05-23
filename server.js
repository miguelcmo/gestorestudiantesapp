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
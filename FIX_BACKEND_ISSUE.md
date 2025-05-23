
# Guía para integrar frontend y backend

## 1. Modificar `App.js`

Hay que asegurar que el estudiante se agregue a la tabla **solo cuando el backend responda correctamente**:

```js
// ...código existente...

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

// ...código existente...
```

---

## 2. Crear el servidor backend (`server.js`)

Luego aparece el siguiente error:

> `NetworkError when attempting to fetch resource.`

Esto ocurre porque el backend aún **no está corriendo** en el puerto `3030`.

### Solución: crear `server.js` en la raíz del proyecto

```js
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
```

---

## 3. Instalar dependencias del backend

```bash
npm install express cors
```

---

## 4. Ejecutar backend y frontend simultáneamente

### Instalar `concurrently`:

```bash
npm install concurrently --save-dev
```

### Modificar el `package.json`:

```json
"scripts": {
  "start": "concurrently \"node server.js\" \"react-scripts start\""
}
```

### Iniciar ambos servidores:

```bash
npm start
```

const express = require('express');
const app = express();
const libros = require('./libros');

app.use(express.json());

// app.get('/health', (req, res) => {
//   res.status(200).json({ status: 'ok', service: 'crud-libros', version: '2.0.0' });
// });

app.get('/libros', (req, res) => {
  res.status(200).json(libros.getAll());
});

app.get('/libros/:id', (req, res) => {
  const libro = libros.getById(parseInt(req.params.id));
  if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });
  res.status(200).json(libro);
});

app.post('/libros', (req, res) => {
  const { titulo, autor, anio } = req.body;
  if (!titulo || !autor || !anio) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  const nuevo = libros.create(titulo, autor, anio);
  res.status(201).json(nuevo);
});

app.put('/libros/:id', (req, res) => {
  const { titulo, autor, anio } = req.body;
  const actualizado = libros.update(parseInt(req.params.id), titulo, autor, anio);
  if (!actualizado) return res.status(404).json({ error: 'Libro no encontrado' });
  res.status(200).json(actualizado);
});

app.delete('/libros/:id', (req, res) => {
  const eliminado = libros.remove(parseInt(req.params.id));
  if (!eliminado) return res.status(404).json({ error: 'Libro no encontrado' });
  res.status(200).json({ mensaje: 'Libro eliminado correctamente' });
});

app.get('/libros/buscar/:titulo', (req, res) => {
  const resultado = libros.getAll().filter((l) =>
    l.titulo.toLowerCase().includes(req.params.titulo.toLowerCase())
  );
  res.status(200).json(resultado);
});

module.exports = app;
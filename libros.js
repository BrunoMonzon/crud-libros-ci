const libros = [
  { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', anio: 1967 },
  { id: 2, titulo: 'El principito', autor: 'Antoine de Saint-Exupéry', anio: 1943 }
];

let nextId = 3;

const getAll = () => libros;

const getById = (id) => libros.find((l) => l.id === id);

const create = (titulo, autor, anio) => {
  const nuevo = { id: nextId++, titulo, autor, anio };
  libros.push(nuevo);
  return nuevo;
};

const update = (id, titulo, autor, anio) => {
  const libro = libros.find((l) => l.id === id);
  if (!libro) return null;
  libro.titulo = titulo;
  libro.autor = autor;
  libro.anio = anio;
  return libro;
};

const remove = (id) => {
  const index = libros.findIndex((l) => l.id === id);
  if (index === -1) return false;
  libros.splice(index, 1);
  return true;
};

module.exports = { getAll, getById, create, update, remove };
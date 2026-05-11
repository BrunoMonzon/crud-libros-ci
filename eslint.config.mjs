const request = require('supertest');
const app = require('./app');

describe('CRUD Libros', () => {
  test('GET /libros debe retornar lista de libros', async () => {
    const res = await request(app).get('/libros');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /libros/:id debe retornar un libro existente', async () => {
    const res = await request(app).get('/libros/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
  });

  test('GET /libros/:id debe retornar 404 si no existe', async () => {
    const res = await request(app).get('/libros/999');
    expect(res.statusCode).toBe(404);
  });

  test('POST /libros debe crear un nuevo libro', async () => {
    const res = await request(app).post('/libros').send({
      titulo: 'Don Quijote',
      autor: 'Miguel de Cervantes',
      anio: 1605
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.titulo).toBe('Don Quijote');
  });

  test('POST /libros debe retornar 400 si faltan campos', async () => {
    const res = await request(app).post('/libros').send({ titulo: 'Incompleto' });
    expect(res.statusCode).toBe(400);
  });

  test('PUT /libros/:id debe actualizar un libro', async () => {
    const res = await request(app).put('/libros/2').send({
      titulo: 'El principito actualizado',
      autor: 'Saint-Exupéry',
      anio: 1943
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.titulo).toBe('El principito actualizado');
  });

  test('DELETE /libros/:id debe eliminar un libro', async () => {
    const res = await request(app).delete('/libros/1');
    expect(res.statusCode).toBe(200);
  });

  test('DELETE /libros/:id debe retornar 404 si no existe', async () => {
    const res = await request(app).delete('/libros/999');
    expect(res.statusCode).toBe(404);
  });
});
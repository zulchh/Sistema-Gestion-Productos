
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { app } = require('../server');

let mongoServer;


beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();

    const uri = mongoServer.getUri();

    await mongoose.connect(uri, {
    runtimeAdapters: {
        os: require('os')
    }
});
}, 60000);



afterAll(async () => {
    await mongoose.disconnect();

    if (mongoServer) {
        await mongoServer.stop();
    }
}, 60000);


describe('Pruebas del Sistema de Gestión de Productos', () => {

    test('Debe mostrar la interfaz principal del sistema', async () => {
        const respuesta = await request(app).get('/');

        expect(respuesta.statusCode).toBe(200);
        expect(respuesta.headers['content-type']).toMatch(/text\/html/);
        expect(respuesta.text).toContain(
            'Sistema de Gestión de Productos'
        );
    });

    test('Debe impedir el acceso a productos sin un token', async () => {
        const respuesta = await request(app).get('/api/productos');

        expect(respuesta.statusCode).toBe(401);
        expect(respuesta.body.mensaje).toBe(
            'No estás autorizado. Se requiere un token'
        );
    });

    test('Debe registrar un usuario correctamente', async () => {
        const respuesta = await request(app)
            .post('/api/usuarios/registro')
            .send({
                nombre: 'Usuario de Prueba',
                email: 'pruebaautomatizada@gmail.com',
                password: '123456'
            });

        expect(respuesta.statusCode).toBe(201);
        expect(respuesta.body.mensaje).toBe(
            'Usuario registrado correctamente'
        );
        expect(respuesta.body.usuario.email).toBe(
            'pruebaautomatizada@gmail.com'
        );
    });

    test('Debe iniciar sesión y generar un token JWT', async () => {
        const respuesta = await request(app)
            .post('/api/usuarios/login')
            .send({
                email: 'pruebaautomatizada@gmail.com',
                password: '123456'
            });

        expect(respuesta.statusCode).toBe(200);
        expect(respuesta.body.mensaje).toBe(
            'Inicio de sesión exitoso'
        );
        expect(respuesta.body.token).toBeDefined();
    });

    test('Debe rechazar una contraseña incorrecta', async () => {
        const respuesta = await request(app)
            .post('/api/usuarios/login')
            .send({
                email: 'pruebaautomatizada@gmail.com',
                password: 'contraseñaIncorrecta'
            });

        expect(respuesta.statusCode).toBe(401);
        expect(respuesta.body.mensaje).toBe(
            'Correo o contraseña incorrectos'
        );
    });

});

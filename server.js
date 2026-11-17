
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const conectarDB = require('./config/database');

dotenv.config();

const app = express();

// Middlewares generales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const productoRoutes = require('./routes/productoRoutes');

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        mensaje: 'Bienvenido al Sistema de Gestión de Productos',
        estado: 'Servidor funcionando correctamente'
    });
});

// Rutas de la API
app.use('/api/usuarios', authRoutes);
app.use('/api/productos', productoRoutes);

// Iniciar servidor y conectar base de datos

const iniciarServidor = async () => {
    try {
        await conectarDB();

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Servidor funcionando en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Error al iniciar el servidor:', error.message);
        process.exit(1);
    }
};

if (require.main === module) {
    iniciarServidor();
}

module.exports = { app, iniciarServidor };

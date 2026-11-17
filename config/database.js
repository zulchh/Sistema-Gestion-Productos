
const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('Conexión con MongoDB establecida correctamente');

    } catch (error) {
        console.error('Error al conectar con MongoDB:', error.message);
        throw error;
    }
};

module.exports = conectarDB;

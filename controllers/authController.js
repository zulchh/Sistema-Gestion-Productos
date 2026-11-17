
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

// Registrar un usuario
const registrarUsuario = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        const usuarioExiste = await Usuario.findOne({ email });

        if (usuarioExiste) {
            return res.status(400).json({
                mensaje: 'El correo electrónico ya está registrado'
            });
        }

        const usuario = await Usuario.create({
            nombre,
            email,
            password
        });

        res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email
            }
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al registrar el usuario',
            error: error.message
        });
    }
};

// Iniciar sesión
const iniciarSesion = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await Usuario.findOne({ email });

        if (!usuario || !(await usuario.compararPassword(password))) {
            return res.status(401).json({
                mensaje: 'Correo o contraseña incorrectos'
            });
        }

        const token = jwt.sign(
            {
                id: usuario._id,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            mensaje: 'Inicio de sesión exitoso',
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            }
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al iniciar sesión',
            error: error.message
        });
    }
};

module.exports = {
    registrarUsuario,
    iniciarSesion
};

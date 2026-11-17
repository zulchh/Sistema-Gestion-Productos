
const Producto = require('../models/Producto');

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();

        res.json(productos);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener los productos',
            error: error.message
        });
    }
};

// Obtener un producto por su ID
const obtenerProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.json(producto);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al consultar el producto',
            error: error.message
        });
    }
};

// Crear un producto
const crearProducto = async (req, res) => {
    try {
        const producto = await Producto.create(req.body);

        res.status(201).json({
            mensaje: 'Producto creado correctamente',
            producto
        });
    } catch (error) {
        res.status(400).json({
            mensaje: 'No fue posible crear el producto',
            error: error.message
        });
    }
};

// Actualizar un producto
const actualizarProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.json({
            mensaje: 'Producto actualizado correctamente',
            producto
        });
    } catch (error) {
        res.status(400).json({
            mensaje: 'Error al actualizar el producto',
            error: error.message
        });
    }
};

// Eliminar un producto
const eliminarProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndDelete(req.params.id);

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.json({
            mensaje: 'Producto eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar el producto',
            error: error.message
        });
    }
};

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};

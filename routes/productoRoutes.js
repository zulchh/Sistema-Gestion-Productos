
const express = require('express');
const router = express.Router();

const protegerRuta = require('../middlewares/authMiddleware');

const {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} = require('../controllers/productoController');

// Todas las rutas de productos estarán protegidas
router.use(protegerRuta);

router.get('/', obtenerProductos);
router.get('/:id', obtenerProducto);
router.post('/', crearProducto);
router.put('/:id', actualizarProducto);
router.delete('/:id', eliminarProducto);

module.exports = router;

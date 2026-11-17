
const jwt = require('jsonwebtoken');

const protegerRuta = (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decodificado = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            req.usuario = decodificado;

            next();
        } catch (error) {
            return res.status(401).json({
                mensaje: 'Token inválido o expirado'
            });
        }
    } else {
        return res.status(401).json({
            mensaje: 'No estás autorizado. Se requiere un token'
        });
    }
};

module.exports = protegerRuta;

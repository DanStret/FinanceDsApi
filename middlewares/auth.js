const jwt = require('jsonwebtoken');
const pool = require('../config/database');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'No hay token, autorización denegada' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const [users] = await pool.query(
            'SELECT * FROM Usuarios WHERE id_usuario = ?',
            [decoded.id]
        );

        if (users.length === 0) {
            return res.status(401).json({ message: 'Token no válido' });
        }

        req.user = users[0];
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Token no válido' });
    }
};

module.exports = auth; 
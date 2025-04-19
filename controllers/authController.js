const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');
const { validationResult } = require('express-validator');

const authController = {
    register: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { nombre, correo, contraseña } = req.body;

            // Verificar si el usuario ya existe
            const [existingUser] = await pool.query(
                'SELECT * FROM Usuarios WHERE correo = ?',
                [correo]
            );

            if (existingUser.length > 0) {
                return res.status(400).json({ message: 'El usuario ya existe' });
            }

            // Obtener el ID del rol de usuario
            const [roles] = await pool.query(
                'SELECT id_rol FROM Roles WHERE nombre = ?',
                ['Usuario']
            );

            if (roles.length === 0) {
                return res.status(500).json({ message: 'Error: Rol de usuario no encontrado' });
            }

            const id_rol = roles[0].id_rol;

            // Encriptar la contraseña
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(contraseña, salt);

            // Crear el usuario
            const [result] = await pool.query(
                'INSERT INTO Usuarios (nombre, correo, contraseña_hash, id_rol) VALUES (?, ?, ?, ?)',
                [nombre, correo, hashedPassword, id_rol]
            );

            // Generar el token JWT
            const token = jwt.sign(
                { 
                    id: result.insertId,
                    rol: 'Usuario' // Por defecto, el rol es 'Usuario' en el registro
                },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.status(201).json({
                token,
                user: {
                    id: result.insertId,
                    nombre,
                    correo,
                    rol: 'Usuario'
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    login: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { correo, contraseña } = req.body;

            // Buscar el usuario
            const [users] = await pool.query(
                'SELECT u.*, r.nombre as rol_nombre FROM Usuarios u JOIN Roles r ON u.id_rol = r.id_rol WHERE u.correo = ?',
                [correo]
            );

            if (users.length === 0) {
                return res.status(400).json({ message: 'Credenciales inválidas' });
            }

            const user = users[0];

            // Verificar la contraseña
            const isMatch = await bcrypt.compare(contraseña, user.contraseña_hash);
            if (!isMatch) {
                return res.status(400).json({ message: 'Credenciales inválidas' });
            }

            // Generar el token JWT
            const token = jwt.sign(
                { 
                    id_usuario: user.id_usuario,
                    rol: user.rol_nombre
                },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                message: "Login exitoso",
                status: "success",
                token
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    // Ruta para verificar el token
    verifyToken: async (req, res) => {
        try {
            const token = req.header('Authorization')?.replace('Bearer ', '');

            if (!token) {
                return res.status(401).json({ message: 'No hay token, autorización denegada' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            const [users] = await pool.query(
                'SELECT id_usuario, nombre, correo FROM Usuarios WHERE id_usuario = ?',
                [decoded.id]
            );

            if (users.length === 0) {
                return res.status(401).json({ message: 'Token no válido' });
            }

            res.json({
                user: users[0],
                token
            });
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Token no válido' });
        }
    }
};

module.exports = authController; 
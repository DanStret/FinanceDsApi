const pool = require('../config/database');
const { validationResult } = require('express-validator');

const rolesController = {
    // Obtener todos los roles
    getRoles: async (req, res) => {
        try {
            const [roles] = await pool.query('SELECT * FROM Roles');
            res.json(roles);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    // Obtener un rol por ID
    getRolById: async (req, res) => {
        try {
            const [roles] = await pool.query(
                'SELECT * FROM Roles WHERE id_rol = ?',
                [req.params.id]
            );

            if (roles.length === 0) {
                return res.status(404).json({ message: 'Rol no encontrado' });
            }

            res.json(roles[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    // Crear un nuevo rol
    createRol: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { nombre } = req.body;

            // Verificar si el rol ya existe
            const [existingRoles] = await pool.query(
                'SELECT * FROM Roles WHERE nombre = ?',
                [nombre]
            );

            if (existingRoles.length > 0) {
                return res.status(400).json({ message: 'El rol ya existe' });
            }

            const [result] = await pool.query(
                'INSERT INTO Roles (nombre) VALUES (?)',
                [nombre]
            );

            const [newRol] = await pool.query(
                'SELECT * FROM Roles WHERE id_rol = ?',
                [result.insertId]
            );

            res.status(201).json(newRol[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    // Actualizar un rol
    updateRol: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { nombre } = req.body;

            // Verificar si el rol ya existe (excluyendo el rol actual)
            const [existingRoles] = await pool.query(
                'SELECT * FROM Roles WHERE nombre = ? AND id_rol != ?',
                [nombre, req.params.id]
            );

            if (existingRoles.length > 0) {
                return res.status(400).json({ message: 'El rol ya existe' });
            }

            const [result] = await pool.query(
                'UPDATE Roles SET nombre = ? WHERE id_rol = ?',
                [nombre, req.params.id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Rol no encontrado' });
            }

            const [updatedRol] = await pool.query(
                'SELECT * FROM Roles WHERE id_rol = ?',
                [req.params.id]
            );

            res.json(updatedRol[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    // Eliminar un rol
    deleteRol: async (req, res) => {
        try {
            // Verificar si hay usuarios con este rol
            const [users] = await pool.query(
                'SELECT * FROM Usuarios WHERE id_rol = ?',
                [req.params.id]
            );

            if (users.length > 0) {
                return res.status(400).json({ 
                    message: 'No se puede eliminar el rol porque hay usuarios asignados a él' 
                });
            }

            const [result] = await pool.query(
                'DELETE FROM Roles WHERE id_rol = ?',
                [req.params.id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Rol no encontrado' });
            }

            res.json({ message: 'Rol eliminado correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    // Obtener usuarios por rol
    getUsersByRol: async (req, res) => {
        try {
            const [users] = await pool.query(
                'SELECT id_usuario, nombre, correo FROM Usuarios WHERE id_rol = ?',
                [req.params.id]
            );
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    }
};

module.exports = rolesController; 
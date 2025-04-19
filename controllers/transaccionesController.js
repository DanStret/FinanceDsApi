const pool = require('../config/database');
const { validationResult } = require('express-validator');

const transaccionesController = {
    getTransacciones: async (req, res) => {
        try {
            const [transacciones] = await pool.query(
                'SELECT * FROM Transacciones WHERE id_usuario = ? ORDER BY fecha DESC',
                [req.user.id_usuario]
            );
            res.json(transacciones);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    getTransaccionById: async (req, res) => {
        try {
            const [transacciones] = await pool.query(
                'SELECT * FROM Transacciones WHERE id_transaccion = ? AND id_usuario = ?',
                [req.params.id, req.user.id_usuario]
            );

            if (transacciones.length === 0) {
                return res.status(404).json({ message: 'Transacción no encontrada' });
            }

            res.json(transacciones[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    createTransaccion: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { descripcion, categoria, tipo, monto, fecha } = req.body;

            const [result] = await pool.query(
                'INSERT INTO Transacciones (id_usuario, descripcion, categoria, tipo, monto, fecha) VALUES (?, ?, ?, ?, ?, ?)',
                [req.user.id_usuario, descripcion, categoria, tipo, monto, fecha]
            );

            const [newTransaccion] = await pool.query(
                'SELECT * FROM Transacciones WHERE id_transaccion = ?',
                [result.insertId]
            );

            res.status(201).json(newTransaccion[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    updateTransaccion: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { descripcion, categoria, tipo, monto, fecha } = req.body;

            const [result] = await pool.query(
                'UPDATE Transacciones SET descripcion = ?, categoria = ?, tipo = ?, monto = ?, fecha = ? WHERE id_transaccion = ? AND id_usuario = ?',
                [descripcion, categoria, tipo, monto, fecha, req.params.id, req.user.id_usuario]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Transacción no encontrada' });
            }

            const [updatedTransaccion] = await pool.query(
                'SELECT * FROM Transacciones WHERE id_transaccion = ?',
                [req.params.id]
            );

            res.json(updatedTransaccion[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    deleteTransaccion: async (req, res) => {
        try {
            const [result] = await pool.query(
                'DELETE FROM Transacciones WHERE id_transaccion = ? AND id_usuario = ?',
                [req.params.id, req.user.id_usuario]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Transacción no encontrada' });
            }

            res.json({ message: 'Transacción eliminada correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    }
};

module.exports = transaccionesController; 
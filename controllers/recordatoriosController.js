const pool = require('../config/database');
const { validationResult } = require('express-validator');

const recordatoriosController = {
    getRecordatorios: async (req, res) => {
        try {
            const [recordatorios] = await pool.query(
                'SELECT * FROM Recordatorios WHERE id_usuario = ? ORDER BY fecha ASC',
                [req.user.id_usuario]
            );
            res.json(recordatorios);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    getRecordatorioById: async (req, res) => {
        try {
            const [recordatorios] = await pool.query(
                'SELECT * FROM Recordatorios WHERE id_recordatorio = ? AND id_usuario = ?',
                [req.params.id, req.user.id_usuario]
            );

            if (recordatorios.length === 0) {
                return res.status(404).json({ message: 'Recordatorio no encontrado' });
            }

            res.json(recordatorios[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    createRecordatorio: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { titulo, descripcion, fecha, es_recurrente } = req.body;

            const [result] = await pool.query(
                'INSERT INTO Recordatorios (id_usuario, titulo, descripcion, fecha, es_recurrente) VALUES (?, ?, ?, ?, ?)',
                [req.user.id_usuario, titulo, descripcion || null, fecha, es_recurrente || false]
            );

            const [newRecordatorio] = await pool.query(
                'SELECT * FROM Recordatorios WHERE id_recordatorio = ?',
                [result.insertId]
            );

            res.status(201).json(newRecordatorio[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    updateRecordatorio: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { titulo, descripcion, fecha, es_recurrente } = req.body;

            const [result] = await pool.query(
                'UPDATE Recordatorios SET titulo = ?, descripcion = ?, fecha = ?, es_recurrente = ? WHERE id_recordatorio = ? AND id_usuario = ?',
                [titulo, descripcion || null, fecha, es_recurrente || false, req.params.id, req.user.id_usuario]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Recordatorio no encontrado' });
            }

            const [updatedRecordatorio] = await pool.query(
                'SELECT * FROM Recordatorios WHERE id_recordatorio = ?',
                [req.params.id]
            );

            res.json(updatedRecordatorio[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    deleteRecordatorio: async (req, res) => {
        try {
            const [result] = await pool.query(
                'DELETE FROM Recordatorios WHERE id_recordatorio = ? AND id_usuario = ?',
                [req.params.id, req.user.id_usuario]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Recordatorio no encontrado' });
            }

            res.json({ message: 'Recordatorio eliminado correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    }
};

module.exports = recordatoriosController; 
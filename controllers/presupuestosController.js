const pool = require('../config/database');
const { validationResult } = require('express-validator');

const presupuestosController = {
    getPresupuestos: async (req, res) => {
        try {
            const [presupuestos] = await pool.query(
                'SELECT * FROM Presupuestos WHERE id_usuario = ? ORDER BY anio DESC, mes DESC',
                [req.user.id_usuario]
            );
            res.json(presupuestos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    getPresupuestoById: async (req, res) => {
        try {
            const [presupuestos] = await pool.query(
                'SELECT * FROM Presupuestos WHERE id_presupuesto = ? AND id_usuario = ?',
                [req.params.id, req.user.id_usuario]
            );

            if (presupuestos.length === 0) {
                return res.status(404).json({ message: 'Presupuesto no encontrado' });
            }

            res.json(presupuestos[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    createPresupuesto: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { categoria, limite, mes, anio } = req.body;

            // Check if budget already exists for this category, month and year
            const [existingBudget] = await pool.query(
                'SELECT * FROM Presupuestos WHERE id_usuario = ? AND categoria = ? AND mes = ? AND anio = ?',
                [req.user.id_usuario, categoria, mes, anio]
            );

            if (existingBudget.length > 0) {
                return res.status(400).json({ message: 'Ya existe un presupuesto para esta categoría en el mes y año especificados' });
            }

            const [result] = await pool.query(
                'INSERT INTO Presupuestos (id_usuario, categoria, limite, mes, anio) VALUES (?, ?, ?, ?, ?)',
                [req.user.id_usuario, categoria, limite, mes, anio]
            );

            const [newPresupuesto] = await pool.query(
                'SELECT * FROM Presupuestos WHERE id_presupuesto = ?',
                [result.insertId]
            );

            res.status(201).json(newPresupuesto[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    updatePresupuesto: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { categoria, limite, mes, anio } = req.body;

            // Check if budget already exists for this category, month and year (excluding current budget)
            const [existingBudget] = await pool.query(
                'SELECT * FROM Presupuestos WHERE id_usuario = ? AND categoria = ? AND mes = ? AND anio = ? AND id_presupuesto != ?',
                [req.user.id_usuario, categoria, mes, anio, req.params.id]
            );

            if (existingBudget.length > 0) {
                return res.status(400).json({ message: 'Ya existe un presupuesto para esta categoría en el mes y año especificados' });
            }

            const [result] = await pool.query(
                'UPDATE Presupuestos SET categoria = ?, limite = ?, mes = ?, anio = ? WHERE id_presupuesto = ? AND id_usuario = ?',
                [categoria, limite, mes, anio, req.params.id, req.user.id_usuario]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Presupuesto no encontrado' });
            }

            const [updatedPresupuesto] = await pool.query(
                'SELECT * FROM Presupuestos WHERE id_presupuesto = ?',
                [req.params.id]
            );

            res.json(updatedPresupuesto[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    deletePresupuesto: async (req, res) => {
        try {
            const [result] = await pool.query(
                'DELETE FROM Presupuestos WHERE id_presupuesto = ? AND id_usuario = ?',
                [req.params.id, req.user.id_usuario]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Presupuesto no encontrado' });
            }

            res.json({ message: 'Presupuesto eliminado correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    }
};

module.exports = presupuestosController; 
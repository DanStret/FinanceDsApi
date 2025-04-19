const pool = require('../config/database');

const alertasController = {
    getAlertas: async (req, res) => {
        try {
            const [alertas] = await pool.query(
                'SELECT * FROM AlertasIA WHERE id_usuario = ? ORDER BY fecha_generada DESC',
                [req.user.id_usuario]
            );
            res.json(alertas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    getUnreadAlertas: async (req, res) => {
        try {
            const [alertas] = await pool.query(
                'SELECT * FROM AlertasIA WHERE id_usuario = ? AND leido = false ORDER BY fecha_generada DESC',
                [req.user.id_usuario]
            );
            res.json(alertas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    markAsRead: async (req, res) => {
        try {
            const [result] = await pool.query(
                'UPDATE AlertasIA SET leido = true WHERE id_alerta = ? AND id_usuario = ?',
                [req.params.id, req.user.id_usuario]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Alerta no encontrada' });
            }

            res.json({ message: 'Alerta marcada como leída' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },

    deleteAlerta: async (req, res) => {
        try {
            const [result] = await pool.query(
                'DELETE FROM AlertasIA WHERE id_alerta = ? AND id_usuario = ?',
                [req.params.id, req.user.id_usuario]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Alerta no encontrada' });
            }

            res.json({ message: 'Alerta eliminada correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    }
};

module.exports = alertasController; 
const pool = require('../config/database');

class Ingreso {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM Ingresos');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM Ingresos WHERE id_ingreso = ?', [id]);
        return rows[0];
    }

    static async getByUsuario(id_usuario) {
        const [rows] = await pool.query('SELECT * FROM Ingresos WHERE id_usuario = ?', [id_usuario]);
        return rows;
    }

    static async create({ id_usuario, id_categoria, monto, descripcion, fecha }) {
        const [result] = await pool.query(
            'INSERT INTO Ingresos (id_usuario, id_categoria, monto, descripcion, fecha) VALUES (?, ?, ?, ?, ?)',
            [id_usuario, id_categoria, monto, descripcion, fecha]
        );
        return result.insertId;
    }

    static async update(id, { id_categoria, monto, descripcion, fecha }) {
        await pool.query(
            'UPDATE Ingresos SET id_categoria = ?, monto = ?, descripcion = ?, fecha = ? WHERE id_ingreso = ?',
            [id_categoria, monto, descripcion, fecha, id]
        );
        return true;
    }

    static async delete(id) {
        await pool.query('DELETE FROM Ingresos WHERE id_ingreso = ?', [id]);
        return true;
    }

    static async getTotalByUsuario(id_usuario) {
        const [rows] = await pool.query(
            'SELECT SUM(monto) as total FROM Ingresos WHERE id_usuario = ?',
            [id_usuario]
        );
        return rows[0].total || 0;
    }

    static async getByCategoria(id_usuario, id_categoria) {
        const [rows] = await pool.query(
            'SELECT * FROM Ingresos WHERE id_usuario = ? AND id_categoria = ?',
            [id_usuario, id_categoria]
        );
        return rows;
    }

    static async getByFecha(id_usuario, fecha_inicio, fecha_fin) {
        const [rows] = await pool.query(
            'SELECT * FROM Ingresos WHERE id_usuario = ? AND fecha BETWEEN ? AND ?',
            [id_usuario, fecha_inicio, fecha_fin]
        );
        return rows;
    }
}

module.exports = Ingreso; 
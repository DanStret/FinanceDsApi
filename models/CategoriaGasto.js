const pool = require('../config/database');

class CategoriaGasto {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM CategoriasGastos');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM CategoriasGastos WHERE id_categoria = ?', [id]);
        return rows[0];
    }

    static async create(nombre, descripcion = '') {
        const [result] = await pool.query(
            'INSERT INTO CategoriasGastos (nombre, descripcion) VALUES (?, ?)',
            [nombre, descripcion]
        );
        return result.insertId;
    }

    static async update(id, nombre, descripcion = '') {
        await pool.query(
            'UPDATE CategoriasGastos SET nombre = ?, descripcion = ? WHERE id_categoria = ?',
            [nombre, descripcion, id]
        );
        return true;
    }

    static async delete(id) {
        await pool.query('DELETE FROM CategoriasGastos WHERE id_categoria = ?', [id]);
        return true;
    }
}

module.exports = CategoriaGasto; 
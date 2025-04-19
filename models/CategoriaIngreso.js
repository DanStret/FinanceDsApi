const pool = require('../config/database');

class CategoriaIngreso {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM CategoriasIngresos');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM CategoriasIngresos WHERE id_categoria = ?', [id]);
        return rows[0];
    }

    static async create(nombre) {
        const [result] = await pool.query(
            'INSERT INTO CategoriasIngresos (nombre) VALUES (?)',
            [nombre]
        );
        return result.insertId;
    }

    static async update(id, nombre) {
        await pool.query(
            'UPDATE CategoriasIngresos SET nombre = ? WHERE id_categoria = ?',
            [nombre, id]
        );
        return true;
    }

    static async delete(id) {
        await pool.query('DELETE FROM CategoriasIngresos WHERE id_categoria = ?', [id]);
        return true;
    }
}

module.exports = CategoriaIngreso; 
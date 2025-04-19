const pool = require('../config/database');

class Rol {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM Roles');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM Roles WHERE id_rol = ?', [id]);
        return rows[0];
    }

    static async create(nombre) {
        const [result] = await pool.query(
            'INSERT INTO Roles (nombre) VALUES (?)',
            [nombre]
        );
        return result.insertId;
    }

    static async update(id, nombre) {
        await pool.query(
            'UPDATE Roles SET nombre = ? WHERE id_rol = ?',
            [nombre, id]
        );
        return true;
    }

    static async delete(id) {
        await pool.query('DELETE FROM Roles WHERE id_rol = ?', [id]);
        return true;
    }
}

module.exports = Rol; 
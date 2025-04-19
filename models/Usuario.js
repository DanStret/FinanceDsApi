const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class Usuario {
    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM Usuarios');
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM Usuarios WHERE id_usuario = ?', [id]);
        return rows[0];
    }

    static async getByEmail(correo) {
        const [rows] = await pool.query('SELECT * FROM Usuarios WHERE correo = ?', [correo]);
        return rows[0];
    }

    static async create({ nombre, correo, contraseña, id_rol }) {
        const contraseña_hash = await bcrypt.hash(contraseña, 10);
        const [result] = await pool.query(
            'INSERT INTO Usuarios (nombre, correo, contraseña_hash, id_rol) VALUES (?, ?, ?, ?)',
            [nombre, correo, contraseña_hash, id_rol]
        );
        return result.insertId;
    }

    static async update(id, { nombre, correo, contraseña, id_rol }) {
        let query = 'UPDATE Usuarios SET ';
        const values = [];
        
        if (nombre) {
            query += 'nombre = ?, ';
            values.push(nombre);
        }
        if (correo) {
            query += 'correo = ?, ';
            values.push(correo);
        }
        if (contraseña) {
            const contraseña_hash = await bcrypt.hash(contraseña, 10);
            query += 'contraseña_hash = ?, ';
            values.push(contraseña_hash);
        }
        if (id_rol) {
            query += 'id_rol = ?, ';
            values.push(id_rol);
        }

        query = query.slice(0, -2); // Remove last comma and space
        query += ' WHERE id_usuario = ?';
        values.push(id);

        await pool.query(query, values);
        return true;
    }

    static async delete(id) {
        await pool.query('DELETE FROM Usuarios WHERE id_usuario = ?', [id]);
        return true;
    }

    static async comparePassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}

module.exports = Usuario; 
const CategoriaGasto = require('../models/CategoriaGasto');

const categoriasGastosController = {
    // Obtener todas las categorías de gastos
    async getAll(req, res) {
        try {
            const categorias = await CategoriaGasto.getAll();
            res.json(categorias);
        } catch (error) {
            console.error('Error al obtener categorías de gastos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Obtener una categoría de gasto por ID
    async getById(req, res) {
        try {
            const categoria = await CategoriaGasto.getById(req.params.id);
            if (!categoria) {
                return res.status(404).json({ error: 'Categoría no encontrada' });
            }
            res.json(categoria);
        } catch (error) {
            console.error('Error al obtener categoría de gasto:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Crear una nueva categoría de gasto
    async create(req, res) {
        try {
            const { nombre, descripcion } = req.body;
            
            if (!nombre || nombre.trim().length < 3) {
                return res.status(400).json({ 
                    error: 'El nombre es requerido y debe tener al menos 3 caracteres' 
                });
            }

            const id = await CategoriaGasto.create(nombre.trim(), descripcion?.trim() || '');
            const nuevaCategoria = await CategoriaGasto.getById(id);
            res.status(201).json(nuevaCategoria);
        } catch (error) {
            console.error('Error al crear categoría de gasto:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Actualizar una categoría de gasto
    async update(req, res) {
        try {
            const { nombre, descripcion } = req.body;
            
            if (!nombre || nombre.trim().length < 3) {
                return res.status(400).json({ 
                    error: 'El nombre es requerido y debe tener al menos 3 caracteres' 
                });
            }

            const categoria = await CategoriaGasto.getById(req.params.id);
            if (!categoria) {
                return res.status(404).json({ error: 'Categoría no encontrada' });
            }

            await CategoriaGasto.update(req.params.id, nombre.trim(), descripcion?.trim() || '');
            const categoriaActualizada = await CategoriaGasto.getById(req.params.id);
            res.json(categoriaActualizada);
        } catch (error) {
            console.error('Error al actualizar categoría de gasto:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Eliminar una categoría de gasto
    async delete(req, res) {
        try {
            const categoria = await CategoriaGasto.getById(req.params.id);
            if (!categoria) {
                return res.status(404).json({ error: 'Categoría no encontrada' });
            }

            await CategoriaGasto.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            console.error('Error al eliminar categoría de gasto:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

module.exports = categoriasGastosController; 
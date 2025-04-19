const CategoriaIngreso = require('../models/CategoriaIngreso');

const categoriasIngresosController = {
    // Obtener todas las categorías de ingresos
    async getAll(req, res) {
        try {
            const categorias = await CategoriaIngreso.getAll();
            res.json(categorias);
        } catch (error) {
            console.error('Error al obtener categorías de ingresos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Obtener una categoría de ingreso por ID
    async getById(req, res) {
        try {
            const categoria = await CategoriaIngreso.getById(req.params.id);
            if (!categoria) {
                return res.status(404).json({ error: 'Categoría no encontrada' });
            }
            res.json(categoria);
        } catch (error) {
            console.error('Error al obtener categoría de ingreso:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Crear una nueva categoría de ingreso
    async create(req, res) {
        try {
            const { nombre } = req.body;
            
            if (!nombre || nombre.trim().length < 3) {
                return res.status(400).json({ 
                    error: 'El nombre es requerido y debe tener al menos 3 caracteres' 
                });
            }

            const id = await CategoriaIngreso.create(nombre.trim());
            const nuevaCategoria = await CategoriaIngreso.getById(id);
            res.status(201).json(nuevaCategoria);
        } catch (error) {
            console.error('Error al crear categoría de ingreso:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Actualizar una categoría de ingreso
    async update(req, res) {
        try {
            const { nombre } = req.body;
            
            if (!nombre || nombre.trim().length < 3) {
                return res.status(400).json({ 
                    error: 'El nombre es requerido y debe tener al menos 3 caracteres' 
                });
            }

            const categoria = await CategoriaIngreso.getById(req.params.id);
            if (!categoria) {
                return res.status(404).json({ error: 'Categoría no encontrada' });
            }

            await CategoriaIngreso.update(req.params.id, nombre.trim());
            const categoriaActualizada = await CategoriaIngreso.getById(req.params.id);
            res.json(categoriaActualizada);
        } catch (error) {
            console.error('Error al actualizar categoría de ingreso:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Eliminar una categoría de ingreso
    async delete(req, res) {
        try {
            const categoria = await CategoriaIngreso.getById(req.params.id);
            if (!categoria) {
                return res.status(404).json({ error: 'Categoría no encontrada' });
            }

            await CategoriaIngreso.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            console.error('Error al eliminar categoría de ingreso:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

module.exports = categoriasIngresosController; 
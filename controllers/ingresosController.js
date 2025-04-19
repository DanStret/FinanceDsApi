const Ingreso = require('../models/Ingreso');

const ingresosController = {
    // Obtener todos los ingresos
    async getAll(req, res) {
        try {
            const ingresos = await Ingreso.getAll();
            res.json(ingresos);
        } catch (error) {
            console.error('Error al obtener ingresos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Obtener un ingreso por ID
    async getById(req, res) {
        try {
            const ingreso = await Ingreso.getById(req.params.id);
            if (!ingreso) {
                return res.status(404).json({ error: 'Ingreso no encontrado' });
            }
            res.json(ingreso);
        } catch (error) {
            console.error('Error al obtener ingreso:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Obtener ingresos por usuario
    async getByUsuario(req, res) {
        try {
            const ingresos = await Ingreso.getByUsuario(req.user.id);
            res.json(ingresos);
        } catch (error) {
            console.error('Error al obtener ingresos del usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Crear un nuevo ingreso
    async create(req, res) {
        try {
            const { id_categoria, monto, descripcion, fecha } = req.body;
            
            if (!id_categoria || !monto || !fecha) {
                return res.status(400).json({ 
                    error: 'La categoría, el monto y la fecha son requeridos' 
                });
            }

            if (monto <= 0) {
                return res.status(400).json({ 
                    error: 'El monto debe ser mayor que 0' 
                });
            }

            const id = await Ingreso.create({
                id_usuario: req.user.id,
                id_categoria,
                monto,
                descripcion: descripcion || '',
                fecha
            });

            const nuevoIngreso = await Ingreso.getById(id);
            res.status(201).json(nuevoIngreso);
        } catch (error) {
            console.error('Error al crear ingreso:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Actualizar un ingreso
    async update(req, res) {
        try {
            const { id_categoria, monto, descripcion, fecha } = req.body;
            
            if (!id_categoria || !monto || !fecha) {
                return res.status(400).json({ 
                    error: 'La categoría, el monto y la fecha son requeridos' 
                });
            }

            if (monto <= 0) {
                return res.status(400).json({ 
                    error: 'El monto debe ser mayor que 0' 
                });
            }

            const ingreso = await Ingreso.getById(req.params.id);
            if (!ingreso) {
                return res.status(404).json({ error: 'Ingreso no encontrado' });
            }

            if (ingreso.id_usuario !== req.user.id) {
                return res.status(403).json({ error: 'No autorizado' });
            }

            await Ingreso.update(req.params.id, {
                id_categoria,
                monto,
                descripcion: descripcion || '',
                fecha
            });

            const ingresoActualizado = await Ingreso.getById(req.params.id);
            res.json(ingresoActualizado);
        } catch (error) {
            console.error('Error al actualizar ingreso:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Eliminar un ingreso
    async delete(req, res) {
        try {
            const ingreso = await Ingreso.getById(req.params.id);
            if (!ingreso) {
                return res.status(404).json({ error: 'Ingreso no encontrado' });
            }

            if (ingreso.id_usuario !== req.user.id) {
                return res.status(403).json({ error: 'No autorizado' });
            }

            await Ingreso.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            console.error('Error al eliminar ingreso:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Obtener total de ingresos por usuario
    async getTotalByUsuario(req, res) {
        try {
            const total = await Ingreso.getTotalByUsuario(req.user.id);
            res.json({ total });
        } catch (error) {
            console.error('Error al obtener total de ingresos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Obtener ingresos por categoría
    async getByCategoria(req, res) {
        try {
            const ingresos = await Ingreso.getByCategoria(req.user.id, req.params.id_categoria);
            res.json(ingresos);
        } catch (error) {
            console.error('Error al obtener ingresos por categoría:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Obtener ingresos por rango de fechas
    async getByFecha(req, res) {
        try {
            const { fecha_inicio, fecha_fin } = req.query;
            
            if (!fecha_inicio || !fecha_fin) {
                return res.status(400).json({ 
                    error: 'Las fechas de inicio y fin son requeridas' 
                });
            }

            const ingresos = await Ingreso.getByFecha(req.user.id, fecha_inicio, fecha_fin);
            res.json(ingresos);
        } catch (error) {
            console.error('Error al obtener ingresos por fecha:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

module.exports = ingresosController; 
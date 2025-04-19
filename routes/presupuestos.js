const express = require('express');
const router = express.Router();
const presupuestosController = require('../controllers/presupuestosController');
const auth = require('../middlewares/auth');
const { check } = require('express-validator');

// Get all budgets
router.get('/', auth, presupuestosController.getPresupuestos);

// Get budget by ID
router.get('/:id', auth, presupuestosController.getPresupuestoById);

// Create budget
router.post('/', [
    auth,
    check('categoria', 'La categoría es requerida').not().isEmpty(),
    check('limite', 'El límite es requerido y debe ser un número').isNumeric(),
    check('mes', 'El mes es requerido y debe estar entre 1 y 12').isInt({ min: 1, max: 12 }),
    check('anio', 'El año es requerido').isInt()
], presupuestosController.createPresupuesto);

// Update budget
router.put('/:id', [
    auth,
    check('categoria', 'La categoría es requerida').not().isEmpty(),
    check('limite', 'El límite es requerido y debe ser un número').isNumeric(),
    check('mes', 'El mes es requerido y debe estar entre 1 y 12').isInt({ min: 1, max: 12 }),
    check('anio', 'El año es requerido').isInt()
], presupuestosController.updatePresupuesto);

// Delete budget
router.delete('/:id', auth, presupuestosController.deletePresupuesto);

module.exports = router; 
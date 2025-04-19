const express = require('express');
const router = express.Router();
const transaccionesController = require('../controllers/transaccionesController');
const auth = require('../middlewares/auth');
const { check } = require('express-validator');

// Get all transactions
router.get('/', auth, transaccionesController.getTransacciones);

// Get transaction by ID
router.get('/:id', auth, transaccionesController.getTransaccionById);

// Create transaction
router.post('/', [
    auth,
    check('descripcion', 'La descripción es requerida').not().isEmpty(),
    check('categoria', 'La categoría es requerida').not().isEmpty(),
    check('tipo', 'El tipo es requerido').isIn(['ingreso', 'gasto']),
    check('monto', 'El monto es requerido y debe ser un número').isNumeric(),
    check('fecha', 'La fecha es requerida').not().isEmpty()
], transaccionesController.createTransaccion);

// Update transaction
router.put('/:id', [
    auth,
    check('descripcion', 'La descripción es requerida').not().isEmpty(),
    check('categoria', 'La categoría es requerida').not().isEmpty(),
    check('tipo', 'El tipo es requerido').isIn(['ingreso', 'gasto']),
    check('monto', 'El monto es requerido y debe ser un número').isNumeric(),
    check('fecha', 'La fecha es requerida').not().isEmpty()
], transaccionesController.updateTransaccion);

// Delete transaction
router.delete('/:id', auth, transaccionesController.deleteTransaccion);

module.exports = router; 
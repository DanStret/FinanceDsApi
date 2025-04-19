const express = require('express');
const router = express.Router();
const recordatoriosController = require('../controllers/recordatoriosController');
const auth = require('../middlewares/auth');
const { check } = require('express-validator');

// Get all reminders
router.get('/', auth, recordatoriosController.getRecordatorios);

// Get reminder by ID
router.get('/:id', auth, recordatoriosController.getRecordatorioById);

// Create reminder
router.post('/', [
    auth,
    check('titulo', 'El título es requerido').not().isEmpty(),
    check('fecha', 'La fecha es requerida').not().isEmpty()
], recordatoriosController.createRecordatorio);

// Update reminder
router.put('/:id', [
    auth,
    check('titulo', 'El título es requerido').not().isEmpty(),
    check('fecha', 'La fecha es requerida').not().isEmpty()
], recordatoriosController.updateRecordatorio);

// Delete reminder
router.delete('/:id', auth, recordatoriosController.deleteRecordatorio);

module.exports = router; 
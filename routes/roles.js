const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/rolesController');
const auth = require('../middlewares/auth');
const { check } = require('express-validator');

// Get all roles
router.get('/', rolesController.getRoles);

// Get role by id
router.get('/:id', rolesController.getRolById);

// Create new role
router.post('/', [
    auth,
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('nombre', 'El nombre debe tener al menos 3 caracteres').isLength({ min: 3 })
], rolesController.createRol);

// Update role
router.put('/:id', [
    auth,
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('nombre', 'El nombre debe tener al menos 3 caracteres').isLength({ min: 3 })
], rolesController.updateRol);

// Delete role
router.delete('/:id', auth, rolesController.deleteRol);

module.exports = router; 
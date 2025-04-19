const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');
const { check } = require('express-validator');

// Register route
router.post('/register', [
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('correo', 'El correo es requerido').isEmail(),
    check('contraseña', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 })
], authController.register);

// Login route
router.post('/login', [
    check('correo', 'El correo es requerido').isEmail(),
    check('contraseña', 'La contraseña es requerida').exists()
], authController.login);

// Ruta para verificar el token
router.get('/verify', auth, authController.verifyToken);

module.exports = router; 
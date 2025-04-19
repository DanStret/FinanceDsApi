const express = require('express');
const router = express.Router();
const alertasController = require('../controllers/alertasController');
const auth = require('../middlewares/auth');

// Get all alerts
router.get('/', auth, alertasController.getAlertas);

// Get unread alerts
router.get('/unread', auth, alertasController.getUnreadAlertas);

// Mark alert as read
router.put('/:id/read', auth, alertasController.markAsRead);

// Delete alert
router.delete('/:id', auth, alertasController.deleteAlerta);

module.exports = router; 
const express = require('express');
const router = express.Router();
const ingresosController = require('../controllers/ingresosController');
const authMiddleware = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Ingreso:
 *       type: object
 *       required:
 *         - id_categoria
 *         - monto
 *         - fecha
 *       properties:
 *         id_ingreso:
 *           type: integer
 *           description: ID del ingreso
 *         id_usuario:
 *           type: integer
 *           description: ID del usuario
 *         id_categoria:
 *           type: integer
 *           description: ID de la categoría
 *         monto:
 *           type: number
 *           format: float
 *           description: Monto del ingreso
 *         descripcion:
 *           type: string
 *           description: Descripción del ingreso
 *         fecha:
 *           type: string
 *           format: date
 *           description: Fecha del ingreso
 */

/**
 * @swagger
 * /api/ingresos:
 *   get:
 *     summary: Obtener todos los ingresos del usuario
 *     tags: [Ingresos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de ingresos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ingreso'
 *       401:
 *         description: No autorizado
 */
router.get('/', authMiddleware, ingresosController.getByUsuario);

/**
 * @swagger
 * /api/ingresos/{id}:
 *   get:
 *     summary: Obtener un ingreso por ID
 *     tags: [Ingresos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ingreso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingreso'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Ingreso no encontrado
 */
router.get('/:id', authMiddleware, ingresosController.getById);

/**
 * @swagger
 * /api/ingresos:
 *   post:
 *     summary: Crear un nuevo ingreso
 *     tags: [Ingresos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_categoria
 *               - monto
 *               - fecha
 *             properties:
 *               id_categoria:
 *                 type: integer
 *               monto:
 *                 type: number
 *                 format: float
 *               descripcion:
 *                 type: string
 *               fecha:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Ingreso creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingreso'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.post('/', authMiddleware, ingresosController.create);

/**
 * @swagger
 * /api/ingresos/{id}:
 *   put:
 *     summary: Actualizar un ingreso
 *     tags: [Ingresos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_categoria
 *               - monto
 *               - fecha
 *             properties:
 *               id_categoria:
 *                 type: integer
 *               monto:
 *                 type: number
 *                 format: float
 *               descripcion:
 *                 type: string
 *               fecha:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Ingreso actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingreso'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permiso para actualizar este ingreso
 *       404:
 *         description: Ingreso no encontrado
 */
router.put('/:id', authMiddleware, ingresosController.update);

/**
 * @swagger
 * /api/ingresos/{id}:
 *   delete:
 *     summary: Eliminar un ingreso
 *     tags: [Ingresos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Ingreso eliminado exitosamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: No tiene permiso para eliminar este ingreso
 *       404:
 *         description: Ingreso no encontrado
 */
router.delete('/:id', authMiddleware, ingresosController.delete);

/**
 * @swagger
 * /api/ingresos/total:
 *   get:
 *     summary: Obtener el total de ingresos del usuario
 *     tags: [Ingresos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total de ingresos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 *                   format: float
 *       401:
 *         description: No autorizado
 */
router.get('/total', authMiddleware, ingresosController.getTotalByUsuario);

/**
 * @swagger
 * /api/ingresos/categoria/{id_categoria}:
 *   get:
 *     summary: Obtener ingresos por categoría
 *     tags: [Ingresos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_categoria
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de ingresos por categoría
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ingreso'
 *       401:
 *         description: No autorizado
 */
router.get('/categoria/:id_categoria', authMiddleware, ingresosController.getByCategoria);

/**
 * @swagger
 * /api/ingresos/fecha:
 *   get:
 *     summary: Obtener ingresos por rango de fechas
 *     tags: [Ingresos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: fecha_inicio
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: fecha_fin
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Lista de ingresos en el rango de fechas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ingreso'
 *       400:
 *         description: Fechas inválidas
 *       401:
 *         description: No autorizado
 */
router.get('/fecha', authMiddleware, ingresosController.getByFecha);

module.exports = router; 
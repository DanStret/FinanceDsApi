const express = require('express');
const router = express.Router();
const categoriasIngresosController = require('../controllers/categoriasIngresosController');
const authMiddleware = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     CategoriaIngreso:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         id_categoria:
 *           type: integer
 *           description: ID de la categoría
 *         nombre:
 *           type: string
 *           description: Nombre de la categoría
 */

/**
 * @swagger
 * /api/categorias-ingresos:
 *   get:
 *     summary: Obtener todas las categorías de ingresos
 *     tags: [Categorías de Ingresos]
 *     responses:
 *       200:
 *         description: Lista de categorías de ingresos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CategoriaIngreso'
 */
router.get('/', categoriasIngresosController.getAll);

/**
 * @swagger
 * /api/categorias-ingresos/{id}:
 *   get:
 *     summary: Obtener una categoría de ingreso por ID
 *     tags: [Categorías de Ingresos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoría de ingreso encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriaIngreso'
 *       404:
 *         description: Categoría no encontrada
 */
router.get('/:id', categoriasIngresosController.getById);

/**
 * @swagger
 * /api/categorias-ingresos:
 *   post:
 *     summary: Crear una nueva categoría de ingreso
 *     tags: [Categorías de Ingresos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriaIngreso'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.post('/', authMiddleware, categoriasIngresosController.create);

/**
 * @swagger
 * /api/categorias-ingresos/{id}:
 *   put:
 *     summary: Actualizar una categoría de ingreso
 *     tags: [Categorías de Ingresos]
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
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriaIngreso'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Categoría no encontrada
 */
router.put('/:id', authMiddleware, categoriasIngresosController.update);

/**
 * @swagger
 * /api/categorias-ingresos/{id}:
 *   delete:
 *     summary: Eliminar una categoría de ingreso
 *     tags: [Categorías de Ingresos]
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
 *         description: Categoría eliminada exitosamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Categoría no encontrada
 */
router.delete('/:id', authMiddleware, categoriasIngresosController.delete);

module.exports = router; 
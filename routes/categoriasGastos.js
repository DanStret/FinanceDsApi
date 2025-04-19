const express = require('express');
const router = express.Router();
const categoriasGastosController = require('../controllers/categoriasGastosController');
const authMiddleware = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     CategoriaGasto:
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
 *         descripcion:
 *           type: string
 *           description: Descripción de la categoría
 */

/**
 * @swagger
 * /api/categorias-gastos:
 *   get:
 *     summary: Obtener todas las categorías de gastos
 *     tags: [Categorías de Gastos]
 *     responses:
 *       200:
 *         description: Lista de categorías de gastos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CategoriaGasto'
 */
router.get('/', categoriasGastosController.getAll);

/**
 * @swagger
 * /api/categorias-gastos/{id}:
 *   get:
 *     summary: Obtener una categoría de gasto por ID
 *     tags: [Categorías de Gastos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoría de gasto encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriaGasto'
 *       404:
 *         description: Categoría no encontrada
 */
router.get('/:id', categoriasGastosController.getById);

/**
 * @swagger
 * /api/categorias-gastos:
 *   post:
 *     summary: Crear una nueva categoría de gasto
 *     tags: [Categorías de Gastos]
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
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriaGasto'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.post('/', authMiddleware, categoriasGastosController.create);

/**
 * @swagger
 * /api/categorias-gastos/{id}:
 *   put:
 *     summary: Actualizar una categoría de gasto
 *     tags: [Categorías de Gastos]
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
 *               descripcion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriaGasto'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Categoría no encontrada
 */
router.put('/:id', authMiddleware, categoriasGastosController.update);

/**
 * @swagger
 * /api/categorias-gastos/{id}:
 *   delete:
 *     summary: Eliminar una categoría de gasto
 *     tags: [Categorías de Gastos]
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
router.delete('/:id', authMiddleware, categoriasGastosController.delete);

module.exports = router; 
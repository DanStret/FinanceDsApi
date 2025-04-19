const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del usuario
 *         email:
 *           type: string
 *           description: Email del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *         nombre:
 *           type: string
 *           description: Nombre del usuario
 *         apellido:
 *           type: string
 *           description: Apellido del usuario
 *         rol_id:
 *           type: integer
 *           description: ID del rol del usuario
 * 
 *     Rol:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del rol
 *         nombre:
 *           type: string
 *           description: Nombre del rol
 * 
 *     Transaccion:
 *       type: object
 *       required:
 *         - monto
 *         - tipo
 *         - categoria_id
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la transacción
 *         monto:
 *           type: number
 *           description: Monto de la transacción
 *         tipo:
 *           type: string
 *           enum: [ingreso, gasto]
 *           description: Tipo de transacción
 *         categoria_id:
 *           type: integer
 *           description: ID de la categoría
 *         fecha:
 *           type: string
 *           format: date-time
 *           description: Fecha de la transacción
 *         descripcion:
 *           type: string
 *           description: Descripción de la transacción
 * 
 *     Presupuesto:
 *       type: object
 *       required:
 *         - monto
 *         - categoria_id
 *         - periodo
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del presupuesto
 *         monto:
 *           type: number
 *           description: Monto del presupuesto
 *         categoria_id:
 *           type: integer
 *           description: ID de la categoría
 *         periodo:
 *           type: string
 *           enum: [mensual, trimestral, anual]
 *           description: Período del presupuesto
 *         fecha_inicio:
 *           type: string
 *           format: date
 *           description: Fecha de inicio del presupuesto
 *         fecha_fin:
 *           type: string
 *           format: date
 *           description: Fecha de fin del presupuesto
 * 
 *     Recordatorio:
 *       type: object
 *       required:
 *         - titulo
 *         - fecha
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del recordatorio
 *         titulo:
 *           type: string
 *           description: Título del recordatorio
 *         descripcion:
 *           type: string
 *           description: Descripción del recordatorio
 *         fecha:
 *           type: string
 *           format: date-time
 *           description: Fecha del recordatorio
 *         estado:
 *           type: string
 *           enum: [pendiente, completado]
 *           description: Estado del recordatorio
 * 
 *     Alerta:
 *       type: object
 *       required:
 *         - titulo
 *         - tipo
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la alerta
 *         titulo:
 *           type: string
 *           description: Título de la alerta
 *         descripcion:
 *           type: string
 *           description: Descripción de la alerta
 *         tipo:
 *           type: string
 *           enum: [info, warning, error]
 *           description: Tipo de alerta
 *         fecha:
 *           type: string
 *           format: date-time
 *           description: Fecha de la alerta
 *         estado:
 *           type: string
 *           enum: [activa, inactiva]
 *           description: Estado de la alerta
 * 
 *     CategoriaGasto:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         id_categoria:
 *           type: integer
 *           description: ID de la categoría de gasto
 *         nombre:
 *           type: string
 *           description: Nombre de la categoría de gasto
 *         descripcion:
 *           type: string
 *           description: Descripción de la categoría de gasto
 * 
 *     CategoriaIngreso:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         id_categoria:
 *           type: integer
 *           description: ID de la categoría de ingreso
 *         nombre:
 *           type: string
 *           description: Nombre de la categoría de ingreso
 *         descripcion:
 *           type: string
 *           description: Descripción de la categoría de ingreso
 * 
 *     Ingreso:
 *       type: object
 *       required:
 *         - monto
 *         - categoria_id
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del ingreso
 *         monto:
 *           type: number
 *           description: Monto del ingreso
 *         categoria_id:
 *           type: integer
 *           description: ID de la categoría
 *         fecha:
 *           type: string
 *           format: date-time
 *           description: Fecha del ingreso
 *         descripcion:
 *           type: string
 *           description: Descripción del ingreso
 * 
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token de autenticación
 *       401:
 *         description: Credenciales inválidas
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar nuevo usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Datos inválidos
 */

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Obtener todos los roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rol'
 */

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Crear nuevo rol
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rol'
 *     responses:
 *       201:
 *         description: Rol creado exitosamente
 *       400:
 *         description: Datos inválidos
 */

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Actualizar rol
 *     tags: [Roles]
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
 *             $ref: '#/components/schemas/Rol'
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente
 *       404:
 *         description: Rol no encontrado
 */

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Eliminar rol
 *     tags: [Roles]
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
 *         description: Rol eliminado exitosamente
 *       404:
 *         description: Rol no encontrado
 */

/**
 * @swagger
 * /api/transacciones:
 *   get:
 *     summary: Obtener todas las transacciones
 *     tags: [Transacciones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de transacciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaccion'
 */

/**
 * @swagger
 * /api/transacciones:
 *   post:
 *     summary: Crear nueva transacción
 *     tags: [Transacciones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaccion'
 *     responses:
 *       201:
 *         description: Transacción creada exitosamente
 *       400:
 *         description: Datos inválidos
 */

/**
 * @swagger
 * /api/presupuestos:
 *   get:
 *     summary: Obtener todos los presupuestos
 *     tags: [Presupuestos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de presupuestos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Presupuesto'
 */

/**
 * @swagger
 * /api/presupuestos:
 *   post:
 *     summary: Crear nuevo presupuesto
 *     tags: [Presupuestos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Presupuesto'
 *     responses:
 *       201:
 *         description: Presupuesto creado exitosamente
 *       400:
 *         description: Datos inválidos
 */

/**
 * @swagger
 * /api/recordatorios:
 *   get:
 *     summary: Obtener todos los recordatorios
 *     tags: [Recordatorios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de recordatorios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recordatorio'
 */

/**
 * @swagger
 * /api/recordatorios:
 *   post:
 *     summary: Crear nuevo recordatorio
 *     tags: [Recordatorios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recordatorio'
 *     responses:
 *       201:
 *         description: Recordatorio creado exitosamente
 *       400:
 *         description: Datos inválidos
 */

/**
 * @swagger
 * /api/alertas:
 *   get:
 *     summary: Obtener todas las alertas
 *     tags: [Alertas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de alertas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Alerta'
 */

/**
 * @swagger
 * /api/alertas:
 *   post:
 *     summary: Crear nueva alerta
 *     tags: [Alertas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Alerta'
 *     responses:
 *       201:
 *         description: Alerta creada exitosamente
 *       400:
 *         description: Datos inválidos
 */

/**
 * @swagger
 * /api/categorias-gastos:
 *   get:
 *     summary: Obtener todas las categorías de gastos
 *     tags: [Categorías de Gastos]
 *     security:
 *       - bearerAuth: []
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

/**
 * @swagger
 * /api/categorias-gastos:
 *   post:
 *     summary: Crear nueva categoría de gasto
 *     tags: [Categorías de Gastos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoriaGasto'
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *       400:
 *         description: Datos inválidos
 */

/**
 * @swagger
 * /api/categorias-gastos/{id}:
 *   put:
 *     summary: Actualizar categoría de gasto
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
 *             $ref: '#/components/schemas/CategoriaGasto'
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente
 *       404:
 *         description: Categoría no encontrada
 */

/**
 * @swagger
 * /api/categorias-gastos/{id}:
 *   delete:
 *     summary: Eliminar categoría de gasto
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
 *       404:
 *         description: Categoría no encontrada
 */

/**
 * @swagger
 * /api/categorias-ingresos:
 *   get:
 *     summary: Obtener todas las categorías de ingresos
 *     tags: [Categorías de Ingresos]
 *     security:
 *       - bearerAuth: []
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

/**
 * @swagger
 * /api/categorias-ingresos:
 *   post:
 *     summary: Crear nueva categoría de ingreso
 *     tags: [Categorías de Ingresos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoriaIngreso'
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *       400:
 *         description: Datos inválidos
 */

/**
 * @swagger
 * /api/ingresos:
 *   get:
 *     summary: Obtener todos los ingresos
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
 */

/**
 * @swagger
 * /api/ingresos:
 *   post:
 *     summary: Crear nuevo ingreso
 *     tags: [Ingresos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ingreso'
 *     responses:
 *       201:
 *         description: Ingreso creado exitosamente
 *       400:
 *         description: Datos inválidos
 */

module.exports = router; 
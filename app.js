const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const morgan = require('morgan');
const app = express();

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Finance Documentation',
            version: '1.0.0',
            description: 'Documentación de la API de Finance',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desarrollo',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./routes/*.js'], // Ruta donde buscará los comentarios de documentación
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Servir archivos estáticos desde el directorio public

// Configurar morgan para logging de peticiones HTTP con formato personalizado
morgan.token('date', () => {
    return new Date().toLocaleString();
});

app.use(morgan(':remote-addr - - [:date] ":method :url HTTP/:http-version" :status -'));


// Routes
const authRoutes = require('./routes/auth');
const transaccionesRoutes = require('./routes/transacciones');
const presupuestosRoutes = require('./routes/presupuestos');
const recordatoriosRoutes = require('./routes/recordatorios');
const alertasRoutes = require('./routes/alertas');
const rolesRoutes = require('./routes/roles');
const categoriasIngresosRoutes = require('./routes/categoriasIngresos');
const ingresosRoutes = require('./routes/ingresos');
const categoriasGastosRoutes = require('./routes/categoriasGastos');
const apiRoutes = require('./routes/routes');

app.use('/api/auth', authRoutes);
app.use('/api/transacciones', transaccionesRoutes);
app.use('/api/presupuestos', presupuestosRoutes);
app.use('/api/recordatorios', recordatoriosRoutes);
app.use('/api/alertas', alertasRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/categorias-ingresos', categoriasIngresosRoutes);
app.use('/api/ingresos', ingresosRoutes);
app.use('/api/categorias-gastos', categoriasGastosRoutes);
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

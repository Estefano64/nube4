const express = require('express');
const path = require('path');
const clientesRouter = require('./routes/clientes');
const productosRouter = require('./routes/productos');

// Inicializar la aplicación Express
const app = express();
const PORT = process.env.PORT || 9000;

// Middleware para analizar JSON y urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/clientes', clientesRouter);
app.use('/productos', productosRouter);

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Manejo de errores
app.use((req, res, next) => {
    res.status(404).send('Página no encontrada');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error del servidor');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

module.exports = app;
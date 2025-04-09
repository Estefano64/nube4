const express = require('express');
const router = express.Router();

// Base de datos de ejemplo para productos
let productos = [
    { id: 1, nombre: 'Laptop', precio: 1200, stock: 15, categoria: 'Electrónica' },
    { id: 2, nombre: 'Smartphone', precio: 800, stock: 25, categoria: 'Electrónica' },
    { id: 3, nombre: 'Auriculares', precio: 120, stock: 40, categoria: 'Accesorios' },
    { id: 4, nombre: 'Monitor', precio: 350, stock: 10, categoria: 'Electrónica' }
];

// Obtener todos los productos
router.get('/', (req, res) => {
    res.json(productos);
});

// Obtener un producto por ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const producto = productos.find(p => p.id === id);
    
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
});

// Filtrar productos por categoría
router.get('/categoria/:categoria', (req, res) => {
    const categoria = req.params.categoria;
    const productosFiltrados = productos.filter(p => 
        p.categoria.toLowerCase() === categoria.toLowerCase()
    );
    
    res.json(productosFiltrados);
});

// Crear un nuevo producto
router.post('/', (req, res) => {
    const { nombre, precio, stock, categoria } = req.body;
    
    if (!nombre || !precio) {
        return res.status(400).json({ mensaje: 'Se requiere nombre y precio' });
    }
    
    const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
    
    const nuevoProducto = {
        id: nuevoId,
        nombre,
        precio: parseFloat(precio),
        stock: stock ? parseInt(stock) : 0,
        categoria: categoria || 'Sin categoría'
    };
    
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

// Actualizar un producto existente
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, precio, stock, categoria } = req.body;
    
    const productoIndex = productos.findIndex(p => p.id === id);
    
    if (productoIndex === -1) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    
    if (!nombre || !precio) {
        return res.status(400).json({ mensaje: 'Se requiere nombre y precio' });
    }
    
    productos[productoIndex] = {
        id,
        nombre,
        precio: parseFloat(precio),
        stock: stock !== undefined ? parseInt(stock) : productos[productoIndex].stock,
        categoria: categoria || productos[productoIndex].categoria
    };
    
    res.json(productos[productoIndex]);
});

// Eliminar un producto
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productoIndex = productos.findIndex(p => p.id === id);
    
    if (productoIndex === -1) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    
    const productoEliminado = productos[productoIndex];
    productos.splice(productoIndex, 1);
    
    res.json({ mensaje: 'Producto eliminado', producto: productoEliminado });
});

// Actualizar stock de un producto
router.patch('/:id/stock', (req, res) => {
    const id = parseInt(req.params.id);
    const { stock } = req.body;
    
    const productoIndex = productos.findIndex(p => p.id === id);
    
    if (productoIndex === -1) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    
    if (stock === undefined) {
        return res.status(400).json({ mensaje: 'Se requiere el valor de stock' });
    }
    
    productos[productoIndex].stock = parseInt(stock);
    
    res.json(productos[productoIndex]);
});

module.exports = router;




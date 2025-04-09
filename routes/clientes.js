const express = require('express');
const router = express.Router();

// Base de datos de ejemplo para clientes
let clientes = [
    { id: 1, nombre: 'Juan Pérez', email: 'juan@ejemplo.com', telefono: '123-456-7890' },
    { id: 2, nombre: 'María García', email: 'maria@ejemplo.com', telefono: '234-567-8901' },
    { id: 3, nombre: 'Carlos López', email: 'carlos@ejemplo.com', telefono: '345-678-9012' }
];

// Obtener todos los clientes
router.get('/', (req, res) => {
    res.json(clientes);
});

// Obtener un cliente por ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cliente = clientes.find(c => c.id === id);
    
    if (cliente) {
        res.json(cliente);
    } else {
        res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
});

// Crear un nuevo cliente
router.post('/', (req, res) => {
    const { nombre, email, telefono } = req.body;
    
    if (!nombre || !email) {
        return res.status(400).json({ mensaje: 'Se requiere nombre y email' });
    }
    
    const nuevoId = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;
    
    const nuevoCliente = {
        id: nuevoId,
        nombre,
        email,
        telefono: telefono || ''
    };
    
    clientes.push(nuevoCliente);
    res.status(201).json(nuevoCliente);
});

// Actualizar un cliente existente
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, email, telefono } = req.body;
    
    const clienteIndex = clientes.findIndex(c => c.id === id);
    
    if (clienteIndex === -1) {
        return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    
    if (!nombre || !email) {
        return res.status(400).json({ mensaje: 'Se requiere nombre y email' });
    }
    
    clientes[clienteIndex] = {
        id,
        nombre,
        email,
        telefono: telefono || clientes[clienteIndex].telefono
    };
    
    res.json(clientes[clienteIndex]);
});

// Eliminar un cliente
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const clienteIndex = clientes.findIndex(c => c.id === id);
    
    if (clienteIndex === -1) {
        return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    
    const clienteEliminado = clientes[clienteIndex];
    clientes.splice(clienteIndex, 1);
    
    res.json({ mensaje: 'Cliente eliminado', cliente: clienteEliminado });
});

module.exports = router;
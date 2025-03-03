const { where } = require('sequelize');
const Producto = require('../models/productos');

// Crear un nuevo producto
exports.create = async (req, res) => {
    try {
        const producto = await Producto.create(req.body);
        res.status(201).json({ success: true, data: producto });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Obtener todos los productos
exports.findAll = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.status(200).json({ success: true, data: productos });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Obtener un producto por ID
exports.findOne = async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.id);
        if (!producto) {
            return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }
        res.status(200).json({ success: true, data: producto });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Actualizar un producto por ID
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }

        await producto.update(req.body);
        res.status(200).json({ success: true, data: producto });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Eliminar un producto por ID
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Producto.destroy({ where: { id } });

        if (!deleted) {
            return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }

        res.status(200).json({ success: true, message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

const User = require('../models/users');

// Create a new user
exports.create = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all users
exports.findAll = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a user by id
exports.findOne = async (req, res) => {
    try {
        const user = await User.findOne(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a user by id
exports.update = async (req, res) => {
    try {
        const user = await User.update(req.params.id, req.body);
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a user by id
exports.delete = async (req, res) => {
    try {
        await User.delete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
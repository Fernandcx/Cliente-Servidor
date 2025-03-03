const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productosController');

router.post('/', productsController.create);
router.get('/', productsController.findAll);
router.get('/:id', productsController.findOne);
router.put('/:id', productsController.update);
router.delete('/:id', productsController.delete);

module.exports = router;

const request = require('supertest');
const app = require('../app'); // Importa tu aplicación Express
const Producto = require('../models/productos'); // Importa el modelo de Producto

describe('Producto Controller - create', () => {
    beforeEach(async () => {
        await Producto.destroy({ where: {}, truncate: true }); // Elimina todos los registros en la tabla de productos y reinicia el índice
    });

    it('should create a new product', async () => {
        const mockProducto = { 
            nombre: 'Producto 1', 
            descripcion: 'Descripción del Producto 1', 
            precio: 100.00, 
            stock: 50 
        };

        const response = await request(app)
            .post('/api/productos') // Asegúrate de que esta ruta esté correctamente definida
            .send(mockProducto);

        expect(response.status).toBe(201);
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.nombre).toBe(mockProducto.nombre);
        expect(response.body.data.precio).toBe(mockProducto.precio);
        expect(response.body.data.stock).toBe(mockProducto.stock);
    });

    it('should return 400 for invalid input', async () => {
        const invalidProducto = { nombre: '', precio: -10, stock: -5 }; // Campos inválidos

        const response = await request(app)
            .post('/api/productos')
            .send(invalidProducto);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});

describe('Producto Controller - find methods', () => {
    it('should return an array of products', async () => {
        const response = await request(app).get('/api/productos');

        expect(response.status).toBe(200);
        expect(response.body.data).toBeInstanceOf(Array);
    });
    
    it('should return a product by id', async () => {
        await Producto.destroy({ where: {}, truncate: true }); // Elimina todos los productos

        const mockProducto = { 
            nombre: 'Producto 1', 
            descripcion: 'Descripción del Producto 1', 
            precio: 100.00, 
            stock: 50 
        };

        const producto = await request(app)
            .post('/api/productos')
            .send(mockProducto);

        const response = await request(app)
            .get(`/api/productos/${producto.body.data.id}`);

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.id).toBe(producto.body.data.id);
    });
});

describe('Producto Controller - update', () => {
    it('should update a product by id', async () => {
        await Producto.destroy({ where: {}, truncate: true }); // Elimina todos los productos
        
        const mockProducto = { 
            nombre: 'Producto 1', 
            descripcion: 'Descripción del Producto 1', 
            precio: 100.00, 
            stock: 50 
        };

        const producto = await request(app)
            .post('/api/productos')
            .send(mockProducto);
        
        const updatedProducto = {
            nombre: 'Producto Actualizado',
            descripcion: 'Descripción del Producto Actualizado',
            precio: 150.00,
            stock: 100
        };

        const response = await request(app)
            .put(`/api/productos/${producto.body.data.id}`)
            .send(updatedProducto);
        
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.nombre).toBe(updatedProducto.nombre);
        expect(response.body.data.precio).toBe(updatedProducto.precio);
        expect(response.body.data.stock).toBe(updatedProducto.stock);
    });
});

describe('Producto Controller - delete', () => {
    it('should delete a product by id', async () => {
        await Producto.destroy({ where: {}, truncate: true }); // Elimina todos los productos
        
        const mockProducto = { 
            nombre: 'Producto 1', 
            descripcion: 'Descripción del Producto 1', 
            precio: 100.00, 
            stock: 50 
        };

        const producto = await request(app)
            .post('/api/productos')
            .send(mockProducto);

        const response = await request(app)
            .delete(`/api/productos/${producto.body.data.id}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Producto eliminado correctamente');
    });
});

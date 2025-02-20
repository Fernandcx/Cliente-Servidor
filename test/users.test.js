const request = require('supertest');
const app = require('../app'); // Import your Express app
const User = require('../models/users'); // Ensure you are importing the correct model

describe('User Controller - create', () => {
    beforeEach(async () => {
        await User.destroy({ where: {}, truncate: true }); // Borra todos los registros y reinicia los índices
    }); 

    it('should create a new user', async () => {
        const mockUser = { 
            name: 'John Doe', 
            email: 'johndoe@example.com', 
            password: 'password123' 
        };

        const response = await request(app)
            .post('/api/users') // Replace with your route
            .send(mockUser);

        expect(response.status).toBe(201);
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.name).toBe(mockUser.name);
        expect(response.body.data.email).toBe(mockUser.email);
    });

    it('should return 400 for invalid input', async () => {
        const invalidUser = { name: '' }; // Missing required fields

        const response = await request(app)
            .post('/api/users')
            .send(invalidUser);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});

describe('User Controller - find methods', () => {
    it('should return an array of users', async () => {
        const response = await request(app).get('/api/users');

        expect(response.status).toBe(200);
        expect(response.body.data).toBeInstanceOf(Array);
    });
    
    it('should return a user by id', async () => {
        await User.destroy({ where: {}, truncate: true }); // Borra todos los registros y reinicia los índices
        
        const mockUser = { 
            name: 'John Doe', 
            email: 'johndoe@example.com', 
            password: 'password123' 
        };
    
        const user = await request(app)
            .post('/api/users') // Replace with your route
            .send(mockUser);
    
        const response = await request(app)
            .get(`/api/users/${user.body.data.id}`);
    
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.id).toBe(user.body.data.id);
    });
});
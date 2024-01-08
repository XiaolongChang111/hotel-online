const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
const mongoose = require('mongoose');
const User = require('../models/user.model'); 


describe('User API Tests', () => {
    let token;

    beforeAll(async () => {
        await User.deleteMany({
            username: {
                $in: ['testuser']
            }
        });
    });

    afterAll(async () => {
        await User.deleteMany({
            username: {
                $in: ['testuser']
            }
        });
        await mongoose.connection.close();
      });

    it('should register a new user', async () => {
        const res = await request.post('/api/users/register').send({
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123'
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message');
    });


    it('should log in a user', async () => {
        const res = await request.post('/api/users/login').send({
            username: 'testuser',
            password: 'password123'
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        token = res.body.token;
    });


    it('should get the user profile', async () => {
        const res = await request.get('/api/users/me')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('username', 'testuser');
    });


});


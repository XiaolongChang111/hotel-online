require('dotenv').config();
const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
const mongoose = require('mongoose');
const User = require('../models/user.model'); 
const Room = require('../models/room.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Order = require('../models/order.model');

let room = null;
let user = null;
let order = null;
const roomData = {
    roomId: 'A101',
    price: 100,
    status: 'available',
    capacity: 2,
    type: 'Deluxe Room'
};
const userData = {
    username: 'testuser1',
    email: 'testuser1@example.com',
    password: 'password123'
}



describe('Order API Tests', () => {
    let token;

    beforeAll(async () => {
        user = await User.create({
            username: userData.username,
            email: userData.email,
            password: await bcrypt.hash(userData.password, 10)
        });
        room = await Room.create(roomData);
        token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '120h' }); 

    });

    afterAll(async () => {
        await User.deleteMany({
            username: {
                $in: ['testuser1']
            }
        });
        await Room.deleteMany({
            roomId: {
                $in: ['A101']
            }
        });
        await Order.deleteMany({
            room: {
                $in: [room._id]
            }
        });
        await mongoose.connection.close();    
    });
        
      

    it('should create a new order', async () => {
        const res = await request.post('/api/orders')
        .set('Authorization', `Bearer ${token}`)
        .send({
            room: room._id.toString(),
            customers: [{
                name: userData.username,
                birthday: '2001-01-01',
                phone: '0123456789',
                gender: 'Male'
            }]
        });

        expect(res.statusCode).toEqual(201);
        const orders = await Order.find({}).lean();
        const newOrder = orders.find(order => order.room.toString() === room._id.toString());
        expect(newOrder).toBeTruthy();
    });

    it('should get the orders of user', async () => {
        const res = await request.get('/api/orders')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
    });


});


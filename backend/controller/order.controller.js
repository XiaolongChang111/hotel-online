const mongoose = require('mongoose');
const Order = require('../models/order.model'); 
const Room = require('../models/room.model');
const User = require('../models/user.model'); 

const orderController = {
    // Create Order
    async createOrder(req, res) {
        try {
            // Check if the room is available
            const room = await Room.findOne({ _id: new mongoose.mongo.ObjectId(req.body.room), status: 'available' });
            if (!room) {
                return res.status(400).json({ message: "Room is not available" });
            }
         
            const newOrder = new Order({
                room: room._id,
                user: req.user._id, 
                customers: req.body.customers
            });

           
            const savedOrder = await newOrder.save();

            // Update the room status to 'busy'
            room.status = 'busy';
            await room.save();

            res.status(201).json(savedOrder);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    // Get Order
    async getOrderById(req, res) {
        try {
            const order = await Order.findById(req.params.orderId).populate('room').populate('user');
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }

            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    // Get Orders
    async getAllOrders(req, res) {
        try {
            const user = req.user;
            const orders = await Order.find({
                user: user._id
            }).populate('room').populate('user');
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = orderController;

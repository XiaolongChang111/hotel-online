const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customers: [{
        name: String,
        birthday: Date,
        phone: String,
        gender: String
    }]
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
const mongoose = require('mongoose');
const RoomSchema = new mongoose.Schema({
    roomId: { type: String, required: true, unique: true },
    status: { type: String, enum: ['available', 'busy'], default: 'available' },
    price: { type: Number, required: true },
    capacity: { type: Number, required: true },
    type: {type: String, enum: ['Deluxe Room', 'Executive Suite', 'Family Suite'], required: true}
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
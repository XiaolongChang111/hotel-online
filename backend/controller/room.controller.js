const Room = require('../models/room.model');

const roomController = {
    // Create Room
    async createRoom(req, res) {
        try {
            const newRoom = new Room(req.body);
            const savedRoom = await newRoom.save();
            res.status(201).json(savedRoom);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete Room
    async deleteRoom(req, res) {
        try {
            const room = await Room.findById(req.params.id);
            if (!room) {
                return res.status(404).json({ message: "Room not found" });
            }

            if (room.status !== 'available') {
                return res.status(400).json({ message: "Room is not available and cannot be deleted" });
            }

            await Room.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Room deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update Room
    async updateRoom(req, res) {
        try {
            const room = await Room.findById(req.params.id);
            if (!room) {
                return res.status(404).json({ message: "Room not found" });
            }

            if (room.status !== 'available') {
                return res.status(400).json({ message: "Room is not available and cannot be updated" });
            }

            Object.assign(room, req.body);
            const updatedRoom = await room.save();
            res.status(200).json(updatedRoom);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    // Get Available Rooms
    async getAvailableRooms(req, res) {
        try {
            const availableRooms = await Room.find({ status: 'available' });
            res.status(200).json(availableRooms);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    // Get all Rooms
    async getAllRooms(req, res) {
        try {
            const rooms = await Room.find();
            res.status(200).json(rooms);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    // Get Room by ID
    async getRoomById(req, res) {
        try {
            const room = await Room.findById(req.params.roomId);
            if (!room) {
                return res.status(404).json({ message: "Room not found" });
            }
            res.status(200).json(room);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = roomController;

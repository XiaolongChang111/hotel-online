const express = require('express');
const roomController = require('../controller/room.controller');
const { verifyAdmin } = require('../auth.middleware');
const router = express.Router();


router.post('', verifyAdmin, roomController.createRoom);

router.delete('/:id', verifyAdmin, roomController.deleteRoom);

router.put('/:id', verifyAdmin, roomController.updateRoom);

router.get('/available', roomController.getAvailableRooms);

router.get('', roomController.getAllRooms);
router.get('/:roomId', roomController.getRoomById);
module.exports = router;

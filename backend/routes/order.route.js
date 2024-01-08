const express = require('express');
const orderController = require('../controller/order.controller'); 
const { verifyUser } = require('../auth.middleware');
const router = express.Router();

router.get('', verifyUser, orderController.getAllOrders);
router.post('', verifyUser, orderController.createOrder);
router.get('/:orderId', verifyUser, orderController.getOrderById);

module.exports = router;

const express = require('express');
const userController = require('../controller/user.controller'); 
const { verifyUser, verifyAdmin } = require('../auth.middleware');
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/me', verifyUser, userController.getProfile);
router.get(`/usernames`, verifyAdmin, userController.getUsers);

module.exports = router;

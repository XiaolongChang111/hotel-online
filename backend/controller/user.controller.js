const User = require('../models/user.model'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
 
    async register(req, res) {
        try {
            // Check if the email and username already exists
            let oldUser = await User.findOne({ email: req.body.email });
            if (oldUser) {
                return res.status(400).json({ message: "Email already exists" });
            }
            oldUser = await User.findOne({ username: req.body.username });
            if (oldUser) {
                return res.status(400).json({ message: "Username already exists" });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const isAdmin = req.body.email === process.env.ADMIN_EMAIL;
            // Create a new user
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                isAdmin
            });

            // Save the user
            const savedUser = await user.save();

            res.status(201).json({ message: "User created successfully", userId: savedUser._id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // User Login
    async login(req, res) {
        try {
            // Find the user
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }

            // Check password
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: "Invalid password" });
            }

            // Create and assign a token
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '120h' }); 

            res.header('auth-token', token).json({ message: "Logged in successfully", token: token, isAdmin: user.isAdmin });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get profile
    async getProfile(req, res) {
        try {
            res.json(req.user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users.map(user => {
                return user.username
            }));
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = userController;

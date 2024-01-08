require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: '*',
        allowedHeaders: '*'
    }
});
const PORT = process.env.PORT || 8000;

app.use(express.static('build'));
app.use(cors());
app.use(express.json());

const userRoute = require('./routes/user.route');
const roomRoute = require('./routes/room.route');
const orderRoute = require('./routes/order.route');

app.use('/api/users', userRoute);
app.use('/api/rooms', roomRoute);
app.use('/api/orders', orderRoute);
mongoose.connect(process.env.MONGODB_URL || 'mongodb+srv://asdf:asdf@test.kgyv4wt.mongodb.net/hotel');


app.use(function(req, res) {
    res.sendFile(path.join(__dirname, './build/index.html'));
})

let sockets = {};
let adminSocket = null;
io.on('connection', (socket) => {

    socket.on('admin-connected', () => {
        adminSocket = socket;
        sockets['admin'] = socket;
    });

    socket.on('confirm-user', username => {
        sockets[username] = socket;
        console.log(`${username} confirmed`);
        console.log(username);
    });

    socket.on('chat-message', msg => {
        const data = JSON.parse(msg);
        if (data.origin === 'admin') {
            const target = data.target;
            const message = data.message;
            console.log(data)
            console.log(target);
            console.log(sockets[target])
            sockets[target]?.emit('chat-message', JSON.stringify(
                {
                    origin: 'Admin',
                    message: message
                }
            ));
        } else {
            adminSocket?.emit('chat-message', msg);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

io.on('error', (err) => {
    console.log(err);   
});

module.exports = server;
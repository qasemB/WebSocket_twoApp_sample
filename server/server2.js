const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*', // اجازه اتصال از هر کلاینتی
    },
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // پیوستن کاربر به یک اتاق خاص
    socket.on('join_room', (roomCode) => {
        socket.join(roomCode);
        console.log(`User ${socket.id} joined room: ${roomCode}`);
    });

    // دریافت پیام از کلاینت و ارسال آن به اتاق خاص
    socket.on('send_message', (data) => {
        const { roomCode, message } = data;
        console.log(`Message in room ${roomCode}: ${message}`);
        io.to(roomCode).emit('receive_message', message); // ارسال پیام به اتاق
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

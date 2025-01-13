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

    // دریافت پیام از کلاینت
    socket.on('send_message', (data) => {
        console.log(data);
        // ارسال پیام به همه کلاینت‌ها
        io.emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

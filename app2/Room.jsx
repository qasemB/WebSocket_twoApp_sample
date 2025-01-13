import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001'); // آدرس سرور

const Room = () => {
    const [roomCode, setRoomCode] = useState(''); // کدی که کاربر وارد می‌کند
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [joined, setJoined] = useState(false);

    useEffect(() => {
        // دریافت پیام از سرور
        socket.on('receive_message', (data) => {
            setMessages((prev) => [...prev, data]);
        });

        // پاکسازی
        return () => {
            socket.off('receive_message');
        };
    }, []);

    const joinRoom = () => {
        if (roomCode.trim()) {
            socket.emit('join_room', roomCode); // پیوستن به اتاق
            setJoined(true);
        }
    };

    const sendMessage = () => {
        if (message.trim() && roomCode.trim()) {
            socket.emit('send_message', { roomCode, message }); // ارسال پیام به اتاق خاص
            setMessage('');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>App2</h1>

            {!joined ? (
                <div>
                    <input
                        type="text"
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                        placeholder="Enter room code"
                    />
                    <button onClick={joinRoom}>Join Room</button>
                </div>
            ) : (
                <div>
                    <div>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <h2>Messages in Room {roomCode}:</h2>
                        {messages.map((msg, index) => (
                            <p key={index}>{msg}</p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Room;

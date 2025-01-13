import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001"); // آدرس سرور

const App = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // دریافت پیام از سرور
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // پاکسازی
    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("send_message", message); // ارسال پیام به سرور
      setMessage("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h4>React WebSocket Chat *--App1--*</h4>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h2>Messages:</h2>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
};

export default App;

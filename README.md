# WebSocket Two-App Sample

This repository demonstrates real-time communication between two independent React applications using WebSocket and the `socket.io` library.

## Project Structure

- `server/`: Contains the Node.js server code using Express and Socket.IO.
- `app1/` and `app2/`: Two independent React applications that connect to the WebSocket server.

## Prerequisites

- Node.js v14 or higher
- npm or yarn

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/qasemB/WebSocket_twoApp_sample.git
cd WebSocket_twoApp_sample
```

### 2. Install Dependencies

For the server:

```bash
cd server
npm install
```

For each React application:

```bash
cd ../app1
npm install

cd ../app2
npm install
```

### 3. Run the Server

```bash
cd ../server
npm start
```

The server will run on port 3001.

### 4. Run the React Applications

In separate terminals:

For `app1`:

```bash
cd ../app1
npm run dev
```

For `app2`:

```bash
cd ../app2
npm run dev
```

Each application will run on default ports assigned by Vite.

## Usage

1. Open both React applications in separate browser windows.
2. In each application, enter a room code (e.g., `125487`) and join the room.
3. After joining the room, you can send messages, which will only be visible to applications connected to the same room.

## Code Structure

### Server (`server/server.js`)

- Utilizes Express and Socket.IO to create the WebSocket server.
- Manages client connections and allows them to join specific rooms based on the room code.
- Broadcasts messages to clients in the corresponding room.

### React Applications (`app1/src/App.tsx` and `app2/src/App.tsx`)

- Connect to the WebSocket server using `socket.io-client`.
- Provide a UI for entering a room code and joining it.
- Handle sending and receiving messages within the specified room.

## Notes

- Ensure the server is running before starting the React applications.
- To change the default ports, update the configurations in `server.js` and `vite.config.js` files.

## Resources

- [Socket.IO Documentation](https://socket.io/docs/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Vite Documentation](https://vitejs.dev/)

This sample project is designed to help you understand real-time communication between React applications using WebSocket.

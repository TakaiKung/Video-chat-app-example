const express = require('express');
const http = require('http');
const { v4 : uuidv4 } = require('uuid');
const cors = require('cors');
const twilio = require('twilio');


const PORT = process.env.PORT || 5002;

const app = express();

const server = http.createServer(app);

app.use(cors());

let connectedUsers = [];
let rooms = [];

app.get('/', (req, res) => res.send("Hello"))

app.get('/api/room_exits/:roomId', (req, res, next) => {
    const { roomId } = req.params;
    const room = rooms.find((room) => room.id === roomId);

    if (room) {
        if (room.connectedUsers.length > 3) {
            return res.send({ roomExists: true, full: true });
        }
        else {
            return res.send({ roomExists: true, full: false });
        }
    } else {
        return res.send({ roomExists: false });
    }
});

const io = require('socket.io')(server, {
    cors : {
        origin: '*',
        methods : ['GET', 'POST']
    }
});

io.on("connection" , (socket) => {
    console.log(`user connected`);
    console.log(`user id : ${ socket.id }`);

    socket.on('create-new-room', (data) => {
        createNewRoomHandler(data, socket);
    });

    socket.on('join-room', (data) => {
        joinRoomHandler(data, socket);
    });

    socket.on('disconnect', () => {
        disconnectHandler(socket);
    });
});

// Socket io Handler
const createNewRoomHandler = (data, socket) => {
    console.log('User has create room');
    const { identity } = data;
        const roomId = uuidv4();

        const newUser = {
            identity,
            id : uuidv4(),
            socketId : socket.id,
            roomId : roomId
        }

        connectedUsers = [...connectedUsers, newUser];

        const newRoom = {
            id: roomId,
            connectedUsers : [newUser]
        };

        socket.join(roomId);

        rooms = [...rooms, newRoom];

        socket.emit('room-id', { roomId });

        socket.emit('room-update', { connectedUsers : newRoom.connectedUsers })
};

const joinRoomHandler = (data, socket) => {
    const { identity, roomId } = data;
    const newUser = {
        identity,
        id : uuidv4(),
        socketId : socket.id,
        roomId
    }

    const room = rooms.find(room => room.id === roomId);
    room.connectedUsers = [...room.connectedUsers, newUser];

    // prepare other connection to new user 
    room.connectedUsers.forEach((user) => {
        if (user.socketId !== socket.id) {
            const data = { connUserSocketId : socket.id }
            io.to(user.socketId).emit("conn-prepare", data)
        }
    });

    socket.join(roomId);
    

    connectedUsers = [...connectedUsers, newUser];

    io.to(roomId).emit('room-update', { connectedUsers: room.connectedUsers });
};

const disconnectHandler = (socket) => {
    const user = connectedUsers.find(user => user.socketId === socket.id);
    if (user) {
        const room = rooms.find(room => room.id === user.roomId);
        room.connectedUsers = room.connectedUsers.filter(user => user.socketId !== socket.id);
        socket.leave(user.roomId);
        io.to(room.id).emit('room-update', {
            connectedUsers : room.connectedUsers
        });

        if (room.connectedUsers.length > 0) {
            io.to(room.id).emit("room-update", {
                connectedUsers: room.connectedUsers
            });
        }
        else {
            room = room.filter((r) => r.id !== room.id);
        }
    }
};


server.listen(PORT, () => {
    console.log(`Server is listening on ${ PORT }`);
});
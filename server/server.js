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

    socket.on('conn-signal', (data) => {
        signalingHandler(data, socket);
    });

    socket.on('disconnect', () => {
        disconnectHandler(socket);
    });

    socket.on('conn-init', (data) => {
        initializeConnectionHandler(data, socket);
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


//handler for joining a room
const joinRoomHandler = (data, socket) => {
    const { identity, roomId } = data;
    const newUser = {
        identity,
        id : uuidv4(),
        socketId : socket.id,
        roomId
    }

    // find room in rooms
    const room = rooms.find(room => room.id === roomId);
    // add new user to room connected users
    room.connectedUsers = [...room.connectedUsers, newUser];

    // prepare other connection to new user 
    room.connectedUsers.forEach((user) => {
        // send prepare to user except me
        if (user.socketId !== socket.id) {
            const data = { connUserSocketId : socket.id }
            io.to(user.socketId).emit("conn-prepare", data) 
        }
    });

    // add new user to connected users array
    socket.join(roomId);
    
    // add to connected users list
    connectedUsers = [...connectedUsers, newUser];

    // tell Client to update the room
    io.to(roomId).emit('room-update', { connectedUsers: room.connectedUsers });
};


//remove socket from connected users array
const disconnectHandler = (socket) => {
    // find the user with the socket id
    const user = connectedUsers.find(user => user.socketId === socket.id);
    // remove socket from connected users array
    if (user) {
        // find the room with the user id
        const room = rooms.find(room => room.id === user.roomId);
        // remove user from connected users array
        room.connectedUsers = room.connectedUsers.filter(user => user.socketId !== socket.id);
        socket.leave(user.roomId);
        io.to(room.id).emit('room-update', {
            connectedUsers : room.connectedUsers
        });

        // check if room has connected users
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

const signalingHandler = (data, socket) => {
    const { connUserSocketId, signal } = data;
    const signalingData = { signal, connUserSocketId: socket.id };
    // send signal to user which have socketId in connectedUsersSocketId
    io.to(connUserSocketId).emit('conn-signal', signalingData);
};

const initializeConnectionHandler = (data, socket) => {
    const { connUserSocketId } = data;
    const initData = { connUserSocketId: socket.id };
    io.to(connUserSocketId).emit('conn-init', initData);
};

// start the app by listening on the port
server.listen(PORT, () => {
    console.log(`Server is listening on ${ PORT }`);
});
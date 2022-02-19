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

server.listen(PORT, () => {
    console.log(`Server is listening on ${ PORT }`);
});
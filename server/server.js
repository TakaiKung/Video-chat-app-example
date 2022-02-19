const express = require('express');
const http = require('http');
const { v4 : uuid } = require('uuid');
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

io.on('connetion' , (clientSocket) => {
    console.log(`user connected`);
    console.log(`user id : ${ clientSocket.id }`);
});

server.listen(PORT, () => {
    console.log(`Server is listening on ${ PORT }`);
});
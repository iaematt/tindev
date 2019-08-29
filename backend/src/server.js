const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', socket => {
    const { user } = socket.handshake.query;

    // console.log(user, socket.id);
    connectedUsers[user] = socket.id;


    /* TESTES -->
    console.log('Nova conexão', socket.id);
    setTimeout(() => {
        socket.emit('mundo', {
            message: 'Matheus'
        })
    }, 5000);

    socket.on('ola', message => {
        console.log(message);
    });*/
});

mongoose.connect('mongodb+srv://dbroot:rewq@54321@cluster0-0xqfy.mongodb.net/aulas?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen('3333');
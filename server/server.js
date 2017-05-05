/**
 * Created by jay on 4/23/17.
 */

//SETS UP PATH
const path = require('path');
const publicPath = path.join(__dirname, '../public');

const http = require('http');

//SETS UP EXPRESS APP
const express = require('express');
let app = express();

//SETS UP PUBLIC FILES
app.use(express.static(publicPath));
app.use('public/js', express.static(path.join(__dirname, '/public/js')));
app.use('public/css', express.static(path.join(__dirname, '/public/css')));

//HANDLES VIEW ENGINE
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));

const socketIO = require('socket.io');

const {generateJadeLocation, generateJadeMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

const {Bot} = require('./utils/bot');
const {Users} = require('./utils/users');
const {Rooms} = require('./utils/rooms');

let server = http.createServer(app);
const port = process.env.PORT || 3000;
let io = socketIO(server);

let users = new Users();
let rooms = new Rooms();
let bot = new Bot();

// Renders the index page
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Chat Room App',
        roomsList: rooms.roomsList
    })
});
app.get('/chat', (req, res) => {
    res.render('chat', {

    })
});

// Handles when a new user joins and when there is a connection
io.on('connection', (socket) => {

    socket.on('join', (params, callback) => {

        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required.');
        }

        if(rooms.roomsList.indexOf(params.room) < 0) {
            rooms.addRoom(params.room);
        }

        socket.join(params.room);

        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', bot.greetUser(params.name));

        socket.broadcast.to(params.room).emit('newMessage', generateJadeMessage('Admin', `${params.name} has joined the channel`));

        callback();
    });

    // Listens for when a user creates a message
    socket.on('createMessage', (message, callback) => {

        let user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {

            let botResponse = bot.checkResponse(message.text);

            if(botResponse) {
                setTimeout(() => {
                    io.to(user.room).emit('newMessage', botResponse);
                }, 50);
            }

            io.to(user.room).emit('newMessage', generateJadeMessage(user.name, message.text));
        }

        callback();
    });

    socket.on('createLocationMessage', (coords) => {

        var user = users.getUser(socket.id);

        if (user){
            io.to(user.room).emit('newLocationMessage', generateJadeLocation(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', () => {

        var user = users.removeUser(socket.id);

        // if(io.sockets.adapter.rooms[user.room] === undefined) {
        //  rooms.removeRoom(user.room);
        // }

        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateJadeMessage('Admin', `${user.name} has left`));
        }

    });
});


server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
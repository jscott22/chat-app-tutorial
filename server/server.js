/**
 * Created by jay on 4/23/17.
 */

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');

let app = express();
app.use(express.static(publicPath));

const {generateMessage, generateJadeLocation, generateJadeMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/Users');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));

app.use('public/js', express.static(path.join(__dirname, '/public/js')));
app.use('public/css', express.static(path.join(__dirname, '/public/css')));

let server = http.createServer(app);
const port = process.env.PORT || 3000;
let io = socketIO(server);
let users = new Users();

// Renders the index page
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Chat Room App'
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

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateJadeMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateJadeMessage('Admin', `${params.name} has joined the channel`));

        callback();
    });




    // Listens for when a user creates a message
    socket.on('createMessage', (message, callback) => {

        var user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
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

        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateJadeMessage('Admin', `${user.name} has left`));
        }
    });
});


server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
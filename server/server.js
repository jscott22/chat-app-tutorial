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

const {generateMessage} = require('./utils/message');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));
app.use('public/js', express.static(path.join(__dirname, '/public/js')));
app.use('public/css', express.static(path.join(__dirname, '/public/css')));

let server = http.createServer(app);
const port = process.env.PORT || 3000;
let io = socketIO(server);

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Chat Room App'
    })
});


io.on('connection', (socket) => {

    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined the channel'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server!');
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
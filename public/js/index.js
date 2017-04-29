/**
 * Created by jay on 4/23/17.
 */

var socket = io();

socket.on('connect', function() {

    console.log('Connected to server');

});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('Got a new message!');
    console.log(message);

    var li = $('<li></li>');
    li.text(`${message.from}, ${message.text}`);

    $('#messages').append(li);

});

$('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name="message"]').val()
    }, function(){

    });
 });
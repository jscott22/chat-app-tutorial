/**
 * Created by jay on 4/23/17.
 */

var socket = io();


function scrollToBottom () {
    // Selectors
    var $messages = $('#messages');
    var $newMessage = $messages.children('li:last-child');
    // Heights
    var clientHeight = $messages.prop('clientHeight');
    var scrollTop = $messages.prop('scrollTop');
    var scrollHeight = $messages.prop('scrollHeight');
    var newMessageHeight = $newMessage.innerHeight();
    var lastMessageHeight = $newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        $messages.scrollTop(scrollHeight);
    }

}



socket.on('connect', function() {

    var params = $.deparam(window.location.search);

    socket.emit('join', params, function (err) {
        if(err) {
            window.location.href = '/';
            alert(err);
        } else {
            console.log('No Error');
        }
    });

});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function (users) {

    var ul = $('<ul></ul>');

    ul.append($('<li></li>').text('Chatbot 3000'));

    users.forEach(function (user) {
        ul.append($('<li></li>').text(user));
    });

    $('#users').html(ul);

});


socket.on('newMessage', function(message) {

    $('#messages').append(message);

    scrollToBottom();

});

socket.on('newLocationMessage', function(locationMessage) {

    $('#messages').append(locationMessage);

});

$('#message-form').on('submit', function (e) {
    e.preventDefault();

    var $messageTextbox = $('[name="message"]');

    socket.emit('createMessage', {
        text: $messageTextbox.val()
    }, function(){
        $messageTextbox.val('');
    });
 });

var $locationButton = $('#send-location');

$locationButton.on('click', function () {

    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    $locationButton.attr('disabled', 'disabled');
    $locationButton.text('Loading..');

    navigator.geolocation.getCurrentPosition(function (position) {
        $locationButton.removeAttr('disabled');
        $locationButton.text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });

    }, function () {
        $locationButton.removeAttr('disabled');
        $locationButton.text('Send Location');
        alert('Unable to fetch location');
    });
});
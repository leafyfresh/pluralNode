var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var mongodbUri = 'mongodb://leafyLab:t_buJMzmNnh8dqq8.WGpDtuZ.jOoDHZZ7n06s4gttCk-@ds040948.mongolab.com:40948/leafyLab';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

var UserList = require('./UserList.js');
var myUserList = new UserList(mongooseUri);

myUserList.addUser("bird");

//note:  Try to better understand what these bind methods do
//Note 2:  The 3 lines of javascript below should be uncommented for the mongoose proof of concept
app.get('/monkey', myUserList.showUsers.bind(myUserList));
app.post('/addUser', function (req, res) { console.log("posted func..");});
app.post('/completeUser', myUserList.completeUser.bind(myUserList));


app.get('/', function (req, res) {
    res.sendfile('index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
    
    socket.on('addUser', function (msg) {
        console.log("adding " + msg);
        myUserList.addUser(msg);
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
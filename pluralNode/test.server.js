var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var mongodbUri = 'mongodb://MongoLab-b:t_xD.ecQE8CQ5GZztws5mUo4OckPSyII4qKDqR8Msfo-@ds045107.mongolab.com:45107/MongoLab-b';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

var TaskList = require('./taskList.js');
var myTaskList = new TaskList(mongooseUri);
//note:  Try to better understand what these bind methods do
//Note 2:  The 3 lines of javascript below should be uncommented for the mongoose proof of concept
app.get('/monkey', myTaskList.showTasks.bind(myTaskList));
app.post('/addtask', myTaskList.addTask.bind(myTaskList));
app.post('/completetask', myTaskList.completeTask.bind(myTaskList));



app.get('/', function (req, res) {
    res.sendFile('index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
    });
    
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
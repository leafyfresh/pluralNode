﻿var mongoose = require('mongoose')
var task = require('./models/task.js');

module.exports = TaskList;

function TaskList(connection) {
    
    
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
        console.log('mongoose connection success');
    });
    mongoose.connect(connection);
}

TaskList.prototype = {
    showTasks: function (req, res) {
        console.log("show them tasks");
        task.find({ itemCompleted : false }, function foundTasks(err, items) {
            res.render('index', { title: 'My ToDo List', tasks: items })
        });
    },
    
    addTask: function (req, res) {
        var item = req.body;
        var newTask = new task();
        newTask.itemName = item.itemName;
        newTask.itemCategory = item.itemCategory;
        newTask.save(function savedTask(err) {
            if (err) {
                throw err;
            }
        });
        res.redirect('/');
    },
    
    completeTask: function (req, res) {
        var completedTasks = req.body;
        for (taskId in completedTasks) {
            if (completedTasks[taskId] == 'true') {
                var conditions = { _id: taskId };
                var updates = { itemCompleted: completedTasks[taskId] };
                task.update(conditions, updates, function updatedTask(err) {
                    if (err) {
                        throw err;
                    }
                });
            }
        }
        res.redirect('/');
    }
}
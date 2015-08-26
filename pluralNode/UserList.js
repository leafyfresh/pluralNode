var mongoose = require('mongoose')
var User = require('./models/User.js');

module.exports = UserList;

function UserList(connection) {
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
        console.log('mongoose connection success');
    });
    mongoose.connect(connection);
}

UserList.prototype = {
    showUsers: function (req, res) {
        console.log("show them Users");
        User.find({ itemCompleted : false }, function foundUsers(err, items) {
            res.render('index', { title: 'My ToDo List', Users: items })
        });
    },
    
    addUser: function (msg) {
        console.log("adduser func")
      
        var newUser = new User();
        newUser.username = "Martha";
        newUser.string2 = "speaks";
        newUser.save(function savedUser(err) {
            if (err) {
                throw err;
            }
        });
    },
    
    completeUser: function (req, res) {
        var completedUsers = req.body;
        for (UserId in completedUsers) {
            if (completedUsers[UserId] == 'true') {
                var conditions = { _id: UserId };
                var updates = { itemCompleted: completedUsers[UserId] };
                User.update(conditions, updates, function updatedUser(err) {
                    if (err) {
                        throw err;
                    }
                });
            }
        }
        res.redirect('/');
    }
}
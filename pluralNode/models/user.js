var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username      : String,
    string2      : String
});

module.exports = mongoose.model('TaskModel', UserSchema);
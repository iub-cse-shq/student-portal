var mongoose = require('mongoose');

// User Schema:
var UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    studentId:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

var User = module.exports = mongoose.model('User', UserSchema);
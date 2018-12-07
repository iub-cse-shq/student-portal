var mongoose = require('mongoose');

// User Schema:
var UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
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
    },
    posts:{
        type:String
    },
    major:{
        type:String,
        required: true
    },
    credits:{
        type: Number
    }
});

var User = module.exports = mongoose.model('User', UserSchema);
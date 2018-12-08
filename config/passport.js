var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var config = require('../config/database');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');

module.exports = function(passport){
    // Local Strategy
        passport.use(new LocalStrategy({usernameField: 'username'}, function(username, password, done){
        // Match username:
        console.log(username);
        console.log(password);
        User.findOne({
            username:username
        }).then(function(user){
            if(!user){
                return done(null, false, {message: 'No User Found'});
            }
            // Match password
            bcrypt.compare(password, user.password, function(error, isMatch){
                if(error) throw error;
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Password incorrect'});
                }
            })
        })
    }));
    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });
}
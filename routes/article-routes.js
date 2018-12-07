var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport');

// Bring in models
// var article = require('../models/');
var User = require('../models/user');

router.get('/admin-dash', function(request, response){
    response.render('admin-dash');
});

router.get ('/login', function (request, response){
    response.render ('login');
});

router.get('/recover', function(request, response){
    response.render('recover');
});

router.get('/sign-up', function(request, response){
    response.render('sign-up');
});

// Signup post:
router.post('/sign-up', function(request, response){
    var name = request.body.name;
    var username = request.body.username;
    var email = request.body.email;
    var major = request.body.major;
    var credits = request.body.credits;
    var password = request.body.password;
    var password2 = request.body.password2;
    
    // express-validator
    request.checkBody('name', 'Name is required').notEmpty();
    request.checkBody('email', 'Email is required').notEmpty();
    request.checkBody('email', 'Email is not valid').isEmail();
    request.checkBody('username', 'Student ID is required: You need to be an IUB student').notEmpty();
    request.checkBody('password', 'Password is required').notEmpty();
    request.checkBody('password2', 'Passwords do not match').equals(request.body.password);
    request.checkBody('major', 'Major is required').notEmpty();
    request.checkBody('credits', 'Please enter credits completed').notEmpty();
    
    
    // Errors if any
    var errors = request.validationErrors();
    if(errors){
        response.render('sign-up', {
            errors: errors
        });
    } else {
        // Validation pass; add new user to database now:
        var newUser = new User({
           name: name,
           email: email,
           username: username,
           password: password,
           major: major,
           credits: credits
        });
        // Hash the password before saving the user object
        bcrypt.genSalt(10, function(error, salt){
            bcrypt.hash(newUser.password, salt, function(error, hash){
                if(error){
                    console.log(error);
                }
                newUser.password = hash;
                
                // Once hashed, now save:
                newUser.save(function(error){
                    if(error){
                        console.log(error);
                        return;
                    } else {
                        request.flash('success', "You are now registered and can log in");
                        response.redirect('/dash');
                    }
                });
            });
        });
    }
});

// Login Form
router.get('/dash', function(request, response){
    response.render('dash');
});

// Login Process
router.post('/login', function(request, response, next){
    passport.authenticate('local', {
        successRedirect:'/dash',
        failureRedirect: '/login',
        failureFlash: true
    })(request, response, next);
});

// Logout
router.get('/logout', function(request, response){
    request.logout();
    request.flash('success', 'You are logged out');
    response.redirect('/login');
});

module.exports = router;
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

// Bring in models
// var article = require('../models/');
var User = require('../models/user');

router.get('/admin-dash', function(request, response){
    response.render('admin-dash');
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
    var studentId = request.body.studentId;
    var email = request.body.email;
    var password = request.body.password;
    var password2 = request.body.password2;
    
    // express-validator
    request.checkBody('name', 'Name is required').notEmpty();
    request.checkBody('email', 'Email is required').notEmpty();
    request.checkBody('email', 'Email is not valid').isEmail();
    request.checkBody('studentId', 'Student ID is required: You need to be an IUB student').notEmpty();
    request.checkBody('password', 'Password is required').notEmpty();
    request.checkBody('password2', 'Passwords do not match').equals(request.body.password);
    
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
           studentId: studentId,
           password: password
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

router.get('/dash', function(request, response){
    response.render('dash');
});

module.exports = router;
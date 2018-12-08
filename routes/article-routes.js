var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport');
var {ensureAuthenticated} = require('../helpers/auth');

// Bring in models
var User = require('../models/user');
var Post = require('../models/post');                                           //...............................................

router.get('/admin-dash', ensureAuthenticated, function(request, response){
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

// Add Post Route:
router.get('/dash/posts/add', function(request, response){
  response.render('add-post', {
    title: 'Add Post'
  });
});

// Add Post Route POST:
router.post('/dash/posts/add', function(request, response){
    request.checkBody('title', 'Title is required').notEmpty();
    request.checkBody('author', 'Author is required').notEmpty();
    request.checkBody('body', 'Body is required').notEmpty();
    
    console.log('Submitted');
    console.log(request.body);
    console.log(request.user);
    console.log(request.body.optradio);
    
    // Get errors:
    var errors = request.validationErrors();
    if(errors){
      response.render('add-post', {
        title: 'Add Post',
        errors: errors
      });
    } else {
      var post = new Post();
      post.title = request.body.title;             //This is where bodyParser is needed
      post.author = request.body.author;
      post.body = request.body.body;
      post.user = request.user.id;
      post.privacy = request.body.optradio;
  
      post.save(function(error){
        if(error){
          console.log(error);
          return;
        } else {
          request.flash('success', 'Post Added');
          response.redirect('/dash');
        }
      });
    }
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

// Dashboard
router.get('/dash', ensureAuthenticated, function(request, response){
    Post.find({ $or: [{user: request.user.id}, {privacy: '0'}]}, function(error, posts){
        if(error){
            console.log(error);
        } else {
            response.render('dash', {
            title: 'Posts',
            posts: posts
            });
        }
    });
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

// Load Edit Form:
router.get('/post/edit/:id', ensureAuthenticated, function(request, response){
  Post.findById(request.params.id, function(error, post){
    // Vulnerability fix: Ensuring different user cannot access another's edit form
    if(post.user != request.user.id){
      request.flash('error_msg', 'Unauthorized Access');
      response.redirect('/dash');
    } else {
      response.render('edit-post', {
      title: 'Edit Post',
      post: post
      });
    }
    // console.log(post);
    // return;
  });
});

// Edit post Route POST:
router.post('/post/edit/:id', function(request, response){
  var post = {};
  post.title = request.body.title;             //This is where bodyParser is needed
  post.author = request.body.author;
  post.body = request.body.body;

  var query = {_id:request.params.id};

  Post.update(query, post, function(error){
    if(error){
      console.log(error);
      return;
    } else {
      request.flash('success', 'Post Updated');
      response.redirect('/dash');
    }
  });
  // console.log('Submitted');
  // return;
});

// Delete request route
router.delete('/dash/post/:id', function(request, response){
  var query = {_id:request.params.id}

  Post.remove(query, function(error){
    if(error){
      console.log(error);
    }
    response.send('Success');
  });
});

// Get single post:
// This has to stay at the bottom
router.get('/dash/post/:id', function(request, response){
  Post.findById(request.params.id, function(error, post){
    console.log(request.params.id);
    // return;
    response.render('post', {
      post: post
    });
  });
});

module.exports = router;
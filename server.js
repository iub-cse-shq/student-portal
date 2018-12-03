// Require the following:
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
// var mongoose = require('mongoose');

// Modules:
// Initialize express:
var app = express();
app.use(bodyParser.urlencoded({extended: false}));                              //asynchronous
app.use(bodyParser.json());


// Bring in Models:


// Database Connection:

// Setting up views:
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set public/static folder:
app.use(express.static(path.join(__dirname, 'public')));

// Routes:
// Home Route:
app.get('/', function(request, response){
    // response.send('Hello World');                                            //Test
    response.render('index');
});

app.get('/admin-dash', function(request, response){
    response.render('admin-dash');
});

app.get('/recover', function(request, response){
    response.render('recover');
});

app.get('/sign-up', function(request, response){
    response.render('sign-up');
});

app.get('/dash', function(request, response){
    response.render('dash');
});

// Listen:
app.listen(process.env.PORT || 3000, process.env.IP || 'localhost', function(){
   console.log('Server Started'); 
});
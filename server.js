// Require the following:
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');

                                                                        // Modules:
// Initialize express:
var app = express();
app.use(bodyParser.urlencoded({extended: false}));                              //asynchronous
app.use(bodyParser.json());


                                                                        // Bring in Models:


// Database Connection:
var db_url = "mongodb://" + process.env.IP + ":27017";
mongoose.connect(db_url+'/loginapp', { useNewUrlParser: true });
mongoose.connection.once('open', function(){
   console.log("Mongoose connected to MongoDB"); 
});
mongoose.connection.on('error', function(error){
    console.log(error);
    console.log('Could not connect to MongoDB');
});

                                                                        // Setting up views:
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

                                                                        // Set public/static folder:
app.use(express.static(path.join(__dirname, 'public')));

                                                                        // Middlewares:
// express-session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
// express-messages
app.use(require('connect-flash')());
app.use(function(request, response, next){
   response.locals.messages = require('express-messages')(request, response);   //Global variable messages
   next();
});
// express-validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

                                                                        // Routes:
// Home Route:
app.get('/', function(request, response){
    // response.send('Hello World');                                            //Test
    response.render('index');
});

// Route files:
var articles = require('./routes/article-routes');
app.use('/', articles);

// Listen:
app.listen(process.env.PORT || process.env.IP || 'localhost', function(){
   console.log('Server Started'); 
});
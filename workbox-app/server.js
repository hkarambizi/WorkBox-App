var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var logger = require('morgan');
var hbs = require('hbs')
var mongoose = require('mongoose');
pry = require('pryjs');

var usersController = require('./controllers/users.js');
var sessionsController = require('./controllers/sessions.js');

var app = express();

//I used 'dotenv' to create an environment variable (stored in .env file) with the same name as the deployment database that calls the local host database as well.
require('dotenv').config()
mongoose.connect(process.env.MONGODB_URI);

app.set('view engine', 'hbs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(methodOverride('_method'));

app.use(session({
  secret: "derpderpderpcats",
  resave: false,
  saveUninitialized: false
}));

app.use('/users', userController);
app.use('/contacts', contactController);
app.use('/sessions', sessionController);

// I assigned the variable 'db' to my database connection
var db = mongoose.connection;

// Will log an error if db can't connect to MongoDB
db.on('error', function(err){
  console.log(err);
});

// Will log "database has been connected" if it successfully connects.
db.once('open', function() {
  console.log("Yah bish! database has been connected!");
});

app.listen(4000, function(){
  console.log("app listening on muh fuh port 3000");
});


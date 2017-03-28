var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var authHelpers = require('../helpers/auth.js')


router.get('/signup', function(req, res){
	res.render('users/signup.hbs');
});

//Registration and save info
router.post('/', authHelpers.createSecure, function(req, res){
 var user = new User({
 	userFirstName: req.body.userFirstName,
 	userLastName: req.body.userLastName,
   email: req.body.email,
   password_digest: res.hashedPassword
 });

 user.save(function(err, user){
   if (err) console.log(err);
   console.log(user);
   res.redirect('/sessions/login');
 });
});

//======================
// SHOW
//======================
// Create a GET show route "/:id" that renders the user's profile page
router.get('/:userId', authHelpers.authorize, function(req, res){
  User.findById(req.params.userId)
  .exec(function(err, user, contact) {
    if (err) console.log(err);
    console.log(user);
    if (!user) {alert("This user can not be found! Please sign up.");}
    res.render('users/show.hbs', {
      user: user,
      contact: user.contacts
    });
  });
});


// edit user profile
router.get('/:userId/edit', function(req, res) {
 User.findById(req.params.userId)
 .exec(function(err, user, contact) {
   if (err) console.log(err);
   res.render('users/edit', {
     user: user,
     contact: user.contacts
   });
 });
});


module.exports = router;
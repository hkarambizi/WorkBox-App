var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var authHelpers = require('../helpers/auth.js')


router.get('/signup', function(req, res){
});

router.post('/', authHelpers.createSecure, function(req, res){
});

//======================
// SHOW
//======================
// Create a GET show route "/:id" that renders the user's profile page
router.get('/:userId', function(req, res){
  User.findById(req.params.userId)
  .exec(function(err, user, contacts) {
    if (err) console.log(err);
    console.log(user);
    if (!user) {console.log("didn't find user");}
    res.render('users/show.hbs', {
      user: user,
      contact: user.contacts
    });
  });
});


module.exports = router;
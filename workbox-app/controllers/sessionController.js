var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var authHelpers = require('../helpers/auth.js')

router.get('/login', function(req, res) {
})

router.post('/login', authHelpers.loginUser, function(req, res){
	
	res.redirect('users/' + req.sessions.currentUser._id);
});

router.delete('/', function(req, res){
})

module.exports = router;
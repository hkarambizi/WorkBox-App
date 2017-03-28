//This code below allows us to assign a common variable as the cloud and on a local level we can assign it in our .env file
require('dotenv').config()
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

//We import and assign the 'models' from our schema file to variables in order to create instances below
var User = require('../models/user');
var Contact = require('../models/contact');

// Use native promises
mongoose.Promise = global.Promise;

//Now let's call some methods in db/seeds.js that will populate our database...

// First we clear the database of existing users and contacts.
User.remove({}, function(err){
  console.log(err);
});

Contact.remove({}, function(err){
  console.log(err);
});



// Then, we create an example User instances
var testUser = new User({
  userFirstName: 'Sam',
  userLastName: "Winchester",
  email: "agentscully@aol.com",
  password_digest: 'paloAltoDropout'
});

// Then, we create an example Contact instances!
var bobby = new Contact({
    firstName: "Bobby",
    lastName: "Singer",
    title: "Manager",
    company: "Singer Salvage Yard",
    phone: 9996661234,
    email: "nunya@singersalvage.biz",
    notes: "Bobby is a long time family friend and mentor. He is a bit ornery but means well. Schedule a drop-by.",
    img: "https://s-media-cache-ak0.pinimg.com/564x/84/4f/81/844f810598a2509b1bc682b57f9fc31e.jpg"
  });


// // save the test User instance
// testUser.save(function(err) {
//   if (err) console.log(err);
//   console.log('Test User created!');
// });



// // save the contact instances
// bobby.save(function(err) {
//   if (err) console.log(err);
//   console.log('Contact created!');
// });

var users = [testUser];
var contacts = [bobby];

users.forEach(function(user, i){
  user.contacts.push(contacts[i]);
//YOU MUST use .save to save the students to db. Always use an error function with save.
  user.save(function(err) {
    if(err) { console.log(err); }
    
   console.log('User with Contact created!');
});
});



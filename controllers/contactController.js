// require express, router, mongoose, ContactModel
var express = require('express');
var router = express.Router({mergeParams: true});
var Contact = require("../models/contact");
var User = require("../models/user")

//======================
// INDEX
//======================
// Create a GET index route "/" that sends a list of all contacts to contacts/index.hbs
// router.get('/', function(req, res){
//   Contact.find({})
//     .exec(function(err, contacts){
//       if (err) { console.log(err); }
//       console.log(contacts);
//       res.render('contacts/index.hbs', {
//         contact: contacts,
//         user: user
//       });
//     });
// });


//======================
// NEW
//======================
// Create a GET new route "/new" that renders the new.hbs form
router.get('/new', function(req, res){
  User.findById(req.params.userId)
  .exec(function (err, user) {
    if (err) console.log(err);
      res.render('contacts/new.hbs', {
        user: user,
        contact: user.contact
      });
    });
});

//======================
// SHOW
//======================
// Create a GET show route "/:id" that renders the contact's show page
router.get('/:id', function(req, res){
  User.findById(req.params.userId)
  // User.find()
  .exec(function(err, user) {
    if (err) console.log(err);
    console.log(user);
    var contact = user.contacts.id(req.params.id);
    res.render('contacts/show.hbs', {
      contact: contact,
      user: user
    });
  });
});



//======================
// CREATE
//======================
// Create a POST index route "/" that creates a new contact
// and upon success redirects back to the index page "/"
router.post('/', function(req, res){
  User.findById(req.params.userId)
  .exec(function (err, user) {if (err) console.log(err);
    var newContact = new Contact({
        img: req.body.img,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        title: req.body.title,
        company: req.body.company,
        phone: req.body.phone,
        email: req.body.email,
        notes: req.body.notes
      });

      user.contacts.push(newContact);
      user.save(function(err, contact){
        if (err) { console.log(err); }
        console.log(contact);
        res.redirect(`/users/${req.params.userId}`);
    });
  });
});



//======================
// EDIT
//======================

// Create a GET edit route "/:id/edit" that renders the edit.hbs page and
// sends that contact's data to it
router.get('/:id/edit', function(req, res){
  User.findById(req.params.userId)
  .exec(function(err, user) {
    if (err) console.log(err);
    console.log(user);
    var contact = user.contacts.id(req.params.id);
    res.render('contacts/edit.hbs', {
      contact: contact,
      user: user
    });
  });
});


//======================
// UPDATE
//======================
// Create a PUT update route "/:id" that updates the contact and
// redirects back to the SHOW PAGE (not index)
router.put('/:id', function(req, res){
  User.findById(req.params.userId)
  .exec(function(err, user) {
    if (err) { console.log(err);}
    var editContact = user.contacts.id(req.params.id);
      editContact.title = req.body.title;
      editContact.company = req.body.company;
      editContact.email = req.body.email;
      editContact.phone = req.body.phone;
      editContact.notes = req.body.notes;
      editContact.img = req.body.img;
  user.save(function(err) {
    if (err) { console.log(err); }
    res.redirect(`/users/${req.params.userId}/contacts/${req.params.id}`);
  });
});
});


//======================
// DELETE
//======================
// Create a DELETE delete route "/:id" that deletes the contact and
// redirects back to index page "/"
// router.delete('/:id', function(req, res){
//   User.findById(req.params.id)
//   .exec(function(err, contact) {
//     if (err) console.log(err);
//     console.log('Contact deleted!');
//     res.send("Contact deleted");
//   });
// });
router.delete('/:id', function deleteContact (req, res) {
  User.findByIdAndUpdate(req.params.userId, {
   $pull: {
     contacts: {_id: req.params.id}
   }
  })
  .exec(function(err, user){
   if(err) {console.log(err);}
         res.redirect(`/users/${req.params.userId}`)
   })
  });

//======================
// EXPORTS
//======================
// export router with module.exports
module.exports = router;
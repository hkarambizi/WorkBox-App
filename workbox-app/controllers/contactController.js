// require express, router, mongoose, ContactModel
var express = require('express');
var router = express.Router({mergeParams: true});
var Contact = require("../models/contact");
var User = require("../models/user")

//======================
// INDEX
//======================
// Create a GET index route "/" that sends a list of all contacts to contacts/index.hbs
router.get('/', function(req, res){
  Contact.find({})
    .exec(function(err, contacts){
      if (err) { console.log(err); }
      console.log(contacts);
      res.render('contacts/index.hbs', {
        contact: contacts
      });
    });
});


//======================
// NEW
//======================
// Create a GET new route "/new" that renders the new.hbs form
router.get('/new', function(req, res){
      res.render('contacts/new.hbs');
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
  var contact = new Contact({
    img: req.body.img,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    title: req.body.title,
    company: req.body.company,
    phone: req.body.phone,
    email: req.body.email,
    notes: req.body.notes
  });
  contact.save(function(err, contact){
    if (err) { console.log(err); }
    console.log(contact);
    res.send(contact);
    res.redirect('users/:id/');
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
  User.findByIdAndUpdate(req.params.userId, {
    contacts: [
      {title: req.body.title,
      company: req.body.company,
      email: req.body.email,
      phone: req.body.phone,
      notes: req.body.notes,
      img: req.body.img}]
  }, { new: true })
  .exec(function(err, contact){
    if (err) { console.log(err); }
    console.log(contact);
    res.redirect('/users/:userId/contacts/:id');
  });
});


//======================
// DELETE
//======================
// Create a DELETE delete route "/:id" that deletes the contact and
// redirects back to index page "/"
router.delete('/:id', function(req, res){
  User.findById(req.params.id)
  .exec(function(err, contact) {
    if (err) console.log(err);
    console.log('Contact deleted!');
    res.send("Contact deleted");
  });
});


//======================
// EXPORTS
//======================
// export router with module.exports
module.exports = router;
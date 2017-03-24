// require express, router, mongoose, ContactModel
var express = require('express');
var router = express.Router({mergeParams: true});
var Contact = require("../models/contact");

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
  Contact.findById(req.params.id)
  .exec(function(err, contact) {
    if (err) console.log(err);
    console.log(contact);
    res.render('contacts/show.hbs', {
      contact: contact
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
    firstName: req.body.first_name,
    lastName: req.body.last_name,
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
    res.redirect('/contacts');
  });
});



//======================
// EDIT
//======================
// Create a GET edit route "/:id/edit" that renders the edit.hbs page and
// sends that contact's data to it
router.get('/:id/edit', function(req, res){
  Contact.findById(req.params.id)
  .exec(function(err, contact) {
    if (err) console.log(err);
    console.log(contact);
    res.render('contacts/edit.hbs', {
      contact: contact
    });
  });
});


//======================
// UPDATE
//======================
// Create a PUT update route "/:id" that updates the contact and
// redirects back to the SHOW PAGE (not index)
router.put('/:id', function(req, res){
  Contact.findByIdAndUpdate(req.params.id, {
    notes: req.body.notes,
    img: req.body.img,
    linkedIn: req.body.linked_in
  }, { new: true })
  .exec(function(err, contact){
    if (err) { console.log(err); }
    console.log(contact);
    res.render('contacts/show.hbs', {
      contact: contact
    });
  });
});


//======================
// DELETE
//======================
// Create a DELETE delete route "/:id" that deletes the contact and
// redirects back to index page "/"
router.delete('/:id', function(req, res){
  Contact.findByIdAndRemove(req.params.id)
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
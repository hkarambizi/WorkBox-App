var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

//
var ContactSchema = new Schema({
    firstName: String,
    lastName: String,
    title: String,
    company: String,
    phone: Number,
    email: String,
    img: String,
    notes: String,
  });

//
ContactSchema.pre('save', function(next) {
  now = new Date();
  this.updated_at = now;

  if (!this.created_at) { this.created_at = now }
  next()
});


//
var UserSchema = new Schema({
  userFirstName: String,
  userLastName: String,
  email: String,
  password_digest: String,
  contacts: [ContactSchema],
  created_at: Date,
  updated_at: Date
});

//
UserSchema.pre('save', function(next) {
  now = new Date();
  this.updated_at = now;

  if (!this.created_at) { this.created_at = now }
  next()
});


//
var UserModel = mongoose.model('User', UserSchema);
var ContactModel = mongoose.model('Contact', ContactSchema);

//
module.exports = {
  User: UserModel,
  Contact: ContactModel
}

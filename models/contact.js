// create the below bridge to import(require) and export(module.export) data
//from schema.js
var Schema = require('../db/schema');
var mongoose = require('mongoose');

var Contact = Schema.Contact;
module.exports = Contact;
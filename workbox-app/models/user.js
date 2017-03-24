// create the below bridge to import(require) and export(module.export) data
//from schema.js
var Schema = require('../db/schema');
var mongoose = require('mongoose');

var User = Schema.User;
module.exports = User;
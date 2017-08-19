const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


// ==== Access a Schema ==== //

const Schema = mongoose.Schema;



// ==== Schema for a snippet ==== //

const snippetSchema = new Schema({
  id : {type: String},
  title : {type: String, required: true},
  body : {type: String, required: true},
  notes: {type: String},
  language: {type: String, required: true},
  tags: {type: Array, required: true, default: []},
});

// ==== Snippet ==== //

const Snippet = mongoose.model('Snippet', snippetSchema);

module.exports = Snippet;

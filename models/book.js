'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Boolean, required: true }, // status (like read or not read) google:  mongoDB schema variable types/options, have an array of options

});


const Book = mongoose.model('book', bookSchema);

module.exports = Book;
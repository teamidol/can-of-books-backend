'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const Book = require('./models/book.js');

async function seed() {
  // name: {type: String, required: true},
  // color: {type: String, required: true},
  // spayNeuter: {type: Boolean, required: true},
  // location: {type: String, required: true}

  await Book.create({
    title: 'The AI-AI',
    description: 'by Patterson',
    status: true
  });

  console.log('"The AI-AI" was added');

  await Book.create({
    title: 'Advanced Design',
    description: 'by Darshon',
    status: true
  });

  console.log('"Advanced Design" was added');

  await Book.create({
    title: 'Hello TA',
    description: 'by Laurence',
    status: true
  });

  console.log('"Hello TA" was added');

  mongoose.disconnect();
}

seed();
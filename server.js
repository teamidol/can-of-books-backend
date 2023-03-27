
'use strict';

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// *** REQUIRE IN OUR MONGOOSE LIBRARY ***
const mongoose = require('mongoose');

// **** BRING IN MY BOOK MODEL ****
const Book = require('./models/book.js');

const app = express();

// middleware
app.use(cors());

// define PORT validate env is working
const PORT = process.env.PORT || 3002;

// LISTEN
app.listen(PORT, () => console.log(`listening on Port ${PORT}`));

// **** CONNECT MONGODB USING MONGOOSE ***
// *** PER THE MONGOOSE DOCS - PLUG AND PLAY CODE ****

mongoose.connect(process.env.DB_URL);

// *** HELPFUL FOR TROUBLESHOOTING IN TERMINAL WHY YOU CAN'T CONNECT TO YOUR MONGODB ***
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// ENDPOINTS
app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
});

// *** ENDPOINT TO RETREIVE ALL BOOKS FROM MY DATABASE ***

app.get('/books', getBooks);

async function getBooks(request, response, next){
  // TODO: Get all books from db
  try {
    let allBooks = await Book.find({}); // Model.find({}) - retreives all docs from database

    response.status(200).send(allBooks);

  } catch (error) {
    next(error);
  }
}


app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

// ERROR
app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});

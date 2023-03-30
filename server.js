
'use strict';

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// *** REQUIRE IN OUR MONGOOSE LIBRARY ***
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

// *** this section is not needed, it's only for developer troubleshooting
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// **** BRING IN MY BOOK MODEL ****
const Book = require('./models/book.js');

const app = express();

// middleware
app.use(cors());

// DON'T FORGET TO BRING THIS IN!!!!!
app.use(express.json());

// define PORT validate env is working
const PORT = process.env.PORT || 3002;

// LISTEN
app.listen(PORT, () => console.log(`listening on Port ${PORT}`));

// **** CONNECT MONGODB USING MONGOOSE ***
// *** PER THE MONGOOSE DOCS - PLUG AND PLAY CODE ****

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

// **** ENDPOINT TO DELETE A CAT FROM MY DATABASE *****
// ! we must have path parameter
// ! path parameter is going to be set with a variable to capture the ID
// ! we use ':' to signify that it is a path parameter

app.delete('/books/:bookID', deleteBook);

async function deleteBook(request,response,next){
  try {
    let id = request.params.bookID;
    
    await Book.findByIdAndDelete(id);
    
    response.status(200).send('Book Deleted!');
  } catch (error) {
    next(error);
  }
}

// **** ENDPOINT TO ADD A CAT *****

app.post('/books', postBook);

async function postBook(request, response,next){
  try {
    let createdBook = await Book.create(request.body);
    // !!! DON'T FORGET THAT MIDDLEWARE ^ ^ ^ ^(line 22)
    
    response.status(201).send(createdBook);
  } catch (error) {
    next(error);
  }
}


// *** ENDPOINT TO UPDATE A CAT ****
app.put('/books/:bookID', updateBook);

async function updateBook(request, response, next){
  try {

    // ID - the cat to update, DATA - the information to update the cat with
    let id = request.params.bookID;
    let data = request.body;

    // ! 3 Args
    // ! 1st - is the id
    // ! 2nd - data
    // ! 3rd - options object { new: true, overwrite: true }

    const updatedBook = await Book.findByIdAndUpdate(id, data, { new: true, overwrite: true } );

    response.status(200).send(updatedBook);

  } catch (error) {
    next(error);
  }
}


app.get('*', (request, response) => {
  response.status(404).send('Not available');
});


// ERROR
app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});
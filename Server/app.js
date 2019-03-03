const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost:27017/notesAppTEST');
} else {
  mongoose.connect('mongodb://localhost:27017/notesApp');
}

const app = express();

app.use(cors());

//Middlewares
if (!process.env.NODE_ENV == 'test') {
  app.user(morgan('dev'));
}
app.use(bodyParser.json());

//Routes
app.use('/users', require('./routes/users'));
app.use('/notes', require('./routes/notes'));


module.exports = app;
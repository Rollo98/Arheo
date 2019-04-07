const express = require('express'),
 morgan = require('morgan'),
 bodyParser = require('body-parser'),
 mongoose = require('mongoose'),
 constants = require('./constants')
 cors = require('cors');

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'test') {
  mongoose.connect(`${constants.mongoURL}/arheoAppTEST`);
} else {
  mongoose.connect(`${constants.mongoURL}/arheoApp`);
}

const app = express();

app.use(cors());

//Middlewares
if (!process.env.NODE_ENV == 'test') {
  app.user(morgan('dev'));
}
app.use(bodyParser.json());

//Routes
app.use('/', require('./routes/users'));
app.use('/archeologist', require('./routes/archeologist'));


module.exports = app;
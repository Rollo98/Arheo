const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schemas for the models
const archeologistSchema = new Schema({
  user: {
    type: [String],
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  birthDay: {
    type: Date,
    required: true
  },
  deathDay: {
    type: Date,
  },
  institution: {
    type: [String],
    required: true
  },
  specialization: {
    type: [String],
    required: true
  },
  university: {
    type: [String],
    required: true
  },
  works: {
    type: [{
      start: {
        type: Date,
        required: true
      },
      end: {
        type: Date,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      },
    }],
    required: true
  },
  dateModified: {
    type: Date,
    required: true
  },
  photo: {
    type: String
  },
  author: {
    type: String,
    required: true
  }
});


const Archeologist = mongoose.model('archeologists', archeologistSchema)

//Export model
module.exports = Archeologist;
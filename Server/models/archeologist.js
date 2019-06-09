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
    type: {
      day: {
        type: String,
        required: true
      },
      month: {
        type: String,
        required: true
      },
      year: {
        type: String,
        required: true
      },
    },
    required: true
  },
  deathDay: {
    type: {
      day: {
        type: String,
        required: true
      },
      month: {
        type: String,
        required: true
      },
      year: {
        type: String,
        required: true
      },
    },
  },
  Institutii: {
    type: [{
      start: {
        type: String,
        required: true
      },
      end: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      },
    }],
  },
  Specializarii: {
    type: [{
      start: {
        type: String,
        required: true
      },
      end: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      },
    }],
  },
  Studii: {
    type: [{
      start: {
        type: String,
        required: true
      },
      end: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      },
    }],
  },
  Lucrari: {
    type: String
  },
  Santier: {
    type: [{
      start: {
        type: String,
        required: true
      },
      end: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      },
    }],
  },
  Domeniu: {
    type: [{
      text: {
        type: String,
        required: true
      },
    }],
  },
  dateModified: {
    type: Date,
    required: true
  },
  photo: {
    type: String
  },
  Observatii: {
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
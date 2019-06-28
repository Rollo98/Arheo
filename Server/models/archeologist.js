const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schemas for the models
const archeologistSchema = new Schema({
  user: {
    type: [String]
  },
  prenume: {
    type: String,
    required: true
  },
  numeDeFamilie: {
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
      }
    },
    required: true
  },
  deathDay: {
    type: {
      day: {
        type: String
      },
      month: {
        type: String
      },
      year: {
        type: String
      }
    }
  },
  Institutii: {
    type: [
      {
        start: {
          type: String
        },
        end: {
          type: String
        },
        text: {
          type: String
        }
      }
    ]
  },
  Specializarii: {
    type: [
      {
        start: {
          type: String
        },
        end: {
          type: String
        },
        text: {
          type: String
        }
      }
    ]
  },
  Studii: {
    type: [
      {
        start: {
          type: String
        },
        end: {
          type: String
        },
        text: {
          type: String
        }
      }
    ]
  },
  Lucrari: {
    type: String
  },
  Santier: {
    type: [
      {
        start: {
          type: String
        },
        end: {
          type: String
        },
        text: {
          type: String
        }
      }
    ]
  },
  Domeniu: {
    type: [
      {
        text: {
          type: String
        }
      }
    ]
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
  Licenta: {
    type: String
  },
  Master: {
    type: String
  },
  Doctorat: {
    type: String
  },
  author: {
    type: String,
    required: true
  }
});

const Archeologist = mongoose.model("archeologists", archeologistSchema);

//Export model
module.exports = Archeologist;

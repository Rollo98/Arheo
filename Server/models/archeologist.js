const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schemas for the models
const archeologistSchema = new Schema({
  uid: {
    type: String,
    required: true
  },
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
  Doctorat: {
    type: [
      {
        text: {
          type: String
        },
        coord: {
          type: String
        },
        start: {
          type: String
        },
        title: {
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
        },
        tip: {
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
  alteNume: {
    type: String
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
  Bibliografie: {
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

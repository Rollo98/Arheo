const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schemas for the models
const gallerySchema = new Schema({
  arheologist: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  text: {
    type: String
  }
});

// Create model
const Gallery = mongoose.model("gallery", gallerySchema);

//Export model
module.exports = Gallery;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schemas for the models
const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  addDate: {
    type: Date
  },
  author: {
    type: String,
    required: true
  }
});

// Create model
const Blog = mongoose.model("blog", blogSchema);

//Export model
module.exports = Blog;

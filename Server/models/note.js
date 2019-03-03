const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schemas for the models
const noteSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});


const Note = mongoose.model('notes', noteSchema)

//Export model
module.exports = Note;
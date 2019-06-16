const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create Schemas for the models
const userSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  prenume: {
    type: String,
    required: true
  },
  numeDeFamilie: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: [String],
    required: true
  }
});

userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(this.password, salt);
    this.password = passHash;
    next();
  } catch (error) {
    next(error);
  }
});
userSchema.methods.passValid = async function (inpassword) {
  try {
    return await bcrypt.compare(inpassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
}


// Create model
const User = mongoose.model('user', userSchema)

//Export model
module.exports = User;
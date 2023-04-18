const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    default: 5
  },
  name: String,
  email: String,
  avatar: String,
  currentLogin: Date,
  lastLogin: Date,
});

module.exports = User = mongoose.model('user', userSchema);
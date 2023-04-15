const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  sessionId: String,
  item: {
    type: mongoose.Schema.ObjectId,
    ref: 'Credits'
  },
  paid: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

module.exports = Payment = mongoose.model('payment', paymentSchema);
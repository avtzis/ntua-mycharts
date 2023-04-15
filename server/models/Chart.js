const mongoose = require('mongoose');

const chartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  type: String,
  name: String,
  createdOn: Date,
  options: Object,
  pdf: Buffer,
  png: Buffer,
  svg: Buffer,
  html: String
});

module.exports = Chart = mongoose.model('chart', chartSchema);
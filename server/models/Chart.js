const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate')

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
  html: String,
  preview: {
    type: Boolean,
    default: false
  }
});

chartSchema.plugin(findOrCreate);
module.exports = Chart = mongoose.model('chart', chartSchema);
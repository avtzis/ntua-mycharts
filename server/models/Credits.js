const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate')

const creditsSchema = new mongoose.Schema({
  title: String,
  subheader: String,
  price: Number,
  credits: Number,
  color: String,
  active: Boolean
});

creditsSchema.plugin(findOrCreate);
module.exports = Credits = mongoose.model('credits', creditsSchema);
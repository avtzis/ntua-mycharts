const app = require('./app');
const mongoose = require('mongoose');
const createTiers = require('./utilities/createTiers');
const createPreviews = require('./utilities/createPreviews');
const createTemplates=require('./utilities/createTemplates')

// Connect to Database
mongoose.connect('mongodb://127.0.0.1:27017/myCharts', {
  useNewUrlParser: true,
}).then(() => {
  console.log('Database Connected.');
  createTiers();
  createPreviews();
  createTemplates();

}).catch(error => {
  console.error(error);
});

// Host Server
app.listen(3001, () => {
  console.log('Server started on port 3001');
});
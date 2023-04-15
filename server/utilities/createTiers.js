const Credits = require('../models/Credits');
const tiers = require('../data/credit-options.json');

module.exports = async () => {
  tiers.forEach(tier => {
    Credits.findOrCreate(tier, (err, data, created) => {
      if(err) {
        console.error(`There was an error finding or creating ${data.title} tier.`);
      } else {
        console.log(`${data.title} tier has been ${created ? 'created successfully' : 'verified'}.`);
      }
    })
  })
}
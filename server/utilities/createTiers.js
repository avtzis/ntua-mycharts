const Credits = require('../models/Credits');
const tiers = require('../data/credit-options.json');

module.exports = async () => {
  tiers.forEach(tier => {
    Credits.findOrCreate({title:tier.title}, (err, data, created) => {
      if(err) {
        console.error(`There was an error finding or creating a tier.`, err);
      } else {
        data.price=tier.price
        data.credits=tier.credits
        data.color=tier.color
        data.active=tier.active
        data.subheader=tier.subheader
        
       
        data.save()

        console.log(`${data.title} tier has been ${created ? 'created successfully' : 'updated'}.`);
      }
    })
  })
}
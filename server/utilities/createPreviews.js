const Chart = require('../models/Chart');

const options1 = require('../data/chart-options1.json');
const options2 = require('../data/chart-options2.json');
const options3 = require('../data/chart-options3.json');
const options4 = require('../data/chart-options4.json');
const options5 = require('../data/chart-options5.json');
const options6 = require('../data/chart-options6.json');
const options7 = require('../data/chart-options7.json');
const options8 = require('../data/chart-options8.json');
const options9 = require('../data/chart-options9.json');

const charts = [options1, options2, options3, options4, options5, options6, options7, options8, options9];
const defaultType = 'line';

const getType = options => {
  if(options.chart) {
    if(options.chart.type) {
      return options.chart.type;
    } else if(options.chart.polar) {
      return 'polar';
    } else {
      return 'organization';
    }
  } else if(options.series[0].type) {
    return options.series[0].type;
  } else {
    return defaultType;
  }
}

module.exports = async () => {
  //await Chart.deleteMany({ preview: true });

  charts.forEach(options => {
    Chart.findOrCreate({ 
      type: getType(options),
      preview: true,
    }, (err, data, created) => {
      if(err) {
        console.error(`There was an error finding or creating the ${data.type} chart.`);
      } else {
        data.name=options.title.text
        data.options=options
        data.save()
        
        
        console.log(`A ${data.type} chart has been ${created ? 'created successfully' : 'updated'}.`);
      }
    })
  })
}